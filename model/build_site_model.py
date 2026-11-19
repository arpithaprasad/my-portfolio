"""
Studio AP — site model starter scene
Builds a clay site model (plinth + Work, About, Play, Contact) with
switchable interior lights, dusk lighting and an orthographic camera.

Run inside Blender:  Scripting tab > Open > Run Script
Or headless:         blender -b -P build_site_model.py
Or via pip bpy:      python build_site_model.py

Lights: select the empty "LIGHT_SWITCHES" and use the custom properties
work / about / play / contact (0 = off, 1 = on) in Object Properties.
"""
import bpy, bmesh, math, os
from mathutils import Matrix, Vector

OUT = os.path.dirname(os.path.abspath(__file__))
Z0 = 0.7  # top of plinth

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection


def srgb(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return (*lin, 1.0)


# ------------------------------------------------------------ materials
def clay(name, hexcol, rough=0.88, bump=0.06):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = srgb(hexcol)
    p.inputs["Roughness"].default_value = rough
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 38.0
    noise.inputs["Detail"].default_value = 6.0
    b = nt.nodes.new("ShaderNodeBump")
    b.inputs["Strength"].default_value = bump
    nt.links.new(noise.outputs["Fac"], b.inputs["Height"])
    nt.links.new(b.outputs["Normal"], p.inputs["Normal"])
    return m


def interior(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = srgb("#2a2420")
    p.inputs["Roughness"].default_value = 0.9
    p.inputs["Emission Color"].default_value = (1.0, 0.42, 0.12, 1.0)
    p.inputs["Emission Strength"].default_value = 0.0
    return m


M = {
    "ground": clay("Ground", "#efe3d6", bump=0.02),
    "plinth": clay("Plinth_Basswood", "#e8d5bd", bump=0.03),
    "terrace": clay("Terrace", "#e3cdb4"),
    "work": clay("Clay_Work", "#801c42"),
    "about": clay("Clay_About", "#d95c6c"),
    "play": clay("Clay_Play", "#f49a6e"),
    "contact": clay("Clay_Contact", "#f4bc78"),
    "resume": clay("Clay_Resume", "#5a111e"),
    "leaf": clay("Leaf", "#8a9c68", bump=0.15),
    "trunk": clay("Trunk", "#8a6a50"),
    "ink": clay("Ink", "#4a3b31", bump=0.0),
    "prop": clay("Prop_Silhouette", "#3a2c24", bump=0.0),
}
INT = {k: interior(f"Interior_{k.title()}") for k in ("work", "about", "play", "contact", "resume")}


# --------------------------------------------------------------- meshes
def link(name, me, mat):
    ob = bpy.data.objects.new(name, me)
    coll.objects.link(ob)
    if mat:
        ob.data.materials.append(mat)
    return ob


def box(name, center, dims, mat):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * dims[0], v.co.y * dims[1], v.co.z * dims[2])) + Vector(center)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    return link(name, me, mat)


def cyl(name, center, r, depth, axis, mat, segs=48):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=r, radius2=r, depth=depth)
    rot = {"Z": Matrix(), "Y": Matrix.Rotation(math.pi / 2, 4, "X"),
           "X": Matrix.Rotation(math.pi / 2, 4, "Y")}[axis]
    bmesh.ops.transform(bm, matrix=Matrix.Translation(center) @ rot, verts=bm.verts)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    return link(name, me, mat)


def sphere(name, center, r, mat):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=3, radius=r)
    bmesh.ops.translate(bm, vec=Vector(center), verts=bm.verts)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    for p in me.polygons:
        p.use_smooth = True
    return link(name, me, mat)


def apply_bool(target, cutter, op="DIFFERENCE"):
    mod = target.modifiers.new("bool", "BOOLEAN")
    mod.operation = op
    mod.object = cutter
    mod.solver = "EXACT"
    with bpy.context.temp_override(object=target, active_object=target):
        bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter, do_unlink=True)


def soften(ob, w=0.05):
    b = ob.modifiers.new("bevel", "BEVEL")
    b.width = w
    b.segments = 3
    b.limit_method = "ANGLE"


# --------------------------------------------------- light switch rig
ctrl = bpy.data.objects.new("LIGHT_SWITCHES", None)
coll.objects.link(ctrl)
ctrl.location = (0, 0, 9)
for k in INT:
    ctrl[k] = 0.0
    ctrl.id_properties_ui(k).update(min=0.0, max=1.0, soft_min=0.0, soft_max=1.0)


def drive(id_block, path, key, scale):
    fc = id_block.driver_add(path)
    d = fc.driver
    d.type = "SCRIPTED"
    v = d.variables.new()
    v.name = "v"
    v.type = "SINGLE_PROP"
    v.targets[0].id_type = "OBJECT"
    v.targets[0].id = ctrl
    v.targets[0].data_path = f'["{key}"]'
    d.expression = f"v*{scale}"


for k, m in INT.items():
    drive(m.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"], "default_value", k, 1.6)


def opening(bld, key, face, axis, cx, sill, w, h, depth=0.6, shape="arch"):
    """Carve an arched / round / square recess into a facade and light it.
    axis 'Y' -> facade faces -Y at y=face ; axis 'X' -> facade faces +X at x=face."""
    if shape == "round":
        r = w / 2
        if axis == "Y":
            c = cyl("cut", (cx, face + depth / 2 - 0.1, sill + r), r, depth + 0.2, "Y", None)
        else:
            c = cyl("cut", (face - depth / 2 + 0.1, cx, sill + r), r, depth + 0.2, "X", None)
        apply_bool(bld, c)
        top = sill + w
    else:
        rect_h = h - w / 2 if shape == "arch" else h
        if axis == "Y":
            c = box("cut", (cx, face + depth / 2 - 0.1, sill + rect_h / 2), (w, depth + 0.2, rect_h), None)
        else:
            c = box("cut", (face - depth / 2 + 0.1, cx, sill + rect_h / 2), (depth + 0.2, w, rect_h), None)
        apply_bool(bld, c)
        if shape == "arch":
            if axis == "Y":
                a = cyl("cut", (cx, face + depth / 2 - 0.1, sill + rect_h), w / 2, depth + 0.2, "Y", None)
            else:
                a = cyl("cut", (face - depth / 2 + 0.1, cx, sill + rect_h), w / 2, depth + 0.2, "X", None)
            apply_bool(bld, a)
        top = sill + h
    # glowing back wall of the "room"
    hh = top - sill
    if axis == "Y":
        back = box(f"Room_{key}", (cx, face + depth - 0.02, sill + hh / 2), (w + 0.4, 0.02, hh + 0.4), INT[key])
        lp = (cx, face + depth * 0.45, sill + hh * 0.7)
    else:
        back = box(f"Room_{key}", (face - depth + 0.02, cx, sill + hh / 2), (0.02, w + 0.4, hh + 0.4), INT[key])
        lp = (face - depth * 0.45, cx, sill + hh * 0.7)
    ld = bpy.data.lights.new(f"Lamp_{key}", "POINT")
    ld.color = (1.0, 0.68, 0.40)
    ld.shadow_soft_size = 0.15
    lo = bpy.data.objects.new(f"Lamp_{key}", ld)
    lo.location = lp
    coll.objects.link(lo)
    drive(ld, "energy", key, 14)
    return back


# ------------------------------------------------------------- ground
g = box("Ground", (0, 0, -0.05), (80, 80, 0.1), M["ground"])
g.is_shadow_catcher = True  # transparent bg, keeps the soft shadow
plinth = box("Plinth", (0, 0, Z0 / 2), (14, 10, Z0), M["plinth"])
soften(plinth, 0.18)

# ---------------------------------------------------------------- WORK
terrace = box("Terrace_Work", (-1.0, 1.2, Z0 + 0.25), (5.4, 4.4, 0.5), M["terrace"])
soften(terrace, 0.06)
TZ = Z0 + 0.5
work = box("Work", (-1.0, 1.4, TZ + 1.7), (4.2, 3.0, 3.4), M["work"])
upper = box("Work_upper", (-2.0, 2.2, TZ + 3.4 + 0.6), (2.0, 1.6, 1.2), None)
apply_bool(work, upper, "UNION")
wf = 1.4 - 1.5  # front face y
opening(work, "work", wf, "Y", -0.4, TZ + 0.5, 2.0, 2.3)
opening(work, "work", wf, "Y", -2.45, TZ, 0.8, 1.6, depth=0.5)
opening(work, "work", 1.1, "X", 1.6, TZ + 1.4, 0.75, 1.3, depth=0.45)
soften(work)
# stairs up to the terrace
for i in range(4):
    hgt = 0.5 - 0.125 * i
    s = box(f"Step_{i}", (1.05, -1.0 - 0.15 - 0.3 * i, Z0 + hgt / 2), (1.0, 0.3, hgt), M["terrace"])
# desk silhouette in the studio window
box("Desk", (-0.4, wf + 0.42, TZ + 0.5 + 0.42), (1.0, 0.25, 0.05), M["prop"])
box("DeskLeg", (-0.8, wf + 0.42, TZ + 0.5 + 0.2), (0.04, 0.2, 0.4), M["prop"])
box("DeskLeg2", (0.0, wf + 0.42, TZ + 0.5 + 0.2), (0.04, 0.2, 0.4), M["prop"])

# --------------------------------------------------------------- ABOUT
about = box("About", (-4.2, -2.5, Z0 + 0.8), (2.8, 2.2, 1.6), M["about"])
vault = cyl("About_vault", (-4.2, -2.5, Z0 + 1.6), 1.4, 2.2, "Y", None)
apply_bool(about, vault, "UNION")
af = -2.5 - 1.1
opening(about, "about", af, "Y", -4.2, Z0, 1.1, 1.9)
opening(about, "about", -4.2 + 1.4, "X", -2.5, Z0 + 0.8, 0.7, 1.1, depth=0.4)
soften(about)
for i in range(4):  # bookshelf silhouette
    box(f"Shelf_{i}", (-4.2, af + 0.45, Z0 + 0.35 + 0.35 * i), (0.9, 0.12, 0.03), M["prop"])

# ---------------------------------------------------------------- PLAY
play = box("Play", (3.6, 2.2, Z0 + 2.2), (2.2, 2.2, 4.4), M["play"])
roof = box("Play_roof", (3.95, 2.5, Z0 + 4.4 + 0.35), (1.1, 1.1, 0.7), None)
apply_bool(play, roof, "UNION")
pf = 2.2 - 1.1
opening(play, "play", pf, "Y", 3.6, Z0 + 2.7, 1.0, 1.0, depth=0.5, shape="round")
opening(play, "play", pf, "Y", 3.6, Z0, 0.8, 1.4, depth=0.5)
soften(play)

# ------------------------------------------------------------- CONTACT
contact = box("Contact", (3.8, -2.6, Z0 + 1.1), (2.4, 1.8, 2.2), M["contact"])
cf = -2.6 - 0.9
opening(contact, "contact", cf, "Y", 3.8, Z0, 1.25, 1.8, depth=0.9)
soften(contact)
sphere("Lantern", (3.8, cf + 0.45, Z0 + 1.45), 0.1, INT["contact"])

# -------------------------------------------------------------- RESUME
# small pavilion with an overhanging roof slab; opens the resume link
resume = box("Resume", (0.7, -3.3, Z0 + 0.6), (1.6, 1.2, 1.2), M["resume"])
roof_r = box("Resume_roof", (0.7, -3.3, Z0 + 1.2 + 0.07), (2.0, 1.6, 0.14), None)
apply_bool(resume, roof_r, "UNION")
rf = -3.3 - 0.6
opening(resume, "resume", rf, "Y", 0.7, Z0, 0.8, 1.0, depth=0.6)
soften(resume, 0.035)
box("Resume_sheet", (0.7, rf + 0.5, Z0 + 0.45), (0.32, 0.02, 0.42), M["plinth"])  # a lit page inside

# --------------------------------------------------------------- trees
for i, (x, y, s) in enumerate([(-6.0, 1.5, 1.0), (-5.6, 3.6, 0.8), (1.6, 3.9, 0.9),
                               (6.1, -1.3, 0.85), (-1.8, -3.9, 0.6)]):
    cyl(f"Trunk_{i}", (x, y, Z0 + 0.35 * s), 0.06 * s, 0.7 * s, "Z", M["trunk"], segs=12)
    for j, (dx, dy, dz, r) in enumerate([(0, 0, 0.95, 0.45), (0.25, 0.1, 0.75, 0.32), (-0.2, -0.15, 0.8, 0.34)]):
        sphere(f"Leaf_{i}_{j}", (x + dx * s, y + dy * s, Z0 + dz * s), r * s, M["leaf"])


# ------------------------------------------- model tags, north arrow, scale
def tag(text, loc, size=0.3):
    cu = bpy.data.curves.new(f"Tag_{text}", "FONT")
    cu.body = text
    cu.size = size
    cu.extrude = 0.004
    cu.align_x = "CENTER"
    ob = bpy.data.objects.new(f"Tag_{text}", cu)
    ob.location = loc
    ob.data.materials.append(M["ink"])
    coll.objects.link(ob)


tag("01  WORK", (-1.75, -2.75, Z0 + 0.002))
tag("02  ABOUT", (-4.2, -4.35, Z0 + 0.002))
tag("03  PLAY", (5.75, 0.55, Z0 + 0.002))
tag("04  CONTACT", (3.8, -4.35, Z0 + 0.002))
tag("05  RESUME", (0.7, -4.35, Z0 + 0.002))
tag("STUDIO AP  ·  SITE MODEL  ·  1:200", (-3.6, 4.35, Z0 + 0.002), 0.22)
# north arrow
na = bpy.data.meshes.new("North")
bm = bmesh.new()
vs = [bm.verts.new(p) for p in [(0, 0.45, 0), (0.18, -0.25, 0), (0, -0.1, 0), (-0.18, -0.25, 0)]]
bm.faces.new(vs)
bm.to_mesh(na); bm.free()
nob = link("North_arrow", na, M["ink"])
nob.location = (6.2, -3.9, Z0 + 0.003)
tag("N", (6.2, -3.15, Z0 + 0.002), 0.22)
for i in range(4):  # scale bar
    box(f"Scale_{i}", (5.0 + i * 0.3, -4.55, Z0 + 0.003), (0.3, 0.07, 0.004),
        M["ink"] if i % 2 == 0 else M["plinth"])

# -------------------------------------------------------------- lighting
world = bpy.data.worlds.new("Dusk")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = srgb("#c9b5c4")
bg.inputs["Strength"].default_value = 0.5

sun_d = bpy.data.lights.new("Sun_dusk", "SUN")
sun_d.energy = 1.9
sun_d.color = (1.0, 0.68, 0.48)
sun_d.angle = math.radians(4)
sun = bpy.data.objects.new("Sun_dusk", sun_d)
sun.rotation_euler = (math.radians(70), 0, math.radians(-130))
coll.objects.link(sun)

# ---------------------------------------------------------------- camera
target = bpy.data.objects.new("Cam_target", None)
target.location = (0.3, 0.0, 1.5)
coll.objects.link(target)
cam_d = bpy.data.cameras.new("Cam")
cam_d.type = "ORTHO"
cam_d.ortho_scale = 21.5
cam = bpy.data.objects.new("Cam", cam_d)
az, el, dist = math.radians(28), math.radians(30), 40
cam.location = target.location + Vector((math.cos(el) * math.sin(az), -math.cos(el) * math.cos(az), math.sin(el))) * dist
con = cam.constraints.new("TRACK_TO")
con.target = target
con.track_axis = "TRACK_NEGATIVE_Z"
con.up_axis = "UP_Y"
coll.objects.link(cam)
scene.camera = cam

# ---------------------------------------------------------------- render
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 48
scene.cycles.use_denoising = True
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.film_transparent = True

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "studio_ap_site_model.blend"))
print("saved")
