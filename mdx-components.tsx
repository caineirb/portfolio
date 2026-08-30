import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        wrapper: ({ children }) => (
            <div style={{ padding: '28px 48px 14px', width: '100%', margin: '0', boxSizing: 'border-box' }}>{children}</div>
        ),
        h1: ({ children, ...props }) => (
            <h1 {...props}
                style={{
                    color: '#f8fafc',
                    fontSize: '28px',
                    lineHeight: '1.2',
                    margin: '0 0 20px',
                    fontWeight: 700,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    width: '100%',
                    display: 'block',
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                }}
            >
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 {...props} style={{
                color: '#e2e8f0',
                fontSize: '22px',
                lineHeight: '1.3',
                marginBottom: '14px',
                fontWeight: 600,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
            }}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 {...props} style={{
                color: '#cbd5e1',
                fontSize: '18px',
                lineHeight: '1.4',
                marginBottom: '12px',
                fontWeight: 600,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
            }}>
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p style={{
                color: '#d1d5db',
                fontSize: '16px',
                lineHeight: '1.7',
                marginBottom: '16px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                textAlign: 'justify'
            }}>
                {children}
            </p>
        ),
        ul: ({ children }) => (
            <ul style={{ color: '#d1d5db', margin: '0 0 16px 22px', paddingLeft: '18px', lineHeight: 1.7, listStyleType: 'disc', listStylePosition: 'outside', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</ul>
        ),
        ol: ({ children }) => (
            <ol style={{ color: '#d1d5db', margin: '0 0 16px 22px', paddingLeft: '18px', lineHeight: 1.7, listStyleType: 'decimal', listStylePosition: 'outside', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</ol>
        ),
        li: ({ children }) => (
            <li style={{ color: '#d1d5db', lineHeight: '1.7', marginBottom: '6px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</li>
        ),
        strong: ({ children }) => (
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>{children}</strong>
        ),
        em: ({ children }) => (
            <em style={{ color: '#e5e7eb', fontStyle: 'italic' }}>{children}</em>
        ),
        a: ({ children, href }) => (
            <a href={href} style={{ color: '#f8fafc', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote
                style={{
                    color: '#d1d5db',
                    borderLeft: '2px solid #475569',
                    paddingLeft: '12px',
                    margin: '16px 0',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
            >
                {children}
            </blockquote>
        ),
        img: (props) => {
            const { alt, src, ...rest } = props as { alt?: string; src?: string | { src: string };[key: string]: unknown }
            const imageSrc = typeof src === 'string' ? src : (src && typeof src === 'object' && 'src' in src ? src.src : undefined)

            // Parse optional dimensions from alt text:
            // "caption|WIDTHxHEIGHT", "caption|WIDTH", or "caption|xHEIGHT"
            const altStr = typeof alt === 'string' ? alt : ''
            const dimensionMatch = altStr.match(/^(.*?)\|(?:(\d+))?(?:x(\d+))?$/)
            const hasDimensions = dimensionMatch && (dimensionMatch[2] || dimensionMatch[3])
            const caption = hasDimensions
                ? (dimensionMatch![1].trim() || null)
                : (altStr.trim() || null)
            const imgWidth = hasDimensions && dimensionMatch![2] ? `${dimensionMatch![2]}px` : 'auto'
            const imgHeight = hasDimensions && dimensionMatch![3] ? `${dimensionMatch![3]}px` : 'auto'

            return (
                <figure style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={imageSrc}
                        alt={caption ?? ''}
                        style={{ width: imgWidth, height: imgHeight, maxWidth: '100%', borderRadius: '12px', border: '1px solid rgba(148,163,184,0.4)', display: 'block' }}
                        {...rest}
                    />
                    {caption ? (
                        <figcaption
                            style={{
                                marginTop: '10px',
                                color: '#94a3b8',
                                fontSize: '13px',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            }}
                        >
                            {caption}
                        </figcaption>
                    ) : null}
                </figure>
            )
        },
        table: ({ children }) => (
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '14px',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden',
            }}>{children}</table>
        ),
        thead: ({ children }) => (
            <thead style={{
                background: 'rgba(51, 65, 85, 0.6)',
                borderBottom: '2px solid rgba(148, 163, 184, 0.4)',
            }}>{children}</thead>
        ),
        th: ({ children }) => (
            <th style={{
                color: '#f1f5f9',
                fontWeight: 600,
                fontSize: '13px',
                textAlign: 'left',
                padding: '10px 14px',
                letterSpacing: '0.03em',
                borderRight: '1px solid rgba(148, 163, 184, 0.15)',
            }}>{children}</th>
        ),
        td: ({ children }) => (
            <td style={{
                color: '#d1d5db',
                padding: '10px 14px',
                borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                borderRight: '1px solid rgba(148, 163, 184, 0.15)',
                lineHeight: 1.6,
            }}>{children}</td>
        ),
        tr: ({ children }) => (
            <tr style={{
                transition: 'background 0.15s ease',
            }}>{children}</tr>
        ),
        ...components,
    }
}