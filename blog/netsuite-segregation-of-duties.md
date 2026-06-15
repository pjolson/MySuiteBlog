---
title: "Segregation of Duties in NetSuite: What It Is and Where the Native Tools Stop"
date: 2026-06-15
description: "Segregation of duties is a control most companies have on paper and few can enforce in NetSuite. Here is how SoD works in the native role and approval model, and where it stops."
tags: ["Admin", "Approvals", "Compliance"]
---

# Segregation of Duties in NetSuite: What It Is and Where the Native Tools Stop

Segregation of duties is one of those controls almost every company claims and very few can actually prove. The policy exists. It is written down somewhere, usually in a document an auditor asked for years ago. But ask whether the system would stop the person who creates a purchase order from also approving it, and the honest answer is often "we would catch that in review." That is not enforcement. That is hoping.

This post is about what segregation of duties means inside NetSuite, what the native tools give you, and where they stop. If you are an admin setting up roles, a controller getting ready for an audit, or anyone who has been told to "make sure we have SoD," knowing where the platform helps you and where it leaves you exposed is the whole game.

[[toc]]

## What segregation of duties actually means

Segregation of duties (SoD) is the principle that no single person should control a transaction from start to finish. You split the steps so that committing fraud or hiding an error requires collusion, not just one person acting alone.

In a NetSuite context, the conflicts that matter most are concrete:

- The person who **creates** a purchase order should not be the person who **approves** it.
- The person who **enters** a vendor should not be the person who **pays** that vendor.
- The person who **records** a journal entry should not be the person who **approves and posts** it.
- The person who **administers** the system should not be quietly **approving** their own transactions when no one is looking.

None of this is exotic. It is the baseline auditors check, and it is the baseline a healthy finance operation runs on. The hard part is not naming the conflicts. The hard part is making NetSuite enforce them.

## How NetSuite handles SoD natively

NetSuite's first line of defense is the role and permission model, and it is genuinely good at what it does.

Every role is a bundle of permissions, and each permission has a level: view, create, edit, or full. You can build a role that lets a clerk enter vendor bills but never approve them, see purchase orders but never create them, or run reports but never touch a transaction. Because roles are granular, you can get the access side of SoD reasonably tight if you design the roles deliberately instead of cloning "Accountant" and handing it out.

On top of access, NetSuite gives you approval routing through SuiteFlow and the SuiteApprovals SuiteApp. You can route a PO above a threshold to a manager, send a vendor bill to a controller, require a second sign-off over a dollar amount. That routing is where a lot of people assume their SoD lives.

So the native toolkit is: granular role-based access to control who can do what, plus approval routing to control who signs off. For a lot of small, single-subsidiary setups, designed carefully, that covers the basics.

## Where the native tools stop

Here is where I spend most of my time with clients, because this is where the gap between "we have SoD" and "we can prove SoD" opens up.

**Access control is not approval independence.** Roles decide whether you can open a page. They do not, on their own, stop the creator of a transaction from also being the approver of that transaction. If your approval routing sends a PO to "the department manager" and the department manager is the person who raised the PO, the system will happily let them approve their own request. The permission was never the problem. The routing logic was.

**Native controls are mostly detective, not preventive.** The classic NetSuite answer to SoD is a saved search: find transactions where the creator equals the approver, run it monthly, investigate the hits. That is a detective control. It finds the violation after it already happened and already posted. Auditors accept detective controls, but they weight preventive controls (the system blocked it at the moment of approval) far more heavily. A monthly saved search proves you looked. It does not prove the violation was impossible.

**Single-approver and vacation scenarios quietly break the chain.** Small teams hit this constantly. There is only one person senior enough to approve, and they are out, so an admin steps in, or someone shares a login, or the transaction just sits until the rule gets relaxed "this once." Every one of those is an unenforced moment, and native routing does not give you a clean, logged way to handle the exception without a workaround.

**The evidence is scattered.** Even when you do enforce a separation, proving it at audit means reconstructing a story spread across systems. The transaction is in NetSuite. The approval might have happened over email. The "why" is in a Slack thread. The exception got noted in a ticket. When an auditor pulls a random transaction and asks you to show that the right person approved it and the creator did not, weeks of audit prep go into stitching that back together.

This is the real distinction, and it is worth saying plainly: most NetSuite environments have segregation of duties **documented**, but cannot demonstrate it is **enforced** at the point of every approval. Those are different claims, and the gap between them is exactly what gets flagged.

## Why this matters more than it looks

For SOX-regulated companies the stakes are explicit. An SoD weakness does not stay a quiet line item. Depending on scope and dollar amounts it escalates from a control deficiency to a significant deficiency to a material weakness, which pulls in more testing, management disclosures, and in bad cases restatements.

If you are not under SOX, you are not off the hook, you are just on a slower clock. An auditor finding around approver independence carries forward year to year until you fix it, and every cycle it sits open, the engagement gets broader and more expensive. "We will catch it in review" stops being an acceptable answer the first time someone asks you to prove the review actually happened.

## How I approach SoD in a NetSuite build

When I set this up or clean it up for a client, the work is less about NetSuite features and more about being deliberate:

1. **Map the conflicts first.** List the actual create-versus-approve and enter-versus-pay pairs for your business. You cannot enforce a separation you have not named.
2. **Design roles to the conflicts, not the org chart.** Start from least privilege and add only what each role needs. Resist the urge to clone one fat role for everyone.
3. **Design routing that enforces independence.** Approval rules have to account for the case where the routed approver is the creator, and for the single-approver fallback, before those cases show up in production.
4. **Decide preventive versus detective on purpose.** For your highest-risk transactions, aim for the system to block the violation, not just report it later.
5. **Write it down as you go.** The policy and the configuration have to match. The single most common finding I see is a written policy that says one thing and a system that enforces another.

Most of this you can do with native tools and discipline. The piece native tools struggle with is the last one in practice: capturing, at the moment of every approval across every channel, the proof that the separation held.

::: tip Need to prove SoD is enforced, not just documented?
The native role and routing model gets you part of the way. Closing the gap between a documented policy and enforcement you can show an auditor is exactly what [Greenlight Approvals](https://greenlightapprovals.io) was built for. See [NetSuite Segregation of Duties: Can You Prove It's Enforced?](https://greenlightapprovals.io/resources/11-netsuite-segregation-of-duties/) for how preventive self-approval blocking, duplicate-approval prevention, and a single audit trail change the answer.
:::

## The question to ask yourself

If an auditor pulled a random transaction from last quarter tomorrow, how long would it take you to prove the person who created it did not approve it? If the answer is "a few clicks," your SoD is enforced. If the answer is "give me a few days," it is documented, and there is work to do.

<ConsultingCTA message="If you are setting up roles and approval routing and want segregation of duties that holds up to an audit, not just a policy document, that is the kind of thing I help NetSuite teams get right." />

<TagLinks />
