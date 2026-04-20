'use client'
import {ResumeData, TemplateSettings, CustomTemplate} from '@/utils/types'
import {dateRange} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings; template: CustomTemplate }

interface Block {
  id: string; type: string; bg?: string; color?: string; fontSize?: number
  bold?: boolean; italic?: boolean; align?: 'left'|'center'|'right'; padding?: number; borderBottom?: boolean; label?: string
}

export default function CustomBlockRenderer({ data: d, settings: s, template }: P) {
  let blocks: Block[] = []
  try { blocks = JSON.parse(template.code) } catch { return <div style={{ padding: 40, color: '#888' }}>Could not render custom template.</div> }

  const c = s.accentColor

  return (
    <div style={{ fontFamily: s.fontFamily || 'Arial', fontSize: 9.5, background: '#fff', width: '100%', boxSizing: 'border-box' }}>
      {blocks.map(b => {
        const pad = b.padding ?? 16
        const baseStyle: React.CSSProperties = {
          background: b.bg, color: b.color, fontSize: b.fontSize,
          fontWeight: b.bold ? 700 : undefined, fontStyle: b.italic ? 'italic' : undefined,
          textAlign: b.align, padding: pad, borderBottom: b.borderBottom ? `1.5px solid ${c}` : undefined,
          boxSizing: 'border-box',
        }

        switch (b.type) {
          case 'header':
            return <div key={b.id} style={baseStyle}>
              <h1 style={{ fontSize: b.fontSize || 24, fontWeight: b.bold ? 900 : 700, color: b.color || '#111', margin: '0 0 4px', textAlign: b.align || 'left' }}>{d.personal.name || 'Your Name'}</h1>
              {d.personal.title && <p style={{ fontSize: 10, color: b.bg ? '#fff' : c, margin: '0 0 8px' }}>{d.personal.title}</p>}
            </div>
          case 'contact-row':
            return <div key={b.id} style={{ ...baseStyle, display: 'flex', flexWrap: 'wrap', gap: '0 14px', fontSize: b.fontSize || 8.5 }}>
              {d.personal.email && <span>{d.personal.email}</span>}
              {d.personal.phone && <span>{d.personal.phone}</span>}
              {d.personal.location && <span>{d.personal.location}</span>}
              {d.personal.website && <span>{d.personal.website}</span>}
              {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
            </div>
          case 'divider':
            return <div key={b.id} style={{ height: 1, background: b.color || c, margin: `4px ${pad}px`, opacity: 0.4 }} />
          case 'section-title':
            return <div key={b.id} style={baseStyle}>
              <h2 style={{ fontSize: b.fontSize || 8.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: b.color || c, margin: 0 }}>{b.label || 'Section'}</h2>
            </div>
          case 'text':
            return d.personal.summary ? <div key={b.id} style={baseStyle}>
              <p style={{ margin: 0, lineHeight: 1.65, color: b.color || '#444', fontSize: b.fontSize || 9.5 }}>{d.personal.summary}</p>
            </div> : null
          case 'skill-tags':
            return d.skills.length > 0 ? <div key={b.id} style={{ ...baseStyle, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {d.skills.map((sk, i) => <span key={i} style={{ border: `1px solid ${c}`, color: c, padding: '2px 10px', borderRadius: 20, fontSize: b.fontSize || 8.5 }}>{sk}</span>)}
            </div> : null
          case 'experience-list':
            return d.experience.length > 0 ? <div key={b.id} style={baseStyle}>
              {d.experience.map(e => <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 700, fontSize: 10, margin: '0 0 1px', color: b.color || '#111' }}>{e.role}<span style={{ fontWeight: 400, color: '#666' }}> — {e.company}</span></p>
                  <span style={{ fontSize: 8, color: '#888' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                {e.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#444' }}>{e.description}</p>}
                {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 8.5, color: '#555', lineHeight: 1.6 }}>
                  {e.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>}
              </div>)}
            </div> : null
          case 'education-list':
            return d.education.length > 0 ? <div key={b.id} style={baseStyle}>
              {d.education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
                <p style={{ fontWeight: 700, fontSize: 10, margin: '0 0 1px', color: b.color || '#111' }}>{e.institution}</p>
                <p style={{ fontSize: 9, color: '#555', margin: '1px 0 0' }}>{e.degree} {e.field}{e.honors ? ` · ${e.honors}` : ''}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
                <p style={{ fontSize: 8, color: '#999', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
              </div>)}
            </div> : null
          case 'two-columns':
            return <div key={b.id} style={{ display: 'flex', gap: 0 }}>
              <div style={{ flex: 1, padding: pad }}>
                {d.skills.length > 0 && d.skills.map((sk, i) => <p key={i} style={{ fontSize: b.fontSize || 9, margin: '0 0 4px', color: b.color || '#333' }}>{sk}</p>)}
              </div>
              <div style={{ flex: 1, padding: pad, borderLeft: '1px solid #eee' }}>
                {d.personal.summary && <p style={{ fontSize: b.fontSize || 9, color: b.color || '#444', margin: 0, lineHeight: 1.6 }}>{d.personal.summary}</p>}
              </div>
            </div>
          default:
            return <div key={b.id} style={baseStyle} />
        }
      })}
    </div>
  )
}
