<template>
  <table>
    <thead>
    <tr>
      <th>Ngành Nghề</th>
    </tr>
    </thead>
    <tbody>
    <tr style="cursor: pointer;" @click="edit(category)" v-for="category in items" :key="category.id">
      <td data-label="Value">{{ category.value }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button  title="Xóa" color="danger" :icon="mdiCancel"  />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>

import { computed } from 'vue'
import { mdiEye, mdiCancel, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
import { useStore } from 'vuex'
// import Level from '@/components/Level'
// import JbButtons from '@/components/JbButtons'
// import JbButton from '@/components/JbButton'

export default {
  name: 'CatagoryTable',
  components: {
    // Level,
    // JbButtons,
    // JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()
    store.dispatch('fetchCategory')
    const items = computed(() => store.state.catagory)

    const edit = (category) => {
      store.commit('setUpdateCategory', category)
    }

    return {
      mdiEye,
      mdiCancel,
      mdiAccount,
      mdiLockOpenVariant,
      items,
      edit
    }
  }
}
</script>
