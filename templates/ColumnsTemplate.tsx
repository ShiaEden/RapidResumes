import { ResumeData, TemplateSettings } from '@/utils/types'
import { fmt, dateRange, lighter, rgba, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Columns: bold accent header, two even columns below
export default function ColumnsTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  const Sec = ({ t }: { t: string }) => (
    <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px', borderBottom: `2px solid ${rgba(c, 0.3)}`, paddingBottom: 4 }}>{t}</h3>
  )

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', boxSizing: 'border-box', width: '100%' }}>
      {/* Header with color */}
      <div style={{ background: c, padding: '28px 40px 22px', color: '#fff' }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1, margin: '0 0 4px', color: '#fff' }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontSize: 11, fontWeight: 400, margin: '0 0 12px', color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5 }}>{p.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: 8.5, color: 'rgba(255,255,255,0.8)' }}>
          {contacts.map((ct, i) => <span key={i}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {/* Left col */}
        <div style={{ padding: '24px 24px 24px 36px', borderRight: '1px solid #eee' }}>
          {p.summary && <div style={{ marginBottom: 20 }}>
            <Sec t="Profile" />
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: 9 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Experience" />
            {experience.map(e => <div key={e.id} style={{ marginBottom: 14 }}>
              <p style={{ fontWeight: 700, fontSize: 10, margin: '0 0 1px', color: '#111' }}>{e.role}</p>
              <p style={{ fontSize: 9, color: c, fontWeight: 600, margin: '0 0 3px' }}>{e.company}</p>
              <p style={{ fontSize: 8, color: '#888', margin: '0 0 4px' }}>{dateRange(e.startDate, e.endDate, e.current)}</p>
              {e.description && <p style={{ margin: '0 0 3px', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '3px 0 0', paddingLeft: 13, color: '#444', fontSize: 8.5, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Awards" />
            {achievements.map(a => <div key={a.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: 9.5 }}>{a.title}</span>
                {a.date && <span style={{ fontSize: 8, color: '#888' }}>{fmt(a.date)}</span>}
              </div>
              {a.issuer && <p style={{ fontSize: 8.5, color: '#777', margin: '1px 0 0' }}>{a.issuer}</p>}
              {a.description && <p style={{ fontSize: 8.5, color: '#555', margin: '2px 0 0' }}>{a.description}</p>}
            </div>)}
          </div>}
        </div>

        {/* Right col */}
        <div style={{ padding: '24px 36px 24px 24px' }}>
          {skills.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Skills" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((sk, i) => <span key={i} style={{ background: lighter(c, 0.9), color: c, padding: '3px 9px', borderRadius: 20, fontSize: 8, fontWeight: 600 }}>{sk}</span>)}
            </div>
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Education" />
            {education.map(e => <div key={e.id} style={{ marginBottom: 10, padding: '8px 12px', borderLeft: `3px solid ${c}`, background: '#fafafa' }}>
              <p style={{ fontWeight: 700, fontSize: 9.5, margin: '0 0 2px', color: '#111' }}>{e.institution}</p>
              <p style={{ fontSize: 8.5, color: '#555', margin: 0 }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontSize: 8, color: c, margin: '1px 0 0' }}>{e.honors}</p>}
              <p style={{ fontSize: 8, color: '#888', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
            </div>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Certifications" />
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 1px', color: '#111' }}>{cert.name}</p>
              <p style={{ fontSize: 8, color: '#777', margin: 0 }}>{cert.issuer}{cert.date ? ` · ${fmt(cert.date)}` : ''}</p>
            </div>)}
          </div>}

          {projects.length > 0 && <div style={{ marginBottom: 20 }}>
            <Sec t="Projects" />
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10, padding: '8px 12px', background: '#fafafa', borderRadius: 4 }}>
              <p style={{ fontWeight: 700, fontSize: 9.5, margin: '0 0 2px', color: '#111' }}>{pr.name}</p>
              {pr.tech && <p style={{ fontSize: 8, color: c, margin: '0 0 3px' }}>{pr.tech}</p>}
              {pr.description && <p style={{ fontSize: 8.5, color: '#555', margin: 0 }}>{pr.description}</p>}
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <Sec t="Languages" />
            {languages.map((l, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 9 }}>{l.language}</span>
              <span style={{ fontSize: 8, color: '#888' }}>{l.proficiency}</span>
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}
