---
title: Anatomy of a Saved Search - Definitions
date: 2018-12-17
description:
    When creating or updating a Saved Search in NetSuite, there are a lot of options and features to consider. In most cases, you can get by with many of the basic features, but it is useful to know how all the different options affect your search.

tags: ["Basics", "SavedSearch", "SuiteAnalytics"]
---

# The Anatomy of a Saved Search

[[toc]]

---

When creating or updating a Saved Search in NetSuite, there are a lot of options and features to consider. In most cases, you can get by with many of the basic features, but it is useful to know how all the different options affect your search.

## Definitions

The Definitions portion of the Saved Search editor allows you to set some global settings for the saved search you are creating or editing.

![definitions](https://i.imgur.com/7muzvYn.png "Saved Search Definitions")

### A.	Search Title	

Search Title should be a descriptive title that tells the user what the purpose of the search is. This title will appear in the Global Search for users that have access to this saved search.


### B.	ID

The ID field is set when creating the saved search or can be updated by clicking the Change ID button at the top. When setting this ID, begin with an underscore and then choose a descriptive name.

These IDs can be referenced in script and are much easier to read in script if they are descriptive. If you do not set an ID, the system will choose a generic id like custsearch76.

### C.	Owner

The Owner field is set to the creator of the search but can be updated by the owner to another user. The Owner has full access to the search and can edit or delete it at any time.

### D.	Public

Checking the Public checkbox makes the search available for all users with access to your NetSuite account. The search will appear in the Global Search. By default, users with Public access will not be able to edit the search but will be able to save an edited copy.

### E.	Available as List View

Checking this box adds the search to the list of view options for lists of records of this type. So, if I were to view a list of transactions, I could update the view to this saved search to see the list of transactions with my predefined criteria and results.

This can be very useful as the assigned view may show too much - or the wrong kind - of information.

### F.	Available as Dashboard View

Checking this option makes the search available as a dashboard view on user’s home page or other center pages.

In this example, you can see that my search can be selected as the search for a Custom Search portlet.

![dashboard](https://i.imgur.com/kdATcRP.png "Available for Dashboard")

### G.	Available as Sublist View

Checking this box makes the search available as a Sublist View for records of this type. This means that if a user is viewing a record where transactions are available to view in a Sublist, they can choose this search as their view.

Like the Available as List View option, the Sublist view that is set for a user by default may have the wrong kind of information. Custom views like this can be used to help them get the correct information about a sublist record.

### H.	Available for Reminders

Checking this box make the search available in the Reminders Portlet.

![reminders](https://i.imgur.com/K1W4P1A.png "Available for Reminders")

### I.	Show in Menu

Checking this box makes the Saved Search appear in the Reports->Saved Searches drop down menu and the tabbed Reports Page. This is useful if your users need ready access to the search and are very visual.

**DropDown**
![dropdown](https://i.imgur.com/dCFPbXs.png "Available for Dropdown")


**Reports Page**
![reports](https://i.imgur.com/Lv5Goyj.png "Available for Reports")

---

## Up Next

I will go over the Criteria section and all the options and features available there.

---

Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
12/17/2018 

<TagList />

Read Next - [Create a Custom Center Tab](https://mysuite.tech/blog/centertabs.html)

