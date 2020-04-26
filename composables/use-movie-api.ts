import { reactive, ref, toRefs, computed } from '@vue/composition-api'

export default function useMovieApi (ctx, apiSelected: string = 'TMDB') {
  const nbSeasons: number = 31
  let tvId: string = ''
  let endpoint: string = ''

  const _loading = ref(false)
  const state = reactive({
    error: null,
    loading: computed(() => _loading.value),
    promise: null,
    result: null
  })

  if (apiSelected === 'TMDB') {
    tvId = '456-the-simpsons'
    endpoint = 'https://api.themoviedb.org/3/tv/'
  }

  const getAllRatings = async () => {
    const ip = await ctx.$axios.$get('http://icanhazip.com')
    this.ip = ip
  }

  return {
    getAllRatings,
    ...toRefs(state)
  }
}
