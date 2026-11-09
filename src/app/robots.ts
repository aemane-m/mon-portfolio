import { baseURL as rawBaseURL } from "@/resources";
export const dynamic = "force-static";
const baseURL = rawBaseURL.replace(/\/+$/, "");

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
