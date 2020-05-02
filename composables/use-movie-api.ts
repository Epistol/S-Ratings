import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import State from '~/types/State'

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
    seasons: [],
    maxNbEpisodesPerSeason: 0,
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

    if (!state.seasons.length) {
      state.seasons = await getShowRatings()
      state.maxNbEpisodesPerSeason = state.seasons
        .map((data: any) => data.infos.episodes)
        .map((seasons: any) => seasons.length)
        .reduce((max: any, val: any) => {
          return max > val ? max : val
        })
    }
    state.loading = false
  }

  const getShowRatings = async () => {
    const ratings = []
    if (state.showDetails) {
      for (let seasonNb = 1; seasonNb <= state.showDetails.number_of_seasons; seasonNb++) {
        const infos = await getSeasonRatings(seasonNb)
        const votesAvg = infos.episodes.map((data: any) => data.vote_average)
        ratings.push({ seasonNb, votesAvg, infos })
      }
    }
    return ratings
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
    return data
  }

  if (state.showDetails === null) {
    getTvInfos()
  }

  return {
    ...toRefs(state),
    getSeasonRatings,
  }
}
