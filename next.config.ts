import type { NextConfig } from "next";

// Where `/` and the old `/schedule` URL send people, until there's a real
// landing page (a school/class picker).
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
      { source: "/", destination: DEFAULT_CLASS_PATH, permanent: false },
      {
        source: "/schedule",
        destination: DEFAULT_CLASS_PATH,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
