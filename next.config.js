/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      env.FILE_UPLOADER_DOMAIN,
      "cdn.discordapp.com",
      "lh3.googleusercontent.com",
      "avatars.yandex.net",
      "localhost",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default config;
