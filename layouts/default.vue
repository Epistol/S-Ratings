<template>
  <v-app :dark="goDark">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link href="https://github.com/Epistol/S-Ratings">
          <v-list-item-action>
            <fa :icon="['fab', 'github']" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Github</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://twitter.com/StolEpi">
          <v-list-item-action>
            <fa :icon="['fab', 'twitter']" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Twitter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="d-flex justify-space-around items-center justify-end mt-4">
          <about />
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            class="visible lg:invisible"
            v-cloak
            text
            color="primary"
            @click="goDark = !goDark"
          >
            <!-- <v-switch class="justify-space-around" v-model="goDark"> -->
            <template v-if="!goDark">
              <fa :icon="['far', 'moon']" />
              <span class="pl-2">Night Mode</span>
            </template>
            <template v-else>
              <fa :icon="['fas', 'sun']" />
              <span class="pl-2">Light Mode</span>
            </template>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="visible lg:invisible"></v-app-bar-nav-icon>
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
            <v-btn
              class="invisible lg:visible"
              v-cloak
              text
              color="primary"
              @click="goDark = !goDark"
            >
              <!-- <v-switch class="justify-space-around" v-model="goDark"> -->
              <template v-if="!goDark">
                <fa :icon="['far', 'moon']" />
              </template>
              <template v-else>
                <fa :icon="['fas', 'sun']" />
              </template>
            </v-btn>
            <div class="invisible lg:visible">
              <about />
            </div>
            <v-btn
              class="invisible lg:visible"
              v-cloak
              href="https://github.com/Epistol/S-Ratings"
              text
              color="primary"
            >
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

    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }} - Epistol</span>
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
    let goDark = ref(true)
    let drawer = ref(false)

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
