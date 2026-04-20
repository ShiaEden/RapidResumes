import {ResumeData, TemplateSettings} from '@/utils/types'
import {fmt, dateRange, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Classic: timeless serif, centered header, ruled sections
export default function ClassicTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, volunteer, languages } = d
  const contacts = getContactItems(d)
  const c = s.accentColor
  const font = `'Georgia', 'Times New Roman', serif`

  const SecTitle = ({ t }: { t: string }) => (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{ fontFamily: font, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', margin: 0, paddingBottom: 4, borderBottom: `1.5px solid ${c}` }}>{t}</h2>
    </div>
  )

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', padding: '36px 48px', boxSizing: 'border-box', width: '100%' }}>
      {/* Centered header */}
      <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: `2px solid ${c}` }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: '0 0 4px', color: '#111' }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ fontSize: 11, color: c, fontWeight: 400, fontStyle: 'italic', margin: '0 0 8px' }}>{p.title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 14px', fontSize: 8.5, color: '#555' }}>
          {contacts.map((c, i) => <span key={i}>{c.label ? <strong style={{ fontWeight: 600 }}>{c.label}:</strong> : null}{c.label ? ' ' : ''}{c.value}</span>)}
        </div>
      </div>

      {p.summary && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Summary" />
        <p style={{ margin: 0, color: '#444', lineHeight: 1.65 }}>{p.summary}</p>
      </div>}

      {experience.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Experience" />
        {experience.map(e => <div key={e.id} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 700, fontSize: 10 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: '#555' }}> — {e.company}</span>}</span>
            <span style={{ fontSize: 8, color: '#777', whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          {e.description && <p style={{ margin: '3px 0 0', color: '#444', fontSize: 9 }}>{e.description}</p>}
          {e.achievements?.length > 0 && <ul style={{ margin: '5px 0 0', paddingLeft: 16, color: '#444', fontSize: 9, lineHeight: 1.6 }}>
            {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
          </ul>}
        </div>)}
      </div>}

      {education.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Education" />
        {education.map(e => <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 10 }}>{e.institution}</span>
            {(e.degree || e.field) && <span style={{ color: '#555' }}> — {e.degree} {e.field}</span>}
            {e.honors && <span style={{ color: '#777', fontSize: 8.5 }}> · {e.honors}</span>}
            {e.gpa && <span style={{ color: '#777', fontSize: 8.5 }}> · GPA {e.gpa}</span>}
          </div>
          <span style={{ fontSize: 8, color: '#777', whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, false)}</span>
        </div>)}
      </div>}

      {skills.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Skills" />
        <p style={{ margin: 0, color: '#444', fontSize: 9 }}>{skills.join(' · ')}</p>
      </div>}

      {achievements.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Awards & Achievements" />
        {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div><span style={{ fontWeight: 700, fontSize: 9.5 }}>{a.title}</span>{a.issuer && <span style={{ color: '#555' }}> — {a.issuer}</span>}
            {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
          </div>
          {a.date && <span style={{ fontSize: 8, color: '#777', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
        </div>)}
      </div>}

      {certifications.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Certifications" />
        {certifications.map(c2 => <div key={c2.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span><span style={{ fontWeight: 700, fontSize: 9.5 }}>{c2.name}</span>{c2.issuer && <span style={{ color: '#555' }}> · {c2.issuer}</span>}</span>
          {c2.date && <span style={{ fontSize: 8, color: '#777', whiteSpace: 'nowrap' }}>{fmt(c2.date)}</span>}
        </div>)}
      </div>}

      {projects.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Projects" />
        {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 9.5 }}>{pr.name}</span>
          {pr.tech && <span style={{ color: '#777', fontSize: 8.5 }}> · {pr.tech}</span>}
          {pr.link && <span style={{ color: c, fontSize: 8.5 }}> · {pr.link}</span>}
          {pr.description && <p style={{ margin: '2px 0 0', fontSize: 9, color: '#444' }}>{pr.description}</p>}
        </div>)}
      </div>}

      {languages.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Languages" />
        <p style={{ margin: 0, color: '#444', fontSize: 9 }}>{languages.map(l => `${l.language} (${l.proficiency})`).join(' · ')}</p>
      </div>}

      {volunteer.length > 0 && <div style={{ marginBottom: 16 }}>
        <SecTitle t="Volunteer" />
        {volunteer.map(v => <div key={v.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: 9.5 }}>{v.role}{v.organization && <span style={{ fontWeight: 400, color: '#555' }}> — {v.organization}</span>}</span>
            <span style={{ fontSize: 8, color: '#777', whiteSpace: 'nowrap' }}>{dateRange(v.startDate, v.endDate, v.current)}</span>
          </div>
          {v.description && <p style={{ margin: '2px 0 0', fontSize: 9, color: '#444' }}>{v.description}</p>}
        </div>)}
      </div>}
    </div>
  )
}
