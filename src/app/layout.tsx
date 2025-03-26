import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next.js boilerplate",
  description: "Created by Jacob Friis Strand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
        Non frontend layout
      </body>
    </html>
  );
}
