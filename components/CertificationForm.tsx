'use client'
import { useState } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { CertificationEntry } from '@/utils/types'

function EntryCard({ entry, index, onChange, onRemove }: { entry: CertificationEntry; index: number; onChange: (e: CertificationEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (f: keyof CertificationEntry, v: string) => onChange({ ...entry, [f]: v })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.name || `Certification ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.issuer}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 grid grid-cols-2 gap-3 anim-in">
          <div className="col-span-2"><label className="rr-label">Certification Name *</label><input className="rr-input" placeholder="AWS Solutions Architect…" value={entry.name} onChange={e => u('name', e.target.value)} /></div>
          <div><label className="rr-label">Issuer</label><input className="rr-input" placeholder="Amazon, PMI…" value={entry.issuer} onChange={e => u('issuer', e.target.value)} /></div>
          <div><label className="rr-label">Date</label><input className="rr-input" type="month" value={entry.date} onChange={e => u('date', e.target.value)} /></div>
          <div><label className="rr-label">Credential ID</label><input className="rr-input" placeholder="ABC-123456" value={entry.credentialId} onChange={e => u('credentialId', e.target.value)} /></div>
          <div><label className="rr-label">Verify Link</label><input className="rr-input" placeholder="credly.com/…" value={entry.link} onChange={e => u('link', e.target.value)} /></div>
        </div>
      )}
    </div>
  )
}

export default function CertificationForm({ entries, onChange }: { entries: CertificationEntry[]; onChange: (e: CertificationEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), name: '', issuer: '', date: '', credentialId: '', link: '' }])
  const upd = (i: number, e: CertificationEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Certification</button>
    </div>
  )
}
