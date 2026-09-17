import { entries, guides, guideEntries, basePath } from './catalogue.mjs'
import { indexableGuideSlugs } from './guides.mjs'
import { sourceLabels } from './source-labels.mjs'
import procedures from './procedures.json' with { type: 'json' }

// Keep editorial review codes out of public copy. Disputed procedures are
// deliberately reduced to safe checks, with the exact source linked below.
export function publicProcedure(id, entry) {
  if (entry.id === 'IVD-01') return '1. Confirm that the selected import is an inventory worksheet.\n2. Check whether the affected items and locations use bins.\n3. Review the worksheet-specific inventory-detail requirement with the administrator.\n4. Consult the Oracle worksheet guidance before changing any account preference.'
  if (entry.id === 'TXN-05') return '1. Review the complete sales team already on the transaction.\n2. Compare its contributions with the proposed imported team.\n3. Check whether imported and existing percentages together exceed 100%.\n4. Establish the complete intended team before choosing how to update its sublist.'
  if (entry.id === 'ITM-05' && id === 'P06') return '1. Identify the item being updated.\n2. Inspect its existing Locations sublist.\n3. Map the location key within that sublist to identify the row.\n4. Check the intended reorder point or stock-level values before retrying. A body location field does not necessarily identify the sublist row.'
  let body = procedures[id].body
    .replace(/ See SAL-04 and SAL-07\./g, '')
    .replace(/Use the matching catalogue entry for the actual field names\./g, 'Check the actual mapping fields for the record being imported.')
    .replace(/Use the specific payment entry above to resolve the remaining mapping issue\./g, 'Use the payment-specific first check above to review the remaining mapping issue.')
    .replace(/use P04\./g, 'compare the number actually saved in the CSV with the source.')
    .replace(/This is an editorial triage step for GEN-10, not a new error cause\./g, '')
    .replace(/For precision findings,[\s\S]*$/, 'For precision findings, compare the full saved number with the original export. Do not apply one rounding rule to all quantity, price, or currency fields.')
    .replace(/The manufacturing-routing error guide gives[\s\S]*$/, 'For manufacturing routings, check the routing-specific separator and whitespace requirements. Do not silently trim all record values or apply one whitespace rule across every import.')
    .replace(/Use the record-specific entry for transaction dates, effective dates, events, or demand plans\./g, 'Use the first check above for this record type.')
    .replace(/5\. If the proposed fix involves replacing pricing,[\s\S]*$/, '5. If the change would replace pricing, ask the account administrator to review the pricing setup and the conflicting Oracle guidance before proceeding.\n\nThis is a check of the intended price structure, not an instruction to enable sublist replacement.')
  if (id === 'P05') {
    if (entry.slug === 'countries-and-states') body = body.split('**Countries and states**')[1].split('For posting-period messages')[0].trim()
    else body = body.split('**Countries and states**')[0].trim() + (entry.id === 'EXP-03' ? '\n\nVerify the actual period reference before changing dates or reopening periods. A reference mismatch does not itself establish a closed-period problem.' : '')
  }
  if (id === 'P03' && !['SAL-04', 'SAL-07'].includes(entry.id)) body = body.replace(/\n\nFor an update to an existing sales order,[\s\S]*$/, '')
  // The duplicate-record advice only belongs on guides about duplicates; the
  // inactive-record and subsidiary caution stays for every reference error.
  if (id === 'P01' && !['duplicate-records', 'record-identifiers'].includes(entry.slug)) body = body.replace('For a duplicate-record message, determine whether you intend to update the existing record or create a different one. Do not generate new external IDs simply to get past the error. ', '')
  if (id === 'P09' && !entry.id.startsWith('VBL-')) body = body.replace(/\n\nFor vendor bills,[\s\S]*?(?=\n\nFor assemblies)/, '')
  return body.trim()
}

export function publicFirstCheck(entry) {
  return entry.firstCheck
    .replace(' The error article’s wording needs verification.', '')
    .replace(" The error article's wording needs verification.", '')
}

const notes = {
  'ITM-08': 'Oracle’s error article and general sublist guidance disagree about replacing item pricing. Ask the administrator to verify the relevant pricing setup before replacing the matrix. [Read the sublist option guidance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_3751046270.html).',
  'DMD-01': 'The plan’s body Internal ID identifies the plan for an update. The Item field identifies the item. Check both separately. [Read the supported field definitions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N416996.html).',
  'IVD-01': 'For an inventory worksheet, Oracle describes a workaround that temporarily changes the accounting preference requiring bins and restores it afterward. An administrator needs to verify the worksheet type, current bin setup, and effect of that change. This is not the first check for an inventory adjustment status error.',
  'ROU-02': 'The routing-specific documentation warns about spaces around the multi-select separator. Check the accepted format for this routing import. Keep actual identifiers intact.',
  'FLD-01': 'This is a field example with supporting inventory documentation. A status marked available is different from a stock balance available in a particular bin. Check whether the item uses bins at that location before treating a blank bin as an error.',
  'FLD-02': 'This is a field example with supporting number-handling documentation. Rounding is one possibility to check. Do not reduce the quantity arbitrarily until an import succeeds. Establish the intended amount and preserve the matching addition when moving stock between item records.',
  'ROU-03': 'A sequence can be reused in a different routing. Check for repetition within the same routing, not across the whole file.',
  'VBL-02': 'This primary-header check applies to a multiple-file import. Repeating a transaction key on legitimate detail rows in a single-file import is a different case.',
  'PRO-01': 'To prepare an update, use a customer search filtered to the prospect stage. Include the prospect identity and phone, plus the contact’s name and internal ID. Keep the two records’ identifiers and phone mappings separate. The broad error text alone does not prove that phone mapping is the cause.',
  'INV-01': 'In the first pass, include the starting quantity price break when required. In the second pass, use Update and map the translation language and translated display name to the translation sublist.',
  'EVT-04': 'Oracle describes a restriction on events spanning dates in this event-import workflow. This does not establish a rule for every NetSuite calendar interaction.'
}

export function renderGuide(guide) {
  const members = guideEntries(guide.slug)
  const sections = members.map(entry => {
    const steps = entry.tailoredSteps ? `**${entry.procedureTitle}**\n\n${entry.tailoredSteps}` : (entry.stepProcedureIds || entry.procedureIds).map(id => `**${procedures[id].title}**\n\n${publicProcedure(id, entry)}`).join('\n\n')
    // Show documented wording as examples; identifying keywords and
    // wording-varies cases are labeled as such instead of posing as messages.
    const verbatim = entry.messageFragments.filter(fragment => fragment.split(' ').length >= 3)
    const keywords = entry.messageFragments.filter(fragment => fragment.split(' ').length < 3)
    const messageBlock = verbatim.length
      ? `${verbatim.map(fragment => `- \`${fragment}\``).join('\n')}\n\nThe wording identifies a matching situation, not a confirmed diagnosis for your account.`
      : keywords.length
        ? `The exact wording varies. Messages for this case mention ${keywords.map(keyword => `\`${keyword}\``).join(' and ')}.`
        : 'Oracle does not publish one exact wording for this case. Match it by the situation described below.'
    return `## ${entry.title} {#${entry.anchor}}

${entry.summary ? entry.summary + "\n\n" : ""}**Message looks like**

${messageBlock}

**What it means**

${entry.explanation}

${entry.detailMarkdown ? entry.detailMarkdown + "\n\n" : ""}Import context: ${entry.importContext || entry.contexts.join(' and ') + '.'}

**Check this first**

${publicFirstCheck(entry)}

::: details Show the steps

${steps}

:::

${entry.additionalChecks ? entry.additionalChecks + '\n\n' : ''}${entry.id === 'FLD-01' ? '### Does the stock have a bin assignment?\n\nIf the item uses bins and the relevant stock has no bin assignment, investigate whether put-away is outstanding. Confirm the physical bin before changing the import. A blank bin is not an error for every item.\n\n' : ''}${notes[entry.id] ? `### If that looks right\n\n${notes[entry.id]}\n\n` : ''}<CsvEntryHelp entry-id="${entry.id}" />

${entry.evidenceNote ? `### Read Oracle's supporting guidance\n\n${entry.evidenceNote}\n\n` : ''}${entry.sources.map(source => `- [${entry.sourceLabels?.[source] || sourceLabels[source] || 'Supporting documentation'}](${source})`).join('\n')}

Documentation checked September 16, 2026.
`
  }).join('\n')
  const related = guides.filter(other => other.category === guide.category && other.slug !== guide.slug).slice(0, 4)
  return `---
title: ${JSON.stringify(guide.title)}
description: ${JSON.stringify(guide.summary)}
outline: [2, 2]
csvGuide: ${guide.slug}
lastUpdated: false
head:
  - [meta, { name: robots, content: ${JSON.stringify(indexableGuideSlugs.has(guide.slug) ? 'index, follow' : 'noindex, follow')} }]
---

<!-- Generated by scripts/generate-csv-guides.mjs. Edit .vitepress/data/csv-errors instead. -->

[Tools](/tools/) / [CSV Error Translator](${basePath})

# ${guide.title} {#${guide.slug}}

${guide.summary}

<CsvGuideContext slug="${guide.slug}" />

${sections}
## Related errors

${members.flatMap(entry => entry.relatedLinks || []).map(link => `- [${link.title}](${link.url})`).join("\n")}
${members.some(entry => entry.relatedIds) ? members.flatMap(entry => entry.relatedIds || []).map(id => entries.find(entry => entry.id === id)).map(entry => `- [${entry.title}](${entry.url}) (${entry.contexts.join(', ')})`).join('\n') : related.map(other => `- [${other.title}](${basePath}${other.slug})`).join('\n')}

<CsvGuideFooter show-navigation slug="${guide.slug}" />
`
}

export function copyableSteps(entry) {
  return [entry.title, 'What it means', entry.explanation, 'Check this first', publicFirstCheck(entry),
    ...(entry.tailoredSteps ? [entry.tailoredSteps] : (entry.stepProcedureIds || entry.procedureIds).map(id => publicProcedure(id, entry))),
    ...(entry.additionalChecks ? [entry.additionalChecks.replace(/^:::.*$/gm, "").trim()] : [])].join('\n\n')
}
