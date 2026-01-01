import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Note Taking App",
  description: "A beautiful note-taking app with advanced AI functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
