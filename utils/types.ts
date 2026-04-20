export interface PersonalInfo {
  name: string; title: string; email: string; phone: string
  location: string; website: string; linkedin: string; github: string
  twitter: string; summary: string
}
export interface CustomLink { id: string; label: string; url: string }
export interface ExperienceEntry {
  id: string; company: string; role: string; startDate: string
  endDate: string; current: boolean; description: string; achievements: string[]
}
export interface EducationEntry {
  id: string; institution: string; degree: string; field: string
  startDate: string; endDate: string; gpa: string; honors: string
}
export interface ProjectEntry { id: string; name: string; description: string; tech: string; link: string }
export interface AchievementEntry { id: string; title: string; issuer: string; date: string; description: string }
export interface CertificationEntry { id: string; name: string; issuer: string; date: string; credentialId: string; link: string }
export interface VolunteerEntry { id: string; organization: string; role: string; startDate: string; endDate: string; current: boolean; description: string }
export interface LanguageEntry { id: string; language: string; proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic' }
export interface ResumeData {
  personal: PersonalInfo; customLinks: CustomLink[]
  experience: ExperienceEntry[]; education: EducationEntry[]
  skills: string[]; projects: ProjectEntry[]; achievements: AchievementEntry[]
  certifications: CertificationEntry[]; volunteer: VolunteerEntry[]; languages: LanguageEntry[]
}
export type FreeTemplateId = 'classic' | 'executive' | 'neon' | 'slate' | 'columns' | 'timeline' | 'bold' | 'elegant' | 'compact' | 'tribune' | 'carbon' | 'apex' | 'mono'
export type BuiltinTemplateId = FreeTemplateId
export type TemplateId = BuiltinTemplateId | string
export interface CustomTemplate { id: string; name: string; code: string; createdAt: number }
export interface TemplateSettings {
  showEmojis: boolean; paperSize: 'a4' | 'letter' | 'legal'
  scale: number; offsetX: number; offsetY: number; accentColor: string; fontFamily: string
}
export const PAPER_SIZES = {
  a4:     { width: 794,  height: 1123, label: 'A4 (210×297mm)',       mmW: 210, mmH: 297 },
  letter: { width: 816,  height: 1056, label: 'US Letter (8.5×11in)', mmW: 216, mmH: 279 },
  legal:  { width: 816,  height: 1344, label: 'US Legal (8.5×14in)',   mmW: 216, mmH: 356 },
}

// Pro templates (locked/coming soon)
export const PRO_TEMPLATES = [
  'Luxe','Prestige','Diamond','Platinum','Sapphire','Onyx','Aurora','Prism',
  'Orbit','Zenith','Pinnacle','Quantum','Stellar','Cipher','Matrix','Vertex',
  'Astral','Cascade','Eclipse','Horizon','Meridian','Solstice','Equinox','Flux',
  'Radiant','Velvet','Obsidian','Crystal','Opal','Topaz','Garnet','Amber',
  'Indigo','Scarlet','Viridian','Umber','Sienna','Ochre','Cerise','Mauve',
  'Sage','Slate Dark','Corporate Elite','Agency','Venture','Startup','Minimal Pro',
]

// ── Resume Projects System ──────────────────────────────────────────────────
export interface ResumeProject {
  id: string
  name: string
  data: ResumeData
  templateId: TemplateId
  settings: TemplateSettings
  updatedAt: number
  createdAt: number
}

// ── Custom Boxes (drag/resize overlays on preview) ─────────────────────────
export type BoxAlign = 'left' | 'center' | 'right'
export interface CustomBox {
  id: string
  text: string
  x: number        // percent 0–100
  y: number        // percent 0–100
  width: number    // percent
  height: number   // px
  fontSize: number
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  color: string
  background: string
  align: BoxAlign
  borderRadius: number
  borderColor: string
  borderWidth: number
  opacity: number
}
