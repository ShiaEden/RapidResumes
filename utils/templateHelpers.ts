import { ResumeData } from './types'

export function fmt(d: string): string {
  if (!d) return ''
  const [y, m] = d.split('-')
  return new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function dateRange(start: string, end: string, current: boolean): string {
  if (!start && !end) return ''
  const s = fmt(start)
  const e = current ? 'Present' : fmt(end)
  if (!s) return e
  if (!e && !current) return s
  return `${s} – ${e}`
}

export const LEVEL_BARS: Record<string, number> = {
  Native: 5, Fluent: 4, Advanced: 3, Intermediate: 2, Basic: 1
}

export function lighter(hex: string, pct = 0.85): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16); const g = (n >> 8) & 0xff; const b = n & 0xff
  const mix = (c: number) => Math.round(c + (255 - c) * pct)
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`
}

export function rgba(hex: string, a: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`
}

/** Returns all contact items (standard + custom links) as label/value pairs for templates */
export function getContactItems(d: ResumeData): { label?: string; value: string }[] {
  const p = d.personal
  const items: { label?: string; value: string }[] = []
  if (p.email)    items.push({ value: p.email })
  if (p.phone)    items.push({ value: p.phone })
  if (p.location) items.push({ value: p.location })
  if (p.website)  items.push({ value: p.website })
  if (p.linkedin) items.push({ value: p.linkedin })
  if (p.github)   items.push({ value: p.github })
  if (p.twitter)  items.push({ value: p.twitter })
  // Custom links
  ;(d.customLinks || []).forEach(cl => {
    if (cl.url) items.push({ label: cl.label, value: cl.url })
  })
  return items
}
