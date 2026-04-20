'use client'
import { ResumeData, TemplateId, TemplateSettings, CustomTemplate, PAPER_SIZES } from '@/utils/types'
import ClassicTemplate from '@/templates/ClassicTemplate'
import ExecutiveTemplate from '@/templates/ExecutiveTemplate'
import NeonTemplate from '@/templates/NeonTemplate'
import SlateTemplate from '@/templates/SlateTemplate'
import ColumnsTemplate from '@/templates/ColumnsTemplate'
import TimelineTemplate from '@/templates/TimelineTemplate'
import BoldTemplate from '@/templates/BoldTemplate'
import ElegantTemplate from '@/templates/ElegantTemplate'
import CompactTemplate from '@/templates/CompactTemplate'
import TribuneTemplate from '@/templates/TribuneTemplate'
import CarbonTemplate from '@/templates/CarbonTemplate'
import ApexTemplate from '@/templates/ApexTemplate'
import MonoTemplate from '@/templates/MonoTemplate'
import CustomBlockRenderer from './CustomBlockRenderer'

interface Props {
  data: ResumeData
  templateId: TemplateId
  settings: TemplateSettings
  customTemplates: CustomTemplate[]
}

export default function ResumeRenderer({ data, templateId, settings, customTemplates }: Props) {
  const paper = PAPER_SIZES[settings.paperSize]
  const scale = settings.scale || 1
  const ox = settings.offsetX || 0
  const oy = settings.offsetY || 0

  const safeData = ensureCustomLinks(data)
  const processedData = settings.showEmojis ? safeData : stripEmojis(safeData)
  const props = { data: processedData, settings }

  let content: React.ReactNode
  const customTpl = customTemplates.find(c => c.id === templateId)

  if (customTpl) {
    content = <CustomBlockRenderer data={processedData} settings={settings} template={customTpl} />
  } else {
    switch (templateId) {
      case 'classic':   content = <ClassicTemplate   {...props} />; break
      case 'executive': content = <ExecutiveTemplate {...props} />; break
      case 'neon':      content = <NeonTemplate      {...props} />; break
      case 'slate':     content = <SlateTemplate     {...props} />; break
      case 'columns':   content = <ColumnsTemplate   {...props} />; break
      case 'timeline':  content = <TimelineTemplate  {...props} />; break
      case 'bold':      content = <BoldTemplate      {...props} />; break
      case 'elegant':   content = <ElegantTemplate   {...props} />; break
      case 'compact':   content = <CompactTemplate   {...props} />; break
      case 'tribune':   content = <TribuneTemplate   {...props} />; break
      case 'carbon':    content = <CarbonTemplate    {...props} />; break
      case 'apex':      content = <ApexTemplate      {...props} />; break
      case 'mono':      content = <MonoTemplate      {...props} />; break
      default:          content = <ClassicTemplate   {...props} />
    }
  }

  return (
    <div
      id="resume-preview"
      style={{
        width: paper.width,
        minHeight: paper.height,
        background: '#fff',
        transform: `scale(${scale}) translate(${ox}px, ${oy}px)`,
        transformOrigin: 'top left',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {content}
    </div>
  )
}

function ensureCustomLinks(data: ResumeData): ResumeData {
  return { ...data, customLinks: data.customLinks || [] }
}

function stripEmojis(data: ResumeData): ResumeData {
  // Safe emoji removal — no /u flag, works on all TS targets
  const clean = (s: string): string => {
    let result = ''
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i)
      // Skip surrogate pairs (emoji above U+FFFF)
      if (code >= 0xD800 && code <= 0xDBFF) {
        i++ // skip the low surrogate too
        continue
      }
      // Skip common symbol blocks
      if (code >= 0x2600 && code <= 0x27BF) continue
      // Skip specific chars
      if (s[i] === '\u260E' || s[i] === '\u2709' || s[i] === '\u2605' ||
          s[i] === '\u2713' || s[i] === '\u25C6') continue
      result += s[i]
    }
    return result.trim()
  }

  return {
    ...data,
    personal: {
      ...data.personal,
      name: clean(data.personal.name),
      title: clean(data.personal.title),
      summary: clean(data.personal.summary),
    },
    experience: data.experience.map(e => ({
      ...e,
      description: clean(e.description),
      achievements: e.achievements.map(clean),
    })),
    education: data.education.map(e => ({ ...e, honors: clean(e.honors) })),
    achievements: data.achievements.map(a => ({
      ...a,
      title: clean(a.title),
      description: clean(a.description),
    })),
  }
}
