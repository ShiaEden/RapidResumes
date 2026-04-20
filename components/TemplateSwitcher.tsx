'use client'
import { TemplateId, TemplateSettings, CustomTemplate, PRO_TEMPLATES } from '@/utils/types'
import clsx from 'clsx'
import { Plus, Trash2, Pencil, Crown, Lock } from 'lucide-react'

const FREE: { id: TemplateId; name: string; dark?: boolean }[] = [
  { id: 'classic',   name: 'Classic' },
  { id: 'executive', name: 'Executive' },
  { id: 'neon',      name: 'Neon', dark: true },
  { id: 'slate',     name: 'Slate' },
  { id: 'columns',   name: 'Columns' },
  { id: 'timeline',  name: 'Timeline' },
  { id: 'bold',      name: 'Bold' },
  { id: 'elegant',   name: 'Elegant' },
  { id: 'compact',   name: 'Compact' },
  { id: 'tribune',   name: 'Tribune' },
  { id: 'carbon',    name: 'Carbon', dark: true },
  { id: 'apex',      name: 'Apex' },
  { id: 'mono',      name: 'Mono' },
]

const COLORS = ['#2563eb','#7c3aed','#059669','#dc2626','#d97706','#0891b2','#be185d','#374151','#0f172a','#b45309']
const FONTS = ['Helvetica','Georgia','Arial','Courier New','Trebuchet MS','Palatino']
const PAPERS: { id: 'a4'|'letter'|'legal'; label: string }[] = [
  { id: 'letter', label: 'US Letter' },
  { id: 'a4',     label: 'A4' },
  { id: 'legal',  label: 'Legal' },
]

interface Props {
  selected: TemplateId
  settings: TemplateSettings
  customTemplates: CustomTemplate[]
  onTemplate: (id: TemplateId) => void
  onSettings: (s: TemplateSettings) => void
  onOpenCustomBuilder: () => void
  onDeleteCustom: (id: string) => void
}

export default function TemplateSwitcher({ selected, settings, customTemplates, onTemplate, onSettings, onOpenCustomBuilder, onDeleteCustom }: Props) {
  const s = settings
  const upd = (patch: Partial<TemplateSettings>) => onSettings({ ...s, ...patch })

  return (
    <div className="space-y-5">
      {/* Free templates */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Free Templates ({FREE.length})</p>
        <div className="grid grid-cols-4 gap-2">
          {FREE.map(t => (
            <button key={t.id} onClick={() => onTemplate(t.id)}
              className={clsx('flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all text-center',
                selected === t.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600')}>
              <div className={clsx('w-full rounded-md overflow-hidden flex flex-col aspect-[2/3]', t.dark ? 'bg-gray-900' : 'bg-white border border-gray-200')}>
                <div className="h-1/3 flex items-end px-1 pb-0.5" style={{ background: t.dark ? '#1e293b' : (t.id === 'classic' || t.id === 'tribune' || t.id === 'mono' ? '#fff' : s.accentColor) }}>
                  <div className="h-1 rounded w-3/4" style={{ background: t.dark ? s.accentColor : '#fff' }} />
                </div>
                <div className="flex-1 p-1 flex flex-col gap-0.5">
                  <div className="h-0.5 rounded bg-gray-300 w-full" />
                  <div className="h-0.5 rounded bg-gray-200 w-5/6" />
                  <div className="h-0.5 rounded bg-gray-200 w-4/6" />
                </div>
              </div>
              <p className={clsx('text-[10px] font-semibold leading-tight truncate w-full',
                selected === t.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400')}>{t.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Pro templates (locked) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pro Templates ({PRO_TEMPLATES.length})</p>
          <span className="text-[10px] bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Crown size={9} /> Coming Soon
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {PRO_TEMPLATES.slice(0, 16).map(name => (
            <div key={name} className="flex flex-col items-center gap-1 p-1.5 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed relative">
              <div className="w-full aspect-[2/3] rounded bg-gradient-to-b from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-950/20 flex items-center justify-center">
                <Lock size={12} className="text-violet-400" />
              </div>
              <p className="text-[9px] text-gray-400 truncate w-full text-center">{name}</p>
            </div>
          ))}
          {PRO_TEMPLATES.length > 16 && (
            <div className="flex items-center justify-center col-span-4 py-2">
              <p className="text-xs text-gray-400">+{PRO_TEMPLATES.length - 16} more in Pro</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom templates */}
      {customTemplates.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Templates</p>
          <div className="space-y-1.5">
            {customTemplates.map(ct => (
              <div key={ct.id} className={clsx('flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all',
                selected === ct.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900')}>
                <button className="flex-1 text-left text-sm font-medium text-gray-800 dark:text-gray-200 truncate" onClick={() => onTemplate(ct.id)}>{ct.name}</button>
                <button onClick={onOpenCustomBuilder} className="p-1 text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={12} /></button>
                <button onClick={() => onDeleteCustom(ct.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={onOpenCustomBuilder} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all font-medium">
        <Plus size={15} /> Create Custom Template
      </button>

      {/* Color */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Accent Color</p>
        <div className="flex flex-wrap gap-2 items-center">
          {COLORS.map(c => (
            <button key={c} onClick={() => upd({ accentColor: c })}
              className={clsx('w-7 h-7 rounded-full transition-all hover:scale-110', s.accentColor === c && 'ring-2 ring-offset-2 ring-gray-400 scale-110')}
              style={{ backgroundColor: c }} />
          ))}
          <label className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 cursor-pointer hover:scale-110 transition-all overflow-hidden flex items-center justify-center">
            <input type="color" value={s.accentColor} onChange={e => upd({ accentColor: e.target.value })} className="opacity-0 w-0 h-0 absolute" />
          </label>
        </div>
      </div>

      {/* Font */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Font</p>
        <select className="rr-input text-sm" value={s.fontFamily} onChange={e => upd({ fontFamily: e.target.value })}>
          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Paper */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Paper Size</p>
        <div className="flex gap-2">
          {PAPERS.map(p => (
            <button key={p.id} onClick={() => upd({ paperSize: p.id })}
              className={clsx('flex-1 py-2 rounded-lg border-2 text-xs font-semibold transition-all',
                s.paperSize === p.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300')}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji toggle */}
      <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-gray-300 transition-all">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Show Emojis</p>
          <p className="text-xs text-gray-400">Off = cleaner professional PDF</p>
        </div>
        <div className={clsx('relative w-10 h-6 rounded-full transition-all', s.showEmojis ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700')}
          onClick={() => upd({ showEmojis: !s.showEmojis })}>
          <div className={clsx('absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all', s.showEmojis ? 'left-5' : 'left-1')} />
        </div>
      </label>

      {/* Layout adjustments */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Layout Adjustments</p>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1"><label className="text-xs text-gray-500">Scale</label><span className="text-xs font-mono text-gray-500">{(s.scale * 100).toFixed(0)}%</span></div>
            <input type="range" min="70" max="130" step="1" value={Math.round(s.scale * 100)}
              onChange={e => upd({ scale: parseInt(e.target.value) / 100 })} className="w-full accent-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500 mb-1 block">Offset X (px)</label>
              <input type="number" min="-50" max="50" step="1" value={s.offsetX} onChange={e => upd({ offsetX: parseInt(e.target.value) || 0 })} className="rr-input text-sm" /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Offset Y (px)</label>
              <input type="number" min="-50" max="50" step="1" value={s.offsetY} onChange={e => upd({ offsetY: parseInt(e.target.value) || 0 })} className="rr-input text-sm" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
