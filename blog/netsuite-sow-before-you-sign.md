---
title: "What to Look for in Your NetSuite SOW Before You Sign It"
date: 2026-05-19
description: "The NetSuite order form and implementation SOW are two contracts that most companies treat as separate decisions. They aren't. Here's what to look for before you sign either one."
tags: ["Admin", "Implementation", "Advisory"]
---

# What to Look for in Your NetSuite SOW Before You Sign It

[[toc]]

---

## Two Contracts, One Decision

Most companies going through a NetSuite implementation are signing two things at roughly the same time. The first is the NetSuite subscription order form. That is the contract with Oracle that determines which modules you get, how many user licenses you have, and what you pay annually. The second is the Statement of Work with your implementation partner. That contract defines what gets built, how long it takes, and what it costs.

These are treated as separate decisions. They are not.

The modules you bought determine what the partner has to configure. The user count you agreed to determines your ongoing cost structure. The discount you accepted in year one determines what renewal looks like in year three. And the SOW your partner wrote is shaped entirely by what NetSuite already sold you, including things you may not need.

Before you sign either document, someone on your team needs to read both of them together with a critical eye. Not a skim. Not a "legal reviewed it." A line-by-line read by someone who understands what these things actually mean in practice.

## Do You Actually Need What You Are Being Sold?

This is the question nobody on the sell side wants you to ask.

NetSuite is sold through a combination of Oracle's internal sales team and a network of resellers (Solution Providers). Both sides have incentives to sell you more modules. Oracle's internal reps have quotas. Resellers are rated on a star system where 5-star partners get better leads, better margins, and better positioning with Oracle. That rating is tied partly to sales volume.

What matters to you: returning a module you already bought hurts both sides. The reseller loses standing. The Oracle rep takes a hit. Nobody is going to proactively tell you that you bought something you do not need. And once the implementation partner starts configuring it, you are now paying twice: once for the license and once for the build.

I have worked with clients who realized mid-implementation that they purchased Advanced Procurement and did not need it. Standard purchasing covered their requirements. But by the time someone raised the question, the partner had already scoped configuration hours against it and the reseller had no interest in processing a return.

Before you sign the order form, challenge every module on it:

- **Do we have a business process today that requires this?** Not "could we use this someday." Today.
- **What does the base platform already do?** NetSuite's standard functionality is broad. Modules like Advanced Procurement, SuiteBilling, and Advanced Revenue Management solve real problems, but only if you have those problems.
- **What happens if we remove this module?** Ask the reseller directly. Watch how they respond. If they push back hard without a clear business justification, that tells you something about whose interests they are protecting.

The time to have this conversation is before the order form is signed. After that, you are fighting uphill.

## User Licenses Are More Expensive Than You Think

NetSuite has two main license types: Full Access and Employee Center.

A Full Access license is what most people think of as a "NetSuite user." They can run transactions, pull reports, build saved searches, approve records, and access any functionality their role allows. These run roughly $99 to $199 per user per month depending on your contract.

An Employee Center license costs a fraction of that, around $10 to $25 per user per month, typically sold in packs of five. These users can submit time and expenses, enter and approve purchase orders, and approve vendor bills. That is it. They cannot access financial reports, run saved searches, or do anything that resembles administration.

The mistake I see repeatedly: companies buy full licenses for users who only need Employee Center access. Someone in operations who only approves POs. A project manager who only submits time. A department head who only approves expense reports. Each one of those is a full license at 5 to 10 times the cost of what they actually need.

The catch is that if you assign a user any standard NetSuite role (accountant, sales rep, operations manager, anything beyond Employee Center), that user consumes a full license even if they also have the Employee Center role. The licensing is driven by the highest-permission role assigned. So you cannot split the difference. Either someone is an Employee Center user or they are a full user. There is nothing in between.

Before you sign the order form, build a simple user list:

| Name / Role | What they actually do in NetSuite | Full or Employee Center? |
|---|---|---|
| AP Clerk | Enters bills, runs AP reports | Full |
| Warehouse Manager | Approves POs, checks inventory | Full |
| Department Head | Approves expense reports | Employee Center |
| Project Manager | Submits time entries | Employee Center |

Do this exercise before the sales cycle ends. Every full license you convert to Employee Center saves you $1,000 to $2,000 per year, per user. On a 50-person company, the difference between getting this right and getting it wrong can be $30,000 to $50,000 annually.

## The Discount Disappears

NetSuite's initial pricing almost always includes a discount. 20%, 30%, sometimes more. It makes the year-one math work. The problem is what happens at renewal.

Those discounts are typically structured to expire. Your contract might say "30% discount for the initial term." When the initial term ends (usually after one or three years), the discount goes away and you renew at list price. Some contracts include automatic annual uplift clauses of 5% to 10% on top of that.

The result is predictable and consistently surprises clients who did not read the fine print. A company paying $60,000 in year one gets a renewal quote for $90,000 or more. Modules that were bundled as "incentives" during the sale reappear as separate line items at full price.

What to negotiate before you sign:

- **Discount preservation.** Get the year-one discount written into the renewal terms, not just the initial term.
- **Annual increase caps.** If the contract allows price increases at renewal, cap them. 3% to 5% is reasonable. Without a cap, you have no leverage.
- **Module-level pricing.** Make sure every module has its own line item with its own price. Bundled pricing makes it impossible to drop something later without renegotiating the entire contract.
- **Renewal notification window.** Know when your renewal date is and start the conversation 120 days out. If you wait until 30 days before expiration, you are negotiating from weakness.

None of this is secret. It is just not something the sales team volunteers. Your CFO should see the three-year and five-year cost projection, not just the year-one number.

## The Sales Team and the Delivery Team Are Different People

This one catches companies off guard more than anything else.

The sales engineers, account executives, and demo team who sell you NetSuite are not the people who implement it. The sales team's job is to close the deal. They run impressive demos, answer questions confidently, and tell you what the system can do. Some of what they say is accurate. Some of it is aspirational. Some of it is technically possible but would require custom development that is not in anyone's SOW.

When the implementation partner shows up for kickoff, they work off the Statement of Work. Not the demo. Not the sales call notes. Not the email where the account executive said "yes, the system handles that natively." If it is not in the SOW, it does not exist in the project scope.

I have seen this play out with specific features. A sales engineer demonstrates a complex approval routing during a demo. The client assumes that is included. The SOW says "configure standard approval workflows." When the partner's consultant starts the build, they configure a basic approval chain. The client says "that is not what we were shown." The partner says "that is what the SOW says." The client either lives with it or pays for a change order.

The fix is simple but requires discipline: after every sales demo, write down the specific capabilities that were shown. Before you sign the SOW, map those capabilities against the SOW deliverables. Anything that was demonstrated but is not explicitly described in the SOW needs to be added or acknowledged as out of scope. Do this before kickoff, not during UAT when it is too late.

## What the SOW Should Say and Usually Does Not

I covered the dynamics of working with a partner once the project starts in [managing your implementation partner](/blog/managing-your-implementation-partner). But a lot of the problems that surface during the implementation are baked into the SOW before day one.

### Data Migration

Every SOW includes data migration. Almost none of them define it with enough specificity. The questions that need answers in writing:

- How many test loads are included before go-live?
- Who is responsible for data cleansing? Your team or the partner?
- What is the validation process for each load?
- What happens when a load fails? Is the rework billable?
- Which historical data is in scope? All transactions or only open ones? How far back?
- Are custom records and custom fields included in the migration mapping?

"Data migration" as a two-word line item in a SOW is not a deliverable. It is a placeholder for a conversation nobody has had yet.

### Integrations

"Integration with [system]" tells you almost nothing. Is data flowing one direction or both? Real-time or on a schedule? Who builds the middleware? The partner, a third party, or your team? Who owns it after go-live? Is there a field mapping document, or is the consultant going to figure it out during build and hope it matches what your other system expects?

If your SOW says "integrate NetSuite with Salesforce" and nothing else, you are going to end up in a change order discussion about every one of those questions. Get the specifics written down: direction, frequency, field mapping, error handling, middleware platform (Celigo, Workato, custom), and who maintains it after the partner leaves.

### Training

Training is the deliverable most likely to be vague and the first one your team will notice was inadequate. Look for:

- Number of sessions and hours
- Role-based or generic overview?
- Recorded or live only?
- Who attends? Power users, all users, admins?
- Is train-the-trainer included?
- Are training materials (written guides, not just recordings) a deliverable?

A single two-hour "NetSuite overview" session is not training. It is a demo your team already saw during the sales cycle. If the SOW does not spell out role-based training for the people who will actually use the system every day, add it.

### Post-Go-Live Support (Hypercare)

The weeks right after go-live are brutal. The system is live, real transactions are flowing, and your team is using it for the first time under pressure. The SOW should define:

- Duration of post-go-live support (two weeks? four? eight?)
- Hours per week committed
- Response time for issues
- Severity levels and escalation paths
- What is included vs. what becomes billable

If hypercare is a single line item that says "two weeks of post-go-live support," ask what that means in practice. Two weeks of dedicated support is very different from two weeks of "email us if something breaks."

I wrote about what happens when this period ends and the partner rolls off in [the post-go-live cliff](/blog/post-go-live-cliff). The quality of your hypercare terms determines how hard that cliff hits.

### Documentation

This is the deliverable most often missing entirely. Not vague. Just absent.

After the partner rolls off, your team needs to know why configurations were built the way they were, how the scripts and workflows function, what the integration architecture looks like, and where to go when something breaks. That knowledge lives in the heads of the consultants who built it. Unless someone writes it down, it walks out the door with them.

If documentation is not a named deliverable in the SOW with a defined format and handoff date, you will not get it. Partners do not write documentation for fun. If you do not pay for it, it does not exist, and your team inherits a system they cannot explain to an auditor or a new hire.

## Get It in Writing Before Kickoff

Everything in this post comes down to one principle: if it is not written down, it does not exist.

Verbal agreements from the sales cycle do not survive the handoff to the delivery team. Assumptions about what "standard" means will be interpreted in the partner's favor, not yours. Module purchases that made sense during a demo will cost you for years if nobody asks whether you actually need them.

The time to ask these questions is before you sign. Not because your partner is acting in bad faith. Most are not. But because their incentives and your incentives are not identical, and the contract is the only place where that gap gets closed.

Have someone on your side read both contracts. Not your lawyer. Someone who understands what a NetSuite implementation actually involves. Someone who knows what "configure order-to-cash" means in practice and can tell you whether the SOW matches what your business actually needs.

That is the job I do. But whether it is me or someone else, do not sign without it.

---

<ConsultingCTA message="I review NetSuite SOWs and order forms before you sign them. If you want someone on your side of the table reading the fine print, let's talk." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
5/19/2026

<TagLinks />
