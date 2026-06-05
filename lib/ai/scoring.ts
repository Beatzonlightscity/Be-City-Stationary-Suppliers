export interface SchoolScoringInput {
  est_annual_spend?: number
  lead_status?: string
  days_since_last_contact?: number
  email?: string
  phone?: string
  supplier_lock?: string
}

export function scoreSchool(school: SchoolScoringInput): number {
  let score = 0

  // Budget scoring (0-20 points)
  if (school.est_annual_spend) {
    score += Math.min(20, (school.est_annual_spend / 100000) * 20)
  }

  // Lead status scoring (0-30 points)
  if (school.lead_status === 'Hot') {
    score += 30
  } else if (school.lead_status === 'Warm') {
    score += 15
  }

  // Contact recency scoring (0-25 points)
  if (school.days_since_last_contact) {
    if (school.days_since_last_contact <= 7) {
      score += 25
    } else if (school.days_since_last_contact <= 14) {
      score += 15
    } else if (school.days_since_last_contact <= 30) {
      score += 5
    }
  }

  // Contact information bonus (0-10 points)
  if (school.email) score += 5
  if (school.phone) score += 5

  // Supplier lock scoring (0-15 points)
  if (school.supplier_lock === 'Weak') {
    score += 15
  } else if (school.supplier_lock === 'Medium') {
    score += 8
  }

  return Math.round(score)
}

export function determineAction(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 80) return 'HOT'
  if (score >= 50) return 'WARM'
  return 'COLD'
}

export function getFollowUpDays(action: 'HOT' | 'WARM' | 'COLD'): number {
  const followUpMap = {
    HOT: 2,
    WARM: 7,
    COLD: 14,
  }
  return followUpMap[action]
}
