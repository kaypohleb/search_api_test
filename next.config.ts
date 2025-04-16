import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
  images: {
    remotePatterns: [new URL('https://openweathermap.org/img/wn/**')],
  },
};

export default nextConfig;
