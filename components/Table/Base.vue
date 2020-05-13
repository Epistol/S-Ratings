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
          <tbody v-if="cSeasons">
            <template v-for="(ratings,key) in episodesRatings">
              <tr :key="key">
                <th>{{ ratings.episodeNb + 1 }}</th>
                <template v-for="(episodeVotes, season) in ratings">
                  {{episodeVotes}}
                  <!-- <v-tooltip :key="season" v-model="dialog" top>
                    <template v-slot:activator="{ on }">
                       <cell
                        v-on="on"
                        v-if="season !== 'episodeNb'"
                        :key="season"
                        :data="{...props.season[season].episodes[ratings.episodeNb], episodeVotes}"
                        :index="season"
                        :episodeNb="ratings.episodeNb + 1"
                        @click="dialog = !dialog"
                      ></cell>
                    </template>
                    <span>Programmatic tooltip</span>
                  </v-tooltip>-->
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
import { defineComponent, onMounted, computed, ref } from '@vue/composition-api'
import HeadCell from '~/components/Table/HeadCell.vue'
import Cell from '~/components/Table/Cell.vue'
import useMovieApi from '@/composables/use-movie-api'

export default defineComponent({
  name: 'tableBase',
  components: {
    HeadCell,
    Cell,
  },
  props: {
    seasons: {
      default: [],
    },
    maxNbEpisodesPerSeason: {
      default: 0,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const cSeasons = computed(() => props.seasons)
    console.log('setup -> cSeasons', cSeasons)
    const cMaxEpisodesNb = computed(() => props.maxNbEpisodesPerSeason)
    const apiSelected = process.env.API_CHOICE ? process.env.API_CHOICE : 'TMDB'

    let loading: boolean = false

    const headers: any = [
      {
        text: 'Episode',
        align: 'start',
        sortable: false,
        value: 'episodeNb',
      },
    ]

    const setHeaders = () => {
      cSeasons.value.map((season: any) => {
        headers.push({
          text: season.season_number,
          value: season.season_number.toString(),
          sortable: true,
          ...season,
        })
      })
    }

    // For each episode number, we set all the ratings of each season
    // Because v-table can't do otherwise
    const setRatingsPerEpisodeNb = () => {
      loading = true
      const episodesObj: any = []
      // ex : [{episodeNb : 0}, {episodeNb: 1}]
      for (
        let episodeNb = 0;
        episodeNb <= props.maxNbEpisodesPerSeason;
        episodeNb++
      ) {
        episodesObj.push({ episodeNb })

        // Set all votes of episodes for a season
        cSeasons.value.map((season: any) => {
          // If the season episodes contain the episode number, add it to the episode Nb array
          episodesObj[episodeNb][season.season_number] = season.episodes.filter(
            (episode: any) => episode.episode_number === episodeNb + 1
          )
        })
      }

      loading = false
      return episodesObj
      // return ratingsObj.map((obj: any) => {
      //   return obj.episodeObj
      // })
    }

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

    setHeaders()
    const episodesRatings = setRatingsPerEpisodeNb()
    console.log('setup -> episodesRatings', episodesRatings)

    let dialog = ref<boolean>(false)
    const toggleDialog = async (episodeNb: any) => {
      const { getEpisodeInfos } = useMovieApi({ ctx, apiSelected })
      dialog.value = !dialog.value
      // if (episodeNb && dialog.value === true) {
      //   apiData = await getEpisodeInfos(cellIndex.value, props.episodeNb)
      // }
    }

    return {
      getColor,
      headers,
      episodesRatings,
      loading,
      cSeasons,
      dialog,
      toggleDialog,
    }
  },
})
</script>
