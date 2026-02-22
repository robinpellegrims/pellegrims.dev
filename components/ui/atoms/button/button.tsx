import { FunctionComponent } from 'react';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

type ButtonType = 'primary' | 'secondary';

const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    'bg-ink text-canvas shadow-[0_10px_35px_-18px_rgba(31,33,38,0.85)] hover:-translate-y-0.5 hover:bg-ink/90 disabled:bg-ink/70',
  secondary:
    'ml-4 border border-ink/25 bg-white/75 text-ink hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent disabled:text-ink/60',
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
    className={`inline-flex items-center gap-2 rounded-full border-0 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition focus:outline-none disabled:cursor-not-allowed ${buttonTypeClasses[type]}`}
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
