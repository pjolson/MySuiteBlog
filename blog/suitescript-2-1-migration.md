---
title: "SuiteScript 2.1 Migration: The 2028.2 Deadline"
date: 2026-10-27
description: "SuiteScript 1.0, 2.0 and 2.x stop running in NetSuite 2028.2. Oracle's timeline, what actually breaks, and how to decide which scripts are worth converting."
tags: ["Admin", "SuiteScript", "Advisory"]
faqSchema: true
---

# SuiteScript 2.1 Migration: What the 2028.2 Deadline Actually Asks of You

[[toc]]

A banner has appeared in accounts that still run legacy scripts:

> Update Needed: Update Scripts to SuiteScript 2.1. One or more scripts in this account use SuiteScript 1.0, 2.0, or 2.x. Scripts using these versions will stop working in NetSuite 2028.2.

Most of the writing about this is aimed at whoever will do the converting. This is aimed at whoever has to decide what gets converted, which is a different and harder question. Some of those scripts should not be converted at all.

## Oracle's Timeline, in Oracle's Words

Verified against Oracle's 2026.2 release notes and the Transitioning To SuiteScript 2.1 guide in October 2026.

| Release | What changes |
|---|---|
| 2026.2 | SuiteScript 2.1 becomes the standard scripting model for new and existing scripts |
| 2027.1 | SuiteScript 1.0 enters end-of-life support, covering critical issues only. Other problems require converting first |
| 2028.1 | 1.0 scripts can no longer be deployed in new accounts, though they remain deployable in existing ones. **2.0 and 2.x scripts run as 2.1 by default** |
| 2028.2 | All scripts must use 2.1. Legacy versions no longer run |

Two notes on reading this. Oracle's release notes say legacy versions "will no longer run," while the transition guide hedges slightly with "expected to be removed." Plan against 2028.2 and re-check each release preview.

And **2028.1 is the date that reaches most accounts first**, not 2028.2. That is when your 2.0 and 2.x scripts begin executing on the 2.1 runtime whether or not anyone has touched them. If something is going to behave differently, that is when you find out.

For what it is worth, SuiteWorld 2026 came and went this week without mentioning any of it. The announcements were about AI. The release notes remain the authority.

## Why 2.0 Is Not Already Safe

A common assumption is that 2.0 scripts are fine and only 1.0 is the problem. Oracle is direct about this: every 2.0 and 2.x script must transition before 2028.2.

There is a trap in the version numbering worth knowing. **`@NApiVersion 2.x` means 2.0, not 2.1.** Oracle states it plainly, and it catches people who assume 2.x is a floating pointer at the newest minor version. A script annotated 2.x is a legacy script.

The work is different for each, though:

**1.0 is a rewrite.** Global `nlapi` and `nlobj` functions become N/ modules. Oracle documents a set of functions with no direct equivalent, including the date helpers, `nlapiEncrypt`, the recovery point and yield functions, and subrecord handling, which Oracle describes as "fundamentally different" in 2.1.

**2.0 is a test-and-fix.** The API is the same. What changes is runtime behavior, and that is where the risk hides.

## What Breaks Loudly, and What Breaks Quietly

Oracle documents fourteen behavior differences between 2.0 and 2.1. The useful way to sort them is by whether they announce themselves.

**The loud ones fail on upload or throw at runtime:** reserved words used as identifiers, `for each...in` loops, conditional catch blocks, strict mode rejecting undeclared variables, reassigning a const, `toSource`, and invalid JSON parsing. These are inconvenient. They are not dangerous, because you find them immediately.

**The quiet ones change values and say nothing.** Decimal numbers with trailing zeros. `parseInt` behavior. Date-to-local-string formats. How RESTlets handle POST strings and what type they return. Error objects losing their message under `JSON.stringify`.

That second list is the reason this is a business problem and not only a developer problem.

A RESTlet that starts returning an object where it used to return a string does not error in NetSuite. It errors somewhere downstream, in the system on the other end, possibly days later. A script that writes a date in a different format produces a report that is wrong rather than a report that fails. Nothing in your account turns red.

Ask what each script touches before asking how hard it is to convert. A script that writes to a custom field inside NetSuite carries a different risk than one handing an invoice to a payment processor, even when the conversion effort is identical.

## The Decision Nobody Else Will Make for You

Here is the part most migration guides skip. Converting is one of four options, and it is not automatically the right one.

Oracle says so itself. Its guidance is to decide whether to update a script to 2.1, test its compatibility, or **retire it if it is inactive, obsolete, or duplicated**. Elsewhere it says obsolete scripts "should be evaluated for retirement instead of migration."

Four dispositions, one per script:

**Retire.** The script is dead, duplicated, or supports a process nobody runs any more. This is the only option that makes the total smaller rather than moving it. It is also the only one that requires knowing what the business actually does, which is why it gets skipped.

**Replace with native functionality.** Plenty of old scripts set a field, validate an entry, or route an approval because NetSuite could not do it natively in 2016. Some of that is now configuration. The replacement still has to be built and tested before the script comes out, so this is not free, but it removes code permanently.

**Convert.** The script earns its place. Band it by complexity and schedule it.

**Escalate to the vendor.** Not your code, not your decision.

Each one needs a named business owner who can say what the script is supposed to do. Not what it does, which you can read from the code. What it is *for*. In accounts where the original developer left years ago, that conversation is the entire project, and no tool produces it.

One caution on retirement: some scripts encode deliberate controls that look redundant until an auditor asks about them. Retiring a script is a business decision with audit consequences, so the decision log is itself a deliverable.

## Not All of It Is Your Code

Before anyone scopes a conversion, split the inventory by who owns it.

Managed bundle code is updated by its publisher, so the useful action is a written question to each one asking which release ships their 2.1 version. Unmanaged bundles and abandoned SuiteApps are murkier, and that code may quietly have become your problem. Locked scripts left behind by a removed bundle turn up more often than people expect.

Two exceptions are worth flagging because Oracle has not resolved them. As of October 2026, Oracle states that 2.1 client scripts are not supported in the Scriptable Cart, and that the SuiteTax Engine requires 2.0 for full functionality. No published date reconciles those with 2028.2. If either applies to you, track it in every release preview rather than assuming it will be handled.

Integration authentication is a separate deadline running on its own clock, and it can undo your work. Oracle is retiring Token-based Authentication for new integrations in 2027.1, with existing integrations ending tentatively in 2028.2, and support for user credentials on RESTlets ends in 2027.1. A RESTlet you convert perfectly can still fail because the thing calling it can no longer authenticate.

## Building the Inventory, and What It Will Not Tell You

Oracle documents several ways to find legacy scripts: filtering by API Version under Customization, a saved search excluding version 2.1, and a SuiteAnalytics workbook grouped by version. SuiteQL joins the script, deployment and file tables if you want deployment contexts and file dates in one place.

Capture both **API Version and Execute As Version**. A 2.x script reports its API version as 2.0, and the two fields answer different questions.

The limit worth understanding is that **no native view tells you a script is dead.**

Execution logs are the obvious proxy, and they are weaker evidence than they look. Oracle notes the Script Execution Log page covers roughly thirty days and that log persistence is not guaranteed. Many scripts never log anything. And a thirty-day window straddling November will miss every quarter-end and year-end job you have.

Absence of logs is a question, not an answer. Proving a script is unused means combining deployment status, execution evidence, the close calendar, and a conversation with whoever owns the process. That last part is judgment, not output.

## Can AI Convert Them?

Partly, and Oracle ships a tool for it. The SuiteScript Upgrade agent skill analyzes, converts, explains and validates, covering a documented set of API mappings and object conversions.

Read Oracle's own caveat before relying on it. Validation is "a static migration check, not a substitute for functional testing," and Oracle warns not to change production behavior solely because a conversion completed without errors.

That caveat maps precisely onto the quiet failures above. A conversion that compiles cleanly can still change what a number rounds to or what shape a payload takes. The tool is a real accelerator for the mechanical half. It has no opinion about whether the script should exist.

## Who Should Own This

The conversion work belongs to whoever writes your scripts, in-house or your partner. That part is well understood and there is no shortage of people who can do it.

The decisions do not belong there. Which scripts are dead, which encode a control somebody still relies on, which could be replaced with native functionality, and which have to survive untouched because finance depends on them in week one of the close: those are business answers, and the people who can give them are the ones running the processes.

Left alone, the default is to convert everything, because converting everything is the answer that requires no decisions. It is also the most expensive answer available, and it carries forward every piece of code nobody has needed since 2019.

You have until 2028.2. You have until 2028.1 before your 2.0 scripts start behaving differently on their own. The inventory is a weekend. The decisions take longer, and they are the part worth starting now.

## Frequently Asked Questions

### When does SuiteScript 1.0 stop working?

In NetSuite 2028.2. Oracle states that all new and existing scripts must use SuiteScript 2.1 by that release and that legacy versions will no longer run. Support narrows earlier than that: from 2027.1, SuiteScript 1.0 enters end-of-life support covering critical issues only.

### Does SuiteScript 2.0 have to be converted too?

Yes, on the same deadline. Oracle instructs customers to transition all existing SuiteScript 2.0 and 2.x scripts before the 2028.2 release. The assumption that only 1.0 is affected is the most common misreading of this timeline.

### Does the annotation 2.x mean 2.1?

No. Oracle states that the 2.x value indicates a script uses SuiteScript 2.0, not 2.1. A script annotated 2.x is a legacy script and is covered by the same deadline.

### Is changing the annotation to 2.1 enough?

Not without testing. Oracle documents fourteen behavior differences between the versions, and several change values rather than raising errors, including decimal handling, date formats, parseInt behavior and what a RESTlet returns. Those surface downstream rather than in NetSuite.

### Can AI convert our scripts?

Partly. Oracle provides a SuiteScript Upgrade agent skill that analyzes, converts and validates. Oracle also states that its validation is a static migration check rather than a substitute for functional testing, and warns against changing production behavior solely because a conversion completed without errors.

### What about scripts that came from bundles or SuiteApps?

Managed bundle code belongs to whoever published it, so ask each publisher in writing which release ships their 2.1 version. Unmanaged bundles and abandoned SuiteApps are less clear, and that code may effectively have become yours to maintain.

### Should every legacy script be converted?

No. Oracle recommends retiring scripts that are inactive, obsolete or duplicated rather than migrating them, and some older scripts can be replaced by native functionality that did not exist when they were written. Converting everything is the default when nobody makes a decision, and it is the most expensive option.

### Are there any exceptions to the deadline?

Two are open as of October 2026. Oracle states that SuiteScript 2.1 client scripts are not supported in the Scriptable Cart, and that the SuiteTax Engine requires SuiteScript 2.0 for full functionality. No published date reconciles either with 2028.2, so both are worth tracking in each release preview.

<ConsultingCTA secondary-link="/about/#ongoing-support" secondary-text="See Fractional Administration" message="The hard part of this deadline is not the converting. It is deciding which scripts are dead, which encode a control somebody still depends on, and which could be replaced outright. That is the work I do alongside whoever writes the code." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
10/27/2026

<TagLinks />

Read Next - [How to Audit a NetSuite Account](/blog/netsuite-account-audit)
