import React from "react";

import TeamSection from "@/app/components/shared/Footer/TeamSection";

const EditorialTeam: React.FC = () => {
  return (
    <div className="p-8 ">
      <h1 className="text-4xl font-bold mb-4">Our Editorial Team</h1>
      <p className="mb-4">
        At News Prime Times, we are a small but passionate editorial team,
        dedicated to delivering high-quality, reliable news and content. We
        focus on providing accurate information to our audience while
        maintaining transparency and integrity. Despite being a small team, we
        believe in the power of quality journalism and aim to create content
        that informs, educates, and inspires.
      </p>

      <TeamSection />

      <h2 className="text-2xl font-semibold mb-4">Our Editorial Philosophy</h2>
      <p className="mb-4">
        As a small but committed team, we take pride in producing content that
        is honest, unbiased, and valuable. We strive to maintain a
        human-friendly tone in all of our communications, creating an engaging
        space where readers can stay informed and inspired. While we may be a
        small team, our dedication to quality and truth is what sets us apart,
        and we’re always looking for ways to improve and serve you better. Thank
        you for being a part of News Prime Times. We’re excited to keep bringing
        you the latest updates and stories that matter most.
      </p>

      <p>
        Thank you for being a part of News Prime Times. We’re excited to keep
        bringing you the latest updates and stories that matter most.
      </p>
    </div>
  );
};

export default EditorialTeam;
