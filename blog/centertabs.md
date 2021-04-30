---
title: Creating Custom Center Tabs
date: 2018-12-18
description:
    A follower of this blog reached out to ask for help on how to set up a Custom Center Tab, so I thought I would write up a brief how-to on Custom Center Tabs, Categories and Links.

    Center tabs can be created to add a permanent navigation bar tab to the NetSuite interface. These tabs can be added to Centers and limited by Audience (roles, people, departments, groups, customers, vendors, partners)

tags: ["Centers", "Navigation", "SuiteBuilder"]
---

# Create a Custom Center Tab!


[[toc]]

---

## Center Tabs

Center tabs can be created to add a permanent navigation bar tab to the NetSuite interface. These tabs can be added to Centers and limited by Audience (roles, people, departments, groups, customers, vendors, partners).
Center Tabs can include Center Categories that will appear as drop-down navigation options and can contain links to pages within NetSuite or externally. The tab link will also allow the user to have a custom tab page with dashboards, links and portlets.

![CenterTab](https://i.imgur.com/4WMmLP1.png "Working Center Tab")

### Turn on Custom Records

To begin creating center tabs, the Setup->Company->Enable Features  - SuiteCloud->Custom Records feature must be turned on.
Once that is enabled, the Custom Centers options become available under the Customization Tab.

![CenterTab](https://i.imgur.com/StJcMD1.png "Configuration Links")

### Create Center Tab

Navigate to Customization->Centers and Tab->New to begin creating your new Center Tab. Once there, you will see a screen that looks like this:

![TabEditor](https://i.imgur.com/VtweFj5.png "Center Tab Editor")

**A.	Label**
- The name that will appear in the Tab navigation

**B.	Center**
- The Center you would like to associate this tab with
- If you choose "All", the center tab will be placed next to Activities in the nav bar
- If you choose another Center like "Classic Center", it will be placed in between Setup and Support

**C.	Categories**

- When populated with Center Links, Categories will appear as drop down options on the tab in the nav bar.

**D.	Portlets**

- This allows you to choose portlet you want to be available on the Center Tab landing page (if you click on the Center Tab in the nav bar.)
 
In my earlier example, I created a Center Tab called Help Desk with some Categories to link to useful reports. This is what that looks like on the back-end:

![CenterTab](https://i.imgur.com/jJmp8Oi.png "Editor Complete")

---

## Create Center Links

Center Links can be associate with Center Categories to create drop down options off the navigation bar to easily access pages, searches, reports and Suitelets in NetSuite. They can also link out to external sites as well.
Create them by navigating to Customization->Centers and Tabs-Center Links.

![TabLinks](https://i.imgur.com/t5hVhg5.png "Center Tab Links")

---

## Create Categories

Once your Center Tab is created and you have some links Center Links ready, you can associate those links with Center Categories to make them available in drop down navigation, like this:

![CenterCategories](https://i.imgur.com/YUVycUF.png "Category Example")

You can create Custom Center Categories by navigating to Customization ->Centers and Tabs->Center Categories->New or from your already created Center Tab (This is how I prefer to create them).
If you edit your Center Tab, you can add new categories inline in the Categories sublist.

![InlineCategories](https://i.imgur.com/VsscbhG.png "Create Categories")

After saving, you can edit each Category to apply the Center Links.

![EditCategories](https://i.imgur.com/zVx5TRj.png "Edit Categories")

In this Case I will edit “Open Cases” to add “Report2” and “Report3” links.

![AddLinks](https://i.imgur.com/Vq8CNrf.png "Add Links")

After saving Center Category, I can check my nav bar to see if the Center Tab and drop-down options are available and working.

![ViewLinks](https://i.imgur.com/NIyJ5h3.png "View Links")

---

## Add Portlets

Adding Portlets to a Custom Center Tab will allow the user to customize the Custom Center Tab Overview Dashboard. You can choose for all available portlets. Users will be able to choose to add or remove these portlets, but they will only be able to add and remove the portlets you make available to them.

**Add Portlets**

![AddPortlets](https://i.imgur.com/5ab3hZt.png "Add Portlets")

**Dashboard View**

![ViewPortlets](https://i.imgur.com/oAtV1If.png "View Portlets")



Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
12/18/2018 

<div class="sharethis-inline-share-buttons"></div>

<TagList />

Read Next - [Create a link to another record in a Saved Search](https://mysuite.tech/blog/searchlinks.html)


