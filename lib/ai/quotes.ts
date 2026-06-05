import { School } from './engine'

export interface QuoteItem {
  name: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Quote {
  id: string
  school: string
  items: QuoteItem[]
  subtotal: number
  tax: number
  total: number
  validity: string
  status: string
  generated_at: string
}

export function generateQuote(
  school: School,
  stage: 'HOT' | 'WARM' | 'COLD'
): Quote {
  const items = getItemsForStage(stage)
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + tax

  return {
    id: `QT-${Date.now()}`,
    school: school.school_name || 'School',
    items,
    subtotal,
    tax,
    total,
    validity: '14 Days',
    status: 'AUTO-GENERATED',
    generated_at: new Date().toISOString(),
  }
}

function getItemsForStage(stage: 'HOT' | 'WARM' | 'COLD'): QuoteItem[] {
  const standardItems = [
    {
      name: 'Stationery Pack (A4 Paper, Pens, Pencils)',
      description: 'Comprehensive stationery bundle for school operations',
      quantity: 1,
      unit_price: 15000,
      total: 15000,
    },
    {
      name: 'LTSM Materials Pack',
      description: 'Learner Teacher Support Materials (chalk, markers, whiteboards)',
      quantity: 1,
      unit_price: 30000,
      total: 30000,
    },
    {
      name: 'Cleaning & Hygiene Supplies',
      description: 'School sanitation and hygiene consumables',
      quantity: 1,
      unit_price: 12000,
      total: 12000,
    },
  ]

  if (stage === 'HOT') {
    standardItems.push({
      name: 'Printing & Exam Materials',
      description: 'Exam papers and printing services',
      quantity: 1,
      unit_price: 8000,
      total: 8000,
    })
  }

  return standardItems
}

export function formatQuoteForEmail(quote: Quote): string {
  const itemsList = quote.items
    .map(
      (item) =>
        `${item.name}\n  Qty: ${item.quantity} | Unit: R${item.unit_price} | Total: R${item.total}`
    )
    .join('\n\n')

  return `
QUOTE #${quote.id}
Generated: ${new Date(quote.generated_at).toLocaleDateString()}
Validity: ${quote.validity}

SCHOOL: ${quote.school}

ITEMS:
${itemsList}

SUBTOTAL: R${quote.subtotal.toLocaleString()}
VAT (15%): R${quote.tax.toLocaleString()}
─────────────────────
TOTAL: R${quote.total.toLocaleString()}

Status: ${quote.status}
  `
}
