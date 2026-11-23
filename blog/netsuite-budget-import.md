---
title: "NetSuite Budget Import: What a Successful Import Hides"
date: 2026-11-23
description: "A NetSuite budget import can finish cleanly and still be wrong: the wrong category, the wrong currency, or blank cells that overwrite. How to check each."
tags: ["Admin", "Advisory", "Reports"]
faqSchema: true
---

# NetSuite Budget Import: What a Successful Import Hides

[[toc]]

The budget import is the shortest import in NetSuite. Other record types go through a five-page assistant under the Setup menu. Budgets get two pages, a template you download from the same screen, and a Run button.

It is also an import that can finish cleanly and still be wrong. A budget file can load with every row accepted and put next year's numbers in the wrong category, in the wrong currency, or over the top of figures you meant to keep.

Getting the file accepted takes one read of the formatting rules. Most of this article is about the other part.

**How do you import a budget into NetSuite?** Go to Transactions, Financial, Set Up Budgets, Import. Download the budget template from that page, fill in one row per account with an amount for each period, select the file, review the field mapping, and click Run. You need the Set Up Budgets permission, and the fiscal year you are budgeting for must already exist in Manage Accounting Periods. Account values go in as account names or internal IDs, never as account numbers.

## What a NetSuite Budget Is

Oracle's overview of budgets contains two sentences worth reading before anyone builds a file. Budgets provide information for reports. They do not control your income and expense.

A budget covers one fiscal year and holds an amount per account for each accounting period in that year. It can be narrowed to a customer or project, an item, a department, a class, a location, or any combination of those. In OneWorld it also belongs to a subsidiary, and with Multi-Book Accounting it belongs to an accounting book as well.

So the whole job of the import is to put a number into a cell that the Budget vs. Actual report will read later, and every mistake that matters comes down to a number sitting in the wrong cell.

## Three Things That Have to Exist First

**The year.** Budget rows are keyed to a fiscal year, and the Year value in the file has to match the name of the year on the Manage Accounting Periods page exactly. If next year's periods have not been created, there is nothing to import into. Building them is one of the [two calendars to set up before January](/blog/netsuite-year-end-close#two-calendars-to-build-before-january), and it comes before the budget.

**The category.** When the Multiple Budgets feature is enabled, every budget must be assigned a budget category, and Category becomes a required field in the file. Categories are created at Setup, Accounting, Accounting Lists, New, by choosing Budget Category. In OneWorld each category also carries a Global checkbox, and that box decides more than its size on the page suggests. It gets its own section below.

**The permission.** The import needs the Set Up Budgets permission. It does not need Import CSV File. Those are separate permissions, so the person who runs every other import in the account may not be able to run this one, while someone who has never opened the Import Assistant can. Find out which of those is true in your account before the day the budget is due.

## Building the File

The template is on the import page itself, and it carries every budget field as a column. Each row is one account for one combination of criteria, with the period amounts running across it.

Oracle's formatting rules are short:

- **Accounts go in by name.** The value has to match the Name field on the account record exactly. Account numbers are not accepted, even when the Use Account Numbers preference is on.
- **Subaccounts need the full path.** Parent and child, separated by a colon with a space on each side, as in `Operating Expenses : Travel`. Subsidiaries follow the same format.
- **Internal IDs are the way around duplicates.** Oracle allows internal IDs or external IDs in place of names, which is what to use when two accounts share a name under different numbers.
- **Amounts are bare numbers.** No thousands separators and no currency symbols. A spreadsheet column formatted as currency will write both into the CSV.
- **The year is a name.** It has to match what Manage Accounting Periods calls that year, character for character.

Of those, the account rule is the one most at odds with what the screen shows. With Use Account Numbers on, an account shows up as 6100 Travel in lists and on transactions, while the Name field on the record holds only Travel. The file wants the second one.

One convention is worth carrying over from the manual entry page, where Oracle's instruction is to enter budget amounts as positive numbers. I would hold the file to the same rule for income and expense alike, and test a single row first if the source spreadsheet signs its expenses as negatives.

When rows are rejected, the errors come back through the same error reporting as any other CSV import. The [CSV Error Translator](/tools/netsuite-csv-error-translator/) will tell you what a given message means.

## What the Import Accepts and Should Not

Rejected rows are the easy problems, because you are told about them. Three things load without an error and are wrong.

### An unmapped category picks one for you

With Multiple Budgets on, Category is required. Oracle's documentation then adds a warning: if the Budget Category field is not mapped during the import, its value defaults to the first budget category on the list, and that list is ordered alphabetically.

Suppose the category list holds two entries, Forecast and Operating Plan. A file whose Category column was left unmapped goes into Forecast. Every row succeeds, the Operating Plan budget stays empty, and the import results look exactly as they would have if the mapping were right.

Preventing it takes a minute. The second page of the assistant shows the field mappings before anything runs. Confirm that Category is mapped, and that the column behind it is filled on every row.

### A global category changes the currency

This applies to OneWorld accounts with Multiple Currencies enabled. Every budget category there is either global or local. A global category stores budget amounts in the base currency of the root parent subsidiary. A local category stores them in the base currency of the subsidiary on the row.

You do not type a currency next to the amount. It follows from the Category and Subsidiary columns, and Oracle's own example shows what that means. The root parent reports in British pounds and there is a subsidiary in Canada. A row with a local category and the Canadian subsidiary stores 10,000 as 10,000 Canadian dollars. The same row with a global category stores it as 10,000 British pounds.

The number in the file is identical in both cases, so there is nothing to catch by looking at the file or at the import results. That subsidiary's budget is off by the exchange rate, and it stays that way until someone compares it with actuals and cannot explain the variance.

The category type should be settled before the spreadsheet goes out to the people filling it in, because they need to know which currency they are budgeting in.

### A blank cell is a value

Oracle flags this twice on the same help page. Any field in the file that does not contain a value appears in the created budget record as blank. And using a file to update an existing budget record overwrites all of the existing budget data, so the file must contain a value in every field or the existing data is lost.

That rules out the partial update. A row carrying only the months that changed, with the earlier months left empty, replaces the whole line and takes the earlier months with it.

The route Oracle documents instead is to export the existing budget, change it in the spreadsheet, and reimport the complete data. The export is a budget search at Transactions, Financial, Set Up Budgets, Search. For amounts by period, Oracle points to the Budget Income Statement with the Column footer set to Accounting Period.

## Copying Last Year Instead

The other way to start is the Copy Budgets page under Transactions, Financial. It builds a new budget from a prior year's budget or from a prior year's actual results, moved up or down by a percentage in the Modify By field.

Two sets of boxes on that page deserve a slow read.

The Replace box decides whether the copy overwrites what is already in the target or adds to it. Cleared, it adds. Oracle's note is direct: NetSuite lets you have only one budget per category per fiscal year, and copying a budget into the same year and category doubles the budgeted amount. By the same logic, a copy run a second time with the box cleared adds the amounts again.

The Keep Detail boxes decide whether the copy carries its customer, item, department, class and location breakdown. Clear all of them and, in Oracle's words, the new budget has no customer, item, department, class, or location criteria. A budget that was entered by department arrives as one figure per account, and the departmental comparison is gone.

In OneWorld, a copy between category types also converts the amounts. Budget to budget, local to global or the reverse, runs through the Budget Exchange Rates table, which NetSuite seeds from the consolidated rates and then lets you edit. Copying local actuals into a global budget uses the Consolidated Exchange Rates table instead. Know which table produced the numbers, and who last changed the rates in it.

## When the Report Shows Zeros

The import completed, the budget list shows the records, and the Budget vs. Actual report has a budget column full of zeros. Oracle documents two causes. Neither one is in the file.

The first is a preference. Budgets are set up by period, so budget data does not display when the Report by Period preference is set to Never. It sits under Home, Set Preferences, on the Analytics subtab, and it needs to be All Reports or Financials Only. Because that page holds each user's own settings, the same report can show a budget for one person and zeros for the person at the next desk.

The second is the category. With Multiple Budgets enabled, financial statements that carry budget data open with the Budget Category footer set to Legacy, which is the category assigned to budgets that existed before the feature was turned on. A budget imported into Operating Plan does not appear until the reader changes the footer. Oracle also notes that the Budget Category and Subsidiary Context filters cannot be customized in the Report Builder. Tell the people who read the report which category to select, and name the categories so the right one is obvious in a dropdown.

Custom segments are a third thing to know, and this one has to be known before the file is designed. Oracle's setup steps list custom segments among the criteria a budget can be entered against. Its reporting pages say custom segments are not included in the Column list of the budget reports, and are not included in the budget fields of the Financial Report Builder for those reports. If the plan is to budget by a custom segment and then review variance by it, run one row through the import and the report before building the whole file around that plan.

## Checking That It Landed

The import results tell you rows were created. Whether the budget is right is a separate question, and answering it takes five steps.

1. Open Transactions, Financial, Set Up Budgets, List and confirm the records exist under the year, subsidiary and category you intended.
2. Run the Budget Income Statement at Reports, Banking/Budgeting, with the Column footer set to Accounting Period and the Budget Category footer set to the category you loaded.
3. Tie the annual total, and at least one month, to the approved spreadsheet. A total that is exactly double points at a copy that added. A difference that looks like an exchange rate points at the category type.
4. Run Budget vs. Actual by the dimension you budgeted by, department for example, and confirm the budget column fills at that level.
5. Have a second person open the same report under their own login.

The last step catches the preference problem. In OneWorld it also catches an access rule: an employee can view budgets only for the subsidiaries that employee is associated with.

## Revising It in March

NetSuite lets you have only one budget per category per fiscal year. That one rule settles how a midyear revision has to work.

Import revised numbers into the original category and they overwrite the original. From then on the approved budget exists only in whatever spreadsheet it came from, and every variance report compares actuals with the revision.

If the original needs to survive, the revision goes into its own category, and that requires Multiple Budgets. Oracle describes the feature in those terms: it is for creating multiple budgets for the same time period and combination of criteria. Enabling it puts the existing budgets into the Legacy category, which is the category the reports then open on. I would settle this in December, before a first revision exists, because afterward the choice is between two sets of numbers and only one of them is still in the system.

## What the Budget Will Not Do

Back to Oracle's sentence. Budgets provide information for reports and do not control income and expense, so an imported budget does not warn anyone, block anything, or show up on a purchase order.

Oracle publishes a SuiteApp aimed at that gap, called Expense Commitments and Budget Validation. It checks purchase orders, purchase requests and vendor bills against a budget, and it can warn when an expense goes over for an account and segment combination. Three details matter here. Oracle states that it does not support accounts without OneWorld. It requires the Advanced Financials module. And it works from its own custom budget records, entered under a separate Budgets menu with their own import guidelines, so confirm which budget a control is reading before assuming it is the file you just loaded.

::: tip Budget checks at the point of approval
Reporting a variance after the month closes and stopping an over-budget purchase before it is approved are two different jobs. [Greenlight Approvals](https://greenlightsoftware.io/products/approvals/) is my own product and it is built for the second one. I wrote up the reasoning in [NetSuite Budget Enforcement During Approvals, Not After](https://greenlightsoftware.io/resources/15-netsuite-budget-enforcement-approvals/). It reads the native budget, so the import described here still has to be right.
:::

## A Short List for December

<div class="print-checklist">

**Before the file**

- Next year's accounting periods exist, and the year name is copied exactly
- A decision made on Multiple Budgets, and the categories created
- In OneWorld, each category confirmed as global or local
- Set Up Budgets permission confirmed for whoever runs the import
- The reporting level agreed: which of department, class, location, customer and item the variance will be read by

**The file**

- Account names taken from the Name field, with full parent and child paths
- No account numbers, thousands separators or currency symbols
- Category filled on every row
- No empty period cells on any row that updates an existing budget

**After the import**

- Category mapping confirmed before Run
- Annual total and one month tied to the approved spreadsheet
- Budget vs. Actual opened with the right category in the footer
- The same report checked under a second login
- Report readers told which category to select

</div>

## What to Settle Before the File Exists

The import is the short part. What decides whether the budget is usable in March was settled before the file existed: whether a revision can sit beside the original, which currency each subsidiary budgets in, and what level the variance will be read at.

None of those is a technical question, and all three are cheaper to answer now than after the first board meeting of the year. The report they feed is read straight after the [month-end close](/blog/netsuite-month-end-close), so a budget that cannot be trusted turns into one more reconciliation inside a week that already has enough of them.

## Frequently Asked Questions

### How do you import a budget into NetSuite?

Go to Transactions, Financial, Set Up Budgets, Import. Download the budget template from that page, fill in one row per account with an amount for each period, select the file, review the field mapping, and click Run. The import requires the Set Up Budgets permission and does not require the Import CSV File permission. The fiscal year must already exist in Manage Accounting Periods, and the year in the file must match its name exactly.

### Why does a NetSuite budget import reject account numbers?

Because the Account field accepts account names, internal IDs or external IDs, and Oracle states that account numbers cannot be used even when the Use Account Numbers preference is enabled. The value must match the Name field on the account record. A subaccount needs the parent and child names separated by a colon with a space on each side.

### What happens if the budget category is not mapped during the import?

When the Multiple Budgets feature is enabled, Category is a required field. Oracle states that if the Budget Category field is not mapped during the import, its value defaults to the first budget category on the list, which is ordered alphabetically. The rows import successfully into that category, so the mapping should be confirmed before clicking Run.

### Why does the Budget vs. Actual report show zeros after a budget import?

Oracle documents two causes. Budget data is not displayed when the Report by Period preference is set to Never, and it needs to be All Reports or Financials Only on the Analytics subtab of Set Preferences. Separately, when Multiple Budgets is enabled, financial statements with budget data default the Budget Category footer to Legacy, so a budget loaded into another category does not appear until that category is selected.

### Can you update part of a NetSuite budget with a CSV file?

Not safely. Oracle warns that using a CSV file to update an existing budget record overwrites all existing budget data, and that any field without a value appears as blank. The file used for an update must contain a value in every field. The documented approach is to export the existing budget, change it, and reimport the complete data.

### How do you keep the original budget and a reforecast in NetSuite?

Enable the Multiple Budgets feature and load each version into its own budget category. NetSuite allows only one budget per category per fiscal year, so without separate categories a revised import replaces the original. Budgets created before the feature was enabled are assigned to a category named Legacy.

### Do NetSuite budgets stop spending that goes over budget?

No. Oracle states that budgets provide information for reports and do not control income and expense. Oracle publishes a separate SuiteApp, Expense Commitments and Budget Validation, that checks purchase orders, purchase requests and vendor bills against custom budgets. It does not support accounts without OneWorld and requires the Advanced Financials module.

<ConsultingCTA secondary-link="/fractional-netsuite-administrator" secondary-text="See Fractional Administration" message="If the variance report is not trusted, the cause is usually upstream of the report, in how the budget was structured before anyone imported it. Getting that structure right once is ordinary work in a fractional administration engagement." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
11/23/2026

<TagLinks />

Read Next - [NetSuite Year-End Close: What Is Automatic and What Is Not](/blog/netsuite-year-end-close)
