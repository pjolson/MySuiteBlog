# MySuite CSV Error Translator

Project brief, website copy, error catalogue, and Codex handoff

Prepared for mysuite.tech. Research reviewed on September 16, 2026.

## Contents

- [1. What we are making](#1-what-we-are-making)
- [2. Fit with the current MySuite site](#2-fit-with-the-current-mysuite-site)
- [3. The visitor's path](#3-the-visitors-path)
- [4. Website wording](#4-website-wording)
- [5. Search behavior](#5-search-behavior)
- [6. How to use the catalogue](#6-how-to-use-the-catalogue)
- [7. Error catalogue](#7-error-catalogue)
- [8. Reusable troubleshooting steps](#8-reusable-troubleshooting-steps)
- [9. Follow-up questions and branching copy](#9-follow-up-questions-and-branching-copy)
- [10. Optional CSV checks](#10-optional-csv-checks)
- [11. Content structure for Codex](#11-content-structure-for-codex)
- [12. Documentation conflicts and editorial decisions](#12-documentation-conflicts-and-editorial-decisions)
- [13. Writing rules](#13-writing-rules)
- [14. Publication and measurement](#14-publication-and-measurement)
- [15. Acceptance criteria](#15-acceptance-criteria)
- [16. Implementation order](#16-implementation-order)
- [17. Handoff instruction for Codex](#17-handoff-instruction-for-codex)
- [18. Coverage and research record](#18-coverage-and-research-record)

## 1. What we are making

Give someone with a failed NetSuite CSV import a useful answer while the problem is still in front of them. They should be able to paste the error into MySuite's existing site search or into a dedicated translator page, find the relevant explanation, and leave knowing what to check next.

The answer should sound like an experienced consultant looking over their shoulder. Explain what NetSuite is trying to do, why it may have stopped, and how to narrow the problem down. When the message is ambiguous, ask a question that changes the advice.

This is a free resource on the consulting site. It should help people complete their work and give them a reason to remember MySuite. There is no email gate. A contact link belongs after the useful answer.

This document specifies the content and behavior. It does not implement the website, connect to NetSuite, or authorize changes in an account.

### What the research covers

The catalogue below covers the error cases found throughout Oracle's public **CSV Import Error Messages** branch, including cases described in the body of pages but omitted from their opening lists. It also includes the separate public error guides for events, expense reports, custom lists, manufacturing cost templates, manufacturing routings, and inventory cost revaluations. Supporting import documentation is used where it clarifies a fix. The inventory case from this conversation is identified separately as a field example.

Oracle describes its index as a collection of common errors. Neither Oracle's index nor this project should be presented as a list of every error NetSuite can produce. Account scripts, workflows, SuiteApps, features, and permissions can introduce other messages. Private SuiteAnswers articles were not accessed. This is a dated research snapshot, not a promise of complete coverage across all releases.

Source: [Oracle CSV import error index](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4568635774.html).

### What makes this useful

- Search accepts the message people actually have, including changing record numbers and quantities.
- The explanation names the affected field in ordinary language.
- Record type and import settings determine which advice appears first.
- Each answer gives a first check, then a short procedure when more detail is useful.
- Every documented explanation links to its Oracle source.
- Account checks are clearly distinguished from problems found in a supplied file.
- An optional later file checker can identify exact rows and compare an original export with an edited copy.

## 2. Fit with the current MySuite site

The live site was reviewed on September 16, 2026. Its header has a Search button with a Command-K shortcut. The search opens in an overlay, supports keyboard navigation, and returns links to specific sections of articles. A search for CSV returned sections within existing articles. The site has an appearance control and a restrained layout with green accents. The repository and search implementation were not inspected.

Use that existing interaction. Do not introduce a second site-wide search system or redesign the navigation to accommodate one tool. Codex should inspect the repository before choosing how to add records to the existing index.

Sources: [MySuite home](https://mysuite.tech/), [MySuite blog](https://mysuite.tech/blog/), and direct inspection of the public search overlay.

### Proposed locations

| Purpose | Proposed route |
| --- | --- |
| Main translator | `/tools/netsuite-csv-error-translator/` |
| Individual explanation | `/tools/netsuite-csv-error-translator/{slug}/` |
| Consulting contact | Existing `/contact/` |

These are proposed routes. Match the repository's established trailing-slash and routing conventions. Every explanation needs a stable link that opens the relevant answer immediately. A visitor should not have to paste the error again after selecting a search result.

Add the translator to the site's existing navigation or tools area using the label **CSV Error Translator**. Use existing typography, spacing, colors, focus states, and appearance settings. Keep the main search field near the top of the page on desktop and mobile.

## 3. The visitor's path

1. The visitor pastes an error or describes a symptom.
2. Show likely matches immediately. An import-type filter is available but is not required to search.
3. Open the best explanation when the match is specific. When multiple contexts fit, show a short choice of import types.
4. Show a short explanation and the first check before expanding the longer steps.
5. Ask at most one follow-up question at a time. The answer should change the next instruction.
6. Offer related errors, the Oracle source, and the MySuite contact link after the advice.

Do not display a made-up confidence percentage. Use factual labels such as **Message matched**, **A few possibilities**, **Found in your file**, and **Check in NetSuite**.

A matching message is not proof of a root cause. An error mentioning an item can concern a transaction line, a kit member, a related item, or a manufacturing cost category. Keep those contexts separate.

## 4. Website wording

The strings in this section are the proposed website copy. Braces identify values inserted by the application. Internal entry IDs, research notes, and procedure codes elsewhere in this document are for the implementation and must not appear in the visitor interface.

### Translator landing page

| Element | Copy |
| --- | --- |
| Browser title | NetSuite CSV Error Translator \| MySuite |
| Meta description | Paste a NetSuite CSV import error to find a plain-language explanation, practical checks, and links to Oracle's documentation. |
| Heading | NetSuite CSV Error Translator |
| Intro | Paste the error. Find out what to check. |
| Supporting paragraph | NetSuite import errors don't always tell you where the problem is. Find the message below for an explanation and a few practical checks. |
| Input label | Error message or problem |
| Input placeholder | Paste your NetSuite error, or try "invalid item" |
| Input help | You can paste the whole message, including any record numbers. |
| Submit button, if needed | Find the error |
| Import filter label | What are you importing? |
| Default filter option | All import types |
| Unknown type option | I'm not sure |
| Browse link | Browse errors by import type |
| Secondary browse heading | Common places imports get stuck |
| Browse choices | Record references; Required fields; Dates and numbers; Transaction lines; Inventory details; Scripts and permissions |
| Coverage note | This guide covers common errors. Your account's scripts and settings can produce other messages. |

### Search and results

| State | Copy |
| --- | --- |
| Optional site-search placeholder | Search articles, services, and CSV errors |
| Site-search group label | CSV import errors |
| Results count | {count} matching explanations |
| One result | 1 matching explanation |
| Clear action | Clear search |
| Specific result label | Message matched |
| Ambiguous result heading | This message has a few possible causes |
| Ambiguous result help | Choose what you're importing so we can narrow it down. |
| No result heading | We haven't covered this one yet |
| No result text | Try a shorter part of the message, such as the field name. If it mentions a script, the message may come from your account's custom code. |
| No result secondary action | Browse all errors |
| No result contact action | Ask MySuite for help |
| Empty submitted input | Paste an error message or describe the problem first. |
| Search failure | Search isn't available right now. You can still browse the error guides below. |
| All filters removed | Show all import types |

### Individual explanation

Use these labels in this order. Omit sections that have nothing useful to say.

| Element | Copy |
| --- | --- |
| Original input label | Your error |
| Explanation heading | What it means |
| First action heading | Check this first |
| Procedure disclosure | Show the steps |
| Branch heading | If that looks right |
| Evidence label for a supported possibility | Possible cause |
| Evidence label for file proof | Found in your file |
| Account verification label | Check in NetSuite |
| Scope reminder | These steps apply to {recordType} imports. |
| Source link | Read Oracle's guidance |
| Review stamp | Documentation checked {date} |
| Related section | Related errors |
| Share action | Copy link |
| Share success | Link copied |
| Steps copy action | Copy steps |
| Steps copy success | Steps copied |
| Back link | Back to the translator |
| Feedback question | Did this help you resolve the error? |
| Feedback options | Yes; Not yet |
| Positive feedback | Thanks. That helps us improve the guide. |
| Negative feedback | Thanks. You can try a related error or ask us to take a look. |

Do not say **Verified fix** unless the exact scenario has been reproduced and recorded. **Documentation checked** means that a source was read, not that every instruction was tested in a NetSuite account.

### Consulting invitation

Heading: **Still stuck?**

Text: **We can help you work through the file, the mapping, and the NetSuite setup behind the error.**

Button: **Talk to MySuite**

Destination: the existing contact page. Do not invent a booking link, price, response time, or service promise. Do not attach the visitor's error or file to the contact request automatically.

### Optional file checker copy, for a later release

Only show these controls when the corresponding feature exists.

| Element | Copy |
| --- | --- |
| Heading | Check the file too |
| Intro | An error message is a starting point. The CSV can show which rows need attention. |
| Current file label | CSV you tried to import |
| Results file label | Import results CSV, if you have it |
| Comparison file label | Original export, optional |
| Comparison help | Add the original to check whether quantities, IDs, or dates changed while the file was edited. |
| Action | Check file |
| Local processing notice | Your file is checked in your browser. It isn't uploaded to MySuite. |
| Invalid file | Choose a CSV file. |
| Ambiguous columns | Which column contains {fieldName}? |
| Duplicate headers | More than one column is named {header}. Choose the one you want to check. |
| Multiple error columns | This file contains several error columns. Which one came from your latest import? |
| No findings | We didn't find a problem in the checks this tool can run. The mapping or NetSuite setup may still need attention. |
| Clear data action | Remove files |
| Clear data confirmation | Files removed from this page. |

The local-processing notice is conditional on implementation and verification. Do not publish it if files, previews, errors, or extracted values are sent to a service. Version one does not need uploads or an AI service.

## 5. Search behavior

### One content source, two search entry points

The header search and translator search must use the same error entries. Each entry contributes its heading, short explanation, matching fragments, field identifiers, aliases, import contexts, and canonical URL. Existing articles remain in the header search. The dedicated page searches only the translator catalogue.

A header result should include the human title, the import context, and a useful sentence. For example:

**Inventory adjustment quantity exceeds stock**

*Inventory adjustments. Check the exact quantity, unit, lot, bin, and status. Small rounding changes can matter.*

Do not make every result lead to the translator homepage. Do not fill the general search with five copies of an entry because several aliases matched it.

### Matching rules for the implementation

1. Preserve the original pasted message for display in the current session.
2. Use a separate normalized search representation. Match without regard to letter case and tolerate repeated whitespace and punctuation around placeholders.
3. Recognize complete error families before broad keywords. Preserve technical field names such as `inventorystatus`, `issueinventorynumber`, `custitem`, `trandate`, `CostEstimate`, and `manufacturingworkcenter`.
4. Treat variable record IDs, names, dates, and quantities as parameters only after a message family has been identified. Do not remove every number. A character limit of 61, a 100% contribution limit, and a reported quantity have different meanings.
5. Never alter identifiers in a supplied file as part of search normalization. `OLD__PART-17` and `OLD_PART-17` are different strings. Numeric-looking lot numbers and external IDs may be text.
6. Rank a specific field and matching import context above a generic explanation. Do not hide other contexts when the user selected the wrong one; offer a clear way to remove the filter.
7. Use modest typo tolerance for natural-language searches. Do not fuzzy-correct actual account IDs, lot numbers, currencies, or quantities.
8. Keep distinct contexts for the same message. A missing amount on an expense report deserves different questions from a malformed amount on a vendor bill.
9. Treat the catalogue's **Match** column as distinctive fragments, not a library of complete exact-message strings. Combine fragments with context and required/missing/invalid semantics. Broad words alone must not establish a diagnosis.
10. For short or ambiguous queries, show choices. For an unknown error, say it has not been covered. Do not manufacture an explanation.

### Useful aliases

| Visitor wording | Search concepts |
| --- | --- |
| invalid key; bad reference; can't find item | Reference type, name, internal ID, external ID |
| item exists but import can't find it | Reference type, eligible record, import context |
| no lines; missing item; empty transaction | Sublist mapping, linked files, line keys |
| says amount is blank | Amount, rate, quantity, numeric format, required field |
| available but can't adjust | Inventory balance, lot, bin, status, units, precision |
| Excel changed my numbers | Precision, scientific notation, text identifiers |
| wrong date; date became a number | Date format, spreadsheet conversion |
| already exists; duplicate import | External ID, Add versus Update, existing record |
| worked in the form | Role, form, default values, required fields, script context |
| import failed but record exists | Post-save script failure, afterSubmit |
| location doesn't work | Location, subsidiary, routing multi-select syntax |

These are editorial search aids, not claims that every listed cause applies to every query.

### Search privacy

Do not include raw messages, customer names, record IDs, or CSV values in analytics events, URLs, page titles, error logs, or feedback submissions. Shared links should contain only the public explanation slug. Keep pasted messages and file data in memory for the session unless a separate feature explicitly offers something else. Audit the existing header search's query logging before feeding pasted errors through it.

## 6. How to use the catalogue

Each row is a context-specific answer candidate. The stable ID is an internal key. **Match** gives short fragments or field identifiers that help recognize the message. **Explanation and first check** is visitor copy. **Guide** names the reusable procedure in Section 8. The section's source applies to its rows unless an entry links another source.

Some messages appear in several sections. Keep the separate answers and ask which import the visitor is running. Do not count variants as different errors in marketing copy.

The short entries are deliberately concise. Present the explanation first, with the relevant steps available immediately below it. Do not display the entire catalogue as a wide table on mobile. Render entries as ordinary pages or expandable results.

Items marked **Review** have a documented ambiguity, a conflicting source, or a workaround that requires an account-specific decision. Their safe explanatory content can be used, but the disputed procedure must not be presented as a routine fix.

## 7. Error catalogue

### General imports

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568642498.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| GEN-01 | `name/parent` | A list selection may be repeated. Check multi-select IDs. | P08 |
| GEN-02 | `re-upload` | NetSuite couldn't read the file. Check encoding. | P02 |
| GEN-03 | `Mandatory field` | A required value isn't reaching NetSuite. Check mapping and separators. | P03 |
| GEN-04 | `permissions` | This field may be unavailable for import. Check read-only settings. | P03 |
| GEN-05 | `effective date` | The date format doesn't match. Check your preferences. | P05 |
| GEN-06 | `Saved Search` | A field depends on an inaccessible search. Check existence and audience. | P11 |
| GEN-07 | `amount` | NetSuite can't determine the amount. Check numbers and duplicate input. | P04 |
| GEN-08 | `columns` | A row has too many fields. Check quotes and separators. | P02 |
| GEN-09 | `AfterSubmit` | The record saved before a script failed. Check that record before retrying. | P11 |
| GEN-10 | `personal language` | Language settings may slow the import. Compare preferences. | P12 |
| GEN-11 | `Custom Record` | Another record uses this identifier. Check existing external IDs. | P01 |
| GEN-12 | Symptom: text became a date | Excel may have changed the value. Compare the original. | P04 |

### Employees and expense categories

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568655075.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| EMP-01 | `Currency`, required-value wording | The expense report expects a currency. Map the expense currency or choose a default that applies to every affected line. If the expenses genuinely use only the employee subsidiary's base currency, review the report's multicurrency setting. | P03 |
| EMP-02 | `category`, reference-key wording | The expense category cannot be matched. Check its active state, displayed name, and mapping reference type. | P01 |
| EMP-03 | `61`, expense-category field length | The expense-account value is too long for this field. Check that the intended value belongs here before shortening it. | P03 |
| EMP-04 | `employee`, reference-key wording | The time entry cannot match the employee supplied. Compare the employee value with the mapping's choice of name or internal ID. | P01 |

### Leads, prospects, and other relationship records

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570061540.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| REL-01 | `Lead Source` | NetSuite cannot match the lead source. Check the configured list and include the campaign identifier when it forms part of the displayed value. The list's location depends on whether Marketing Automation is enabled. | P01 |
| REL-02 | `incoming`, `email` | An email value is missing or invalid in this import. Inspect the mapped email column and the rows being processed. | P02, P03 |
| REL-03 | `entity`, already-exists wording | Another entity may already own that external ID. Search entities by the value and establish which record the import is meant to create or update. | P01 |

### Customers

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568672490.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| CUS-01 | `Primary name` | The customer cannot be identified. Use its internal ID, external ID, or customer ID. | P01 |
| CUS-02 | `Matched more` | Several customers fit. Add a unique customer identifier, especially for parent and child customers. | P01 |
| CUS-03 | `Type` | The selected customer form requires a type. Check the field and form settings. | P03 |
| CUS-04 | `vatregnumber`, `20` | The tax registration value exceeds the field's length. Check the value before editing. | P03 |
| CUS-05 | `country`, `state/province` | Country and state do not agree. Check both values and whether Country is exposed. | P05 |
| CUS-06 | `isperson` | NetSuite needs to know whether this customer is an individual or company. Map the choice. | P03 |
| CUS-07 | `Illegal ID` | The customer type may be hidden on the import form. Check the form and default type. | P03 |

### Customers imported together with contacts

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568677178.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| CON-01 | `Illegal ID` | This combined import expects company customers. If the customer is an individual, choose the customer-only import and handle the contact separately. | P09 |
| CON-02 | `company`, reference-key wording | The linked customer may be inactive. Check the customer before changing the contact mapping. Oracle describes importing with an active customer and inactivating afterward; only use that sequence when the intended customer lifecycle supports it. | P01 |

### Prospects imported together with contacts

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568678135.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| PRO-01 | `That Record Does Not Exist` | The prospect and contact data may be mapped to the wrong records. Check their identifiers and phone mappings separately. Prospect fields belong to the prospect section; the contact's ID and phone belong to the contact section. | P09 |

For PRO-01, build a customer search filtered to the prospect stage. Include the prospect identity and phone, plus the contact's name and internal ID. This gives you separate identifiers for the two records before preparing an update. The broad error text alone does not establish that a phone mapping is the cause.

### Item records and pricing

Each entry in this section has its own source.

#### ITM-01. A quantity price break has no starting price

Match: `Please Enter Missing Price(s)`

The higher quantity break is present, but the starting price is missing. Include pricing for quantity zero as well as the later quantity breaks. Check the existing item before changing the price table.

Guide: P10. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534426053.html)

#### ITM-02. A unit has no unit type to belong to

Match fields: `purchaseunit`, `saleunit`, `stockunit`, with `unitstype` and a blank value.

NetSuite needs the item's unit type before it can accept its purchase, sales, or stock unit. If the item has no unit type, map the correct one along with the unit fields. Check that each unit belongs to that type. An identifier for a unit is not an identifier for a unit type.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534426135.html)

#### ITM-03. A custom item field cannot match its selection

Match: `custitem`, reference-key wording.

The value supplied to a custom item field does not match an allowed selection. Identify the field from its script ID, then inspect the list or record it references. Check spelling, spaces, and the chosen reference type. For several selections in one cell, check the multi-select separator too. Confirm a missing selection belongs in the list before adding it.

Guides: P01, P08. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534426278.html)

#### ITM-04. A related item uses a different display name

Match: `Invalid Item Reference Key`, in related or presentation items.

For this import, a related item's store display name can affect name matching. Check the displayed value on the related item and whether the mapping expects a name or internal ID. If the store display name is populated, Oracle identifies that name as the relevant name reference in this scenario. This explanation is specific to related items.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534426643.html)

#### ITM-05. A location-specific update is missing the location key

Match: `Adding New Line to Sublist Locations is not Allowed`

NetSuite cannot tell which location row to update. Map the location within the item's Locations sublist when importing values such as reorder point or preferred stock level. A location elsewhere in the import does not necessarily identify this sublist row.

Guides: P01, P06. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534427025.html)

#### ITM-06. An item update would remove a subsidiary already in use

Match fragments: `remove subsidiary`, `used on a transaction`.

The imported subsidiary list may replace the existing selections and leave out a subsidiary needed by earlier transactions. Prepare the complete intended set in one multi-select cell, including subsidiaries that must remain. Check the separator and mapping. Do not solve this by changing the historical transactions.

Guide: P08. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534427412.html)

#### ITM-07. A related item is missing its presentation type

Match: `Type`, required-value wording, in presentation items.

The related-item line needs its type as well as the referenced item. Inspect the presentation-item mapping, identify the existing main item, and provide the related item's type. Oracle describes an Update import for this case. The source's example mapping labels are unclear, so check the live field labels before following them literally.

Guide: P03. Review note D4 applies. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534428607.html)

#### ITM-08. A pricing update introduces a new matrix header

Match fragments: `existing headers`, `existing matrix`.

The pricing update refers to a header that is not already in the matrix. Decide whether you are updating existing breaks or replacing the price structure. Oracle's error-specific article describes supplying the full price matrix and enabling sublist replacement, but its general sublist guidance cautions against that option for item pricing. Do not present replacement as an automatic fix.

Guide: P10. Review note D1 applies. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534428723.html)

#### ITM-09. The item cannot match its asset or cost account

Match fields: `assetaccount`, `cogsaccount`.

The accounting reference does not match what the field expects. Use a verified account internal ID with the matching reference type, or match the account's displayed name, including hierarchy and account number when those are used. A mapping default is suitable only when every affected item should use the same account.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534428980.html)

#### ITM-10. A translated item import gives a generic failure

Match: `Unexpected Error`, in item translation work.

Oracle documents a case involving simultaneous item-name and store-display-name mappings, with translation language also needing attention. Check those mappings if you are importing translations. This short error is not enough to establish the cause on other item imports.

Guide: P11. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534429388.html)

#### ITM-11. The price level cannot be matched

Match: `price level`, reference-key wording.

Check the price level under the accounting lists, including inactive entries. Compare its name with the CSV value. If the import should use one price level throughout, select that level as a mapping default. Do not use a default when the file deliberately includes different levels.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534429620.html)

#### ITM-12. The parent and child have different item types

Match: `parent`, reference-key wording, when setting an item's parent.

The proposed parent may be a different kind of item. Compare both item types with the record type selected for import. Correct an incorrect import selection first. If the item hierarchy itself needs redesign, review that separately. Oracle discusses replacing an incorrectly typed parent; deletion is not a routine troubleshooting step.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534429813.html)

#### ITM-13. NetSuite could not find a matching record

**Title:** NetSuite could not find a matching record

**Summary:** Check how the import identifies the existing record. Names, internal IDs, and external IDs are different ways of finding it.

**Message may mention:**

`Could not find any records by this name.`

**What it means**

NetSuite could not match a record needed for this row. If you are updating existing records, start with the value that tells NetSuite which record to change. If that checks out, look at the records referenced by the other mapped fields.

The message does not tell you which lookup failed. It does not establish that the record was deleted, that you selected Name as the reference type, or that the item is a matrix item.

**Check this first**

Pick one failed row. Check the import's Record Type, Data Handling setting, and the field used to identify the record being updated. Compare that identifier with the actual record in the same NetSuite account.

For an Inventory Item import using Update, begin with the item's own identity. The ID of a vendor, account, parent item, or another related record will not identify that item.

**Show the steps**

1. Open one intended record in NetSuite. Confirm that it is the record you want to change and that the import's Record Type matches it.
2. On **Field Mapping**, find the mapping that identifies the record itself. Check the NetSuite destination field, not just the CSV column heading.
3. Compare the saved CSV value with the record's identifier. Use the relevant branch below for names, internal IDs, or external IDs.
4. If the identity matches, inspect the related fields in the same row. A correct item ID does not establish that its parent, vendor, account, or custom-field reference is also correct.
5. Correct the confirmed mismatch and retry one intended update. Check the resulting record before rerunning the remaining failed rows.

Use **Update** when changing existing records. Switching to **Add or Update** can create records that were not intended, so it is not a general fix for a failed match. [Data handling options](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N345294.html)

**Useful question:** How are you identifying the record being updated?

Choices: Internal ID; External ID; Name; I'm not sure.

### If you are using Internal ID

Export the intended records with **Internal ID** as a results column. Compare that export with the failed rows and map the values to the record's **Internal ID** field. Confirm that the export came from the account receiving the import.

An item number that happens to contain only digits is still not necessarily an internal ID. Check where the value came from.

### If you are using External ID

Confirm that the exact external ID is already stored on the intended record. A code from another system cannot identify an existing NetSuite record unless that association has been established.

### If you are using Name

Compare with an export of the record's actual name or item number. Check spaces, punctuation, and any required parent information. Do not substitute a description or display label without checking what that field expects.

If you are changing the name itself, use a verified internal ID to identify the existing record and map the new name separately. This avoids relying on the new name to locate the old record.

### If you are not sure

Inspect the mapping before changing the CSV. For an existing-record update, a fresh export containing Internal ID provides a clear way to identify the intended records. [Oracle's guidance on matching updates](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N3924743.html)

### If this is a matrix-child item update

Oracle documents this exact error when a matrix child is identified incorrectly by name. Keep the child and parent in separate fields:

| Item Name/Number | Subitem of |
| --- | --- |
| Shirt-Blue-Small | Shirt |

Do not put `Shirt : Shirt-Blue-Small` in **Item Name/Number** for this scenario. Alternatively, identify the child using its verified internal ID.

This example is specific to matrix-child updates. Other imports can have different name and hierarchy requirements. [Oracle's matrix-child example](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534429898.html)

### If this is a Chart of Accounts update

Check which ledger account the row identifies. Keep its account number, name, and internal ID distinct. A verified account internal ID can identify the existing account while other mapped fields supply the intended changes.

If a mapped field references an account **by name**, check the complete value expected by that field. For example, when its list shows `42000 Product Sales`, supplying just `42000` or just `Product Sales` does not match Oracle's documented format. This rule concerns that account reference; it does not mean every Account Name column should have a number added to it. [Account import and reference guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N357847.html)

### If this is a Vendor-Subsidiary Relationship import

For **Update**, check that the intended vendor-subsidiary relationship already exists. Open the vendor's **Subsidiaries** subtab and compare it with the row being imported.

Then review the relationship import's identity fields and its separate **Vendor** and **Subsidiary** mappings. Check what each supplied ID identifies before using it. The relationship does not have a standalone record page in the usual interface.

If the relationship is new, confirm that creating it is the intended task before choosing the appropriate data-handling option. [Vendor-subsidiary import guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1529508258.html)

**If that looks right**

For a dropdown or list field, open its mapping settings and compare the selected reference type with the supplied value. The option may be Name, Internal ID, External ID, or another supported type. Not every field supports every option. These settings are separate from mapping the main record's own Internal ID. [Reference types](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N349594.html)

If the message includes a script error or stack trace, have the script owner identify the failed lookup. The short message alone cannot establish whether the failure came from the import's record matching or another lookup during processing.

**Related guides**

- Record type does not match the record being loaded: INV-02.
- An item reference cannot be matched: choose the entry for the visitor's import context.
- Spreadsheet changes to names and identifiers: P04.
- Scripts and permissions: P11, when the error details point there.

**Still stuck?**

Keep one failed row, the complete error, and screenshots of the import options and field mapping together. Those show what the import was trying to find.

**Contact link:** Ask MySuite for help

## Evidence and scope

Reviewed September 16, 2026.

- Oracle's [Error Status Codes](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N3539978.html) associates this wording with **RCRD_NOT_FOUND**. That identifies the message family, not the failed record or its cause.
- The matrix-child article directly documents this error and a specific correction. Keep that correction conditional on the item actually being a matrix child.
- The update, identifier, account, and vendor-subsidiary pages support the checks above. Those checks are a troubleshooting sequence assembled from the documentation, not proof of the cause in the reported client account.
- The supplied screenshot shows SuiteAnswers results for Chart of Accounts and Vendor-Subsidiary Relationship imports. Their full error-specific articles were not supplied or accessed. Do not claim that these branches reproduce those articles' exact solutions.
- No NetSuite account was accessed and no resolution was tested. The client report confirms Inventory Item and Update only.

#### ITM-14. An item-defined cost contains currency formatting

Match: `CostEstimate`, invalid-value wording.

The amount may include a currency symbol the mapping does not expect. Compare the raw CSV value with the field's currency-format setting. For Oracle's documented case, supply the numeric amount without the symbol and select the corresponding no-symbol format.

Guide: P04. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534429970.html)

#### ITM-15. The parent reference is affected by display-name settings

Match: `parent`, reference-key wording, during matrix work.

A preference that displays item codes with display names can change the name needed by this import. Compare the CSV value with the displayed combination and keep the matrix-option and external-ID fields intact. Prefer correcting the reference over changing a company preference just to make a name match.

Guide: P01. [Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534430023.html)

### Assemblies

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569175605.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| ASM-01 | `member items` | The assembly has no linked component rows. Check the primary assembly file, member file, shared assembly identifier, and member item and quantity mappings. | P09 |
| ASM-02 | `Unexpected Error` | For the documented assembly case, check unit settings on the assembly and its components. Oracle also suggests resaving populated records, but that should follow a review of the affected records and automation. | P11 |

### Item demand plans

[Oracle error source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569177775.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| DMD-01 | `internal ID`, record-not-found wording | The import is not identifying the intended record. Distinguish the plan's identity from its item reference before changing the mapping. The error article's wording needs verification. | P01; Review D2 |
| DMD-02 | `start date`, reference-key wording | The plan dates may conflict with its year or end date. Supply a consistent period instead of changing the start date alone. | P05 |

The supported-fields documentation distinguishes the plan's body Internal ID, available for updates, from its required Item field. It also requires plan start and end dates, identifies the item replenishment method as Time Phased, and cautions against sublist replacement for these plans. Use those field distinctions when implementing DMD-01. [Supported fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N416996.html)

### Inventory worksheets requiring inventory detail

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569179830.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| IVD-01 | `configure the inventory detail` | This inventory worksheet is encountering a bin-detail requirement. Confirm that this is the worksheet import, rather than an inventory adjustment, before using worksheet-specific guidance. | P07; Review D3 |

Oracle's workaround temporarily changes an accounting preference requiring bins, then restores it after import. Keep that workaround in an administrator note. Do not suggest it as the first response to every missing-detail error, and do not apply it to another transaction type without verification.

### Inventory item records

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569181039.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| INV-01 | `Locale` | Creating the item and its translations together can cause this documented failure. First add the item with its required accounting, location, and pricing data, then update it with language and translated display values. | P09 |
| INV-02 | `SSS_RECORD_TYPE_MISMATCH`; record-load different-type message family | Confirm the intended target and compare its existing type with the requested type. Keep item-import and script checks distinct. | P01 |
| INV-03 | `Multiple values`, dropdown wording | The configured multi-select separator may appear inside an identifier. Choose an import separator absent from those values. Oracle also notes that a literal NULL setting can behave as a space. | P08 |

For INV-01, include the starting quantity price break when quantity pricing requires it. In the second pass, use Update and map the translation language and translated display name to the translation sublist.

### Kits and packages

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570007314.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| KIT-01 | `Invalid item reference key` | The kit cannot match a member item. Check that the member exists and is active, then align the member-item mapping with the name or internal ID in the file. The relevant field is the member reference, not the kit's own identity. | P01 |

### Transactions in general

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570011199.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| TXN-01 | `unique identifier` | The import needs a supported transaction identifier. Choose one appropriate to the record and operation. | P01 |
| TXN-02 | `Ambiguity` | Repeated items make line matching unclear. Identify existing lines explicitly. | P06; Review D5 |
| TXN-03 | `record already exists` | The identifier may belong to an earlier transaction. Find it before creating another. | P01 |
| TXN-04 | `trandate` | The transaction date does not match the expected format. Check the raw value. | P05 |
| TXN-05 | `contribution`, `100%` | Imported and existing sales-team percentages may exceed the allowed total together. Review the complete team. | P06 |

### Customer payments

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570023326.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| CPY-01 | `Could not find record`, `Internal ID` | Check whether the failing identifier belongs to the payment or the invoice it should pay. They are different records. Verify both references; a supplied internal ID can take precedence over an external ID. | P13 |

### Invoices and credit applications

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570024634.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| INVC-01 | `line item` | The invoice has no imported item line. Put the item in a CSV column and map the item sublist. A default by itself may not create the line. | P09 |
| INVC-02 | `apply`, `[doc,line]` | The application rows may repeat an invoice reference without a matching applied amount. Separate item rows from application rows and check the document being paid or credited. | P13 |
| INVC-03 | `item`, reference-key wording | The invoice cannot match its item. Check the invoice form's item selection, active state, and name-versus-ID mapping. | P01 |

### Journal entries

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570029068.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| JRN-01 | `account`, `subsidiary` | The account may not be valid for this subsidiary. Check eligibility and reference format. | P01 |
| JRN-02 | `department` | The department reference cannot be matched. Check hierarchy, active state, and reference type. | P01 |
| JRN-03 | `entity`, `currency` | The entity may not support the journal currency. Check its currencies and active state. | P01 |
| JRN-04 | `blank headers` | A column lacks a heading. Inspect the first CSV row. | P02 |
| JRN-05 | `Account`, required-value wording | A totals row may be treated as another journal line. Check the final records. | P02 |
| JRN-06 | `amortization`, date-order wording | The amortization dates are reversed or misread. Check their actual values. | P05 |
| JRN-07 | `Rounding Error` | Inspect full decimal values and unnecessary opposite-side zero entries. Reconcile the journal before retrying. | P04 |
| JRN-08 | `The amounts in a journal entry must balance.` | Reconcile each journal and its grouping/mapping; for otherwise balanced data, conditionally try the user-supplied Answer 70365 complete-row ordering workaround. | P04, P09 |

### Purchase orders

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570035686.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| PUR-01 | `Invalid entity reference key` | The purchase order cannot match the vendor. Check the vendor as shown on the purchase-order form, its active state, and the reference type. If using an ID, make sure it belongs to the vendor and matches the selected ID type. | P01 |

### Sales orders

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570036567.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| SAL-01 | `line item` | No item line reached the transaction. Map a CSV field into the item sublist. | P09 |
| SAL-02 | `deleted since` | The update's line handling needs review. Check existing lines before replacing a sublist. | P06 |
| SAL-03 | `getFullYear`, `NaN` | A malformed date may be reaching date-processing code. Inspect the year and format. | P05 |
| SAL-04 | `terms`, `paymentmethod` | Conflicting billing instructions were mapped. Choose the intended billing path. | P03 |
| SAL-05 | `item`, reference-key wording | The sales order cannot match its item. Check the selection and reference type. | P01, P04 |
| SAL-06 | `choose an item` | The update may use incorrect line identifiers. Export the actual line IDs. | P06 |
| SAL-07 | Required-field wording on update | The transaction's stored form may require the field. Check that form's rules. | P03 |

### Vendor bills

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570039432.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| VBL-01 | `line item` | The bill has no linked detail. Check expense-file linkage and sublist mappings. | P09 |
| VBL-02 | `primary`, `duplicate` | The primary file repeats a bill key. Keep one header row per bill in a multi-file import. | P09 |
| VBL-03 | `userTotal`, `totalField` | The supplied header amount disagrees with the lines. Review whether that header mapping belongs here. | P04 |
| VBL-04 | `location`, `subsidiary` | The selected location may not belong to the bill's subsidiary. Compare both records. | P01 |
| VBL-05 | `amount`, invalid-value wording | The amount may contain unsupported symbols or separators. Check the raw numeric text. | P04 |

### Vendor payments and shared payment errors

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570046360.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| VPY-01 | `Accounts Payable`, `entity` | The AP reference may be unnecessary when the bill is identified directly. Review the mapping. | P13 |
| VPY-02 | `apply`, `[doc,line]` | The referenced bill or invoice may be unavailable for application. Check its identity and open balance. | P13 |
| VPY-03 | `payment made` | The amount due may differ after discounts or other activity. Refresh it before retrying. | P13 |
| VPY-04 | `apply`, adding-line wording | A bill-and-credit application needs review. Check import mode, unused credit, open bill, and matching AP accounts. | P13 |
| VPY-05 | `Unparseable Internal Id` | The bill reference is not a usable internal ID. Verify the bill and mapping. | P01 |

### Website categories

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4568643764.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| WEB-01 | `category`, `website`, `<NULL>` | NetSuite needs a website before it can identify the site's category. Map the website or select a default when every row belongs to that site. Then check the category within that site. | P01 |

### Custom lists

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N369759.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| LST-01 | `translations`, adding-line wording | Translation support may not be configured. Check that the language feature is enabled and at least one language is configured. | P03 |
| LST-02 | `translations`, matching-line wording | One default language may be applied to rows containing several languages. Map the language from the file instead. | P09 |
| LST-03 | `CUSTOMLIST`, `[id, name]` | The list record has no mapped identity. Choose a name or supported identifier and map it to the intended field. | P01 |

### Expense reports

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3750986962.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| EXP-01 | `Amount`, required-value wording | The expense amount may depend on a missing rate or quantity. Check the expense category and how that line's amount should be calculated. | P04 |
| EXP-02 | `line item` | The report has no linked expense line. Check the shared key between the report and its expenses. | P09 |
| EXP-03 | `postingperiod` | The period value cannot be matched. Check the existing period name and whether spreadsheet formatting changed it. | P05 |

### Events

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3754448437.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| EVT-01 | `preferred`, `Date` | An event date does not match the importing user's format. Check both date columns. | P05 |
| EVT-02 | `Date`, `End Date`, missing-field wording | A date is missing, or an unintended row is being processed. Inspect the saved CSV. | P02, P05 |
| EVT-03 | `Parse`, `date/time` | A date and time cannot be read. Check the format and any absent end date. | P05 |
| EVT-04 | `Start time`, `end time` | The time range is invalid for this event import. Check both dates and times, including overnight spans. | P05 |

Oracle's event-import guidance describes a restriction on events spanning dates. Keep this advice scoped to this import workflow rather than presenting it as a rule for every NetSuite calendar interaction.

### Manufacturing cost templates

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N399710.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| CST-01 | `at least one line` | The cost template has no linked cost lines. Check that each template has details and that the file-linking keys agree. | P09 |
| CST-02 | `item`, reference-key wording | The item may be missing or paired with the wrong cost category. Check the item's purchasing information as well as its identity. | P01 |

### Manufacturing routings

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N404433.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| ROU-01 | `at least one line` | The routing has no linked operations. Check the detail file and shared routing key. | P09 |
| ROU-02 | `location` | Check the location, its subsidiary, and multi-select syntax. This routing guide specifically warns about spaces around the separator. | P08; Review D6 |
| ROU-03 | `sequence number` | Two steps share a sequence within one routing. Check both the sequence values and which routing owns each row. | P09 |
| ROU-04 | `manufacturingworkcenter` | The selected group may not be designated as a manufacturing work center. Check the group record, not just its name. | P01 |

### Inventory cost revaluations

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3761449045.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| REV-01 | `unique identifier` | The new revaluation needs an external ID or reference number. Map the intended identifier. | P01 |
| REV-02 | Required-field wording | A required value is absent on a processed row. Check real records and unintended trailing content. | P02, P03 |
| REV-03 | `already exists`, item/location/date context | A revaluation already occupies this item, location, and date combination. Find it before deciding whether an update is appropriate. | P01 |

### File processing and errors after saving

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N353446.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| SYS-01 | Invalid-character or encoding wording | The file's encoding may differ from the import setting. Check both. | P02 |
| SYS-02 | Symptom: exponent notation | Spreadsheet handling may have changed a number. Inspect its saved text and original value. | P04 |
| SYS-03 | `country`, reference-key wording | A country code may have been supplied where a localized name is expected. | P05 |
| SYS-04 | `subsidiary`, `entity` | The entity's subsidiary reference may be formatted incorrectly. Check the full hierarchy when using names. | P01 |
| SYS-05 | `department`, reference-key wording | Check the department's hierarchy, active state, and name-versus-ID setting. | P01 |
| SYS-06 | Script usage-limit wording | A script exhausted its allowed execution usage. Inspect the script failure and saved-record state. | P11 |
| SYS-07 | Post-processing failure | Some work may already have saved. Verify the affected records before choosing what to rerun. | P11 |

SYS-05 overlaps JRN-02. GEN-09 is the more specific afterSubmit case within SYS-07. Keep related links and context rather than publishing redundant generic pages.

### Additional documented vendor-bill mapping conflict

[Oracle source](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N427250.html)

| ID | Match | Explanation and first check | Guide |
| --- | --- | --- | --- |
| VBL-06 | `purchase order list`, `item/expense list` | The import is trying to source a bill from purchase orders while also supplying its item or expense lists. Choose the supported approach for the bill you intend to create. Oracle's described purchase-order linking import does not support partial billing. | P09 |

### Field examples from an inventory adjustment

These entries combine the successful case discussed during this project with the supporting inventory documentation. They are not claimed to be error-specific Oracle articles.

#### FLD-01. A status reference fails while removing stock

Message pattern supplied in the case: `Invalid inventorystatus reference key {status} for issueinventorynumber {number}.`

**What it means:** NetSuite could not use that status with the inventory detail on this line. The status might exist elsewhere, but the import still needs the correct item, location, lot, bin, and status combination.

**Check this first:** Verify how Status is mapped. If the file contains an internal ID, the mapping must use that reference type. Then inspect the exact inventory balance the line is meant to reduce.

**Useful question:** Are you removing stock or adding it?

For a removal, compare the item, location, inventory number, bin where applicable, and status in the import with the same balance in NetSuite. A status being marked available is different from a stock balance being available in the selected bin.

In the project case, some bin-managed stock needed put-away and 17 import rows needed the confirmed bin. Other blank-bin rows belonged to items that did not use bins. That finding does not prove that missing bins cause every error with this wording, or that every earlier status error in that transaction had the same cause.

Guide: P07. Sources: the project case; [Inventory Balance Search](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1518564230.html); [Advanced bin management](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2271791.html).

#### FLD-02. A quantity is only slightly greater than the stock available

Message pattern supplied in the case: `You only have {quantity} available. Please enter a different quantity.`

**What it means:** The requested quantity exceeds the quantity NetSuite will allow for the selected inventory detail. The difference can be too small to notice in the spreadsheet.

**Check this first:** Compare the full saved quantity with the available quantity using the same unit. Check other rows drawing from the same balance too.

**Useful question:** Do you have the original export from before the CSV was edited?

In the project case, comparing the original and edited files identified eight changed quantities across four removal/addition pairs. Restoring the original precision resolved the remaining import error. The bin changes remained intact. The file comparison confirmed rounding; it did not identify every software action that caused it.

Do not recommend arbitrarily reducing the quantity until the import succeeds. Establish the intended amount and preserve the matching addition when the adjustment moves stock between item records.

Guides: P04, P07. Sources: the project case; [Oracle number-handling guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N453795.html).


#### FLD-03. An item on a received line cannot be changed

Check which transaction line the import is updating and whether changing its item was intended.

## Your error

`You cannot change the selected item because it has already been received.`

## What it means

NetSuite is rejecting an item change because it considers the affected line already received.

That does not establish why the import is changing the item. One possibility is that the CSV row points to a different line than you intended, even if your goal was only to update a date, price, or custom field.

Import context: Updates to existing transaction lines. The purchase-order receipt check below applies when Advanced Receiving is enabled.

## Check this first

Compare the transaction, line, and item in the CSV with the saved transaction. Then decide whether this row should update an existing line, add a new one, or replace its item.

## Show the steps

### Check the line and its receipt history

1. **Open the transaction identified by the import.** Confirm it is the intended record, then find the affected item line.
2. **Check the line identifier.** Use the actual Line/Order Line value from NetSuite, not the spreadsheet row number. A saved transaction search can retrieve it. When both a line key and Item are supplied, the line key takes precedence. [Oracle's line-update guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N451889.html)
3. **Compare the item references.** Check that the CSV value and mapping identify the item you intend. A name, internal ID, and external ID are different ways to refer to a record. [Reference types](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N349594.html)
4. **Check what was received.** On a purchase order using Advanced Receiving, open **Related Records > Receipts & Bills** and inspect the receipt for the affected item line. A partially received order also has receipt history to check. [Purchase order receipts](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2412119.html)
5. **Review Overwrite Sublists.** This option replaces existing sublist data with the imported data. For an update to selected fields, check that the import is not trying to replace the whole item list. Changing this option does not make a received item freely replaceable. [Overwrite Sublists](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751046270.html)

## If that looks right

**What were you trying to change?**

### Update another field on the same line

Keep the correct line identifier. Correct an unintended item reference and map only the fields needed for the update, plus required identifiers. Do not blank an existing line's identifier to make the error disappear: that can add a new line instead. [Updating existing lines](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N451889.html)

### Add a new line

Check that the new row does not reuse an existing line's identifier. For the transaction-item imports covered by Oracle's line-update guide, a mapped blank Line/Order Line value is used for an addition. Keep valid identifiers on rows that are meant to update existing lines. [Adding transaction lines](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N451889.html)

### Replace the item on the received line

First establish whether the receipt is correct. If it is wrong, work through the transaction correction with the person responsible for receiving and accounting. If a different item is needed for a future delivery, review that requirement separately from the receipt already recorded.

Deleting a receipt should not be the default import fix. Receipts affect inventory and accounting, so any correction needs to account for the related transactions. [Accounting for received purchase orders](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2408991.html)

### I'm not sure, or the references already agree

Collect the import record type, the intended change, one failing CSV row, its field mapping, and the matching transaction line. Check those together with its receipt history. The error alone cannot identify which value or process caused the attempted item change.

## Read Oracle's supporting guidance

The links above explain the supporting checks. The exact error message was supplied during translator testing; a public Oracle article explaining that exact message was not located.

Documentation checked September 16, 2026.

## Related errors

- Ambiguous transaction line matches
- An update uses the wrong line identifier

## Still stuck?

We can help you work through the file, the mapping, and the NetSuite setup behind the error.

[Talk to MySuite](https://mysuite.tech/contact/)

## 8. Reusable troubleshooting steps

These procedures are website copy. An answer should show only the relevant procedure and branch. Do not attach all thirteen guides to every result. The record-specific first check in the catalogue takes precedence over a general procedure.

### P01. Check the record reference

1. Find the field named in the error on the import's Field Mapping page.
2. Open its edit control and check the selected reference type.
3. Compare that setting with the actual CSV value. A number could be a name, an external ID, or an internal ID. Its appearance alone does not establish the type.
4. Locate the intended record in the same account. Confirm its identity and whether it is available for this transaction.
5. Correct the file or mapping so they agree. Use a default only when it applies to every affected row.

If you need to see internal IDs, enable them in your personal preferences or include them in a saved-search export. Supported reference types vary by field. Name matching is generally case-insensitive, so changing capitalization alone should not be the standard recommendation.

[Reference types](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N349594.html)

For a duplicate-record message, determine whether you intend to update the existing record or create a different one. Do not generate new external IDs simply to get past the error. For inactive records or subsidiary restrictions, verify the intended business setup before changing it. Those are account decisions, not text-cleanup operations.

### P02. Check the saved CSV structure

1. Inspect the actual saved CSV, not just its spreadsheet display.
2. Confirm the file's separator and encoding agree with the import settings.
3. Parse quoted fields correctly. A comma inside a quoted description is not another column.
4. Compare each parsed row with the header. Identify extra fields, unnamed columns, and duplicate headings.
5. Check for totals, notes, and partially populated rows that were not meant to be imported.
6. Save a corrected copy and inspect it again before importing.

Completely blank trailing lines and partially populated records are different. Report the actual parsed content rather than assuming that any blank-looking spreadsheet row causes an error. The import's documented size limits are per job, including combined files: 25,000 records or 50 MB. A transaction with several CSV rows is not necessarily several records.

[File conventions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N453326.html), [separators inside fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N453950.html)

Oracle documents that duplicate column headings can cause the later column's values to be used. For results files, preserve duplicate error columns by position instead of silently overwriting them in a parser. Let the visitor identify the latest error column. [CSV preparation tips](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N439220.html)

### P03. Check the required field and mapping

1. Find the exact NetSuite field named in the error. Confirm whether it belongs to the record header, a line, or a subrecord.
2. Check that it is mapped to the intended CSV column, or to a valid default.
3. Inspect the affected records for missing values. A populated column does not mean every record has a value.
4. Expand the relevant field group in the mapping tree. A required field can be present there without being visible in the current mapping list.
5. If the field belongs to a sublist, make sure the import actually supplies that sublist's data.

[Required fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N349431.html)

For a field that cannot be written, inspect its availability and the import's read-only-field setting. Ignoring a read-only field allows the rest of the import to proceed; it does not make the field editable. [Read-only fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751046796.html)

If a custom field is required, provide the intended value first. Turning off mandatory custom-field validation changes which incomplete records the import will accept. It should be an informed configuration choice, not the default troubleshooting instruction. [Mandatory custom fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751048115.html)

For an update to an existing sales order, inspect the form saved with that transaction. The import's selected form may not explain its required fields. For the terms/payment-method conflict, ask which billing outcome is intended before removing either mapping. See SAL-04 and SAL-07.

### P04. Check the number that was actually saved

1. Open the saved CSV as text and locate the affected value.
2. Compare it with the original export when one is available. Compare numeric values precisely, not just the displayed number of decimals.
3. Check whether the column is an amount, quantity, rate, or identifier. Identifiers must keep their original characters, including leading zeros.
4. Match number formatting to the import's decimal settings. Check currency symbols, grouping separators, and exponent notation where relevant.
5. Restore lost digits from the original source. Adding decimal places to a rounded value does not recover them.
6. Inspect the final CSV after saving it again.

[Oracle number handling](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N453795.html)

Excel can export the value as displayed when saving CSV. That makes the saved file the final check, even when the formula bar previously showed more precision. [Microsoft CSV export guidance](https://support.microsoft.com/en-us/excel/excel-formatting-and-features-that-are-not-transferred-to-other-file-formats)

For quantities, compare the same units and the same stock balance. For amounts, identify which field owns the calculation before changing a number. Do not balance a journal or inventory adjustment by inserting an arbitrary difference. Keep debit, credit, rate, quantity, and precision findings separate.

### P05. Check dates, periods, and address values

**Dates**

1. Check the importing user's date format in personal preferences.
2. Compare the actual CSV text with that format, including the year.
3. If the date is ambiguous, establish the intended date from the source. Do not guess whether `04/05` is April 5 or May 4.
4. For a period or time range, verify both ends and any accompanying year or view.
5. Recheck the saved file after editing it in a spreadsheet.

Use the record-specific entry for transaction dates, effective dates, events, or demand plans. Their requirements are not interchangeable.

**Countries and states**

Use the country name shown in the account's language, or a mapping default when one country applies throughout. Do not assume a SOAP country enumeration or a two-letter code is the value expected by CSV import. For states and provinces, match the configured short name for the selected country. Inspect the account's state/province list when the value looks right but is rejected.

[Country values](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N454670.html), [state and province values](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N454550.html)

For posting-period messages, verify the actual period reference before changing dates or reopening periods. A reference mismatch does not itself establish a closed-period problem.

### P06. Decide whether to update, append, or replace lines

Ask first: **Are you changing existing lines, adding new lines, or replacing the whole list?**

- To update a line, export and use its real line key.
- To add lines through the documented transaction-item workflow, map the line-key column with blank values for the new lines.
- When an item appears more than once, the item reference alone may not identify a unique line.
- Do not invent sequential line IDs from spreadsheet row numbers.

[Transaction line updates](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N451889.html)

Sublist replacement is a separate choice. Enabling it replaces existing sublist content with the imported content. With replacement off, behavior depends on whether the sublist supports matching by keys. Get the complete intended list before choosing replacement. Item pricing and demand plans need their own guidance.

[Sublist replacement](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751046270.html)

Do not generalize these line-key rules to every sublist. Use the import documentation for the selected record type and sublist.

### P07. Check the actual inventory balance

1. Establish whether the line adds or removes stock and which unit it uses.
2. Run an Inventory Balance search for the relevant item and location. Include inventory number, bin, status, on-hand quantity, and available quantity.
3. Compare the exact combination needed by the line. An item total can include stock in other bins, lots, or statuses.
4. Check other rows in the import that draw from that same combination.

[Inventory balance search](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1518564230.html)

If bin-managed stock has not been assigned to a bin, investigate put-away. Use the confirmed physical bin. Do not fill every blank bin with the same value. Bin use depends on the item's and location's configuration. Item views can display fewer decimals than transaction details; Oracle identifies Inventory Balance search as a way to obtain eight-place quantities for this comparison.

[Advanced bin management](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2271791.html)

For an adjustment, the issue-number field selects existing stock, while the receipt-number field supplies the number for stock being added. Map the field appropriate to the line's purpose. Confirm grouping between adjustment lines and inventory assignments. Do not infer that a CSV column called Internal ID refers to the same record type everywhere.

[Inventory adjustment fields](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4676544313.html)

For precision findings, use P04. Eight decimal places solved the quantity issue in this project's field case. It is not a universal rounding instruction for prices, currencies, or every NetSuite number field.

### P08. Check multiple selections and hierarchy

1. Identify whether the value represents a parent/child path, several selections, or an ordinary text value.
2. Check the separator selected for this import.
3. Make sure that separator does not split part of a real identifier.
4. Check for a repeated selection within one cell.
5. When updating the complete set, retain existing selections that must remain.

Hierarchy and multi-select separators serve different purposes. Oracle describes colon-separated hierarchy paths and a configurable single-character separator for multiple selections. Follow the record-specific requirements where they differ.

[Hierarchy and multi-select guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N454061.html)

The manufacturing-routing error guide gives different whitespace advice from the general delimiter page. ROU-02 should use the routing-specific check. Do not silently trim all record values or impose one whitespace rule across every import.

### P09. Check how the detail rows are linked

1. Confirm whether this is a single-file or multiple-file import.
2. Identify the parent record key and the key used to connect each detail file.
3. Verify that every required detail row points to an intended parent, with no spelling or whitespace changes in the linking value.
4. Check the import's field mapping for the detail sublist. Defaults alone do not establish that detail rows were imported.
5. Separate a record identifier from a line identifier. They serve different purposes.

For vendor bills, the documented multi-file structure separates bill headers from expenses, and can use another file for items. Repeat the linking key in the detail files. A duplicate key in a primary header file is different from a transaction key correctly repeated across detail rows.

[Vendor bill file structure](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N427250.html)

For assemblies, link member rows to the assembly. For routings, check the operation sequence within each routing. For customer/contact combinations, keep each record's identity and fields separate. Use the matching catalogue entry for the actual field names.

### P10. Check the price structure

1. Establish whether the change is to a price, a quantity break, a price level, or the entire structure.
2. Compare the existing item pricing with the proposed rows.
3. Keep every price and quantity break that is meant to remain.
4. Check the missing-base-price case separately from the new-matrix-header case.
5. If the proposed fix involves replacing pricing, resolve the conflicting documentation in review note D1 before proceeding.

This procedure is an editorial decision path. It is not a universal instruction to enable sublist replacement. Use the entry-specific sources in ITM-01, ITM-08, and ITM-11.

### P11. Check what saved and what failed

1. Read the result for a record identifier or wording that says the record was created.
2. Locate that record and verify its current state.
3. Identify the script, workflow, or saved-search dependency named in the failure, if one is provided.
4. Ask the account administrator to inspect the relevant execution or access problem.
5. Decide what needs to run again only after distinguishing the saved record from the failed follow-up work.

For a missing saved search, check whether the referenced search still exists and whether the import role can access it. For a generic unexpected error, collect the record type, mapping, result, and a minimal example instead of treating one documented scenario as the answer to every failure.

Do not make disabling scripts or workflow triggers a standard fix. That changes what runs during the import and can omit work the account depends on. [Script and workflow execution](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4676525683.html)

### P12. Separate a warning from a failed record

Check the import status and results before treating a language warning as a failed transaction. If language settings are slowing the import, compare the user's chosen language with the language used in the file and the relevant account configuration. Avoid changing a company-wide setting for one import.

This is an editorial triage step for GEN-10, not a new error cause.

### P13. Check the document being paid

1. Identify the payment separately from the bill or invoice it should pay.
2. Verify the referenced document in NetSuite and refresh its open amount.
3. Check the customer or vendor, currency, account, discounts, and other applications relevant to this payment.
4. Reconcile the application rows with the intended payment. Do not repeat an application merely because the document has several item lines.
5. Use the specific payment entry above to resolve the remaining mapping issue.

An invoice number shown on a form is not interchangeable with its internal or external ID for payment application. Oracle identifies those IDs as the supported invoice links. [Invoice references for payments](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N411794.html)

These steps are an editorial checklist. They do not establish that any single account, currency, or discount problem is the cause of a particular error.

## 9. Follow-up questions and branching copy

Ask these only when the answer changes the guidance. Do not make the visitor complete a questionnaire before showing a useful explanation.

| Applies to | Question | Choices | What changes |
| --- | --- | --- | --- |
| Broad reference error | What are you importing? | Relevant record types; I'm not sure | Select the context-specific entry. |
| Reference fields | How is this field mapped? | Name; Internal ID; External ID; I'm not sure | Show the appropriate reference check. Offer Script ID only for a field that supports it. |
| Duplicate identity | Are you adding a new record or updating an existing one? | Adding; Updating; Both; I'm not sure | Establish intended identity before changing the key. |
| Missing detail | Are you importing one file or several linked files? | One file; Linked files | Show line mapping or parent/detail linkage checks. |
| Existing transaction lines | What should happen to the existing lines? | Update some lines; Add lines; Replace the full list | Show the matching line-key procedure. |
| Inventory | Is this line adding or removing stock? | Adding; Removing | Check receipt or issue details. |
| Inventory bin question | Does this item use bins at this location? | Yes; No; I'm not sure | Check the actual configuration before treating blanks as errors. |
| Inventory precision | Do you have the original export? | Yes; No | Compare files, or obtain the full quantity from NetSuite. |
| Expense currency | Do these expenses use more than one currency? | Yes; No; I'm not sure | Determine whether currency mapping or the report setting needs attention. |
| Dates | What date did you intend? | Free text with a spelled-out month | Avoid guessing ambiguous numeric dates. |
| Post-save failure | Does the result say the record was created? | Yes; No; I'm not sure | Check saved state before a retry. |
| Repeated errors in a file | Is this a new results file or an edited copy? | New results; Edited copy | Distinguish a new failure from carried-forward error text. |

For every answer, give a clear way back. A visitor should be able to change the import type without losing the pasted message during the session.

## 10. Optional CSV checks

The first release can work entirely from search and reviewed explanations. Add file checks after the catalogue and both search entry points work well. These are requirements for a later implementation, not features already built.

### Checks that a file can support

| Check | Evidence required | What the tool may say |
| --- | --- | --- |
| Row width differs from header | Correct parsing of the selected separator and quoted fields | Row {row} has {actual} fields; the header has {expected}. |
| Duplicate headings | Header positions, retained without overwriting | Columns {positions} share the heading {name}. |
| Missing value | Confirmed field mapping, context, and whether a default applies | Row {row} has no value in the column mapped to {field}. |
| Possible totals row | Row content | This row looks like a spreadsheet total. Check whether it belongs in the import. |
| Changed quantity | Original and edited files, reliable row matching, exact decimal comparison | The quantity changed from {before} to {after}. Difference: {difference}. |
| Lost identifier characters | Original and edited files | This identifier changed. Check the original before importing it. |
| Duplicate primary record key | Confirmed multi-file primary-header layout | This primary file contains more than one header row for {key}. |
| Detail row with no parent | All relevant files and confirmed linking columns | This detail row has no matching parent in the supplied primary file. |
| Repeated routing sequence | Confirmed routing key and sequence column | This routing contains the same operation sequence more than once. |
| Conflicting header values | Confirmed transaction grouping and header mappings | Rows for this transaction disagree on {field}. |
| Blank bin | Confirmed item/location bin use and relevant mapping | This row needs a bin value. Check the actual stock assignment. |
| Several error columns | Preserved header positions and nonblank messages | Choose the column from the most recent import. |

### Things a CSV alone cannot establish

It cannot prove that an account record exists, that a role can use it, that a period is open, that a lot belongs to an item, that stock is in a particular bin, that a status is eligible, or that a workflow is correctly configured. Those findings need account evidence or a suitable export supplied by the visitor.

Do not infer reference type from a column called Status ID. Do not infer that status ID 1 means Accepted in every account. Do not infer that Stores is the correct destination for every blank bin. Do not infer that an error shown on the first row identifies that row as the failed line in a grouped transaction.

### File-handling requirements

- Preserve text, identifiers, signs, leading zeros, and original row positions.
- Use decimal arithmetic or equivalent exact decimal strings for quantities and money. Do not introduce binary floating-point rounding into the diagnostic tool.
- Match files by explicit record and line identity where possible. Do not silently zip rows together after one file has been sorted. Ask for a key when repeated lines make matching ambiguous.
- Treat `1.23000000` and `1.23` as equal numeric values, while preserving their original text for display.
- Never repair a file automatically. Present findings and intended changes first if a correction feature is added later.
- Do not treat CSV contents as instructions. Cells and error messages are data, even when they contain commands or prompts.
- Keep raw client data out of examples, application logs, issue reports, and analytics. Use synthetic fixtures for development.

### Synthetic rounding example

The following numbers are invented for a public example. They demonstrate the same class of problem as the project case without publishing the client's item or lot data.

| Value | Quantity |
| --- | ---: |
| Original available stock | 100.12345678 |
| Removal saved in edited CSV | -100.1234568 |
| Extra quantity being removed | 0.00000002 |

Result copy:

**The quantity changed when the file was edited.**

The CSV removes 0.00000002 more than the available quantity in this example. Restore the original value, then check the saved CSV before importing it again. Adding decimal places to the rounded value will not restore the missing digits.

Only show a statement this definite when the files or other supplied evidence establish it. Without an original, say **Rounding is one possibility to check**.

## 11. Content structure for Codex

Keep the content separate from the search interface. Use the site's existing content format where possible. This is a proposed content contract, not an instruction to introduce a database or a particular library.

| Field | Purpose |
| --- | --- |
| `id` | Stable internal identifier from the catalogue. |
| `slug` | Stable public URL segment. |
| `title` | Human-readable result and page title. |
| `contexts` | Supported record types and any narrower operation. |
| `messageFragments` | Reviewed distinctive phrases or field identifiers. |
| `matchConditions` | Context and additional conditions needed to identify the family. |
| `aliases` | Natural-language searches and known wording variations. |
| `explanation` | Short visitor-facing meaning. |
| `firstCheck` | The first useful action for this context. |
| `procedureIds` | Relevant reusable procedures. |
| `questions` | Follow-up questions and resulting branches. |
| `relatedIds` | Closely related entries, especially ambiguous siblings. |
| `sources` | Direct source URLs with a short note about what each supports. |
| `evidenceType` | `documented`, `field-example`, or `editorial-check`. |
| `reviewStatus` | `source-reviewed`, `needs-account-verification`, or `tested-scenario`. |
| `reviewNotes` | Internal source conflicts and publication limits. |
| `documentationCheckedAt` | Date the source was last checked. |
| `scenarioTestedAt` | Optional date for an actually reproduced scenario. |

Source review and account testing are different. All source-reviewed entries in this draft still require ordinary editorial review. Entries with D-notes need their stated verification before the disputed advice is published. The successful inventory case supports its recorded outcome; it does not certify every possible inventory scenario.

Canonical pages can consolidate related contexts when that makes the answer easier to use. Keep the context-specific data and stable internal IDs even if several candidates share a public explanation page.

## 12. Documentation conflicts and editorial decisions

These are implementation notes. They do not belong in the main visitor journey. When unresolved, publish only the explanation and safe check, with a link to Oracle.

### D1. Pricing replacement instructions conflict

ITM-08's error article recommends a complete pricing import with sublist replacement. The general option page advises against replacement for item pricing. Preserve the conflict and verify the relevant pricing setup before offering a step-by-step replacement fix. [Error article](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534428723.html), [option guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751046270.html)

### D2. Demand-plan identity is described inconsistently

The error article appears to direct a plan identifier into an item field. The supported-fields table distinguishes these fields. The answer should require a check of both identities and must not copy that mapping instruction as established fact. [Error article](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569177775.html), [field definitions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N416996.html)

### D3. The inventory worksheet workaround changes an account preference

Retain the documented workaround as a scoped administrator note. Verify the worksheet type and current bin setup before it is used. It is not the proposed fix for FLD-01. [Worksheet error](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569179830.html)

### D4. Some mapping labels are unclear

ITM-07's example mixes type and item labels. The vendor-bill error page also describes expense-file linking in a way that could be confused with a line identity. Use the supported import structure and inspect actual mapping fields before publishing literal click-by-click labels. Do not invent the labels or claim that renaming an arbitrary CSV heading changes what it maps to. [Related-item type](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534428607.html), [vendor-bill structure](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N427250.html)

### D5. Line-ID examples do not agree cleanly

The general transaction error page discusses both blank IDs and newly numbered IDs. The dedicated line-update guide explains blank mapped keys for additions and existing keys for updates. Prefer that decision model. Its numerical example is also internally confusing; do not reproduce its totals or assert that a Quantity update is necessarily an increment. Verify the intended transaction behavior on a small example. [Transaction errors](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570011199.html), [line updates](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N451889.html)

### D6. Multi-select whitespace advice differs by page

General delimiter guidance describes spaces around selections. The manufacturing-routing error page warns about spaces around its delimiter. Keep ROU-02 scoped to routing and verify the accepted format there. Do not make automatic global whitespace changes. [General delimiters](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N454061.html), [routing errors](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N404433.html)

### Other editorial choices

- Explain a documented cause as a possibility when the message is generic.
- Supply required business data before suggesting that validation be disabled.
- Check an existing record before changing external IDs, reactivating records, or rerunning an import.
- Do not recommend deleting an item as an ordinary response to a reference error.
- Do not equate an available-status flag with a quantity in the required lot/bin/status balance.
- Do not promise that resolving the current error resolves the entire transaction.
- Use current live labels when verified. Navigation can differ by role and account; do not invent a menu path when a source is unclear.
- Remove obvious source typos in our prose. Preserve meaningful technical field names.

## 13. Writing rules

Descriptions should use ordinary language and short, connected sentences. Contractions are fine. Steps can use precise field names, menu paths, IDs, and code formatting.

Use the active voice. Say what the reader should check and why it matters. Prefer **Check the status on this lot in this bin** to **Ensure proper inventory status configuration**. Prefer **The record may already have saved** to **A post-processing exception has occurred**.

No em dashes in authored descriptions, titles, snippets, or interface copy. Do not alter a user's original error just to enforce a writing rule. Avoid words such as leverage, seamless, robust, streamline, unlock, and empower. Do not start every paragraph with "This error occurs when."

Keep the tone calm. The visitor is already dealing with a frustrating import. A useful answer does not need jokes about the software or exaggerated claims about how easy the fix will be.

Quote only short, necessary error fragments. Write our own explanations and examples. Link to the exact Oracle page for the complete vendor wording. Do not publish copied Oracle article bodies or client records as content.

Use a real person's byline only with that person's approval. Link to existing MySuite contact and service pages rather than inventing a new support organization.

## 14. Publication and measurement

Give each substantive explanation a crawlable page with a useful title, concise introduction, visible steps, related entries, and source links. Generate the searchable content from the same source used by both search interfaces. Avoid creating near-identical pages for every variable record number or spelling of an error.

Use ordinary links so an answer can be bookmarked or sent to a colleague. Do not put pasted messages or raw identifiers into canonical URLs. Query and filter states should not create thousands of indexable pages.

Suggested titles include:

- NetSuite Cannot Match an Item in a CSV Import
- NetSuite CSV Import Says an Amount Is Missing
- Inventory Adjustment Quantity Exceeds Available Stock
- NetSuite Import Failed After the Record Was Created
- NetSuite CSV Import Cannot Match a Transaction Line

These are proposed title patterns. Choose the final canonical page grouping during implementation and keep it consistent with the catalogue.

Measure catalogue usage, whether visitors found a match, feedback by public entry ID, and visits to the existing contact page. Track aggregate event counts rather than the raw text people paste. Do not claim a resolved import based only on a result click. A visitor's explicit "Yes" feedback is a stronger signal, but still not a NetSuite transaction verification.

Search visibility is a reason to make this resource useful, not a forecast of traffic. Start with the complete researched content set, prioritize the strongest answers for publication, and improve entries using actual unresolved cases. Keep a dated review record when sources or fixes change.

## 15. Acceptance criteria

### Content and experience

- The visitor can search from the header and from the translator page.
- Both entry points return the same explanation for the same context.
- Selecting a result opens the explanation directly.
- Every published entry has a useful explanation, first check, relevant steps, and source.
- A generic error prompts for context instead of selecting an arbitrary cause.
- Entry-specific first checks remain visible before general procedures.
- Unknown messages produce an honest no-match state.
- Existing articles and service pages remain searchable.
- The interface works with keyboard navigation, clear focus, mobile layout, and both site appearance settings.
- Search results announce their updated count accessibly without moving focus away from the input.
- Explanations are readable without an AI request or NetSuite login.
- There is no email gate and no unimplemented upload control.
- No authored visitor description contains an em dash.

### Matching examples to test

| Input or scenario | Expected behavior |
| --- | --- |
| An inventory-status error with different numeric IDs | Find FLD-01 without assuming what either ID represents in this account. |
| An available-quantity error with extra spaces and a long decimal | Find FLD-02 and preserve the complete quantity for display. |
| An invalid item reference with no import type | Offer relevant contexts, including transaction items, kit members, related items, and cost templates. |
| A required Type error | Distinguish customer type from related-item presentation type. |
| A missing amount on an expense report | Find EXP-01 and check rate/quantity requirements. |
| A malformed amount on a vendor bill | Find VBL-05 and inspect numeric text. |
| An illegal-ID message on customers plus contacts | Offer CON-01 rather than only the customer-form explanation. |
| A message mentioning the apply sublist | Distinguish payment eligibility from repeated application rows and bill-credit handling. |
| A script error saying the record was created | Prioritize GEN-09 and check saved state. |
| A generic unexpected error | Ask for context; do not diagnose a translation mapping by default. |
| A routing sequence reused in separate routings | Do not flag it as a duplicate unless it repeats within the same routing. |
| A repeated external ID on legitimate single-file transaction lines | Do not apply the multi-file primary-header duplicate rule. |
| A character-limit error containing 61 | Keep the limit meaningful during normalization. |
| An item name with two underscores | Preserve both underscores in file analysis and displayed input. |
| An unfamiliar custom script message | Show the no-match/custom-code guidance without inventing a standard NetSuite fix. |

### Additional tests if file checks are built

| Fixture | Expected behavior |
| --- | --- |
| Quoted comma, escaped quote, and newline within a field | Parse the fields correctly. |
| Duplicate Error headings | Preserve every column and ask which is current. |
| Corrected file with old error text | Do not treat the old message as evidence of a new failed import. |
| `100.12345678` versus `100.1234568` | Report a numeric change of `0.00000002`. |
| `1.23000000` versus `1.23` | Report no numeric change. |
| Same records in a different order | Match by identity, not physical row position. |
| Several identical line identities | Ask how to pair them; do not invent a match. |
| Numeric-looking identifier with leading zeros | Preserve it as text. |
| Bin-managed and non-bin-managed items mixed together | Do not flag every blank bin. |
| Missing mapping information | Request the relevant column or mark the check unavailable. |
| Several lines removing from one balance | Consider their combined demand when the shared identity and units are known. |
| Removal and addition pair | Report both changed values; do not silently change one side. |
| CSV cell containing a command or prompt | Treat it as text. |

### Performance and scope

Preserve the site's quick search interaction. Use the existing implementation unless there is a demonstrated reason to change it. Do not add an AI dependency to look up reviewed content. If file analysis is added, run expensive work without blocking typing and set a disclosed file limit based on measured behavior. Choose technical budgets after inspecting the repository rather than promising timings without a benchmark.

## 16. Implementation order

1. Inspect the existing site, routing, content system, and search index.
2. Convert the catalogue into structured content while preserving IDs, context, sources, and review notes.
3. Resolve canonical page grouping and write each page from the supplied copy and relevant procedures.
4. Build the translator page using the site's existing components.
5. Add error entries and aliases to the header search.
6. Add contextual follow-up questions and related links.
7. Run the matching and accessibility checks above.
8. Review the six documentation issues before publishing disputed instructions.
9. Verify local behavior and query handling before making privacy claims.
10. Add optional CSV checks only after the core experience works.

This project does not require an account connection, a new backend, a chat interface, an automatic CSV repair engine, or a redesign of mysuite.tech. Technical choices belong to the implementation task after repository inspection.

## 17. Handoff instruction for Codex

Use this document to implement a NetSuite CSV Error Translator within the existing mysuite.tech repository. First inspect the site's content format, routing, styles, and header search. Reuse them. Add a dedicated translator page and make the same error entries searchable from the existing header search. Use the supplied visitor copy, catalogue, procedures, matching rules, and acceptance criteria. Preserve the natural tone and avoid em dashes in authored descriptions. Keep technical details where they help someone complete a step. Retain source links and distinguish documented cases from field examples. Do not publish disputed instructions from the review notes as established fixes. Start with searchable content and contextual guidance. Treat CSV analysis as a separate optional phase. Do not add a model dependency or account connection without a separate requirement. Show a local preview and report the checks completed before any deployment.


## 18. Coverage and research record

The catalogue contains **119 context-specific entries**: the previous 118 entries plus the journal-balance explanation JRN-08. Repeated messages have separate entries when the import context changes the explanation. This is an editorial entry count, not a claim of 119 unique error strings.

All core branches were reviewed: general imports, employees, relationships, items, transactions, and website imports. The general item branch's individual error pages were followed. Cases found below the opening lists were included, such as customer ambiguity, entity currency, sales-order billing instructions, and duplicate custom-record identity. Demand-plan guidance linked from more than one branch was counted once.

| Coverage area | Entry IDs | Count | Origin |
| --- | --- | ---: | --- |
| General import messages and conversion symptom | GEN-01 to GEN-12 | 12 | Core |
| Employees and expense categories | EMP-01 to EMP-04 | 4 | Core |
| Relationship records | REL-01 to REL-03 | 3 | Core |
| Customers | CUS-01 to CUS-07 | 7 | Core |
| Customers and contacts together | CON-01 to CON-02 | 2 | Core |
| Prospects and contacts together | PRO-01 | 1 | Core |
| General item records and pricing | ITM-01 to ITM-15 | 15 | Core |
| Assemblies | ASM-01 to ASM-02 | 2 | Core |
| Demand plans | DMD-01 to DMD-02 | 2 | Core |
| Inventory worksheet detail | IVD-01 | 1 | Core |
| Inventory items | INV-01 to INV-03 | 3 | Core |
| Kit members | KIT-01 | 1 | Core |
| General transaction imports | TXN-01 to TXN-05 | 5 | Core |
| Customer payments | CPY-01 | 1 | Core |
| Invoices and credit applications | INVC-01 to INVC-03 | 3 | Core |
| Journal entries | JRN-01 to JRN-08 | 8 | Core and supplied journal-balance case |
| Purchase orders | PUR-01 | 1 | Core |
| Sales orders | SAL-01 to SAL-07 | 7 | Core |
| Vendor bills, including the additional mapping conflict | VBL-01 to VBL-06 | 6 | 5 core, 1 additional |
| Vendor payments | VPY-01 to VPY-05 | 5 | Core |
| Website categories | WEB-01 | 1 | Core |
| Custom lists | LST-01 to LST-03 | 3 | Additional |
| Expense reports | EXP-01 to EXP-03 | 3 | Additional |
| Events | EVT-01 to EVT-04 | 4 | Additional |
| Manufacturing cost templates | CST-01 to CST-02 | 2 | Additional |
| Manufacturing routings | ROU-01 to ROU-04 | 4 | Additional |
| Inventory cost revaluations | REV-01 to REV-03 | 3 | Additional |
| File processing and post-save failures | SYS-01 to SYS-07 | 7 | Additional |
| Inventory and transaction field examples | FLD-01 to FLD-03 | 3 | Field example |

### What remains account-dependent

The public documentation and supplied import case support the content. They do not establish the visitor's current stock, record permissions, subsidiary configuration, script behavior, or custom form requirements. No live NetSuite account was accessed for this research. No fixes were run in another account to certify all catalogue entries.

The public MySuite site and its search were inspected. Its repository, analytics setup, search package, and deployment configuration were not inspected. Those checks belong to the implementation task.

The six D-notes identify the specific places where the source needs interpretation or account verification. They are not a reason to leave the rest of the project undefined.

### Maintaining the content

When a user reports a new message, keep the original text private, identify a reusable pattern, and record the import context. Add a new entry only when it represents a different problem or requires different advice. If an existing answer was wrong, correct it and keep a short review note describing the change.

For each source change, review the affected entry, shared procedure, search alias, and acceptance example together. Do not silently replace tested behavior with a newly edited documentation sentence. Check whether the account setup or import workflow differs.

The source links beside the entries and procedures are the authority map for this draft. The document cites 63 distinct Oracle pages, one Microsoft support page, and the two MySuite pages used for site context. Raw source captures are research material and are not intended for publication.


## SAL-05 spreadsheet-reference expansion, September 16, 2026

Existing SAL-05 remains the only entry; coverage stays at 118. Preserve item-selection and reference-type guidance. Spreadsheet conversion is a conditional check, with synthetic examples, not a diagnosis. Supplied SuiteAnswers 71261: updated 02/26/2026, product NetSuite 2022.1; no authenticated page accessed.

### Did the spreadsheet change the item reference?

An item reference can look like a number even when its characters need to be preserved exactly. Compare the saved CSV value with the reference copied or exported from NetSuite.

For example, if NetSuite's reference is `001234` and the CSV contains `1234`, those are different references. Spreadsheet conversion is one possible cause of this error.

::: details Show the steps

1. Confirm whether the Item mapping expects a name, internal ID, or external ID. Get the exact reference of that kind from NetSuite.
2. In the spreadsheet, set the destination cells to **Text before pasting or importing the references**.
3. Restore the original references from NetSuite. Formatting a value as Text after characters have been lost does not bring them back.
4. Save the CSV. Open it in a text editor and check that the item reference still has the expected characters, including any leading zeros.
5. Retry with the appropriate **Transactions > Sales Order** import setup and the matching Item reference type. Use **Update** when changing existing sales orders; use the data-handling mode appropriate to the intended job otherwise.

:::

The purpose of the Text setting is to preserve the identifier. CSV files do not retain an Excel column's formatting, so the saved text is the final check. Changing spreadsheet formatting does not change NetSuite's Name/Internal ID/External ID mapping.

**If that looks right**

If the saved reference already matches NetSuite, return to the item-selection and mapping checks. A correct reference may still be unsuitable for the sales order. Formatting is not the explanation for every invalid-item message.

- https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570036567.html
- https://support.microsoft.com/en-gb/excel/keeping-leading-zeros-and-large-numbers
- https://support.microsoft.com/en-us/excel/excel-formatting-and-features-that-are-not-transferred-to-other-file-formats
