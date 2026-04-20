import {ResumeData, TemplateSettings} from '@/utils/types'
import {dateRange, rgba, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Carbon: ultra-dark, monospace tech aesthetic, developer-focused
export default function CarbonTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const mono = `'Courier New', 'Lucida Console', monospace`
  const sans = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: mono, fontSize: 8.5, lineHeight: 1.65, color: '#c9d1d9', background: '#0d1117', padding: '36px 44px', boxSizing: 'border-box', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, borderBottom: `1px solid #21262d`, paddingBottom: 16 }}>
        <div style={{ color: '#8b949e', fontSize: 8, marginBottom: 4 }}>{'// resume.ts'}</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: '#f0f6fc', fontFamily: mono }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontSize: 9, color: c, margin: '0 0 10px', fontFamily: sans }}>{p.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: 7.5, color: '#8b949e' }}>
          {contacts.map((ct, i) => <span key={i}><span style={{ color: c }}>{ct.label || (i === 0 ? 'mail' : i === 1 ? 'tel' : 'link')}</span>: {ct.value}</span>)}
        </div>
      </div>

      {p.summary && <div style={{ marginBottom: 18 }}>
        <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 6 }}>{'/** @description */'}</div>
        <p style={{ margin: 0, color: '#c9d1d9', lineHeight: 1.7, borderLeft: `3px solid ${c}`, paddingLeft: 12 }}>{p.summary}</p>
      </div>}

      {experience.length > 0 && <div style={{ marginBottom: 18 }}>
        <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 8 }}>{'const experience = ['}</div>
        {experience.map((e, idx) => <div key={e.id} style={{ marginBottom: 14, paddingLeft: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span><span style={{ color: '#79c0ff' }}>{e.role}</span> <span style={{ color: '#8b949e' }}>@</span> <span style={{ color: c }}>{e.company}</span></span>
            <span style={{ color: '#8b949e', fontSize: 7.5 }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          {e.description && <p style={{ margin: '0 0 4px', color: '#8b949e', fontSize: 8, lineHeight: 1.6 }}>{'// '}{e.description}</p>}
          {e.achievements?.length > 0 && e.achievements.map((a, i) => <p key={i} style={{ margin: '0 0 2px', color: '#c9d1d9', fontSize: 8 }}>{'  ✓ '}{a}</p>)}
          {idx < experience.length - 1 && <div style={{ color: '#30363d', marginTop: 4 }}>,</div>}
        </div>)}
        <div style={{ color: '#8b949e', fontSize: 7.5 }}>{']'}</div>
      </div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          {skills.length > 0 && <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 6 }}>{'const skills = ['}</div>
            <div style={{ paddingLeft: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((sk, i) => <span key={i} style={{ color: c, fontSize: 7.5 }}>"{sk}"{i < skills.length - 1 ? ',' : ''}</span>)}
            </div>
            <div style={{ color: '#8b949e', fontSize: 7.5, marginTop: 4 }}>{']'}</div>
          </div>}
          {education.length > 0 && <div>
            <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 6 }}>{'// education'}</div>
            {education.map(e => <div key={e.id} style={{ marginBottom: 8, paddingLeft: 8 }}>
              <p style={{ color: '#79c0ff', margin: '0 0 1px', fontWeight: 700 }}>{e.institution}</p>
              <p style={{ color: '#8b949e', margin: 0, fontSize: 7.5 }}>{e.degree} {e.field}{e.honors ? ` · ${e.honors}` : ''}</p>
            </div>)}
          </div>}
        </div>
        <div>
          {projects.length > 0 && <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 6 }}>{'// projects'}</div>
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: `2px solid ${rgba(c, 0.4)}` }}>
              <p style={{ color: '#79c0ff', margin: '0 0 1px', fontWeight: 700 }}>{pr.name}</p>
              {pr.tech && <p style={{ color: c, margin: '0 0 2px', fontSize: 7.5 }}>{pr.tech}</p>}
              {pr.description && <p style={{ color: '#8b949e', margin: 0, fontSize: 7.5, lineHeight: 1.5 }}>{pr.description}</p>}
            </div>)}
          </div>}
          {achievements.length > 0 && <div>
            <div style={{ color: '#8b949e', fontSize: 7.5, marginBottom: 6 }}>{'// achievements'}</div>
            {achievements.map(a => <p key={a.id} style={{ margin: '0 0 4px', color: '#c9d1d9', fontSize: 8, paddingLeft: 8 }}>{'★ '}{a.title}{a.issuer ? ` (${a.issuer})` : ''}</p>)}
          </div>}
        </div>
      </div>
    </div>
  )
}
