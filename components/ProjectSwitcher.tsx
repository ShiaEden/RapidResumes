'use client'
import { useState, useRef, useEffect } from 'react'
import { ResumeProject } from '@/utils/types'
import { ChevronDown, Plus, Trash2, Copy, Pencil, Check, Clock, FileText } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  projects: ResumeProject[]
  activeId: string
  accentColor: string
  onSwitch: (id: string) => void
  onCreate: () => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
}

function timeAgo(ms: number): string {
  const diff = Date.now() - ms
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  return `${Math.floor(diff / 86_400_000)}d ago`
}

export default function ProjectSwitcher({ projects, activeId, accentColor, onSwitch, onCreate, onDuplicate, onDelete, onRename }: Props) {
  const [open, setOpen] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const renameRef = useRef<HTMLInputElement>(null)

  const active = projects.find(p => p.id === activeId)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { if (renamingId) renameRef.current?.focus() }, [renamingId])

  const startRename = (id: string, current: string) => {
    setRenamingId(id); setRenameVal(current)
  }
  const commitRename = () => {
    if (renamingId && renameVal.trim()) { onRename(renamingId, renameVal.trim()) }
    setRenamingId(null)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all max-w-[200px]"
      >
        <FileText size={13} className="text-gray-400 flex-shrink-0" />
        <span className="truncate flex-1 text-left">{active?.name || 'Select Resume'}</span>
        <ChevronDown size={13} className={clsx('text-gray-400 flex-shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden anim-in">
          {/* Project list */}
          <div className="max-h-72 overflow-y-auto">
            {projects.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">No resumes yet</div>
            ) : (
              projects.map(proj => (
                <div key={proj.id}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2.5 group transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800 last:border-0',
                    proj.id === activeId ? 'bg-blue-50 dark:bg-blue-950/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  )}
                  onClick={() => { if (renamingId !== proj.id) { onSwitch(proj.id); setOpen(false) } }}
                >
                  {/* Active dot */}
                  <div className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', proj.id === activeId ? 'bg-blue-500' : 'bg-transparent')} style={{ background: proj.id === activeId ? accentColor : undefined }} />

                  {/* Name / rename input */}
                  {renamingId === proj.id ? (
                    <input
                      ref={renameRef}
                      className="flex-1 bg-white dark:bg-gray-800 border border-blue-400 rounded-lg px-2 py-0.5 text-sm outline-none text-gray-900 dark:text-gray-100"
                      value={renameVal}
                      onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                      onBlur={commitRename}
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <div className="flex-1 min-w-0">
                      <p className={clsx('text-sm font-medium truncate', proj.id === activeId ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200')}>{proj.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Clock size={9} /> {timeAgo(proj.updatedAt)}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {renamingId === proj.id ? (
                    <button onClick={e => { e.stopPropagation(); commitRename() }} className="p-1 text-green-500"><Check size={13} /></button>
                  ) : (
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={e => { e.stopPropagation(); startRename(proj.id, proj.name) }} className="p-1 text-gray-400 hover:text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all"><Pencil size={11} /></button>
                      <button onClick={e => { e.stopPropagation(); onDuplicate(proj.id) }} className="p-1 text-gray-400 hover:text-green-500 rounded-md hover:bg-green-50 dark:hover:bg-green-950/40 transition-all"><Copy size={11} /></button>
                      <button onClick={e => { e.stopPropagation(); if (projects.length > 1) onDelete(proj.id) }} disabled={projects.length <= 1}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-all disabled:opacity-30"><Trash2 size={11} /></button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* New resume button */}
          <div className="p-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => { onCreate(); setOpen(false) }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 text-white"
              style={{ background: accentColor }}
            >
              <Plus size={14} /> New Resume
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
