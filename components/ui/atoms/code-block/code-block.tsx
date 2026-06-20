import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeComponent } from 'react-markdown/src/ast-to-react';

export const CodeBlock: CodeComponent = ({ className, children, inline }) => {
  const language = className?.split('-')[1];
  return inline ? (
    <code className="rounded bg-surface-bright px-1 py-0.5 font-mono text-[0.92em] text-ink">
      {children}
    </code>
  ) : (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/[0.06] shadow-[0_18px_36px_-20px_rgba(201,145,60,0.1)]">
      <SyntaxHighlighter
        language={language}
        showLineNumbers={true}
        lineNumberStyle={{
          color: '#8e95a3',
          minWidth: '2.25em',
          paddingRight: '0.9em',
        }}
        customStyle={{
          backgroundColor: '#141419',
          margin: 0,
          padding: '1rem 1.1rem',
          fontSize: '0.95rem',
          lineHeight: '1.6',
        }}
        style={darcula}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
