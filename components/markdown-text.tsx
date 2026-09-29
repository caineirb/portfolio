import React from "react";

interface MarkdownTextProps {
  content?: string;
  className?: string;
}

/**
 * Lightweight React renderer for Markdown in portfolio cards and metadata.
 * Supports bold (**text**, __text__), italics (*text*, _text_),
 * inline code (`code`), links ([text](url)), and line breaks.
 */
export default function MarkdownText({ content, className }: MarkdownTextProps) {
  if (!content) return null;

  // Split into paragraphs on double linebreaks
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className={className}>
      {paragraphs.map((para, pIdx) => (
        <p key={pIdx} className={pIdx > 0 ? "mt-2" : undefined}>
          {parseInline(para)}
        </p>
      ))}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  const regex =
    /(\*\*.*?\*\*|__.*?__|`.*?`|\[.*?\]\(.*?\)|\*(?!\s).*?(?<!\s)\*|(?<=\s|^)_[^_]+_(?=\s|$|\W)|\n)/g;

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text** or __text__
    if (
      (part.startsWith("**") && part.endsWith("**") && part.length >= 4) ||
      (part.startsWith("__") && part.endsWith("__") && part.length >= 4)
    ) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-slate-100">
          {parseInline(inner)}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-800/90 text-emerald-400 font-mono text-[11px] border border-slate-700/60"
        >
          {inner}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-green-400 hover:text-green-300 underline font-medium relative z-10"
        >
          {parseInline(linkText)}
        </a>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith("*") && part.endsWith("*") && part.length >= 2) ||
      (part.startsWith("_") && part.endsWith("_") && part.length >= 2)
    ) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-200">
          {parseInline(inner)}
        </em>
      );
    }

    // Single newline
    if (part === "\n") {
      return <br key={index} />;
    }

    return part;
  });
}
