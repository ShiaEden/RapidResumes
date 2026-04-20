'use client'
import {useState} from 'react'
import {BookOpen, Trash2, Clock, ChevronDown, ChevronUp, Plus} from 'lucide-react'
import {SavedSnapshot, storage} from '@/utils/storage'
// import removed - unused
import clsx from 'clsx'

interface Props {
  onLoad: (snap: SavedSnapshot) => void
  onSaveNew: (name: string) => void
  accentColor: string
}

export default function SavedResumesPanel({ onLoad, onSaveNew, accentColor }: Props) {
  const [open, setOpen] = useState(false)
  const [snapshots, setSnapshots] = useState<SavedSnapshot[]>(() => storage.getSnapshots())
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)

  const refresh = () => setSnapshots(storage.getSnapshots())

  const handleDelete = (id: string) => {
    storage.deleteSnapshot(id)
    refresh()
  }

  const handleSave = () => {
    const name = newName.trim() || `Resume ${new Date().toLocaleDateString()}`
    onSaveNew(name)
    setNewName('')
    setSaving(false)
    setTimeout(refresh, 100)
  }

  const fmt = (ts: number) => {
    const d = new Date(ts)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="rr-card overflow-hidden">
      <button onClick={() => { setOpen(v => !v); if (!open) refresh() }}
        className="rr-section-header">
        <BookOpen size={17} className="text-blue-500 flex-shrink-0" />
        <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1 text-left">Saved Resumes</span>
        {snapshots.length > 0 && (
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-medium">{snapshots.length}</span>
        )}
        {open ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-800 anim-in space-y-3">
          {/* Save new */}
          {saving ? (
            <div className="flex gap-2">
              <input autoFocus className="rr-input flex-1 text-sm" placeholder="Resume name (e.g. Google Application)"
                value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setSaving(false) }} />
              <button onClick={handleSave} className="px-3 py-2 rounded-xl text-white text-sm font-semibold shrink-0" style={{ background: accentColor }}>Save</button>
              <button onClick={() => setSaving(false)} className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setSaving(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all font-medium">
              <Plus size={14} /> Save current resume
            </button>
          )}

          {/* Snapshot list */}
          {snapshots.length === 0 ? (
            <p className="text-xs text-center text-gray-400 py-3">No saved resumes yet.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {snapshots.map(snap => (
                <div key={snap.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl group border border-gray-100 dark:border-gray-700">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{snap.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {fmt(snap.savedAt)}
                    </p>
                  </div>
                  <button onClick={() => onLoad(snap)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    style={{ background: accentColor }}>
                    Load
                  </button>
                  <button onClick={() => handleDelete(snap.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-600">Saved locally in your browser · Max 10 snapshots</p>
        </div>
      )}
    </div>
  )
}
