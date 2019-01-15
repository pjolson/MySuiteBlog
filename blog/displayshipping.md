---
title: Default Shipping Address in a Custom Field
date: 2019-01-15
description:
    Recently, a user asked me if they could view the Default Shipping Address for a Customer Record as a field on the Main subtab. The issue they were reporting was the ADDRESS field on the Customer Record always shows the Default Billing Address. 

tags: ["CaseWhen", "Forms", "Formulas", "HTML", "SuiteBuilder"]
---

# Display Default Shipping Address in a Custom Field

[[toc]]

---

## Problem

Recently, a user asked me if they could view the Default Shipping Address for a Customer Record as a field on the Main subtab. The issue they were reporting was the ADDRESS field on the Customer Record always shows the Default Billing Address.

The issue is illustrated in this screenshot of a Customer Record for “Frank’s Custom Stuff.” In this record There are different Default Billing and Default Shipping Addresses listed in the Address subtab. The Default Billing address is the one that is pulled into the ADDRESS field on the Main Subtab.

![definitions](https://i.imgur.com/3xNgdeH.png "Customer Record")

----

## Solution

There is no native way to change the default ADDRESS field to source from a different address. The answer then is to create a custom field to hold this data
1.	Customization -> Lists, Records, Fields -> Entity Fields -> New
2.	Create a new field 
    - Type = Inline HTML
    - Applies To | Customer = T
    - Display | Subtab = Main
    - Validation & Defaulting | Default Value = Code Block Below, Formula = F

~~~
    <font color="grey">SHIPPING ADDRESS</font><br>
    {companyname}<br>
    {shipaddr1}, {shipaddr2}<br>
    {shipcity}, {shipstate} {shipzip}<br>
    {shipcountry}

    <a onmouseout="window.status='';" onmouseover="window.status='Click to View Map'; return true;" onclick="openMapWindow('{shipaddressee}\n{shipaddr1}, {shipaddr2}\n{shipcity}, {shipstate} {shipzip}\n{shipcountry}', '{shipcountry}','google'); return false;" href="javascript:void('map')" class="smalltextul dottedlink">Map</a>
~~~

![definitions](https://i.imgur.com/KbR0idK.png "Edit Custom Entity Field")

![definitions](https://i.imgur.com/r7ekMjB.png "Set Subtab")

![definitions](https://i.imgur.com/5yTx5a9.png "Enter HTML and JavaScript")

The code block uses HTML and JavaScript to Source the field data from the Default Shipping Address into the new field along with a “Map” link that will open Google Maps. This field will mimic the behavior of ADDRESS.

![definitions](https://i.imgur.com/iIJKWNQ.png "Custom Default Shipping Address Field")

---

### No Default Shipping???

If there is no Default Shipping specified in the Customer record Address subtab, the field will look like this:

![definitions](https://i.imgur.com/04fGW9G.png "Field Error - No Default Address")

You could always train your staff that this means the default shipping address is not setup or you could create another field to handle this.
1.	Customization -> Lists, Records, Fields -> Entity Fields -> New
2.	Create a new field 
    - Type = Inline HTML
    - Applies To | Customer = T
    - Display | Subtab = Main
    - Validation & Defaulting | Default Value = Code Block Below, Formula = T
~~~    
CASE WHEN {shipaddr1} IS NOT NULL THEN TO_CHAR({custentity_defaultshipping}) ELSE 'NO DEFAULT SHIPPING ADDRESS SPECIFIED' END
~~~
This code block contains a SQL formula that is looking to see if the first line of the default shipping address is empty or not. If not, it will source in the original field we created. If it is empty, it will display **NO DEFAULT SHIPPING ADDRESS SPECIFIED**

3.	On the Custom Entry form, hide the original Default Address Field
4.	On the Custom Entry form, add the new field in place of the original field

![definitions](https://i.imgur.com/JtcpD20.png "Field with no default address")

---

### Pro Tip: Avoid some annoyance

When editing a Custom Entity Field that contains a Default Value, it seems like the FORMULA check box gets set to checked every time. 

In this case, the first field I created contained HTML and will throw an error if FORMULA = T. If you are getting INVALID EXPRESSION, check to see if FORMULA = T and double check that it is FORMULA = F when saving.

The second field we created did contain a formula and should be marked as FORMULA = T.

---

## Conclusion

This solution is a simple way to source in another default address into a custom field. It is also a good introduction to Inline HTML fields and power of styling individual custom fields. Inline HTML fields are a simple solution for adding styled text effects to custom forms to help call out data for users and increase form readability.

Please let me know what you think of this post and if you have any questions or comments by emailing [*info@mysuite.tech*](mailto:info@mysuite.tech)

<a href="https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width=8% height="auto" style="border-radius: 50%;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp-csm-137a9435/)
01/15/2019 

<TagList />

Read Next [The Anatomy of a Saved Search - part 1](https://mysuite.tech/blog/searchanatomy1.html)