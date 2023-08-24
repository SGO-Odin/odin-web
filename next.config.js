const path = require('path')

module.exports = {
  eslint: {
    dirs: ['pages', 'utils', 'components', 'src'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // disable css-modules component styling
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return
          one.issuer.and = [path.resolve(__dirname)]
        })
      }
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  async headers() {
    return [
      {
        // Aplica o header X-Content-Type-Options para todas as rotas do site
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin'
          },
          {
            key: 'Permissions-Policy',
            value:
              'microphone=(), camera=(), geolocation=(self "https://blog-nubank-com-br-develop.go-vip.net/"), payment=*'
          }
        ]
      }
    ]
  }
}