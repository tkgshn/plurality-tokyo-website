const withNextIntl = require('next-intl/plugin')('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
}

module.exports = withNextIntl(nextConfig)
