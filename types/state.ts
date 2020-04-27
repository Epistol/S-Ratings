import { Data } from '@vue/composition-api/dist/component'
import { TvShow } from '@/types/tv-show'

export default interface State extends Data {
  error?: null,
  loading?: boolean,
  promise?: null,
  result?: TvShow | null
}
