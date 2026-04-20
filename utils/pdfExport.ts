'use client'
import { PAPER_SIZES } from './types'

export async function exportToPDF(
  elementId: string,
  filename = 'resume',
  paperSize: 'a4' | 'letter' | 'legal' = 'letter'
) {
  const html2canvas = (await import('html2canvas')).default
  const { jsPDF } = await import('jspdf')
  const el = document.getElementById(elementId)
  if (!el) return

  const paper = PAPER_SIZES[paperSize]
  const mmW = paper.mmW
  const mmH = paper.mmH

  // Render at 3x for sharpness
  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: el.scrollWidth,
    height: el.scrollHeight,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
  })

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [mmW, mmH] })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  const canvasW = canvas.width
  const canvasH = canvas.height
  const ratio = pageW / canvasW  // fill width exactly
  const imgH = canvasH * ratio

  let y = 0
  let remaining = imgH

  while (remaining > 0) {
    const sliceH = Math.min(remaining, pageH)
    const srcY = (imgH - remaining) / ratio
    const srcH = sliceH / ratio

    // Create a slice canvas
    const slice = document.createElement('canvas')
    slice.width = canvasW
    slice.height = Math.round(srcH)
    const ctx = slice.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, slice.width, slice.height)
    ctx.drawImage(canvas, 0, -Math.round(srcY))

    const imgData = slice.toDataURL('image/jpeg', 0.97)
    if (y > 0) pdf.addPage([mmW, mmH])
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, sliceH)
    remaining -= pageH
  }

  pdf.save(`${filename}.pdf`)
}

export function exportToJSON(data: object, filename = 'resume') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `${filename}.json`
  a.click(); URL.revokeObjectURL(url)
}

export function importFromJSON(file: File): Promise<unknown> {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = (e) => { try { res(JSON.parse(e.target?.result as string)) } catch { rej(new Error('Invalid JSON')) } }
    r.onerror = () => rej(new Error('Read failed'))
    r.readAsText(file)
  })
}
