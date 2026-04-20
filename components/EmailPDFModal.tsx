'use client'
import {useState} from 'react'
import {X, Mail, Send, CheckCircle2, ShieldCheck} from 'lucide-react'

interface Props {
  onClose: () => void
  onSend: (email: string) => Promise<void>
  accentColor: string
  resumeName: string
}

export default function EmailPDFModal({ onClose, onSend, accentColor, resumeName }: Props) {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSend = async () => {
    if (!valid) return
    setSending(true); setError('')
    try {
      await onSend(email)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send. Please try downloading instead.')
    } finally { setSending(false) }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Mail size={17} className="text-blue-500" />
            <h2 className="font-bold text-gray-900 dark:text-gray-100">Email my Resume</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"><X size={16} /></button>
        </div>

        <div className="p-5 space-y-4">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle2 size={40} className="text-green-500" />
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">Email sent!</p>
                <p className="text-sm text-gray-500 mt-1">Check <span className="font-medium">{email}</span> — your PDF should arrive within a minute.</p>
              </div>
              <button onClick={onClose} className="mt-1 px-5 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: accentColor }}>Done</button>
            </div>
          ) : (
            <>
              <div>
                <label className="rr-label">Your email address</label>
                <input type="email" className="rr-input" placeholder="you@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()} autoFocus />
              </div>

              {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">{error}</p>}

              {/* Privacy notice */}
              <div className="flex items-start gap-2.5 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/40">
                <ShieldCheck size={15} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400">Your email is only used to send your resume.</p>
                  <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">We don't store it, sell it, or contact you again.</p>
                </div>
              </div>

              <button onClick={handleSend} disabled={!valid || sending}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50 active:scale-95"
                style={{ background: accentColor }}>
                {sending
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                  : <><Send size={14} />Send PDF to my email</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
