---
title: Create a link to another record in a Saved Search
date: 2018-12-27
description:
    Sometimes, you may find yourself in a situation where you want to link out to another connected record in a Saved Search without having to drill down to the record and then to the Related Record. Thankfully, NetSuite makes this pretty easy with a Formula(text) field. The trick lies in getting the formatting of the formula correct to make this work.

tags: ["Basics", "SavedSearch", "SuiteAnalytics"]
---

# Create a link to another record in a Saved Search

[[toc]]

---

Sometimes, you may find yourself in a situation where you want to link out to another connected record in a Saved Search without having to drill down to the record and then to the Related Record. Thankfully, NetSuite makes this pretty easy with a Formula(text) field. The trick lies in getting the formatting of the formula correct to make this work.

In this example, I have a Custom Search portlet that is showing Item Fulfillment Records with a link to the Sales Order that was used to create the Item Fulfillment Record.

![searchlinks](https://i.imgur.com/lOulJ0v.png "Saved Search Results")
 

## Crafting the Formula Field

A formula field in NetSuite can contain HTML tags. I covered this in a previous post on [Highlighting Saved Searches](https://mysuite.tech/blog/post2.html). To achieve the example above I have added an "a" tag with a link to a dynamic Sales Order Link. I will break down the link below. 

![searchlinks](https://i.imgur.com/0ZqraCT.png "Saved Search Results")

A few rules for crafting this formula:

1.	An "a" tag should include, at least 

---

    '<a href=”thephysicallinktotherecordyouwant”>link text</a>’

---

2.	The whole formula must be enclosed in single quotes ‘    ’
3.	Whenever you pull data from a field into a formula, it needs to be enclosed in single quotes and pipes ‘|| Data goes here ||’
4.	To get the link you want to link to, go to any individual record you want, in this case a Sales Order.
    
    a.	Open the Sales order in NetSuite
    
    b.	Copy the URL and paste it into a text editor
    
    c.	https://system.netsuite.com/app/accounting/transactions/salesord.nl?id=118202
    
    d.	Delete the number after id=
    
    e.	https://system.netsuite.com/app/accounting/transactions/salesord.nl?id=
    
    f.	This link will be used in your formula


## Putting it all together

To make the link Dynamic and open the Sales Order connected to the Item Fulfillment we need to replace the id number in the original link with the internal id of the connected Sales order. 

On this Item Fulfillment Record, there is a field named “Created From” with a field id of {createdfrom} that holds a link to the Sales Order that created this Item Fulfillment record.

![searchlinks](https://i.imgur.com/BAY31mt.png "Saved Search Results")
 
So, we insert the field id of the “Created From” field with a link to id – like this:

    '||{createdfrom.id}||'

Once you close the starting "a" tag you need to put some text in to display in the formula. You need to “pipe this text in between the "a" and "/a" tags in the formula as well. Like this:

    '||{createdfrom}||'

And the final formula will look like this and it will open the Sales Order that is listed in the “Created From” field on the Item Fulfillment.

    '<a href="https://system.netsuite.com/app/accounting/transactions/salesord.nl?id='||{createdfrom.id}||'">'||{createdfrom}||'</a>'

And will be added as a Results column of a type of Formula(text) like this (I have added the Sales Order Description, so it appears more logically in the results):
 
## Search View

Now if I view the Saved Search, I can see a column called “Sales Order” with links that open the Sales Order listed. The Edit | View links still open the Item Fulfillment record.

![searchlinks](https://i.imgur.com/lOulJ0v.png "Saved Search Results")
 

## Additional Link Features

### Target=”_blank”
If you want to open the record in a new tab and keep your place in the previous tab, you can add target=”_blank” to the end of your URL, like this:

    '<a href="https://system.netsuite.com/app/accounting/transactions/salesord.nl?id='||{createdfrom.id}||'" target="_blank">'||{createdfrom}||'</a>'

### &e=T

If you want the record to open in edit mode, simply add &e=T to the end of the URL, like this:

    '<a href="https://system.netsuite.com/app/accounting/transactions/salesord.nl?id='||{createdfrom.id}||'&e=T" target="_blank">'||{createdfrom}||'</a>'

## Finally

There even more things you can achieve with these links, like opening links in pop up windows, performing actions on click, etc. But I wanted to keep this first post simple. Whenever I create one of these links, I always refer to a working version to begin crafting my new search link. I hope you bookmark this post to help you the next time you need to start a linked column like this.


---

Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
12/27/2018 

<TagList />


