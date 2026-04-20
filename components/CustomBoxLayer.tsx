'use client'
import { useState, useCallback } from 'react'
import { CustomBox, BoxAlign } from '@/utils/types'
import { Plus, X, Trash2, Bold, Italic, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  boxes: CustomBox[]
  onChange: (boxes: CustomBox[]) => void
  containerWidth: number
  containerHeight: number
  accentColor: string
}

function newBox(accentColor: string): CustomBox {
  return {
    id: `box_${Date.now()}`,
    text: 'Custom Text',
    x: 10, y: 10,
    width: 40, height: 40,
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#111111',
    background: 'transparent',
    align: 'left',
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    opacity: 1,
  }
}

interface BoxEditorProps {
  box: CustomBox
  onChange: (b: CustomBox) => void
  onDelete: () => void
  onClose: () => void
  accentColor: string
}

function BoxEditor({ box, onChange, onDelete, onClose, accentColor }: BoxEditorProps) {
  const u = (patch: Partial<CustomBox>) => onChange({ ...box, ...patch })
  return (
    <div className="absolute right-0 top-0 z-30 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 space-y-3 anim-in">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Edit Box</p>
        <div className="flex gap-1">
          <button onClick={onDelete} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={13} /></button>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"><X size={13} /></button>
        </div>
      </div>

      {/* Text */}
      <div>
        <label className="rr-label">Text</label>
        <textarea className="rr-input resize-none text-sm" rows={3} value={box.text} onChange={e => u({ text: e.target.value })} />
      </div>

      {/* Font controls */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="rr-label">Font Size</label>
          <input type="number" min="6" max="72" className="rr-input text-sm" value={box.fontSize} onChange={e => u({ fontSize: +e.target.value })} />
        </div>
        <div>
          <label className="rr-label">Opacity</label>
          <input type="number" min="0.1" max="1" step="0.05" className="rr-input text-sm" value={box.opacity} onChange={e => u({ opacity: +e.target.value })} />
        </div>
      </div>

      {/* Style toggles */}
      <div className="flex gap-2">
        <button onClick={() => u({ fontWeight: box.fontWeight === 'bold' ? 'normal' : 'bold' })}
          className={clsx('flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all', box.fontWeight === 'bold' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500')}>
          <Bold size={12} className="mx-auto" />
        </button>
        <button onClick={() => u({ fontStyle: box.fontStyle === 'italic' ? 'normal' : 'italic' })}
          className={clsx('flex-1 py-1.5 rounded-lg border text-xs transition-all italic', box.fontStyle === 'italic' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500')}>
          <Italic size={12} className="mx-auto" />
        </button>
        {(['left','center','right'] as BoxAlign[]).map(a => (
          <button key={a} onClick={() => u({ align: a })}
            className={clsx('flex-1 py-1.5 rounded-lg border text-xs transition-all', box.align === a ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500')}>
            {a === 'left' ? <AlignLeft size={12} className="mx-auto" /> : a === 'center' ? <AlignCenter size={12} className="mx-auto" /> : <AlignRight size={12} className="mx-auto" />}
          </button>
        ))}
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="rr-label">Text Color</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={box.color} onChange={e => u({ color: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
            <span className="text-xs text-gray-500">{box.color}</span>
          </div>
        </div>
        <div>
          <label className="rr-label">Background</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={box.background === 'transparent' ? '#ffffff' : box.background}
              onChange={e => u({ background: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
            <button className="text-xs text-gray-400 hover:text-red-500" onClick={() => u({ background: 'transparent' })}>Clear</button>
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="rr-label">Border Color</label>
          <input type="color" value={box.borderColor === 'transparent' ? '#cccccc' : box.borderColor}
            onChange={e => u({ borderColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
        </div>
        <div>
          <label className="rr-label">Border Width</label>
          <input type="number" min="0" max="8" className="rr-input text-sm" value={box.borderWidth} onChange={e => u({ borderWidth: +e.target.value })} />
        </div>
      </div>

      {/* Position & size */}
      <div className="grid grid-cols-2 gap-2">
        <div><label className="rr-label">X (%)</label><input type="number" min="0" max="90" className="rr-input text-sm" value={Math.round(box.x)} onChange={e => u({ x: +e.target.value })} /></div>
        <div><label className="rr-label">Y (%)</label><input type="number" min="0" max="90" className="rr-input text-sm" value={Math.round(box.y)} onChange={e => u({ y: +e.target.value })} /></div>
        <div><label className="rr-label">Width (%)</label><input type="number" min="5" max="100" className="rr-input text-sm" value={Math.round(box.width)} onChange={e => u({ width: +e.target.value })} /></div>
        <div><label className="rr-label">Height (px)</label><input type="number" min="20" max="500" className="rr-input text-sm" value={Math.round(box.height)} onChange={e => u({ height: +e.target.value })} /></div>
      </div>

      <div><label className="rr-label">Corner Radius (px)</label>
        <input type="number" min="0" max="50" className="rr-input text-sm" value={box.borderRadius} onChange={e => u({ borderRadius: +e.target.value })} /></div>
    </div>
  )
}

export default function CustomBoxLayer({ boxes, onChange, containerWidth, containerHeight, accentColor }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null)

  const add = () => {
    const b = newBox(accentColor)
    onChange([...boxes, b])
    setEditingId(b.id)
  }

  const update = (id: string, patch: Partial<CustomBox>) =>
    onChange(boxes.map(b => b.id === id ? { ...b, ...patch } : b))

  const remove = (id: string) => {
    onChange(boxes.filter(b => b.id !== id))
    setEditingId(null)
  }

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const box = boxes.find(b => b.id === id)!
    setDragging({ id, startX: e.clientX, startY: e.clientY, origX: box.x, origY: box.y })
    setEditingId(id)
  }

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || containerWidth === 0) return
    const dx = ((e.clientX - dragging.startX) / containerWidth) * 100
    const dy = ((e.clientY - dragging.startY) / containerHeight) * 100
    update(dragging.id, {
      x: Math.max(0, Math.min(95, dragging.origX + dx)),
      y: Math.max(0, Math.min(95, dragging.origY + dy)),
    })
  }, [dragging, containerWidth, containerHeight])

  const onMouseUp = () => setDragging(null)

  if (boxes.length === 0 && editingId === null) {
    return (
      <div className="absolute top-2 right-2 z-20">
        <button onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-md hover:opacity-90 transition-all"
          style={{ background: accentColor }}>
          <Type size={12} /> Add Box
        </button>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-20" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {/* Add button */}
      <div className="absolute top-2 right-2 z-30">
        <button onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-md hover:opacity-90 transition-all"
          style={{ background: accentColor }}>
          <Plus size={12} /> Add Box
        </button>
      </div>

      {/* Editor panel */}
      {editingId && (() => {
        const box = boxes.find(b => b.id === editingId)
        if (!box) return null
        return (
          <div className="absolute top-10 right-2 z-30">
            <BoxEditor box={box} onChange={b => update(editingId, b)} onDelete={() => remove(editingId)} onClose={() => setEditingId(null)} accentColor={accentColor} />
          </div>
        )
      })()}

      {/* Rendered boxes */}
      {boxes.map(box => (
        <div
          key={box.id}
          onMouseDown={e => onMouseDown(e, box.id)}
          style={{
            position: 'absolute',
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: box.height,
            fontSize: box.fontSize,
            fontWeight: box.fontWeight,
            fontStyle: box.fontStyle,
            color: box.color,
            background: box.background,
            textAlign: box.align,
            borderRadius: box.borderRadius,
            border: box.borderWidth > 0 ? `${box.borderWidth}px solid ${box.borderColor}` : undefined,
            opacity: box.opacity,
            cursor: dragging?.id === box.id ? 'grabbing' : 'grab',
            userSelect: 'none',
            padding: '4px 8px',
            outline: editingId === box.id ? `2px solid ${accentColor}` : '1px dashed rgba(0,0,0,0.2)',
            outlineOffset: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: box.align === 'center' ? 'center' : box.align === 'right' ? 'flex-end' : 'flex-start',
          }}
        >
          <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{box.text}</span>
        </div>
      ))}
    </div>
  )
}
