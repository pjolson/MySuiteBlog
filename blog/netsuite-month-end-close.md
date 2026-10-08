---
title: "NetSuite Month-End Close: Where It Actually Breaks"
date: 2026-10-08
description: "NetSuite ships a period close checklist. It tells you what to do, never what breaks when you skip a step. Here is where close actually goes wrong."
tags: ["Admin", "Advisory", "Inventory"]
faqSchema: true
---

# NetSuite Month-End Close: Where It Actually Breaks

[[toc]]

Most finance teams I work with are not closing on day three. They are closing somewhere around the middle of the following month, and the same three or four surprises turn up every time. Nobody treats this as a crisis, because it has been that way long enough to feel normal.

What makes it frustrating is that the team is usually doing the work. The checklist gets run. The periods get closed. And the numbers still move after the fact, or the consolidated roll-up disagrees with the subsidiaries, or inventory reprices for reasons nobody can trace back to a decision.

The gap is not effort. NetSuite tells you what to do at close, and almost nothing about what happens when you skip a step.

## NetSuite Already Has a Close Checklist

This is the part many teams miss. NetSuite ships a Period Close Checklist, and a surprising number of accounts run close out of a spreadsheet beside it while the built-in checklist sits unused.

The full set of tasks, in order:

Lock A/R, Lock A/P, Lock Payroll, Lock All, Resolve Date/Period Mismatches, Review Negative Inventory, Review Inventory Cost Accounting, Review Inventory Activity, Create Intercompany Adjustments, Revalue Open Foreign Currency Balances, Calculate Consolidated Exchange Rates, Eliminate Intercompany Transactions, Create Period End Journals, GL Audit Numbering, and Close Period.

Some are feature dependent. You only see the currency tasks with multiple currencies enabled, the intercompany tasks in OneWorld, and GL Audit Numbering when that feature is on.

Read as a flat list, it looks like fifteen chores to tick off, and that is how most teams work it. The dependencies underneath the list are where the trouble starts, and they are not shown on the checklist page.

## The Checklist Runs as Two Chains

Oracle publishes the [dependencies between closing tasks](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4317009345.html), and they matter more than the task names. After Lock All, the checklist splits into two sequences that run in parallel and converge at the end.

**The inventory chain:** Resolve Date/Period Mismatches, then Review Negative Inventory, then Review Inventory Cost Accounting, then Review Inventory Activity. Each one depends on the one before it.

**The consolidation chain:** Create Intercompany Adjustments, then Revalue Open Foreign Currency Balances, then Calculate Consolidated Exchange Rates, then Eliminate Intercompany Transactions, then Create Period End Journals. Same thing. Each depends on its predecessor.

Both converge on Close Period, which requires every prior task in the primary book to be complete.

That structure explains a failure pattern that otherwise looks random. When somebody skips a task in the middle of a chain, the tasks after it still run. They just run on an incomplete foundation. The output looks finished. It is not.

The two tasks I see skipped most often, intercompany work and consolidated exchange rates, sit in the middle of the same chain, one immediately after the other.

## The Four Places It Goes Wrong

### 1. Reopening a closed period to fix an assembly build

I work with a manufacturer who uses a contract manufacturer for assembly. The contract manufacturer substitutes components fairly often, using a replacement part when the specified one is not on hand. The substitution is real and the finished goods are fine. The problem is that the assembly build recorded in NetSuite says one thing and the parts actually consumed say another.

So someone reopens the closed period and adjusts the build.

That single decision is the most expensive habit in their close. Oracle is direct about why. If you reopen a closed period and edit an inventory transaction in it, the costing changes carry over to every subsequent related transaction. The adjusted build repriced the assembly, which repriced the fulfillments that consumed it, which moved cost of goods sold inside months that had already been signed off. Oracle's own instruction for the Review Inventory Cost Accounting task is to confirm there are no costing items left to correct and that costing calculations are not currently running.

There is a second trap behind the first. If you reopen a period to process a backdated transaction, you have to leave the period open until the inventory cost recalculation finishes. Closing it again while recalculation is still running produces errors and results Oracle describes as unpredictable. The recalculation is not instant, and on an account with deep bills of materials it is not close to instant. Most people reopen, make the edit, and close again in the same sitting, which is the one sequence Oracle warns against.

The fix is rarely accounting. It belongs in the intake process. If substitutions happen regularly, they need to be captured when the build is recorded rather than discovered weeks later. When a correction genuinely cannot wait, the safer path is an adjustment in the current period, where the cascade has nowhere to travel.

This is also a reminder that the [costing method on those items](/blog/netsuite-costing-method-decision) decides how far the damage spreads. Average costing recalculates forward from the change. A costing decision made during implementation is what sets how far a correction travels, which is worth knowing before you agree to reopen anything.

### 2. The intercompany tasks nobody was taught

Create Intercompany Adjustments and Eliminate Intercompany Transactions are two different tasks at two different points in the chain, and I see both skipped by teams who are otherwise careful.

This is almost never laziness. Nobody explained the process. Elimination creates journal entries for intercompany transaction lines flagged for elimination, so that balances between related subsidiaries net out at the consolidated level instead of counting twice. Skip it, and the subsidiary books keep entries that should have been removed in consolidation. The symptom is exactly what people describe: odd balances sitting in subsidiaries where they do not belong, with no obvious source.

Because elimination sits near the end of the consolidation chain, it also inherits every problem upstream of it. If intercompany adjustments were not created, elimination runs against an incomplete picture.

If nobody on the team can explain what these tasks do, that is the finding worth writing down. People skip steps they were never taught, and they will keep skipping them until somebody walks through what the step is actually for. That is a half-hour conversation, not a project.

### 3. Consolidated exchange rates, missed quietly

This one is worth separating out, because it is the single most common silent failure I see in OneWorld accounts.

There are two currency tasks, not one. Revalue Open Foreign Currency Balances handles open balances. Calculate Consolidated Exchange Rates is a separate task, immediately after it, that sets the rates used to translate subsidiary results into the parent currency.

Teams often do the first and miss the second. Nothing errors. The subsidiaries look right, because in their own currency they are right. The drift only shows up at the consolidated level, and usually not in the month it happened. Somebody reviews a roll-up a quarter later, says the number looks off, and now you are reconstructing exchange rates across three closed periods to find out when it started.

The cheapest control here is to confirm consolidated rates are set for the period before anyone looks at a consolidated report, not after.

### 4. The drag that starts outside accounting

The most common reason a close runs to mid-month has nothing to do with the close checklist.

It is invoicing. Billing that is supposed to land on the last day of the month drags into the next one. Work is delivered, the customer is not invoiced, and accounting cannot close revenue on transactions that do not exist yet. The accounting team absorbs the delay and gets asked why close is slow.

You cannot fix that by closing harder. If close consistently runs past the first week, look at what is sitting unbilled with a date inside the period you are trying to close. If that queue is large on day one, the constraint is in order-to-cash, not in the ledger, and every day the accounting team shaves off its own process buys you nothing.

I would check this one first. It is the most common cause I see, and it tends to sit between departments, which is why it survives so long.

## A Close Sequence That Holds Up

This is the native checklist with the checks I would add around it. Treat it as the NetSuite-specific layer over your own close calendar rather than a substitute for it.

<div class="print-checklist">

**Before you start**

- Unbilled transactions dated in the period are cleared or deliberately deferred
- Pending approvals that post to the period are resolved
- Bank and credit card feeds are current

**Lock the subledgers**

- Lock A/R, Lock A/P, and Lock Payroll where applicable
- Lock All once subledger activity is genuinely finished

**Inventory chain, in order**

- Resolve Date/Period Mismatches
- Review Negative Inventory, and investigate anything underwater rather than clearing it
- Review Inventory Cost Accounting, with no items left at Pending, Processing or Failed
- Review Inventory Activity
- No assembly builds or inventory transactions were edited in a prior closed period this month

**Consolidation chain, in order**

- Create Intercompany Adjustments
- Revalue Open Foreign Currency Balances
- Calculate Consolidated Exchange Rates, confirmed set for this period
- Eliminate Intercompany Transactions
- Create Period End Journals

**Before you close**

- GL Audit Numbering where the feature is enabled
- A trial balance tie-out that someone actually reviewed
- Consolidated roll-up compared against the sum of subsidiaries
- Close Period

**Standing controls**

- The preference allowing transactions in closed periods is off unless there is a live reason
- Reopening a closed period requires a named approver, not a convenience decision
- If a period is reopened, it stays open until inventory costing recalculation completes

</div>

## What This Is Really Measuring

A close that takes until mid-month is not usually a sign that the accounting team is slow. In every account where I have looked at it closely, the delay was upstream of accounting, or it was a step in the checklist that somebody was never taught, or it was a correction habit that quietly repriced earlier periods.

None of those are visible from inside the close itself. They show up as a date on a calendar, which is why they get treated as a staffing problem.

If your close is slipping and nobody can say precisely where, that is worth a structured look rather than another month of pushing. A [full account review](/blog/netsuite-account-audit) covers period discipline alongside the access, configuration, and reporting problems that tend to travel with it. And if your reporting disagrees with the ledger once close is done, that is [a different problem with its own causes](/blog/netsuite-saved-search-gl-mismatch).

Running the checklist is the easy half. The harder half is knowing what each step is protecting you from, and that part was never going to come from the software.

## Frequently Asked Questions

### What is the NetSuite Period Close Checklist?

It is a built-in, ordered task list that walks an accounting period from open to closed. Depending on the features enabled, it covers locking A/R, A/P and Payroll, resolving date and period mismatches, three inventory review tasks, intercompany adjustments and elimination, foreign currency revaluation, consolidated exchange rates, period end journals, GL audit numbering, and closing the period. Many accounts never use it and run close from a spreadsheet instead.

### How long should a NetSuite month-end close take?

There is no single right answer, but if close regularly runs past the first week, something upstream is usually the cause rather than the accounting work itself. The most common culprit is invoicing that was meant to land at month end and drifted into the following month, which leaves accounting waiting on transactions that do not exist yet.

### Can you reopen a closed period in NetSuite?

Yes, but it carries consequences that are easy to miss. If you reopen a period and edit an inventory transaction, the costing changes carry forward to every subsequent related transaction, which can move cost of goods sold inside months you have already reported on. If you do reopen a period, leave it open until the inventory cost recalculation finishes, because closing it again mid-recalculation causes errors and unpredictable results.

### What happens if you skip intercompany elimination in NetSuite?

Intercompany elimination creates journal entries so that balances between related subsidiaries net out at the consolidated level rather than counting twice. Skip it and those entries stay on the subsidiary books, which shows up as balances sitting in subsidiaries where they do not belong. Because elimination sits near the end of the consolidation sequence, it also inherits any problem in the tasks before it.

### Why does consolidated reporting look wrong after close?

The usual cause is the Calculate Consolidated Exchange Rates task. It is separate from Revalue Open Foreign Currency Balances and runs immediately after it, and teams frequently do the first and miss the second. Nothing errors when it is skipped, and each subsidiary still looks correct in its own currency, so the drift only appears at the consolidated level and often not until a later period.

### Should you close the period before inventory costing finishes?

No. Oracle warns against closing a period while inventory cost recalculation is still in progress, because the results cannot be relied on. The Review Inventory Cost Accounting task is there to confirm that costing calculations are not currently running. On item records, the Cost Accounting Status field reports that state as Pending, Processing, Complete or Failed, and Oracle notes the field is hidden by default, so it is easy to assume recalculation finished when nobody has actually looked.

<ConsultingCTA secondary-link="/about/#ongoing-support" secondary-text="See Fractional Administration" message="If your close keeps slipping and nobody can say exactly where, that is usually a handful of specific causes rather than a staffing problem. Finding which ones apply to your account is the kind of work I do between closes." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
10/8/2026

<TagLinks />

Read Next - [How to Audit a NetSuite Account](/blog/netsuite-account-audit)
