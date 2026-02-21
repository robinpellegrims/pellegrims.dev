import { FunctionComponent } from 'react';
import { Button, FormField } from '@pellegrims-dev/ui/atoms';
import { contactFieldNames } from './contact-form.constants';

interface ContactFormProps {
  loading: boolean;
}

export const contactFieldsRecord: Record<
  string,
  (typeof contactFieldNames)[number]
> = {
  name: 'name',
  email: 'email',
  message: 'message',
  honey: 'a991396704f746f4ba5d4f88aa13e524',
};

export const ContactForm: FunctionComponent<ContactFormProps> = (props) => (
  <div className="mx-auto flex flex-wrap rounded-2xl border border-ink/10 bg-white/75 p-3 text-ink shadow-[0_16px_50px_-45px_rgba(31,33,38,0.95)] md:w-2/3 lg:w-1/2">
    <input className="hidden" name={contactFieldsRecord['honey']} type="text" />
    <div className="w-1/2 p-2">
      <FormField
        label="Name"
        type="input"
        htmlAttributes={{
          name: contactFieldsRecord['name'],
          required: true,
          maxLength: 100,
        }}
      />
    </div>
    <div className="w-1/2 p-2">
      <FormField
        label="Email"
        type="input"
        htmlAttributes={{
          name: contactFieldsRecord['email'],
          required: true,
          type: 'email',
          maxLength: 100,
        }}
      />
    </div>
    <div className="w-full p-2">
      <FormField
        label="Message"
        type="textarea"
        htmlAttributes={{
          name: contactFieldsRecord['message'],
          required: true,
          rows: 4,
          maxLength: 1000,
        }}
      />
    </div>
    <div className="mx-auto mt-2 w-full p-2 text-center">
      <Button text="Submit" type="primary" loading={props.loading} />
    </div>
  </div>
);
