---
layout: page
pageClass: commercial-page
title: "NetSuite Advanced Revenue Management (ARM) Support"
description: "Help with NetSuite Advanced Revenue Management after go-live: revenue plans, month-end journals, credit memos and fair value, traced to the cause."
faqSchema: true
---

<section class="ms-hero ms-hero--page">
<div class="ms-wrap">
<div class="ms-hero-copy">
<p class="ms-eyebrow">For accounts already live on ARM</p>

# NetSuite Advanced Revenue Management Support

<p class="ms-hero-lead">For finance teams whose revenue module is live and whose numbers are hard to explain. I trace a revenue plan, a journal or a deferred balance back to the setting that produced it, say what it would take to change, and write it down so your team can explain the number the next time someone asks.</p>
<div class="ms-actions">
  <a href="/contact/" class="cta-primary">Discuss your NetSuite needs</a>
  <a href="#areas" class="cta-secondary">See the four areas</a>
</div>
</div>
</div>
</section>

<section class="ms-section">
<div class="ms-wrap">
<div class="ms-prose ms-intro">

## Four questions finance teams ask once ARM is live {#areas}

These are the questions I hear after go-live. Each one can be traced, because Advanced Revenue Management keeps the rule, the dates and the fair value behind every number on the records themselves.

Often the system is doing what its settings tell it to do. The work is finding which setting, and then deciding whether the setting or the expectation should change.

</div>
<div class="ms-card-grid ms-card-grid--two">
  <div class="ms-compare">
    <h3>Why is it recognizing like this?</h3>
    <dl>
      <dt>What is behind it</dt>
      <dd>A plan is a rule applied to dates, and the rule decides which dates count. The default start date source is the revenue arrangement date, and unless a preference is changed that is the day NetSuite created the arrangement, which can be later than the order. Every eligible item that existed when ARM was enabled was given the Default Standard rule, which recognizes revenue as soon as the journal entries are created. Item settings are copied onto each sale when its arrangement is created, so correcting the item leaves the contracts already sold as they were.</dd>
      <dt>What I do</dt>
      <dd>For a contract you name, I trace the plan through the rule, the revenue element, the trigger and the dates, and show which one produced the schedule. Then I list the other contracts and items that share the same setup.</dd>
    </dl>
  </div>
  <div class="ms-compare">
    <h3>Why are the journals all over the place?</h3>
    <dl>
      <dt>What is behind it</dt>
      <dd>One month is built to produce several kinds of journal. Revenue recognition journal entries come first. Reclassification then creates up to five adjustment journal entries, and it reverses the prior unbilled receivable adjustment before booking the current one, so a reversal followed by a fresh entry is normal. A journal aimed at a closed or locked period posts to a different period than the plan shows.</dd>
      <dt>What I do</dt>
      <dd>I map each journal type to the process that created it and the contract behind it, and write down the month-end sequence in the order Oracle requires: recognition first, then reclassification. When the deferred revenue balance is in question, I start from the waterfall and rollforward reports, which Oracle says tie directly to the general ledger.</dd>
    </dl>
  </div>
  <div class="ms-compare">
    <h3>How do credits affect revenue?</h3>
    <dl>
      <dt>What is behind it</dt>
      <dd>A credit memo created from an invoice gets a revenue arrangement of its own, holding a negative element. The original arrangement is linked to it only when someone merges the two. For returns, Oracle's instruction is to use a return authorization and then merge the positive and negative arrangements. In Oracle's own example, merging a partial return changes the revenue on the items that were not returned.</dd>
      <dt>What I do</dt>
      <dd>I find the credit and return arrangements that were never merged and work out what each one is doing to revenue and to the deferred balance. Then I write the procedure your team follows the next time: which transaction to use, when to merge, and what to update before close.</dd>
    </dl>
  </div>
  <div class="ms-compare">
    <h3>Is the fair value formula doing what we think?</h3>
    <dl>
      <dt>What is behind it</dt>
      <dd>Allocation follows the fair value price list, and a gap in the list can go unnoticed. When no price record matches a line, the result depends on one accounting preference: allocation fails with an error, or NetSuite uses the sales price as the fair value and raises no error. Range checking is on by default, and under the Boundary policy a sales amount inside the range is used in place of the formula result. Oracle states that changes to the price list do not affect existing revenue elements and arrangements.</dd>
      <dt>What I do</dt>
      <dd>I check the price list for coverage by item, date and dimension, find the arrangements where the sales price stood in for a fair value, and compare each formula with the result it produces on real lines.</dd>
    </dl>
  </div>
</div>
</div>
</section>

<section class="ms-section ms-section--tint">
<div class="ms-wrap ms-split ms-split--lead">
<div class="ms-prose">

## Where this work starts and stops {#scope}

I work on accounts where Advanced Revenue Management is already live.

I do not implement it. Implementing ARM, and moving an account from classic revenue recognition to ARM, is work for NetSuite or a NetSuite partner. If that is where you are, I can sit on your side of the project while they build it, which is the role described under [implementation support](/netsuite-implementation-support).

On a live account, the accounting decisions are not mine either. I can show you what the system did, why it did it, and what each option would change. Which standalone selling prices to use, how to treat a contract modification, and whether to change a preference that cannot be changed back are decisions for you and your auditors.

</div>
<div class="ms-panel">
  <h3>What you get back</h3>
  <ul class="ms-checks">
    <li>The cause of each number you asked about, traced to the record that produced it</li>
    <li>The Oracle documentation for the behavior, so the explanation does not rest on my word</li>
    <li>A list of the other contracts or items affected by the same setup</li>
    <li>A written month-end sequence and credit procedure, where those are the gap</li>
  </ul>
  <p>Changes to your configuration are made only after you have agreed to them.</p>
</div>
</div>
</section>

<section class="ms-section">
<div class="ms-wrap">
<div class="ms-prose ms-intro">

## How the work starts {#how-it-starts}

It starts with one number nobody can explain. A question that specific is quicker to answer than a general review, and the answer shows whether the cause is one contract or a setting that touches many.

</div>
<div class="ms-steps">
  <div class="ms-step">
    <h3>Pick the number</h3>
    <p>A contract that recognized on the wrong dates, a month where the journals do not make sense, a credit nobody can find in revenue, or a deferred balance that does not match the waterfall.</p>
  </div>
  <div class="ms-step">
    <h3>Trace it</h3>
    <p>I read the arrangement, the elements, the plans and the journals in your account, in the order NetSuite created them.</p>
  </div>
  <div class="ms-step">
    <h3>Write it down</h3>
    <p>You get the cause, the Oracle documentation behind it, and the options: change the setup, change the procedure, or leave it and explain it.</p>
  </div>
  <div class="ms-step">
    <h3>Fix what you approve</h3>
    <p>A defined review or cleanup is quoted as a fixed fee, scoped to the work. Ongoing help through month-end sits inside <a href="/fractional-netsuite-administrator">fractional administration</a>, priced by the month.</p>
  </div>
</div>
</div>
</section>

<section class="ms-section ms-section--tint">
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

<section class="ms-section">
<div class="ms-wrap ms-rail">
<div>

## Frequently asked questions

</div>
<div class="ms-rail-body ms-faq">

### What is NetSuite Advanced Revenue Management?

Advanced Revenue Management, or ARM, is the NetSuite feature set for revenue recognition, and it supports ASC 606 and IFRS 15. Each sale produces a revenue arrangement with a revenue element for each performance obligation, such as a line on the sale. Revenue is allocated across the elements by fair value, and each element is recognized on a plan built from a revenue recognition rule.

### Do you implement Advanced Revenue Management?

No. Implementing ARM is work for NetSuite or a NetSuite partner. I work on accounts where it is already live, and during an implementation I can work on your side of the project alongside the partner.

### Why does NetSuite start recognizing revenue on a different date than the sales order?

The default start date source on a revenue recognition rule is the revenue arrangement date. Unless the preference Use Transaction Date as Revenue Arrangement Date is checked, that date is the system date when NetSuite created the arrangement, which can be later than the date on the order.

### Why did changing the item not change how existing contracts recognize?

Item settings are copied to the revenue element when the arrangement is created. Oracle states that item configuration changes do not affect revenue elements created before the change, so each existing sale has to be corrected on its own records.

### Does a credit memo reduce the original revenue arrangement?

Not by itself. A credit memo created from an invoice gets its own revenue arrangement with a negative element. The negative element is linked to the original sale only when the two arrangements are merged.

### Why does ARM create so many journal entries each month?

Month-end runs more than one process. Revenue recognition journal entries post first. The reclassification process then creates up to five adjustment journal entries, and it reverses the prior unbilled receivable adjustment before booking the current one. Each subsidiary and accounting book is processed separately.

### What happens when an item has no fair value price?

It depends on the accounting preference Use Sales Price as Fair Value. When it is checked, NetSuite uses the sales price as the fair value and no error appears. When it is clear, allocation fails with an error and the arrangement is not compliant, which keeps it out of reclassification until it is fixed.

### How is ARM work priced?

A defined review or cleanup is quoted as a fixed fee, scoped to the work. Ongoing help through month-end is part of fractional administration, which is priced by the month. Scope comes out of a first conversation about your account.

</div>
</div>
</section>

<section class="ms-section ms-section--tint">
<div class="ms-wrap">
<div class="ms-section-head">

## Related reading

<div><a href="/blog/" class="ms-more">All articles</a></div>
</div>
<RelatedPosts tag="Revenue" :pinned="['/blog/netsuite-month-end-close', '/blog/netsuite-books-go-wrong', '/blog/netsuite-saved-search-gl-mismatch']" :limit="6" />
</div>
</section>

<ContactBand />
