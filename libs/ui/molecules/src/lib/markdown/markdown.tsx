import ReactMarkdown from 'react-markdown';
import { MarkdownDocument } from '@pellegrims-dev/markdown';
import { FunctionComponent } from 'react';
import { CodeBlock, MarkdownImage } from '@pellegrims-dev/ui/atoms';

interface MarkdownProps {
  markDown: MarkdownDocument;
}

export const Markdown: FunctionComponent<MarkdownProps> = ({ markDown }) => (
  <ReactMarkdown components={{ code: CodeBlock, img: MarkdownImage }}>
    {markDown.content}
  </ReactMarkdown>
);
