import { Data } from '@vue/composition-api/dist/component'
import TvShowDetails from '@/types/tv-show-details'

export default interface State extends Data {
  error?: null,
  loading?: boolean,
  promise?: null,
  result?: TvShowDetails | null
}
