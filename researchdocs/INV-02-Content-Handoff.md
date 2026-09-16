# Record type does not match the existing record

Check the record being targeted and the type selected for the import.

## Your error

`The record you are   attempting to load has a different type: otherchargesaleitem from the type   specified: otherchargepurchaseitem.`

The type names can change. Read both parts of the message:

| Part of the message | What it tells you |
| --- | --- |
| After **different type:** | The type NetSuite found on the existing record. |
| After **type specified:** | The type the operation requested. |

Oracle lists this message under `SSS_RECORD_TYPE_MISMATCH`. [Oracle's error reference](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N3539978.html)

## What it means

NetSuite found a record, but the operation is trying to open it as a different type.

In this message, `otherchargesaleitem` identifies an **Other Charge for Sale** item, while `otherchargepurchaseitem` identifies the **Other Charge for Purchase** type the operation requested. [Sale item type](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_24213744571.html), [purchase item type](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_63201856891.html)

If that sale item is the intended update target, choose the **Other Charge for Sale** record type for the item import. If you intended to update a purchase item, check why the row points to a sale item before proceeding. The same message format can describe other mismatched types.

Import context: Record updates. The steps below apply to item imports. If the message comes from another record type or a script running during the import, use the relevant branch below.

## Check this first

Open the record identified by the failing row and confirm that it is the record you meant to update. Then compare its type with the import's Record Type selection.

If the row points to the wrong record, correct its identifier. Changing the import type to suit an unintended record would target the wrong data.

## Show the steps

### Match the item import to the existing item

1. **Confirm the target.** Check the identifier used to match the existing item, including its mapping. Open that item in the same NetSuite account and check its type.
2. **Start the import with the matching type.** Open **Import CSV Records** under **Setup > Import/Export**. On **Scan & Upload CSV File**, select **Items**, then the Record Type that matches the item you confirmed. For the reported sale-item target, choose the **Other Charge for Sale** option.
3. **Use Update for an update-only job.** On **Import Options**, select **Update** when the purpose is to change existing records.
4. **Review the mapping.** Map the intended record identifier and the fields to change. Recheck the mapping after changing the selected type.
5. **Check the file's scope.** If it contains different item types, separate the update rows by the Record Type each requires. Review the prepared import before running it.

Other Charge items have separate purchase, sale, and resale import types. Inventory and assembly items also have distinct choices, including serialized and lot-numbered types. Match the actual item subtype. [Supported item import types](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N370727.html)

## If that looks right

**Which situation fits?**

### The CSV points to the wrong record

Correct the identifier or its mapping so it selects the intended record. Confirm the record's type again before retrying. Keep an identifier separate from a display name that happens to look similar.

### The file contains several item types

Use a separate import setup for each required Record Type. Keep each row's correct identifier with it when splitting the file. One row's type does not establish the type of every item in the file.

### The target and selected type already agree

Check whether the error comes from a script or another operation triggered by the import. It may refer to a related record being loaded, rather than the main record in the CSV. This is a possibility to investigate, not a conclusion from the message alone.

If an execution log identifies a record-loading call, have the developer check the record ID and requested type together. [Record-loading parameters](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4267258486.html)

### I am importing a different kind of record

Use the same first check: confirm the intended record and compare the two types named in the error. Verify the import selection or the operation requesting the record. The **Items** steps above do not apply to every record type.

### I intended to change the item's type

This error guide addresses updating the existing record under its current type. Selecting a different type in the Import Assistant is not an instruction to convert the item. Review the supported conversion or replacement process for that specific item separately.

## Read Oracle's supporting guidance

- [Inventory item import errors](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569181039.html)
- [General record-type mismatch message](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N3539978.html)
- [Item types available for CSV import](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N370727.html)

Documentation checked September 16, 2026.

## Related errors

- The item identifier cannot be matched
- A proposed parent has a different item type

## Still stuck?

We can help you work through the file, the mapping, and the NetSuite setup behind the error.

[Talk to MySuite](https://mysuite.tech/contact/)

---

## Content and implementation notes

This section is for the editor and implementation task. It is not visitor copy.

| Field | Value |
| --- | --- |
| Existing catalogue ID | INV-02. Expand this entry; do not create a duplicate. |
| Suggested section slug | record-type-does-not-match |
| Canonical destination | Retain the existing guide URL and use a stable section anchor if this entry shares a guide. Add redirects if an established route must change. |
| Search title | Record type does not match the existing record |
| Search snippet | NetSuite found a record of a different type. Check the target identifier and the import's Record Type before changing either. |
| Categories | Record references; item import context. Retain the general explanation when the type pair is not an item pair. |
| Error code | SSS_RECORD_TYPE_MISMATCH |
| Evidence type | documented, with separately identified editorial checks |
| Review status | source-reviewed; not an account-tested fix |
| Documentation checked | 2026-09-16 |
| Catalogue count | Remains 118 in the revised project specification. This expands an existing entry. |

### Matching rules

Recognize the message family independently of the two type names:

`The record you are attempting to load has a different type: {actualType} from the type specified: {requestedType}`

- Match the full sentence, its distinctive prefix, and `SSS_RECORD_TYPE_MISMATCH`.
- Accept changes in case, repeated whitespace, and final punctuation. Preserve the original error for display.
- Extract the two type strings in their original order. Do not reverse which one was found and which one was requested.
- Do not require the literal words `inventoryitem` and `serializedinventoryitem`. Those are one documented pair.
- Display readable labels for known types, with the original identifiers available. Preserve unfamiliar type identifiers rather than inventing labels.
- For a non-item pair, show the general explanation and target check. Do not automatically select Items or Inventory Item.
- For a prefix-only or code-only query, identify the error family but do not invent the missing types.
- Useful aliases include `record type mismatch`, `different type from the type specified`, `wrong item type selected`, and `item import record type`.
- Do not treat every message containing `type` as this error. A missing Type field, a unit-type problem, an unsupported transformation, and a parent-item type mismatch need their own guidance.

### What to investigate in the current implementation

The original catalogue already contained INV-02, with the fragments `inventoryitem` and `serializedinventoryitem`. The user reported a no-match result for this family. We have not inspected the implementation or established where that miss occurs.

The actual reported pair is `otherchargesaleitem` versus `otherchargepurchaseitem`, with repeated spaces in the pasted sentence. The serialized-inventory text was the example in the SuiteAnswers article the user found, not their failed import's message. Preserve that distinction in the fixtures and source notes.

Check that INV-02 is included in the generated content and both search indexes. Then trace recognition, filtering, guide grouping, and navigation. Correct the smallest demonstrated issue. The broader message pattern is a content requirement, not proof that the shared ranking algorithm needs replacement.

### Source notes and limits

- **Supplied SuiteAnswers article:** Answer ID **34807**, title beginning *Resolve Import Error: The Record you are Attempting to Load has a Different Type...*, product NetSuite 2024.1, last updated **05/08/2024** as shown in the supplied text. The excerpt was provided by the user; no authenticated SuiteAnswers page was accessed. Preserve the date as supplied because its day/month ordering was not independently established. Use the public Oracle article for the visitor source link.
- **Public inventory-import article:** Confirms the specific Inventory Item versus Serialized Inventory Item example and matching the Import Assistant selection to the existing item type.
- **Actual reported message:** Other Charge for Sale versus Other Charge for Purchase. Oracle's corresponding record pages establish the readable type labels. The SuiteAnswers example supports the matching-type principle; it is not a report that this user imported serialized inventory.
- **Public error-code reference:** Confirms that the message is a general template containing two type parameters. This supports broader recognition without asserting that every record type is available for CSV import.
- **Supported item import types:** Supports the available choices and the first-page Record Type selection. Splitting mixed-type updates is an editorial preparation step based on selecting the correct type for each job.
- **Record-loading API:** Supports checking the requested type and existing record ID when a trace identifies a script load. It does not establish that a script caused this reported error.
- **SuiteScript qualification:** Oracle allows certain base item types to load their subtypes. For example, the Inventory Item base type can load serialized and lot-numbered inventory records. Do not reuse the CSV dropdown rule as a claim that every script load requires identical subtype labels. [Using item records in SuiteScript](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N3188567.html)

No live NetSuite record was updated while preparing this guide. Broad pattern recognition, correct type extraction, and record-specific resolution are separate checks.

### Acceptance checks

1. The exact reported otherchargesaleitem/otherchargepurchaseitem message, including repeated spaces, finds INV-02 in both searches. It identifies Sale as the existing type and Purchase as the requested type.
2. Reversing those names reverses their displayed roles. It does not always recommend the Sale option or Inventory Item.
3. The documented inventoryitem/serializedinventoryitem example and synthetic pairs such as lotnumberedinventoryitem/serializedinventoryitem and customer/vendor match the family. Synthetic pairs are parser fixtures, not claims of reproduced account failures.
4. Non-item or unfamiliar pairs receive the general check without a forced Items instruction.
5. The distinctive prefix and the error code alone can find the guide without fabricated type names.
6. Case, spacing, and final punctuation do not prevent recognition.
7. Other errors mentioning Type, units, or parent records retain their own matches.
8. A search result opens this explanation first when it shares a guide with unrelated item or unit errors.
9. Catalogue coverage remains 118 unique entries after replacing the old INV-02 content. Preserve existing routes and the other inventory-item entries.

### Handoff

Expand INV-02 using this wording and the site's existing content structure. Keep the general mismatch explanation separate from the item-import steps and the conditional script check. Include the family pattern, type extraction, aliases, and fixtures in both search paths. Keep these implementation notes out of the visitor page. Inspect the reported miss before changing shared matching behavior, then report the targeted change and representative regression results. Build locally without deploying.
