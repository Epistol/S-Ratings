<template>
  <!-- <th :key="cellData.value" class="hover:bg-gray-600 cursor-pointer" @click="dialog = !dialog">{{ cellData.text }}</th> -->
  <v-dialog v-model="dialog" scrollable width="80%" class="overflow-y-hidden">
    <template v-slot:activator="{ dialog }">
      <th class="hover:bg-gray-600 cursor-pointer" @click="toggleDialog()">{{ cellData.text }}</th>
    </template>
    <v-card
      v-if="cellData.poster_path"
      @click="toggleDialog()"
      :id="cellData.id"
      class="overflow-y-hidden"
    >
      <v-row justify="space-between">
        <v-col cols="4">
          <v-img
            class="white--text align-end"
            contain
            :src="'https://image.tmdb.org/t/p/w500' + cellData.poster_path"
          ></v-img>
        </v-col>

        <v-col cols="8" class>
          <v-card-text class="text--primary" max-height="300px">
            <div v-if="cellData.overview">{{cellData.overview}}</div>
            <div v-else>No infos provided yet</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'HeadCell',
  props: {
    data: {
      default: null,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const cellData: any = reactive(props.data)
    let dialog = ref<boolean>(false)
    const toggleDialog = () => {
      if (cellData && cellData?.poster_path) {
        dialog.value = !dialog.value
      }
    }
    return { cellData, dialog, toggleDialog }
  },
})
</script>
