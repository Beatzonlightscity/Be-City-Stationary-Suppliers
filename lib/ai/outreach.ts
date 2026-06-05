import { School } from './engine'

export function generateMessage(
  school: School,
  stage: 'HOT' | 'WARM' | 'COLD'
): string {
  const principal = school.principal || 'Principal'
  const schoolName = school.school_name || 'esteemed school'

  const messages = {
    HOT: `Good day ${principal},

We hope this message finds you well.

Be City Stationery Suppliers is reaching out with a structured procurement package specifically tailored for ${schoolName}.

Our package includes:
• Learner Teacher Support Material (LTSM)
• Quality stationery supplies
• Cleaning and hygiene consumables
• Fast, reliable delivery

We understand your school's procurement cycle and are ready to support with competitive pricing and immediate fulfillment.

Would you be available for a brief call this week to discuss your upcoming procurement needs?

Best regards,
Be City Stationery Suppliers
School Procurement Division`,

    WARM: `Hello ${principal},

Following up on our previous communication regarding procurement support for ${schoolName}.

We continue to offer:
• Structured supplier partnerships
• Efficient budget management
• Reliable delivery systems

Please let us know if there's anything we can support with at this time.

Best regards,
Be City Stationery Suppliers`,

    COLD: `Hello ${principal},

Be City Stationery Suppliers is a trusted procurement partner for schools across South Africa.

We specialize in:
• LTSM supply solutions
• Bulk stationery provision
• Efficient procurement processes

Should your school require procurement support in the future, we would welcome the opportunity to serve you.

Best regards,
Be City Stationery Suppliers`,
  }

  return messages[stage]
}

export function generateFollowUpReminder(school: School, daysSinceContact: number): string {
  return `Follow-up reminder: ${school.school_name} - Last contact ${daysSinceContact} days ago. Next action required.`
}
