---
title: Working with Custom Records - Part 1
date: 2021-05-14
description:
    Custom records in NetSuite allow for the tracking of unique information that is outside of the scope of native Entity, Transaction, CRM, and Other record types.

tags: ["Centers", "Navigation", "SuiteBuilder"]
---

# Custom Record Project


[[toc]]

---

## Custom Records

In this series of articles, I will show how to build out a custom record in NetSuite to track unique data that is outside the scope of native Entity, Transaction, CRM, and Other record types. Custom records have a variety of uses, but essentially they can be used to store any data that is useful for your company to track. In this example, I will be creating a custom record called "Candidate Agreements" to track multiple signed agreements that a potential candidate for employement may have signed with a competitor. This use case would allow a recruiting arm of a company to track start and end dates of Non-Compete Agreements, Non-Disclosure Agreements, or other employemnet agreements.

In this first article, I will build the "Candidate Agreements" custom record and show how to create and view this record from the employee record in NetSuite.

In future articles in this series I will show how to track these agreements, build notificaitons and errors into the employee record to disallow the recruitment or hiring of a candidate that is under a current non-compete agreement, and build dashboard alerts and email notificaitons to notify recruitment that a desired candidate will soon be available for contact.

### Enable Features

