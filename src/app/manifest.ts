import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Zen AI Strategix",
    short_name: "Next Zen AI",
    description:
      "Next Zen AI Strategix LLC accelerates growth with AI, cloud, and automation built for scale, security, and real business impact.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#22d3ee",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

