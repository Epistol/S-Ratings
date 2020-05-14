<template>
  <td v-if="cellData.vote_average === null" class="p-1 text-gray-900 whitespace-no-wrap"></td>
  <td
    v-else
    class="p-1 text-gray-900 whitespace-no-wrap"
    :class="cellData.vote_average !== undefined ? getColor(cellData.vote_average) : '' "
  >{{ cellData.vote_average !== undefined ? cellData.vote_average.toFixed(1) : '' }}</td>
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
    const cellData = ref<any>(props.data)
    const cellIndex = ref<any>(props.index)
    let apiData = reactive({})

    const getColor = (rating: number) => {
      if (rating === 0) {
        return 'bg-gray-500'
      }
      if (rating < 7) {
        return 'hover:bg-gray-600  cursor-pointer bg-red-500'
      }
      if (rating < 8) {
        return 'hover:bg-gray-600  cursor-pointer bg-orange-500'
      }
      if (rating < 8.4) {
        return 'hover:bg-gray-600  cursor-pointer bg-yellow-500'
      }
      if (rating >= 8) {
        return 'hover:bg-gray-600  cursor-pointer bg-green-500'
      }
    }

    return { cellData, cellIndex, getColor }
  },
})
</script>
