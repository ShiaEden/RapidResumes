'use client'
import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  title: string; icon: ReactNode; children: ReactNode
  defaultOpen?: boolean; badge?: string
}

export default function FormSection({ title, icon, children, defaultOpen = true, badge }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rr-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="rr-section-header">
        <span className="text-blue-500 dark:text-blue-400 flex-shrink-0">{icon}</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1 text-left">{title}</span>
        {badge && <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-medium">{badge}</span>}
        <ChevronDown size={16} className={clsx('text-gray-400 transition-transform duration-200 flex-shrink-0', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-800 anim-in">
          {children}
        </div>
      )}
    </div>
  )
}
