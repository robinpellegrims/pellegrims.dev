declare module '*.svg' {
  const svgContent: unknown;
  export const ReactComponent: unknown;
  export default svgContent;
}

declare module 'react-syntax-highlighter/dist/cjs/prism-async' {
  import { PrismAsync } from 'react-syntax-highlighter';
  export default PrismAsync;
}
