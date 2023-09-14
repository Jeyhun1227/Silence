module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eysakvmmtrcyoqmvugfo.supabase.co",
        // hostname: "wkxlpoenbgdwtwamrkjz.supabase.co",
      },
    ],
  },
  webpack: (config, {dev, isServer}) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false
    };
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
};
