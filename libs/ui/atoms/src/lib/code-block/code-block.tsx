import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeComponent } from 'react-markdown/src/ast-to-react';

export const CodeBlock: CodeComponent = ({ className, children, inline }) => {
  const language = className?.split('-')[1];
  return inline ? (
    <code className="rounded bg-mist/70 px-1 py-0.5 font-mono text-[0.92em] text-ink">
      {children}
    </code>
  ) : (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-ink/20 shadow-[0_18px_36px_-30px_rgba(0,0,0,0.9)]">
      <SyntaxHighlighter
        language={language}
        showLineNumbers={true}
        lineNumberStyle={{
          color: '#8e95a3',
          minWidth: '2.25em',
          paddingRight: '0.9em',
        }}
        customStyle={{
          backgroundColor: '#171a20',
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
