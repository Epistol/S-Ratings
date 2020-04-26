<template>
  <div class="container">
    <div>
      <logo />
      <TableBase />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Logo from '~/components/Logo.vue'
import TableBase from '~/components/Table_base.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Logo,
    TableBase,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>
