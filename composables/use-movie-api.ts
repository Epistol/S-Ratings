import { reactive, toRefs, SetupContext } from '@vue/composition-api'
import qs from 'qs'

interface Options {
  ctx: SetupContext,
  apiSelected: string
}

export default function useMovieApi({ ctx, apiSelected = 'TMDB' }: Options) {
  const endpoint: string = apiSelected === 'TMDB' ? 'https://api.themoviedb.org/3/tv/' : ''

  const state = reactive({
    error: null,
    loading: false,
    promise: null,
    result: null,
    tvInfos: null,
  })

  const tvShowId = apiSelected === 'TMDB' ? '456-the-simpsons' : 'simpsons'

  const getTvInfos = async () => {
    const url = apiSelected === 'TMDB' ? (endpoint + tvShowId) : endpoint
    state.loading = true

    await ctx.root.$axios.get(
      url,
      {
        params: {
          api_key: apiSelected === 'TMDB' ? process.env.NUXT_ENV_TMDB_API : null,
        },
      },
    ).then((res: any) => {
      state.tvInfos = res.data
      console.log('getTvInfos -> res.data', res.data)
      state.loading = false
    })
  }

  if (state.tvInfos === null) {
    getTvInfos()
  }

  return {
    ...toRefs(state),
  }
}
