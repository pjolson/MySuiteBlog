---
title: "SuiteAnalytics Workbook: A Practitioner's Guide for NetSuite Admins"
date: 2026-05-22
description: "What NetSuite admins and consultants need to know about SuiteAnalytics Workbook in 2026, including datasets, pivots, formula fields, data refresh, and common gotchas."
tags: ["Admin", "SuiteAnalytics", "Reports"]
---

# SuiteAnalytics Workbook: A Practitioner's Guide for NetSuite Admins

[[toc]]

## Workbook in 2026 Is Not the Workbook You Remember

The original version of this post went up in January 2019, back when SuiteAnalytics Workbook was still in beta. A lot has changed. Workbook went GA in 2019.1, the dataset/workbook split landed in 2020.1, and Oracle has kept shipping updates through 2026.1.

If you kicked the tires during beta and walked away unimpressed, give it another look. The tool is genuinely useful now, and it covers ground that [saved searches](/blog/searchanatomy1) have never handled well.

One thing worth noting upfront: Workbook is enabled by default in all accounts now. No feature flag to flip. If your users have the right permissions, they already have access. The Analytics portlet shows up in the navigation bar for any role with the SuiteAnalytics Workbook permission.

## Datasets and Workbooks: The Split That Matters

The biggest change since beta is that datasets and workbooks are now separate objects. Oracle split them in 2020.1, and it changes how you should approach building reports.

A **dataset** defines your data: record types, joins, fields, criteria, and formulas. Think of it as a reusable data definition. Datasets can include fields from multiple record types connected through joins, and you can apply criteria to filter which records come through.

A **workbook** consumes a dataset and presents it through visualizations: table views, pivot tables, and charts. One dataset can feed multiple workbooks. A single workbook can also pull from multiple datasets through dataset linking.

Why does the split matter in practice? Before building a new workbook, the first question should be "does a dataset already exist that gives me what I need?" Reusing datasets avoids duplicate logic, keeps things consistent, and cuts down on maintenance.

The general workflow:

1. **Create or select a dataset** with the records, joins, fields, and criteria you need
2. **Create a workbook** that references that dataset
3. **Add visualizations** (table views, pivots, charts) inside the workbook

When you click New Workbook from the Analytics portlet, NetSuite walks you through creating a dataset as the first step. You can also create standalone datasets and attach them to workbooks later.

## The Analytics Data Source

SuiteAnalytics Workbook runs on the analytics data source, which is different from what saved searches use. Field names, record type names, and available joins do not always line up between the two.

Do not try to recreate a saved search in workbook by matching fields one-to-one. You will waste time chasing mismatches. Instead, explore what is available in the dataset editor and build from there.

NetSuite provides a Records Catalog that documents available record types and fields. You can use the Records Catalog to check field types and understand what is available in the analytics data source. Bookmark it.

## Building a Dataset

### Record Types and Joins

Every dataset starts with a root record type. From there, you add joins to pull in related records. The dataset editor shows available joins for your root record in the left panel.

Joins in workbook datasets are left outer joins. That means every record from the left (parent) table appears in the results, whether or not a matching record exists on the right (joined) side. If no match exists, the joined fields come back empty.

Be careful with one-to-many joins. Adding a join to a child record type duplicates your parent rows. Join Transactions to Transaction Lines and each transaction appears once per line item. Stack another one-to-many join on top of that and the row count multiplies again. SQL developers expect this behavior, but it catches people who are used to saved search summary reports abstracting it away. If your totals look inflated, check your joins first.

Before adding a join, ask whether you actually need fields from that related record, or whether criteria on the root record would get you there. Unnecessary joins slow things down and make the output harder to read.

### Fields and Criteria

Adding fields is drag-and-drop. Select from any of your joined record types in the left panel and drag them into the field list. Reordering and removing fields works the same way.

Criteria support AND/OR logic with parenthetical groupings for complex filters. The criteria editor lets you define conditions on any field in your dataset, including fields from joined record types.

The live preview is probably the single biggest quality-of-life improvement over saved searches. Every criteria change shows results immediately in the dataset preview. No save-and-rerun cycle. For anyone who has burned time clicking edit, tweaking one filter, saving, scrolling down to check results, and repeating, that alone makes workbook worth learning.

## Visualizations: Table Views, Pivots, and Charts

A single workbook can hold multiple table views, pivots, and charts. Each visualization draws from the underlying dataset but gets configured independently.

### Table Views

The table view is the simplest visualization: a flat grid of your dataset results with sorting and column reordering. You can apply conditional formatting to [highlight cells](/blog/post2) based on value thresholds, which is handy for flagging overdue items, negative amounts, or specific statuses.

One limitation to know: conditional formatting only works on NUMBER and STRING field types. DATE fields do not support it.

Start with a table view when building a new workbook. Get the data right in a flat view first, then layer pivots and charts on top.

### Pivot Tables

Pivots are where workbook genuinely pulls ahead of saved searches. Drag fields into rows, columns, and measures to build cross-tabulated summaries.

A few things worth knowing:

- You can have **multiple pivots per workbook**, each slicing the same data differently.
- **Pivot-level criteria** let you narrow a pivot without touching the underlying dataset. Useful when one dataset serves several pivots with different scopes.
- **Calculated measures** (ratios, percentages, running totals) are defined in the pivot editor and operate on already-aggregated data. More on these below.
- **Drill-down** into any pivot cell to see the underlying records behind the number.

### Charts

Charts support seven types: Column, Bar, Area, Line, Stacked Column, Stacked Bar, and Stacked Area. Like pivots, you can build multiple charts per workbook with independent configurations.

Charts are built from a pivot table's data. You select which pivot to base the chart on, then configure the chart type and formatting. When the pivot data changes, the chart updates to match.

The real value of charts shows up on dashboards. Build a chart in a workbook, publish it as a portlet, and users see it on their dashboard without ever opening the workbook. Clean separation between the person building the report and the people consuming it.

## Formula Fields and Calculated Measures

These are two different things that serve different purposes, and mixing them up causes confusion.

**Formula fields** live in the dataset. They operate row by row on the underlying data, similar to adding a computed column. The syntax looks like [saved search formulas](/blog/stringmatch), but it is not identical. Functions and field references follow the analytics data source conventions, so do not assume a formula that worked in a saved search will paste over cleanly.

The formula editor includes a Validate button that checks your expression before you save. Use it. Error feedback for invalid formulas is not detailed, so building formulas one piece at a time saves frustration. Start with a simple expression, confirm it validates, then add complexity. Writing a long CASE WHEN in one shot and trying to debug a generic error is a painful exercise.

**Calculated measures** live in the pivot editor, not the dataset. They operate on already-aggregated data within the pivot. A common use: dividing one measure by another to get a percentage. The calculated measure editor shows a validation message at the bottom indicating whether your definition is valid. Calculated measures only appear in pivots and charts, never in table views or the dataset itself.

## Data Refresh: How Caching Works

Not all workbook visualizations behave the same way when it comes to data freshness.

**Datasets and table views** query data in real time by default. When you open a dataset or a table view in a workbook, you see current data from your NetSuite account.

**Pivots and charts** are different. After 60 minutes of inactivity, pivots and charts serve cached results. When you come back to a workbook after a break, the pivot might be showing stale data. Hit the refresh button to pull a fresh query.

There is also an optional feature called **Cached Data in Datasets** that changes how datasets themselves handle data. When enabled, datasets offer two modes:

- **Real-time Response** queries live data every time. This is slower for large datasets but always current.
- **Cached Response** serves pre-cached data, which loads faster but may not reflect the latest changes.

One gotcha with cached response mode: CLOB fields (long text, rich text, and other large text fields) do not return values in cached mode. If you need CLOB data, use real-time response mode.

When a workbook shows unexpected numbers, "when was this data last refreshed?" should be the first troubleshooting question.

## Sharing, Permissions, and Dashboard Portlets

Workbooks and datasets are private to the creator by default. Sharing them with specific roles or users happens through the audience settings on each object.

Two permissions govern access:

- **SuiteAnalytics Workbook** on the role grants access to the Analytics portlet and the ability to create, view, and edit workbooks and datasets.
- **Analytics Administrator** is the broader permission for managing shared workbooks and datasets owned by other users.

A pattern that works well: an analyst builds and maintains datasets and workbooks, then publishes specific visualizations as dashboard portlets for end users. The end users see a chart, pivot, or table view on their dashboard and never need to open the workbook or understand how the data is structured.

You can publish table views, pivot tables, and charts as Analytics portlets. Each user can have up to 10 Analytics portlets on their dashboard. Build workbooks for your analysts. Publish portlets for everyone else.

## Dataset Linking

Dataset linking connects two datasets on a shared key field, working like a join but across independent datasets. It solves the problem of record types that cannot be joined within a single dataset.

Say you have one dataset of sales orders and another of support cases. Both include a customer field. Link them on that field and you get a combined view while each dataset keeps its own record type, joins, and criteria.

An important limitation: linked datasets only work in pivot tables and charts. Table views do not support dataset linking. If you need a flat row-level view of data from two record types, you need to get them into a single dataset through joins.

Use dataset linking sparingly. Performance takes a hit as linked datasets grow, and the logic gets harder to troubleshoot. If you can pull the data into a single dataset with joins, that path is almost always cleaner.

## SuiteQL and Workbook

SuiteQL and Workbook share the same underlying analytics data source but serve different audiences. Workbook is the visual, no-code path. SuiteQL is the programmatic option, accessed through SuiteScript, REST APIs, or the SuiteQL query tool in NetSuite.

If you are comfortable writing SQL, SuiteQL can handle queries that would be difficult or impossible to express in the workbook UI. If you are building reports for users who will never write a query, workbook is the right choice.

Learning one helps with the other. Record types, field names, and join paths in the analytics data source are the same regardless of how you access them.

## Templates

NetSuite ships predefined dataset and workbook templates for common scenarios: financial summaries, sales pipelines, inventory reports, and others. Over 20 templates are available from the New Workbook and New Dataset dialogs.

Templates require the **Analytics Administrator** permission by default, so not every user will see them. If your team wants to use templates, make sure the right roles have access.

Check templates before building from scratch. Even when a template does not match your exact needs, it provides a starting point with relevant record types, joins, and fields already wired up. Templates are also a solid way to learn how NetSuite expects datasets to be structured for different use cases.

## Limitations and Gotchas

**Row duplication from one-to-many joins** is the most common source of confusion. Inflated totals almost always trace back to joins. Already covered above, but it bears repeating because it comes up constantly.

**Conditional formatting is limited to NUMBER and STRING fields.** If you want to color-code cells based on a date, you are out of luck. DATE fields are not supported for conditional formatting.

**Ad blockers and browser extensions** can break the workbook editor in subtle ways. If the UI behaves strangely, disable extensions and reload before troubleshooting anything else.

**Formula error feedback is vague.** The Validate button will tell you something is wrong, but the message does not always pinpoint the issue. Build incrementally and validate after each change.

**Large datasets get slow.** Too many joins or too many rows will drag performance down. Tighten your criteria and cut unnecessary joins before blaming the platform.

**CLOB fields do not work in cached response mode.** Long text and rich text fields return empty values when using cached data. Switch to real-time response mode if you need them.

**There is no scheduled export.** Saved searches can email results or export files on a schedule. Workbooks cannot. If you need automated delivery, saved search is still the tool for that job.

**Saved search is not going away.** Workbook does not replace it. Scheduled exports, SuiteFlow conditions, SuiteScript lookups, mass updates, and plenty of other workflows still run on saved searches. If you are new to saved searches, start with the [anatomy of a saved search](/blog/searchanatomy1) series. Workbook is an additional reporting tool, not a successor.

## Wrapping Up

SuiteAnalytics Workbook has grown into a capable reporting tool. The dataset/workbook model, live preview, pivot tables, and dashboard portlets give admins and analysts options that saved searches alone cannot match.

There is a learning curve, especially around the analytics data source and formula syntax. But for teams that put in the time, workbook tends to become the go-to for anything interactive or visual.

<ConsultingCTA message="We help teams build reporting strategies that make the most of SuiteAnalytics Workbook, saved searches, and SuiteQL. If your team is struggling with NetSuite reporting, let's talk." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
05/22/2026

<TagLinks />
