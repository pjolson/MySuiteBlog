---
title: "Why Your NetSuite Saved Search Doesn't Match the GL"
date: 2026-09-22
description: "A saved search total that disagrees with the income statement or balance sheet almost always comes from one of seven causes. Here is the checklist we work through, in order."
tags: ["SavedSearch", "SuiteAnalytics", "Admin"]
faqSchema: true
---

# Why Your NetSuite Saved Search Doesn't Match the GL

[[toc]]


## The Tie-Out That Will Not Tie

It is day three of close. The income statement says one number. The saved search somebody built to break that number down by customer says a different one. The difference is $4,180.22, which is small enough to be embarrassing and large enough that the controller will not sign off on it.

Someone gets assigned to find it. If that someone is you, this post is the checklist we work through when clients call us with the same problem, in the order that finds the answer fastest.

One reassurance before the list. In most of these cases nothing is wrong with the ledger. The financial statements and the saved search are answering two differently phrased questions, and the mismatch is the phrasing. The job is to make the search ask the same question the report is asking.

## What the Financial Report Is Actually Doing

NetSuite's income statement and balance sheet make a specific set of choices for you. They include only posting transactions. They organize everything by accounting period. In a OneWorld account viewed at a consolidated level, they translate subsidiaries using consolidated exchange rates, a different rate type for income accounts than for balance sheet accounts. And they respect the fiscal year rollover, so closed years fold into retained earnings.

A transaction saved search makes none of those choices unless you make them yourself. That is what makes saved searches powerful, and it is also why a casually built one drifts away from the GL. Every cause on the list below is one of those unmade choices.

## The Checklist

### 1. The search includes non-posting transactions

Sales orders, purchase orders, estimates, and opportunities carry amounts but never touch the ledger. If the search criteria do not include **Posting is true**, the total can include documents the income statement has never heard of. This is the most common cause we find, and it is a one-line fix.

### 2. Main Line is doubling the numbers

A transaction search with no Main Line filter returns the header of each transaction and its lines, which can count the same money twice. Set **Main Line to true** when you want one row per transaction, **false** when you want line-level detail, and never leave it blank on a search whose totals matter. If the search needs item lines, filter Main Line to false and be deliberate about tax and shipping lines, which also carry amounts.

### 3. The search filters by date, the report thinks in periods

Financial statements are organized by accounting period. A search filtered on **Date within September** is asking a different question than the September income statement, and the two disagree whenever a transaction is dated in one month but posted to another. Adjustment periods make this worse, because their transactions carry ordinary dates while posting to a period the date filter cannot see. For any GL tie-out, filter on **Posting Period** rather than date.

### 4. Signed amounts are fighting the debit and credit convention

The Amount field on a search row is signed from the transaction's point of view, and revenue accounts hold credit balances, so income can show up negative or a credit memo can add when you expect it to subtract. For reconciliation work, build the search on the **Debit Amount** and **Credit Amount** fields, or on Formula (Numeric) expressions of them, and let the math mirror the ledger instead of arguing with it.

### 5. Subsidiaries and exchange rates

In a OneWorld account, a consolidated income statement translates each subsidiary at consolidated exchange rates, and income statement accounts use a different rate type than balance sheet accounts. A saved search showing base currency amounts per subsidiary will not sum to the consolidated report, and the difference moves every time rates do. Compare at the single-subsidiary level in local currency first. If the mismatch only exists at the consolidated level, you are looking at translation, not transactions.

### 6. The report is not the stock report

Before dismantling the search, open the report's settings. Someone may have customized it: a cash basis toggle, a department or class filter that quietly stuck, a subsidiary selection that excludes children. We have chased more than one four-figure difference that turned out to live inside a saved report customization from two controllers ago.

### 7. The fiscal year boundary

Income statement accounts reset at fiscal year end, and prior years live on the balance sheet as retained earnings. A search that sums revenue across a date range spanning the boundary is mixing two fiscal years that the statements will never show together. Check the range against the fiscal calendar, especially in accounts with a fiscal year that does not match the calendar year.

## How to Corner the Difference

When the cause does not jump out, stop comparing totals and shrink the problem. Pick the one account with the worst difference. Run the financial report drill-down for that account and period, run the search filtered to the same account and period, and export both. Sort by internal ID and walk them against each other. The rows that exist on one side and not the other are the answer, and there are usually fewer of them than you fear. The GL Impact view on any individual transaction settles what actually posted.

If a transaction appears on both sides with different amounts, look at its lines and its currency. If rows exist in the ledger that the search cannot see at all, check the search's criteria against that transaction's type, posting flag, and period one field at a time.

## When the Difference Is Real

Sometimes the search is right and the ledger has a problem: an integration posting to the wrong account, journals stuck unapproved at the boundary of the period, a script that stopped firing in March. That is no longer a reporting question. It is a systems question, and it tends to come with siblings. Our [Health Check](/netsuite-health-check) exists for exactly this situation, and finding the first thread during a tie-out is how many of those engagements start.

For the searches themselves, the building blocks worth knowing are in our [saved search date formulas guide](/blog/netsuite-saved-search-date-formulas) and the [CASE WHEN cookbook](/blog/stringmatch), which cover most of the formula work a reconciliation search needs.

## Frequently Asked Questions

### Why is my NetSuite saved search total different from the income statement?

The usual causes, in order of likelihood: the search includes non-posting transactions, the Main Line filter is missing so headers and lines both count, the search filters by date while the statement is organized by posting period, or signed amounts on credit-balance accounts are flipping the math. Each is a search-definition fix rather than a ledger problem.

### Should a GL tie-out search filter by date or by posting period?

Posting period. Financial statements are built on periods, and any transaction dated in one month but posted to another will disagree with a date filter. Adjustment periods never match a date filter at all, because their transactions carry ordinary dates while posting elsewhere.

### What does the Main Line filter do in a transaction saved search?

Main Line set to true returns one row per transaction, the header. Main Line set to false returns the line-level rows. Leaving it blank returns both, which double counts amounts on any search that sums a transaction total and its lines together.

### Why do revenue amounts show as negative in my saved search?

The Amount field is signed by debit and credit convention, and revenue accounts carry credit balances. Nothing is wrong with the data. For reconciliation searches, use the Debit Amount and Credit Amount fields so the search mirrors the ledger presentation instead of the signed transaction view.

### Why does my consolidated report not equal the sum of my subsidiary searches?

Consolidated financial statements translate each subsidiary using consolidated exchange rates, and income accounts translate at a different rate type than balance sheet accounts. A search totaling base currency amounts per subsidiary is summing untranslated numbers. Compare at the single-subsidiary level first to separate translation effects from transaction differences.

<ConsultingCTA secondary-link="/about/#ongoing-support" secondary-text="See Fractional Administration" message="We build the reconciliation searches and reporting that finance teams close with, and we find the differences that will not tie. If your team loses days of every close to numbers that disagree, that is fixable." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
9/22/2026

<TagLinks />

Read Next - [NetSuite Saved Search Date Formulas](/blog/netsuite-saved-search-date-formulas)
