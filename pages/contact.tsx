import { FormContainer } from '../components/form-container';
import { contactFieldNames } from '@/components/ui/organisms/contact-form/contact-form.constants';
import { ContactForm } from '@/components/ui/organisms/contact-form/contact-form';
import { PageHero } from '@/components/ui/molecules/page-hero/page-hero';
import { PageTemplate } from '@/components/ui/templates/page/page';
import { ErrorMessage } from '@/components/ui/atoms/error-message/error-message';
import { FormSuccess } from '@/components/ui/atoms/form-success/form-success';

const title = 'Contact';

export const Contact = () => (
  <PageTemplate
    seoProps={{ title }}
    header={
      <PageHero
        eyebrow="Work Together"
        title={title}
        description="Tell me what you are building and where you need support. I reply to serious inquiries quickly."
      />
    }
  >
    <FormContainer
      actionUrl="/api/contact"
      formFieldNames={contactFieldNames}
      FormComponent={ContactForm}
      FailureComponent={ErrorMessage}
      SuccessComponent={FormSuccess}
    ></FormContainer>
  </PageTemplate>
);

export default Contact;
