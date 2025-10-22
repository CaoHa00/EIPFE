import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl({
  reactStrictMode: true,
  devIndicators: false,
});

export default nextConfig;
