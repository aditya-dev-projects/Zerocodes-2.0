
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface CodeEditorProps {
  code: string;
  onChange?: (newCode: string) => void;
  language: Language;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language, readOnly = false }) => {
  const [lines, setLines] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const lineCount = code.split('\n').length;
    setLines(lineCount);
  }, [code]);

  // Sync scrolling between textarea (top) and pre (bottom)
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      onChange?.(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // --- Simple Regex-based Syntax Highlighting ---
  const highlightSyntax = (input: string, lang: Language): string => {
    let html = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1. Strings (Double and Single quotes) - Color: Orange/Brown
    // We replace them with placeholders first to avoid matching keywords inside strings
    const strings: string[] = [];
    html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      strings.push(match);
      return `__STR_${strings.length - 1}__`;
    });

    // 2. Comments - Color: Green
    const comments: string[] = [];
    const commentRegex = lang === Language.PYTHON ? /(#.*$)/gm : /(\/\/.*$)/gm;
    html = html.replace(commentRegex, (match) => {
      comments.push(match);
      return `__COM_${comments.length - 1}__`;
    });

    // 3. Keywords & Syntax
    if (lang === Language.C || lang === Language.JAVA) {
      // Types & Keywords (Blue/Pink)
      html = html.replace(/\b(int|float|double|char|void|bool|long|short|signed|unsigned|struct|enum|union|const|static|volatile|extern|register|auto|class|public|private|protected|import|package|new|this|super|interface|implements|extends|final)\b/g, '<span class="text-[#569cd6] font-bold">$1</span>');
      // Control Flow (Purple)
      html = html.replace(/\b(if|else|for|while|do|break|continue|switch|case|default|return|try|catch|throw|throws|finally)\b/g, '<span class="text-[#c586c0]">$1</span>');
      // Libraries/Includes
      html = html.replace(/(#include)/g, '<span class="text-[#c586c0]">$1</span>');
      html = html.replace(/(&lt;.*?&gt;)/g, '<span class="text-[#ce9178]">$1</span>');
    } else if (lang === Language.PYTHON) {
      // Keywords (Blue/Purple)
      html = html.replace(/\b(def|class|lambda|None|True|False|and|or|not|is|in)\b/g, '<span class="text-[#569cd6] font-bold">$1</span>');
      html = html.replace(/\b(if|elif|else|while|for|try|except|finally|break|continue|return|import|from|as|pass|with|raise|global|assert)\b/g, '<span class="text-[#c586c0]">$1</span>');
      // Built-ins (Yellow)
      html = html.replace(/\b(print|input|len|range|int|str|float|list|dict|set|tuple|open)\b/g, '<span class="text-[#dcdcaa]">$1</span>');
    }

    // 4. Functions (Yellow) - match word followed by (
    html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g, '<span class="text-[#dcdcaa]">$1</span>');

    // 5. Numbers (Light Green)
    html = html.replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>');

    // Restore Comments (Green)
    html = html.replace(/__COM_(\d+)__/g, (_, id) => {
      return `<span class="text-[#6a9955] italic">${comments[parseInt(id)]}</span>`;
    });

    // Restore Strings (Orange)
    html = html.replace(/__STR_(\d+)__/g, (_, id) => {
      return `<span class="text-[#ce9178]">${strings[parseInt(id)]}</span>`;
    });

    return html;
  };

  return (
    <div className="relative flex h-full w-full bg-[#1e1e1e] font-mono text-sm overflow-hidden">
      {/* Line Numbers */}
      <div className="hidden sm:block w-12 flex-shrink-0 bg-[#1e1e1e] border-r border-[#2b2b2b] text-right pr-3 pt-4 text-[#858585] select-none font-mono leading-6">
        {Array.from({ length: Math.max(lines, 20) }).map((_, i) => (
          <div key={i} className="h-6">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor Container */}
      <div className="relative flex-1 h-full overflow-hidden">
        
        {/* Layer 1: Syntax Highlighted Output (Behind) */}
        {/* Pointer events none allows clicking "through" to the textarea */}
        <pre 
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full p-4 m-0 font-mono text-[13px] leading-6 whitespace-pre pointer-events-none font-normal"
          style={{ tabSize: 4 }}
        >
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }} />
        </pre>

        {/* Layer 2: Editable Textarea (Front) */}
        {/* Text is transparent, but caret and selection are visible */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          readOnly={readOnly}
          className={`absolute inset-0 w-full h-full p-4 m-0 bg-transparent border-none outline-none resize-none font-mono text-[13px] leading-6 whitespace-pre text-transparent caret-white ${readOnly ? 'cursor-default' : 'cursor-text'}`}
          style={{ tabSize: 4 }}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
