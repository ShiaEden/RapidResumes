'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, Loader2, X } from 'lucide-react'

interface NomResult {
  place_id: number; display_name: string
  address: { city?: string; town?: string; village?: string; hamlet?: string; suburb?: string; county?: string; state?: string; state_code?: string; country?: string; country_code?: string }
  type: string; class: string
}

function fmtLoc(r: NomResult): string {
  const a = r.address
  const city = a.city || a.town || a.village || a.hamlet || a.suburb || a.county
  const parts: string[] = []
  if (city) parts.push(city)
  if (a.country_code === 'us') { if (a.state_code) parts.push(a.state_code.toUpperCase()) }
  else if (a.state) parts.push(a.state)
  if (a.country_code && a.country_code !== 'us') parts.push(a.country || '')
  return parts.filter(Boolean).join(', ')
}

export default function LocationInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<NomResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounce = useRef<NodeJS.Timeout>()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])
  useEffect(() => {
    const h = (e: MouseEvent) => { if (container.current && !container.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [])

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=8`, { headers: { 'Accept-Language': 'en' } })
      const data: NomResult[] = await res.json()
      const seen = new Set<string>()
      const filtered = data.filter(r => {
        const f = fmtLoc(r); if (!f || seen.has(f)) return false; seen.add(f); return true
      }).slice(0, 6)
      setSuggestions(filtered); setOpen(filtered.length > 0)
    } catch { setSuggestions([]); setOpen(false) } finally { setLoading(false) }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value; setQuery(q); onChange(q)
    clearTimeout(debounce.current); debounce.current = setTimeout(() => search(q), 320)
  }

  const select = (r: NomResult) => { const f = fmtLoc(r); setQuery(f); onChange(f); setSuggestions([]); setOpen(false) }

  return (
    <div ref={container} className="relative">
      <div className="relative">
        <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input className="rr-input pl-8" placeholder={placeholder || 'Type city — e.g. Hoosick, Albany, NYC...'} value={query}
          onChange={handleChange} onFocus={() => suggestions.length > 0 && setOpen(true)} autoComplete="off" />
        {loading && <Loader2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 animate-spin" />}
        {!loading && query && <button onMouseDown={(e) => { e.preventDefault(); setQuery(''); onChange(''); setSuggestions([]); setOpen(false) }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"><X size={13} /></button>}
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
          {suggestions.map(s => {
            const f = fmtLoc(s)
            return <button key={s.place_id} onMouseDown={(e) => { e.preventDefault(); select(s) }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-left transition-colors">
              <MapPin size={12} className="text-gray-300 flex-shrink-0" />
              <span className="text-sm text-gray-800 dark:text-gray-200">{f}</span>
            </button>
          })}
          <div className="px-3 py-1.5 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-gray-300 dark:text-gray-600">via OpenStreetMap</p>
          </div>
        </div>
      )}
    </div>
  )
}
