---
title: "NetSuite Go-Live Readiness Checklist"
date: 2026-07-06
description: "A practitioner checklist for NetSuite go-live readiness: data migration, testing, cutover, security, hypercare, and the go/no-go decision before launch."
tags: ["Implementation", "Advisory", "GoLive"]
faqSchema: true
---

# The NetSuite Go-Live Readiness Checklist

[[toc]]

Go-live is not a date on a Gantt chart. It is a decision, and the date is just when you plan to make it. The mistake I see over and over is treating the date as fixed and the readiness as something that will sort itself out on the way there. It works the other way around. You earn the date by proving you are ready, and the proof is specific: reconciled data, signed-off tests, a rehearsed cutover, trained users, and a support plan that outlives the partner.

This is the checklist I work through with a client in the weeks before a NetSuite launch. It draws on how NetSuite implementations actually run and on the go-live discipline that any serious ERP or IT project uses, because the failure modes are the same whether the logo on the software says NetSuite, SAP, or Dynamics. Use it to pressure-test where you really are, not where the status dashboard says you are.

A note on who this is for: it is written for the person on the customer's side who has to stand behind the launch, the sponsor, the finance or ops lead, the internal project owner. Your partner has their own cutover checklist. This one is yours.

## The readiness-gate mindset

Before the items, the mindset, because it changes how you read every line below.

**Readiness is evidence, not opinion.** "Data migration is basically done" is an opinion. "We ran three full mock loads, the last one reconciled to the source system within tolerance, and the controller signed the reconciliation" is evidence. Every item on this list should resolve to an artifact you could hand to an auditor: a signed test result, a reconciliation, a runbook, a sign-off. If the only proof you have is that the partner sounded confident on the status call, you do not have proof.

**Every item has one accountable owner.** Not a team, a person. "Finance owns the close test" becomes "the controller owns the close test and signs it." Shared ownership is how items fall through the cracks in the last two weeks.

**Readiness is a gate, and gates have governance.** A real go-live has at least three checkpoints: a readiness-trending review a few weeks out (are we on track, what is the risk list), a go-live recommendation after the final rehearsal, and a formal go/no-go at cutover. Someone named makes the call at each one. I cover the governance in the last section, but keep it in mind as you read: each dimension below feeds that decision.

The rest of this piece is organized as nine readiness dimensions. Work each one, then use the consolidated [printable checklist](#the-printable-checklist) at the end to run your own review.

## 1. Data migration and reconciliation

Data is the dimension that sinks the most go-lives, and it sinks them quietly. The system works fine in the demo because the demo data is clean. Your data is not clean, and you find that out at the worst possible time unless you have been loading it for weeks.

Load master data in dependency order or the loads fail on reference errors: chart of accounts, then currencies and tax, then subsidiaries, locations, departments, and classes, then entities (customers, vendors, employees), then items, then open transactions, and finally opening balances. Get that order wrong and you spend a day chasing broken references instead of validating data.

The single most important practice here is the mock load. Do not plan to migrate once, on cutover weekend, and hope. Run the full migration end to end multiple times before go-live. Each dry run tells you three things: whether the data is clean, whether your scripts and mappings are right, and whether the whole load actually fits inside your cutover window. A load that takes 40 hours does not fit in a weekend, and you want to learn that in a rehearsal, not live. I wrote more about why migration belongs early, not late, in the [data migration piece](/blog/netsuite-data-migration).

Then reconcile. The last mock load should tie back to the source system: record counts match, control totals match, opening balances match the trial balance you are carrying over. The person who signs that reconciliation is the controller or equivalent, because they are the one who has to trust the numbers on day one.

**Ready when:** master data loads clean in order, you have run at least two or three full mock loads, the final load reconciles to source within an agreed tolerance, open items and balances are validated, and finance has signed the reconciliation.

## 2. Configuration and solution scope

You cannot certify a system as ready if the definition of the system is still moving. Scope creep in the final weeks is one of the surest signs a launch is about to hurt.

The scope going live should be frozen, written down, and agreed by stakeholders. That means no open change orders that alter go-live behavior, and a clear, shared answer to "what is in this launch and what is explicitly phase two." Everything in scope traces back to what you signed. If you have not already, this is the moment the [SOW you signed](/blog/netsuite-sow-before-you-sign) earns its keep, because it is the reference for what "done" means.

On the build itself: every customization, script, and workflow that is in scope is deployed and working in the environment you will go live from, not sitting in a developer's sandbox. Saved searches, reports, forms, KPIs, and dashboards that the business needs on day one are built and tested. Roles exist for every job function that will log in Monday morning.

**Ready when:** scope is frozen and signed, no open change orders affect go-live, all in-scope customizations and workflows are deployed, and the reports, forms, and dashboards users need on day one exist and work.

## 3. Testing: UAT, SIT, and performance

Testing is where "configured" turns into "accepted," and those are not the same thing. A partner who says the build is done means it is configured. It is not done until your people have run it, tried to break it, and signed off.

Three kinds of testing matter before a launch, and each needs its own exit criteria and sign-off:

**User acceptance testing (UAT)** validates that the system supports the real business processes end to end: order to cash, procure to pay, record to report. Test the happy path and the edge cases, the weird return, the split shipment, the credit hold, the multi-currency invoice. Critically, run UAT against migrated data, not hand-built test records, because that is the only way to see how the data behaves in real life. And run it with users in their real, least-privilege roles, not as an administrator, or you will not catch the permission gaps until a user hits them live.

**System integration testing (SIT)** validates that NetSuite works with everything it touches. More on integrations in the next dimension, but the testing point is: prove the interfaces work at volume and prove they fail gracefully when the other side is down.

**Performance testing** validates that the system holds up under your real load. Test the searches, reports, and processes your team runs constantly, at peak volume, on the devices and browsers they actually use. A saved search that returns in two seconds with test data can time out against a full production dataset.

The discipline that ties these together: every cycle has documented exit criteria, and the business signs off that they were met. Open defects get an owner and a date, and you make a conscious call on which ones can go live open and which are blockers. "We are still finding new issues every day" is not a state you launch from.

**Ready when:** UAT, SIT, and performance testing are complete against migrated data with real roles, exit criteria are met and signed off by the business, and every remaining defect has an owner, a date, and a deliberate go or no-go decision.

## 4. Integrations and external dependencies

Integrations are where go-lives break on day one in ways nobody rehearsed, because the failure is usually on the other side of the connection.

Every integration in scope, the shipping system, the bank feed, the tax engine, the CRM, the EDI connection, the 3PL, is tested with real data at expected peak volume. But testing the happy path is not enough. The question that separates a smooth launch from a bad one is: what happens when the other system is down or slow? Does the error get caught, queued, and retried, or does it silently drop a transaction? Does someone get alerted, or do you find out at month-end that three days of orders never came through? Simulate the failure and watch how the system and your people respond.

The other half of this dimension is external dependencies you do not control. If a partner system, a vendor, or a service provider has to be ready on your timeline, confirm it in writing, not in a hallway. Their go-live has to line up with yours. I have seen a launch held up because a bank needed six weeks to provision a production feed and nobody asked until week five.

**Ready when:** every integration is tested at volume with error handling and alerting proven, failure scenarios are rehearsed, and all external providers have confirmed their readiness against your timeline.

## 5. Security, roles, and access

This dimension gets skipped because it is boring right up until it is a control failure. Two things go wrong: users get too much access, or users get the wrong access, and both bite on day one.

Assign least-privilege roles. The anti-pattern I see constantly is giving everyone administrator or a broad generic role to "avoid access issues during go-live." That is how you end up with an AP clerk who can edit the chart of accounts and an auditor asking who approved that. Roles should match job functions, and UAT should have been run in those roles precisely so you know they work.

Check segregation of duties before you launch, not after an auditor flags it. The person who enters a vendor should not be the person who approves the payment. NetSuite's native roles get you part of the way, and where they stop is worth understanding before go-live rather than after; I broke down [where the native SoD tooling stops](/blog/netsuite-segregation-of-duties) separately. And verify approval routing actually works end to end, across every subsidiary and every threshold, because approval chains that pass a single-entity test often fall apart across a multi-entity structure. The mechanics of that are in the piece on [what SuiteFlow can and cannot do](/blog/netsuite-approval-workflows).

::: tip Approvals that have to hold up to an audit
If your go-live has to prove that approvals and segregation of duties are actually enforced, not just documented, native routing will only take you so far. [Greenlight Approvals](https://greenlightapprovals.io) is built to enforce and evidence approval controls in NetSuite, which is exactly what an auditor asks you to show after go-live.
:::

**Ready when:** every user has a least-privilege role that matches their job, segregation of duties is checked against your key controls, and approval routing is verified end to end across all subsidiaries and thresholds.

## 6. The cutover runbook

The cutover is the few days when you take the old system down, move the data, stand the new one up, and turn it on. It is the highest-risk window of the whole project, and it should be the most rehearsed. A cutover plan is not a date. It is a runbook.

A real runbook is a sequenced list of every task from "freeze the legacy system" to "first live transaction," and for each task it names the owner, the start and end time, the exact steps, and the verification that it worked. It includes the system freeze, when do we stop transacting in the old system, and the blackout window, the period when neither system is fully live and everyone knows it. It includes rollback triggers: the specific, pre-agreed conditions under which you abort and go back to the old system, decided in advance and in daylight, not invented at 2am on Sunday when adrenaline is running.

And then you rehearse it. A dress rehearsal, or mock cutover, runs the whole runbook against a copy, with the real people who will do it live, timed. The rehearsal is where you find out that step 14 depends on step 22, that the load takes six hours longer than you budgeted, and that the one person who knows how to run the tax update is on vacation that weekend. Better to find all of that in the rehearsal.

**Ready when:** you have a sequenced runbook with an owner, timing, and verification for every task, defined freeze and blackout windows, pre-agreed rollback triggers, and at least one timed dress rehearsal with the actual cutover team.

## 7. Training and change management

A technically perfect system that people will not use is a failed go-live. The human side of readiness is as real as the data side, and it is more often neglected.

Role-based training should be done, and done close enough to go-live that people still remember it, but with enough runway that they are not learning the system for the first time during their first real transaction. Train on the workflows they will actually use, in the roles they will actually have. Identify super-users, the people on each team who know the system a bit better and become the first line of "how do I do this," so every question does not route to the help desk. Have quick-reference guides ready for the processes people run constantly.

Underneath the training is change management: executive sponsorship that visibly backs the launch, communication so nobody is surprised by the date, and a channel for people to raise concerns. Readiness here is not "we ran a training session." It is "the people who have to live in this system on Monday know how, know why, and know where to get help."

**Ready when:** role-based training is complete and recent, super-users are named, quick-reference materials exist, and leadership has visibly communicated the change and the support path.

## 8. Support and hypercare

The most dangerous assumption on any go-live is that the partner staying for a few weeks means you are covered. Hypercare is a safety net for go-live bugs. It is not a transfer of ownership, and the gap between the two is what I have called [the post-go-live cliff](/blog/post-go-live-cliff).

Plan hypercare deliberately: who is on the support team, what hours they cover, how issues get logged, triaged, and escalated, and how severity is defined so a broken invoice run gets a different response than a cosmetic complaint. The intense coverage typically runs the first 48 to 72 hours hardest, then an elevated level for two to four weeks. But the piece people forget is the exit criteria: hypercare should end when incident volume has dropped below an agreed threshold and stabilized, not when the calendar hits an arbitrary date and the consultants roll to the next project.

The deeper readiness question is what happens after hypercare. Someone on your side has to own this system operationally, and the time to have that person in place is before go-live, overlapping with the partner while the knowledge is still in the room. That is the whole argument for having [a client-side resource](/blog/netsuite-client-side-resource) who carries the context forward. If you do not have that plan, you are not ready to launch. You are ready to start a countdown to a crisis.

**Ready when:** hypercare is staffed with defined hours, triage, severity levels, and escalation, exit criteria are agreed, monitoring is in place, and there is a named owner for the system after the partner leaves.

## 9. The go/no-go decision

All of the above feeds one decision, and the decision deserves its own structure. Too many launches turn go/no-go into a vibe check on a Friday call. Make it a governed gate instead.

Run it as a sequence of checkpoints. A readiness-trending review a few weeks out looks at the risk list and asks whether the trend line gets you to green in time. A go-live recommendation checkpoint after the final dress rehearsal turns the rehearsal result into a recommendation. And a final go/no-go at cutover is the last, formal call. At each one, the criteria are the dimensions above, and a named decision-maker owns the call. Write down who that is before you get to the moment, because "everyone and no one decided" is how projects go live in denial.

Two things make the decision honest. First, the criteria are agreed in advance, so you are measuring against a standard, not rationalizing to a date. Second, you keep the rollback plan on the table right up to the last checkpoint. A go/no-go where "no-go" was never really an option is not a decision, it is a formality, and formalities are where avoidable disasters hide.

**Ready when:** checkpoints are scheduled, decision-makers are named, go/no-go criteria are agreed in advance, and a rollback plan is live and credible through the final checkpoint.

## The printable checklist

Here is the whole thing in one place. Print it, take it into your readiness review, and mark each line honestly. If you cannot point to the evidence, the item is not done.

<div class="golive-checklist">

**1. Data migration and reconciliation**

- Master data loaded in dependency order (accounts, currencies, tax, subsidiaries and locations, entities, items, open transactions, opening balances)
- At least two or three full mock loads run end to end
- Final load fits inside the cutover window
- Final load reconciles to the source system within agreed tolerance
- Open items and opening balances validated
- Finance has signed the reconciliation

**2. Configuration and solution scope**

- Go-live scope frozen, documented, and agreed
- No open change orders that affect go-live behavior
- Phase-two items explicitly named and deferred
- All in-scope customizations, scripts, and workflows deployed in the go-live environment
- Day-one reports, saved searches, forms, and dashboards built and tested
- A role exists for every job function that logs in on day one

**3. Testing: UAT, SIT, and performance**

- UAT covers end-to-end processes, happy path and edge cases
- UAT run against migrated data, in real least-privilege roles
- System integration testing complete, including failure scenarios
- Performance tested at peak volume on real devices and browsers
- Every test cycle has documented exit criteria, met and signed off
- Every open defect has an owner, a date, and a deliberate go or no-go call

**4. Integrations and external dependencies**

- Every integration tested with real data at peak volume
- Error handling, queuing, and alerting proven
- Down-system and slow-system failure scenarios rehearsed
- All external providers have confirmed readiness against your timeline in writing

**5. Security, roles, and access**

- Least-privilege roles assigned, no blanket admin access
- Segregation of duties checked against key controls
- Approval routing verified end to end across all subsidiaries and thresholds

**6. The cutover runbook**

- Sequenced runbook with owner, timing, steps, and verification for every task
- System freeze and blackout windows defined and communicated
- Rollback triggers pre-agreed
- At least one timed dress rehearsal completed with the real cutover team

**7. Training and change management**

- Role-based training complete and recent
- Super-users identified on each team
- Quick-reference guides ready for high-frequency processes
- Executive sponsorship and change communication delivered

**8. Support and hypercare**

- Hypercare staffed with defined hours, triage, severity levels, and escalation
- Monitoring in place
- Hypercare exit criteria agreed (based on incident volume, not the calendar)
- A named owner for the system after the partner rolls off

**9. The go/no-go decision**

- Readiness, recommendation, and final go/no-go checkpoints scheduled
- Decision-makers named for each checkpoint
- Go/no-go criteria agreed in advance
- Rollback plan credible through the final checkpoint

</div>

<ChecklistCTA />

## Frequently Asked Questions

### How far before go-live should we start readiness checks?

Readiness is not a task you start near the end, it is a lens you apply from the beginning. In practice, formal go-live planning should begin 8 to 12 weeks before the target date, because that is the runway you need for multiple mock data loads, full testing cycles, a cutover rehearsal, and stakeholder sign-offs. Data migration in particular should start much earlier than that. If you are a few weeks out and still discovering what is not done, the date is the thing that has to move.

### What is the difference between a go-live readiness checklist and a cutover plan?

They are related but not the same. The readiness checklist assesses whether the whole solution is ready to launch across every dimension: data, configuration, testing, integrations, security, training, and support. The cutover plan is one specific piece of that: the sequenced runbook of steps to move from the old system to the new one over the launch window. Readiness is the go or no-go question. The cutover plan is how you execute once the answer is go.

### Who signs off on the go/no-go decision?

A named decision-maker, agreed in advance, usually the executive sponsor or a steering committee, not the implementation partner. The partner recommends, but the customer owns the call, because the customer lives with the result. The healthiest setup has each readiness dimension signed off by its owner, for example finance signs the data reconciliation, and those sign-offs roll up into the final go/no-go.

### What is hypercare and how long should it last?

Hypercare is the period of elevated support right after go-live, when issues get triaged and resolved fast to stabilize operations. Coverage is heaviest in the first 48 to 72 hours and then runs at an elevated level for two to four weeks for most implementations. The important part is the exit: hypercare should end when incident volume has dropped below an agreed threshold and stabilized, not when a fixed number of weeks is up. And hypercare is not a substitute for owning the system, someone on your side needs to carry it forward.

### Can we go live with open issues?

Almost always, yes, but only deliberately. No launch happens with a completely empty defect list. The discipline is to triage: separate the issues that are true blockers, meaning they break a critical business process or a control, from the ones that are cosmetic or have a workaround. Blockers stop the launch. Everything else goes live with an owner and a fix date. What you do not do is go live without knowing which is which.

<ConsultingCTA message="Staring down a NetSuite go-live? I help companies pressure-test their readiness and cutover plan before they commit to the go/no-go, so launch day is a decision you have earned, not a date you are hoping survives contact with reality." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
7/6/2026

<TagLinks />
