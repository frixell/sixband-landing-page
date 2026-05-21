import type { Metadata } from "next";
import { Heebo, Outfit } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SIXBAND | Live Music Show",
  description:
    "SIXBAND — a seven-member live cover band for company events and private events. Book energetic cover shows in Israel.",
  openGraph: {
    title: "SIXBAND | Live Music Show",
    description:
      "Live cover band for company events and private events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#07060f] text-[#f4f0ff] antialiased">
        {children}
      </body>
    </html>
  );
}
