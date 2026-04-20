'use client'
import { useState } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { VolunteerEntry } from '@/utils/types'

function EntryCard({ entry, index, onChange, onRemove }: { entry: VolunteerEntry; index: number; onChange: (e: VolunteerEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (f: keyof VolunteerEntry, v: string | boolean) => onChange({ ...entry, [f]: v })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.role || `Volunteer ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.organization}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 grid grid-cols-2 gap-3 anim-in">
          <div className="col-span-2"><label className="rr-label">Role *</label><input className="rr-input" placeholder="Volunteer Tutor…" value={entry.role} onChange={e => u('role', e.target.value)} /></div>
          <div className="col-span-2"><label className="rr-label">Organization</label><input className="rr-input" placeholder="Red Cross, Local School…" value={entry.organization} onChange={e => u('organization', e.target.value)} /></div>
          <div><label className="rr-label">Start Date</label><input className="rr-input" type="month" value={entry.startDate} onChange={e => u('startDate', e.target.value)} /></div>
          <div>
            <label className="rr-label">End Date</label>
            <input className="rr-input" type="month" value={entry.endDate} disabled={entry.current} onChange={e => u('endDate', e.target.value)} />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={entry.current} onChange={e => u('current', e.target.checked)} className="rounded" />
              <span className="text-xs text-gray-500">Ongoing</span>
            </label>
          </div>
          <div className="col-span-2"><label className="rr-label">Description</label><textarea className="rr-input resize-none" rows={3} placeholder="What did you do?" value={entry.description} onChange={e => u('description', e.target.value)} /></div>
        </div>
      )}
    </div>
  )
}

export default function VolunteerForm({ entries, onChange }: { entries: VolunteerEntry[]; onChange: (e: VolunteerEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), organization: '', role: '', startDate: '', endDate: '', current: false, description: '' }])
  const upd = (i: number, e: VolunteerEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Volunteer</button>
    </div>
  )
}
