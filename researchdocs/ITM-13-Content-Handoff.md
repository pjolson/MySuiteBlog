# Expand the record-not-found guide

Update the existing **ITM-13** entry for `Could not find any records by this name.` It currently describes a matrix-child update. Keep that documented scenario, but broaden the opening explanation and add the branches below. The same message can appear outside matrix items.

Keep ITM-13 as the stable content ID, even though its scope is broader than its original item category. This expands one existing entry; the project catalogue remains at 118 entries. Preserve existing links. Do not create separate duplicate pages for punctuation variants or the error code.

The reported client case was an **Inventory Item import using Update**. The identifier used, matrix status, failing field, and eventual resolution are unknown. Do not describe this case as solved.

## Visitor copy

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

## Implementation guidance

Apply this content to the existing guide and search system. Inspect how ITM-13 currently maps to a result and page before changing either. If the matrix-specific heading is reused as the result title, replace it with the general title above. Keep matrix instructions as a conditional section.

Category: **Record references**. Support inventory and other item imports, Chart of Accounts, Vendor-Subsidiary Relationship, and a general context. The message must remain findable without selecting an item import type.

Use the existing import-type choice to show the appropriate scenario. Ask about the identifying field only when it changes the next step. Do not preselect a cause. In an Inventory Item + Update context, show the ordinary item-identification checks first, with the matrix branch available when relevant.

Match the full phrase, the distinctive partial phrase `could not find any records`, and `RCRD_NOT_FOUND`. Normalize case, repeated whitespace, and surrounding punctuation for search while preserving the original message for display. Keep `RCRD_DSNT_EXIST`, `RCRD_PREVSLY_DELETED`, record-type mismatch, and invalid-reference messages distinct. They may be related results, but they do not establish the same scenario.

Use one shared content source for header search and translator search. An exact message match should be labelled as a message match, not a confirmed diagnosis. Keep the existing entry and guide counts accurate; branches and aliases do not each become another error entry.

## Acceptance checks

1. The exact message, with or without its final period, finds the expanded guide in both searches.
2. Mixed case, repeated spaces, and surrounding quotation marks still find it.
3. `Could not find any records` and `RCRD_NOT_FOUND` find it without inventing missing context.
4. Inventory Item + Update opens with identifying the existing item. It does not assume a matrix child or diagnose a missing inventory balance.
5. The matrix branch preserves the documented child/parent mapping and verified-child-ID alternative.
6. Chart of Accounts and Vendor-Subsidiary Relationship contexts lead to their own checks, rather than the matrix correction.
7. A visitor already using Internal ID is told to verify that ID and its destination mapping, not to switch to Name because the message contains that word.
8. A name-changing update is identified independently of the new name. A failed lookup does not automatically trigger Add or Update.
9. Other record-not-found codes remain distinct. A query containing only `record` does not become a confident match.
10. The guide retains ITM-13, preserves existing links, and does not inflate the entry count. Test the actual page and both searches; checking that the wording exists in a data file is not enough.

Report the content and search checks after applying the change locally. This handoff does not request deployment.
