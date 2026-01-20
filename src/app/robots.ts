import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/careers/admin/", "/careers/dashboard/"],
    },
    sitemap: "https://nextzenaistrategix.com/sitemap.xml",
  };
}

