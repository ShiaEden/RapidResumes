import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // In production: forward to Resend, Formspree, or just log
    // For now, just acknowledge — feedback is already saved client-side in localStorage
    console.log('[Feedback]', body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
