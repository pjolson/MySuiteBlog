---
title: "Data Migration Is a Discipline, Not a Weekend Task"
date: 2026-05-25
description: "NetSuite data migration gets treated as the last step before go-live. It should be one of the first. Here is what internal teams need to own and what goes wrong when they don't."
tags: ["Admin", "Implementation", "Advisory", "DataMigration"]
---

# Data Migration Is a Discipline, Not a Weekend Task

[[toc]]


## The Partner Gives You Templates. The Data Is Yours.

Your implementation partner will hand you CSV templates for every record type that needs to migrate: customers, vendors, items, chart of accounts, open transactions, journal entries. They will explain the required fields and the formatting rules.

Then they will wait for you to fill them in.

That is the part most internal teams do not see coming. Data migration shows up in the project plan. It has a line item in the [SOW](/blog/netsuite-sow-before-you-sign). The partner mentions it in kickoff. And then nobody thinks about it seriously until eight weeks before go-live, when your team is deep in UAT, training is starting, and someone asks "where are we on data?" The answer is a half-populated spreadsheet and a vague plan to "load it over the weekend."

That is how companies end up with opening balances that don't match, duplicate vendor records, and a finance team spending their first month in NetSuite reconciling numbers that should have been right on day one. It is one of the reasons [the post-go-live cliff](/blog/post-go-live-cliff) hits so hard.

Extraction, cleansing, deduplication, field mapping, and validation are your team's work. The partner is not going to log into your old system, pull the data, clean it up, and hand it back to you ready to import. That is not what the SOW says, and it is not how the economics work. Some SOWs are explicit about this. Others are vague enough that the assumption gap does not surface until your team is already behind schedule.

Before the project kicks off, read the data migration section of your SOW and answer one question: who does the actual work of preparing the data? This is the kind of gap I wrote about in [what to look for in your NetSuite SOW](/blog/netsuite-sow-before-you-sign). If the answer is "us" and you have not allocated time for it, you have a scheduling problem that will show up at the worst possible moment.

## What Gets Migrated and What Gets Left Behind

Not everything in your old system needs to come over. This is one of the first decisions the project team should make, and it gets skipped more often than it should.

There are three general approaches:

**Summary balances only.** You bring over a trial balance as of the cutover date, open AR and AP, and active master records (customers, vendors, items). All historical transaction detail stays in the old system. This is the fastest and lowest-risk path. Most companies that are moving from QuickBooks or a small legacy ERP land here.

**Open transactions plus summary history.** Same as above, but you also migrate open sales orders, open purchase orders, and other in-flight documents that need to be fulfilled in NetSuite. You might load one or two years of transaction detail for reporting, with everything older summarized into journal entries.

**Full transaction history.** Every invoice, bill, payment, and journal entry comes over. This preserves the ability to run historical reports natively in NetSuite, but it is expensive, slow, and technically complex. Most companies do not need this unless auditors or regulatory requirements demand it.

Paul Giese at OptimalData Consulting has built a practice around that third option, specifically for biotech companies migrating from QuickBooks. His team loads detailed transactions and provides audit documentation packages that satisfy the kind of scrutiny public and pre-IPO companies face. That level of migration is real work, and the fact that a firm exists to specialize in just this piece tells you how much complexity lives here.

For most mid-market implementations, the first or second approach is the right call. Talk to your auditors early. Ask them what they need to see in the new system versus what they are comfortable pulling from the legacy system. That conversation alone can cut your migration scope in half.

## Import Order Is Not Optional

NetSuite's CSV Import Assistant processes one record type at a time. Records have dependencies. If you try to import a vendor bill before the vendor exists in NetSuite, the import fails. If you load a sales order that references an item that has not been created yet, it fails.

The correct sequence looks roughly like this:

1. **Chart of Accounts** (and subsidiaries, if OneWorld)
2. **Customers, Vendors, Employees**
3. **Items** (inventory, service, non-inventory, assemblies)
4. **Open transactions** (invoices, bills, sales orders, purchase orders)
5. **Opening balances** (trial balance journal entries as of the cutover date)

Each layer depends on the one before it. Customers and vendors reference accounts. Items reference accounts and sometimes vendors. Transactions reference all of the above. Getting this wrong does not produce subtle errors. It produces hard failures that stop the import cold.

Your partner should provide the sequencing plan. If they do not, ask for one. If someone on your team is managing the imports directly, write the sequence down and follow it.

## External IDs Save You Twice

When you load records into NetSuite via CSV, the system assigns each record an internal ID. That internal ID is NetSuite's primary key. But you should also populate the External ID field with whatever unique identifier your old system used: customer number, vendor code, item SKU, account number.

This matters in two places. First, during the migration itself. If a load fails halfway through and you need to rerun it, the External ID lets the Import Assistant match existing records instead of creating duplicates. Without it, you are manually hunting down and deleting partial loads before trying again.

Second, after go-live. If you have integrations that pass records between NetSuite and another system, the External ID is how those systems identify records. If your ERP sends a customer update to NetSuite and there is no External ID to match on, you end up with duplicate records or failed syncs.

One important caveat from practitioners who have learned this the hard way: if you already have integrations running that use External IDs (a CRM sync, an e-commerce connector), do not overwrite those IDs during migration. Use a custom field to store your legacy system's identifier instead. External ID conflicts between migration data and live integrations are a painful problem to untangle.

## The Dry Run Is Not Optional Either

A dry run is a full rehearsal of the migration, executed in a sandbox environment, with real data, timed from start to finish.

It is the single most important step in the migration process, and it is the one most likely to get compressed or skipped when the project falls behind schedule. The logic is always the same: "we've already done a few test loads, we know the templates work, let's just go live." That logic is wrong.

The dry run tells you things that test loads cannot:

**How long the full migration actually takes.** If your cutover window is Friday evening to Monday morning and the full load takes 14 hours, you need to know that before the real weekend. If it takes 30 hours, you need a different plan.

**What breaks when everything runs together.** Individual record type imports might succeed in isolation but produce errors when loaded in sequence. A customer import might work fine, but the open invoice import that follows it might fail because the payment terms on three customers do not match what the invoice template expects.

**Whether your reconciliation process works.** After the dry run, your finance team should run a trial balance in the sandbox and compare it to the legacy system. If those numbers do not match, you have found the problem with time to fix it. If you skip the dry run, you find the problem on Monday morning with real transactions already flowing.

Run at least one full dry run. Two is better. Time it. Document every error. Fix the source data and the templates, not just the symptoms. The partner should be involved in reviewing results, but your team should be driving it.

## The Checkbox That Sends 5,000 Emails

This is a specific technical gotcha that comes up in nearly every migration and deserves its own section.

NetSuite's CSV Import Assistant has an option called "Run Server SuiteScript and Trigger Workflows." When this box is checked, every record you import fires any SuiteScript triggers and workflow initiations that would normally run when that record is created or updated through the UI.

If your account has a workflow that sends a welcome email when a new customer record is created, and you import 5,000 historical customers with this box checked, every one of those customers gets a welcome email. If you have a script that creates a follow-up task when a vendor bill is entered, you get 5,000 tasks.

For migration imports, this box should almost always be unchecked. The exception is when you specifically need a script or workflow to process the imported records, and in that case you should test it in the sandbox first.

Your partner should know this. But if your team is running imports directly, it is easy to miss. Check the import settings on every load.

## Hard Cutover vs. Soft Cutover

The cutover approach determines when you stop using the old system and start using NetSuite exclusively.

A **hard cutover** means you pick a date, close out the old system, and go live in NetSuite the next business day. All data migration happens during the cutover window (usually a weekend). Everything from that point forward goes into NetSuite. The old system becomes read-only.

A **soft cutover** means you run both systems in parallel for a period. New transactions might go into NetSuite while the old system stays open for month-end close, historical lookups, or specific functions that are not ready to move yet. Migration happens in phases rather than all at once.

Hard cutovers are cleaner. There is one system, one source of truth, and no ambiguity about where a transaction should be entered. The risk is that if something goes wrong during the cutover weekend, you are scrambling.

Soft cutovers reduce that risk but create a different one: dual data entry, confusion about which system is authoritative, and a migration process that stretches out over weeks. Your team has to know which transactions go where. That sounds simple until an AP clerk is halfway through entering a batch of bills and cannot remember whether this vendor has been migrated yet.

Most implementations end up with a hard cutover for good reason. It forces the discipline of getting migration right the first time. I would push for hard cutover in most situations. The pain of running two systems in parallel is worse than the pain of a tight cutover weekend, and a soft cutover gives everyone an excuse to delay decisions that need to be made. The only time I would consider a soft cutover is when the auditors specifically require it or when the legacy system handles a function that genuinely is not ready in NetSuite yet.

Whichever approach you choose, make sure your team, your partner, and your auditors all agree on it before you get within a month of go-live.

## Reconcile to the Penny

After the migration loads are complete and before you open NetSuite to users, run a trial balance in NetSuite and compare it to the closing trial balance in your old system. Every GL account should match. Not "close enough." Not "within a reasonable variance." To the penny.

If AP in the old system shows $482,316.44 and NetSuite shows $482,290.44, you have a $26 difference that is going to haunt your first month-end close. Finding it on cutover weekend takes an hour. Finding it three weeks later, after transactions have been flowing in both systems, takes days.

The same applies to AR aging, AP aging, and inventory quantities if you migrated inventory. Run the reports side by side. Document the comparison. Have someone from finance sign off on it.

This is the validation step that separates a clean go-live from a messy one. It is not exciting work. Nobody wants to spend their Saturday comparing trial balances. But the teams that do it go into Monday with confidence, and the teams that skip it spend their first month explaining why the numbers don't match.

## After Go-Live, Lock the Legacy System

Once you are live in NetSuite and the reconciliation checks out, make the old system read-only. Do not leave it open for edits. If someone needs to look up a historical record, they can search for it. But no new transactions should go into the old system after cutover.

This sounds obvious, but it breaks down in practice. Someone in AP has a batch of bills they "already started" in the old system. A salesperson enters an order in the old CRM because that is what they know. An accountant posts a journal entry to correct something in the prior period.

Every one of those entries creates a reconciliation problem. The old system's balances no longer match what was migrated. Now you have two systems that are both slightly wrong.

Lock it down. Communicate the cutover date clearly. If someone needs an exception, make them ask for it in writing. Keep the old system accessible for read-only reference for at least a year, and then archive it.

## Start This Conversation in Week One

The biggest mistake with data migration is treating it as a go-live task. It is a project-long workstream that starts with scope decisions and ends with post-cutover reconciliation.

If your implementation just kicked off, put these items on the agenda now:

- What data is in scope for migration?
- Who on the internal team owns data preparation? (This is part of why [having an internal NetSuite resource](/blog/netsuite-implementation-resource) matters.)
- When is the first dry run scheduled?
- Has someone talked to the auditors about what they need?

If your implementation is already underway and nobody has answered those questions, that conversation is overdue. The answers will not get easier as go-live gets closer.


<ConsultingCTA message="Data migration planning is one of the first things I look at when advising on a NetSuite implementation. If your team is staring down a migration and not sure where to start, let's talk." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
5/25/2026

<TagLinks />
