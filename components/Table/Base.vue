<template>
  <div class="flex flex-col">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <v-simple-table dense fixed-header class="min-w-full" :loading="loading">
          <thead>
            <tr>
              <template v-for="header in headers">
                <head-cell :key="header.value" :data="header"></head-cell>
              </template>
            </tr>
          </thead>
          <tbody v-if="ratingsPerEpisodeNb">
            <template v-for="item in items">
              <tr :key="item.episodeNb">
                <th>{{ item.episodeNb + 1 }}</th>
                <template v-for="(data, index) in item">
                  <cell
                    v-if="index !== 'episodeNb'"
                    :key="index"
                    :data="data"
                    :index="index"
                    :episode="item.episodeNb + 1"
                  ></cell>
                </template>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeadCell from '~/components/Table/HeadCell.vue'
import Cell from '~/components/Table/Cell.vue'

interface Season {
  infos: Object
  seasonNb: number
  votesAvg: object
}

export default defineComponent({
  name: 'tableBase',
  components: {
    HeadCell,
    Cell,
  },
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
    let loading: boolean = false
    const ratingsPerEpisodeNb: any = []

    const headers: any = [
      {
        text: 'Episode',
        align: 'start',
        sortable: false,
        value: 'episodeNb',
      },
    ]

    const setHeaders = () => {
      props.seasons.map((season: any) => {
        headers.push({
          text: season.seasonNb,
          value: season.seasonNb.toString(),
          sortable: true,
          infos: season.infos,
        })
      })
    }

    setHeaders()

    // For each episode number, we set all the ratings of each season
    const setRatingsPerEpisodeNb = (episode: number = 0) => {
      loading = true
      let episodeNb = episode
      const ratingsObj = []
      // for each episode Nb, we will load the ratings of the episode NB from all seasons
      for (episodeNb; episodeNb <= props.maxNbEpisodesPerSeason; episodeNb++) {
        const episodeObj: any = { episodeNb }

        props.seasons.map((season: any) => {
          episodeObj[season.seasonNb] = season.votesAvg[episodeNb]
            ? season.votesAvg[episodeNb]
            : null
        })

        ratingsObj.push({
          episodeObj,
        })
      }

      loading = false
      return ratingsObj.map((obj: any) => {
        return obj.episodeObj
      })
    }

    const items = setRatingsPerEpisodeNb()

    const getColor = (rating: number) => {
      if (rating === null) {
        return null
      }
      if (rating === 0) {
        return 'bg-gray-500'
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

    return { ratingsPerEpisodeNb, getColor, headers, items, loading }
  },
})
</script>
