import {ResumeData, TemplateSettings} from '@/utils/types'
import {dateRange, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Tribune: newspaper editorial style, strong typographic hierarchy
export default function TribuneTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, achievements, certifications, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const serif = `'Georgia', 'Times New Roman', serif`
  const sans = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: serif, fontSize: 9.5, lineHeight: 1.55, color: '#1a1a1a', background: '#fff', padding: '32px 44px', boxSizing: 'border-box', width: '100%' }}>
      {/* Masthead */}
      <div style={{ borderTop: '4px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '8px 0', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: sans, fontSize: 7, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>Curriculum Vitae</div>
        <div style={{ fontFamily: sans, fontSize: 7, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{new Date().getFullYear()}</div>
      </div>

      {/* Name */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 4px', letterSpacing: -1, lineHeight: 1 }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontFamily: sans, fontSize: 9, color: c, fontWeight: 600, margin: '0 0 8px', letterSpacing: 2, textTransform: 'uppercase' }}>{p.title}</p>}
        <div style={{ fontFamily: sans, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 14px', fontSize: 7.5, color: '#666' }}>
          {contacts.map((ct, i) => <span key={i}>{ct.label ? `${ct.label}: ` : ''}{ct.value}</span>)}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #1a1a1a', borderBottom: '4px solid #1a1a1a', height: 4, marginBottom: 16 }} />

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          {p.summary && <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Profile</h2>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#333', lineHeight: 1.7, fontSize: 10 }}>{p.summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Career</h2>
            {experience.map(e => <div key={e.id} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, margin: 0 }}>{e.role}</h3>
                <span style={{ fontFamily: sans, fontSize: 7.5, color: '#888' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.company && <p style={{ fontFamily: sans, color: c, fontSize: 8.5, margin: '1px 0 4px', fontWeight: 600 }}>{e.company}</p>}
              {e.description && <p style={{ margin: '0 0 4px', color: '#444', fontSize: 9, lineHeight: 1.6, fontStyle: 'italic' }}>{e.description}</p>}
              {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 16, color: '#444', fontSize: 8.5, lineHeight: 1.6 }}>
                {e.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>}
            </div>)}
          </div>}

          {achievements.length > 0 && <div>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Honours</h2>
            {achievements.map(a => <div key={a.id} style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 9.5 }}>{a.title}</span>
              {a.issuer && <span style={{ color: '#666', fontStyle: 'italic' }}> — {a.issuer}</span>}
              {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555', fontStyle: 'italic' }}>{a.description}</p>}
            </div>)}
          </div>}
        </div>

        <div style={{ borderLeft: '1px solid #ddd', paddingLeft: 20 }}>
          {education.length > 0 && <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Education</h2>
            {education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 9.5, margin: '0 0 1px' }}>{e.institution}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: '#555', margin: 0 }}>{e.degree} {e.field}</p>
              {e.honors && <p style={{ fontFamily: sans, fontSize: 7.5, color: c, margin: '1px 0 0', fontStyle: 'italic' }}>{e.honors}</p>}
              <p style={{ fontFamily: sans, fontSize: 7.5, color: '#999', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
            </div>)}
          </div>}

          {skills.length > 0 && <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Skills</h2>
            {skills.map((sk, i) => <p key={i} style={{ fontFamily: sans, fontSize: 8.5, margin: '0 0 4px', color: '#333' }}>◆ {sk}</p>)}
          </div>}

          {certifications.length > 0 && <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Credentials</h2>
            {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 6 }}>
              <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px' }}>{cert.name}</p>
              <p style={{ fontFamily: sans, fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}</p>
            </div>)}
          </div>}

          {languages.length > 0 && <div>
            <h2 style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', margin: '0 0 8px' }}>Languages</h2>
            {languages.map((l, i) => <p key={i} style={{ fontFamily: sans, fontSize: 8.5, margin: '0 0 3px', color: '#333' }}>{l.language} <span style={{ color: '#888', fontSize: 7.5 }}>· {l.proficiency}</span></p>)}
          </div>}
        </div>
      </div>
    </div>
  )
}
