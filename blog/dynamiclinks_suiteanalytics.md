---
title: Dynamic Links in Saved Searches
date: 2019-02-25
description:
    Saved Searches allow for some native options for drilling down into results data through grouping fields. If you summarize fields by group and then click the field link, you should be redirected to a summarized view of your saved search.
    But what if you want more unique data in your drill-down? What if you don't want to lose your current search your are viewing? There are some formulaic answers to these questions that I will explore in this post.

tags: ["Formulas", "HTML", "SavedSearch", "SuiteAnalytics"]
---

# Dynamic Links - Saved Search

[[toc]]

---

## Introduction

Saved Searches allow for some native options for drilling down into results data through grouping fields. If you summarize fields by group and then click the field link, you should be redirected to a summarized view of your saved search.

But what if you want more unique data in your drill-down? What if you don't want to lose your current search your are viewing? There are some formulaic answers to these questions that I will explore in this post.

## Drill-Down link by formula (text)

To create a formulaic drill-down in a saved search, I am going to create a couple of searches based on the Transaction record. The end goal will be a search that lists all sales orders from last week with a link to another search listing the items on a single sales order.

The first Search will be the primary search and will eventually contain the drill-down link to the items search

> Search #1 (Transaction Search)
>
> **Name: All Sales Orders**
>
> **Criteria**
> - Type is Sales Order
> - Main Line is true
> - Date is within last week
>
> **Results**
> - Date
> - Document Number

![Parent Record](https://i.imgur.com/Yi63P4Y.png "All Sales Orders Search")



The second search will be the drill-down search and will contain all of the items and quantities on the specific Sales Order from Search 1.

> Search #2 (Transaction Search)
>
> **Name: Items on Sales Order**
>
> **Criteria**
> - Type is Sales Order
> - Main Line is true
> - Item: Type is any of Kit/Package, Item Group, Inventory Item, Assembly/BIll of Materials
>
> **Results**
> - Date
> - Document Number
> - Item
> - Quantity
>
> **Available Filters**
> - Internal ID 
> - Show in filter region = T
>    - More on this in a moment

![Child Record](https://i.imgur.com/6bcHQ0q.png "Items on Sales Orders")

---

### Crafting the link

To build the link between the two searches, we need to know the url to a specific sales order in Search #2. This is why I added the Internal ID filter to the second search.

Using the INTERNAL ID filter in the FILTERS section you can choose the internal id of a specific Transaction Record. This will then filter the results down to that specific transaction record. The results in this case, do not matter. What we are after here is the URL (circled in red).

Copy the url from the filter results and paste  it into a text editor - like VScode or Notepad

![URL](https://i.imgur.com/BnSjwg5.png "URL")

The link from my filtered results looks like this:

    https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID=10537&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F


---

### Add the link to the primary search

Heading back to the Search #1, we can now add this link to the search as a formula(text) column using some html.

1. Edit All Sales Orders search
2. In Results add a line Formula(text)
3. Pop-out the formula builder by clicking the "Set formula" icon

    ![Open Editor](https://i.imgur.com/Pq3vFr3.png "Open Editor")
4. Add an `<a>` tag with a reference to your copied link
    
    ![Formula Links](https://i.imgur.com/AKPNEz2.png "Formula Links")
5. Save the search and view results

**All Sales Orders** now includes a FORMULA(TEXT) column with clickable links! The issue is, the links all go to the same place; the version of the **Items on Sales Orders** search that is filtered to Internal ID = 10537.

![Parent Record](https://i.imgur.com/GtM1srI.png "Link Added")
    
The link we used in our Formula(text) column is not very helpful for our purpose. On close inspection we can see that the link contains **INTERNALID=10537**. This means that this link will always take you to the Items on Sales Orders search - filtered to Internal ID 10537. We need a way to replace that Internal ID with a dynamic value.

    https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID=10537&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F

---

### Make the link dynamic

Thankfully, making the Internal ID in this link is pretty easy. We need to inject the Internal ID from the Sales Order into this link. to inject field data in HTML tags in a Formula(text) field you simply need to enclose the field id in single quotes and double pipes.
- '||{internalid}||'

Making the dynamic link look like this

    https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID='||{internalid}||'&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F

Look at the difference closely. I have swapped out
- INTERNALID=10537

for

- INTERNALID='||{internalid}||'

---

### Add the dynamic link to Search #1

1. Edit the **All Sales Orders** Search
2. Modify the Formula(text) field by adding the dynamic link in place of the old link
3. Change 'link text' to something more useful, like 'Items on SO'
4. Save and view the results

Now the FORMULA(TEXT) column contains links labeled 'Items on SO' and if you click the link on the first row the **Items on Sales Orders** Search opens filtered to the correct Sales Order. This filtered Saved Search shows only the items on the selected Sales Order.

![Parent Record](https://i.imgur.com/s7MSm84.png "Dynamic Link")

---

![Child Record](https://i.imgur.com/lj5aA8y.png "Results")


## Conclusion

Mastering the creation of dynamic links in saved searches is an invaluable skill for any NetSuite Admin. The utility of this skill goes far beyond the example in this post. Dynamic links can be used to create custom links to subrecords, pop-up windows, links in a new tab and much more. 

In my next post, I will outline a couple of ways to improve the link created in this example to show how to open the drill-down search in a new tab and in a pop-up window.



#### A note on html in saved searches

- HTML included in formula(text) fields must be enclosed in single quotes.
- Injecting field data into HTML in formula(text) fields is achieved by enclosing the field ids in single quotes and 2 pipes on either side.
    - '||{internalid}||'


- `<a>` tags generally include the following data at a minimum
    - `<a href="https://someurl.com">
    link text
    </a>
    `


<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
2/25/2018 

<div class="sharethis-inline-share-buttons"></div>

<TagList />

Read Next - [Part 2 - Link Behavior](https://mysuite.tech/blog/popuplink_suiteanalytics.html)



