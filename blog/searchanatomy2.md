---
title: Anatomy of a Saved Search - Criteria
date: 2019-01-14
description:
    The “Criteria” section of the saved search editor allows you to narrow down your results to see only the data that is useful or relevant to you. The criteria subtab is simple to grasp but can become as complex as you need it to be to retrieve the specific dataset you are search for.

tags: ["Basics", "SavedSearch", "SuiteAnalytics"]
---

# The Anatomy of a Saved Search

[[toc]]

## Criteria

The “Criteria” section of the saved search editor allows you to narrow down your results to see only the data that is useful or relevant to you. The criteria subtab is simple to grasp but can become as complex as you need it to be to retrieve the specific dataset you are search for.

---

### Filters

Criteria filters can narrow results by including only the information you choose to include or exclude. This can be done by choosing field values or by creating formulas.

![Criteria1](https://i.imgur.com/9xgLW47.png "Criteria Builder")

In the above Saved Transaction Search, there are no filters set under Criteria. Without any filters this search would return every transaction ever recorded in NetSuite for this company. That means, every Assembly Build, Assembly Unbuild, Bill, Bill Credit, Bill Payment, Bin Putaway Worksheet, Bin Transfer, Cash Sale, Invoice ………. Some filters are probably necessary.

A simple example would be: All Sales Orders with a Transaction Date with in the rolling half that are in a status of Billed. This example only includes Transactions that match ALL criteria.

![Criteria1](https://i.imgur.com/y6f1I7Y.png "Criteria Defined")

You may have noticed I included Main Line = True. I will get into the Main Line in detail in a future post, but the Main line = True criteria will make only 1 line per transaction appear in the search.
You can filter by a few different types of field data
1.	Field data (any field that appears on the record in question)
2.	Joined fields (any field that joins out to another record)

    a.	Found at the bottom of the list of filters and ending with a …

    b.	Example: Company…
3.	Formulas
    
    a.	Date

    b.	Numeric

    c.	Text

While building these criteria I chose to be inclusive and select Type IS Sales Order, but you can do the opposite and request Type is none of Sales Order and the search would return all transaction types EXCEPT Sales Orders.

---

### Standard vs Summary

- Standard filters will filter any data in the saved search that has not been summarized
- Summary allows you to filter summarized data. Results can be rolled up into summary data in the Results section and will be covered in my next post on Results

---

### Use Expressions

Making Use Expressions = T opens up some finer controls over your Criteria filters. This allows you to define parenthetical statements and uses And/or logic. It also opens up a line-level “Not” check box that will invert the logic of the line.

This is a short example using parenthesis along with and/or.

![Criteria1](https://i.imgur.com/71Yzmhh.png "Criteria and/or")

Use Expressions offers up to 3 levels of parenthesis with and/or logic on each line and each level of parenthesis. The tool is pretty simple to understand, but comes with some caveats:

- Using “or” can bring in data you do not want
- This example shows my original criteria with parenthesis added and an OR Date Create is last week. This added Or line will bring in every transaction created last week (Probably not useful in the context of the original criteria)
![Criteria1](https://i.imgur.com/hWgzMX8.png "Criteria or")
- The more complex the criteria, the longer time it may take for the search to run
    - I have gotten very complex in the past and tried to use the search as a Custom Search Dashboard Portlet and it would take minutes for the portlet to refresh.

---

## Up Next

I will go over the Results section of the Saved Search editor and discuss some of my favorite tools located there.

---

Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
1/14/2019 

<TagList />

Read Next - [Create a Custom Center Tab](https://mysuite.tech/blog/centertabs.html)