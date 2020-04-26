export default [
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
]
