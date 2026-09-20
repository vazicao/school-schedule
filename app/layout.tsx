import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Raspored časova",
  description: "Raspored časova, kontrolni zadaci i udžbenici",
  applicationName: "Moj Raspored",
  // Home-screen label and behaviour when added on iOS. (The manifest — which
  // is per class — is linked from each class page; see its generateMetadata.)
  appleWebApp: {
    capable: true,
    title: "Moj Raspored",
    // The page draws under the status bar (see the safe-area rules in
    // globals.css), so the amber header reaches the top of the screen.
    statusBarStyle: "black-translucent",
  },
  other: {
    // Older iOS versions only recognise the apple-prefixed name
    // (appleWebApp.capable above already emits the unprefixed one).
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#d17f00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="600c2d84-6a55-4703-9218-10320d54bad2"
        ></script>
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
