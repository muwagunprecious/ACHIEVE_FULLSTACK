import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
