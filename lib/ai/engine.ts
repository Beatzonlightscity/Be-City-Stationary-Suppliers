import { supabase } from '../supabase'
import { scoreSchool, determineAction } from './scoring'
import { generateMessage } from './outreach'
import { generateQuote } from './quotes'

export interface School {
  id: string
  school_name: string
  principal?: string
  procurement_contact?: string
  phone?: string
  email?: string
  est_annual_spend?: number
  lead_status?: string
  days_since_last_contact?: number
  supplier_lock?: string
}

export async function runAIEngine() {
  console.log('[AI ENGINE] Starting autonomous procurement AI system...')

  try {
    const { data: schools, error } = await supabase
      .from('schools')
      .select('*')

    if (error) {
      console.error('[AI ENGINE] Error fetching schools:', error)
      return
    }

    if (!schools || schools.length === 0) {
      console.log('[AI ENGINE] No schools found in database')
      return
    }

    console.log(`[AI ENGINE] Processing ${schools.length} schools...`)

    for (const school of schools) {
      await processSchool(school)
    }

    console.log('[AI ENGINE] AI system execution complete')
  } catch (error) {
    console.error('[AI ENGINE] Fatal error:', error)
  }
}

async function processSchool(school: School) {
  try {
    // Calculate score
    const score = scoreSchool(school)
    const action = determineAction(score)

    // Update school record
    const { error: updateError } = await supabase
      .from('schools')
      .update({
        ai_priority_score: score,
        next_best_action: action,
        last_ai_run: new Date().toISOString(),
      })
      .eq('id', school.id)

    if (updateError) {
      console.error(`[SCHOOL ${school.id}] Update error:`, updateError)
      return
    }

    console.log(
      `[SCHOOL ${school.school_name}] Score: ${score} | Action: ${action}`
    )

    // Execute action-based workflows
    if (action === 'HOT') {
      await executeHotFlow(school, score)
    } else if (action === 'WARM') {
      await executeWarmFlow(school, score)
    }
  } catch (error) {
    console.error(`[SCHOOL ${school.id}] Processing error:`, error)
  }
}

async function executeHotFlow(school: School, score: number) {
  console.log(`[HOT FLOW] Executing for ${school.school_name}`)

  try {
    // Generate personalized message
    const message = generateMessage(school, 'HOT')

    // Generate quote
    const quote = generateQuote(school, 'HOT')

    // Log activity
    await supabase.from('activities').insert({
      school_id: school.id,
      type: 'AI_HOT_OUTREACH',
      notes: `Auto-generated HOT outreach (Score: ${score})`,
      created_at: new Date().toISOString(),
    })

    console.log(`[HOT FLOW] Message prepared for ${school.school_name}`)
    console.log(`[HOT FLOW] Quote generated: R${quote.total}`)

    // TODO: Integrate WhatsApp API
    // await sendWhatsApp(school.phone, message)

    // TODO: Integrate Email API
    // await sendEmail(school.email, 'School Procurement Quote', message)
  } catch (error) {
    console.error(`[HOT FLOW] Error for ${school.school_name}:`, error)
  }
}

async function executeWarmFlow(school: School, score: number) {
  console.log(`[WARM FLOW] Executing for ${school.school_name}`)

  try {
    const message = generateMessage(school, 'WARM')

    await supabase.from('activities').insert({
      school_id: school.id,
      type: 'AI_WARM_FOLLOWUP',
      notes: `Auto-generated WARM follow-up (Score: ${score})`,
      created_at: new Date().toISOString(),
    })

    console.log(`[WARM FLOW] Follow-up message prepared for ${school.school_name}`)
  } catch (error) {
    console.error(`[WARM FLOW] Error for ${school.school_name}:`, error)
  }
}
