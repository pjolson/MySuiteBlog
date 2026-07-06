---
title: "NetSuite Go-Live Readiness Checklist"
date: 2026-07-06
description: "A practitioner checklist for NetSuite go-live readiness: data migration, testing, cutover, security, hypercare, and the go/no-go decision before launch."
tags: ["Implementation", "Advisory", "GoLive"]
faqSchema: true
---

# The NetSuite Go-Live Readiness Checklist

[[toc]]

Go-live gets treated like a finish line on a schedule. It's really a decision, and the date is just when you've committed to making it. The mistake I run into over and over is treating the date as fixed and readiness as something that'll sort itself out on the way there. It works the other way around. You earn the date by proving you're ready, and the proof is specific: reconciled data, signed-off tests, a rehearsed cutover, trained users, and a plan for support that outlives the partner.

This is the checklist I work through with a client in the weeks before a NetSuite launch. Some of it is NetSuite-specific. A lot of it is just the go-live discipline any serious ERP project runs on, because the ways a launch goes wrong don't change much whether the logo says NetSuite, SAP, or Dynamics. Use it to pressure-test where you actually are, not where the status dashboard says you are.

One note on who this is for. It's written for the person on the customer's side who has to stand behind the launch: the sponsor, the finance or ops lead, the internal project owner. Your partner has their own cutover checklist. This one is yours.

## The readiness-gate mindset

Before the checklist itself, the mindset behind it, because it changes how you read every line.

**Readiness is evidence, not opinion.** "Data migration is basically done" is an opinion. "We ran three full mock loads, the last one tied out to the source system within tolerance, and the controller signed the reconciliation" is evidence. Every item here should boil down to something you could hand an auditor: a signed test result, a reconciliation, a runbook, a sign-off. If the only thing propping up a green status is that the partner sounded confident on the call, you've got nothing.

**Every item has one owner.** Not a team. A person. "Finance owns the close test" becomes "the controller owns the close test and signs it." Shared ownership is how things slip through the cracks in the last two weeks, when everyone assumes someone else has it.

**Readiness is a gate, and gates need governance.** A real go-live has checkpoints, not one nervous Friday call. Someone named makes the decision at each one. I get into how that works in the last section, but carry it with you as you read, because every dimension below feeds that one call.

Nine dimensions follow. Work each one, then take the [printable checklist](#the-printable-checklist) at the end into your own readiness review.

## 1. Data migration and reconciliation

Data sinks more go-lives than anything else, and it does it quietly. The system looks great in the demo because the demo data is clean. Yours isn't. You find that out at the worst possible moment unless you've been loading it for weeks.

Order matters. Load master data by dependency or the loads fail on broken references: chart of accounts, then currencies and tax, then subsidiaries, locations, departments, and classes, then your entities, then items, then open transactions, and opening balances last. Get the order wrong and you'll spend a day chasing reference errors instead of checking whether the data is any good.

The one practice that saves go-lives here is the mock load. Don't plan to migrate once, on cutover weekend, and pray. Run the whole thing end to end, more than once, well before launch. Each dry run answers three questions: is the data clean, are the mappings right, and does the full load even fit inside your cutover window. A load that takes forty hours doesn't fit in a weekend, and you want to learn that in a rehearsal, not at 3am on go-live Saturday. I've made the longer case for treating [migration as an early workstream, not a last one](/blog/netsuite-data-migration).

Then reconcile. The final mock load has to tie back to the source: record counts, control totals, opening balances against the trial balance you're carrying over. And the person who signs that reconciliation is the controller, because they're the one who has to trust the numbers on Monday.

## 2. Configuration and solution scope

You can't certify a system as ready while the definition of the system is still moving. Scope creep in the final weeks is one of the surest tells a launch is about to hurt, and it's one of the [warning signs I look for on any project](/blog/netsuite-implementation-warning-signs).

Freeze it. What's going live should be written down and agreed: no open change orders that change go-live behavior, and a clear, shared line between what's in this launch and what's honestly phase two. Everything in scope should trace back to what you signed, which is the moment your [SOW](/blog/netsuite-sow-before-you-sign) finally earns its keep as the reference for what "done" means.

Then the build. Every customization, script, and workflow that's in scope is deployed and working in the environment you'll actually launch from, not parked in a developer's sandbox. The saved searches, reports, forms, and dashboards people need are built and tested. And there's a real role waiting for every job that logs in Monday morning, which matters more than it sounds. I'll come back to why under security.

## 3. Testing: UAT, SIT, and performance

Testing is where "configured" becomes "accepted." Those aren't the same word. When a partner says the build is done, they mean it's configured. It isn't done until your people have run it, tried to break it, and put their name on it.

Three kinds of testing earn their place before a launch, and each needs its own exit criteria and sign-off.

**User acceptance testing** proves the system supports the real processes end to end: order to cash, procure to pay, record to report. Test the happy path, then go looking for trouble, the weird return, the split shipment, the credit hold, the multi-currency invoice. Run it against migrated data, not tidy records someone built by hand, because that's the only way to see how your real data behaves. And run it with people in their actual, least-privilege roles. Test as an administrator and you won't find the permission gaps until a user does, live.

**System integration testing** proves NetSuite plays nice with everything it's wired to. More on that in the next section, but the bar is simple: prove the interfaces hold at volume, and prove they fail gracefully when the other side falls over.

**Performance testing** proves it holds up under your real load, not a handful of sample records. Run the searches, reports, and processes your team hammers all day, at peak volume, on the browsers they actually use. A saved search that returns in two seconds against test data can time out against a full year of production.

Then tie it together. Every cycle has written exit criteria, and the business signs that they were met. Every open defect gets an owner and a date, and you decide, on purpose, which ones you can live with at launch and which ones stop it. "We're still finding new issues every day" is not a place you go live from.

## 4. Integrations and external dependencies

Integrations are where go-lives break in ways nobody rehearsed, usually because the failure is on the far side of the connection, where you can't see it.

Every integration in scope gets tested with real data at real volume: the shipping system, the bank feed, the tax engine, the CRM, the EDI link, the 3PL. But the happy path is the easy half. The question that separates a calm launch from a bad week is what happens when the other system is slow or down. Does the error get caught, queued, and retried? Or does a transaction just vanish? Does someone get paged, or do you find out at month-end that three days of orders never landed?

Simulate the failure. Watch how the system and your people react. You'll learn more from that than from ten clean test runs.

The other half is the dependencies you don't control. If a vendor, a bank, or a service provider has to be ready on your date, get it in writing, not in a hallway conversation. I've watched a launch slip because a bank needed six weeks to stand up a production feed and nobody asked until week five. Their timeline was the whole project's timeline, and nobody was watching it.

## 5. Security, roles, and access

This one gets skipped because it's boring, right up until it's a control failure. Two things go wrong, and both show up fast: people get too much access, or people get the wrong access.

Assign least-privilege roles. The move I see constantly, and argue against every time, is handing everyone administrator or some broad catch-all role to "avoid access issues during go-live." That's how you end up with an AP clerk who can edit the chart of accounts and an auditor asking who signed off on that. Roles match jobs. And you've already tested them, because UAT ran in those roles.

Check segregation of duties before you launch, not after an auditor circles it in red. The person who creates a vendor shouldn't be the person who approves its payment. NetSuite's native roles get you partway, and knowing exactly where they stop is a before-go-live problem, not an after one. I mapped out [where the native SoD tooling runs out of road](/blog/netsuite-segregation-of-duties) separately. Verify approval routing end to end too, across every subsidiary and every threshold, because chains that sail through a single-entity test tend to buckle across a multi-entity structure. That's its own rabbit hole, and I get into it in [what SuiteFlow can and can't do](/blog/netsuite-approval-workflows).

::: tip Approvals that have to survive an audit
If your launch has to show that approvals and segregation of duties are actually enforced, not just written down, native routing only gets you so far. [Greenlight Approvals](https://greenlightapprovals.io) enforces and evidences approval controls in NetSuite, which is precisely what an auditor asks you to produce after go-live.
:::

## 6. The cutover runbook

Cutover is the few days when you take the old system down, move the data, stand the new one up, and flip it on. It's the riskiest window in the whole project. It should also be the most rehearsed. A cutover plan isn't a date. It's a runbook.

A real runbook lists every task in order, from "freeze the legacy system" to "first live transaction," and against each one it names the owner, the timing, the exact steps, and how you'll confirm it worked. It spells out the freeze, the moment you stop transacting in the old system. It spells out the blackout window, the stretch when neither system is fully live and everyone knows to hold. And it spells out rollback triggers: the specific conditions, agreed in advance and in daylight, under which you call it off and go back. You do not want to be inventing those at 2am on Sunday with the adrenaline going.

Then you rehearse it. A dress rehearsal runs the entire runbook against a copy, with the actual people who'll do it for real, on the clock. That's where you discover step 14 quietly depends on step 22, that the load takes six hours longer than anyone budgeted, and that the one person who knows how to run the tax update is on a beach that weekend. Far better to find it in a dry run than to find it live.

## 7. Training and change management

A technically perfect system nobody will use is still a failed go-live. The human side of readiness is every bit as real as the data side, and it's the side that gets shortchanged.

Train people on the roles they'll actually have and the workflows they'll actually run, close enough to launch that it sticks, but not so late that go-live is the first time they've touched the thing under pressure. Name your super-users, the person on each team who's a step ahead and becomes the first "hey, how do I do this," so not every question lands on the help desk. Have quick-reference guides ready for the handful of processes people run a hundred times a week.

Under all of that sits change management: leadership visibly backing the launch, communication so the date surprises no one, a channel for people to say "this feels wrong" before it hardens into a workaround. Readiness here isn't "we ran a training session." It's that the people who have to live in this system on Monday know how it works, know why it works that way, and know where to go when it doesn't.

## 8. Support and hypercare

The most dangerous assumption on any launch is that the partner sticking around for a few weeks means you're covered. Hypercare is a safety net for go-live bugs. It is not a transfer of ownership, and the gap between those two things is exactly [the post-go-live cliff](/blog/post-go-live-cliff) I've written about.

Plan it deliberately: who's on the support team, what hours they cover, how issues get logged, triaged, and escalated, and how severity is defined so a broken invoice run doesn't wait in the same line as a font complaint. Coverage runs hardest in the first 48 to 72 hours, then stays elevated for two to four weeks. The part people forget is how it ends. Hypercare should wind down when incident volume drops below an agreed line and stays there, not when the calendar hits an arbitrary Friday and the consultants roll to their next project.

And then the real question: who owns this system afterward?

Someone on your side has to, and the time to put that person in the seat is before go-live, overlapping with the partner while the knowledge is still in the building. It's the whole reason I argue for [an internal resource on the implementation](/blog/netsuite-implementation-resource) and [a client-side owner who carries the context forward](/blog/netsuite-client-side-resource). Skip it and you're not really launching a system. You're starting the countdown to a crisis.

## 9. The go/no-go decision

Everything above rolls up into one call, and it deserves better than a vibe check on a Friday afternoon.

Run it as a short series of checkpoints, not a single moment. A few weeks out, look at the risk list and ask honestly whether the trend gets you to green in time. After the final dress rehearsal, turn what you saw into a go-live recommendation. Then, at cutover, make the last formal call. The criteria at each gate are the dimensions in this piece, and a named person owns the decision. Write down who that is ahead of time, because "everyone and no one decided" is how projects go live in denial.

Two things keep the decision honest. First, you agree the criteria in advance, so you're measuring against a standard instead of talking yourself into a date. Second, you keep rollback on the table right through the final checkpoint. If "no-go" was never genuinely on the menu, you didn't make a decision. You performed one. And a performed go-live is where the avoidable disasters hide.

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

<ConsultingCTA message="Staring down a NetSuite go-live? I help companies pressure-test their readiness and cutover plan before they commit to the go/no-go, so launch day is a decision you've earned, not a date you're hoping survives contact with reality." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
7/6/2026

<TagLinks />
