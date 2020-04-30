<template>
  <div class="text-center" />
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ShowInfos',
  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const dialog: boolean = false
    return { dialog }
  },
})
</script>
