---
title: Saved Search Link Behavior
date: 2019-02-26
description:
    In my last post, I discussed how to create dynamic links in Saved Searches to drill-down to related saved searches. In this post I will add to that example by showing how to have the drill-down searches open in another tab or pop-up window. This will allow your users to not lose their place in when opening the dynamic links you have created.

tags: ["Formulas", "HTML", "JavaScript", "SavedSearch", "SuiteAnalytics"]
---

# Saved Search Link Behavior

[[toc]]

---

## Introduction

In <a href="https://mysuite.tech/blog/dynamiclinks_suiteanalytics.html" target= "_blank">my last post</a>, I discussed how to create dynamic links in Saved Searches to drill-down to related saved searches. In this post I will add to that example by showing how to have the drill-down searches open in another tab or pop-up window. This will allow your users to not lose their place in when opening the dynamic links you have created.

The examples outlined here can be used for any `<a>` tag link you create in Searches or inline html fields in NetSuite.

The example link from <a href="https://mysuite.tech/blog/dynamiclinks_suiteanalytics.html" target= "_blank">my previous post</a> on the topic of dynamic links in saved searches was a dynamic link that pulled the Sales Order internal id into a link that referred to a saved search containing items on a Sales Order. When the link was clicked from a row on the saved search the user would be redirected to another saved search of items on Sales Orders, filtered to only that Sales Order. 

The dynamic link in HTML format looked like this:

    '<a href="https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID='||{internalid}||'&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F">
    Items on SO
    </a>'

I will use this `<a>` tag link for the 2 following examples.


## Open in an new tab

Formatting the `<a>` tag to open a link in a new tab is very easy to do. Simple add
    
    target="_blank"

to the end of your href="" url like this:
`
https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID='||{internalid}||'&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F" target="_blank`



The new `<a>` tag will look like this:

    '<a href="https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID='||{internalid}||'&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F" target="_blank">
    Items on SO
    </a>'

And the actual link behavior will work like this:

![FilterData](https://i.imgur.com/vn7YC8s.gif "Add Criteria Filters")


## Open in a Pop-up Window

Another option is to have the linked saved search or record open in a pop-up window. But Pop-ups are annoying right? I have found small pop-up windows to be useful with dynamic links in many cases. The example I will show is in using the same search as a custom search dashboard portlet. When using a pop-up in this situation, you users can quickly drill-down to necessary data and easily close out without navigating away from their dashboard.

For the pop-up link, we are going to use a little JavaScript. I will provide a template that you can use over and over again here and then show it in action using my previous example

### Pop-Up Template

You can use the code below in a formula(text) column in a Saved Search to create a pop-up window when links are clicked. Make sure to add the url to the search or record you are referring to and update the link text.
- replace the https://ADD_URL_HERE text with your link
- replace UPDATE_LINK_TEXT_HERE with the text you would like your link to display

        '<a href="#" onclick="window.open(''https://ADD_URL_HERE'',''selection'',''dependent=yes,height=600,width=700,scrollbars=no,statusbar=no,titlebar=no,menubar=no,resizeable=yes,location=no'');">
        UPDATE_LINK_TEXT_HERE
        </a>'
    
Using the dynamic link from my previous example, my new `<a>` tag would look like this:

    '<a href="#" onclick="window.open(''https://system.na3.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_INTERNALID='||{internalid}||'&style=NORMAL&report=&grid=&searchid=1175&dle=F&sortcol=Transction_FRETION17_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=100&twbx=F'',''selection'',''dependent=yes,height=600,width=700,scrollbars=no,statusbar=no,titlebar=no,menubar=no,resizeable=yes,location=no'');">
    Items on SO
    </a>'

And behave link this (example using the same search as a custom search portlet)

![FilterData](https://i.imgur.com/9CQVPT6.gif "Add Criteria Filters")


## Conclusion

I hope you enjoyed this 2 part post on dynamic links and link behavior. If you have any questions, plese feel free to [*email me*](mailto:info@mysuite.tech) or reach out through [LinkedIn](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/).

## Resources

[Part 1 - Dynamic Saved Search Links](https://mysuite.tech/blog/dynamiclinks_suiteanalytics.html)

---

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
2/26/2018 

<div class="sharethis-inline-share-buttons"></div>

<TagList />

Read Next - [Keyboard Shortcuts](https://mysuite.tech/blog/keyboardshortcuts.html)