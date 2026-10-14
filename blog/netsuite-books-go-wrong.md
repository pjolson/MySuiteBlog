---
title: "Four Ways NetSuite Books Quietly Go Wrong"
date: 2026-10-14
description: "Four recording errors that survive for years because NetSuite reports them faithfully. How to check for each, and why the fix is rarely a new system."
tags: ["Advisory", "Admin", "Compliance"]
---

# Four Ways NetSuite Books Quietly Go Wrong

[[toc]]

When the numbers stop making sense, the system gets blamed. The reasoning is understandable: the books came out of NetSuite, the books are wrong, therefore NetSuite is wrong.

In most accounts that is backwards. The system is recording faithfully, doing exactly what a process told it to do, every month, for years. Nobody has read the result end to end since go-live.

Four patterns account for most of what I find. Each one is a recording error rather than a system failure, each survives for years because the resulting numbers look plausible, and each has a specific check you can run this week.

## 1. Customer Receipts That Never Become Revenue

Money arrives from a customer. Somebody enters it as a bank deposit and codes it to Accounts Receivable, because that is where customer money belongs.

The cash is now in the bank and receivables have gone down, so the entry looks right. It is not. **NetSuite cannot apply a deposit to an invoice.** The payment never attaches to anything, which means it never passes through revenue. In an account where invoices are the only source of revenue, every dollar recorded this way is a dollar the income statement never sees.

The longer it runs, the stranger the balance sheet gets. Customers accumulate receipts with no invoice behind them. Accounts Receivable drifts toward a credit balance, which is not something a healthy ledger does.

**How to check:** list customers with payments or deposits recorded against them and no invoices at all. Any population there is a problem. Then look at whether your AR control account has ever carried a credit balance at a period end.

## 2. Payroll That Is Funded But Never Recorded

A transfer goes from the operating account into a payroll clearing account. That transfer gets recorded. The money then leaves the clearing account to pay employees, and that side never gets recorded at all.

What makes this one durable is that the surrounding entries are usually correct. Employer taxes, benefits and accrued time off come through properly, so the books carry all the costs that sit on top of wages while the wages themselves are missing. Nothing errors. The payroll clearing account simply grows every month, and because it is not an account anyone reviews, it grows quietly.

**How to check:** compare gross wages recorded for a year against employer taxes and benefits for the same year. Those move together in a predictable ratio. If the taxes and benefits are an order of magnitude larger than the wages, the wages are not there. Then look at the trend on the payroll clearing account: a balance that only rises is the tell.

## 3. Depreciation That Ran Once and Stopped

At cutover somebody books an opening entry for accumulated depreciation, correct on the day it is entered. Then the monthly depreciation that should follow it never gets set up, and years pass.

Fixed assets sit at close to original cost. The depreciation expense account exists, has a name, and has never been used. If the opening balance was also slightly off from the prior system, that error is frozen in place alongside everything that failed to happen after it.

**How to check:** open the depreciation expense account and look for any activity at all. Then compare accumulated depreciation in NetSuite against your tax consultant's fixed asset schedule. Those two numbers diverging is the whole finding.

## 4. Accounting Periods That Were Never Closed

Closing a period is the step that makes a reported number final. In accounts where nobody owns the close calendar, it does not happen, and months stay open indefinitely.

The consequence is not theoretical. Any user with posting rights can write into any open period, including years that have been reported to a bank, a board or a tax authority. A number you gave someone in March can be different in October, and nothing will tell you it changed.

**How to check:** open the accounting period list and count how many periods since go-live are closed or locked. If the answer is none, every figure the company has ever reported from the system is still editable.

## Why These Survive So Long

None of the four throws an error. That is the common thread.

A system that rejects a bad entry teaches somebody immediately. These four produce entries NetSuite is perfectly happy to accept, because each one is legitimate in some other context. Coding a deposit to Accounts Receivable is a reasonable thing to do sometimes. The result is a set of books that balances, reconciles to the bank, and describes a business that does not exist.

The most consequential version is the first one, and it usually runs in the company's favour. When customer receipts never reach revenue, the income statement understates the business. Leadership makes decisions against a result that is worse than reality, sometimes for years, and one of those decisions is often whether to replace the system that produced it.

## Read Every Line, Not a Sample

A review like this traditionally means sampling. An experienced reviewer pulls a representative set of transactions, forms a view, and accepts that the unexamined remainder probably behaves like the examined part. That is a sensible trade when a person is doing the reading.

It is also how a problem confined to one transaction type goes unnoticed for four years. The sample misses it, the sample looks fine, and the conclusion is that the books are fine.

Querying the ledger directly removes the reason to sample. NetSuite's SuiteQL, through a read-only connection, will cover every posting line in an account for the same effort as covering forty of them, and it does not get tired at line nine hundred. Keep the queries and you can run the same checks again next quarter without repeating the work.

Read-only is the important part. The newer AI connector can create and update records when you grant it those permissions. For reviewing a set of books, you want an account that cannot write, so that afterwards you can say plainly that nothing was touched.

## The Fix Is Usually Not a New System

When books look this bad the instinct is to conclude that the implementation failed and start over. That conclusion is expensive and usually wrong.

Errors of this kind are corrected with documented journal entries prepared from reconciled support, alongside a redesign of the four processes that produced them: how receipts are recorded, how payroll posts, how depreciation runs, and how periods get closed. The chart of accounts is typically fine. The structure is typically fine.

A reimplementation adds licensing cost on top of consulting hours, and it does not remove the need to correct the prior years anyway, because those corrections are required for tax and audit regardless of which system you use next. Starting fresh means paying twice and still doing the hard part.

The first move comes before any of the corrections: stopping the process that caused them, because every month under the old method makes the correction larger.

<ConsultingCTA secondary-link="/netsuite-health-check" secondary-text="See the Health Check" message="If your numbers do not look right and nobody can say why, a structured review is the cheaper first move. The Health Check covers fifteen areas from read-only access and returns findings ranked by risk and effort, credited toward whatever the fix turns out to be." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
10/14/2026

<TagLinks />

Read Next - [How to Audit a NetSuite Account](/blog/netsuite-account-audit)
