<template>
  <div class="container">
    <div>
      <logo />
      <template v-if="showDetails && !loading">Seasons : {{ showDetails.number_of_seasons }}</template>
      <template v-if="showDetails && !loading">Episodes : {{ showDetails.number_of_episodes }}</template>
      <TableBase />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from '@vue/composition-api'

import Logo from '~/components/Logo.vue'
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
    const { showDetails, ratings, loading } = useMovieApi({ ctx, apiSelected })
    console.log('setup -> ratings', ratings)

    return { showDetails, ratings, loading }
  },
})
</script>
