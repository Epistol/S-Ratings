import { reactive, ref, toRefs, computed } from '@vue/composition-api'

export default function useMovieApi () {
  const tvId: string = '456-the-simpsons'
  const nbSeasons: number = 31

  const getAllRatings = async () => {

  }

  return {
    getAllRatings
  }
}
