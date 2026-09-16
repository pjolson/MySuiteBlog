# CSV Error Translator feedback

This optional feature adds a private content backlog and a separate unsuccessful-search count. It does not add an error entry, a CSV file checker, an AI service, a mailing list, or a support ticket. The catalogue remains 119 entries across 35 guides. Work and synthetic testing are local. No deployment or transmission of existing client queries is requested or performed.

## Inspected stack and implementation choice

- The repository uses VitePress 1.6.4, Vue, and MiniSearch. `netlify.toml` builds the site with Node 22 and publishes `.vitepress/dist`.
- Header results settle after a 200 ms VitePress debounce. The translator reacts immediately to input. Neither had a submission event or existing search-event transport. The new counter uses a 1.2 second idle interval without delaying visible results. There is no maximum-wait timer that would send events during continuous typing.
- The repository contains Google Analytics (`gtag`) and Ahrefs scripts. No session-replay integration, request-body logger, existing server functions, database, or private review backend was found. Authenticated hosting and analytics account settings were not inspected or changed.
- The HubSpot contact form is a marketing/contact workflow, with no repository-owned private review endpoint, idempotency, or automatic 90-day retention. It is left available for direct support.
- The feature uses Netlify Functions and private Netlify Blobs, the existing host's storage primitive. No new analytics platform or external account is introduced. Development uses a local filesystem adapter with the same write, validation, review, and retention logic.

## Visitor flow

Only a full-catalogue miss offers **Help us cover this error** in the translator. A match hidden by context or category retains **Show all matches** instead. In header search, CSV candidates are checked independently of ordinary site results. A missing CSV candidate offers a button to the translator's review form, including when unrelated articles match.

The header handoff is an in-memory state change. It never puts the query into a URL. The editable form uses the supplied wording, preserves an available import type, includes **I'm not sure**, and requires no email. It captures only the edited message and the fields visible to the visitor when **Send for review** is pressed. Cancel returns focus to the opening button. There is no contact or newsletter creation.

`/api/csv-feedback` validates an exact schema: a random UUID, message (1 to 4,000 characters), optional note (up to 2,000 characters), an allowlisted import type, source, and catalogue version. The server supplies submission and expiry times. There is also a 28 KB request-body limit. The version is a generated content hash of the catalogue and matching/rendering source, never of visitor input.

The browser retains the same UUID on a retry of the same draft. Storage uses a conditional create and a confirming read before responding with success. Concurrent retries and a lost response after a successful write do not create extra submissions. A changed draft is a distinct deliberate submission. A failed request preserves the text, note, and context. Metrics and storage failures do not stop search or guide navigation.

## Counts and privacy

`/api/csv-search-event` accepts only a random UUID, source (`header` or `translator`), selected import type and category, `unfilteredMatches`, outcome (`unknown` or `filtered`), and catalogue version. The server supplies time. There is no query text, fragment, identifier, length, query hash, URL, or visitor ID in that record. Extra properties and non-allowlisted dimensions are rejected.

Each interface waits for typing to settle. Recomputing results, changing a filter, opening a guide, clearing the input, and handing off from header to translator do not create another event for the same unchanged attempt. Pending events are cancelled on unmount. Clearing and then making another search starts a new interaction. Header counts can include ordinary site searches for which no CSV guide exists; the private report labels that limitation.

Counts are best effort: offline requests, blocked requests, and rate-limited requests are dropped without interrupting search or creating a background retry stream.

Google Analytics is disabled for the remainder of the tab before search interaction using its documented `ga-disable` flag. Direct translator loads set it before the Google script loads; opening header search elsewhere sets it before typing. This deliberately reduces GA reporting after a search interaction and prevents remotely configured automatic form/search measurement from collecting that interaction. Ahrefs receives no new custom event or properties. The existing header form and the review form prevent native submission, have no action URL containing text, and have no email field. Ahrefs documents that prevented form submissions are not automatically tracked. No HubSpot form or tracking code is added to this flow.

No request bodies or submitted values are logged. Error responses are generic. The private review page loads no analytics or scripts and uses a restrictive CSP. Browser acceptance checks block external requests and inspect local payloads using synthetic fixtures. Future additions of analytics, replay, reverse-proxy body logging, or HubSpot non-form capture need another privacy review; live account settings have not been verified by this local change.

## Private review access

Run `npm run dev -- --host 127.0.0.1 --port 5173` and visit `/private/csv-review` on that local origin. The browser requests HTTP Basic authentication:

- Username: `reviewer`
- Local password: the generated value in `.local/csv-feedback/review-password`

The password file and local records are ignored by Git and denied by Vite's file server. The password is not bundled into browser code. `CSV_FEEDBACK_LOCAL_DIR` can point tests to isolated temporary storage. VitePress's ordinary `npm run preview` is a static preview; use the development server for the local feedback backend.

For a future Netlify deployment, set `CSV_REVIEW_PASSWORD` to a randomly generated secret of at least 24 characters in the **Functions** environment scope. Never use a `VITE_` variable or put the value in source. Submission and metrics endpoints fail closed while reviewer access is unconfigured. Netlify supplies storage credentials to functions; there are no storage credentials in public code. No production password has been set by this task.

The private list shows submitted text as escaped text, context, first and last dates, repeat count, every optional note, source/version, and status. Statuses are **New**, **Investigating**, **Covered**, and **Not enough detail**. Exact message/context duplicates share a group, with individual notes retained. Numbers, field IDs, record types, case, and wording are preserved. A private JSON download is available at `/private/csv-review/export`; exports are sensitive copies that the reviewer must manage separately.

Status changes and deletion require authentication and a same-origin POST. **Delete raw submissions** removes every message and note in that group. Text-free UUID tombstones remain until the original expiry so a delayed retry cannot restore deleted content. Submitted text is explicitly labelled as untrusted data in the review interface, including for later AI-assisted editorial work. Useful cases must be rewritten into synthetic examples and manually reviewed before adding public content.

## Retention and operational behavior

Each raw submission expires 90 days after its own original receipt. A later duplicate does not extend older messages' retention. Expired records are excluded and removed when the review list/export is read. The Netlify scheduled function deletes expired submissions, text-free retry tombstones, events, and review metadata hourly, including when nobody opens the list. The local server runs the same cleanup at startup and hourly while running. An expired record is unavailable to the review interface immediately; physical scheduled cleanup runs on the next hourly invocation. Downloaded exports are outside server retention.

Netlify function rate limits are 10 submissions, 60 metric events, and 30 review requests per minute per IP/domain. Local development also limits requests in memory. No IP is stored in a feedback/event record. Production data uses the private site-wide `csv-error-feedback` store. Netlify's project members and server-side functions can access that store through platform permissions; it has no public read route.

## Source references

- [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/): private site stores, strong consistency, and conditional writes.
- [Netlify function API](https://docs.netlify.com/build/functions/api/): routes and function rate-limit configuration.
- [Netlify scheduled functions](https://docs.netlify.com/build/functions/scheduled-functions/): hourly cleanup and production scheduling.
- [Google tag privacy controls](https://developers.google.com/tag-platform/security/guides/privacy): the `ga-disable` switch.
- [Ahrefs tracked events](https://help.ahrefs.com/en/articles/11381932-tracked-events-in-ahrefs-web-analytics): automatic form event behavior.
- [HubSpot non-HubSpot form requirements](https://knowledge.hubspot.com/forms/use-non-hubspot-forms): existing marketing form capture is not a suitable review backend.

## Local acceptance results

- Production VitePress build succeeds. The guide count remains 35, with all 119 catalogue entries searchable.
- All 60 automated tests pass. They cover the existing matcher and generated site plus submission validation, concurrent idempotent writes, read-back confirmation, lost-response retry, exact duplicate grouping, text-free metric schemas, authentication, same-origin changes, safe rendering, private exports, deletion and retry tombstones, 90-day expiry, settled-search deduplication, filtered outcomes, service failure, rate limits, and private-code exclusion from public bundles.
- All four Netlify functions bundle locally for Node 22 with esbuild. This is a local bundle check, not a deployment or a test against production Blobs.
- Headless Chrome checks against an isolated loopback server pass for continuous typing, opening/editing/cancelling without message transmission, an edited submission, selected import context, a successful write followed by a lost response and safe retry, private authentication/export, status changes, deletion, XSS text rendering, and denial of the local password file.
- Browser checks also pass for filter-hidden matches, header misses despite ordinary article matches, header-to-translator navigation without a query URL or double count, opening the form when already on the translator, source attribution, mobile dark layout, no query persistence in browser storage, and usable search while both feedback endpoints fail.
- Desktop, mobile, and private-review screenshots were inspected. All browser input was synthetic, external requests were blocked, and test storage was isolated under `/private/tmp`.
- The new production dependency passes `npm audit --omit=dev` with zero reported vulnerabilities. Existing development dependencies were not upgraded as part of this feature.
- No production credentials were accessed or set. No production submissions, metrics, deployment, or account configuration changes were made. The scheduled cleanup logic is tested with an advanced clock; its actual Netlify schedule can only be checked after a separately authorized deployment.
