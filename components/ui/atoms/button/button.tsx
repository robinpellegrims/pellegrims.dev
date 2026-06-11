import { FunctionComponent } from 'react';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

type ButtonType = 'primary' | 'secondary';

const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    'relative z-10 bg-gradient-to-b from-accent to-[#b07a2c] text-canvas shadow-[0_2px_10px_-2px_rgba(201,145,60,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:from-accent-bright hover:to-accent disabled:opacity-70',
  secondary:
    'border border-white/[0.08] bg-surface/50 text-ink/80 backdrop-blur-md hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface hover:text-accent disabled:opacity-60',
};

interface ButtonProps {
  type: ButtonType;
  text: string;
  loading?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  loading,
  type,
  text,
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-full border-0 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] transition duration-300 focus:outline-none disabled:cursor-not-allowed ${buttonTypeClasses[type]}`}
    disabled={loading}
  >
    {loading ? (
      <div className="mt-1">
        <LoadingSpinner />
      </div>
    ) : null}
    {text}
  </button>
);
