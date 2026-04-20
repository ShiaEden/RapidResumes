'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import { X } from 'lucide-react'

export default function SkillInput({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [input, setInput] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const add = (s: string) => { const t = s.trim(); if (t && !skills.includes(t)) onChange([...skills, t]); setInput('') }
  const remove = (i: number) => onChange(skills.filter((_, idx) => idx !== i))
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) }
    else if (e.key === 'Backspace' && !input && skills.length) remove(skills.length - 1)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl min-h-[48px] cursor-text bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
        onClick={() => ref.current?.focus()}>
        {skills.map((sk, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium group">
            {sk}
            <button onClick={(e) => { e.stopPropagation(); remove(i) }} className="text-gray-400 hover:text-red-500 transition-colors"><X size={11} /></button>
          </span>
        ))}
        <input ref={ref} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          onBlur={() => input && add(input)}
          placeholder={skills.length === 0 ? 'Type a skill, press Enter…' : 'Add more…'}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400" />
      </div>
      <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add</p>
    </div>
  )
}
