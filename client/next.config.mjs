
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, 
     images: {
    remotePatterns: [ 
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
