import { Configuration } from '@nuxt/types/config'

const config: Configuration = {
  server: {
    port: 8081,
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/composition-api.ts',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '~/config/language',
  ],
}

export default config
