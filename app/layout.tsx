import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Created by Caleb Foo for Technical Test",
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${notoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
