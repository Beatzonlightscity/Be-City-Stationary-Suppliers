import { supabase } from '../supabase'

export interface FollowUp {
  id?: string
  school_id: string
  school_name: string
  next_followup: Date
  status: 'pending' | 'completed' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  notes?: string
}

export async function createFollowUp(
  schoolId: string,
  schoolName: string,
  daysFromNow: number,
  priority: 'high' | 'medium' | 'low' = 'medium'
): Promise<FollowUp | null> {
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + daysFromNow)

  const { data, error } = await supabase.from('followups').insert({
    school_id: schoolId,
    school_name: schoolName,
    next_followup: nextDate.toISOString(),
    status: 'pending',
    priority,
  })

  if (error) {
    console.error('Error creating follow-up:', error)
    return null
  }

  return data?.[0] || null
}

export async function getOverdueFollowUps(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from('followups')
    .select('*')
    .eq('status', 'pending')
    .lt('next_followup', new Date().toISOString())

  if (error) {
    console.error('Error fetching overdue follow-ups:', error)
    return []
  }

  return data || []
}

export async function getUpcomingFollowUps(daysAhead: number = 7): Promise<FollowUp[]> {
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + daysAhead)

  const { data, error } = await supabase
    .from('followups')
    .select('*')
    .eq('status', 'pending')
    .gte('next_followup', today.toISOString())
    .lte('next_followup', futureDate.toISOString())

  if (error) {
    console.error('Error fetching upcoming follow-ups:', error)
    return []
  }

  return data || []
}

export async function completeFollowUp(followUpId: string): Promise<boolean> {
  const { error } = await supabase
    .from('followups')
    .update({ status: 'completed' })
    .eq('id', followUpId)

  if (error) {
    console.error('Error completing follow-up:', error)
    return false
  }

  return true
}
