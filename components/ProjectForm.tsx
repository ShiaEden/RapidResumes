'use client'
import { useState } from 'react'
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { ProjectEntry } from '@/utils/types'

function EntryCard({ entry, index, onChange, onRemove }: { entry: ProjectEntry; index: number; onChange: (e: ProjectEntry) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(true)
  const u = (f: keyof ProjectEntry, v: string) => onChange({ ...entry, [f]: v })
  return (
    <div className="rr-entry-card">
      <div className="rr-entry-header">
        <GripVertical size={14} className="text-gray-300 cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{entry.name || `Project ${index + 1}`}</p>
          <p className="text-xs text-gray-500 truncate">{entry.tech}</p>
        </div>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</button>
      </div>
      {open && (
        <div className="p-4 space-y-3 anim-in">
          <div><label className="rr-label">Project Name *</label><input className="rr-input" placeholder="My Awesome Project" value={entry.name} onChange={e => u('name', e.target.value)} /></div>
          <div><label className="rr-label">Technologies</label><input className="rr-input" placeholder="React, Node.js, PostgreSQL" value={entry.tech} onChange={e => u('tech', e.target.value)} /></div>
          <div><label className="rr-label">Link</label><input className="rr-input" placeholder="github.com/you/project" value={entry.link} onChange={e => u('link', e.target.value)} /></div>
          <div><label className="rr-label">Description</label><textarea className="rr-input resize-none" rows={3} placeholder="What did it do, what was your role?" value={entry.description} onChange={e => u('description', e.target.value)} /></div>
        </div>
      )}
    </div>
  )
}

export default function ProjectForm({ entries, onChange }: { entries: ProjectEntry[]; onChange: (e: ProjectEntry[]) => void }) {
  const add = () => onChange([...entries, { id: Date.now().toString(), name: '', description: '', tech: '', link: '' }])
  const upd = (i: number, e: ProjectEntry) => { const n = [...entries]; n[i] = e; onChange(n) }
  const del = (i: number) => onChange(entries.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3 pt-2">
      {entries.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onChange={u => upd(i, u)} onRemove={() => del(i)} />)}
      <button onClick={add} className="rr-add-btn"><Plus size={15} /> Add Project</button>
    </div>
  )
}
