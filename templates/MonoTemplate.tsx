import { ResumeData, TemplateSettings } from '@/utils/types'
import { dateRange, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Mono: clean pure white, single font, pure typography
export default function MonoTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const font = `'Courier New', monospace`

  return (
    <div style={{ fontFamily: font, fontSize: 9, lineHeight: 1.6, color: '#000', background: '#fff', padding: '40px 50px', boxSizing: 'border-box', width: '100%' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 2px', letterSpacing: -0.5 }}>{p.name || 'Your Name'}</h1>
      {p.title && <p style={{ fontSize: 9, color: c, margin: '0 0 6px' }}>{p.title}</p>}
      <p style={{ fontSize: 8, color: '#666', margin: '0 0 20px' }}>{contacts.map(ct => ct.label ? `${ct.label}: ${ct.value}` : ct.value).join(' | ')}</p>
      <div style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '2px 0', marginBottom: 16 }} />

      {p.summary && <><p style={{ fontWeight: 700, fontSize: 8, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 2 }}>Summary</p>
        <p style={{ margin: '0 0 16px', color: '#333', lineHeight: 1.65, paddingLeft: 12, borderLeft: `2px solid ${c}` }}>{p.summary}</p></>}

      {experience.length > 0 && <><p style={{ fontWeight: 700, fontSize: 8, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 2 }}>Experience</p>
        {experience.map(e => <div key={e.id} style={{ marginBottom: 12, paddingLeft: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700 }}>{e.role} @ {e.company}</span>
            <span style={{ color: '#666', fontSize: 8 }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          {e.description && <p style={{ margin: '2px 0', color: '#444', fontSize: 8.5 }}>{e.description}</p>}
          {e.achievements?.map((a, i) => <p key={i} style={{ margin: '0 0 1px', color: '#444', fontSize: 8 }}>  > {a}</p>)}
        </div>)}
        <div style={{ borderBottom: '1px solid #ccc', marginBottom: 12 }} /></>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          {education.length > 0 && <><p style={{ fontWeight: 700, fontSize: 8, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 2 }}>Education</p>
            {education.map(e => <div key={e.id} style={{ marginBottom: 8, paddingLeft: 12 }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{e.institution}</p>
              <p style={{ margin: 0, fontSize: 8, color: '#555' }}>{e.degree} {e.field}{e.honors ? ` · ${e.honors}` : ''}</p>
            </div>)}</>}
          {achievements.length > 0 && <><p style={{ fontWeight: 700, fontSize: 8, margin: '12px 0 6px', textTransform: 'uppercase', letterSpacing: 2 }}>Awards</p>
            {achievements.map(a => <p key={a.id} style={{ margin: '0 0 4px', fontSize: 8.5, paddingLeft: 12 }}>* {a.title}{a.issuer ? ` (${a.issuer})` : ''}</p>)}</>}
        </div>
        <div>
          {skills.length > 0 && <><p style={{ fontWeight: 700, fontSize: 8, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 2 }}>Skills</p>
            <p style={{ margin: '0 0 12px', paddingLeft: 12, color: '#333', fontSize: 8.5, lineHeight: 1.8 }}>{skills.map((sk, i) => `${i % 2 === 0 ? '\n' : ''}${sk}`).join(', ')}</p></>}
          {languages.length > 0 && <><p style={{ fontWeight: 700, fontSize: 8, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 2 }}>Languages</p>
            {languages.map((l, i) => <p key={i} style={{ margin: '0 0 3px', fontSize: 8.5, paddingLeft: 12 }}>{l.language} ({l.proficiency})</p>)}</>}
        </div>
      </div>
    </div>
  )
}
