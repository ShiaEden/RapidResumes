'use client'
import Link from 'next/link'
import { Check, X, Zap, Crown, Star, ArrowLeft, Coffee } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

const FREE_TEMPLATES = [
  'Classic','Executive','Neon','Slate','Columns','Timeline','Bold','Elegant',
  'Compact','Tribune','Sidebar Pro','Carbon','Iris','Apex','Mono','Grove',
  'Summit','Ridge','Cobalt','Flare','Dusk','Frost','Ember','Nova',
]

const PRO_TEMPLATES = [
  'Luxe','Prestige','Diamond','Platinum','Sapphire','Onyx','Aurora','Prism',
  'Orbit','Zenith','Pinnacle','Quantum','Stellar','Cipher','Matrix','Vertex',
  'Astral','Cascade','Eclipse','Horizon','Meridian','Solstice','Equinox','Flux',
  'Radiant','Velvet','Obsidian','Crystal','Opal','Topaz','Garnet','Amber',
  'Indigo','Scarlet','Viridian','Umber','Sienna','Ochre','Cerise','Mauve',
  'Sage','Slate Dark','Corporate Elite','Agency','Venture','Startup','Minimal Pro',
]

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: Zap,
    color: '#2563eb',
    desc: 'Everything you need to build a great resume.',
    features: [
      { text: '24 beautiful templates', ok: true },
      { text: 'PDF export (A4, Letter, Legal)', ok: true },
      { text: 'Smart location autocomplete', ok: true },
      { text: 'Custom links (GitHub, portfolio, etc.)', ok: true },
      { text: 'All resume sections', ok: true },
      { text: 'Dark mode', ok: true },
      { text: 'Save to browser (localStorage)', ok: true },
      { text: 'JSON import / export', ok: true },
      { text: 'Custom template builder', ok: true },
      { text: 'Email PDF to yourself', ok: true },
      { text: 'No account required', ok: true },
      { text: '47 Pro templates', ok: false },
      { text: 'Priority support', ok: false },
      { text: 'Remove "Built with RapidResumes"', ok: false },
    ],
    cta: 'Start Building Free',
    ctaHref: '/',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$4',
    period: '/month',
    icon: Crown,
    color: '#7c3aed',
    desc: 'Premium templates and priority support.',
    features: [
      { text: 'Everything in Free', ok: true },
      { text: '47 exclusive Pro templates', ok: true },
      { text: 'Priority support', ok: true },
      { text: 'Remove "Built with RapidResumes"', ok: true },
      { text: 'Early access to new templates', ok: true },
      { text: 'Export to DOCX (coming soon)', ok: true },
    ],
    cta: 'Coming Soon',
    ctaHref: '#',
    highlight: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$19',
    period: 'one-time',
    icon: Star,
    color: '#d97706',
    desc: 'Pay once, use forever. Support indie dev.',
    features: [
      { text: 'Everything in Pro', ok: true },
      { text: 'Lifetime access to all future templates', ok: true },
      { text: 'Support a solo developer', ok: true },
      { text: 'Name in credits (optional)', ok: true },
    ],
    cta: 'Coming Soon',
    ctaHref: '#',
    highlight: false,
  },
]

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Nav */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="RapidResumes" className="w-7 h-7 rounded-lg object-contain bg-gray-900" />
            <span className="font-black text-sm tracking-tight">
              <span className="text-gray-900 dark:text-white">Rapid</span>
              <span className="text-blue-600">Resumes</span>
            </span>
          </Link>
          <div className="flex-1" />
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft size={14} /> Back to builder
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap size={12} /> Always free to start
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Simple, honest pricing
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            RapidResumes is free forever. Pro tiers are optional upgrades — we'll never put your resume behind a paywall.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TIERS.map(tier => {
            const Icon = tier.icon
            return (
              <div key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={clsx(
                  'relative bg-white dark:bg-gray-900 rounded-2xl border-2 p-6 transition-all duration-200',
                  tier.highlight
                    ? 'border-violet-500 shadow-lg shadow-violet-100 dark:shadow-violet-900/20 scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700',
                  hoveredTier === tier.id && !tier.highlight && 'shadow-md'
                )}>
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: tier.color + '18' }}>
                    <Icon size={18} style={{ color: tier.color }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">{tier.name}</h2>
                    <p className="text-xs text-gray-500">{tier.desc}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">{tier.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{tier.period}</span>
                </div>
                <a href={tier.ctaHref}
                  className={clsx(
                    'block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all mb-6',
                    tier.id === 'free'
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : tier.id === 'pro'
                      ? 'text-white cursor-not-allowed opacity-80'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-not-allowed opacity-80'
                  )}
                  style={tier.id === 'pro' ? { background: tier.color } : {}}>
                  {tier.cta}
                </a>
                <ul className="space-y-2.5">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.ok
                        ? <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                        : <X size={15} className="mt-0.5 flex-shrink-0 text-gray-300 dark:text-gray-700" />}
                      <span className={clsx('text-sm', f.ok ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600')}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Template showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 text-center">71+ Templates</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">24 free forever. 47 Pro exclusives coming soon.</p>

          <div className="grid grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"><Check size={12} className="text-white" /></div>
                <h3 className="font-bold text-gray-900 dark:text-white">Free Templates (24)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {FREE_TEMPLATES.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-lg font-medium">{t}</span>
                ))}
              </div>
            </div>
            {/* Pro */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"><Crown size={11} className="text-white" /></div>
                <h3 className="font-bold text-gray-900 dark:text-white">Pro Templates (47)</h3>
                <span className="text-xs bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRO_TEMPLATES.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded-lg font-medium">🔒 {t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'Is it really free?', a: 'Yes. 24 templates, full PDF export, all sections, no account, no watermark on free tier. Free forever.' },
              { q: 'Do you store my resume data?', a: 'No. Everything stays in your browser (localStorage). We have no server-side database of your information.' },
              { q: 'When does Pro launch?', a: "We're working on it. Drop your email in the feedback form and we'll notify you when it's ready." },
              { q: 'Can I use this commercially?', a: 'Yes — you own your resume. Use it anywhere, send it to anyone.' },
              { q: 'What payment methods will you accept?', a: 'We plan to support card payments via Stripe and potentially Cash App Pay.' },
              { q: 'Will Pro templates get watermarks on free?', a: "Pro templates will show a locked preview on Free. Your free templates always export clean — no watermarks, no strings." },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
          <Coffee size={28} className="text-yellow-500 mx-auto mb-3" />
          <h3 className="font-black text-gray-900 dark:text-white text-xl mb-2">Enjoying RapidResumes?</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-sm mx-auto">
            This is a solo-built free tool. If it helped you land an interview, a tip means the world.
          </p>
          <a href="https://cash.app/$CoComStudios" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all active:scale-95">
            <Coffee size={16} /> Tip on Cash App · $CoComStudios
          </a>
          <p className="text-xs text-gray-400 mt-3">100% optional. Deeply appreciated.</p>
        </div>
      </div>
    </div>
  )
}
