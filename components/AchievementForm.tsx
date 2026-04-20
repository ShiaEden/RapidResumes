'use client'
import { useState } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { AchievementEntry } from '@/utils/types'

function EntryCard({ entry, index, onChange, onRemove }: { entry: AchievementEntry; index: number; onChange: (e: AchievementEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (f: keyof AchievementEntry, v: string) => onChange({ ...entry, [f]: v })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.title || `Achievement ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.issuer}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 grid grid-cols-2 gap-3 anim-in">
          <div className="col-span-2"><label className="rr-label">Title *</label><input className="rr-input" placeholder="Dean's List, Award Name…" value={entry.title} onChange={e => u('title', e.target.value)} /></div>
          <div><label className="rr-label">Issuer / Org</label><input className="rr-input" placeholder="MIT, Google…" value={entry.issuer} onChange={e => u('issuer', e.target.value)} /></div>
          <div><label className="rr-label">Date</label><input className="rr-input" type="month" value={entry.date} onChange={e => u('date', e.target.value)} /></div>
          <div className="col-span-2"><label className="rr-label">Description</label><textarea className="rr-input resize-none" rows={2} placeholder="Brief description…" value={entry.description} onChange={e => u('description', e.target.value)} /></div>
        </div>
      )}
    </div>
  )
}

export default function AchievementForm({ entries, onChange }: { entries: AchievementEntry[]; onChange: (e: AchievementEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), title: '', issuer: '', date: '', description: '' }])
  const upd = (i: number, e: AchievementEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Achievement</button>
    </div>
  )
}
