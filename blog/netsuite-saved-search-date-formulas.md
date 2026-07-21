---
title: "NetSuite Saved Search Date Formulas: Days Between, Aging, and Grouping by Month"
date: 2026-07-21
description: "Working with dates in NetSuite saved search formulas: days between dates, aging buckets, and grouping by month or year, without DATEDIFF."
tags: ["Formulas", "SavedSearch", "SuiteAnalytics", "CaseWhen"]
faqSchema: true
---

# NetSuite Saved Search Date Formulas

[[toc]]

Most of the date-formula questions I get come from the same place. Someone needs the number of days a bill has been sitting unpaid, or they want to roll a year of sales up by month, so they search for the SQL, paste it into a formula field, and NetSuite throws an error. The formula looked right. It was right, for the wrong database.

That is the thing to get straight before any of the rest of this makes sense, so I am going to start there and then work through the four date jobs I actually run into on client accounts: days between two dates, aging buckets, grouping by month or year, and the handful of functions worth memorizing.

## It runs on Oracle, not SQL Server

NetSuite saved search formulas are evaluated by an Oracle database. When you type an expression into a Formula field, NetSuite hands it to Oracle to compute. That single fact explains most of the errors people hit, because a lot of the date SQL floating around online is written for Microsoft SQL Server, and Oracle does not speak it.

These do not work in a NetSuite formula:

    DATEDIFF
    DATEADD
    DATEPART
    GETDATE

If you came from a SQL Server or T-SQL background, those are muscle memory, and they will fail every time. The good news is that the Oracle equivalents are simpler than what you are replacing. For the current date you use the NetSuite keyword `{today}`. To get the days between two dates you subtract them. No function call at all.

## Days between two dates

In Oracle, and therefore in NetSuite, subtracting one date from another gives you a number of days. So the age of a transaction is just:

    {today} - {trandate}

Set the field type to **Formula (Numeric)** and that returns a clean whole number for a plain date field like Transaction Date.

Here is where people get surprised. Some fields carry a time component, not just a date. Date Created is the usual culprit. When you subtract a field that includes a time, the answer comes back with a decimal tail, something like 42.376, because Oracle is counting the fraction of the current day too. That is not a bug, it is the time-of-day leaking into the math.

Wrap it to drop the fraction. `TRUNC` chops the decimal off, `ROUND` rounds to the nearest whole day:

    TRUNC({today} - {datecreated})

    ROUND({today} - {datecreated}, 0)

I default to `TRUNC` for age calculations, since a bill that is 42.9 days old has not actually crossed into day 43 yet, and truncating matches how people count aging in their heads.

## An aging bucket with CASE WHEN

Once you can produce a day count, sorting records into aging buckets is a `CASE WHEN` on that count. This is the pattern I use for a quick A/R or bill-aging view when someone does not want to open the standard aging report:

    CASE
        WHEN {today} - {duedate} <= 0 THEN 'Not yet due'
        WHEN {today} - {duedate} <= 30 THEN '1-30'
        WHEN {today} - {duedate} <= 60 THEN '31-60'
        WHEN {today} - {duedate} <= 90 THEN '61-90'
        ELSE '90+'
    END

Set that one to **Formula (Text)**, since it returns labels.

One field to watch is the due date itself. Not every transaction has one, and subtracting from a null due date gives you a null result, so those records fall out of your buckets silently. If that is a risk in your data, fall back to the transaction date when the due date is empty using `NVL`, which swaps a null for whatever you give it as the second argument:

    NVL({duedate}, {trandate})

The `CASE WHEN` engine is worth knowing well on its own, because it drives far more than aging. I went deep on comparing and matching fields with it in [the NetSuite CASE WHEN post](/blog/stringmatch), and the same logic shows up in [highlighting rows and cells](/blog/post2).

## Grouping by month or year, two ways

This is the request I hear most: take a pile of transactions and total them by month, or by year, or by quarter. There are two ways to do it, and the first one does not need a formula at all. Most people skip it because they never noticed it was there.

### The Function dropdown

Open the **Results** tab of your saved search. Next to each field you pick, there is a **Function** column with a dropdown. For a date field, that dropdown rolls the date up to a period for you. The date options are:

- **Day** returns the full date
- **Calendar Week** returns the first day of that date's week
- **Week of Year** returns the week number
- **Month**
- **Quarter**
- **Year**
- **Age in Days**, **Age in Weeks**, **Age in Months**, **Age in Years**, each measuring back from today

So to total sales by month, add your amount field with a Sum summary type, add Transaction Date, set its Function to **Month**, and set its summary type to Group. NetSuite buckets every row into its month and adds up the amounts. No `TO_CHAR`, no `TRUNC`, nothing typed. A note before you go looking for them: Fiscal Year and Day of Week are not in this dropdown. If you need your fiscal calendar or a weekday name, that is formula territory.

### The TO_CHAR formula

When the dropdown does not have what you want, or you need a specific label format, reformat the date yourself with `TO_CHAR`. It converts a date into text using a format mask you supply:

    TO_CHAR({trandate}, 'YYYY-MM')

That gives you 2026-07 for July. `'Mon YYYY'` gives you Jul 2026, `'YYYY'` gives you the year alone, and `'Q'` gives you the quarter number.

There is a sorting trap here that catches people. A `TO_CHAR` result is text, and text sorts alphabetically, not chronologically. `'YYYY-MM'` happens to sort correctly because the year leads and the numbers line up, but `'Mon YYYY'` will put April before January, because A comes before J. If you want a readable month label and correct order, either sort on the underlying date field instead of the formula, or lead your label with a sortable prefix.

## A few date functions worth keeping

Beyond subtraction and `TO_CHAR`, these are the Oracle date functions I reach for often enough to have memorized. All of them work in NetSuite formulas:

- `ADD_MONTHS({today}, -1)` steps a date forward or back by whole months. Negative goes back. Better than trying to subtract 30 days and hoping the month lengths cooperate.
- `LAST_DAY({trandate})` returns the last day of that date's month, which is handy for month-end logic.
- `TRUNC({today}, 'MONTH')` snaps a date back to the first of its month. `TRUNC({today}, 'YEAR')` snaps it to January 1. This is the clean way to build a month-to-date or year-to-date filter.
- `MONTHS_BETWEEN({today}, {startdate})` gives months between two dates. Be aware it returns a fractional number when the days of the month do not line up, so 2.5 is a real possible answer. Wrap it in `TRUNC` or `ROUND` if you want whole months.

## Pick the right formula field type

The error that eats the most time is not a function name, it is the field type. When you build a formula in the Results or Criteria area, NetSuite asks what kind of value it returns: Formula (Numeric), Formula (Date), or Formula (Text). Pick the wrong one and you get `ERROR: Invalid Expression`, which tells you nothing about what actually went wrong.

The rule is to match the type to what your formula produces:

- Returns a number, like a day count or a `MONTHS_BETWEEN`? Use **Formula (Numeric)**.
- Returns an actual date, like `ADD_MONTHS` or `LAST_DAY`? Use **Formula (Date)**.
- Returns a label or a `TO_CHAR` string? Use **Formula (Text)**.

A `TO_CHAR` result is text even though it came from a date, so it belongs in Formula (Text), and it will not behave like a real date if you try to filter a range on it. When a date formula refuses to save, the type mismatch is the first thing I check, before I ever question the syntax.

## Frequently Asked Questions

### How do I calculate the number of days between two dates in NetSuite?

Subtract them. In a saved search Formula (Numeric) field, `{today} - {trandate}` returns the number of days between the transaction date and today. To measure between two stored fields, subtract one from the other the same way. NetSuite runs on Oracle, where subtracting dates yields a day count directly, so you do not need a function to do it.

### Why does my date subtraction return decimals?

Because one of the fields includes a time component. Fields like Date Created store a date and a time, so subtracting them counts the fraction of the current day and returns something like 42.376 instead of 42. Wrap the expression in TRUNC to drop the fraction, as in TRUNC({today} - {datecreated}), or use ROUND({today} - {datecreated}, 0) to round to the nearest whole day.

### Does DATEDIFF work in a NetSuite saved search?

No. DATEDIFF is a Microsoft SQL Server function, and NetSuite formulas are evaluated by an Oracle database, which does not have it. The same goes for DATEADD, DATEPART, and GETDATE. To get days between dates in NetSuite you subtract the dates directly, and for the current date you use the keyword {today}.

### How do I group a saved search by month without writing a formula?

Use the Function dropdown on the Results tab. Add your date field, set its Function to Month, and set its summary type to Group, then give your amount or count field a Sum or Count summary type. NetSuite rolls every row up into its month with no formula required. The dropdown also offers Quarter, Year, Calendar Week, and Week of Year for date fields.

### Why am I getting "Invalid Expression" on a date formula?

The most common cause is a mismatch between the formula field type and what the formula returns. If the formula returns a number, use Formula (Numeric). If it returns a date, use Formula (Date). If it returns text, including anything built with TO_CHAR, use Formula (Text). Choosing the wrong type produces the Invalid Expression error even when the syntax is correct.

<ConsultingCTA message="I build saved searches, formulas, and reporting for NetSuite clients every week, including the aging views and date rollups finance actually uses. If yours are not giving you the numbers you need, let's talk." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
7/21/2026

<TagLinks />

Read Next - [NetSuite CASE WHEN Formula](/blog/stringmatch)
