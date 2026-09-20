import type { NextConfig } from "next";

// Where the old `/schedule` URL (bookmarks / installs from before the
// multi-class restructure) sends people. `/` itself is the landing page.
const DEFAULT_CLASS_PATH = "/os-jelena-cetkovic/gen-2024-2";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The service worker script must always be re-checked so updates ship.
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/schedule",
        destination: DEFAULT_CLASS_PATH,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
