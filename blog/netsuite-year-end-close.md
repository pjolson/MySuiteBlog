---
title: "NetSuite Year-End Close: What Is Automatic and What Is Not"
date: 2026-11-09
description: "NetSuite closes the fiscal year on its own once the periods are closed. What is actually left is next year's two calendars and a 1099 data chain that was built back in January."
tags: ["Admin", "Advisory", "Compliance"]
faqSchema: true
---

# NetSuite Year-End Close: What Is Automatic and What Is Not

[[toc]]

Somewhere in the next few weeks, year-end close goes on a calendar as its own event. A block of days in January, set aside for something separate and heavier than the monthly close.

In NetSuite that event does not exist. There is no year-end routine to run, no closing entry to post, and no button that moves last year into retained earnings. Closing December closes the year.

That is good news for the part people worry about, and it quietly hides the part that needs attention. Two of the three things actually left to do are configuration. The third one was decided eleven months ago.

**Does NetSuite have a year-end close process?** No. The Oracle documentation states that a formal year-end closing is not required, because NetSuite closes the year automatically once every period in the fiscal year is closed. Prior year net income is reported in the retained earnings account, and the income statement accounts keep their history rather than zeroing out. What does need doing before January is next year's accounting periods and tax periods, which are two separate setups, and 1099 preparation, which depends on how vendor bills were coded all year.

## NetSuite Closes the Year Without Being Asked

Oracle documents two methods and recommends one of them without much hedging.

Automatic close lets NetSuite work out the retained earnings balance from the dates selected on the balance sheet. Oracle calls this method strongly recommended, and says a formal year-end closing is not required. The trigger is the periods themselves. Once every period in the fiscal year is closed, the year is closed.

Which means the annual event reduces to the monthly one. If December closes properly, the year closed with it. The [period close checklist and its two dependency chains](/blog/netsuite-month-end-close) are the entire mechanism, and the December run of that checklist is your year-end close.

The second method, manual close, means posting journal entries that zero out the income and expense accounts and transfer the balance to retained earnings. Oracle lists it as an option and then says it is not recommended. The reason behind that is worth understanding, because it answers a question that comes up every January.

## Why the Income Statement Accounts Do Not Zero Out

Anyone arriving from QuickBooks expects the books to roll. Revenue and expense accounts reset to zero, the net lands in retained earnings, the prior year is sealed. NetSuite does not behave that way, and in the first January after a migration this reliably surprises somebody.

NetSuite does not post the closing balance to retained earnings. The stated reason is that posting it would zero out the past income statements and prevent them from being viewed at all. The history is preserved deliberately. What you get instead is a balance split across two equity accounts:

- **Retained earnings** holds net income from prior fiscal years.
- **The net income account** holds the current fiscal year to date.
- Read together, those two are the cumulative retained earnings balance at any point in time.

Retained earnings is a system account. It cannot be deleted or substituted with a different account. Adjusting it is possible with a journal entry, and that entry does show on the balance sheet, but routine postings straight into retained earnings are a habit worth never starting, because the balance is already being computed for you.

The rollover is also behind a reporting complaint that arrives looking like a close problem. Because the prior year has already folded into equity, a revenue total pulled across the year boundary will not agree with either annual income statement, and the gap is wider in accounts whose fiscal year does not follow the calendar. [Saved searches disagree with the general ledger for several reasons](/blog/netsuite-saved-search-gl-mismatch), and the fiscal calendar is only one of them.

There are legitimate reasons to want a year-end entry anyway. A statutory requirement in a particular jurisdiction. An allocation of the balance across other equity accounts. A parent company whose reporting package expects to see it. Oracle points those cases toward Period End Journal Entries rather than hand-built closing entries. If someone is proposing to zero the income statement manually, the first question is which requirement is driving it, because the default answer in NetSuite is that nothing needs to be posted.

## Two Calendars to Build Before January

This is the item that generates a phone call on the second business day of the year, and it takes about ten minutes to prevent.

Next year's accounting periods have to exist before anything can post into them. Oracle's requirement is blunt: every day must belong to an accounting period for reporting to be accurate. The setup lives at Setup, Accounting, Manage G/L, Manage Accounting Periods, and the **Set Up Full Year** button generates the periods and the rollup hierarchy in a single pass. You choose the first fiscal month, the four digit fiscal year, the period format, and whether the period name carries the starting or the ending year.

Then there is a second page, and this is the one people miss.

Tax periods are maintained separately, at Setup, Accounting, Taxes, Manage Tax Periods, with its own Set Up Full Year button. They are separate because tax reporting calendars do not always match accounting calendars, and in OneWorld they can differ between subsidiaries. Building one set and not the other is the common version of this mistake. The symptom shows up well after the cause, usually as a transaction that will not post for a reason nobody expects.

Two settings on the accounting period page deserve a decision rather than a default. The one-day year-end adjustment period adds a standalone period covering the last day of the fiscal year, which gives audit entries somewhere to live other than December. And if you create a period that precedes a locked period, the new period arrives locked, with A/R and A/P needing to be unlocked by hand before anything can be entered into it.

Both setups require the Manage Accounting Periods permission at Edit level or higher. Worth confirming before the person assigned to it finds out they cannot.

## 1099s Were Decided Last January

Of everything here, 1099 reporting is the one where December is already late.

Start with what NetSuite does not do. Oracle is explicit that NetSuite does not support 1099-MISC forms. What it provides is a set of customized saved searches to hand payment data to a third party provider, and the documentation names Sovos and Avalara as examples. Responsibility for the filing stays with you, and Oracle says directly that the saved search might not include everything you need to report, and that you should review its output for accuracy before exporting.

So there is a provider decision to make, and it stops being a December decision the moment onboarding takes longer than a week.

The harder part is the data underneath. For a payment to appear on a 1099, four separate things all have to have happened:

1. The vendor is marked **1099 Eligible** on the Financial subtab of the vendor record.
2. The expense account used is associated with a **1099-MISC category**. Each category represents a box on the form. One category per account, and the same category can be associated with more than one account.
3. The bill line actually used that account, rather than a similar one with no category on it.
4. The bill was paid. Paying it converts the transaction to cash basis, which is what 1099 reporting runs on.

Break any one of those and the payment is silently missing. Nothing errors. The saved search returns a number that looks entirely plausible, which is the worst available failure mode, because the total has to be wrong by enough to catch someone's eye before anybody goes looking.

Three of those four happen during the year, on transactions entered by people who were not thinking about tax forms. The checkbox gets skipped when the vendor record is created in March. An expense account was added in the spring and nobody associated a category with it. A bill got coded to Professional Fees instead of Contract Labor because both were sitting in the dropdown. Every one of those is a thirty second decision at the time and a reconciliation in January.

One eligibility rule narrows the population before any of this matters. A vendor is 1099 eligible only if its address is in the United States or a US territory, and Oracle lists those territories specifically: American Samoa, Guam, the Northern Mariana Islands, Puerto Rico, the US Virgin Islands, and the United States Minor Outlying Islands.

The dollar threshold is a separate question, and it is the one place in this article where I would not read the NetSuite help page as current. That page states the long-standing figure of six hundred dollars in payments for services during the calendar year. The One Big Beautiful Bill Act raised the threshold to two thousand dollars for payments made during 2026, with annual inflation indexing after that, so the 2025 payments filed earlier this year and the 2026 payments filed next year fall under different rules. Confirm the figure that applies with whoever signs your returns rather than with a help page.

What makes this an operational problem rather than a tax one is that NetSuite does not apply any threshold on your behalf. The saved search reports what was coded and what was paid. Deciding which of those payments are reportable remains a human step, performed on whatever the data gives you.

Here is what is worth doing in November instead of January. Oracle suggests a saved vendor search filtered on 1099 eligibility, which gives you the list of vendors already marked. Run it, then run the inverse, because the inverse is where the problems are: vendors **not** marked eligible that have paid bills against accounts carrying 1099-MISC categories. That population is your miss list. Six weeks is enough time to correct a checkbox and reclassify some bills. The second week of January is not.

## What Actually Belongs on the December List

What follows is only the part that is specific to NetSuite. Your own year-end calendar still governs everything around it.

<div class="print-checklist">

**Before the year ends**

- Next year's accounting periods created, with every day covered
- Next year's tax periods created, as a separate step on a separate page
- A decision made on the one-day year-end adjustment period
- Manage Accounting Periods permission confirmed for whoever is doing the above
- 1099 eligible vendor list reviewed, including the vendors not marked eligible
- Expense accounts that should carry a 1099-MISC category checked for one
- A filing provider selected, with lead time for onboarding

**Closing the final period**

- The ordinary period close sequence, run on December
- Inventory chain and consolidation chain completed in order
- Consolidated exchange rates in place for the final period, in OneWorld accounts
- A trial balance tie-out with a named reviewer
- December closed, which closes the fiscal year

**After**

- Prior year balance sheet checked, confirming net income is reported in retained earnings
- No closing journal entry posted unless a specific requirement called for one
- Period End Journal Entries used where year-end entries are genuinely required

</div>

## What This Changes About January

The reason year-end feels heavy in NetSuite is rarely the close. The close is December's close, run the way the other eleven were.

What fills the time is configuration that could have been done in November, and the reconstruction of coding decisions made across twelve months by people who had no reason to be thinking about tax forms when they made them.

Both levers are upstream of January. Build the calendars before the holidays, and treat 1099 coding as something checked monthly rather than investigated annually. A [full account review](/blog/netsuite-account-audit) covers period discipline and chart of accounts hygiene in the same pass, which is where both of these actually live.

NetSuite will close the year for you. It will not go back and fix how the year was recorded.

## Frequently Asked Questions

### Does NetSuite have a year-end close process?

No. Oracle documentation states that a formal year-end closing is not required, because NetSuite closes the fiscal year automatically once all of the periods in that year are closed. The method Oracle strongly recommends is automatic close, where NetSuite determines the retained earnings balance from the dates selected on the balance sheet. In practice this means the December period close is the year-end close.

### Why do income and expense accounts not zero out at year end in NetSuite?

Because NetSuite does not post the closing balance to retained earnings. Oracle explains that posting it would zero out the past income statements and prevent them from being viewed. Instead, net income from prior fiscal years is reported in the retained earnings account, and net income for the current fiscal year to date is reported in the net income account. Together those two accounts represent the cumulative retained earnings balance.

### Do you need to post a closing journal entry in NetSuite?

Not under the recommended approach. Oracle describes manual close, where journal entries zero out income and expense accounts and transfer the balance to retained earnings, as an option that is not recommended. Where a year-end entry is genuinely required by a statutory rule or a parent company reporting package, Oracle points to Period End Journal Entries rather than hand-built closing entries.

### Does NetSuite file 1099 forms?

No. Oracle states that NetSuite does not support 1099-MISC forms. NetSuite provides customized saved searches so that vendor payment data can be handed to a third party provider, and the documentation names Sovos and Avalara as examples. Oracle also notes that the saved search might not contain everything required for reporting and that its output should be reviewed for accuracy before being exported.

### How do you set up accounting periods for the next fiscal year in NetSuite?

Go to Setup, Accounting, Manage G/L, Manage Accounting Periods and click Set Up Full Year. You select the first fiscal month, enter the four digit fiscal year, choose a period format of calendar months, four weeks or four-four-five weeks, and decide whether the period name carries the starting or ending year. Oracle recommends Set Up Full Year because it generates all of the periods and the rollup hierarchy at once, and it requires the Manage Accounting Periods permission at Edit level or higher.

### Why are tax periods separate from accounting periods in NetSuite?

Because tax reporting calendars do not always match accounting calendars, and in companies with international operations tax periods can vary between subsidiaries. Tax periods are maintained at Setup, Accounting, Taxes, Manage Tax Periods, which has its own Set Up Full Year button. Creating next year accounting periods without also creating the tax periods is a common omission, and the resulting error appears later than the configuration that caused it.

<ConsultingCTA secondary-link="/fractional-netsuite-administrator" secondary-text="See Fractional Administration" message="If January turns into a reconstruction project every year, the causes tend to be a short and specific list. Identifying which of them apply to your account is worth doing while there is still time to act on the answer." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
11/09/2026

<TagLinks />

Read Next - [NetSuite Month-End Close: Where It Actually Breaks](/blog/netsuite-month-end-close)
