import {ResumeData, TemplateSettings} from '@/utils/types'
import {fmt, dateRange, lighter, getContactItems} from '@/utils/templateHelpers'

interface P { data: ResumeData; settings: TemplateSettings }

// Slate: clean sidebar, calm gray palette, modern professional
export default function SlateTemplate({ data: d, settings: s }: P) {
  const { personal: p, experience, education, skills, projects, achievements, certifications, volunteer, languages } = d
  const c = s.accentColor
  const contacts = getContactItems(d)
  const font = `'Arial', 'Helvetica Neue', sans-serif`

  return (
    <div style={{ fontFamily: font, fontSize: 9.5, lineHeight: 1.55, color: '#222', background: '#fff', boxSizing: 'border-box', width: '100%', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 200, minWidth: 200, background: '#f1f3f5', padding: '32px 18px', borderRight: '1px solid #e0e3e7' }}>
        {/* Name in sidebar */}
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${c}` }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: '#111', lineHeight: 1.2, wordBreak: 'break-word' }}>{p.name || 'Your Name'}</h1>
          {p.title && <p style={{ fontSize: 8.5, color: c, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{p.title}</p>}
        </div>

        <SideSection title="Contact" c={c}>
          {contacts.map((ct, i) => <CI key={i} label={ct.label || ''} val={ct.value} />)}
        </SideSection>

        {skills.length > 0 && <SideSection title="Skills" c={c}>
          {skills.map((sk, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 8.5, color: '#333' }}>{sk}</span>
          </div>)}
        </SideSection>}

        {education.length > 0 && <SideSection title="Education" c={c}>
          {education.map(e => <div key={e.id} style={{ marginBottom: 10 }}>
            <p style={{ fontWeight: 700, fontSize: 9, margin: '0 0 1px', color: '#111' }}>{e.institution}</p>
            <p style={{ fontSize: 8, color: '#555', margin: 0 }}>{e.degree} {e.field}</p>
            {e.honors && <p style={{ fontSize: 7.5, color: c, margin: '1px 0 0' }}>{e.honors}</p>}
            {e.gpa && <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>GPA: {e.gpa}</p>}
            <p style={{ fontSize: 7.5, color: '#999', margin: '2px 0 0' }}>{dateRange(e.startDate, e.endDate, false)}</p>
          </div>)}
        </SideSection>}

        {certifications.length > 0 && <SideSection title="Certifications" c={c}>
          {certifications.map(cert => <div key={cert.id} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: 8.5, margin: '0 0 1px', color: '#111' }}>{cert.name}</p>
            <p style={{ fontSize: 7.5, color: '#777', margin: 0 }}>{cert.issuer}{cert.date ? ` · ${fmt(cert.date)}` : ''}</p>
          </div>)}
        </SideSection>}

        {languages.length > 0 && <SideSection title="Languages" c={c}>
          {languages.map((l, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 8.5, color: '#333' }}>{l.language}</span>
            <span style={{ fontSize: 7.5, color: '#888' }}>{l.proficiency}</span>
          </div>)}
        </SideSection>}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '32px 30px' }}>
        {p.summary && <div style={{ marginBottom: 18 }}>
          <MTitle t="Summary" c={c} />
          <p style={{ margin: 0, color: '#444', lineHeight: 1.65 }}>{p.summary}</p>
        </div>}

        {experience.length > 0 && <div style={{ marginBottom: 18 }}>
          <MTitle t="Experience" c={c} />
          {experience.map(e => <div key={e.id} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 10.5, margin: '0 0 1px', color: '#111' }}>{e.role}</p>
                <p style={{ fontSize: 9, color: c, fontWeight: 600, margin: 0 }}>{e.company}</p>
              </div>
              <span style={{ fontSize: 8, color: '#888', background: '#f1f3f5', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            {e.description && <p style={{ margin: '4px 0 0', color: '#444', fontSize: 9, lineHeight: 1.6 }}>{e.description}</p>}
            {e.achievements?.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: 14, color: '#444', fontSize: 9, lineHeight: 1.6 }}>
              {e.achievements.map((a, i) => <li key={i} style={{ marginBottom: 2 }}>{a}</li>)}
            </ul>}
          </div>)}
        </div>}

        {achievements.length > 0 && <div style={{ marginBottom: 18 }}>
          <MTitle t="Awards & Achievements" c={c} />
          {achievements.map(a => <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div><span style={{ fontWeight: 700, fontSize: 9.5 }}>{a.title}</span>{a.issuer && <span style={{ color: '#555' }}> — {a.issuer}</span>}
              {a.description && <p style={{ margin: '2px 0 0', fontSize: 8.5, color: '#555' }}>{a.description}</p>}
            </div>
            {a.date && <span style={{ fontSize: 8, color: '#888', whiteSpace: 'nowrap' }}>{fmt(a.date)}</span>}
          </div>)}
        </div>}

        {projects.length > 0 && <div style={{ marginBottom: 18 }}>
          <MTitle t="Projects" c={c} />
          {projects.map(pr => <div key={pr.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700, fontSize: 9.5 }}>{pr.name}</span>
              {pr.tech && <span style={{ fontSize: 8, background: lighter(c, 0.9), color: c, padding: '1px 7px', borderRadius: 3 }}>{pr.tech}</span>}
            </div>
            {pr.link && <span style={{ fontSize: 8, color: '#888' }}>{pr.link}</span>}
            {pr.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#444' }}>{pr.description}</p>}
          </div>)}
        </div>}

        {volunteer.length > 0 && <div style={{ marginBottom: 18 }}>
          <MTitle t="Volunteer" c={c} />
          {volunteer.map(v => <div key={v.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 9.5 }}>{v.role}{v.organization && <span style={{ fontWeight: 400, color: '#555' }}> — {v.organization}</span>}</span>
              <span style={{ fontSize: 8, color: '#888', whiteSpace: 'nowrap' }}>{dateRange(v.startDate, v.endDate, v.current)}</span>
            </div>
            {v.description && <p style={{ margin: '3px 0 0', fontSize: 9, color: '#444' }}>{v.description}</p>}
          </div>)}
        </div>}
      </div>
    </div>
  )
}

function SideSection({ title, c, children }: { title: string; c: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 18 }}>
    <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c, margin: '0 0 8px' }}>{title}</p>
    {children}
  </div>
}
function MTitle({ t, c }: { t: string; c: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
    <h2 style={{ fontSize: 10, fontWeight: 700, color: '#111', margin: 0, whiteSpace: 'nowrap' }}>{t}</h2>
    <div style={{ flex: 1, height: 1.5, background: c, opacity: 0.3 }} />
  </div>
}
function CI({ label, val }: { label: string; val: string }) {
  return <div style={{ marginBottom: 6 }}>
    <p style={{ fontSize: 6.5, color: '#aaa', margin: '0 0 1px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
    <p style={{ fontSize: 8, color: '#333', margin: 0, wordBreak: 'break-all' }}>{val}</p>
  </div>
}
