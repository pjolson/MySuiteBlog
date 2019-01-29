---
title: SuiteAnalytics Workbook (Beta)
date: 2019-01-28
description:
    Have you ever wanted to be able to do more with your saved searches and reporting in NetSuite? Are you tired of edit/saving to test criteria or results changes? Have you ever wished you could create pivot tables in NetSuite?

tags: ["Admin", "Reports", "SavedSearch", "SuiteAnalytics"]
---

# SuiteAnalytics Workbook (Beta)

[[toc]]

Have you ever wanted to be able to do more with your saved searches and reporting in NetSuite? Are you tired of edit/saving to test criteria or results changes? Have you ever wished you could create pivot tables in NetSuite?

SuiteAnalytics Workbook is a new feature in NetSuite that is still in the Beta phase but appears on the 2019.1 Release notes as a feature set to go live. This feature has been teased at SuiteWorld for the past few years and it appears that it is finally ready for production release!

In this post, I will go over some of the basic features of SuiteAnalytics Workbook.

---


## Enable SuiteAnalytics Workbook

SuiteAnalytics workbook in your NetSuite account, is still a Beta feature and is not turned on by default. You need to enable this feature to begin using it. Once enabled a new Center Tab will appear in the navigation bar for most roles. Be aware of this as most of your regular NetSuite users will see the new “Analytics” tab after enabling. There is a “SuiteAnalytics Workbook” permission on the Reports subtab of the Permissions tab in the role editor if you want to add SuiteAnalytics Workbook to custom roles.

To Enable:

1.	Log in to NetSuite as an Administrator
2.	Got Setup -> Company -> Enable Features, and click the Analytics subtab
3.	Check “SUITEANALYTICS WORKBOOK”

![Enable](https://i.imgur.com/EzQJrl3.png "Enable SuiteAnalytics Workbook")

Now that it is enabled you can see the “Analytics” Center Tab in the navigation bar.

![SelectRecord](https://i.imgur.com/cP8h5SJ.png "Select Record Type")

---

## Create a Workbook

This works like creating a Saved Search. You create a workbook and choose the root record type.
1.	Click the Analytics tab in the navigation bar
2.	In the Analytics Dashboard, click “New Workbook”
3.	Select a record from the list.

![NewWorkbook](https://i.imgur.com/AOyqu5q.png "New Workbook")

![Enabled](https://i.imgur.com/SFJZu3P.png "Analytics tab")

---

### Select Data

Once your record data loads, you can begin updating viewable data. This works like the Saved Search “Results” section except you can see your updates immediately, without having to save. Add your data columns from the left-hand dropdown and see the updates right away! You can also remove columns change sorting and add joined field data or formula fields as well.


![DataActions](https://i.imgur.com/h1iyrEw.gif "Add and update Data Columns")

---

### Filter Data

Filtering your data works like the "Criteria" section of the Saved Search editor. You can filter on one or more value types, use and/or logic and parenthetical groupings. Here is a simple example where I filter down the previous data set to just Sales Orders.

![FilterData](https://i.imgur.com/xr8rntW.gif "Add Criteria Filters")

### Pivot Data

With SuiteAnalytics Workbook you can create multiple pivot tables in the same workbook and refresh them in the same manner as adding data and criteria.

1. Click "Add Pivot"
2. Drag and drop your Row, Column and Value information into the "Layout" editor
3. Click Refresh icon

You can see your new pivot table is now available. Multiple pivots can be created by simply adding another pivot.

![Pivot](https://i.imgur.com/XpNK3Rf.png "Create Pivot Tables")

Pivot tables can be filtered independently of the source data by dragging the filter field from the Fields section to the "Drag and drop a field to add it as a filter" section of the Pivot Table editor.

---

### Charts

Similar to the section on Pivots, you can create multiple charts in SuiteAnalytics workbook.

1. Click "Add Chart"
2. Add X-Axis, Series and Measures data
3. Click Refresh icon

![Charts](https://i.imgur.com/VYjXtM6.png "Create Charts")

---

## Conclusion

SuiteAnalytics Workbook is still in Beta, so the features may change prior to release. It appears that it is set for release in 2019.1. I encourage you to enable this feature in your Sandbox accounts, or Production accounts to play with the available features now.

---

## Resources

I have gone over some very basic features available in SuiteAnalytics Workbook in this post. NetSuite has an in-depth walkthrough in Suite Answers. Check out Suite Answers ID: 77299. The tutorial will take you through some more advanced features like parenthetical criteria groupings, formula fields, pivots and charts.

They have also published this short, but effective video to YouTube on SuiteAnalytics Workbook as well. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/379BNC9SpcU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
01/28/2019 

<div class="sharethis-inline-share-buttons"></div>

<TagList />

Read Next [NetSuite Certification Study Guide](https://mysuite.tech/blog/getcertified.html)
