---
layout: page
pageClass: commercial-page
title: "NetSuite Customization, SuiteScript & Integrations"
description: "NetSuite customization from one senior consultant: SuiteScript and SuiteQL builds, reporting, data migration and integrations. Fixed-fee, scoped to the work."
faqSchema: true
# DRAFT, not yet approved for publishing. Three guards keep it out of search
# until it is: the noindex tag below, `search: false` (site search), and the
# sitemap exclusion in .vitepress/config.mjs. Remove all three to publish.
search: false
head:
  - - meta
    - name: robots
      content: noindex
---

<section class="ms-hero ms-hero--page">
<div class="ms-wrap">
<div class="ms-hero-copy">
<p class="ms-eyebrow">Quoted to scope</p>

# NetSuite Customization and Integrations

<p class="ms-hero-lead">SuiteScript and SuiteQL builds, reporting, data migration, and integrations with the tools your business already runs on, including Celigo, Workato, Box, Concur, and Salesforce. Fixed-fee, scoped to the work, with PMP-certified project management included.</p>
<div class="ms-actions">
  <a href="/contact/" class="cta-primary">Discuss your NetSuite needs</a>
  <a href="#recent-work" class="cta-secondary">See a recent build</a>
</div>
</div>
</div>
</section>

<section class="ms-section">
<div class="ms-wrap">
<div class="ms-prose ms-intro">

## What I build {#what-i-build}

Hands-on across SuiteScript and SuiteQL, reporting, data migration, and integrations. I scope the work and I do the work.

The [real-time status page pattern](/blog/netsuite-realtime-status-page) is one I have shipped in production across bulk status flips, batch payment processing, and mass email sends.

</div>
<div class="ms-card-grid">
  <div class="ms-tile">
    <h3>SuiteScript applications</h3>
    <p>Suitelets, Map/Reduce and scheduled scripts, and the screens people use to run them, such as a bulk-renewal Suitelet that lets a team renew subscriptions in batches instead of one by one.</p>
  </div>
  <div class="ms-tile">
    <h3>Automation</h3>
    <p>Processes that run unattended, such as a weekday past-due run that puts each customer's open invoices into a single email with one payment link.</p>
  </div>
  <div class="ms-tile">
    <h3>Reporting and SuiteQL</h3>
    <p>Saved searches, workbooks, and SuiteQL for the numbers finance cannot get out of the system, such as division and segment reporting on sales, bills, and payments.</p>
  </div>
  <div class="ms-tile">
    <h3>Integrations</h3>
    <p>NetSuite connected to the tools your business already runs on, with integration work in Celigo, Workato, Box, Concur, and Salesforce.</p>
  </div>
  <div class="ms-tile">
    <h3>Data migration</h3>
    <p>Imports loaded in dependency order, with external IDs on every record and a full dry run before the load that counts.</p>
  </div>
  <div class="ms-tile">
    <h3>SuiteScript 2.1 conversion</h3>
    <p>Scripts on SuiteScript 1.0, 2.0 or 2.x stop working in NetSuite 2028.2. I inventory them, convert the ones worth keeping, and retire the rest.</p>
  </div>
</div>
</div>
</section>

<section class="ms-section ms-section--tint">
<div class="ms-wrap ms-split ms-split--lead">
<div class="ms-prose">

## How a build is scoped {#scoping}

Every build starts with a conversation, then a fixed-fee quote scoped to the work, with PMP-certified project management included.

A scope that says integrate NetSuite with Salesforce and nothing else ends in a change order discussion about every open question. So the specifics get written down before anything is built.

One more question belongs in the scope of any build, mine included: how will the customizations be delivered, who can edit them afterward, and what happens to them if the engagement ends. The answer decides who controls the result. Objects deployed as ordinary account customizations can be edited by your administrator. Code delivered in a managed bundle is updated at the provider's discretion and may be locked.

</div>
<div class="ms-panel">
  <h3>Written down before an integration is built</h3>
  <ul class="ms-checks">
    <li>Direction: which system sends and which receives</li>
    <li>Frequency</li>
    <li>Field mapping</li>
    <li>Middleware</li>
    <li>Ownership after go-live</li>
  </ul>
</div>
</div>
</section>

<section class="ms-section">
<div class="ms-wrap">
<div class="ms-rail">
<div>

## When a script is the wrong answer {#when-not-to-build}

</div>
<div class="ms-rail-body ms-prose">

Not every request should end in code. Some older scripts can be replaced by native functionality that did not exist when they were written, and a feature you already pay for can sometimes remove the need for a build. When that is the case, I will say so.

Size matters too. Small scripts and fixes are part of [fractional administration](/fractional-netsuite-administrator). Larger builds are quoted separately as fixed-fee projects.

</div>
</div>
<div class="health-check-card">
  <h3>SuiteScript 1.0, 2.0 and 2.x stop working in NetSuite 2028.2</h3>
  <p>Oracle requires every script to be on SuiteScript 2.1 by that release, and a script annotated 2.x is a 2.0 script. Converting everything is the most expensive option. Some of those scripts should not be converted at all.</p>
  <a href="/blog/suitescript-2-1-migration" class="cta-secondary">Read the Migration Guide</a>
</div>
</div>
</section>

<section class="ms-section ms-section--tint">
<div class="ms-wrap">

## Recent work {#recent-work}

<div class="work-card">
<div class="work-head">
<div class="work-kicker">Customization &amp; Integrations</div>

### Subscription operations at scale, financial services firm

</div>
<div class="work-body">

A financial services firm newly live on NetSuite was managing thousands of recurring subscriptions with out-of-the-box tools built for a few hundred. Renewals were handled one at a time. Collections were falling behind, and the standard reminder emails made it worse: a customer with 17 past-due invoices got 17 separate emails, each with its own payment link.

I built three custom applications. A bulk-renewal Suitelet that lets the team select and renew subscriptions in batches instead of one by one. A lightweight CRM layer on native activity records, so choosing a value in a dropdown triggers the matching customer email automatically. And an automated past-due process that runs every weekday, aggregates each customer's open invoices into a single email with one payment link through their payment provider, replacing the one-email-per-invoice flood.

<p class="work-outcome">The reminder process ran unattended every weekday from launch, and the client kept all three applications in production after I rolled off.</p>
</div>
</div>

</div>
</section>

<section class="ms-section">
<div class="ms-wrap ms-principal">
<figure class="ms-portrait">
  <img src="./img/headshotnew.jpeg" alt="Patrick Olson, founder of MySuite">
  <figcaption><strong>Patrick Olson</strong><span>NetSuite Certified ERP Consultant, PMP</span></figcaption>
</figure>
<div class="ms-prose">

## Who does the work

I am Patrick Olson, and I do this work myself. Thirteen years in NetSuite: five of them running it from the inside as an administrator and application development manager, then several more delivering implementations inside NetSuite Solution Providers.

I scope the work and I do the work. There is no bench behind me and nothing is handed off.

NetSuite Certified ERP Consultant and Certified Administrator, plus SuiteAnalytics, ARM, Multi-Book and PMP.

<div class="ms-creds">
<div class="cert-badges cert-badges-5">
  <img src="./img/erpconsultant.png" alt="Certified ERP Consultant">
  <img src="./img/adminnew.jpg" alt="Certified Administrator">
  <img src="./img/foundnew.jpg" alt="SuiteFoundation">
  <img src="./img/finusernew.jpg" alt="Financial User">
  <img src="./img/analyticsnew.jpg" alt="SuiteAnalytics User">
</div>
</div>
</div>
</div>
</section>

<section class="ms-section ms-section--tint">
<div class="ms-wrap ms-rail">
<div>

## Frequently asked questions

</div>
<div class="ms-rail-body ms-faq">

### What NetSuite customization work do you take on?

SuiteScript and SuiteQL builds, reporting, data migration and integrations. Recent work includes a bulk-renewal Suitelet, an automated past-due process that sends each customer one email with one payment link, and a one-click export of purchase order lines to Excel.

### How is custom NetSuite work priced?

Fixed-fee, scoped to the work, with project management included. Scope comes out of a first conversation about what you need, and the quote follows from that.

### Which integration tools do you work with?

My integration work covers Celigo, Workato, Box, Concur and Salesforce. Before any integration is built, the direction, frequency, field mapping, middleware and ownership after go-live get written down.

### Do our SuiteScript 1.0 and 2.0 scripts have to be converted?

Yes, on one deadline. Oracle states that scripts using SuiteScript 1.0, 2.0 or 2.x will stop working in NetSuite 2028.2, and a script annotated 2.x is a 2.0 script. Not every script deserves converting, because some are inactive or duplicated and some can be replaced by native functionality.

### Can you work on scripts someone else wrote?

Usually. Objects deployed as ordinary account customizations can be edited. Code delivered in a managed bundle is controlled by the solution provider that published it and may be locked against editing in your account, so the first step is checking the Managed column in your installed bundle list.

### Is small work a project or part of a retainer?

Small scripts and fixes are part of fractional administration. Larger builds are quoted separately as fixed-fee projects, scoped to the work.

### Who writes the code?

I do. I scope the work and I do the work, and there are no juniors and no handoffs.

</div>
</div>
</section>

<section class="ms-section">
<div class="ms-wrap">
<div class="ms-section-head">

## Related reading

<div><a href="/blog/" class="ms-more">All articles</a></div>
</div>
<RelatedPosts tag="SuiteAnalytics" :pinned="['/blog/suitescript-2-1-migration', '/blog/netsuite-realtime-status-page', '/blog/netsuite-data-migration', '/blog/netsuite-switching-implementation-partners']" :limit="6" />
</div>
</section>

<section class="ms-section ms-section--tint ms-section--tight">
<div class="ms-wrap">
<div class="greenlight-service-card">
  <img src="./img/greenlogo.png" alt="Greenlight Software" class="greenlight-logo">
  <div class="greenlight-service-content">
    <h3>Greenlight Software</h3>
    <p>Native NetSuite apps for approvals and accounts payable, built by MySuite. Automated routing, budget checks, and bill entry, with every step human-approved and audit-ready.</p>
    <a href="https://greenlightsoftware.io" target="_blank" class="ms-more">greenlightsoftware.io</a>
  </div>
</div>
</div>
</section>

<ContactBand />
