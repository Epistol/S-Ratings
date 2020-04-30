<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">About</v-btn>
      </template>
      <v-toolbar dark color="primary">
        <v-toolbar-items>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title>About</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text class="pt-4">
          <div class="mb-2">
            <p>
              This website is a data table showing all
              the notes given to the episodes of
              <a
                href="https://www.themoviedb.org/tv/456-the-simpsons"
              >"The Simpsons"</a>
              by users from
              <a href="https://www.themoviedb.org/">TMDB</a>
            </p>
          </div>
          <div>
            <p>
              Made by
              <a href="https://epistol.fr">Epistol</a>, code available on
              <a href="https://github.com/Epistol/S-Ratings">Github</a>
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'About',
  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const dialog: boolean = false
    return { dialog }
  },
})
</script>
