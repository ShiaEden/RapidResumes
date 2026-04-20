import { ResumeData, TemplateId, TemplateSettings, CustomTemplate } from './types'

const get = (k: string) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null } catch { return null } }
const set = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export interface SavedSnapshot {
  id: string
  name: string
  savedAt: number
  data: ResumeData
  templateId: TemplateId
  settings: TemplateSettings
}

export const storage = {
  getResume: (): ResumeData | null => get('rr_resume'),
  setResume: (d: ResumeData) => set('rr_resume', d),
  getTemplate: (): TemplateId | null => get('rr_template'),
  setTemplate: (t: TemplateId) => set('rr_template', t),
  getSettings: (): TemplateSettings | null => get('rr_settings'),
  setSettings: (s: TemplateSettings) => set('rr_settings', s),
  getCustomTemplates: (): CustomTemplate[] => get('rr_custom_tpls') ?? [],
  setCustomTemplates: (tpls: CustomTemplate[]) => set('rr_custom_tpls', tpls),
  // Named snapshots
  getSnapshots: (): SavedSnapshot[] => get('rr_snapshots') ?? [],
  setSnapshots: (snaps: SavedSnapshot[]) => set('rr_snapshots', snaps),
  saveSnapshot: (name: string, data: ResumeData, templateId: TemplateId, settings: TemplateSettings) => {
    const snaps: SavedSnapshot[] = get('rr_snapshots') ?? []
    const snap: SavedSnapshot = { id: Date.now().toString(), name, savedAt: Date.now(), data, templateId, settings }
    set('rr_snapshots', [snap, ...snaps].slice(0, 10)) // keep max 10
    return snap
  },
  deleteSnapshot: (id: string) => {
    const snaps: SavedSnapshot[] = get('rr_snapshots') ?? []
    set('rr_snapshots', snaps.filter(s => s.id !== id))
  },
}
