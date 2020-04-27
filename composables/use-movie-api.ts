import { reactive, SetupContext, computed, toRefs } from '@vue/composition-api'
import State from '~/types/state'

interface Options {
  ctx: SetupContext,
  apiSelected: string
}

export default function useMovieApi({ ctx, apiSelected = 'TMDB' }: Options) {
  const endpoint: string = apiSelected === 'TMDB' ? 'https://api.themoviedb.org/3/tv/' : ''

  const state: State = reactive({
    error: null,
    loading: false,
    promise: null,
    result: null,
  })

  const tvShowId = apiSelected === 'TMDB' ? '456-the-simpsons' : 'simpsons'

  const getTvInfos = async () => {
    const url = apiSelected === 'TMDB' ? (endpoint + tvShowId) : endpoint
    state.loading = true
    const { data } = await ctx.root.$axios.get(url,
      {
        params: {
          api_key: apiSelected === 'TMDB' ? process.env.NUXT_ENV_TMDB_API : null,
        },
      },
    )
    state.result = data
    state.loading = false
  }

  if (state.result === null) {
    getTvInfos()
  }

  const tvInfos = computed(() => state?.result)

  return {
    tvInfos,
    ...toRefs(state),
  }
}
