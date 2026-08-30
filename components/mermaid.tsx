'use client'

import React from 'react'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#0f172a',
    primaryColor: '#3b82f6',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#475569',
    lineColor: '#94a3b8',
    secondaryColor: '#1e293b',
    tertiaryColor: '#1e293b',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '14px',
  },
})

let idCounter = 0

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = `mermaid-${Date.now()}-${idCounter++}`

    const render = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim())
        setSvg(renderedSvg)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render diagram')
      }
    }

    render()
  }, [chart])

  if (error) {
    return (
      <pre
        style={{
          color: '#f87171',
          background: 'rgba(248,113,113,0.1)',
          border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '13px',
          whiteSpace: 'pre-wrap',
        }}
      >
        Mermaid Error: {error}
      </pre>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        margin: '24px 0',
        padding: '24px',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
