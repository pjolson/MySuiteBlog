# CSV translator follow-up: local investigation, 16 September 2026

No deployment, commit or push. Existing uncommitted website work was preserved.
All messages used in tests were synthetic. No real NetSuite account/import testing.

## Reproduced findings

- The supplied synthetic custitem reference already resolves uniquely to ITM-03 in searchEntries. groupResults keeps that entry and its stable section URL. headerResults uses the same URL. Browser navigation reaches the correct anchor and the full query survives in the memory-only session. However, the result title was the shared guide title, and CsvGuideContext lists the four explanations in catalogue order: expense categories before custom item fields. Static guide sections also have that order. This is presentation, not a ranking failure.
- `Invalid inventorystatus reference key` finds FLD-01. Record references excludes it because the guide belongs to Inventory details, and the outside-filter notice appears. Reset clears both import context and category but previously said Show all import types. A separate narrow failure was reproduced: appending a value (`... key 123`) without issueinventorynumber yields no result because the family rule required the tail and fallback text search treated the value as a required term. The exact original partial message was not supplied; this reproduces its described interaction, not its exact text.
- The inventory follow-up starts with an empty choice (Choose an answer), verified in a fresh browser. Adding is not selected by default. Nothing establishes how the earlier screenshot acquired its selection.
- The VitePress header input has maxlength=64. A long-decimal synthetic quantity message is truncated there, unlike the translator input. The resulting fragment can still lead to the guide but fails to retain the complete original message. This was found in the broader browser sample.

## Small corrections

- Specific results use the selected entry title. Scoring, grouping and ambiguous-context choices remain unchanged.
- A uniquely matched explanation appears at the top of the guide with its first check, followed by the other explanations. The guide choice list puts that entry first. Direct navigation without a query retains all explanations and shows no invented match. Existing section anchors stay unchanged.
- The inventory-status rule now accepts a distinctive inventory-status reference fragment without requiring the final issue-number clause. It does not turn generic reference-key messages into this diagnosis.
- Show all matches clears both filters while preserving the query. Explicit filtering remains available.
- Counts distinguish matching guides and explanations and state the overall 117-entry/34-guide coverage.
- The inventory-status guide exposes a conditional Does the stock have a bin assignment? check outside the collapsed procedure. It applies only to bin-using items whose relevant stock lacks assignment; no particular bin is recommended.
- Removed the header input's 64-character truncation. No query values are added to URLs, storage or analytics. Copy-link behavior still shares the generic guide, not the pasted message.

## Coverage accounting

Source IDs were independently extracted from section 7 of the main project document. All 117 unique IDs equal the implementation entry set and the flattened guide membership set, with no missing/duplicate memberships. All entries are findable by title; the generated header search index contains every entry URL. Every destination HTML file contains its entry anchor and source links. There are 34 guide pages, separate from the 117 entries. No catalogue omission found.

## Validation

Baseline: 27 matcher/content tests passed; browser reproduced the custom-field ordering, filter notice/reset wording and blank stock-direction default.
After changes: local production build passes; 34 tests pass, including built search index, all destinations/anchors, custom field suffix/case/whitespace/value variants, missing value, partial inventory reference values, conditional bin wording and header input truncation guard.

All 14 synthetic browser cases passed through both entry points and destination pages. The browser run exercises translator search, header search and destination navigation for custom-field variants; generic reference key; item reference choices; partial inventory status; long decimal quantity; missing expense-report amount; malformed vendor-bill amount; saved-record script failure; unexpected error; and unknown custom message. It also checks query-preserving filter reset and fresh direct guide navigation. External network requests are blocked during the browser run.

These are implementation and local browser checks, not confirmation that a proposed fix resolves an actual NetSuite account error. No source-list inference, numeric-ID inference, automatic record creation, broad ranking rewrite or category removal was introduced. The original account's cause and the earlier Adding selection remain unknown.
