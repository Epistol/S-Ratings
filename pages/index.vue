<template>
  <v-app>
    <v-content>
      <div class="w-full max-w-screen-xl mx-auto px-2">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" sm="12">
              <div v-if="!loading">
                <template v-if="showDetails">Seasons : {{ showDetails.number_of_seasons }}</template>
                <template v-if="showDetails">Episodes : {{ showDetails.number_of_episodes }}</template>
              </div>
              <div v-else>
                <v-progress-circular indeterminate color="primary" />
              </div>
            </v-col>
            <v-col cols="2">
              <p>Seasons -> Episodes ↓</p>
            </v-col>
            <v-col cols="12" sm="12">
              <div v-if="seasons.length && showDetails" class="w-full max-w-screen-xl mx-auto px-4">
                <TableBase
                  :infos="showDetails"
                  :seasons="seasons"
                  :max-nb-episodes-per-season="maxNbEpisodesPerSeason"
                />
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
import { defineComponent, Ref } from '@vue/composition-api'

import TableBase from '~/components/TableBase.vue'
import useMovieApi from '@/composables/use-movie-api'

// interface movieApi {
//   loading?: Ref<boolean | undefined> | undefined
//   result?: Ref<TvShowDetails | null | undefined> | undefined
// }

export default defineComponent({
  name: 'Index',
  components: {
    TableBase,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const apiSelected = process.env.API_CHOICE ? process.env.API_CHOICE : 'TMDB'
    const {
      showDetails,
      maxNbEpisodesPerSeason,
      seasons,
      loading,
    } = useMovieApi({ ctx, apiSelected })

    return { showDetails, seasons, loading, maxNbEpisodesPerSeason }
  },
})
</script>
