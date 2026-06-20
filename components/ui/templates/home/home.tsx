import { FunctionComponent, ReactElement } from 'react';
import { ThreeCanvas } from '@/components/ui/atoms/three/three-canvas';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(
  () => import('@/components/ui/atoms/three/particle-field').then((mod) => mod.ParticleField),
  { ssr: false }
);

interface HomeTemplateProps {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

export const HomeTemplate: FunctionComponent<HomeTemplateProps> = ({
  header,
  content,
  footer,
}) => (
  <div className="relative min-h-screen overflow-hidden bg-canvas text-ink">
    {/* Three.js particle background */}
    <div className="pointer-events-none fixed inset-0 z-0">
      <ThreeCanvas className="h-full w-full">
        <ParticleField />
      </ThreeCanvas>
    </div>
    {/* Subtle gradient overlays for depth */}
    <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(201,145,60,0.06),transparent_50%)]" />
    <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,20,25,0.8),transparent_60%)]" />
    {/* Content */}
    <div className="relative z-10 flex min-h-screen flex-col">
      {header}
      <main className="flex flex-auto flex-col justify-center py-6 sm:py-14">
        {content}
      </main>
      {footer}
    </div>
  </div>
);
