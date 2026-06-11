import {
  FunctionComponent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface FormFieldProps<InputType extends 'input' | 'textarea'> {
  label: string;
  type: InputType;
  htmlAttributes: InputType extends 'input'
    ? InputHTMLAttributes<HTMLInputElement>
    : InputType extends 'textarea'
    ? TextareaHTMLAttributes<HTMLTextAreaElement>
    : never;
}

type InputFieldProps = FormFieldProps<'input'>;
type TextAreaFieldProps = FormFieldProps<'textarea'>;

const inputClassNames =
  'w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-base leading-7 text-ink outline-none transition duration-200 ease-in-out placeholder:text-ink/30 focus:border-accent/50 focus:ring-2 focus:ring-accent/15';

export const FormField: FunctionComponent<
  InputFieldProps | TextAreaFieldProps
> = (props) => {
  const inputId = `field-${props.label}`;
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-ink/60"
      >
        {props.label}
      </label>
      {props.type === 'input' ? (
        <input
          {...props.htmlAttributes}
          id={inputId}
          className={inputClassNames}
        />
      ) : null}
      {props.type === 'textarea' ? (
        <textarea
          {...props.htmlAttributes}
          id={inputId}
          className={inputClassNames}
        />
      ) : null}
    </div>
  );
};
