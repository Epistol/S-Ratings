<template>
  <div class="container">
    <div>
      <logo />
      <template v-if="tvInfos && !loading">Seasons : {{ tvInfos.number_of_seasons }}</template>
      <TableBase />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from '@vue/composition-api'

import Logo from '~/components/Logo.vue'
import TableBase from '~/components/Table_base.vue'
import useMovieApi from '@/composables/use-movie-api'
import { TvShow } from '~/types/tv-show'

interface movieApi {
  tvInfos: Readonly<Ref<Readonly<TvShow> | null | undefined>>
  loading?: Ref<boolean | undefined> | undefined
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
    const { tvInfos, loading }: movieApi = useMovieApi({
      ctx,
      apiSelected,
    })

    return { tvInfos, loading }
  },
})
</script>
