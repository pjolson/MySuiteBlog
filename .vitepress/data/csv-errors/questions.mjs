const question = (prompt, options) => ({ prompt, options: Object.entries(options).map(([label, answer]) => ({ label, answer })) })

export function questionFor(entry) {
  if (entry.followUp) return entry.followUp
  if (entry.id === 'FLD-02') return question('Do you have the original export?', {
    Yes: 'Compare the full saved quantities in the original and edited files using the same unit. Restore confirmed lost digits from the source and keep matching removal and addition quantities together.',
    No: 'Obtain the full quantity from an Inventory Balance search in NetSuite. Rounding is one possibility to check. Adding decimal places to a rounded value does not recover lost digits.'
  })
  if (entry.id === 'FLD-01') return question('Is this line adding or removing stock?', {
    Removing: 'Use the issue-number field for existing stock. Compare the exact item, location, lot, bin, and status in an Inventory Balance search. For bin-managed stock awaiting put-away, confirm the physical bin before changing the import.',
    Adding: 'Check the receipt-number field for stock being added and the intended bin and status. Confirm how inventory assignments connect to the adjustment line. A removal-specific status error is not proof of the cause on an addition.'
  })
  if (entry.id === 'EMP-01') return question('Do these expenses use more than one currency?', {
    Yes: 'Map each expense currency from the file. A single default does not fit lines using different currencies.',
    No: 'Confirm that every expense uses the employee subsidiary’s base currency before reviewing the report’s multicurrency setting. A default is suitable only when it applies to every affected line.',
    "I'm not sure": 'Compare the source expenses and their currencies before changing the report setting or adding a default.'
  })
  if (entry.slug === 'duplicate-records') return question('Are you adding a new record or updating an existing one?', {
    Adding: 'Find the record that already owns the identifier. Confirm that this is a different intended record before choosing a new identifier.',
    Updating: 'Use the verified identifier of the existing record and the supported Update operation. Check its current state before rerunning the import.',
    Both: 'Separate the intended additions from updates and check the supported import mode. An external ID is a record identity, not a value to change just to clear an error.',
    "I'm not sure": 'Compare the intended record with the existing one before changing identifiers or the import operation.'
  })
  if (entry.slug === 'failed-after-saving') return question('Does the result say the record was created?', {
    Yes: 'Open that record and verify its current state. Ask the administrator to inspect the failed follow-up work before deciding what should run again.',
    No: 'Check the import results and search for the intended record. A failure message alone does not prove that nothing saved.',
    "I'm not sure": 'Look for a record identifier in the result and inspect that record in NetSuite before retrying.'
  })
  if (['TXN-02', 'SAL-02', 'SAL-06'].includes(entry.id)) return question('What should happen to the existing lines?', {
    'Update some lines': 'Export the real line keys and use them to match the existing lines. A repeated item is not a unique line identifier.',
    'Add lines': 'For the documented transaction-item workflow, map the line-key column and leave the key blank for new lines. Check the selected sublist’s own import rules.',
    'Replace the full list': 'Prepare the complete intended list and review the replacement behavior for this sublist. Replacement can remove existing content. Item pricing and demand plans need their own guidance.'
  })
  if (entry.procedureIds.includes('P09') && ['missing-detail-lines', 'vendor-bill-file-links'].includes(entry.slug)) return question('Are you importing one file or several linked files?', {
    'One file': 'Map a CSV column into the relevant detail sublist and check transaction grouping. A key repeated on legitimate detail lines is not a duplicate primary-header row.',
    'Linked files': 'Keep one intended parent row per key in the primary file and repeat that key in its detail files. Check that every detail row points to the right parent.'
  })
  if (entry.procedureIds.includes('P01')) return question('How is this field mapped?', {
    Name: 'Compare the CSV value with the name displayed in this account, including hierarchy or account numbers where relevant. Name matching is generally case-insensitive.',
    'Internal ID': 'Verify the internal ID of the intended record in the same account and set the field’s reference type to Internal ID. A numeric-looking value alone does not prove it is an internal ID.',
    'External ID': 'Check the exact external ID and select that reference type only if this field supports it. Preserve leading zeros and all identifier characters.',
    "I'm not sure": 'Open the field’s edit control on the Field Mapping page and compare its selected reference type with the actual CSV value.'
  })
  return null
}
