import { Configuration } from '@nuxt/types/config'

const config: Configuration = {
  mode: 'universal',
  server: {
    port: 8081,
  },
  srcDir: './src/',
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@aceforth/nuxt-netlify', '@nuxtjs/vuetify'],
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
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas'],
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab', 'faGithub'],
        },
      ],
    }],
    ['@nuxtjs/google-analytics', {
      id: process.env.NUXT_ENV_GA_ID || '',
    }],
  ],
}

export default config
