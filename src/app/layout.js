// src/app/layout.js
import MainNavigation from './components/navigation/MainNavigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from './components/footer/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "House of the Redeemer | Episcopal Church in Historic Vanderbilt Mansion | Carnegie Hill NYC",
  description: "Join our welcoming Episcopal community in a stunning historic Vanderbilt mansion on Carnegie Hill. Sunday services, weddings, cultural events & spiritual guidance in Manhattan.",
  icons: {
    icon: "/favicon.png", // your slate logo
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainNavigation />
        {children}
        <Footer/>
      </body>
    </html>
  );
}