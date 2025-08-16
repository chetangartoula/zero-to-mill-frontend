import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./provider";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My PWA App",
    template: "%s | My PWA App",
  },
  description: "A Progressive Web App built with Next.js App Router and pnpm",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "My PWA App",
    startupImage: [
      {
        url: "/splash-640x1136.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "My PWA App",
    title: {
      default: "My PWA App",
      template: "%s | My PWA App",
    },
    description: "A Progressive Web App built with Next.js",
  },
  twitter: {
    card: "summary",
    title: {
      default: "My PWA App",
      template: "%s | My PWA App",
    },
    description: "A Progressive Web App built with Next.js",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  // shrinkToFit: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("p-0 m-0", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
