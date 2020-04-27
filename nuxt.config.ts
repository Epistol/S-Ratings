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
    [
      'nuxt-i18n',
      {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              greeting: 'Hello world!',
            },
            es: {
              greeting: '¡Hola mundo!',
            },
          },
        },
      },
    ],
  ],
}

export default config
