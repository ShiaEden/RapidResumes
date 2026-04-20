import { ResumeData, TemplateSettings } from '@/utils/types'
import { fmt, dateRange, lighter, rgba, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Bold: geometric shapes, high contrast, Gen-Z energy
export default function BoldTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Arial Black', 'Arial', 'Helvetica Neue', sans-serif`
  const bodyFont = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: bodyFont, fontSize: 9.5, lineHeight: 1.55, color: '#111', background: '#fff', boxSizing: 'border-box', width: '100%' }}>
      {/* Giant name block */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '32px 40px 26px', background: '#fff', borderBottom: `6px solid ${c}` }}>
        {/* Geometric accent */}
        <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: rgba(c, 0.08), zIndex: 0 }} />
        <div style={{ position: 'absolute', right: 60, bottom: -40, width: 100, height: 100, borderRadius: '50%', background: rgba(c, 0.05), zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: font, fontSize: 34, fontWeight: 900, letterSpacing: -2, margin: '0 0 4px', color: '#0a0a0a', lineHeight: 1 }}>{p.name || 'YOUR NAME'}</h1>
          {p.title && <div style={{ display: 'inline-block', background: c, color: '#fff', padding: '3px 12px', borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '6px 0 12px' }}>{p.title}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 18px', fontSize: 8.5, color: '#555', marginTop: p.title ? 0 : 10 }}>
            {contacts.map((ct, i) => <span key={i} style={{ color: ct.label ? c : undefined }}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 210px', gap: 0 }}>
        {/* Main */}
        <div style={{ padding: '24px 20px 24px 40px' }}>
          {p.summary && <div style={{ marginBottom: 20 }}>
            <BoldTitle t="About" c={c} />
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 20 }}>
            <BoldTitle t="Experience" c={c} />
            {experience.map(e => <div key={e.id} style={{ marginBottom: 16, padding: '12px 14px', borderLeft: `4px solid ${c}`, background: '#fafafa', borderRadius: '0 6px 6px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontFamily: font, fontWeight: 900, fontSize: 10.5, margin: '0 0 2px', color: '#0a0a0a', lineHeight: 1.2 }}>{e.role}</p>
                  <p style={{ fontSize: 9, color: c, fontWeight: 700, margin: '0 0 4px' }}>{e.company}</p>
                </div>
                <span style={{ fontSize: 7.5, color: '#888', background: '#ececec', padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.description && <p style={{ margin: '0 0 4px', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, color: '#444', fontSize: 9, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 20 }}>
            <BoldTitle t="Achievements" c={c} />
            {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, padding: '8px 12px', background: lighter(c, 0.93), borderRadius: 6 }}>
              <div><span style={{ fontFamily: font, fontWeight: 900, fontSize: 9.5 }}>★ {a.title}</span>
                {a.issuer && <span style={{ color: '#666' }}> · {a.issuer}</span>}
                {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
              </div>
              {a.date && <span style={{ fontSize: 7.5, color: '#888', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
            </div>)}
          </div>}

          {projects.length > 0 && <div>
            <BoldTitle t="Projects" c={c} />
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 12, padding: '10px 14px', background: '#fafafa', borderRadius: 6, border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: font, fontWeight: 900, fontSize: 10 }}>{pr.name}</span>
                {pr.link && <span style={{ fontSize: 8, color: c }}>{pr.link}</span>}
              </div>
              {pr.tech && <p style={{ fontSize: 8, color: c, margin: '2px 0 4px', fontWeight: 700 }}>{pr.tech}</p>}
              {pr.description && <p style={{ fontSize: 9, color: '#444', margin: 0 }}>{pr.description}</p>}
            </div>)}
          </div>}
        </div>

        {/* Right */}
        <div style={{ padding: '24px 28px 24px 12px', borderLeft: '1px solid #eee' }}>
          {skills.length > 0 && <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: font, fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#0a0a0a', margin: '0 0 10px', borderBottom: `3px solid ${c}`, paddingBottom: 5 }}>Skills</p>
            {skills.map((sk, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <div style={{ width: 6, height: 6, background: c, borderRadius: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: '#222' }}>{sk}</span>
            </div>)}
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: font, fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#0a0a0a', margin: '0 0 10px', borderBottom: `3px solid ${c}`, paddingBottom: 5 }}>Education</p>
            {education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 9.5, margin: '0 0 1px', color: '#111' }}>{e.institution}</p>
              <p style={{ fontSize: 8.5, color: '#555', margin: 0 }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontSize: 8, color: c, margin: '1px 0 0', fontWeight: 700 }}>{e.honors}</p>}
              <p style={{ fontSize: 7.5, color: '#999', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
            </div>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: font, fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#0a0a0a', margin: '0 0 10px', borderBottom: `3px solid ${c}`, paddingBottom: 5 }}>Certs</p>
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 1px', color: '#111' }}>{cert.name}</p>
              <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}{cert.date ? ` · ${fmt(cert.date)}` : ''}</p>
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <p style={{ fontFamily: font, fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#0a0a0a', margin: '0 0 10px', borderBottom: `3px solid ${c}`, paddingBottom: 5 }}>Languages</p>
            {languages.map((l, i) => <p key={i} style={{ fontSize: 9, margin: '0 0 4px', color: '#333' }}>{l.language} <span style={{ color: '#999', fontSize: 8 }}>({l.proficiency})</span></p>)}
          </div>}
        </div>
      </div>
    </div>
  )
}

function BoldTitle({ t, c }: { t: string; c: string }) {
  return <div style={{ marginBottom: 12 }}>
    <h2 style={{ fontFamily: `'Arial Black', 'Arial', sans-serif`, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#0a0a0a', margin: 0, display: 'inline-block', borderBottom: `3px solid ${c}`, paddingBottom: 3 }}>{t}</h2>
  </div>
}
