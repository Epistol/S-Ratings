import { Configuration } from '@nuxt/types/config'
const config: Configuration = {
  server: {
    port: 8081,
  },
  srcDir: './src/',
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@aceforth/nuxt-netlify'],
  plugins: [
    '~/plugins/composition-api.ts',
  ],
  generate: {
    fallback: true,
  },
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
    'bootstrap-vue/nuxt',
    ['nuxt-fontawesome', {
      component: 'fa',
    }],
    ['@nuxtjs/google-analytics', {
      id: process.env.NUXT_ENV_GA,
    }],
  ],
  bootstrapVue: {
    componentPlugins: [
      'TablePlugin',
    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin'],
  },
}

export default config
