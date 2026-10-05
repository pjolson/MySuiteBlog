---
title: "NetSuite Costing Methods: The Choice You Cannot Undo"
date: 2026-10-05
description: "NetSuite locks the costing method once an item is saved. Learn what each method commits you to and what to settle before your implementation decides."
tags: ["Implementation", "Advisory", "Inventory"]
faqSchema: true
---

# NetSuite Costing Methods: The Choice You Cannot Undo

[[toc]]

It is week three of your NetSuite implementation. The consultant shares a screen with an item record open and asks which costing method you want. Average is already selected. Nobody on your team has seen how your own costs will flow through NetSuite yet, the agenda has six more topics on it, and average sounds reasonable. The meeting moves on.

That short conversation set something you cannot take back.

**Can you change the costing method in NetSuite?** Not on an existing item. Once the costing method is saved on an item record, NetSuite locks it. Changing methods means adjusting the item's inventory to zero, inactivating the item, and recreating it with an opening balance under the new method. Existing inventory cannot be converted to FIFO or LIFO automatically.

Every new item record, every saved search that points at it, and every integration that references it inherits that decision. So it is worth understanding what you are choosing before you choose it.

![NetSuite costing method field on an inventory item record](/img/netsuite-costing-method-item-record.png "The Costing Method field on the Purchasing/Inventory subtab, under Item/Cost Detail, alongside the average cost and total value it drives")

## The NetSuite Costing Methods and What Each One Commits You To

NetSuite sets a default costing method in Accounting Preferences, and average is the default out of the box. Each item record can still use a different method, so most accounts end up with a mix. That flexibility is also the trap: every item gets decided once.

| Method | How cost is assigned | What you are signing up for |
|---|---|---|
| Average | A moving average of on-hand value | Cost shifts with every receipt, and backdated transactions recalculate everything after them |
| FIFO | The oldest receipt layers are consumed first | Layer history matters, and some tools can erase it |
| LIFO | The newest receipt layers are consumed first | Not available in the NetSuite Australia edition |
| Group Average | One average cost across a group of locations | Requires Multi-Location Inventory and a balancing step every period, and does not fit WIP or routing assemblies |
| Standard | A fixed expected cost, with variances posted separately | Ongoing maintenance of cost versions and revaluations |
| Specific / Lot Numbered | The cost of the specific serial or lot | Costing tied to serial or lot traceability |

Oracle's documentation on [costing methods](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2191818.html) and on [setting a default inventory costing method](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4345703007.html) covers the mechanics. What they cannot tell you is which of these fits your business.

## Four Decisions That Shape NetSuite Inventory Costing for the Life of Your Account

Two of these are locked outright. The other two are commitments that are painful to unwind once transactions are flowing.

### 1. The costing method on each item

This is the one that is literally irreversible. On an item record the field sits on the Purchasing/Inventory subtab under Item/Cost Detail, next to the average cost and total value it drives. The method is fixed the moment the item record is saved, whether or not any transactions exist yet. The only path to a different method is a new item, which means split history, new item IDs, and updates to every search, report, and integration that used the old one.

### 2. Group average costing and your location structure

Group average lets you carry one average cost for an item across a set of locations, so a transfer between warehouses does not change the item's cost. It needs Multi-Location Inventory and location costing groups. The catch is the location rules. A location can only join or leave a costing group if it has no transactions for group average items. New locations have to be assigned before anyone transacts there.

In OneWorld, every subsidiary in a costing group needs the same base currency, and with Multi-Book, the same secondary books. Inventory adjustment worksheets are not allowed for group average items. Oracle also recommends running the Balance Location Costing Group Accounts process at the end of every period, which becomes a permanent line on your close checklist.

Manufacturers have one more constraint to know about. Oracle lists only standard and average costing as compatible with [Manufacturing Work In Process](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2340709.html), and [Manufacturing Routing](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N2341076.html) works only with assemblies on standard or average cost. If you build assemblies with WIP or routings, group average is off the table for those items. That is a hard trade-off between one cost across your plants and shop-floor cost tracking, and it needs to be made before the assemblies are built.

### 3. Standard costing

Standard costing gives you a fixed expected cost and posts the difference to variance accounts. Manufacturers and distributors who already think in standards get real insight from it. Everyone else gets a workload: cost categories, cost versions, planned standard costs, cost rollups, and revaluations.

The rules are strict. You can enter only one revaluation per item, location, and day. A backdated revaluation can trigger long recalculations, especially for components buried deep in a bill of materials. And if you use Multi-Book, every new accounting book needs its own revaluation.

### 4. Advanced Receiving

Advanced Receiving decides where cost comes from. Oracle documents the behavior for [LIFO and FIFO items](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2194541.html): with Advanced Receiving enabled, costing happens at the time of item receipt and is determined by the amounts entered on the purchase order. Without it, costing waits for the bill and is determined by the amounts entered there. Teams are often surprised that correcting the price on a bill does not fix item costing when Advanced Receiving is on. The receipt drives cost, and the difference sits in Accrued Purchases.

## Why the Costing Method Decision Gets Made at the Wrong Time

None of this is hidden. So why do so many companies end up with a costing method that does not fit?

Because of when the decision happens. Item records are among the first things an implementation builds, since data migration templates and item imports depend on them. That puts the costing method early in the project, before your team has seen a single real transaction flow through NetSuite.

At that point, the people in the room usually cannot judge the choice. They know the business. They do not yet know how NetSuite will turn their receipts, transfers, and returns into cost. The partner needs a decision to keep the plan moving, and that is a fair need, since the schedule is what your SOW pays for. Average is preselected. Nobody objects.

The person who will reconcile inventory at month-end often is not in that meeting. Two years later, they are the one explaining why cost swings every time stock moves between warehouses, and nobody remembers that it was ever a choice.

That is not anyone's failure. It is how implementations are sequenced. But the consequences do not roll off with the partner.

### What It Looks Like Two Years Later

When companies come back wanting to change their costing method, it is almost always for one of three reasons.

**Average cost never felt like "cost."** Average cost is the average of what is on hand right now. That is accurate, but it is not what most finance teams picture when they talk about an item's cost. They want a number they can plan and price against. And when an item sells through and nothing is left on hand, the cost they are used to seeing on the item drops to zero. So they start asking for something closer to a standard.

**Standard cost turned into a job.** Other companies picked standard for exactly that predictability, then found out what it takes to keep it: cost versions, rollups, and revaluations on a monthly rhythm, owned by someone who already has a full-time role. The variance reporting was worth having. The upkeep was not sustainable.

**Every location had its own cost.** Average costing is calculated per location. Move stock from one warehouse to another and the same item carries a different cost depending on where it sits. Teams that think of an item as having one cost end up wanting group average, and by then that means new items and a rework of the location setup.

Each of these is a reasonable thing to want. Each was also knowable in week three, if someone on the client side had asked what the method would look like at month-end.

## What to Settle Before Your NetSuite Costing Workshop

You do not need to become a costing expert. You need answers to a few questions before the item records get built.

- **Do your purchase costs swing by vendor, batch, or season?** If they do, the choice between average and FIFO changes your margins month to month.
- **Do you move inventory between locations?** If a transfer should not change an item's cost, look hard at group average before your locations go live.
- **Does your business already plan and price from standard costs?** If not, standard costing will create a maintenance job nobody owns.
- **Will you build assemblies with WIP or routings?** If so, those assemblies need standard or average cost, and group average is not an option for them.
- **Do you need lot or serial traceability?** That decision drives the costing options available for those items.
- **Who will reconcile inventory at month-end?** Get that person into the decision and show them a sample close in the sandbox.
- **What would it cost to change this in two years?** Ask the question out loud. The answer usually settles the debate.

### What the Choice Is Worth in Dollars

Three receipts of the same item, then one sale of ten units. The receipts are 10 units at $10, 10 at $12, and 10 at $15, so 30 units came in for $370. It is the same sale in every column.

| On the same sale | Average | FIFO | LIFO | Standard at $11 |
|---|---|---|---|---|
| Cost of goods sold | $123.33 | $100.00 | $150.00 | $110.00 |
| Value of the 20 units left | $246.67 | $270.00 | $220.00 | $220.00 |
| Gross margin at a $200 sale | 38% | 50% | 25% | 45% |

Standard costing also posts a $40 unfavorable purchase price variance when the goods are received, since $370 of inventory came in against $330 of standard cost.

Same item, same month, same sale. Gross margin runs from 25 percent to 50 percent depending on a dropdown somebody set in week three.

The single most useful step is to run a month of real transactions through the sandbox under the method you are leaning toward. Receipts, transfers, returns, and a close. That is when the right answer shows up. If you have not signed yet, it is also worth checking [what your SOW says about design decisions](/blog/netsuite-sow-before-you-sign) before the workshop calendar is set.

## Five Habits That Cause NetSuite Costing Problems After Go-Live

The method is locked. Your habits are not. These are the costing problems that belong to your team once the [partner rolls off](/blog/post-go-live-cliff), and no contract covers them.

1. **Backdating and closing too early.** Backdated transactions and reopened periods trigger inventory costing recalculations. Oracle is explicit that you should not close a period until recalculation finishes. The Cost Accounting Status field that shows it is hidden on the item record by default, so add it, and check the Inventory Cost Accounting workbook before you close.
2. **Shipping before receiving.** Fulfilling an item that is not on hand creates an underwater sale. NetSuite estimates the cost and trues it up later, which moves cost between periods. Sell an item that has never been received and it posts at zero cost until a receipt arrives.
3. **Using adjustment worksheets on FIFO or LIFO items.** An inventory adjustment worksheet costs those items as average. You lose the layer history the method exists to keep. Use the Inventory Count page or a standard inventory adjustment instead.
4. **Returning items on a standalone credit memo.** The quantity comes back into inventory, but the cost does not reverse correctly. Use the return authorization process so the return links to the original sale.
5. **Leaving closed-period edits switched on.** The preference to create and edit inventory transactions dated in closed periods lets small edits trigger costing changes in periods you have already reported. Oracle recommends disabling it.

None of these require a new implementation to fix. They require someone who owns the system after go-live.

## Who Owns the Costing Method Decision on Your Side?

Your implementation partner will recommend a costing method, and the recommendation will usually be reasonable. But the partner leaves at go-live, and the method stays for the life of every item. The decision belongs to the people who will live with it.

Make sure the choice is understood by someone who answers to you, and not to the project plan, before the item records are saved. That is what a [client-side NetSuite resource](/blog/netsuite-client-side-resource) is for, and it is the work I do: sitting on the client side of decisions like this one, and staying for what comes after.

## Frequently Asked Questions

### Can you change the costing method in NetSuite?

Not on an existing item. Once the costing method is saved on an item record, NetSuite locks it. Changing methods means adjusting the inventory of that item to zero, inactivating the item, and recreating it with an opening balance under the new method. Inventory you already hold cannot be converted to FIFO or LIFO automatically.

### What is the default costing method in NetSuite?

Average costing is the default inventory costing method in NetSuite. A user with access to Accounting Preferences can change the default, and each item record can still be set to a different method when the item is created.

### Can you use different costing methods for different items in NetSuite?

Yes. The default in Accounting Preferences only pre-fills new item records. Each item can use its own method, so one account can mix average, FIFO, standard, and lot costing. The method on each item is still locked once its record is saved.

### Is LIFO available in NetSuite?

Yes, LIFO is available in most NetSuite editions, but not in the Australia edition. Like every costing method, it is locked once the item record is saved, so switching an existing item to LIFO means recreating the item rather than converting it.

### What is group average costing in NetSuite?

Group average costing tracks one average cost for an item across a group of locations. It requires Multi-Location Inventory and location costing groups, and it keeps transfers between grouped locations from changing the cost of an item.

### Why did the cost on my item change after I saved the transaction?

NetSuite runs inventory costing on a schedule, hourly or on a custom schedule, rather than at the moment you save. Backdated transactions and edits to earlier transactions also trigger recalculations that update the cost on later transactions.

### Does group average costing work with WIP and routings?

No. Oracle lists only standard and average costing as compatible with Manufacturing Work In Process, and Manufacturing Routing requires assemblies on standard or average cost. Manufacturers who need WIP or routings have to cost those assemblies with one of those two methods.

### What happens to cost when inventory goes negative in NetSuite?

NetSuite estimates the cost of the underwater fulfillment and posts a cost adjustment when stock comes back above zero. For FIFO, LIFO, specific, and lot items, a preference sets the estimate. Average items use the most recent above-water average cost.

<ConsultingCTA secondary-link="/about/#implementation-support" secondary-text="See Implementation Support" message="Costing is one of a dozen decisions an implementation locks in during its first month, and most of them are easier to get right than to undo. If you want someone reviewing those calls who has no stake in the project plan, that is the work I do." />

<a href="https://www.linkedin.com/in/patrick-olson-pmp/" target="_blank"><img src="./img/profile.jpg" title="Patrick Olson - LinkedIn Profile" alt="Patrick Olson - LinkedIn Profile" width="48" height="48" style="border-radius: 50%; vertical-align: middle;"></a>**By:** [Patrick Olson](https://www.linkedin.com/in/patrick-olson-pmp/)
10/5/2026

<TagLinks />

Read Next - [What to Look for in Your NetSuite SOW Before You Sign It](/blog/netsuite-sow-before-you-sign)
