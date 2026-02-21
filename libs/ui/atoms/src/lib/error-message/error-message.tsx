import { FunctionComponent } from 'react';

interface ErrorMessageProps {
  errorMessage?: string;
}

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  errorMessage,
}) => (
  <div className="mx-auto mt-4 max-w-xl rounded-xl border border-red-300/60 bg-red-50/70 px-4 py-3 text-center text-red-700">
    Something went wrong, try again later.
    {errorMessage ? <div className="mt-1 text-sm">({errorMessage})</div> : null}
  </div>
);
