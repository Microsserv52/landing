import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/store/"],
      disallow: [
        "/admin/",
        "/api/",
        "/store/account/",
        "/store/orders/",
        "/store/order/",
        "/store/checkout/",
      ],
    },
  };
}
