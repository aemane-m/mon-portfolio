// next.config.mjs
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {}, // tu peux brancher remark/rehype ici si besoin
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⬇️ clé nécessaire pour générer un site 100% statique (remplace `next export`)
  output: "export",

  // MDX comme extensions de pages
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Si tu utilises next/image avec un export statique :
  images: {
    unoptimized: true, // important pour output: "export"
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com", pathname: "**" },
    ],
  },

  // Si un paquet ESM a besoin d’être transpiler
  transpilePackages: ["next-mdx-remote"],

  // Sass (supprime l’avertissement legacy API)
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
