# Site model (homepage)

The homepage hero is a Blender scene rendered into layered images.

| File | What it is |
| --- | --- |
| `studio_ap_site_model.blend` | The model. Edit this. |
| `build_site_model.py` | Rebuilds the starter scene from scratch (overwrites the .blend — only use it to start over). |
| `export_web_layers.py` | Renders everything the website needs into `public/model/`. |

## Updating the model after edits

1. Edit `studio_ap_site_model.blend` in Blender and save.
2. Export (takes ~5–10 min):

   ```bash
   blender -b model/studio_ap_site_model.blend -P model/export_web_layers.py
   ```

   Add `-- --preview` at the end for a quick low-res test.
   Or in Blender: **Scripting** tab → open `export_web_layers.py` → **Run Script**.
3. Commit the changed files in `public/model/` and push. Nothing in the code needs to change.

## Keep these working

- **Light switches:** the `LIGHT_SWITCHES` empty with `work / about / play / contact / resume` properties drives each building's window glow and lamp. New lamps or glowing materials can use the same drivers (copy one from `Lamp_work`).
- **Click areas** are traced from every mesh using that building's `Clay_<Name>` or `Interior_<Name>` material, or with the name in the object name (e.g. `Work_balcony`). Plants and props in other materials don't count, which is fine.
- **Push-in point** is the centre of the `Room_<key>` object (the glowing back wall).
- **Camera:** you can move it; the click areas follow automatically.
- **Key plan:** the little site plan on every inner page is traced from the same footprints, top-down, inside the `Plinth` object's bounds.

## Changing labels or links

Titles, captions, page colours and where each building links live in `app/data/portfolio.ts` → `rooms`.
The resume link is `RESUME_URL` at the top of that file.

## Backup: the original clay model

The first model (terracotta Work, sage About, blue Play, sand Contact, ochre Resume) is kept alongside the warm one:

| File | What it is |
| --- | --- |
| `model/original/studio_ap_site_model.blend` | The original model. |
| `public/model/original/` | Its renders, hover lights and click areas. |

To switch the homepage back, set `MODEL_THEME = "original"` at the top of `app/data/portfolio.ts`. That swaps the renders, the hover lights, the click areas, the homepage ground and the room colours together. Set it back to `"warm"` to return.

The export script only writes the warm model into `public/model/`. To re-export the original, run it on a copy of the original .blend and move the output into `public/model/original/`.
