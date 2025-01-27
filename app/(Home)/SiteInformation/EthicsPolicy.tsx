import React, { useEffect } from "react";

const EthicsPolicy: React.FC = () => {
  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Ethics Policy</h1>

      <p className="mb-4">
        At News Prime Times, we are dedicated to providing trustworthy,
        responsible, and ethical journalism. We believe in the power of
        information to inform, educate, and empower our audience, and with this
        responsibility comes a commitment to uphold the highest standards of
        integrity in every aspect of our work.
      </p>

      <p className="mb-4">
        Our Ethics Policy outlines the principles and practices that guide our
        editorial decisions, ensuring that we remain transparent, fair, and
        accountable in all that we do.
      </p>

      <h2 className="text-2xl font-bold mb-4">1. Commitment to Accuracy</h2>
      <p className="mb-4">
        We are committed to presenting news and information that is accurate,
        factual, and well-researched. Our editorial team works diligently to
        verify the facts before publication, ensuring that every story, update,
        or report we share is supported by reliable sources. When errors occur,
        we correct them promptly and transparently, as outlined in our
        Correction Policy.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        2. Independence and Impartiality
      </h2>
      <p className="mb-4">
        As a news organization, we strive to maintain independence and
        objectivity in all our reporting. We do not allow personal biases,
        commercial pressures, or outside influences to affect our editorial
        decisions.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Editorial Independence:</strong> We make editorial decisions
          based solely on the facts and the public interest. Our content is
          never influenced by external parties, and we maintain a clear
          distinction between advertising and editorial content.
        </li>
        <li className="mb-2">
          <strong>Balanced Reporting:</strong> We aim to present multiple
          perspectives on any issue, providing our audience with a fair and
          balanced view. We are committed to offering a diversity of viewpoints
          and giving voice to all relevant sides of a story.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">3. Integrity and Transparency</h2>
      <p className="mb-4">
        Integrity is at the core of our work. We strive for transparency in
        everything we publish, ensuring that our audience is always informed
        about how we gather, interpret, and present information.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Clear Attribution:</strong> We provide proper attribution for
          all sources, whether they are quotes, statistics, or other forms of
          information. We avoid using anonymous sources unless absolutely
          necessary and when their credibility can be verified.
        </li>
        <li className="mb-2">
          <strong>Disclosure of Conflicts of Interest:</strong> We are committed
          to full disclosure when there are any potential conflicts of interest.
          If a member of our editorial team or a contributor has any financial
          or personal interest in a topic, we will openly disclose it to our
          audience.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">4. Respect for Privacy</h2>
      <p className="mb-4">
        We respect the privacy of individuals and organizations. We only
        collect, use, and share personal data in accordance with our Privacy
        Policy, ensuring that we comply with all applicable laws and regulations
        regarding data protection.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Respect for Individuals:</strong> We avoid sensationalizing
          personal information or invading privacy without a legitimate public
          interest. We are mindful of the potential impact our reporting may
          have on people’s lives and always consider the ethical implications of
          publishing personal details.
        </li>
        <li className="mb-2">
          <strong>Informed Consent:</strong> If we collect personal data from
          individuals, we will always inform them of how their data will be used
          and ensure that they consent to its collection.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">5. Fairness and Avoiding Bias</h2>
      <p className="mb-4">
        We are dedicated to providing news and information that is fair,
        unbiased, and free from prejudice. We understand that our reporting can
        shape public opinion, and we take this responsibility seriously.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Objective Reporting:</strong> We focus on providing facts
          without inserting opinion or editorializing, unless explicitly labeled
          as opinion pieces. We strive to ensure that our audience has access to
          information that helps them form their own informed opinions.
        </li>
        <li className="mb-2">
          <strong>Diversity and Inclusion:</strong> We celebrate diversity in
          our reporting and ensure that we represent a wide range of voices,
          particularly those from marginalized or underrepresented communities.
          Our editorial team is committed to avoiding stereotypes and ensuring
          that all groups are treated with fairness and respect.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        6. Accountability and Transparency in Advertising
      </h2>
      <p className="mb-4">
        We believe that clear distinctions should be made between editorial
        content and advertising. Advertisements, sponsored content, or
        partnerships will always be clearly labeled as such to avoid any
        confusion with editorial content.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Clear Separation:</strong> Advertisements and editorial
          content are treated as separate entities. We will not allow
          advertisers to influence or dictate editorial decisions, and we make
          sure that sponsored content is easily distinguishable from news
          articles.
        </li>
        <li className="mb-2">
          <strong>Ethical Advertising:</strong> We adhere to ethical standards
          in our advertising practices, ensuring that all ads we publish are
          truthful, respectful, and do not mislead our audience.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        7. No Tolerance for Plagiarism
      </h2>
      <p className="mb-4">
        We maintain a strict policy of zero tolerance for plagiarism. All
        content published on News Prime Times is original or properly credited
        to its sources. We do not copy or reuse others' work without permission
        or proper citation.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        8. Avoiding Harm and Sensationalism
      </h2>
      <p className="mb-4">
        We recognize the power of media to shape perceptions and the potential
        for our content to cause harm. We take special care to avoid
        sensationalizing stories or publishing content that could harm
        individuals, communities, or society at large.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Sensitivity to Topics:</strong> We exercise caution when
          reporting on sensitive issues such as tragedies, mental health, and
          vulnerable communities. We ensure that our reporting is respectful and
          empathetic while still providing the necessary information.
        </li>
        <li className="mb-2">
          <strong>Minimizing Harm:</strong> We aim to avoid unnecessary harm or
          distress to individuals involved in our stories, especially in
          situations where they may not have consented to being in the public
          eye.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">9. Transparency with Sources</h2>
      <p className="mb-4">
        We are committed to transparency when it comes to the sources of our
        content. If we use information from external sources, we will clearly
        attribute that information, and where possible, provide our readers with
        access to the original source.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Primary Sources:</strong> We prioritize using primary sources
          for our information. If we need to use secondary sources, we will
          always cross-check and verify the data before publication.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">10. Continuous Improvement</h2>
      <p className="mb-4">
        We understand that ethical journalism is a dynamic field, and we are
        always open to feedback and suggestions on how we can improve. We
        actively engage with our audience, consider their concerns, and strive
        to evolve in line with the highest ethical standards.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Learning and Development:</strong> Our editorial team
          regularly participates in training and development to stay up to date
          with the latest ethical standards, journalistic practices, and
          technological advancements.
        </li>
      </ul>
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="">
          If you have any concerns about the ethics of our content, or if you
          feel that we have violated our ethical standards, please do not
          hesitate to get in touch with us:
        </p>

        <ul className="list-none mt-3 space-y-2">
          <li>
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:newsprimetimesportal@gmail.com"
              className="text-blue-600 underline"
            >
              newsprimetimesportal@gmail.com
            </a>
          </li>
          <li>
            <span className="font-medium">Phone:</span>{" "}
            <a href="tel:+918649863534" className="text-blue-600 underline">
              +91 86498 63534
            </a>
          </li>
        </ul>
        <p className="">
          If you have any concerns about the ethics of our content, or if you
          fee Thank you for trusting News Prime Times as your source of news. We
          are committed to providing you with the most accurate, fair, and
          ethical information, and we promise to uphold these values in
          everything we do.
        </p>
      </div>
    </div>
  );
};
export default EthicsPolicy;
