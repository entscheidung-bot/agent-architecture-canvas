# Agent Architecture Canvas

Browser-only Agent Engineering workbench: 13 canvases, architecture decisions, inventories, status colors, search, blockers, readiness, local persistence, validated import/export. Swiss editorial layout preserves the supplied prototype rather than adopting an admin-dashboard template.

## Development
Node 24+, `npm ci`, `npm run dev`. `npm test` runs Vitest domain and React interaction tests. `npm run build` performs strict TypeScript checking and Vite production build. React + TypeScript provide reusable typed UI; Vite produces lightweight static assets; Zod validates untrusted documents. No backend required.

## Structure
- `src/App.tsx`: shell, routing, editing, local file operations
- `src/components.tsx`: reusable fields, decisions, inventories, confirmation
- `src/domain/model.ts`: canonical schema, defaults, prototype migration
- `src/domain/rules.ts`: completion, blockers, readiness, architecture warnings
- `src/domain/reference.json`: data-driven canvases, guidance, inventory columns
- `src/style.css`: coordinated status/type tokens, responsive Swiss grid
- `.github/workflows/deploy-pages.yml`: test/build/deploy main through Pages Actions

## Canonical specification
Schema version **3.0** replaces prototype **2.0** DOM serialization. `document` holds UUID and ISO timestamps plus local-date `lastReviewed`; `agent` holds stable agent identity, metadata, contract, autonomy and lifecycle; `decisions` contains stable IDs, canvas, title, guidance, decision, status, notes and timestamp; `inventories` contains named resource arrays with UUID rows; `extensions` provides an explicit integration namespace. This is domain data, not React state or DOM fields. Runtime validation source of truth is exported `schema` in `model.ts`.

Example excerpt (complete exports include every decision and inventory):
```json
{"schemaVersion":"3.0","document":{"id":"document-uuid","createdAt":"2026-10-07T00:00:00.000Z","updatedAt":"2026-10-07T00:00:00.000Z","lastReviewed":"2026-10-07"},"agent":{"id":"agent-uuid","name":"Support Agent","version":"1.0","environment":"Development","owner":"Support","runtime":"Shared runtime","purpose":"Support customers","autonomyLevel":"L2","lifecycle":"DRAFT","may":"Prepare replies","never":"Send without approval"},"decisions":[{"id":"definition.0","canvas":"definition","title":"Purpose","guidance":"Define the outcome","decision":"Prepare customer support replies","status":"DEFINED","notes":"Reviewed by owner","updatedAt":"2026-10-07T00:00:00.000Z"}],"inventories":{"tools":[],"memory":[]},"extensions":{}}
```

Import parses and validates before offering replacement confirmation. Unknown versions, malformed structures, duplicate IDs and files over 5 MB are rejected. Prototype 2.0 metadata, indexed decisions and custom table rows migrate automatically; imported review date is preserved. Export validates then updates review date and timestamp, pretty-prints JSON, downloads locally. No files are uploaded.

Autosave debounces 400 ms to `agent-architecture.v3` localStorage. Existing prototype storage is migrated. Storage errors display an export-backup warning. Browser storage is device/origin specific, not encrypted; clearing browser data removes it. Export backups regularly. Never enter credentials.

Completion counts Defined and Not Applicable as resolved, divided by all decisions. Blockers and Needs Decision remain unresolved. Defined decisions require actual text for readiness. Any decision blocker, risk/threat blocker or failed evaluation/checklist prevents readiness. Architecture readiness is not a safety certification. Transparent warnings cover persistent-memory governance, L4/L5 human approvals, financial-tool policy, destructive-tool recovery, delegation policy, production blockers and empty Defined decisions.

## Extend
Add a canvas entry to `reference.json`; append `[title,guidance]` questions. Existing indexed IDs must never be reordered; append only. Add table column definitions to its table schema. Add rules to `rules.ts` with failing tests first. Future registry/policy/runtime integrations should consume the canonical spec, never scrape UI state.

## Pages
Workflow builds/tests main, uploads dist, deploys Pages. Enable GitHub Pages source **GitHub Actions**. Vite base is `/agent-architecture-canvas/`; change it if renaming the repository. Hash routes survive direct refresh and browser Back/Forward. No analytics, external scripts or CDN fonts. `noindex,nofollow,noarchive` requests search exclusion; it is NOT access control. The application code is public; working architecture data is not published.

## Limitations / next improvements
1. Versioned named documents and conflict-safe multi-tab editing.
2. JSON Schema generation and typed per-resource validation.
3. Formal reviewed/approved evidence separate from completion.
4. Browser end-to-end and automated accessibility coverage.
5. Opt-in local encrypted backups and richer registry exporters.

No login, cloud persistence, print features or backend. Architecture checks are advisory, not policy enforcement.
