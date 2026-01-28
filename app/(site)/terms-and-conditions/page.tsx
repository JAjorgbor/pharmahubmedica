import { FC } from 'react'
import Link from 'next/link'

const TermsAndConditionsPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        Terms and Conditions
      </h1>
      <p className="text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            1. Agreement to Terms
          </h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement
            made between you, whether personally or on behalf of an entity
            (“you”) and PharmaHub Medica (“we,” “us” or “our”), concerning your
            access to and use of the PharmaHub Medica website and portal. By
            accessing the Site, you acknowledge that you have read, understood,
            and agree to be bound by all of these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            2. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the “Content”) and the trademarks, service marks, and
            logos contained therein (the “Marks”) are owned or controlled by us
            or licensed to us, and are protected by copyright and trademark
            laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            3. User Representations
          </h2>
          <p className="mb-2">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              All registration information you submit will be true, accurate,
              current, and complete.
            </li>
            <li>
              You will maintain the accuracy of such information and promptly
              update such registration information as necessary.
            </li>
            <li>
              You have the legal capacity and you agree to comply with these
              Terms and Conditions.
            </li>
            <li>
              You are not a minor in the jurisdiction in which you reside.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            4. Products and Services
          </h2>
          <p>
            We make every effort to display as accurately as possible the
            colors, features, specifications, and details of the products
            available on the Site. However, we do not guarantee that the colors,
            features, specifications, and details of the products will be
            accurate, complete, reliable, current, or free of other errors, and
            your electronic display may not accurately reflect the actual colors
            and details of the products.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            5. Limitation of Liability
          </h2>
          <p>
            In no event will we or our directors, employees, or agents be liable
            to you or any third party for any direct, indirect, consequential,
            exemplary, incidental, special, or punitive damages, including lost
            profit, lost revenue, loss of data, or other damages arising from
            your use of the site, even if we have been advised of the
            possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            6. Contact Us
          </h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us at:
            support@pharmahubmedica.ng
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
