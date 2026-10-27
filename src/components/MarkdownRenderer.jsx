import React, { useMemo } from 'react';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true
});

/**
 * MarkdownRenderer component
 * Parses and renders Markdown text into semantic HTML, preventing raw
 * formatting artifacts like **, unrendered tables, and backticks.
 */
export default function MarkdownRenderer({ content = '', className = '' }) {
  const html = useMemo(() => {
    if (!content || typeof content !== 'string') return '';
    try {
      let parsed = marked.parse(content);
      // Enhance tables with responsive container class
      parsed = parsed.replace(/<table>/g, '<div class="table-container"><table class="markdown-table">');
      parsed = parsed.replace(/<\/table>/g, '</table></div>');
      // Enhance blockquotes with callout class
      parsed = parsed.replace(/<blockquote>/g, '<blockquote class="markdown-callout">');
      return parsed;
    } catch (e) {
      console.error('[MarkdownRenderer] Error parsing markdown:', e);
      return content;
    }
  }, [content]);

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
