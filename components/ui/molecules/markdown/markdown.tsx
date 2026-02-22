import ReactMarkdown from 'react-markdown';
import type { MarkdownDocument } from '@/lib/markdown/markdown.model';
import { CodeBlock } from '@/components/ui/atoms/code-block/code-block';
import { MarkdownImage } from '@/components/ui/atoms/markdown-image/markdown-image';

interface MarkdownProps {
  markDown: MarkdownDocument;
}

export const Markdown = ({ markDown }: MarkdownProps) => (
  <ReactMarkdown components={{ code: CodeBlock, img: MarkdownImage }}>
    {markDown.content}
  </ReactMarkdown>
);
