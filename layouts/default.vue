<template>
  <v-app :dark="goDark">
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar dense flat color="elevation-0" class="bg-transparent">
        <v-row>
          <v-col cols="2" />
          <v-col class="d-flex justify-space-around">
            <v-toolbar-title>
              <v-flex xs12>
                <nuxt-link to="/">
                  <v-img
                    :src="require('~/assets/images/logo.svg')"
                    class="my-3"
                    contain
                    width="128"
                  />
                </nuxt-link>
              </v-flex>
            </v-toolbar-title>
          </v-col>
          <v-col cols="2" class="d-flex justify-space-around items-center justify-end">
            <v-btn v-cloak text color="primary" @click="goDark = !goDark">
              <!-- <v-switch class="justify-space-around" v-model="goDark"> -->
              <template v-if="!goDark">
                <fa :icon="['far', 'moon']" />
              </template>
              <template v-else>
                <fa :icon="['fas', 'sun']" />
              </template>
            </v-btn>
            <about />
            <v-btn v-cloak href="https://github.com/Epistol/S-Ratings" text color="primary">
              <fa :icon="['fab', 'github']" />
              <span class="pl-1">Github</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api'
import About from '~/components/About.vue'
export default defineComponent({
  name: 'default',
  components: { About },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx: any) {
    const clipped = false
    const drawer = false
    const fixed = false
    let goDark = ref(true)

    watch(goDark, (value, prevValue) => {
      ctx.root.$vuetify.theme.dark = value
    })

    const items = [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire',
      },
    ]
    const miniVariant = false
    const right = true
    const rightDrawer = false
    const title = 'Vuetify.js'
    return {
      clipped,
      drawer,
      fixed,
      items,
      miniVariant,
      right,
      rightDrawer,
      title,
      goDark,
    }
  },
})
</script>
