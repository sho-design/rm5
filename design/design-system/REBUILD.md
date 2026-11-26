# Restoration Medical Website design system: source files

These are the exact files of the "Restoration Medical Website" design system (a claude.ai Design System artifact), saved here so it can be rebuilt in another Claude account, such as the clinic's Team account. Nothing in this folder ships with the website.

## What is here

- This zip unpacks to `REBUILD.md`, `blob-map.json` and `project/`.
- `project/`: every file of the design system at the path it has inside the artifact (`README.md`, `handouts.md`, `tokens.json`, `fonts/`, `components/` with the `RM` React bundle, previews and guidelines, and `assets/` with the Logos, Photography and Icons files and their notes).
- `project/design-system.json`: the index as it was in the original artifact. Its `assetGroups` record asset ids (`blob`) from the original account; those ids do not exist in a new account.
- `blob-map.json`: each original asset id mapped to the file in `project/assets/` it stands for. Three previews (`components/HandoutCareSheet`, `components/HandoutTopicSheet`, `components/Wordmark`) load assets by `/_blob/<id>`.

## Rebuild in a new account

No GitHub connection is needed. In the target account (for example the clinic's Team account), open a new Claude chat, attach this zip file, and ask:

> Rebuild the design system in this zip as a new Design System artifact named "Restoration Medical Website". Follow REBUILD.md inside it.

The steps, for that session:

1. Create one Design System artifact from the Design System type, titled "Restoration Medical Website".
2. Upload every image under `project/assets/` (`Logos/*.png`, `Photography/*.webp`, `Icons/*.svg`) to it as assets. Note each new id.
3. In a working copy, replace every `/_blob/<old id>` in the `components/**/preview.html` files with the new id of the same file, using `blob-map.json`.
4. Write a new `project/design-system.json`: keep `title`, `namespace` ("RM"), `libraries` (react and react-dom 18), `groups` and each group's `tile` and `order` from the saved index; rebuild each `assetGroups.<Group>.files.<name>` record with the new `blob` id, `size` and `type`; set `createdOnFiles` to now, `sections` and `blobs` to `{}`, `docs` to `{"sections":[]}`, and a fresh `lastChange`.
5. Publish all other files under `project/` unchanged, at the same paths (`components/index.d.ts` as `text/plain`), with the new index last.
6. Share the artifact with the organization from its Share menu.

## Keeping it current

When the website's tokens, logo or components change, update these files too (or rebuild them from the site, as described in the design system's README), so the copy here matches the live design system.
