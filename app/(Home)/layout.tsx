import type { Metadata as NextMetaData } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "../components/shared/Navbar/Navbar";
import StoreProvider from "../StoreProvider";
import FooterSection from "../components/shared/Footer/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: NextMetaData = {
  title:
    "News Prime Times - Your Trusted Source for Breaking News, Analysis, and Headlines",
  description:
    "Stay up-to-date with the latest news, in-depth analysis, and comprehensive coverage on News Prime Times. We bring you the most important stories from around the world, covering politics, business, technology, entertainment, sports, and more. Your go-to platform for reliable, accurate, and timely news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="font-noto-serif-bengali">
          <StoreProvider>
            <NavBar title="news prime times" />
            <div className="border-2 border-green-300">{children}</div>
            <FooterSection />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
