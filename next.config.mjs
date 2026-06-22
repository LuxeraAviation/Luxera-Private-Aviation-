/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
};

export default nextConfig;
