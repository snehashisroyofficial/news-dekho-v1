import React from "react";

const AdvertiseWithUs: React.FC = () => {
  return (
    <div className="p-8  ">
      <h1 className="text-4xl font-bold mb-4">Advertise With Us</h1>
      <p className="mb-4">
        At News Prime Times, we offer a unique opportunity for brands,
        businesses, and organizations to reach a vast and engaged audience
        across our digital media platforms. With our diverse content, ranging
        from news and entertainment to sports and education, we provide an ideal
        space for your brand to connect with viewers who are passionate,
        informed, and eager to discover new products and services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Why Advertise With Us?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Wide Reach:</strong> Our channels are available on Facebook,
          Instagram, X (formerly Twitter), and YouTube, allowing us to reach a
          broad and diverse audience.
        </li>
        <li>
          <strong>Targeted Audience:</strong> Whether you're targeting news
          enthusiasts, sports fans, or people interested in culture and
          education, we have channels tailored to specific interests.
        </li>
        <li>
          <strong>Engaged Viewers:</strong> Our content is designed to engage
          and inform, ensuring that your brand is seen by viewers who are
          actively involved in the topics we cover.
        </li>
        <li>
          <strong>Creative Ad Solutions:</strong> From video ads and sponsored
          content to banner placements and social media promotions, we offer a
          variety of ad formats to suit your needs.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Our Platforms Include:</h2>
      <ul className="list-decimal list-inside mb-4">
        <li>
          News Prime Times – Breaking news, current affairs, and global updates.
        </li>
        <li>
          Bangla Digital TV – Latest news, entertainment, and cultural content
          in Bengali.
        </li>
        <li>Nirvik Barta – Bengali news updates and discussions.</li>
        <li>
          Sportive Duniya – Hindi sports news, match updates, and analysis.
        </li>
        <li>
          Debloker Pothe – Exploring Hindu mythology and spiritual content.
        </li>
        <li>Ajanar Deshe – Fact-based videos and educational content.</li>
        <li>SDF Bangla – Short films showcasing creative independent works.</li>
        <li>
          SDF Bangla Music – Music from short films and original compositions.
        </li>
        <li>
          SDF Bangla Uncut – Uncut versions of short films for true film
          enthusiasts.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">How to Advertise</h2>
      <p className="mb-4">
        Advertising with us is simple! Just reach out to us via the contact
        details below, and our team will help you create an advertising plan
        that aligns with your goals. Whether you're looking for a one-time
        campaign or a long-term partnership, we are here to help.
      </p>

      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">
          Contact Information for Advertising:
        </h3>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:newsprimetimesportal@gmail.com"
            className="text-blue-600 hover:underline"
          >
            newsprimetimesportal@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong> +91 86498 63534
        </p>
      </div>

      <p className="mt-4">
        We look forward to working with you and helping your brand reach new
        heights through our engaging and diverse digital media platforms!
      </p>
    </div>
  );
};

export default AdvertiseWithUs;
