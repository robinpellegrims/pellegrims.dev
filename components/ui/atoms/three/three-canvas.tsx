import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const ThreeCanvasInner = dynamic(
  () => import('./three-canvas-inner'),
  { ssr: false }
);

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
}

export const ThreeCanvas = ({ children, className }: ThreeCanvasProps) => (
  <ThreeCanvasInner className={className}>{children}</ThreeCanvasInner>
);
