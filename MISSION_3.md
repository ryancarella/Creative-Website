# Mission 3 · Interactive truck integration

The homepage's large `meal-bowl.jpg` hero figure was replaced with the confirmed **Carellas Kitchen** truck presentation. Its original headline, description, calls to action, and caption remain. The food image is retained on the menu/pricing page. Navigation, menu categories, all five prices, product descriptions, comparison tools, portion planner, and launch information are preserved.

## Confirmed asset

Source: `Venture_3D_Confirmed_Handoff (3).zip`, confirmed November 6, 2026 at 19:10:53 UTC. Schema 1.0; 108 meshes; four embedded images; 1,073,276 model bytes; meters; +Y up and +X forward.

SHA-256: `cfd7695b7ae037e68f551c9239ce6d8de5ce9a1346ffcd3660b53ae6df685f45`.

The older packages in the workspace contain the same editable component definitions. The newest valid confirmed package was selected. The GLB is copied byte-for-byte without changing its geometry, branding, or materials.

## Presentation

- Drag to rotate, including horizontal touch gestures on supported devices. Vertical touch gestures and mouse-wheel scrolling remain available for the page.
- Three-quarter, serving-side, and front views; zoom buttons; reset. Controls support keyboard focus.
- Preferred direction is read from the handoff camera, with responsive framing calculated from the model's bounds. Softbox lighting follows the handoff, adapted to the existing cream/green website theme. Transparent canvas and a receiving shadow integrate the model into the hero.
- No automatic spinning. Camera transitions and entrance fading respect reduced-motion preferences.
- The viewer code loads separately when the hero approaches the viewport; rendering pauses offscreen and in hidden tabs. Pixel ratio and shadow resolution are capped.
- SHA-256 is checked before displaying the model. Fetch failures, invalid assets, unavailable WebGL2, and graphics context loss show the confirmed PNG with a static-preview label. Visitors can also choose static mode and retry interactive mode.

## Run and deploy

Use Node 24 and pnpm 11.19.0, matching the existing workflow. `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm build`, and `pnpm dev` work with the original React/TypeScript/Vite framework. The build validates model integrity before compiling. Vite base remains `/Creative-Website/`; the existing GitHub Pages workflow is preserved.

Live target: https://ryancarella.github.io/Creative-Website/

Recoverable original: branch `backup/pre-mission-3-2026-11-06`, commit `717533f`. The integration is built on the existing Git history.

## Revise the model later

1. Open Mission 2 at https://ryancarella.github.io/Food-Truck-3D/ and restore your editable project if needed.
2. Make changes, choose Confirm Model, and download a new `Venture_3D_Confirmed_Handoff.zip` inside the root workspace.
3. Rerun Mission 3 with the new package. It must be validated before replacing `public/models/carellas-kitchen/model.glb`, `model-manifest.json`, and `preview.png` together.
4. Run validation/build and browser checks, then publish through the existing workflow. Never replace only the model while leaving an old checksum manifest.

Development-only URLs `?test-no-webgl` and `?test-reduced-motion` support fallback and motion QA; these injections are removed from production. `?view=static` is a supported visitor preference in both development and production.

## Limits

The truck remains the stylized Mission 2 concept with approximate dimensions. WebGL2 is required for interactive rendering; the fallback still presents the actual confirmed preview. Responsive browser checks do not replace testing on physical touch devices. No ordering, launch dates, product claims, or prices were added or altered.
