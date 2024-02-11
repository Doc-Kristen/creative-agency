/** @type {import('next').NextConfig} */
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
