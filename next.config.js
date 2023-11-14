const path = require("path");
// const SVGRWebpackPlugin = require("@svgr/webpack");

module.exports = {
  eslint: {
    dirs: ["pages", "utils", "components", "src"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com/**',
      },
    ],
  },
  reactStrictMode: true,
  // disable css-modules component styling
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        "@svgr/webpack",
        {
          loader: "url-loader",
          options: {
            limit: 8192, // Especifica o limite de tamanho para a conversão em base64 (em bytes)
            name: "images/[name].[hash:8].[ext]", // Especifica o nome e o caminho de saída dos arquivos
          },
        },
      ],
    });
    return config;
  },
  async headers() {
    return [
      {
        // Aplica o header X-Content-Type-Options para todas as rotas do site
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Vary",
            value: "Origin",
          },
          {

            key: "Access-Control-Allow-Origin",
            value: "http://127.0.0.1:8080"
          }
        ],
      },
    ];
  },
};
