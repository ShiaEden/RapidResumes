import {ResumeData, TemplateSettings} from '@/utils/types'
import {dateRange, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Compact: dense, space-efficient, fits everything on one page
export default function CompactTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: font, fontSize: 8.5, lineHeight: 1.45, color: '#222', background: '#fff', padding: '28px 36px', boxSizing: 'border-box', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${c}` }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 2px', color: '#111', letterSpacing: -0.5 }}>{p.name || 'Your Name'}</h1>
          {p.title && <p style={{ fontSize: 9, color: c, fontWeight: 600, margin: 0 }}>{p.title}</p>}
        </div>
        <div style={{ textAlign: 'right', fontSize: 7.5, color: '#666', lineHeight: 1.7 }}>
          {contacts.slice(0, 5).map((ct, i) => <div key={i}>{ct.label ? `${ct.label}: ` : ''}{ct.value}</div>)}
        </div>
      </div>

      {p.summary && <p style={{ margin: '0 0 8px', color: '#444', fontSize: 8, lineHeight: 1.55 }}>{p.summary}</p>}

      {experience.length > 0 && <div style={{ marginBottom: 8 }}>
        <S t="Experience" c={c} />
        {experience.map(e => <div key={e.id} style={{ marginBottom: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700 }}>{e.role} <span style={{ fontWeight: 400, color: '#555' }}>@ {e.company}</span></span>
            <span style={{ color: '#888', fontSize: 7.5 }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          {e.description && <p style={{ margin: '2px 0 0', color: '#444', fontSize: 7.5 }}>{e.description}</p>}
          {e.achievements?.length > 0 && <ul style={{ margin: '2px 0 0', paddingLeft: 12, fontSize: 7.5, color: '#444', lineHeight: 1.5 }}>
            {e.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>}
        </div>)}
      </div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          {education.length > 0 && <div style={{ marginBottom: 8 }}>
            <S t="Education" c={c} />
            {education.map(e => <div key={e.id} style={{ marginBottom: 5 }}>
              <span style={{ fontWeight: 700 }}>{e.institution}</span>
              <span style={{ color: '#555' }}> — {e.degree} {e.field}</span>
              {e.honors && <span style={{ color: '#777' }}> · {e.honors}</span>}
              <div style={{ color: '#999', fontSize: 7.5 }}>{dateRange(e.startDate, e.endDate, false)}</div>
            </div>)}
          </div>}
          {skills.length > 0 && <div>
            <S t="Skills" c={c} />
            <p style={{ margin: 0, color: '#444', fontSize: 7.5, lineHeight: 1.6 }}>{skills.join(' · ')}</p>
          </div>}
        </div>
        <div>
          {achievements.length > 0 && <div style={{ marginBottom: 8 }}>
            <S t="Awards" c={c} />
            {achievements.map(a => <div key={a.id} style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 8 }}>{a.title}</span>
              {a.issuer && <span style={{ color: '#777' }}> · {a.issuer}</span>}
            </div>)}
          </div>}
          {certifications.length > 0 && <div style={{ marginBottom: 8 }}>
            <S t="Certs" c={c} />
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 8 }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#777' }}> · {cert.issuer}</span>}
            </div>)}
          </div>}
          {languages.length > 0 && <div>
            <S t="Languages" c={c} />
            <p style={{ margin: 0, color: '#444', fontSize: 7.5 }}>{languages.map(l => `${l.language} (${l.proficiency})`).join(' · ')}</p>
          </div>}
        </div>
      </div>

      {projects.length > 0 && <div style={{ marginTop: 8 }}>
        <S t="Projects" c={c} />
        {projects.map(pr => <span key={pr.id} style={{ marginRight: 14, fontSize: 7.5 }}>
          <strong>{pr.name}</strong>{pr.tech ? ` (${pr.tech})` : ''}{pr.description ? ` — ${pr.description}` : ''}
        </span>)}
      </div>}
    </div>
  )
}

function S({ t, c }: { t: string; c: string }) {
  return <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 4px', borderBottom: `1px solid ${c}`, paddingBottom: 2, opacity: 0.85 }}>{t}</p>
}
