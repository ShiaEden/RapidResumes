'use client'
import { useState } from 'react'
import { X, Plus, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react'
import { CustomTemplate, TemplateSettings } from '@/utils/types'
import clsx from 'clsx'

// Block types the user can add
type BlockType = 'header' | 'section-title' | 'text' | 'divider' | 'two-columns' | 'contact-row' | 'skill-tags' | 'experience-list' | 'education-list'

interface Block {
  id: string
  type: BlockType
  // Style overrides
  bg?: string
  color?: string
  fontSize?: number
  bold?: boolean
  italic?: boolean
  align?: 'left' | 'center' | 'right'
  padding?: number
  borderBottom?: boolean
  label?: string  // for section-title
}

const BLOCK_CATALOG: { type: BlockType; label: string; desc: string }[] = [
  { type: 'header',         label: 'Name Header',     desc: 'Name, title, contact info at top' },
  { type: 'contact-row',    label: 'Contact Row',      desc: 'Email · Phone · Location inline' },
  { type: 'divider',        label: 'Divider Line',     desc: 'Horizontal rule separator' },
  { type: 'section-title',  label: 'Section Title',    desc: 'Heading for a section' },
  { type: 'experience-list',label: 'Experience List',  desc: 'All jobs from your data' },
  { type: 'education-list', label: 'Education List',   desc: 'All schools from your data' },
  { type: 'skill-tags',     label: 'Skill Tags',       desc: 'Your skills as pill badges' },
  { type: 'two-columns',    label: 'Two Columns',      desc: 'Split layout side by side' },
  { type: 'text',           label: 'Summary Text',     desc: 'Professional summary block' },
]

function BlockRow({ block, index, total, onChange, onRemove, onMoveUp, onMoveDown, accentColor }:
  { block: Block; index: number; total: number; onChange: (b: Block) => void; onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void; accentColor: string }) {
  const [exp, setExp] = useState(false)
  const u = (p: Partial<Block>) => onChange({ ...block, ...p })

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-gray-800/60">
        <div className="flex flex-col gap-0.5">
          <button onClick={onMoveUp} disabled={index === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"><ChevronUp size={12} /></button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"><ChevronDown size={12} /></button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{BLOCK_CATALOG.find(c => c.type === block.type)?.label || block.type}</p>
          {block.label && <p className="text-xs text-gray-400 truncate">&quot;{block.label}&quot;</p>}
        </div>
        <button onClick={() => setExp(!exp)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {exp ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
        <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
      </div>
      {exp && (
        <div className="p-3 grid grid-cols-3 gap-2.5 anim-in">
          {block.type === 'section-title' && (
            <div className="col-span-3">
              <label className="rr-label">Section Name</label>
              <input className="rr-input text-sm" placeholder="Experience, Skills…" value={block.label || ''} onChange={e => u({ label: e.target.value })} />
            </div>
          )}
          <div>
            <label className="rr-label">Background</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={block.bg || '#ffffff'} onChange={e => u({ bg: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
              <button onClick={() => u({ bg: undefined })} className="text-xs text-gray-400 hover:text-red-500">Clear</button>
            </div>
          </div>
          <div>
            <label className="rr-label">Text Color</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={block.color || '#111111'} onChange={e => u({ color: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
              <button onClick={() => u({ bg: accentColor })} className="text-xs text-blue-500 hover:text-blue-600">Accent bg</button>
            </div>
          </div>
          <div>
            <label className="rr-label">Font Size (pt)</label>
            <input type="number" min="7" max="36" className="rr-input text-sm" value={block.fontSize || 10} onChange={e => u({ fontSize: parseInt(e.target.value) })} />
          </div>
          <div>
            <label className="rr-label">Padding (px)</label>
            <input type="number" min="0" max="60" className="rr-input text-sm" value={block.padding ?? 16} onChange={e => u({ padding: parseInt(e.target.value) })} />
          </div>
          <div>
            <label className="rr-label">Align</label>
            <select className="rr-input text-sm" value={block.align || 'left'} onChange={e => u({ align: e.target.value as 'left' | 'center' | 'right' })}>
              <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
            </select>
          </div>
          <div className="col-span-3 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={!!block.bold} onChange={e => u({ bold: e.target.checked })} className="rounded" /> Bold text
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={!!block.italic} onChange={e => u({ italic: e.target.checked })} className="rounded" /> Italic
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={!!block.borderBottom} onChange={e => u({ borderBottom: e.target.checked })} className="rounded" /> Border bottom
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

function serializeBlocks(blocks: Block[], name: string, accentColor: string): string {
  // Generate a working TSX component from the block list
  const renderBlock = (b: Block): string => {
    const pad = b.padding ?? 16
    const bg = b.bg ? `background: '${b.bg}'` : ''
    const color = b.color ? `color: '${b.color}'` : ''
    const fontSize = b.fontSize ? `fontSize: ${b.fontSize}` : ''
    const fontWeight = b.bold ? `fontWeight: 700` : ''
    const fontStyle = b.italic ? `fontStyle: 'italic'` : ''
    const textAlign = b.align && b.align !== 'left' ? `textAlign: '${b.align}'` : ''
    const border = b.borderBottom ? `borderBottom: '1.5px solid ${accentColor}'` : ''
    const styleProps = [bg, color, fontSize, fontWeight, fontStyle, textAlign, border].filter(Boolean).join(', ')
    const style = `{ padding: ${pad}, ${styleProps} }`

    switch (b.type) {
      case 'header':
        return `<div style={${style}}>
          <h1 style={{ fontSize: ${b.fontSize || 24}, fontWeight: ${b.bold ? 900 : 700}, color: '${b.color || '#111'}', margin: '0 0 4px', textAlign: '${b.align || 'left'}' }}>{d.personal.name || 'Your Name'}</h1>
          {d.personal.title && <p style={{ fontSize: 10, color: c, margin: '0 0 8px' }}>{d.personal.title}</p>}
        </div>`
      case 'contact-row':
        return `<div style={{ ...${style}, display: 'flex', flexWrap: 'wrap', gap: '0 14px', fontSize: ${b.fontSize || 8.5} }}>
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.location && <span>{d.personal.location}</span>}
          {d.personal.website && <span>{d.personal.website}</span>}
        </div>`
      case 'divider':
        return `<div style={{ height: 1, background: '${b.color || accentColor}', margin: '4px ${pad}px', opacity: 0.4 }} />`
      case 'section-title':
        return `<div style={${style}}>
          <h2 style={{ fontSize: ${b.fontSize || 8.5}, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '${b.color || accentColor}', margin: 0 }}>${b.label || 'Section'}</h2>
        </div>`
      case 'text':
        return `{d.personal.summary && <div style={${style}}>
          <p style={{ margin: 0, lineHeight: 1.65, color: '${b.color || '#444'}', fontSize: ${b.fontSize || 9.5} }}>{d.personal.summary}</p>
        </div>}`
      case 'skill-tags':
        return `{d.skills.length > 0 && <div style={{ ...${style}, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {d.skills.map((sk, i) => <span key={i} style={{ border: '1px solid ${accentColor}', color: '${accentColor}', padding: '2px 10px', borderRadius: 20, fontSize: ${b.fontSize || 8.5} }}>{sk}</span>)}
        </div>}`
      case 'experience-list':
        return `{d.experience.length > 0 && <div style={${style}}>
          {d.experience.map(e => <div key={e.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{e.role}<span style={{ fontWeight: 400, color: '#666' }}> — {e.company}</span></p>
              <span style={{ fontSize: 8, color: '#888' }}>{e.current ? 'Present' : e.endDate}</span>
            </div>
            {e.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#444' }}>{e.description}</p>}
          </div>)}
        </div>}`
      case 'education-list':
        return `{d.education.length > 0 && <div style={${style}}>
          {d.education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
            <p style={{ fontWeight: 700, margin: 0 }}>{e.institution}</p>
            <p style={{ fontSize: 9, color: '#555', margin: '2px 0 0' }}>{e.degree} {e.field}{e.honors ? ' · ' + e.honors : ''}</p>
          </div>)}
        </div>}`
      case 'two-columns':
        return `<div style={{ display: 'flex', gap: 0 }}>
          <div style={{ flex: 1, padding: ${pad} }}>
            {/* Left column — skills */}
            {d.skills.length > 0 && <div>{d.skills.map((sk, i) => <p key={i} style={{ fontSize: 9, margin: '0 0 4px' }}>{sk}</p>)}</div>}
          </div>
          <div style={{ flex: 1, padding: ${pad}, borderLeft: '1px solid #eee' }}>
            {/* Right column — summary */}
            {d.personal.summary && <p style={{ fontSize: 9, color: '#444', margin: 0 }}>{d.personal.summary}</p>}
          </div>
        </div>`
      default:
        return `<div style={${style}} />`
    }
  }

  return `import { ResumeData, TemplateSettings } from '@/utils/types'

interface P { data: ResumeData; settings: TemplateSettings }

export default function ${name.replace(/\s+/g, '')}Template({ data: d, settings: s }: P) {
  const c = s.accentColor
  return (
    <div style={{ fontFamily: s.fontFamily || 'Arial', fontSize: 9.5, background: '#fff', width: '100%', boxSizing: 'border-box' }}>
${blocks.map(b => '      ' + renderBlock(b)).join('\n')}
    </div>
  )
}
`
}

interface BuilderProps {
  accentColor: string
  existing?: CustomTemplate
  onSave: (tpl: CustomTemplate) => void
  onClose: () => void
}

export default function CustomTemplateBuilder({ accentColor, existing, onSave, onClose }: BuilderProps) {
  const [name, setName] = useState(existing?.name || 'My Template')
  const [blocks, setBlocks] = useState<Block[]>(() => {
    if (existing) {
      try { return JSON.parse(existing.code) } catch {}
    }
    return [
      { id: '1', type: 'header', bg: accentColor, color: '#fff', padding: 28, align: 'left', bold: true },
      { id: '2', type: 'divider' },
      { id: '3', type: 'section-title', label: 'Summary', color: accentColor, padding: 16 },
      { id: '4', type: 'text', padding: 16 },
      { id: '5', type: 'section-title', label: 'Experience', color: accentColor, padding: 16 },
      { id: '6', type: 'experience-list', padding: 16 },
    ]
  })
  const [showCatalog, setShowCatalog] = useState(false)

  const addBlock = (type: BlockType) => {
    setBlocks(prev => [...prev, { id: Date.now().toString(), type, padding: 16 }])
    setShowCatalog(false)
  }
  const updateBlock = (i: number, b: Block) => { const n = [...blocks]; n[i] = b; setBlocks(n) }
  const removeBlock = (i: number) => setBlocks(b => b.filter((_, idx) => idx !== i))
  const moveUp = (i: number) => { if (i === 0) return; const n = [...blocks]; [n[i-1], n[i]] = [n[i], n[i-1]]; setBlocks(n) }
  const moveDown = (i: number) => { if (i >= blocks.length - 1) return; const n = [...blocks]; [n[i], n[i+1]] = [n[i+1], n[i]]; setBlocks(n) }

  const handleSave = () => {
    const tpl: CustomTemplate = {
      id: existing?.id || Date.now().toString(),
      name,
      code: JSON.stringify(blocks),  // store block config as JSON
      createdAt: Date.now(),
    }
    onSave(tpl)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex-1">
            <input className="rr-input text-base font-bold" value={name} onChange={e => setName(e.target.value)} placeholder="Template name…" />
          </div>
          <button onClick={handleSave} className="rr-btn-primary px-4 py-2 rounded-xl text-sm" style={{ background: accentColor }}>
            <Save size={14} /> Save Template
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><X size={18} /></button>
        </div>

        {/* Info bar */}
        <div className="px-5 py-2.5 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Block Builder — add sections, reorder them, and style each one. Your resume data fills in automatically.
          </p>
        </div>

        {/* Block list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {blocks.map((b, i) => (
            <BlockRow key={b.id} block={b} index={i} total={blocks.length}
              onChange={nb => updateBlock(i, nb)} onRemove={() => removeBlock(i)}
              onMoveUp={() => moveUp(i)} onMoveDown={() => moveDown(i)} accentColor={accentColor} />
          ))}

          {/* Add block */}
          {showCatalog ? (
            <div className="rr-card p-4 anim-in">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Choose a Block</p>
                <button onClick={() => setShowCatalog(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BLOCK_CATALOG.map(c => (
                  <button key={c.type} onClick={() => addBlock(c.type)}
                    className="flex flex-col items-start gap-0.5 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left">
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{c.label}</span>
                    <span className="text-[10px] text-gray-400">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button onClick={() => setShowCatalog(true)} className="rr-add-btn">
              <Plus size={15} /> Add Block
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
