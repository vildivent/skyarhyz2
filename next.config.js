/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: env.FILE_UPLOADER_DOMAIN, protocol: "https" },
      { hostname: "cdn.discordapp.com", protocol: "https" },
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
      { hostname: "avatars.yandex.net", protocol: "https" },
      { hostname: "localhost", protocol: "http" },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default config;
