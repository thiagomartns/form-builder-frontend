import type { Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "./globals.css";
import { CollapseDesktop } from "@/components/appshell";
import ClientProvider from "@/providers/client-provider";

export const metadata: Metadata = {
  title: "Next App Mantine Tailwind Template",
  description: "Next App Mantine Tailwind Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <ClientProvider>
          <CollapseDesktop>{children}</CollapseDesktop>
        </ClientProvider>
      </body>
    </html>
  );
}
