import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./provider";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Metadata, Viewport } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zero To Mil",
    template: "%s | Zero To Mil",
  },
  description: "A Progressive Web App built with Next.js App Router and pnpm",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/images/72.png", type: "image/svg+xml" },
      { url: "/images/72.png", type: "image/x-icon" },
      { url: "/images/72.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/152.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zero To Mil",
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
    siteName: "Zero To Mil",
    title: {
      default: "Zero To Mil",
      template: "%s | Zero To Mil",
    },
    description: "Zero To MIl.",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Zero To Mil",
      template: "%s | Zero To Mil",
    },
    description: "Zero To Mil",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen p-0 m-0 font-sans antialiased",
          manrope.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
