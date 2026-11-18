"""
Export the site model for the homepage — run this after every edit to the .blend.

  From a terminal (Blender installed):
    blender -b model/studio_ap_site_model.blend -P model/export_web_layers.py
  Quick low-res test:
    blender -b model/studio_ap_site_model.blend -P model/export_web_layers.py -- --preview
  Or inside Blender: Scripting tab > Open this file > Run Script (saves the open file's state).

Writes to public/model/:
  base.webp            whole model, every light off (the dusk default)
  light-<key>.webp     only the pixels that change when that building's lights are on
  hotspots.json        clickable outline + window "push-in" point for each building

Rules that keep it working after edits:
  - Keep the LIGHT_SWITCHES empty and its work/about/play/contact properties.
  - A building's click area is every mesh using its Clay_<Name> or Interior_<Name>
    material (or with the building name in the object name, e.g. "Work_balcony").
  - The push-in point is the centre of the Room_<key> object (the glowing back wall).
"""
import bpy, os, sys, json
import numpy as np
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

KEYS = ["work", "about", "play", "contact"]
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "public", "model")
TMP = os.path.join(OUT, "_tmp")
os.makedirs(TMP, exist_ok=True)

if not bpy.data.filepath:  # running from plain python / pip bpy
    bpy.ops.wm.open_mainfile(filepath=os.path.join(HERE, "studio_ap_site_model.blend"))

scene = bpy.context.scene
ctrl = bpy.data.objects["LIGHT_SWITCHES"]
scene.render.film_transparent = True
if "--preview" in sys.argv:
    scene.render.resolution_x, scene.render.resolution_y = 960, 540
    scene.cycles.samples = 16
saved = {k: ctrl.get(k, 0.0) for k in KEYS}


def render(name, lit):
    for k in KEYS:
        ctrl[k] = 1.0 if k in lit else 0.0
    ctrl.update_tag()
    scene.frame_set(scene.frame_current)
    s = scene.render.image_settings
    s.file_format, s.color_mode, s.color_depth = "PNG", "RGBA", "8"
    path = os.path.join(TMP, name + ".png")
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    img = bpy.data.images.load(path)
    w, h = img.size
    px = np.empty(w * h * 4, dtype=np.float32)
    img.pixels.foreach_get(px)
    bpy.data.images.remove(img)
    print("rendered", name)
    return px.reshape(h, w, 4)


def save_webp(arr, name):
    h, w = arr.shape[:2]
    img = bpy.data.images.new(name, w, h, alpha=True)
    img.pixels.foreach_set(np.ascontiguousarray(arr, dtype=np.float32).ravel())
    img.file_format = "WEBP"
    img.save(filepath=os.path.join(OUT, name + ".webp"), quality=86)
    bpy.data.images.remove(img)


def blur(a, r):
    """Cheap box blur via cumulative sums (keeps the light masks soft, kills speckle)."""
    for axis in (0, 1):
        c = np.cumsum(np.pad(a, [(r + 1, r) if i == axis else (0, 0) for i in range(2)], mode="edge"), axis=axis)
        a = (np.take(c, range(2 * r + 1, c.shape[axis]), axis=axis) - np.take(c, range(0, c.shape[axis] - 2 * r - 1), axis=axis)) / (2 * r + 1)
    return a


# ------------------------------------------------------------ images
base = render("base", [])
# Fade the shadow-catcher haze out toward the frame edges so the image has no visible border.
h, w = base.shape[:2]
ex = np.minimum(np.arange(w), np.arange(w)[::-1]) / (0.18 * w)
ey = np.minimum(np.arange(h), np.arange(h)[::-1]) / (0.30 * h)
edge = np.clip(np.minimum(ey[:, None], ex[None, :]), 0, 1)
edge = edge * edge * (3 - 2 * edge)
a = base[..., 3]
is_model = (a > 0.98) & (base[..., :3].max(axis=2) > 0.06)  # shadows are black, the model isn't
a = np.where(a < 0.03, 0, a) * np.where(is_model, 1, edge)  # model stays solid, shadow + haze fade out
base[..., 3] = a
save_webp(base, "base")
for k in KEYS:
    on = render(k, [k])
    diff = np.abs(on - base).max(axis=2)
    mask = np.clip((blur(diff, 3) - 0.008) / 0.035, 0, 1)
    layer = on.copy()
    on_model = (on[..., 3] > 0.98) & (on[..., :3].max(axis=2) > 0.06)  # light the model, never the shadow
    layer[..., 3] = on[..., 3] * mask * on_model
    save_webp(layer, f"light-{k}")

# ---------------------------------------------------------- hotspots
def hull(pts):
    pts = sorted(set(pts))
    if len(pts) < 3:
        return pts
    cross = lambda o, a, b: (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) >= 2 and cross(up[-2], up[-1], p) <= 0:
            up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]


cam = scene.camera
dg = bpy.context.evaluated_depsgraph_get()


def to_screen(co):
    v = world_to_camera_view(scene, cam, co)
    return (round(v.x, 4), round(1 - v.y, 4))


spots = {}
for k in KEYS:
    mats = {f"Clay_{k.title()}", f"Interior_{k.title()}"}
    pts = []
    for ob in scene.objects:
        if ob.type != "MESH" or ob.name.startswith("Tag_"):
            continue
        names = {m.name for m in ob.data.materials if m}
        tokens = ob.name.lower().replace(".", "_").split("_")
        if not (names & mats or k in tokens):
            continue
        ev = ob.evaluated_get(dg)
        me = ev.to_mesh()
        pts += [to_screen(ev.matrix_world @ v.co) for v in me.vertices]
        ev.to_mesh_clear()
    room = next((o for o in scene.objects if o.name.lower().startswith(f"room_{k}")), None)
    if room:
        c = sum((room.matrix_world @ Vector(b) for b in room.bound_box), Vector()) / 8
        focus = to_screen(c)
    else:
        xs, ys = zip(*pts)
        focus = (round(sum(xs) / len(xs), 4), round(sum(ys) / len(ys), 4))
    spots[k] = {"polygon": hull(pts), "focus": focus}

with open(os.path.join(OUT, "hotspots.json"), "w") as f:
    json.dump({"version": int(__import__("time").time()), "width": scene.render.resolution_x, "height": scene.render.resolution_y, "buildings": spots}, f, indent=1)

for k, v in saved.items():
    ctrl[k] = v
for f in os.listdir(TMP):
    os.remove(os.path.join(TMP, f))
os.rmdir(TMP)
print("export done ->", OUT)
