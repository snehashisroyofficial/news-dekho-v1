import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We’re always happy to hear from you! Whether you have a question,
        feedback, or just want to connect, feel free to reach out to us. At News
        Prime Times, we value your input and are committed to providing the best
        possible experience for our audience.
      </p>

      <h2 className="text-2xl font-bold mb-4">How to Reach Us</h2>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Email:</strong> For general inquiries, feedback, or if you
          have any questions, you can email us at{" "}
          <a
            href="mailto:newsprimetimesportal@gmail.com"
            className="text-blue-500 underline"
          >
            newsprimetimesportal@gmail.com
          </a>
          . We aim to respond as quickly as possible and appreciate your
          patience.
        </li>
        <li className="mb-2">
          <strong>Phone:</strong> You can also reach us directly by phone at{" "}
          <a href="tel:+918649863534" className="text-blue-500 underline">
            +91 86498 63534
          </a>
          . If we’re unavailable, please leave a message, and we’ll get back to
          you as soon as possible.
        </li>
        <li className="mb-2">
          <strong>Social Media:</strong> We’re active on various social media
          platforms! You can reach out to us on:
        </li>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Facebook:{" "}
            <a
              href="https://facebook.com/newsprimetimes"
              className="text-blue-500 underline"
            >
              News Prime Times
            </a>
          </li>
          <li className="mb-2">
            Instagram:{" "}
            <a
              href="https://instagram.com/newsprimetimes"
              className="text-blue-500 underline"
            >
              @newsprimetimes
            </a>
          </li>
          <li className="mb-2">
            Twitter (X):{" "}
            <a
              href="https://twitter.com/newsprimetimes"
              className="text-blue-500 underline"
            >
              @newsprimetimes
            </a>
          </li>
          <li className="mb-2">
            WhatsApp Channel:{" "}
            <a
              href="https://wa.me/8649863534"
              className="text-blue-500 underline"
            >
              link
            </a>
          </li>
          <li className="mb-2">
            YouTube:{" "}
            <a
              href="https://youtube.com/newsprimetimes"
              className="text-blue-500 underline"
            >
              News Prime Times Channel
            </a>
          </li>
        </ul>
      </ul>
      <p>
        Feel free to follow us, share your thoughts, and stay updated with the
        latest news and content from us!
      </p>

      <h2 className="text-2xl font-bold mb-4">Office Address</h2>
      <p className="mb-4">
        If you'd like to visit or send us mail, here's our physical address:
      </p>
      <p className="mb-4">
        Sudipta Das
        <br />
        Kandi Gopinathpur, PO - Kandi, PS - Kandi, District- Murshidabad, Pin
        -742137, State - West Bengal, Country - INDIA
      </p>

      <h2 className="text-2xl font-bold mb-4">Business Inquiries</h2>
      <p className="mb-4">
        For partnership opportunities, advertising inquiries, or collaborations,
        please reach out to us via email at{" "}
        <a
          href="mailto:newsprimetimesportal@gmail.com"
          className="text-blue-500 underline"
        >
          newsprimetimesportal@gmail.com
        </a>
        . We are always open to exploring new business relationships that align
        with our mission and values.
      </p>

      <h2 className="text-2xl font-bold mb-4">Press & Media Relations</h2>
      <p className="mb-4">
        For press inquiries, media requests, or interview opportunities, please
        email our media team at{" "}
        <a
          href="mailto:newsprimetimesportal@gmail.com"
          className="text-blue-500 underline"
        >
          newsprimetimesportal@gmail.com
        </a>
        . We’ll respond as quickly as possible.
      </p>

      <h2 className="text-2xl font-bold mb-4">Support</h2>
      <p className="mb-4">
        If you're experiencing any issues with our website or need assistance
        with accessing content, please don’t hesitate to contact us. Our team is
        here to help and ensure your experience is smooth and enjoyable.
      </p>

      <h2 className="text-2xl font-bold mb-4">Feedback & Suggestions</h2>
      <p className="mb-4">
        We value your opinions! If you have any feedback or suggestions on how
        we can improve, please let us know. Your input helps us serve you
        better, and we appreciate your contribution in making News Prime Times a
        better platform for everyone.
      </p>

      <p className="mb-4">
        Thank you for being a part of News Prime Times. We look forward to
        connecting with you!
      </p>
    </div>
  );
};
export default ContactUs;
