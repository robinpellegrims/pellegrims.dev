import ReactMarkdown from 'react-markdown';
import { MarkdownDocument } from '@pellegrims-dev/markdown';
import { CodeBlock, MarkdownImage } from '@pellegrims-dev/ui/atoms';

interface MarkdownProps {
  markDown: MarkdownDocument;
}

export const Markdown = ({ markDown }: MarkdownProps) => (
  <ReactMarkdown components={{ code: CodeBlock, img: MarkdownImage }}>
    {markDown.content}
  </ReactMarkdown>
);
