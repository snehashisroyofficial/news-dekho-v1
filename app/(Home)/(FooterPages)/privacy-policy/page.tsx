import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At News Prime Times, we value your privacy and are committed to
        protecting the personal information you share with us. This Privacy
        Policy explains how we collect, use, and safeguard your data when you
        interact with our website and digital media platforms. By using our
        services, you agree to the terms outlined in this policy.
      </p>

      <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
      <p className="mb-4">We collect two types of information:</p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Personal Information:</strong> When you visit our website or
          interact with our channels (Facebook, Instagram, X, YouTube), we may
          ask you to provide personal details such as your name, email address,
          and contact information, especially when you subscribe, sign up for
          newsletters, or reach out for inquiries.
        </li>
        <li className="mb-2">
          <strong>Non-Personal Information:</strong> We also collect
          non-personal data such as browser type, device information, IP
          address, and user activity on our website and platforms. This helps us
          improve our content, site functionality, and user experience.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>To Provide Services:</strong> To deliver the content,
          newsletters, and services you request, such as updates on news,
          sports, entertainment, and more.
        </li>
        <li className="mb-2">
          <strong>To Improve Our Services:</strong> We analyze non-personal
          information to enhance the user experience, improve website
          performance, and offer relevant content.
        </li>
        <li className="mb-2">
          <strong>To Communicate with You:</strong> We may use your contact
          information to respond to your inquiries, provide customer support, or
          inform you about new features, promotions, or content.
        </li>
        <li className="mb-2">
          <strong>To Personalize Your Experience:</strong> By collecting
          preferences and usage data, we aim to provide content that matters
          most to you.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
      <p className="mb-4">
        We respect your privacy and do not sell, rent, or trade your personal
        information to third parties. However, we may share your information in
        the following cases:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>With Service Providers:</strong> We work with trusted
          third-party partners to help run our website and services (like
          analytics or advertising platforms). These partners may have access to
          your information but are obligated to use it only for specified
          purposes and in compliance with our privacy standards.
        </li>
        <li className="mb-2">
          <strong>Legal Requirements:</strong> If required by law or to protect
          our rights, we may disclose your information to comply with legal
          processes or enforce our policies.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        4. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">
        Our website and digital platforms may use cookies and similar tracking
        technologies to enhance your browsing experience. Cookies are small
        files that are stored on your device to remember your preferences and
        help us understand how you interact with our site. You can adjust your
        browser settings to manage or block cookies, but please note that doing
        so may affect your user experience.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction. However,
        please understand that no method of transmission over the internet or
        electronic storage is 100% secure. While we strive to protect your data,
        we cannot guarantee complete security.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Access:</strong> Request a copy of the personal information we
          hold about you.
        </li>
        <li className="mb-2">
          <strong>Update:</strong> Request corrections to your information if
          it’s inaccurate or incomplete.
        </li>
        <li className="mb-2">
          <strong>Delete:</strong> Request that we delete your personal
          information, subject to legal and operational requirements.
        </li>
        <li className="mb-2">
          <strong>Opt-Out:</strong> Unsubscribe from our newsletters or
          promotional communications at any time by clicking the "unsubscribe"
          link in the email.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
      <p className="mb-4">
        Our website and digital channels may contain links to third-party
        websites and services. These websites have their own privacy policies,
        and we recommend you review them before sharing any personal
        information. We are not responsible for the content or privacy practices
        of third-party sites.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        8. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time to reflect changes in
        our practices, technology, or legal requirements. When we make changes,
        we will update the "Last Updated" date at the bottom of this page. We
        encourage you to review this policy periodically for any updates.
      </p>

      <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about our Privacy Policy or how we
        handle your information, please don’t hesitate to contact us:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:newsprimetimesportal@gmail.com"
            className="text-blue-500 underline"
          >
            newsprimetimesportal@gmail.com
          </a>
        </li>
        <li className="mb-2">
          <strong>Phone:</strong>{" "}
          <a href="tel:+918649863534" className="text-blue-500 underline">
            +91 86498 63534
          </a>
        </li>
      </ul>

      <p className="mb-4">
        Thank you for trusting News Prime Times. We are committed to providing a
        safe and enjoyable experience for you!
      </p>
    </div>
  );
};

export default PrivacyPolicy;
