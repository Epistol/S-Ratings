<template>
  <!-- <th :key="cellData.value" class="hover:bg-gray-600 cursor-pointer" @click="dialog = !dialog">{{ cellData.text }}</th> -->
  <v-dialog v-model="dialog" scrollable width="80%" class="overflow-y-hidden">
    <template v-slot:activator="{ dialog }">
      <td
        v-if="cellData === null"
        class="p-1 whitespace-no-wrap text-gray-900"
        @click="toggleDialog()"
      ></td>
      <td
        v-else
        class="p-1 whitespace-no-wrap text-gray-900"
        :class="cellData !== undefined ? getColor(cellData) : '' "
        @click="toggleDialog()"
      >{{ cellData !== undefined ? cellData.toFixed(1) : '' }}</td>
    </template>
    <!-- <v-card
      v-if="cellData.infos"
      @click="toggleDialog()"
      :id="cellData.infos.id"
      class="overflow-y-hidden"
    >
      <v-row justify="space-between">
        <v-col cols="4">
          <v-img
            class="white--text align-end"
            contain
            :src="'https://image.tmdb.org/t/p/w500/' + cellData.infos.poster_path"
          ></v-img>
        </v-col>

        <v-col cols="8" class>
          <v-card-text class="text--primary" max-height="300px">
            <div v-if="cellData.infos.overview">{{cellData.infos.overview}}</div>
            <div v-else>No infos provided yet</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>-->
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import useMovieApi from '@/composables/use-movie-api'

export default defineComponent({
  name: 'Cell',
  props: {
    data: {
      default: null,
    },
    index: {
      default: null,
    },
    episodeNb: {
      default: 0,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const apiSelected = process.env.API_CHOICE ? process.env.API_CHOICE : 'TMDB'

    const cellData = ref<any>(props.data)
    const cellIndex = ref<any>(props.index)
    let apiData = reactive({})
    let dialog = ref<boolean>(false)

    const toggleDialog = async () => {
      dialog.value = !dialog.value
      if (props.episodeNb && dialog.value === true) {
        // const { getEpisodeInfos } = useMovieApi({ ctx, apiSelected })
        // apiData = await getEpisodeInfos(cellIndex.value, props.episodeNb)
      }
    }
    const getColor = (rating: number) => {
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

    return { cellData, cellIndex, dialog, toggleDialog, getColor }
  },
})
</script>
