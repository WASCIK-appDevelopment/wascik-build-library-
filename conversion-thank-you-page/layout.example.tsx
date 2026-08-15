import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | [Business Name]",
  description: "Thank you for choosing [Business Name].",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
