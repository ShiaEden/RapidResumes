import { ResumeData, TemplateSettings, ResumeProject } from './types'

export const emptyResumeData: ResumeData = {
  personal: {
    name: '', title: '', email: '', phone: '',
    location: '', website: '', linkedin: '', github: '',
    twitter: '', summary: '',
  },
  customLinks: [],
  experience: [],
  education: [],
  skills: [],
  projects: [],
  achievements: [],
  certifications: [],
  volunteer: [],
  languages: [],
}

export const defaultSettings: TemplateSettings = {
  showEmojis: false,
  paperSize: 'letter',
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  accentColor: '#2563eb',
  fontFamily: 'Helvetica',
}

export function createProject(name = 'Untitled Resume'): ResumeProject {
  return {
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    data: JSON.parse(JSON.stringify(emptyResumeData)),
    templateId: 'classic',
    settings: { ...defaultSettings },
    updatedAt: Date.now(),
    createdAt: Date.now(),
  }
}

export function duplicateProject(proj: ResumeProject): ResumeProject {
  return {
    ...JSON.parse(JSON.stringify(proj)),
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: `${proj.name} (copy)`,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  }
}
