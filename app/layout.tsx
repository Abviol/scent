/* next.js */
import type { Metadata } from "next";
/* styles*/
import "./globals.css";
/* fonts*/
import { inter } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Scents",
  description: "A fragrance e-commerce website developed with Next.js, TypeScript, Tailwind CSS, and Prisma. The website was created exclusevely for my team's portfolio and does not serve for commercial purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
