// src/app/layout.js
import MainNavigation from "./components/navigation/MainNavigation";
import Footer from "./components/footer/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title:
    "House of the Redeemer | Episcopal Church in Historic Vanderbilt Mansion | Carnegie Hill NYC",
  description:
    "Join our welcoming Episcopal community in a stunning historic Vanderbilt mansion on Carnegie Hill. Sunday services, weddings, cultural events & spiritual guidance in Manhattan.",
  icons: {
    icon: [
      { url: "/hotr-slate-logo.png", type: "image/png" },
      { url: "/hotr-slate-logo.png", sizes: "16x16", type: "image/x-icon" },
    ],
    apple: "/hotr-slate-logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.houseoftheredeemer.org",
    title: "House of the Redeemer",
    description:
      "An Episcopal church and retreat house in a historic Vanderbilt mansion on the Upper East Side of Manhattan.",
    images: [{ url: "/hotr-slate-logo.png" }],
  },
  twitter: {
    card: "summary",
    title: "House of the Redeemer",
    description:
      "A place apart in the heart of the city — Episcopal Church and retreat house on the Upper East Side.",
    images: ["/hotr-slate-logo.png"],
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "House of the Redeemer",
    alternateName: "The House of the Redeemer Episcopal Church",
    description:
      "An Episcopal church and retreat house located in a historic Vanderbilt mansion on Manhattan’s Upper East Side. Offering worship, programs, and cultural gatherings since 1914.",
    url: "https://www.houseoftheredeemer.org",
    telephone: "+1-212-289-0399",
    isAccessibleForFree: true,
    publicAccess: true,
    slogan: "A Place Apart in the Heart of the City",
    logo: "https://www.houseoftheredeemer.org/hotr-slate-logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 East 95th Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10128",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 40.7863, longitude: -73.9567 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
        description:
          "Prayer services are held twice daily (8:00 am and 5:30 pm) Monday – Friday, September – June. Eucharist Tuesday evening / Thursday morning. No services July–August.",
      },
    ],
    specialOpeningHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "Closed",
        validFrom: "2025-07-01",
        validThrough: "2025-08-31",
        description: "No religious services during July and August.",
      },
    ],
    hasMap:
      "https://www.google.com/maps/place/House+of+the+Redeemer/@40.7863,-73.9567,17z",
    sameAs: [
      "https://en.wikipedia.org/wiki/House_of_the_Redeemer",
      "https://www.facebook.com/houseoftheredeemer",
      "https://www.instagram.com/houseofredeemer/",
    ],
    containedInPlace: {
      "@type": "Place",
      name: "Historic Vanderbilt Mansion, Carnegie Hill",
    },
    keywords: [
      "Episcopal church",
      "Upper East Side",
      "Carnegie Hill",
      "Vanderbilt mansion",
      "retreat house",
      "worship services",
      "New York City",
      "House of the Redeemer",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Server-rendered JSON-LD injected here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainNavigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
