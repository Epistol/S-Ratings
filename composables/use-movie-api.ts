import { reactive, SetupContext, toRefs } from '@vue/composition-api'
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
    showDetails: null,
    ratings: [],
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
    state.showDetails = data
    state.loading = false
    if (state.ratings.length === 0) {
      getShowRatings()
    }
  }

  const getShowRatings = async () => {
    if (state.showDetails) {
      for (let seasonNb = 0; seasonNb <= state.showDetails.number_of_seasons; seasonNb++) {
        const ratings = await getSeasonRatings(seasonNb)
        state.ratings.push({ seasonNb, ratings })
      }
      console.log('getShowRatings -> state.ratings', state.ratings)
    }
  }

  const getSeasonRatings = async (seasonNb: number) => {
    const url = apiSelected === 'TMDB' ? (endpoint + tvShowId + '/season/' + seasonNb) : endpoint
    const { data } = await ctx.root.$axios.get(url,
      {
        params: {
          api_key: apiSelected === 'TMDB' ? process.env.NUXT_ENV_TMDB_API : null,
        },
      },
    )
    console.log('getSeasonRatings -> data', data)
    const nbEpisodes = data.episodes.count
    return {
      ...data,
      episodes: data
        .map((data: any) => data.vote_average)
        .filter((data: any) => data.episode_number <= nbEpisodes),
    }
  }

  if (state.showDetails === null) {
    getTvInfos()
  }

  return {
    ...toRefs(state),
    getSeasonRatings,
  }
}
