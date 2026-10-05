import { remark } from 'remark';
import externalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import { Visitor } from 'unist-util-visit/complex-types';

export const markdownToHtml = (
  markdown: string,
  absolutePath: string,
): string => {
  const processor = remark()
    .use(fixImages, { absolutePath })
    .use(remarkRehype)
    .use(externalLinks, { target: '_blank', rel: ['noreferrer'] })
    .use(rehypeStringify)
    .freeze();

  return processor.processSync(markdown).toString();
};

type UnistNode = Parameters<typeof visit>[0];

const hasUrlProperty = (node: UnistNode): node is UnistNode & { url: string } =>
  'url' in node;

const fixImages = (options?: { absolutePath: string }) => {
  const visitor: Visitor = (node) => {
    if (hasUrlProperty(node)) {
      // Sanitize URL by removing leading `/`
      const relativeUrl = node.url.replace(/^\//, '');
      node.url = new URL(relativeUrl, options?.absolutePath).href;
    }
  };

  return (tree: UnistNode) => {
    if (options?.absolutePath) {
      visit(tree, 'image', visitor);
    } else {
      throw Error('Missing required `absolutePath` option.');
    }
  };
};
