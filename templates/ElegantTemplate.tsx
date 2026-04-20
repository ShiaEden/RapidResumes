import {ResumeData, TemplateSettings} from '@/utils/types'
import {fmt, dateRange, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Elegant: gold/cream tone, serif, luxury feel
export default function ElegantTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, languages, volunteer } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const serif = `'Georgia', 'Times New Roman', serif`
  const sans = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: serif, fontSize: 9.5, lineHeight: 1.6, color: '#2c2c2c', background: '#fdfbf7', boxSizing: 'border-box', width: '100%' }}>
      {/* Ornate header */}
      <div style={{ textAlign: 'center', padding: '36px 48px 24px', borderBottom: `1px solid ${c}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
          <div style={{ flex: 1, height: 1, background: c, opacity: 0.5 }} />
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, margin: 0, color: '#1a1a1a', whiteSpace: 'nowrap' }}>{(p.name || 'Your Name').toUpperCase()}</h1>
          <div style={{ flex: 1, height: 1, background: c, opacity: 0.5 }} />
        </div>
        {p.title && <p style={{ fontFamily: sans, fontSize: 9, color: c, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, margin: '0 0 12px' }}>{p.title}</p>}
        <div style={{ fontFamily: sans, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 16px', fontSize: 8.5, color: '#666' }}>
          {contacts.map((ct, i) => <span key={i}>{ct.label ? ct.label + ': ' : ''}{ct.value}</span>)}
        </div>
      </div>

      <div style={{ padding: '24px 48px' }}>
        {p.summary && <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <p style={{ margin: '0 auto', color: '#555', lineHeight: 1.8, fontStyle: 'italic', maxWidth: '80%' }}>{p.summary}</p>
        </div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 185px', gap: 36 }}>
          {/* Left */}
          <div>
            {experience.length > 0 && <div style={{ marginBottom: 20 }}>
              <ElegantTitle t="Experience" c={c} />
              {experience.map(e => <div key={e.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 10, color: '#1a1a1a' }}>{e.role}</span>
                    {e.company && <span style={{ fontFamily: sans, color: c, fontSize: 9, fontWeight: 600 }}> · {e.company}</span>}
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 8, color: '#999', whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                {e.description && <p style={{ margin: '4px 0 0', color: '#555', fontSize: 9, lineHeight: 1.65, fontStyle: 'italic' }}>{e.description}</p>}
                {e.achievements?.length > 0 && <ul style={{ margin: '5px 0 0', paddingLeft: 16, color: '#444', fontSize: 9, lineHeight: 1.65 }}>
                  {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 3 }}>{a}</li>)}
                </ul>}
              </div>)}
            </div>}

            {achievements.length > 0 && <div style={{ marginBottom: 20 }}>
              <ElegantTitle t="Honours & Awards" c={c} />
              {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div><span style={{ fontWeight: 700 }}>{a.title}</span>{a.issuer && <span style={{ color: '#777' }}> — {a.issuer}</span>}
                  {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#666', fontStyle: 'italic' }}>{a.description}</p>}
                </div>
                {a.date && <span style={{ fontFamily: sans, fontSize: 8, color: '#999', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
              </div>)}
            </div>}

            {projects.length > 0 && <div style={{ marginBottom: 20 }}>
              <ElegantTitle t="Notable Projects" c={c} />
              {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>{pr.name}</span>
                {pr.tech && <span style={{ fontFamily: sans, color: '#777', fontSize: 8.5 }}> · {pr.tech}</span>}
                {pr.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#555', fontStyle: 'italic' }}>{pr.description}</p>}
              </div>)}
            </div>}

            {volunteer.length > 0 && <div>
              <ElegantTitle t="Community Service" c={c} />
              {volunteer.map(v => <div key={v.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>{v.role}{v.organization && <span style={{ fontWeight: 400, color: '#777' }}> — {v.organization}</span>}</span>
                  <span style={{ fontFamily: sans, fontSize: 8, color: '#999', whiteSpace: 'nowrap' }}>{dateRange(v.startDate, v.endDate, v.current)}</span>
                </div>
                {v.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#555', fontStyle: 'italic' }}>{v.description}</p>}
              </div>)}
            </div>}
          </div>

          {/* Right */}
          <div style={{ fontFamily: sans, borderLeft: `1px solid ${c}`, paddingLeft: 24, opacity: 0.95 }}>
            {education.length > 0 && <div style={{ marginBottom: 18 }}>
              <SideTitle t="Education" c={c} />
              {education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
                <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 9.5, margin: '0 0 1px', color: '#1a1a1a' }}>{e.institution}</p>
                <p style={{ fontSize: 8.5, color: '#666', margin: 0 }}>{e.degree} {e.field}</p>
                {e.honors && <p style={{ fontSize: 8, color: c, margin: '1px 0 0', fontStyle: 'italic' }}>{e.honors}</p>}
                {e.gpa && <p style={{ fontSize: 7.5, color: '#888', margin: 0 }}>GPA {e.gpa}</p>}
                <p style={{ fontSize: 7.5, color: '#aaa', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
              </div>)}
            </div>}

            {skills.length > 0 && <div style={{ marginBottom: 18 }}>
              <SideTitle t="Expertise" c={c} />
              {skills.map((sk, i) => <div key={i} style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 8, color: c }}>◆</span>
                <span style={{ fontSize: 8.5, color: '#333' }}>{sk}</span>
              </div>)}
            </div>}

            {certifications.length > 0 && <div style={{ marginBottom: 18 }}>
              <SideTitle t="Credentials" c={c} />
              {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
                <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 9, margin: '0 0 1px', color: '#1a1a1a' }}>{cert.name}</p>
                <p style={{ fontSize: 7.5, color: '#888', margin: 0 }}>{cert.issuer}{cert.date ? ` · ${fmt(cert.date)}` : ''}</p>
              </div>)}
            </div>}

            {languages.length > 0 && <div>
              <SideTitle t="Languages" c={c} />
              {languages.map((l, i) => <p key={i} style={{ fontSize: 8.5, margin: '0 0 5px', color: '#333' }}>
                {l.language} <span style={{ color: '#aaa' }}>· {l.proficiency}</span>
              </p>)}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function ElegantTitle({ t, c }: { t: string; c: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
    <div style={{ width: 20, height: 1, background: c }} />
    <h2 style={{ fontSize: 8, fontWeight: 400, letterSpacing: 3, textTransform: 'uppercase', color: c, margin: 0, whiteSpace: 'nowrap' }}>{t}</h2>
    <div style={{ flex: 1, height: 1, background: c, opacity: 0.3 }} />
  </div>
}
function SideTitle({ t, c }: { t: string; c: string }) {
  return <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '0 0 8px', borderBottom: `1px solid ${c}`, paddingBottom: 4, opacity: 0.8 }}>{t}</p>
}
