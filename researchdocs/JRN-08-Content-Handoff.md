# Add the journal-balance error guide

Add **JRN-08** for `The amounts in a journal entry must balance.` Keep **JRN-07**, which covers the separate `Rounding Error` message, and link the two where relevant. This adds one entry to the project catalogue, bringing it from 118 to 119. It does not necessarily require another guide page.

## Visitor copy

**Title:** The journal's debits and credits do not balance

**Summary:** Check each journal separately. If the amounts already balance, check which lines reach NetSuite, then try the documented line-order workaround.

**Message may mention:**

`The amounts in a journal entry must balance.`

**What it means**

NetSuite is trying to save a journal whose debit and credit totals do not match. The numbers may be wrong, or the import may not be bringing the expected lines together. [Journal balance requirement](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4103386138.html)

A balanced total for the whole CSV is not enough when the file contains several journals. Each journal must balance on its own.

**Check this first**

Take one failed journal and compare its debit and credit totals using the values saved in the CSV. Check that every line belongs to the intended journal and that both amount columns are mapped correctly.

**Show the steps**

1. Identify the lines for one journal. For a file containing several journals, use the same identifier and mapping that the import uses to group them. Check for missing or inconsistent identifiers.
2. Total that journal's debits and credits separately. Include every intended line and inspect the full saved amounts, not just rounded spreadsheet displays.
3. On **Field Mapping**, confirm that Debit maps to the journal line's Debit field and Credit maps to its Credit field. Check that a mapping default is not supplying a different amount.
4. Inspect the saved CSV for missing amounts, shifted columns, or values that the spreadsheet total treated as text. Compare suspect values with the source before changing them.
5. Check for missing lines, duplicated lines, and spreadsheet total rows. Keep calculation rows outside the import data.
6. If the amounts, grouping, and mappings check out, try the line-order steps below on a copy of the failed journal.

For imports containing several journals, Oracle documents transaction identifiers on every row. The dedicated Single Journal Entry import handles one journal, so do not add a multi-journal identifier requirement to that workflow. [Journal CSV structure](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534489651.html)

### The amounts balance, but NetSuite still rejects the journal

SuiteAnswers Answer **70365** describes a case where the values are valid and the journal balances, but the order of the debit and credit lines causes the import to fail. Its suggested workaround is to keep each side together.

1. Make a copy of the failed journal's import data.
2. Move complete rows so the debit lines come first, followed by the credit lines, within that journal.
3. Keep every account, amount, memo, and other field attached to its original line. Do not sort the Debit or Credit column by itself.
4. Recheck the totals and save the CSV.
5. Retry that journal and check the import result.

For example, a journal arranged as **debit 60, credit 100, debit 40** can be rearranged as follows without changing an amount:

| Journal identifier | Account | Debit | Credit |
| --- | --- | ---: | ---: |
| JE-EXAMPLE-01 | Expense A | 60 | |
| JE-EXAMPLE-01 | Expense B | 40 | |
| JE-EXAMPLE-01 | Accrual account | | 100 |

The names and identifier above are illustrative. Use your actual account references and mapping. For a batch, keep each journal's rows together; do not move all debit rows in the entire file ahead of all credit rows.

This is a workaround for an otherwise balanced file. Reordering cannot fix unequal totals or an incorrect mapping. Do not change amounts or add a balancing line just to make the error disappear.

### If you are updating an existing journal

Check how the imported lines will affect the saved journal. Oracle documents that journal line imports using Update append lines unless the sublist is replaced. The resulting journal must balance; do not assume that a CSV line will replace a particular existing line.

Replacing the sublist requires the complete intended set of lines and a deliberate review of the replacement settings. It is not a routine fix for this error. Oracle also notes that updating a journal applied as a payment can remove that payment application. The Single Journal Entry Import Assistant does not support updates. [Journal update behavior](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534490251.html)

**If that looks right**

Keep the failed journal, its complete error, and the import mapping together for review. If an error also identifies a script, investigate what that script changes before the journal is saved. The balance message alone does not identify a script as the cause.

For an intercompany or advanced intercompany journal, use the requirements for that journal type. Do not assume that the standard-journal line-order workaround explains its failure.

**Related guides**

- Journal rounding error: JRN-07.
- NetSuite asks for an Account on a spreadsheet total row: JRN-05.
- Check saved numeric values: P04.
- Check record grouping and file links: P09.

**Still stuck?**

We can help compare the journal, the CSV, and the import mapping to find where the two sides stop matching.

**Contact link:** Ask MySuite for help

## Sources and editorial scope

Reviewed September 16, 2026.

- **SuiteAnswers Answer 70365**, supplied by the user: last updated **06/01/2026**, applicable product **NetSuite 2026.1**. It covers this error through the Single Entry Import feature or Import Assistant after amounts and cell values have been verified. It supplies the consecutive debit/credit line workaround. No authenticated SuiteAnswers page was accessed.
- [Common Errors With Journal Entries](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4103386138.html) documents the exact error and its basic meaning in SOAP responses. It supports the balance explanation, not the CSV line-order workaround.
- [Journal Entry CSV Files](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534489651.html) documents balance and grouping requirements. Its intercompany example alternates debit and credit rows. Therefore, do not turn the supplied workaround into a universal claim that NetSuite cannot import alternating debit and credit lines.
- [Journal Entry Import Errors](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570029068.html) supports related checks for total rows and hidden decimal values. It does not make this message synonymous with `Rounding Error`.
- [Using Journal Entry Import for Updates](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1534490251.html) supports the conditional update section.

The first-check sequence combines these sources with practical troubleshooting. It does not establish the cause of any particular failed file. No client CSV was examined and no import was run for this addition.

## Implementation guidance

Use the existing content schema and page layout. Add JRN-08 as a searchable explanation, either within the appropriate existing journal guide or on its own page if that fits the current structure. Preserve JRN-07 and its links.

Categories: **Transaction lines** and **Dates and numbers**. Context: **Journal entries**, including the Single Journal Entry import. Intercompany visitors can use the general balance checks, but must not be given the line-order workaround as an established intercompany fix.

Match the full message and distinctive partial queries such as `amounts in a journal entry must balance` and `journal entry must balance`. Add plain-language search phrases such as `journal balances in Excel but import fails` and `debit credit line order`. The last two are related troubleshooting queries, not exact NetSuite message matches.

Show the summary, first check, and the heading for the balanced-file workaround without requiring visitors to open a long general procedure first. Keep the detailed steps expandable if that matches the existing design. Use the same content for header search and translator search.

Do not add automatic rounding, balancing amounts, or row sorting. This change is explanatory content. Keep the difference between a message match and a confirmed cause visible in the wording.

## Acceptance checks

1. The full error, with or without its final period, returns JRN-08 in both searches.
2. Different capitalization and repeated spaces still match. Preserve the original input for display.
3. The distinctive partial phrase finds this explanation. The word `balance` alone does not force a journal-specific diagnosis.
4. A file containing two journals with opposite differences is explained as two unbalanced journals, even when its overall totals match.
5. A balanced-file query exposes the conditional line-order workaround and cites Answer 70365.
6. The workaround moves complete rows within each journal and preserves amounts and line associations. It does not recommend sorting the two amount columns independently.
7. A genuine difference in totals leads to reconciliation, not a promise that reordering will resolve it.
8. JRN-07 remains the primary match for the separate `Rounding Error` message, with JRN-08 available as a related guide.
9. Intercompany imports are not told that alternating debit and credit rows are universally invalid. Existing-journal updates retain their distinct line-handling checks.
10. The catalogue accounts for 119 entries after JRN-08 is implemented. Do not assume the live site's count or guide-page count has changed merely because this specification has.

Apply the addition locally and report the content and search checks. This handoff does not request deployment.
