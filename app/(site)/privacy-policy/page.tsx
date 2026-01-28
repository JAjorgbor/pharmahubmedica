import { FC } from 'react'

const PrivacyPolicyPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        Privacy Policy
      </h1>
      <p className="text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            1. Introduction
          </h2>
          <p>
            Welcome to PharmaHub Medica. We respect your privacy and are
            committed to protecting your personal data. This privacy policy will
            inform you as to how we look after your personal data when you visit
            our website, use our portal, or interact with our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            2. Information We Collect
          </h2>
          <p className="mb-2">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Identity Data:</strong> includes first name, last name,
              username or similar identifier, title.
            </li>
            <li>
              <strong>Contact Data:</strong> includes billing address, delivery
              address, email address and telephone numbers.
            </li>
            <li>
              <strong>Financial Data:</strong> includes bank account and payment
              card details.
            </li>
            <li>
              <strong>Transaction Data:</strong> includes details about payments
              to and from you and other details of products and services you
              have purchased from us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            3. How We Use Your Data
          </h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              Where we need to perform the contract we are about to enter into
              or have entered into with you.
            </li>
            <li>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>
              Where we need to comply with a legal or regulatory obligation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            4. Data Security
          </h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed. In addition, we limit access
            to your personal data to those employees, agents, contractors and
            other third parties who have a business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            5. Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at: support@pharmahubmedica.ng
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
