# CSV Error Translator

This is the first phase of the project in `researchdocs/MySuite-CSV-Error-Translator-Project.md`: searchable, static explanations with optional context questions. No CSV reader, uploads, account connection, or AI service is implemented.

## Content

- `entries.json` retains all 119 context-specific entries, original IDs, source links, review notes, and the brief's documentation review date. That date records the supplied research, not a NetSuite account test.
- `guides.mjs` assigns each entry to one of 35 canonical guides and supplies human headings, import contexts, categories, and natural-language aliases. JRN-08 shares the numbers guide with JRN-07, with separate message matching and answer anchors. Its categories include both Transaction lines and Dates and numbers.
- `procedures.json` retains the reusable procedures from the brief. `render.mjs` scopes them to the record type and removes internal editorial references before publishing them. It also preserves the safe checks and source caveats for the six documented conflicts.
- `questions.mjs` supplies the optional follow-up checks. Only one follow-up disclosure can be open at a time.

Run `npm run generate:csv-guides` after changing content. The same command runs before `npm run dev` and `npm run build`. The generated Markdown pages under `tools/netsuite-csv-error-translator/` are committed content artifacts for VitePress's existing page loader and local search index. Edit the structured source rather than those generated pages. If removing or renaming a guide, explicitly remove its old generated page and consider a redirect separately.

`researchdocs`, `scripts`, `tests`, `server`, `netlify`, and `.local` are excluded from public routes, the sitemap, and the local search index.

## Search

`search.mjs` recognizes distinctive message families before falling back to the MiniSearch package already installed with VitePress. Full-message matching tolerates variable values without stripping meaningful limits such as 61 or 100%. Natural-language matching allows modest spelling errors; unknown messages do not get a fabricated answer. The original input is never normalized in place.

Both search entry points use this matcher. Results are grouped by canonical guide, with an answer anchor for specific matches and the context selector for ambiguous matches. Filters leave an explicit way to show matches outside the selected import type.

VitePress 1.6.4 has no result-transform hook. The small `mysuite-csv-header-search` Vite plugin redirects only the default `VPLocalSearchBox.vue` MiniSearch import to `header-search.mjs`. This keeps the existing overlay, keyboard shortcuts, focus management, appearance, section excerpts, and article index. It also adds a live result-count announcement. The adapter decorates `loadJSON().search()` with the catalogue matcher. The plugin fails explicitly if a VitePress upgrade changes the expected import; build tests verify that the compiled overlay uses the adapter. No installed dependency source is edited.

The local index contains one section per context-specific entry, including aliases and field identifiers. `searchSections()` supplies those sections; ordinary article indexing is unchanged. The adapter returns each matching canonical guide only once.

## Query handling

Search text and selected filters stay in memory for the current page session. They are not written to browser storage, query strings, titles, application logs, analytics events, or contact links. Header query persistence is disabled. Shared links and copied steps contain public guide content only. Reloading starts a fresh session.

An optional review form now lets visitors deliberately send an edited message, import context, and optional note. Opening, editing, or cancelling the form sends no message. Submissions use a private server-side store and are never published automatically. A failed request keeps its draft and random request ID for a safe retry.

The two search interfaces count unsuccessful attempts after 1.2 seconds without typing. Those events contain only allowlisted context, category, source, outcome, whether unfiltered matches exist, and the catalogue version, plus a random event ID. They never contain the query, fragments, identifiers, or a query hash. Filter changes alone do not create attempts. Counts and submissions are separate records. See [the feedback implementation notes](../../../researchdocs/CSV-Feedback-Implementation-2026-09-16.md) for storage, private review access, instrumentation, retention, and acceptance checks.

## Local validation

Run `npm run build` followed by `npm test`. Tests cover the supplied matching examples, catalogue completeness, ambiguous contexts, typo tolerance, wrong filters, unknown messages, significant numbers and identifiers, header/translator parity, existing article and service searches, compiled overlay integration, rendered metadata, links, anchors, sitemap coverage, source caveats, accessible control markup, and absence of file-checker controls.

`npm run dev -- --host 127.0.0.1 --port 5173` opens the normal local development flow. The translator is at `/tools/netsuite-csv-error-translator/`. Local validation does not deploy the site.
