<template>
  <div class="w-full max-w-screen-xl mx-auto px-2">
    <header class="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <logo />
      <div class="flex text-sm leading-5">
        <a
          href="https://github.com/Epistol/S-Ratings"
          class="font-medium text-gray-500 hover:text-gray-900"
        >
          <fa :icon="['fab', 'fa-github']" />Github
        </a>
      </div>
    </header>

    <template v-if="showDetails && !loading">Seasons : {{ showDetails.number_of_seasons }}</template>
    <template v-if="showDetails && !loading">Episodes : {{ showDetails.number_of_episodes }}</template>

    <br />
    <p>
      Seasons ->
      Episodes ↓
    </p>
    <div v-if="seasons.length && showDetails" class="w-full max-w-screen-xl mx-auto px-4">
      <TableBase
        :infos="showDetails"
        :seasons="seasons"
        :max-nb-episodes-per-season="maxNbEpisodesPerSeason"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from '@vue/composition-api'

import Logo from '~/components/Logo.vue'
// import TableBase from '~/components/Table_base.vue'
import TableBase from '~/components/Table_base.vue'
import useMovieApi from '@/composables/use-movie-api'

import { TvShowDetails } from '@/types/tv-show-details'

interface movieApi {
  loading?: Ref<boolean | undefined> | undefined
  result?: Ref<TvShowDetails | null | undefined> | undefined
}

export default defineComponent({
  name: 'Index',
  components: {
    Logo,
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
