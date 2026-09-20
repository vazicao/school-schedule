import { listClassParams } from "@/lib/classLoader";

// One web app manifest PER CLASS, served at /<school>/<class>/manifest.webmanifest.
// Each class gets its own start_url and app id, so parents of different classes
// get different installs that each open their own class — and since the class
// slug never changes, neither does that start_url.
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => listClassParams();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ school: string; class: string }> },
) {
  const { school, class: classSlug } = await params;
  const classUrl = `/${school}/${classSlug}`;

  const manifest = {
    id: classUrl,
    name: "Moj Raspored",
    short_name: "Moj Raspored",
    description: "Raspored časova, kontrolni zadaci i udžbenici",
    lang: "sr-Latn",
    start_url: classUrl,
    scope: "/",
    display: "standalone",
    // Splash screen colours: the icon's mint background, and the app's amber
    background_color: "#ccfff1",
    theme_color: "#d17f00",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
