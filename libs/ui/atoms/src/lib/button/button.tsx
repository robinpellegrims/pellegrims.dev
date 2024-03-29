import { FunctionComponent } from 'react';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

type ButtonType = 'primary' | 'secondary';

const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    'text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-500',
  secondary:
    'text-dark-700 bg-gray-100 hover:bg-gray-200 ml-4 disabled:text-dark-600',
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
    className={`inline-flex rounded border-0 py-2 px-6 text-lg focus:outline-none disabled:cursor-not-allowed ${buttonTypeClasses[type]}`}
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
