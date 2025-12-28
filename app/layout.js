import "./globals.css";

import { Providers } from "@/components/Providers";
import AnnouncementPopup from "@/components/AnnouncementPopup";

export const metadata = {
  title: "Achievers Summit 2026 | Connect. Lead. Achieve.",
  description: "Achievers Summit 2026 brings together leaders, innovators, policymakers, and visionaries shaping Africa’s future in Victoria Island, Lagos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <AnnouncementPopup />
        </Providers>
      </body>
    </html>
  );
}
