import React from "react";
import { Box, Button, IconButton, Typography, Grid } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
const FooterSection: React.FC = () => {
  const footerLinks = [
    {
      siteName: "news prime times",
      description: `At News Prime Times, we are dedicated to delivering accurate, unbiased, and engaging news across a variety of topics, including world events, entertainment, business, sports, and education. Founded in 2024, our mission is to inform, educate, and empower our audience while fostering meaningful discussions and spreading positivity. Stay connected for reliable updates and insightful content tailored just for you!`,
    },
    {
      title: "company",
      subMenu: [
        {
          title: "about us",
          path: "/about-us",
        },
        {
          title: "contact us",
          path: "/contact-us",
        },

        {
          title: "advertise with us",
          path: "/advertise-with-us",
        },
        {
          title: "privacy policy",
          path: "/privacy-policy",
        },
        {
          title: "terms & condition",
          path: "/terms-and-conditions",
        },
      ],
    },

    {
      title: "important links",
      subMenu: [
        {
          title: "fact checking policy",
          path: "/fact-checking-policy",
        },
        {
          title: "editorial team",
          path: "/editorial-team",
        },
        {
          title: "affiliate disclosure",
          path: "/affiliate-disclosure",
        },

        {
          title: "correction-policy",
          path: "/correction-policy",
        },
        {
          title: "ethics policy",
          path: "/ethics-policy",
        },
      ],
    },
    {
      title: "social media",
      subMenu: [
        {
          title: "whatsapp",
          path: "https://whatsapp.com/channel/0029Vak6hnkHltYI87w1f92j",
          icon: <WhatsAppIcon />,
        },
        {
          title: "facebook",
          path: "https://www.facebook.com/newsprimetimes?mibextid=ZbWKwL",
          icon: <FacebookIcon />,
        },
        {
          title: "twitter",
          path: "https://x.com/NewsPrimeTimes?t=hanGC6fw2qtipj18IfsbXQ&s=09",
          icon: <XIcon />,
        },
        {
          title: "instagram",
          path: "https://youtube.com/@newsprimetimes?si=dCv_W-MgokeF0M4I",
          icon: <YouTubeIcon />,
        },
      ],
    },
  ];

  return (
    <div className="bg-red-800 text-white p-4 lg:py-10 font-roboto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10  ">
          {footerLinks.map((item, idx) => (
            <div key={idx}>
              {item.siteName ? (
                <div>
                  <h1 className="font-roboto text-2xl font-bold capitalize py-4">
                    {item.siteName}
                  </h1>
                  <p className="font-normal text-sm text-justify">
                    {item.description}
                  </p>
                </div>
              ) : (
                <h1 className="font-roboto text-2xl font-bold capitalize py-4">
                  {item.title}
                </h1>
              )}
              <ul
                className={`${
                  item.title == "social media"
                    ? "flex items-center gap-4"
                    : " space-y-2"
                }`}
              >
                {item?.subMenu?.map((subItems, idx) => (
                  <div key={idx} className="w-fit">
                    {item.title == "social media" ? (
                      <Link href={subItems.path} className="text-inherit">
                        <div>{subItems.icon}</div>
                      </Link>
                    ) : (
                      <Link
                        href={subItems.path}
                        className="text-inherit hover:text-inherit group relative w-fit "
                      >
                        <li className="capitalize font-normal  w-fit">
                          {subItems.title}
                        </li>
                        <span className="h-0.5 bg-white w-full absolute scale-x-0 group-hover:scale-x-100 transition-all origin-left"></span>
                      </Link>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-center  pt-8 pb-12 lg:pb-0">
          &copy; 2024 News Prime Times. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
