<template>
  <v-app>
    <v-content>
      <div class="w-full max-w-screen-xl mx-auto px-2">
        <v-container fluid>
          <div v-if="!showDetails">
            <v-progress-circular indeterminate color="primary" />
          </div>
          <v-row no-gutters>
            <v-col cols="12" sm="12">
              <div v-if="showDetails">
                <div class="text-lg" v-if="showDetails">Show name : {{ showDetails.original_name }}</div>
                <div v-if="showDetails">Seasons : {{ showDetails.number_of_seasons }}</div>
                <div v-if="showDetails">Episodes : {{ showDetails.number_of_episodes }}</div>
              </div>
            </v-col>
            <v-col cols="2">
              <p>Seasons -> Episodes ↓</p>
            </v-col>
            <v-col cols="12" sm="12">
              <div
                v-if="seasons.length && showDetails && maxNbEpisodesPerSeason"
                class="w-full max-w-screen-xl mx-auto px-4"
              >
                <TableBase :seasons="seasons" :max-nb-episodes-per-season="maxNbEpisodesPerSeason" />
              </div>
            </v-col>
            <!-- <v-col cols="12" sm="12">
              <show-infos />
            </v-col>-->
          </v-row>

          <br />
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, Ref, reactive, onMounted } from '@vue/composition-api'

import TableBase from '~/components/Table/Base.vue'
import useMovieApi from '@/composables/use-movie-api'

export default defineComponent({
  name: 'Index',
  components: {
    TableBase,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const apiSelected = process.env.API_CHOICE ? process.env.API_CHOICE : 'TMDB'

    const {
      showDetails, // easy to forget if we remove useProduct
      seasons,
      maxNbEpisodesPerSeason,
      ratings,
      loadShowInfos,
    } = useMovieApi({ ctx, apiSelected })

    onMounted(async () => {
      await loadShowInfos() // fetch main product
    })

    return {
      showDetails, // easy to forget if we remove useProduct
      maxNbEpisodesPerSeason,
      seasons,
    }
  },
})
</script>
