import { ResumeData, TemplateSettings } from '@/utils/types'
import { fmt, dateRange, lighter, rgba, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Executive: dark top bar, two-column layout, premium feel
export default function ExecutiveTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', boxSizing: 'border-box', width: '100%' }}>
      {/* Dark header */}
      <div style={{ background: '#1a1a2e', padding: '28px 40px 22px', color: '#fff' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, margin: '0 0 3px', color: '#fff' }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontSize: 11, color: c, fontWeight: 600, margin: '0 0 12px', letterSpacing: 0.5 }}>{p.title.toUpperCase()}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 20px', fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>
          {contacts.map((ct, i) => <span key={i}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Left narrow column */}
        <div style={{ width: 190, minWidth: 190, background: '#f8f8f8', padding: '24px 18px', borderRight: '1px solid #eee' }}>
          {skills.length > 0 && <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Core Skills</h3>
            {skills.map((sk, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: c, flexShrink: 0 }} />
              <span style={{ fontSize: 8.5, color: '#333' }}>{sk}</span>
            </div>)}
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Education</h3>
            {education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 1px', color: '#111' }}>{e.institution}</p>
              <p style={{ fontSize: 8, color: '#555', margin: '0 0 1px' }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{e.honors}</p>}
              {e.gpa && <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>GPA: {e.gpa}</p>}
              <p style={{ fontSize: 7.5, color: '#999', margin: '1px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
            </div>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Certs</h3>
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px', color: '#111' }}>{cert.name}</p>
              <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}</p>
              {cert.date && <p style={{ fontSize: 7.5, color: '#999', margin: 0 }}>{fmt(cert.date)}</p>}
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Languages</h3>
            {languages.map((l, i) => <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 8.5, color: '#333' }}>{l.language}</span>
                <span style={{ fontSize: 7.5, color: '#777' }}>{l.proficiency}</span>
              </div>
            </div>)}
          </div>}
        </div>

        {/* Right main column */}
        <div style={{ flex: 1, padding: '24px 32px' }}>
          {p.summary && <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>Profile</h3>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 12px' }}>Experience</h3>
            {experience.map(e => <div key={e.id} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: `3px solid ${c}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 10.5, margin: '0 0 1px', color: '#111' }}>{e.role}</p>
                  <p style={{ fontSize: 9, color: c, fontWeight: 600, margin: '0 0 4px' }}>{e.company}</p>
                </div>
                <span style={{ fontSize: 8, color: '#888', background: '#f0f0f0', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.description && <p style={{ margin: '0 0 4px', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, color: '#444', fontSize: 9, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Awards</h3>
            {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div><span style={{ fontWeight: 700, fontSize: 9.5 }}>{a.title}</span>{a.issuer && <span style={{ color: '#555' }}> · {a.issuer}</span>}
                {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
              </div>
              {a.date && <span style={{ fontSize: 8, color: '#888', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
            </div>)}
          </div>}

          {projects.length > 0 && <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Projects</h3>
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 9.5 }}>{pr.name}</span>
                {pr.tech && <span style={{ fontSize: 8, color: '#888', background: lighter(c), padding: '1px 7px', borderRadius: 3 }}>{pr.tech}</span>}
              </div>
              {pr.description && <p style={{ margin: '2px 0 0', fontSize: 9, color: '#444' }}>{pr.description}</p>}
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}
