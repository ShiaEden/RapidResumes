'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  User, Briefcase, GraduationCap, FolderOpen, Download, Moon, Sun,
  Layers, FileJson, Upload, Save, Eye, EyeOff, Zap, Award,
  BadgeCheck, Heart, Globe2, CheckCircle2, AlertCircle,
  Link2, MessageSquare, Coffee, Mail, ShieldCheck, Crown,
  Plus, Copy, Trash2,
} from 'lucide-react'
import clsx from 'clsx'

import FormSection from '@/components/FormSection'
import ExperienceForm from '@/components/ExperienceForm'
import EducationForm from '@/components/EducationForm'
import ProjectForm from '@/components/ProjectForm'
import SkillInput from '@/components/SkillInput'
import TemplateSwitcher from '@/components/TemplateSwitcher'
import ResumeRenderer from '@/components/ResumeRenderer'
import LocationInput from '@/components/LocationInput'
import AchievementForm from '@/components/AchievementForm'
import CertificationForm from '@/components/CertificationForm'
import VolunteerForm from '@/components/VolunteerForm'
import LanguageForm from '@/components/LanguageForm'
import CustomTemplateBuilder from '@/components/CustomTemplateBuilder'
import CustomLinksForm from '@/components/CustomLinksForm'
import FeedbackModal from '@/components/FeedbackModal'
import EmailPDFModal from '@/components/EmailPDFModal'
import ProjectSwitcher from '@/components/ProjectSwitcher'
import EmptyState from '@/components/EmptyState'
import CustomBoxLayer from '@/components/CustomBoxLayer'

import { ResumeData, TemplateId, TemplateSettings, CustomTemplate, PAPER_SIZES, CustomBox, ResumeProject } from '@/utils/types'
import { defaultSettings, emptyResumeData, createProject, duplicateProject } from '@/utils/emptyResume'
import { exportToPDF, exportToJSON, importFromJSON } from '@/utils/pdfExport'
import { projectStorage } from '@/utils/projects'
import { storage } from '@/utils/storage'

type Toast = { id: number; msg: string; type: 'success' | 'error' }
type Modal = 'builder' | 'feedback' | 'email' | null

export default function App() {
  // ── Projects ───────────────────────────────────────────────────────────────
  const [projects, setProjects]     = useState<ResumeProject[]>([])
  const [activeId, setActiveId]     = useState<string | null>(null)

  // ── Active resume state (derived from active project) ────────────────────
  const [data, setData]             = useState<ResumeData>(emptyResumeData)
  const [templateId, setTemplateId] = useState<TemplateId>('classic')
  const [settings, setSettings]     = useState<TemplateSettings>(defaultSettings)

  // ── Custom boxes overlaid on preview ─────────────────────────────────────
  const [boxes, setBoxes]           = useState<CustomBox[]>([])
  const [showBoxes, setShowBoxes]   = useState(false)

  // ── App state ────────────────────────────────────────────────────────────
  const [customTpls, setCustomTpls] = useState<CustomTemplate[]>([])
  const [darkMode, setDarkMode]     = useState(false)
  const [exporting, setExporting]   = useState(false)
  const [previewOpen, setPreviewOpen] = useState(true)
  const [previewScale, setPreviewScale] = useState(0.45)
  const [toasts, setToasts]         = useState<Toast[]>([])
  const [modal, setModal]           = useState<Modal>(null)
  const [activeTab, setActiveTab]   = useState<'form' | 'style'>('form')

  const previewRef  = useRef<HTMLDivElement>(null)
  const fileRef     = useRef<HTMLInputElement>(null)
  const toastId     = useRef(0)
  const saveTimer   = useRef<NodeJS.Timeout>()

  // ── Boot: load projects from localStorage ─────────────────────────────────
  useEffect(() => {
    const all = projectStorage.getAll()
    setProjects(all)

    const savedActiveId = projectStorage.getActive()
    const target = all.find(p => p.id === savedActiveId) || all[0]

    if (target) {
      activateProject(target)
    }
    // else: stay empty — show EmptyState

    const ct = storage.getCustomTemplates(); if (ct) setCustomTpls(ct)
    const dm = localStorage.getItem('rr_darkmode'); if (dm === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    try { localStorage.setItem('rr_darkmode', String(darkMode)) } catch {}
  }, [darkMode])

  useEffect(() => { storage.setCustomTemplates(customTpls) }, [customTpls])

  // ── Preview scale ─────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (previewRef.current) {
        const cw = previewRef.current.clientWidth - 48
        const paper = PAPER_SIZES[settings.paperSize]
        setPreviewScale(Math.min(cw / paper.width, 0.7))
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (previewRef.current) ro.observe(previewRef.current)
    return () => ro.disconnect()
  }, [previewOpen, settings.paperSize])

  // ── Auto-save current project (debounced 500ms) ──────────────────────────
  const autoSave = useCallback((proj: ResumeProject) => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      projectStorage.upsert({ ...proj, updatedAt: Date.now() })
      setProjects(projectStorage.getAll())
    }, 500)
  }, [])

  // Whenever data/template/settings change, save back to the active project
  useEffect(() => {
    if (!activeId) return
    const proj = projects.find(p => p.id === activeId)
    if (!proj) return
    const updated: ResumeProject = { ...proj, data, templateId, settings, updatedAt: Date.now() }
    autoSave(updated)
  }, [data, templateId, settings])

  // ── Toast ─────────────────────────────────────────────────────────────────
  const toast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
  }, [])

  // ── Project actions ───────────────────────────────────────────────────────
  function activateProject(proj: ResumeProject) {
    setActiveId(proj.id)
    setData(proj.data)
    setTemplateId(proj.templateId)
    setSettings(proj.settings)
    setBoxes([])
    projectStorage.setActive(proj.id)
  }

  const handleNewProject = () => {
    const proj = createProject()
    projectStorage.upsert(proj)
    const all = projectStorage.getAll()
    setProjects(all)
    activateProject(proj)
    toast('New resume created!')
  }

  const handleSwitchProject = (id: string) => {
    const proj = projects.find(p => p.id === id)
    if (proj) { activateProject(proj); toast(`Switched to "${proj.name}"`) }
  }

  const handleDuplicateProject = (id: string) => {
    const proj = projects.find(p => p.id === id)
    if (!proj) return
    const copy = duplicateProject(proj)
    projectStorage.upsert(copy)
    const all = projectStorage.getAll()
    setProjects(all)
    activateProject(copy)
    toast(`Duplicated "${proj.name}"`)
  }

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) return
    projectStorage.delete(id)
    const all = projectStorage.getAll()
    setProjects(all)
    if (id === activeId) {
      const next = all[0]
      if (next) activateProject(next)
    }
    toast('Resume deleted')
  }

  const handleRenameProject = (id: string, name: string) => {
    projectStorage.rename(id, name)
    setProjects(projectStorage.getAll())
    toast(`Renamed to "${name}"`)
  }

  const handleManualSave = () => {
    if (!activeId) return
    const proj = projects.find(p => p.id === activeId)
    if (!proj) return
    projectStorage.upsert({ ...proj, data, templateId, settings, updatedAt: Date.now() })
    setProjects(projectStorage.getAll())
    toast('Saved!')
  }

  // ── PDF / JSON ────────────────────────────────────────────────────────────
  const handleExportPDF = async () => {
    setExporting(true)
    try {
      await exportToPDF('resume-preview', data.personal.name || 'resume', settings.paperSize)
      toast('PDF downloaded!')
    } catch { toast('Export failed — try again', 'error') }
    finally { setExporting(false) }
  }

  const handleExportJSON = () => {
    exportToJSON({ data, templateId, settings }, data.personal.name || 'resume')
    toast('JSON exported!')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    try {
      const raw = await importFromJSON(file) as Partial<{ data: ResumeData; templateId: TemplateId; settings: TemplateSettings } & ResumeData>
      // Support both old (ResumeData directly) and new (wrapped) format
      const importedData: ResumeData = raw.data ?? (raw as unknown as ResumeData)
      const proj = createProject(`Imported — ${file.name.replace('.json', '')}`)
      proj.data = { ...emptyResumeData, ...importedData, personal: { ...emptyResumeData.personal, ...(importedData.personal || {}) } }
      if (raw.templateId) proj.templateId = raw.templateId
      if (raw.settings)   proj.settings = { ...defaultSettings, ...raw.settings }
      projectStorage.upsert(proj)
      setProjects(projectStorage.getAll())
      activateProject(proj)
      toast('Imported as new resume!')
    } catch { toast('Invalid JSON file', 'error') }
    e.target.value = ''
  }

  const handleEmailPDF = async (email: string) => {
    const html2canvas = (await import('html2canvas')).default
    const { jsPDF } = await import('jspdf')
    const el = document.getElementById('resume-preview')
    if (!el) throw new Error('Resume element not found')
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false })
    const imgData = canvas.toDataURL('image/jpeg', 0.92)
    const paper = PAPER_SIZES[settings.paperSize]
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [paper.mmW, paper.mmH] })
    pdf.addImage(imgData, 'JPEG', 0, 0, paper.mmW, paper.mmH)
    const pdfBase64 = pdf.output('datauristring').split(',')[1]
    const res = await fetch('/api/email-pdf', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, resumeName: data.personal.name || 'Resume', pdfBase64 }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to send')
  }

  const handleSaveCustomTemplate = (tpl: CustomTemplate) => {
    setCustomTpls(prev => {
      const idx = prev.findIndex(c => c.id === tpl.id)
      if (idx >= 0) { const n = [...prev]; n[idx] = tpl; return n }
      return [...prev, tpl]
    })
    setTemplateId(tpl.id)
    toast(`Template "${tpl.name}" saved!`)
  }

  const handleDeleteCustom = (id: string) => {
    setCustomTpls(prev => prev.filter(c => c.id !== id))
    if (templateId === id) setTemplateId('classic')
    toast('Template deleted')
  }

  const up = (field: string, value: string) =>
    setData(p => ({ ...p, personal: { ...p.personal, [field]: value } }))

  const paper = PAPER_SIZES[settings.paperSize]
  const hasProject = activeId !== null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

      {/* ── PRIVACY BANNER ── */}
      <div className="bg-green-50 dark:bg-green-950/40 border-b border-green-100 dark:border-green-900/50 px-4 py-1.5 text-center">
        <p className="text-xs text-green-700 dark:text-green-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck size={12} /> We don't sell your data. Ever. Everything stays in your browser.
        </p>
      </div>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-13 flex items-center gap-3 py-2.5">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-2">
            <img src="/logo.png" alt="RapidResumes" className="w-8 h-8 rounded-xl object-contain bg-gray-900" />
            <div className="hidden sm:block">
              <span className="font-black text-gray-900 dark:text-white text-sm tracking-tight">Rapid</span>
              <span className="font-black text-sm tracking-tight" style={{ color: settings.accentColor }}>Resumes</span>
            </div>
          </div>

          {/* Project Switcher */}
          {projects.length > 0 && (
            <ProjectSwitcher
              projects={projects}
              activeId={activeId || ''}
              accentColor={settings.accentColor}
              onSwitch={handleSwitchProject}
              onCreate={handleNewProject}
              onDuplicate={handleDuplicateProject}
              onDelete={handleDeleteProject}
              onRename={handleRenameProject}
            />
          )}

          {/* Mobile tabs */}
          {hasProject && (
            <div className="flex lg:hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
              {(['form', 'style'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={clsx('px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize',
                    activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500')}>
                  {tab}
                </button>
              ))}
            </div>
          )}

          <Link href="/pricing" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Crown size={12} /> Pricing
          </Link>

          <div className="flex-1" />

          {/* Quick action bar */}
          <div className="flex items-center gap-1.5">
            {hasProject && (
              <>
                <button onClick={handleNewProject} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5" title="New Resume">
                  <Plus size={13} /> New
                </button>
                <button onClick={handleManualSave} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5">
                  <Save size={13} /> Save
                </button>
                <button onClick={() => activeId && handleDuplicateProject(activeId)} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5" title="Duplicate">
                  <Copy size={13} /> Dupe
                </button>
                <button onClick={() => activeId && projects.length > 1 && handleDeleteProject(activeId)} disabled={projects.length <= 1}
                  className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-30" title="Delete">
                  <Trash2 size={13} />
                </button>
                <button onClick={() => fileRef.current?.click()} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5">
                  <Upload size={13} /> Import
                </button>
                <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                <button onClick={handleExportJSON} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5">
                  <FileJson size={13} /> JSON
                </button>
                <button onClick={() => setModal('email')} className="rr-btn-ghost hidden sm:flex text-xs px-2.5 py-1.5">
                  <Mail size={13} /> Email
                </button>
              </>
            )}
            <button onClick={() => setModal('feedback')} className="rr-btn-ghost hidden sm:flex text-xs p-2"><MessageSquare size={13} /></button>
            <button onClick={() => setPreviewOpen(v => !v)} className="rr-btn-ghost lg:hidden p-2">
              {previewOpen ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button onClick={() => setDarkMode(v => !v)} className="rr-btn-ghost p-2">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <a href="https://cash.app/$CoComStudios" target="_blank" rel="noopener noreferrer"
              className="rr-btn-ghost hidden sm:flex text-xs px-2 py-1.5 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/30">
              <Coffee size={13} /> Tip
            </a>
            {hasProject && (
              <button onClick={handleExportPDF} disabled={exporting}
                className="rr-btn-primary px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-60"
                style={{ background: settings.accentColor }}>
                {exporting ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</> : <><Download size={14} />PDF</>}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── EMPTY STATE ── */}
      {!hasProject ? (
        <EmptyState
          accentColor={settings.accentColor}
          onNew={handleNewProject}
          onImport={() => fileRef.current?.click()}
        />
      ) : (
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-5">
          <div className="flex gap-5 items-start">

            {/* ── LEFT PANEL ── */}
            <div className={clsx('w-full lg:w-[460px] xl:w-[500px] flex-shrink-0 space-y-3', activeTab === 'form' ? 'block' : 'hidden lg:block')}>

              {/* Style panel */}
              <div className={clsx('rr-card p-5', activeTab === 'style' ? 'block' : 'hidden lg:block')}>
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={17} className="text-blue-500" />
                  <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Templates & Style</h2>
                </div>
                <TemplateSwitcher
                  selected={templateId}
                  settings={settings}
                  customTemplates={customTpls}
                  onTemplate={setTemplateId}
                  onSettings={setSettings}
                  onOpenCustomBuilder={() => setModal('builder')}
                  onDeleteCustom={handleDeleteCustom}
                />
              </div>

              {/* Form sections */}
              <div className={clsx('space-y-3', activeTab === 'form' ? 'block' : 'hidden lg:block')}>
                <FormSection title="Personal Info" icon={<User size={17} />} defaultOpen>
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="col-span-2"><label className="rr-label">Full Name *</label><input className="rr-input" placeholder="Your Name" value={data.personal.name} onChange={e => up('name', e.target.value)} /></div>
                    <div className="col-span-2"><label className="rr-label">Job Title / Headline</label><input className="rr-input" placeholder="Software Engineer" value={data.personal.title} onChange={e => up('title', e.target.value)} /></div>
                    <div><label className="rr-label">Email</label><input className="rr-input" type="email" placeholder="you@email.com" value={data.personal.email} onChange={e => up('email', e.target.value)} /></div>
                    <div><label className="rr-label">Phone</label><input className="rr-input" placeholder="+1 (555) 000-0000" value={data.personal.phone} onChange={e => up('phone', e.target.value)} /></div>
                    <div className="col-span-2"><label className="rr-label">Location</label><LocationInput value={data.personal.location} onChange={v => up('location', v)} /></div>
                    <div><label className="rr-label">Website</label><input className="rr-input" placeholder="yoursite.com" value={data.personal.website} onChange={e => up('website', e.target.value)} /></div>
                    <div><label className="rr-label">LinkedIn</label><input className="rr-input" placeholder="linkedin.com/in/you" value={data.personal.linkedin} onChange={e => up('linkedin', e.target.value)} /></div>
                    <div><label className="rr-label">GitHub</label><input className="rr-input" placeholder="github.com/you" value={data.personal.github} onChange={e => up('github', e.target.value)} /></div>
                    <div><label className="rr-label">Twitter / X</label><input className="rr-input" placeholder="x.com/you" value={data.personal.twitter} onChange={e => up('twitter', e.target.value)} /></div>
                    <div className="col-span-2"><label className="rr-label">Professional Summary</label><textarea className="rr-input resize-none" rows={4} placeholder="A brief, impactful summary of who you are and what you bring to the table…" value={data.personal.summary} onChange={e => up('summary', e.target.value)} /></div>
                  </div>
                </FormSection>

                <FormSection title="Custom Links" icon={<Link2 size={17} />} badge={data.customLinks?.length > 0 ? String(data.customLinks.length) : undefined} defaultOpen={false}>
                  <CustomLinksForm links={data.customLinks || []} onChange={customLinks => setData(p => ({ ...p, customLinks }))} />
                </FormSection>

                <FormSection title="Experience" icon={<Briefcase size={17} />} badge={data.experience.length > 0 ? String(data.experience.length) : undefined}>
                  <ExperienceForm entries={data.experience} onChange={exp => setData(p => ({ ...p, experience: exp }))} />
                </FormSection>

                <FormSection title="Education" icon={<GraduationCap size={17} />} badge={data.education.length > 0 ? String(data.education.length) : undefined}>
                  <EducationForm entries={data.education} onChange={edu => setData(p => ({ ...p, education: edu }))} />
                </FormSection>

                <FormSection title="Skills" icon={<Zap size={17} />} badge={data.skills.length > 0 ? String(data.skills.length) : undefined}>
                  <div className="pt-3"><SkillInput skills={data.skills} onChange={skills => setData(p => ({ ...p, skills }))} /></div>
                </FormSection>

                <FormSection title="Achievements & Awards" icon={<Award size={17} />} badge={data.achievements.length > 0 ? String(data.achievements.length) : undefined} defaultOpen={false}>
                  <AchievementForm entries={data.achievements} onChange={achievements => setData(p => ({ ...p, achievements }))} />
                </FormSection>

                <FormSection title="Certifications" icon={<BadgeCheck size={17} />} badge={data.certifications.length > 0 ? String(data.certifications.length) : undefined} defaultOpen={false}>
                  <CertificationForm entries={data.certifications} onChange={certifications => setData(p => ({ ...p, certifications }))} />
                </FormSection>

                <FormSection title="Projects" icon={<FolderOpen size={17} />} badge={data.projects.length > 0 ? String(data.projects.length) : undefined} defaultOpen={false}>
                  <ProjectForm entries={data.projects} onChange={projects => setData(p => ({ ...p, projects }))} />
                </FormSection>

                <FormSection title="Languages" icon={<Globe2 size={17} />} badge={data.languages.length > 0 ? String(data.languages.length) : undefined} defaultOpen={false}>
                  <LanguageForm entries={data.languages} onChange={languages => setData(p => ({ ...p, languages }))} />
                </FormSection>

                <FormSection title="Volunteer / Community" icon={<Heart size={17} />} badge={data.volunteer.length > 0 ? String(data.volunteer.length) : undefined} defaultOpen={false}>
                  <VolunteerForm entries={data.volunteer} onChange={volunteer => setData(p => ({ ...p, volunteer }))} />
                </FormSection>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4">
                  <button onClick={() => setModal('feedback')} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><MessageSquare size={11} /> Suggest a feature</button>
                  <button onClick={() => setModal('feedback')} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Report a bug</button>
                  <a href="https://cash.app/$CoComStudios" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-600 transition-colors"><Coffee size={11} /> Support RapidResumes</a>
                  <span className="text-xs text-gray-300 dark:text-gray-700 flex items-center gap-1"><ShieldCheck size={11} /> We don't sell your data. Ever.</span>
                </div>
                <div className="h-3" />
              </div>
            </div>

            {/* ── RIGHT: PREVIEW ── */}
            <div className={clsx('flex-1 min-w-0', previewOpen ? 'block' : 'hidden lg:block')}>
              <div className="sticky top-16">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Live Preview</h2>
                    <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md font-medium">{paper.label} · {templateId}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowBoxes(v => !v)}
                      className={clsx('rr-btn-ghost text-xs px-3 py-1.5', showBoxes && 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800')}>
                      ✏️ Custom Boxes
                    </button>
                    <button onClick={() => setModal('email')} className="rr-btn-ghost text-xs px-3 py-1.5"><Mail size={13} /> Email PDF</button>
                    <button onClick={handleExportPDF} disabled={exporting}
                      className="rr-btn-primary px-3 py-1.5 rounded-lg text-xs disabled:opacity-60" style={{ background: settings.accentColor }}>
                      <Download size={13} />{exporting ? 'Exporting…' : 'Download PDF'}
                    </button>
                  </div>
                </div>

                {/* Canvas with optional box layer */}
                <div ref={previewRef} className="bg-gray-300 dark:bg-gray-800 rounded-2xl p-5 overflow-hidden flex justify-center">
                  <div style={{ position: 'relative', width: paper.width * previewScale, height: paper.height * previewScale, flexShrink: 0 }}>
                    <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left', width: paper.width, position: 'absolute', top: 0, left: 0 }}>
                      <ResumeRenderer data={data} templateId={templateId} settings={settings} customTemplates={customTpls} />
                    </div>
                    {/* Custom box overlay (on top of scaled resume) */}
                    {showBoxes && (
                      <CustomBoxLayer
                        boxes={boxes}
                        onChange={setBoxes}
                        containerWidth={paper.width * previewScale}
                        containerHeight={paper.height * previewScale}
                        accentColor={settings.accentColor}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={handleExportPDF} disabled={exporting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 shadow-md"
                    style={{ background: settings.accentColor }}>
                    {exporting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating PDF…</> : <><Download size={16} />Download as PDF</>}
                  </button>
                  <button onClick={handleExportJSON} className="rr-btn-ghost px-4 py-3 rounded-xl" title="Export JSON"><FileJson size={16} /></button>
                  <button onClick={() => fileRef.current?.click()} className="rr-btn-ghost px-4 py-3 rounded-xl" title="Import JSON"><Upload size={16} /></button>
                </div>

                <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">{paper.label} · {paper.mmW}×{paper.mmH}mm · 3× resolution export</p>

                <div className="flex items-center justify-center gap-4 mt-3">
                  <a href="https://cash.app/$CoComStudios" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-600 transition-colors font-medium"><Coffee size={12} /> Tip $CoComStudios</a>
                  <button onClick={() => setModal('feedback')} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><MessageSquare size={12} /> Feedback</button>
                  <span className="text-xs text-gray-300 dark:text-gray-700 flex items-center gap-1"><ShieldCheck size={11} /> No data sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {modal === 'builder' && (
        <CustomTemplateBuilder accentColor={settings.accentColor} onSave={handleSaveCustomTemplate} onClose={() => setModal(null)} />
      )}
      {modal === 'feedback' && <FeedbackModal onClose={() => setModal(null)} accentColor={settings.accentColor} />}
      {modal === 'email' && (
        <EmailPDFModal onClose={() => setModal(null)} onSend={handleEmailPDF} accentColor={settings.accentColor} resumeName={data.personal.name || 'Resume'} />
      )}

      {/* ── TOASTS ── */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={clsx('flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium anim-in pointer-events-auto',
            t.type === 'success' ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'bg-red-600 text-white')}>
            {t.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            {t.msg}
          </div>
        ))}
      </div>

      {/* fileRef input is in the nav actions above */}
    </div>
  )
}
