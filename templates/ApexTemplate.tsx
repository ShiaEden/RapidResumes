import {ResumeData, TemplateSettings} from '@/utils/types'
import {dateRange, rgba, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Apex: diagonal accent strip, modern geometric
export default function ApexTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', boxSizing: 'border-box', width: '100%' }}>
      {/* Diagonal header */}
      <div style={{ position: 'relative', background: c, padding: '32px 44px 28px', overflow: 'hidden', marginBottom: 0 }}>
        <div style={{ position: 'absolute', bottom: -30, right: -20, width: 200, height: 80, background: 'rgba(255,255,255,0.08)', transform: 'rotate(-8deg)' }} />
        <div style={{ position: 'absolute', bottom: -10, right: 60, width: 120, height: 120, background: 'rgba(255,255,255,0.05)', transform: 'rotate(15deg)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 3px', letterSpacing: -0.5 }}>{p.name || 'Your Name'}</h1>
          {p.title && <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', margin: '0 0 10px', letterSpacing: 1, textTransform: 'uppercase' }}>{p.title}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: 8, color: 'rgba(255,255,255,0.75)' }}>
            {contacts.map((ct, i) => <span key={i}>{ct.label ? `${ct.label}: ` : ''}{ct.value}</span>)}
          </div>
        </div>
      </div>
      {/* Diagonal cut */}
      <div style={{ height: 20, background: '#f8f9fa', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)', marginBottom: 0, marginTop: -1 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 0 }}>
        <div style={{ padding: '16px 24px 24px 44px' }}>
          {p.summary && <div style={{ marginBottom: 18 }}>
            <H t="Profile" c={c} />
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 18 }}>
            <H t="Experience" c={c} />
            {experience.map(e => <div key={e.id} style={{ marginBottom: 14, padding: '10px 14px', background: '#fafafa', borderRadius: 6, borderLeft: `3px solid ${c}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 10.5, margin: '0 0 1px' }}>{e.role}</p>
                  <p style={{ color: c, fontSize: 9, margin: '0 0 4px', fontWeight: 600 }}>{e.company}</p>
                </div>
                <span style={{ fontSize: 7.5, color: '#888', background: '#ebebeb', padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap', height: 'fit-content' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.description && <p style={{ margin: '0 0 4px', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, color: '#444', fontSize: 8.5, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 18 }}>
            <H t="Achievements" c={c} />
            {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'flex-start' }}>
              <div><span style={{ fontWeight: 700 }}>★ {a.title}</span>{a.issuer && <span style={{ color: '#777' }}> · {a.issuer}</span>}
                {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
              </div>
            </div>)}
          </div>}

          {projects.length > 0 && <div>
            <H t="Projects" c={c} />
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10, padding: '8px 12px', background: '#fafafa', borderRadius: 6 }}>
              <p style={{ fontWeight: 700, margin: '0 0 2px' }}>{pr.name}{pr.tech && <span style={{ fontWeight: 400, color: '#777', fontSize: 8.5 }}> · {pr.tech}</span>}</p>
              {pr.description && <p style={{ margin: 0, fontSize: 8.5, color: '#444' }}>{pr.description}</p>}
            </div>)}
          </div>}
        </div>

        <div style={{ background: '#f8f9fa', padding: '16px 20px 24px', borderLeft: '1px solid #eee' }}>
          {skills.length > 0 && <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>Skills</p>
            {skills.map((sk, i) => <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 8.5 }}>{sk}</span>
              </div>
              <div style={{ height: 3, background: '#ddd', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${Math.max(50, 100 - i * 7)}%`, background: c, borderRadius: 2 }} />
              </div>
            </div>)}
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>Education</p>
            {education.map(e => <div key={e.id} style={{ marginBottom: 10, padding: '8px 10px', background: '#fff', borderRadius: 6, borderTop: `3px solid ${c}` }}>
              <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 1px' }}>{e.institution}</p>
              <p style={{ fontSize: 8, color: '#666', margin: 0 }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontSize: 7.5, color: c, margin: '1px 0 0' }}>{e.honors}</p>}
            </div>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>Certs</p>
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 7 }}>
              <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px' }}>{cert.name}</p>
              <p style={{ fontSize: 7.5, color: '#888', margin: 0 }}>{cert.issuer}</p>
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>Languages</p>
            {languages.map((l, i) => <p key={i} style={{ fontSize: 8.5, margin: '0 0 4px' }}>{l.language} <span style={{ color: '#888', fontSize: 7.5 }}>({l.proficiency})</span></p>)}
          </div>}
        </div>
      </div>
    </div>
  )
}

function H({ t, c }: { t: string; c: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
    <div style={{ width: 12, height: 12, background: c, borderRadius: 2, flexShrink: 0 }} />
    <h2 style={{ fontSize: 9.5, fontWeight: 700, color: '#111', margin: 0 }}>{t}</h2>
    <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
  </div>
}
