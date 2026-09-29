---
title: "How to Audit a NetSuite Account"
date: 2026-09-29
description: "The seven areas a real NetSuite review covers: access and SoD, periods, configuration drift, automation health, reporting, spend, and customization debt. With the checks for each."
tags: ["Admin", "Advisory"]
faqSchema: true
---

# How to Audit a NetSuite Account

[[toc]]


## Why Accounts Get Audited

Almost nobody audits a NetSuite account on a schedule. It happens because something forces the question. A new controller inherits the system and wants to know what she just signed for. An external auditor asks who can approve vendor payments and the room goes silent. An implementation partner rolls off and someone finally wonders what three years of changes have added up to.

Whatever the trigger, the work is the same: a structured pass through the account, looking for the gaps between how the system is configured and how everyone assumes it is configured. That distance is where audit findings, fraud exposure, and month-end surprises live.

This is the review we run for clients, laid out so you can run it yourself. You will need an administrator login, a spreadsheet, and a tolerance for what you find.

## Before You Start

Two ground rules. First, this is a read-only exercise. Resist fixing things as you go, because every fix mid-review destroys the picture you are trying to take. Write it down and move on.

Second, capture every finding the same way: what you found, the risk if it stays, and the effort to fix it. Risk and effort are the two columns that turn a list of complaints into a plan. A dormant admin account is high risk and five minutes of effort. Rebuilding a broken revenue report is high risk and a week. You want to see those differences at a glance when you are done.

## 1. Who Can Do What

Start with access, because it is where the expensive findings hide.

Count the people holding the Administrator role, then ask how many need it. In most accounts we review, the answer is fewer than half. Look for admin access granted during the implementation and never revoked, including accounts belonging to the partner.

Pull the list of active users against the current employee roster. Terminated employees with working logins are a finding every external auditor checks for, and NetSuite does not deactivate anyone for you.

Then look for role combinations that let one person carry a transaction from creation to approval: enter a vendor bill and approve it, create a journal and post it, add a vendor and pay a vendor. These are segregation-of-duties conflicts, and we wrote a [separate guide to finding them](/blog/netsuite-segregation-of-duties) because the native tools only take you partway.

Finish with the mechanical checks: MFA enforcement across roles, integration tokens that have outlived the person who created them, and standard roles handed out where a restricted custom role was the right answer.

## 2. Accounting Periods

Open the period list and count how far back the open periods go. Every open period is a window where a backdated transaction can change financial statements someone already published. Then check who holds permission to post into closed periods, because a locked period with a dozen override holders is not locked.

This one takes fifteen minutes and shows up in nearly every review we run. It is also the finding an external auditor reaches first, so finding it yourself is worth the fifteen minutes.

## 3. Configuration Drift

The account you went live with is not the account you have. The question is whether anyone can say what changed.

System Notes on your accounting preferences will show you edits nobody remembers making. Count the custom transaction forms per record type and work out which are in use, because form sprawl is how the same sales order gets entered three different ways. Scan the custom field list for fields nothing has populated in a year; each one is a decision someone made and abandoned, and users still tab past them every day.

None of this is dramatic on its own. In aggregate it is why the system feels slower and stranger every year, and why new employees take longer to train than they should.

## 4. Automation Health

Open the script execution log, filter to errors, and look at the last thirty days. In a surprising number of accounts, this is the first time anyone has done so. Scheduled scripts fail without telling users. Workflow instances hit error states and sit there. The automation keeps its problems to itself unless someone goes looking.

Do the same for integrations: when each one last ran successfully, whether an error queue is accumulating, and whether the integration still runs under the credentials of someone who left. A connector that has been silently retrying for six weeks is not a hypothetical. We find one most months.

## 5. Reporting You Can Trust

You do not audit reports by rereading them. You audit them by asking the people who consume them. The tell is spreadsheets: every workbook maintained outside NetSuite to "fix" a number the system produces is a report that lost the confidence of its audience. Inventory those workbooks and you have your reporting findings.

Where a saved search and a financial statement disagree, [the causes are usually definable](/blog/netsuite-saved-search-gl-mismatch), and each one you resolve retires a spreadsheet. The goal of this section of the review is a short list of numbers the business needs, does not trust, and could.

## 6. What You Pay For and Do Not Use

Pull login history against your license count. Seats provisioned for people who never sign in are the easy line item. Subtler is the full user license doing work an Employee Center license covers, and the module somebody bought in year one that was never configured. Renewal conversations go differently when you arrive with this list.

## 7. Customization Debt

Finally, the hardest section to see from inside: the scripts and workflows the business now depends on. For each one, two questions. Does anyone know what it does, and would anything break if its author stopped answering messages? Undocumented automation written by one person is the deepest risk in the account, because it fails exactly when that person is unavailable. Note anything still running on SuiteScript 1.0 while you are in there, since that migration gets harder the longer it waits.

## Reading What You Found

Sort the spreadsheet by risk, then by effort within risk. The top of the list is almost always quick: deactivate the departed users, strip the surplus admin roles, close the old periods. A morning of work that materially reduces exposure. Below that sits the real backlog, the reporting rebuilds and role redesigns and script documentation, which is not a morning and is where most self-run audits quietly stop.

## Doing This Yourself Versus Buying It

Everything above is genuinely doable in house. A capable administrator can complete the first pass in a day or two, and if that is you, this page is yours to use.

The version we sell is the [NetSuite Health Check](/netsuite-health-check): fifteen areas across access controls, system health, and data governance, a findings report ranked by severity with a fix-first roadmap, delivered within 24 hours from read-only access, for $2,500 credited toward whatever comes next. The [sample report](/health-check-sample.pdf) shows the exact shape of what you get. The honest difference is not secret knowledge. It is that we have run this list against enough accounts to know what normal looks like, and it costs your team no days during a quarter when they did not have days to spare.

## Frequently Asked Questions

### What should a NetSuite audit include?

Access and segregation of duties, accounting period discipline, configuration changes since go-live, script and integration health, reporting the business trusts, license and module utilization, and the customization the account depends on. Each finding should carry a risk level and an effort estimate so the results become a plan rather than a list.

### How do I find segregation of duties conflicts in NetSuite?

Review role permissions for combinations that let one person create and approve the same transaction type, such as entering and approving vendor bills. NetSuite does not flag these natively, so the review means reading role permission levels side by side or using a tool built for the comparison.

### How often should a NetSuite account be reviewed?

Once a year is a reasonable rhythm for a stable account, and immediately after major events: an implementation partner rolling off, a controller or administrator change, an acquisition, or an audit finding. Access reviews deserve a faster cycle than the full audit, quarterly in most organizations.

### How long does a NetSuite system review take?

A capable administrator can complete a first pass of the areas in this guide in one to two focused days. The remediation behind the findings is the larger effort and depends on what turns up, which is why findings should be ranked by risk and effort before any fixing starts.

### Do I need an outside firm to audit NetSuite?

No. The checks in this guide are runnable in house with administrator access. An outside review adds speed, a benchmark for what normal looks like across many accounts, and independence, which matters when the findings concern access that current staff granted themselves.

<ConsultingCTA secondary-link="/netsuite-health-check" secondary-text="See the Health Check" message="If you would rather have this done for you, the Health Check covers fifteen areas from read-only access and returns a severity-ranked findings report within 24 hours, credited toward whatever comes next." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
9/29/2026

<TagLinks />

Read Next - [Segregation of Duties in NetSuite](/blog/netsuite-segregation-of-duties)
