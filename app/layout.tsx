import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oussama Lassoued — UI/UX Designer",
  description: "UI/UX designer creating premium digital experiences where art meets interaction. Specializing in visual design, brand-driven interfaces, and motion-aware web design.",
  keywords: ["UI/UX Designer", "Visual Design", "Web Design", "Digital Designer", "Interface Design", "Oussama Lassoued"],
  authors: [{ name: "Oussama Lassoued" }],
  openGraph: {
    title: "Oussama Lassoued — UI/UX Designer",
    description: "Creating premium digital experiences where art meets interaction",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
