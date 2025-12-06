import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const jerseyFont = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-game",
});

export const metadata: Metadata = {
  title: "Codebox - Learn Programming with Interactive Exercises",
  description: "Beginner friendly coding courses and projects with gamified learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jerseyFont.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
