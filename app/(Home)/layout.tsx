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

export const metadata = {
  title: {
    default: "News Prime Times",
    template: "%s | news prime times",
  },
  description: "helllooooooooooooooooooooooooooooooo",
  keywords: ["news", "bengali"],
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
            <div className="min-h-[calc(100vh-64px)]">{children}</div>
            <FooterSection />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
