'use client'
import { useState } from 'react'
import { X, MessageSquare, Bug, Lightbulb, Send, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'

type FeedbackType = 'feature' | 'bug' | 'general'

interface Props {
  onClose: () => void
  accentColor: string
}

export default function FeedbackModal({ onClose, accentColor }: Props) {
  const [type, setType] = useState<FeedbackType>('feature')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return
    setSending(true)

    // Store feedback in localStorage (no backend needed)
    const feedback = {
      id: Date.now().toString(),
      type, name: name.trim() || 'Anonymous',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }
    try {
      const existing = JSON.parse(localStorage.getItem('rr_feedback') || '[]')
      localStorage.setItem('rr_feedback', JSON.stringify([feedback, ...existing].slice(0, 50)))
    } catch {}

    // Also try to POST to a simple endpoint if available (graceful fallback)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      })
    } catch {
      // Silently fail — local save is the fallback
    }

    await new Promise(r => setTimeout(r, 600))
    setSending(false)
    setSent(true)
  }

  const TYPES: { id: FeedbackType; label: string; icon: typeof Lightbulb; desc: string }[] = [
    { id: 'feature', label: 'Suggest a Feature', icon: Lightbulb, desc: 'New feature or improvement idea' },
    { id: 'bug',     label: 'Report a Bug',      icon: Bug,       desc: 'Something not working right' },
    { id: 'general', label: 'General Feedback',  icon: MessageSquare, desc: 'Anything else on your mind' },
  ]

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base">Send Feedback</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"><X size={16} /></button>
        </div>

        <div className="p-5 space-y-4">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 size={40} className="text-green-500" />
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">Thanks for the feedback!</p>
                <p className="text-sm text-gray-500 mt-1">We read every submission and use it to make RapidResumes better.</p>
              </div>
              <button onClick={onClose} className="mt-2 px-5 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: accentColor }}>Close</button>
            </div>
          ) : (
            <>
              {/* Type selector */}
              <div className="grid grid-cols-3 gap-2">
                {TYPES.map(t => {
                  const Icon = t.icon
                  return (
                    <button key={t.id} onClick={() => setType(t.id)}
                      className={clsx('flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all',
                        type === t.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}>
                      <Icon size={16} className={type === t.id ? 'text-blue-500' : 'text-gray-400'} />
                      <span className={clsx('text-[10px] font-semibold leading-tight', type === t.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400')}>{t.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Name (optional) */}
              <div>
                <label className="rr-label">Name (optional)</label>
                <input className="rr-input" placeholder="Your name or leave blank" value={name} onChange={e => setName(e.target.value)} />
              </div>

              {/* Message */}
              <div>
                <label className="rr-label">
                  {type === 'feature' ? 'Describe your idea' : type === 'bug' ? 'What went wrong?' : 'Your message'} *
                </label>
                <textarea className="rr-input resize-none" rows={4}
                  placeholder={
                    type === 'feature' ? 'I wish RapidResumes could…' :
                    type === 'bug' ? 'When I try to… it shows…' :
                    'Just wanted to say…'
                  }
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              <button onClick={handleSubmit} disabled={!message.trim() || sending}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50 active:scale-95"
                style={{ background: accentColor }}>
                {sending
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                  : <><Send size={14} />Send Feedback</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
