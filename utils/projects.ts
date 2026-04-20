import { ResumeProject } from './types'

const KEY = 'rr-projects'
const ACTIVE_KEY = 'rr-active-project'

function get(): ResumeProject[] {
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : [] } catch { return [] }
}
function save(projects: ResumeProject[]) {
  try { localStorage.setItem(KEY, JSON.stringify(projects)) } catch {}
}

export const projectStorage = {
  getAll: (): ResumeProject[] => get(),

  getActive: (): string | null => {
    try { return localStorage.getItem(ACTIVE_KEY) } catch { return null }
  },

  setActive: (id: string) => {
    try { localStorage.setItem(ACTIVE_KEY, id) } catch {}
  },

  upsert: (proj: ResumeProject) => {
    const all = get()
    const idx = all.findIndex(p => p.id === proj.id)
    if (idx >= 0) { all[idx] = proj } else { all.unshift(proj) }
    save(all)
  },

  delete: (id: string) => {
    save(get().filter(p => p.id !== id))
  },

  rename: (id: string, name: string) => {
    const all = get()
    const proj = all.find(p => p.id === id)
    if (proj) { proj.name = name; proj.updatedAt = Date.now(); save(all) }
  },
}
