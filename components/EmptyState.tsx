'use client'
import { FileText, Plus, Upload, Sparkles, CheckCircle } from 'lucide-react'

interface Props {
  accentColor: string
  onNew: () => void
  onImport: () => void
}

const TIPS = [
  'Start with your most recent job title',
  'Add 3–5 bullet points per role — keep them results-focused',
  'Tailor your summary to each job you apply for',
  'Use numbers: "Grew revenue 40%" beats "Improved revenue"',
  'Your skills section should match keywords in the job posting',
]

export default function EmptyState({ accentColor, onNew, onImport }: Props) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] p-8">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)` }}>
            <FileText size={36} style={{ color: accentColor }} />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No resumes yet</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Build a job-winning resume in minutes. Fill in your info, pick a template, and download a pixel-perfect PDF.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onNew}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-md"
            style={{ background: accentColor }}
          >
            <Plus size={16} /> Create New Resume
          </button>
          <button
            onClick={onImport}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
          >
            <Upload size={16} /> Import JSON
          </button>
        </div>

        {/* Tips for first-timers */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: accentColor }} />
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Quick tips for a great resume</p>
          </div>
          <ul className="space-y-2">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600">
          Everything saves automatically to your browser. No account needed.
        </p>
      </div>
    </div>
  )
}
