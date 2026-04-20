import { ResumeData, TemplateSettings } from '@/utils/types'
import { fmt, dateRange, lighter, rgba, getContactItems } from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Timeline: prominent left timeline, modern geometric accents
export default function TimelineTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  const Dot = () => <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0, marginTop: 3, boxShadow: `0 0 0 3px ${rgba(c, 0.2)}` }} />

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', boxSizing: 'border-box', width: '100%', padding: '0' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: 8, background: c }} />
        <div style={{ flex: 1, padding: '28px 36px 22px 28px', background: '#fafafa', borderBottom: '1px solid #eee' }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, margin: '0 0 3px', color: '#111' }}>{p.name || 'Your Name'}</h1>
          {p.title && <p style={{ fontSize: 11, color: c, fontWeight: 600, margin: '0 0 10px' }}>{p.title}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: 8.5, color: '#666' }}>
            {contacts.map((ct, i) => <span key={i}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 0 }}>
        {/* Main / timeline */}
        <div style={{ padding: '24px 20px 24px 36px' }}>
          {p.summary && <div style={{ marginBottom: 20 }}>
            <SecH t="Summary" c={c} />
            <p style={{ margin: '0 0 0 20px', color: '#444', lineHeight: 1.65 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 20 }}>
            <SecH t="Experience" c={c} />
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 2, background: '#e5e7eb' }} />
              {experience.map(e => <div key={e.id} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Dot />
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 10.5, margin: '0 0 1px', color: '#111' }}>{e.role}</p>
                      <p style={{ fontSize: 9, color: c, fontWeight: 600, margin: '0 0 3px' }}>{e.company}</p>
                    </div>
                    <span style={{ fontSize: 7.5, color: '#888', background: '#f0f2f5', padding: '2px 7px', borderRadius: 4, whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
                  </div>
                  {e.description && <p style={{ margin: '0 0 3px', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
                  {e.achievements?.length > 0 && <ul style={{ margin: '3px 0 0', paddingLeft: 13, color: '#444', fontSize: 9, lineHeight: 1.6 }}>
                    {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
                  </ul>}
                </div>
              </div>)}
            </div>
          </div>}

          {education.length > 0 && <div style={{ marginBottom: 20 }}>
            <SecH t="Education" c={c} />
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 2, background: '#e5e7eb' }} />
              {education.map(e => <div key={e.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <Dot />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 10, margin: '0 0 1px', color: '#111' }}>{e.institution}</p>
                  <p style={{ fontSize: 9, color: '#555', margin: 0 }}>{e.degree} {e.field}{e.honors ? ` · ${e.honors}` : ''}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
                  <p style={{ fontSize: 7.5, color: '#999', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
                </div>
              </div>)}
            </div>
          </div>}

          {achievements.length > 0 && <div style={{ marginBottom: 20 }}>
            <SecH t="Achievements" c={c} />
            {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 20 }}>
              <div><span style={{ fontWeight: 700 }}>{a.title}</span>{a.issuer && <span style={{ color: '#666' }}> — {a.issuer}</span>}
                {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
              </div>
              {a.date && <span style={{ fontSize: 7.5, color: '#888', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
            </div>)}
          </div>}

          {projects.length > 0 && <div>
            <SecH t="Projects" c={c} />
            {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10, paddingLeft: 20 }}>
              <span style={{ fontWeight: 700 }}>{pr.name}</span>
              {pr.tech && <span style={{ fontSize: 8, color: '#888' }}> · {pr.tech}</span>}
              {pr.link && <span style={{ fontSize: 8, color: c }}> · {pr.link}</span>}
              {pr.description && <p style={{ margin: '2px 0 0', fontSize: 9, color: '#444' }}>{pr.description}</p>}
            </div>)}
          </div>}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '24px 24px 24px 12px', borderLeft: '1px solid #eee' }}>
          {skills.length > 0 && <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((sk, i) => <span key={i} style={{ background: lighter(c, 0.92), color: c, padding: '2px 8px', borderRadius: 3, fontSize: 8, fontWeight: 600, display: 'inline-block' }}>{sk}</span>)}
            </div>
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Certifications</p>
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px', color: '#111' }}>{cert.name}</p>
              <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}{cert.date ? ` · ${fmt(cert.date)}` : ''}</p>
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 10px' }}>Languages</p>
            {languages.map((l, i) => <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 8.5, color: '#333' }}>{l.language}</span>
                <span style={{ fontSize: 7.5, color: '#888' }}>{l.proficiency}</span>
              </div>
              <div style={{ height: 3, background: '#e5e7eb', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: ['Native','Fluent','Advanced','Intermediate','Basic'].indexOf(l.proficiency) < 0 ? '40%' : ['100%','80%','60%','40%','20%'][['Native','Fluent','Advanced','Intermediate','Basic'].indexOf(l.proficiency)], background: c, borderRadius: 2 }} />
              </div>
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}

function SecH({ t, c }: { t: string; c: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
    <h2 style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#333', margin: 0, whiteSpace: 'nowrap' }}>{t}</h2>
    <div style={{ flex: 1, height: 1, background: c, opacity: 0.4 }} />
  </div>
}
