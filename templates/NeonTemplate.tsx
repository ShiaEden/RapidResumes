import { ResumeData, TemplateSettings } from '@/utils/types'
import { fmt, dateRange, rgba, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Neon: dark bg, glowing accent, modern tech vibe
export default function NeonTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Arial', 'Helvetica Neue', sans-serif`
  const glow = `0 0 8px ${rgba(c, 0.7)}, 0 0 20px ${rgba(c, 0.3)}`

  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span style={{ border: `1px solid ${c}`, color: c, padding: '2px 8px', borderRadius: 3, fontSize: 8, display: 'inline-block', marginRight: 5, marginBottom: 4 }}>{children}</span>
  )
  const STitle = ({ t }: { t: string }) => (
    <h2 style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c, margin: '0 0 12px', fontFamily: font }}>{t}</h2>
  )

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.6, color: '#e0e0e0', background: '#0d1117', boxSizing: 'border-box', width: '100%', padding: '36px 44px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${rgba(c, 0.4)}` }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1, margin: '0 0 4px', color: '#fff', textShadow: glow }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontSize: 11, color: c, fontWeight: 600, margin: '0 0 10px', letterSpacing: 1 }}>{p.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: 8.5, color: 'rgba(255,255,255,0.5)' }}>
          {contacts.map((ct, i) => <span key={i} style={{ color: ct.label ? c : 'rgba(255,255,255,0.5)' }}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 32 }}>
        {/* Left */}
        <div>
          {p.summary && <div style={{ marginBottom: 20 }}>
            <STitle t="// About" />
            <p style={{ margin: 0, color: '#aaa', lineHeight: 1.7 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Experience" />
            {experience.map(e => <div key={e.id} style={{ marginBottom: 18, padding: '12px 14px', border: `1px solid ${rgba(c, 0.2)}`, borderRadius: 6, background: rgba(c, 0.04) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <p style={{ fontWeight: 700, fontSize: 11, color: '#fff', margin: 0 }}>{e.role}</p>
                <span style={{ fontSize: 8, color: c, whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              <p style={{ fontSize: 9, color: c, margin: '0 0 6px', fontWeight: 600 }}>{e.company}</p>
              {e.description && <p style={{ margin: '0 0 4px', color: '#999', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, color: '#999', fontSize: 9, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2, color: '#bbb' }}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {projects.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Projects" />
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 12, padding: '10px 14px', border: `1px solid ${rgba(c, 0.2)}`, borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 10, color: '#fff' }}>{pr.name}</span>
                {pr.link && <span style={{ fontSize: 8, color: c }}>{pr.link}</span>}
              </div>
              {pr.tech && <p style={{ margin: '3px 0', fontSize: 8, color: rgba(c, 0.8) }}>{pr.tech}</p>}
              {pr.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#999' }}>{pr.description}</p>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Achievements" />
            {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, padding: '8px 12px', background: rgba(c, 0.06), borderRadius: 4 }}>
              <div><span style={{ fontWeight: 700, fontSize: 9.5, color: '#ddd' }}>{a.title}</span>
                {a.issuer && <span style={{ color: '#777', fontSize: 8.5 }}> — {a.issuer}</span>}
                {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#888' }}>{a.description}</p>}
              </div>
              {a.date && <span style={{ fontSize: 8, color: c, whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
            </div>)}
          </div>}
        </div>

        {/* Right sidebar */}
        <div>
          {skills.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Skills" />
            <div>{skills.map((sk, i) => <Tag key={i}>{sk}</Tag>)}</div>
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Edu" />
            {education.map(e => <div key={e.id} style={{ marginBottom: 10, padding: '8px 10px', border: `1px solid ${rgba(c, 0.2)}`, borderRadius: 4 }}>
              <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 2px', color: '#ddd' }}>{e.institution}</p>
              <p style={{ fontSize: 8, color: '#888', margin: 0 }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontSize: 7.5, color: c, margin: '1px 0 0' }}>{e.honors}</p>}
              <p style={{ fontSize: 7.5, color: '#666', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
            </div>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 20 }}>
            <STitle t="// Certs" />
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px', color: '#ddd' }}>{cert.name}</p>
              <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}</p>
              {cert.date && <p style={{ fontSize: 7.5, color: '#666', margin: 0 }}>{fmt(cert.date)}</p>}
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <STitle t="// Languages" />
            {languages.map((l, i) => <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 8.5, color: '#ddd' }}>{l.language}</span>
                <span style={{ fontSize: 7.5, color: '#666' }}>{l.proficiency}</span>
              </div>
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}
