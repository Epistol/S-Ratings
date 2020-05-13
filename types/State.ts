
import { Data } from '@vue/composition-api/dist/component'
// import { TvShowDetails } from '@/types/tv-show-details'

export interface apiState extends Data {
  response: [],
  error?: any,
  fetching: boolean
}

export interface globalState extends Data {
  showDetails?: any | null
  seasons?: any,
  maxNbEpisodesPerSeason?: number
  ratings?: any
}
