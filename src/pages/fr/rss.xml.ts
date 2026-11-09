import type { APIRoute } from "astro";
import { rss } from "../../lib/rss";
export const GET: APIRoute = ({ site }) => rss("fr", site!);
