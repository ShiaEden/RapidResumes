'use client'
import { Trash2, Plus, Link2, ExternalLink } from 'lucide-react'
import { CustomLink } from '@/utils/types'

const SUGGESTIONS = [
  { label: 'GitHub', url: 'github.com/' },
  { label: 'Portfolio', url: '' },
  { label: 'g.dev', url: 'g.dev/' },
  { label: 'Behance', url: 'behance.net/' },
  { label: 'Dribbble', url: 'dribbble.com/' },
  { label: 'Medium', url: 'medium.com/@' },
  { label: 'YouTube', url: 'youtube.com/@' },
  { label: 'Itch.io', url: 'itch.io/' },
]

interface Props {
  links: CustomLink[]
  onChange: (links: CustomLink[]) => void
}

export default function CustomLinksForm({ links, onChange }: Props) {
  const add = (label = '', url = '') =>
    onChange([...links, { id: Date.now().toString(), label, url }])

  const update = (i: number, field: keyof CustomLink, val: string) => {
    const n = [...links]; n[i] = { ...n[i], [field]: val }; onChange(n)
  }

  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2 pt-3">
      {/* Quick-add suggestions */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {SUGGESTIONS.map(s => (
          <button key={s.label} onClick={() => add(s.label, s.url)}
            className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium">
            + {s.label}
          </button>
        ))}
      </div>

      {/* Link rows */}
      {links.map((link, i) => (
        <div key={link.id} className="flex gap-2 items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 group">
          <Link2 size={13} className="text-gray-400 flex-shrink-0" />
          <input
            className="w-24 flex-shrink-0 bg-transparent outline-none text-sm font-semibold text-gray-700 dark:text-gray-300 placeholder:text-gray-400 border-r border-gray-200 dark:border-gray-700 pr-2"
            placeholder="Label"
            value={link.label}
            onChange={e => update(i, 'label', e.target.value)}
          />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 dark:text-gray-400 placeholder:text-gray-400 min-w-0"
            placeholder="URL or handle"
            value={link.url}
            onChange={e => update(i, 'url', e.target.value)}
          />
          {link.url && (
            <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank" rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors flex-shrink-0">
              <ExternalLink size={12} />
            </a>
          )}
          <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100">
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      <button onClick={() => add()} className="rr-add-btn">
        <Plus size={15} /> Add Custom Link
      </button>

      {links.length > 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Links appear in the resume header contact section
        </p>
      )}
    </div>
  )
}
