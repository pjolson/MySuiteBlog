// Display taxonomy for the import-type selectors. Groups and names mirror the
// record-type page of NetSuite's Import Assistant, so a visitor picks the same
// name they picked when running the import. Each option's value stays the
// catalogue's internal context string — search filtering, feedback validation,
// and telemetry are unchanged. Every catalogue context must appear exactly
// once here; a test enforces that.
export const importTypeGroups = [
  { label: 'General', types: [
    { label: 'General (file, mapping, permissions)', context: 'General imports' }
  ] },
  { label: 'Accounting', types: [
    { label: 'Chart of Accounts', context: 'Chart of Accounts' }
  ] },
  { label: 'Activities', types: [
    { label: 'Events', context: 'Events' }
  ] },
  { label: 'Customization', types: [
    { label: 'Custom List', context: 'Custom lists' }
  ] },
  { label: 'Employees', types: [
    { label: 'Employees', context: 'Employees and expense categories' },
    { label: 'Expense Report', context: 'Expense reports' },
    { label: 'Track Time', context: 'Time entries' }
  ] },
  { label: 'Items', types: [
    { label: 'Items', context: 'Item records' },
    { label: 'Assembly Items', context: 'Assemblies' },
    { label: 'Inventory Items', context: 'Inventory items' },
    { label: 'Kits and Packages', context: 'Kits and packages' },
    { label: 'Related Items', context: 'Related items' },
    { label: 'Item Translations', context: 'Item translations' }
  ] },
  { label: 'Relationships', types: [
    { label: 'Customers Only', context: 'Customers' },
    { label: 'Customers and Contacts Together', context: 'Customers with contacts' },
    { label: 'Leads', context: 'Leads and prospects' },
    { label: 'Prospects and Contacts Together', context: 'Prospects with contacts' },
    { label: 'Vendor-Subsidiary Relationship', context: 'Vendor-Subsidiary Relationship' }
  ] },
  { label: 'Supply Chain', types: [
    { label: 'Manufacturing Cost Template', context: 'Manufacturing cost templates' },
    { label: 'Manufacturing Routing', context: 'Manufacturing routings' }
  ] },
  { label: 'Transactions', types: [
    { label: 'Journal Entry', context: 'Journal entries' },
    { label: 'Single Journal Entry', context: 'Single Journal Entry import' },
    { label: 'Intercompany Journal Entry', context: 'Intercompany journal entries' },
    { label: 'Invoice and Credit Memo', context: 'Invoices and credits' },
    { label: 'Customer Payment', context: 'Customer payments' },
    { label: 'Sales Order', context: 'Sales orders' },
    { label: 'Purchase Order', context: 'Purchase orders' },
    { label: 'Vendor Bill', context: 'Vendor bills' },
    { label: 'Vendor Payment', context: 'Vendor payments' },
    { label: 'Inventory Adjustment', context: 'Inventory adjustments' },
    { label: 'Inventory Cost Revaluation', context: 'Inventory cost revaluations' },
    { label: 'Inventory Worksheet', context: 'Inventory worksheets' },
    { label: 'Item Demand Plan', context: 'Item demand plans' },
    { label: 'Other Transactions', context: 'Transactions' }
  ] },
  { label: 'Website', types: [
    { label: 'Site Category', context: 'Website categories' }
  ] }
]

const labels = new Map(importTypeGroups.flatMap(group => group.types.map(type => [type.context, type.label])))
export const labelForContext = context => labels.get(context) || context
