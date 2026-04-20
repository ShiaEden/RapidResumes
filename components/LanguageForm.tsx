'use client'
import { Trash2, Plus } from 'lucide-react'
import { LanguageEntry } from '@/utils/types'
import clsx from 'clsx'

const LEVELS: LanguageEntry['proficiency'][] = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']
const COLORS: Record<string, string> = {
  Native: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Fluent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Advanced: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Basic: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

export default function LanguageForm({ entries, onChange }: { entries: LanguageEntry[]; onChange: (e: LanguageEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), language: '', proficiency: 'Intermediate' }])
  const upd = (i: number, f: keyof LanguageEntry, v: string) => { const n = [...entries]; n[i] = { ...n[i], [f]: v }; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-2 pt-2">
      {entries.map((e, i) => (
        <div key={e.id} className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
          <input className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 min-w-0"
            placeholder="Language name…" value={e.language} onChange={ev => upd(i, 'language', ev.target.value)} />
          <select className={clsx('text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 outline-none cursor-pointer', COLORS[e.proficiency])}
            value={e.proficiency} onChange={ev => upd(i, 'proficiency', ev.target.value)}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <button onClick={() => del(i)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        </div>
      ))}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Language</button>
    </div>
  )
}
