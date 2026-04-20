'use client'
import { useState } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { EducationEntry } from '@/utils/types'

function EntryCard({ entry, index, onChange, onRemove }: { entry: EducationEntry; index: number; onChange: (e: EducationEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (f: keyof EducationEntry, v: string) => onChange({ ...entry, [f]: v })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.institution || `Education ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.degree} {entry.field && `· ${entry.field}`}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 grid grid-cols-2 gap-3 anim-in">
          <div className="col-span-2"><label className="rr-label">Institution *</label><input className="rr-input" placeholder="MIT, Harvard…" value={entry.institution} onChange={e => u('institution', e.target.value)} /></div>
          <div><label className="rr-label">Degree</label><input className="rr-input" placeholder="B.S., M.A.…" value={entry.degree} onChange={e => u('degree', e.target.value)} /></div>
          <div><label className="rr-label">Field of Study</label><input className="rr-input" placeholder="Computer Science" value={entry.field} onChange={e => u('field', e.target.value)} /></div>
          <div><label className="rr-label">Start Date</label><input className="rr-input" type="month" value={entry.startDate} onChange={e => u('startDate', e.target.value)} /></div>
          <div><label className="rr-label">End Date</label><input className="rr-input" type="month" value={entry.endDate} onChange={e => u('endDate', e.target.value)} /></div>
          <div><label className="rr-label">GPA</label><input className="rr-input" placeholder="3.8" value={entry.gpa} onChange={e => u('gpa', e.target.value)} /></div>
          <div><label className="rr-label">Honors / Distinction</label><input className="rr-input" placeholder="Magna Cum Laude…" value={entry.honors} onChange={e => u('honors', e.target.value)} /></div>
        </div>
      )}
    </div>
  )
}

export default function EducationForm({ entries, onChange }: { entries: EducationEntry[]; onChange: (e: EducationEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', honors: '' }])
  const upd = (i: number, e: EducationEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Education</button>
    </div>
  )
}
