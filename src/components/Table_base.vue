<template>
  <div class="flex flex-col">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <template v-for="field in fields">
                <th :key="field.key">{{ field.key }}</th>
              </template>
            </tr>
          </thead>
          <tbody v-if="ratingsPerEpisodeNb" class="bg-white">
            <template v-for="ratingPerEpisodeNb in ratingsPerEpisodeNb">
              <tr :key="ratingPerEpisodeNb.episode">
                <th>{{ ratingPerEpisodeNb.episode + 1 }}</th>
                <template v-for="(rating, index) in ratingPerEpisodeNb.ratings">
                  <td
                    :key="index"
                    class="p-1 whitespace-no-wrap border-b border-gray-200"
                    :class="setBgCell(rating)"
                  >{{ rating !== null ? rating.toFixed(1) : rating }}</td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface Season {
  infos: Object
  seasonNb: number
  votesAvg: object
}

export default defineComponent({
  name: 'tableBase',
  props: {
    infos: {
      default: null,
    },
    seasons: {
      default: [],
    },
    maxNbEpisodesPerSeason: {
      default: 0,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const ratingsPerEpisodeNb: any = []
    const fields: any = [{ key: '', sortable: false }]
    props.seasons.map((season: any) => {
      fields.push({ key: season.seasonNb, sortable: true })
    })

    const setRatingsPerEpisodeNb = () => {
      for (
        let episode = 0;
        episode <= props.maxNbEpisodesPerSeason;
        episode++
      ) {
        const ratings = props.seasons.map((season: any) => {
          return season.votesAvg[episode] ? season.votesAvg[episode] : null
        })

        ratingsPerEpisodeNb.push({
          episode,
          ratings,
        })
      }
    }
    setRatingsPerEpisodeNb()

    const setBgCell = (rating: number) => {
      if (rating === null) {
        return null
      }
      if (rating < 7) {
        return 'bg-red-500'
      }
      if (rating < 8) {
        return 'bg-orange-500'
      }
      if (rating < 8.4) {
        return 'bg-yellow-500'
      }
      if (rating >= 8) {
        return 'bg-green-500'
      }
    }
    return { ratingsPerEpisodeNb, setBgCell, fields }
  },
})
</script>
