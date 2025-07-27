/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  async rewrites() {
    return [
      {
        source: '/(links|lnk|l)',
        destination: '/'
      }
    ]
  }
}

export default nextConfig
