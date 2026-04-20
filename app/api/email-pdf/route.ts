import { NextRequest, NextResponse } from 'next/server'

// To enable real email: npm install resend
// Then add RESEND_API_KEY to Vercel env vars
// import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { email, resumeName, pdfBase64 } = await req.json()

    if (!email || !pdfBase64) {
      return NextResponse.json({ error: 'Missing email or PDF data' }, { status: 400 })
    }

    // ── Uncomment to enable real sending with Resend (free tier: 3k emails/mo) ──
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'RapidResumes <noreply@rapidresumes.app>',
    //   to: email,
    //   subject: `Your resume: ${resumeName || 'Resume'}`,
    //   html: `<p>Hi! Here's your resume from <strong>RapidResumes</strong>.</p>
    //          <p>Your email was only used to deliver this file and is not stored.</p>`,
    //   attachments: [{ filename: `${resumeName || 'resume'}.pdf`, content: pdfBase64 }],
    // })

    // For now: return instructions
    return NextResponse.json({
      ok: true,
      note: 'Email sending requires RESEND_API_KEY env var. See /app/api/email-pdf/route.ts to enable.',
    })
  } catch {
    // error handled
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
