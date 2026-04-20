'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical, X } from 'lucide-react'
import { ExperienceEntry } from '@/utils/types'

function BulletInput({ items, onChange }: { items: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const add = () => { const t = draft.trim(); if (t) { onChange([...items, t]); setDraft('') } }
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); add() } }
  return (
    <div>
      <label className="rr-label">Key Bullet Points / Achievements</label>
      <div className="space-y-1.5 mb-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 group">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 py-1.5 leading-snug">{item}</span>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="mt-1.5 p-1 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded"><X size={12} /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input ref={ref} className="rr-input flex-1 text-sm" placeholder="e.g. Reduced load time by 60%…"
          value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={onKey} />
        <button onClick={add} disabled={!draft.trim()} className="px-3 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-500 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 disabled:opacity-40 transition-all flex-shrink-0"><Plus size={14} /></button>
      </div>
    </div>
  )
}

function EntryCard({ entry, index, onChange, onRemove }: { entry: ExperienceEntry; index: number; onChange: (e: ExperienceEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (field: keyof ExperienceEntry, val: string | boolean | string[]) => onChange({ ...entry, [field]: val })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.role || `Experience ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.company}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 grid grid-cols-2 gap-3 anim-in">
          <div className="col-span-2"><label className="rr-label">Job Title *</label><input className="rr-input" placeholder="Senior Engineer" value={entry.role} onChange={e => u('role', e.target.value)} /></div>
          <div className="col-span-2"><label className="rr-label">Company *</label><input className="rr-input" placeholder="Acme Corp" value={entry.company} onChange={e => u('company', e.target.value)} /></div>
          <div><label className="rr-label">Start Date</label><input className="rr-input" type="month" value={entry.startDate} onChange={e => u('startDate', e.target.value)} /></div>
          <div>
            <label className="rr-label">End Date</label>
            <input className="rr-input" type="month" value={entry.endDate} disabled={entry.current} onChange={e => u('endDate', e.target.value)} />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={entry.current} onChange={e => u('current', e.target.checked)} className="rounded" />
              <span className="text-xs text-gray-500">Currently here</span>
            </label>
          </div>
          <div className="col-span-2"><label className="rr-label">Description</label><textarea className="rr-input resize-none" rows={3} placeholder="Brief role overview…" value={entry.description} onChange={e => u('description', e.target.value)} /></div>
          <div className="col-span-2"><BulletInput items={entry.achievements || []} onChange={v => u('achievements', v)} /></div>
        </div>
      )}
    </div>
  )
}

export default function ExperienceForm({ entries, onChange }: { entries: ExperienceEntry[]; onChange: (e: ExperienceEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', current: false, description: '', achievements: [] }])
  const upd = (i: number, e: ExperienceEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Experience</button>
    </div>
  )
}
