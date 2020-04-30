<template>
  <v-toolbar dense flat color="elevation-0" class="bg-transparent">
    <v-row>
      <v-col cols="2" />
      <v-col class="d-flex justify-space-around">
        <v-toolbar-title>
          <v-flex xs12>
            <nuxt-link to="/">
              <v-img :src="require('~/assets/images/logo.svg')" class="my-3" contain width="128" />
            </nuxt-link>
          </v-flex>
        </v-toolbar-title>
      </v-col>
      <v-col cols="2" class="d-flex justify-space-around items-center justify-end">
        <about />
        <a
          href="https://github.com/Epistol/S-Ratings"
          class="font-medium text-gray-500 hover:text-gray-900"
        >
          <fa :icon="['fab', 'github']" />
          <span class="pl-1">Github</span>
        </a>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import About from '~/components/About.vue'

export default defineComponent({
  name: 'Index',
  components: { About },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>
