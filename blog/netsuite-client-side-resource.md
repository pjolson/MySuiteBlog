---
title: "What a Client-Side Resource Does on a NetSuite Implementation"
date: 2026-06-04
description: "What a client-side NetSuite resource actually does during an implementation, and what separates a useful one from the kind that damages projects."
tags: ["Implementation", "Advisory"]
---

# What a Client-Side Resource Does on a NetSuite Implementation

[[toc]]


## The Seat Most Clients Cannot Fill

Every NetSuite implementation has a partner and a client. Almost every NetSuite implementation also has a seat on the client side that nobody really fills, and that gap is where a lot of projects quietly fall apart.

The partner brings a full team. Project manager, lead consultant, functional staff, technical staff, sometimes a quality lead. They are built to deliver the system the SOW describes.

The client side is supposed to mirror this. A project sponsor. A steering committee. A business owner for each module. Subject matter experts who sit in design sessions and validate decisions. A super user learning the system in real time so they can support it after go-live.

Most clients cannot actually do this. The people who would fill those roles already have jobs. The controller is closing the books. The IT lead is keeping the network running. The operations manager is running the warehouse. Nobody has eight hours a week to sit in design sessions, let alone the daily attention that an active implementation needs.

What happens after that is predictable. Design decisions get rubber-stamped because the business team is too stretched to push back. UAT scripts get signed off without being run against real scenarios. Change orders show up and nobody on the client side has the context to evaluate them. The partner does their job. The client does what they can. The seam between the two is where the project breaks.

That seam is the role I fill.


## What the Role Actually Is

It does not map cleanly to a standard job title. It is not exactly a project manager, not exactly a business analyst, not exactly an admin (there is no system to administer yet). The closest description is that I am acting as a super user, a client-side project manager for the customer team, and a hands-on support resource when the partner needs one, all in one seat.

The super user piece starts at kickoff. I am learning the system as it is being built. By the time go-live happens, I understand why each configuration decision was made, what the workarounds are, where the technical debt lives, and how the workflows actually behave. This is the knowledge that normally walks out the door when the partner rolls off, and it is one of the biggest reasons the [post-go-live cliff](/blog/post-go-live-cliff) hits as hard as it does.

The project management piece is about keeping the client team accountable to the partner's plan. Implementation partners run their own timelines, but the client side rarely has a real plan that matches theirs. I manage the client-side tasks, UAT prep, data prep, training scheduling, business process documentation, against what the partner needs and when. When the partner is waiting on something from the client team, I am the one who knows what it is, who owns it, and when it is coming. When the client team is behind, I am the one who unblocks them.

The hands-on piece is where I do functional or data work directly. CSV imports, saved searches, basic configuration, data validation. Not unsolicited. Not on my own. When the partner asks me to take it on because their team is stretched, or when the client team needs work done that is not in the partner's scope. The key word in both cases is "asked."

That last part is important and I will come back to it.


## What This Looks Like Week to Week

A typical week on an active implementation:

I am sitting in every design session the partner runs. Not to challenge the partner's methodology. To make sure the client's business teams are following what is being decided, asking real questions, and surfacing constraints that the partner cannot see from the outside. The partner knows NetSuite. They do not know that your AR team has been working around a quirk in the old system for eight years because nobody told them about it. That kind of context only comes out when someone is paying attention to both sides of the conversation.

I am running a weekly standup on the client side. Fifteen minutes, every week. What did each business owner finish last week. What is blocking them this week. What does the partner need from us by Friday. If the controller missed a UAT session because of month-end, I find out Monday morning, not on Thursday when the partner's status report says their work is blocked.

I am reviewing every deliverable from the partner before the client signs off on it. Not to second-guess the technical work. To make sure what was delivered matches what the [SOW promised](/blog/netsuite-sow-before-you-sign) and what the design sessions decided. When something is genuinely off, I flag it. When it is fine, I tell the client it is fine and we move on.

I am watching the change order pipeline. Most change orders are legitimate, real scope additions that the client asked for or that came out of design. Some are gaps in the partner's discovery being repackaged as new scope. The job is not to fight every change order, it is to help the client tell which is which and decide what to approve.

And I am doing a lot of work that is genuinely boring. Chasing stakeholder approvals. Maintaining the issues log. Prepping training materials. Validating data extracts before they go to the partner for loading. None of this shows up in a slide deck. All of it has to happen for the project to move, and the client's internal people do not have time for it.


## What I Will Not Do, and Why

This is the part of the role that separates a useful client-side resource from one who actively damages the project.

I do not make changes in the system without being asked. No configuration. No saved searches. No bundles. No workflows. The partner is building the system. That is their job, that is their margin, and it is their professional responsibility. The moment I start making changes on my own initiative I am degrading the partner's ability to deliver and creating work that nobody scoped. I have seen consultants do this, show up with NetSuite credentials and start "helping" by configuring things, and it does real damage. The client thinks they are getting extra value. The partner is now cleaning up after someone else and rebuilding the project plan around it.

I do not go around the partner to the steering committee. If I have a concern about something the partner is doing, I raise it with the partner first. Most of the time the concern goes away, there is a reason for the decision that I did not have context on. When the concern is real, the partner and I work out how to bring it to the steering committee together, with both perspectives represented honestly. Going around the partner to the executive sponsor is a fast way to break the relationship the client will need for the rest of the project, and it makes me the source of instability rather than the person reducing it.

I do not compete with the partner for the next engagement while we are still in the current one. If the client wants me to lead ongoing support after go-live and the partner wants the same business, that is a conversation for the client and the partner to have. I am not going to spend the implementation positioning myself for the support contract. (Sometimes the client decides on their own and tells the partner. Sometimes the partner is happy to hand off. Sometimes the partner keeps it. All three are fine. None of them require me to be quietly pitching mid-project.)

These are not soft constraints meant to make the partner comfortable. They are the disciplines that keep me from being the kind of client-side resource that sinks implementations. Which brings me to a story.


## I Saw This Done Badly Once

Earlier in my career I was on the partner side of an implementation where the client had hired someone in the role I now play, except not in the way I play it. He had real NetSuite credentials. He had spent years inside NetSuite before going independent. The client trusted him completely.

On day one of our project he started configuring things. New roles. New saved searches. A bundle he had used on a previous engagement, installed without telling us. In steering committee he would say things like "I went ahead and set that up over the weekend" while we were still in the middle of deciding whether it was the right approach.

The client loved it at first. Things were happening fast. He was responsive, he was clearly skilled, they felt like they were getting more than they were paying the partner for.

By month three our project plan was a mess. We were spending half our time undoing decisions he had made on his own, untangling configurations that had to be redone properly, and re-explaining to the client why the things he had "set up" needed work. The client thought we were being slow. We were actually being slow because we were cleaning up after their expert. The project ran nine months late.

What is frustrating in retrospect is that he was technically capable. If he had been disciplined about his role, sat in design sessions, validated our work, managed the client side of the plan, asked before touching the system, he would have been worth every dollar. Instead, his expertise made him dangerous, because he applied it without coordination.

The constraints in the section above are not arbitrary. They are the difference between him and the version of this role that helps.


## The Implementation I Worked Most Recently

I want to talk about the project I just finished, because it shows the role in its hardest version.

The partner was almost a year behind schedule when I came in. The client was frustrated. There was real damage in the relationship. There were times when I was, honestly, adversarial with the partner, about scope, about quality, about timeline.

My number one goal through all of it was that the partner did not get replaced.

This is the part that sounds backwards, so let me explain it. The easy advice, and the advice the client kept asking me about, was "fire them and bring in someone else." I think that advice would have made things much worse. The partner had spent a year building the system. They knew the configurations, the workarounds, the integrations, the data model, the personalities on the client team. Replacing them would have meant a new partner spending three to six months getting back to where the current one already was, at the client's expense, with all the original problems still unresolved.

So the work was harder than "find a better partner." It was helping the client be a better client, clearer on requirements, faster on decisions, more accountable on their own deliverables, so the partner could finish the job they had started. It was helping the partner be a better partner, communicating earlier, scoping change orders more clearly, treating the client's frustration as a signal worth responding to rather than something to manage around. It was sitting in the middle of a hard relationship and finding the version of the next step that both sides could live with.

The project landed. The client went live on a system that mostly worked. The partner stayed engaged through stabilization. The relationship was never warm but it was workable, which was the goal.

This is the part of the role that does not fit on a sales page. Sometimes being on the client's side means telling the client that firing their partner would be a self-inflicted wound. Sometimes it means staying in a meeting where two parties are angry at each other and finding a path forward both of them can take. None of it is glamorous. It is the work.


## What to Look For If You Are Hiring Someone for This Role

If you are running an implementation and thinking about bringing in a client-side resource, a few things worth asking before you do.

Will they commit, in writing, not to make changes in your NetSuite account without being asked? If the answer is "well, sometimes it is faster if I just go ahead and do it," that is the wrong person. The fastest way for a client-side resource to sink your project is to think they are being helpful by skipping coordination with the partner.

Will they work through the partner's project manager rather than around them? If they describe themselves as your "watchdog" or "your set of eyes on the partner," that is a problem. You want an advocate, not an adversary. An advocate works with the partner toward your interests. An adversary creates a second project layered on top of the first one.

Do they have an opinion about when the partner is right? A good client-side resource pushes back on the partner sometimes and agrees with them other times. If everything the partner does is wrong in their view, they are not assessing the situation, they are performing. The implementation you are paying for needs both sides represented honestly.

Are they doing this full-time during the project, or is this a side commitment between bigger engagements? Implementations are intense for the months they are active. Someone splitting their attention across three projects will not catch the design-session detail that matters six weeks later.

Are they willing to do the unglamorous work? Chasing approvals, validating data, prepping training materials, running the issues log. If their answer is "I focus on the strategic stuff," they are going to leave you with the boring half of the role still unfilled, and that boring half is where most of the project's actual risk lives.


## Why the Role Is Worth Hiring For

The math is simpler than it looks.

A client-side resource on a typical mid-market implementation costs a fraction of the implementation itself. A delayed go-live costs more. A bad design decision that has to be unwound after go-live costs more. A change order that should have been challenged costs more. The role pays for itself in the first month or two by preventing one mistake the client team did not have the bandwidth to catch.

What you are actually buying is not expertise. Your partner already has expertise. What you are buying is attention on your side of the table. Someone whose only job for the duration of the project is making sure your implementation lands well for you. Someone who is not billing against deliverables, not moving to the next client at go-live, and who has time to read the [SOW](/blog/netsuite-sow-before-you-sign) carefully and ask the awkward questions in design sessions while there is still time for the answers to matter.

That is the role. It is not adversarial and it is not deferential. It is the seat on the org chart that most clients try to fill with people who already have other jobs, and that is why it almost never gets filled properly.

If your implementation has that seat unfilled, fill it. The mistake is leaving it empty.


<ConsultingCTA message="Running an implementation and the client side is the bottleneck? I fill the seat between your team and the partner: super user, client-side PM, and hands-on support in one role." />

<TagLinks />
