import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/onboarding/", "/bills/"],
      },
    ],
    sitemap: "https://powernetpro.com/sitemap.xml",
  };
}

