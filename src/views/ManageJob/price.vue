<template>
  <table>
    <thead>
    <tr>
      <th>Số ngày</th>
      <th>Số tiền</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="price in items" :key="price.id">
      <td data-label="Phone">{{ price.activeDays }}</td>
      <td data-label="Phone">{{ new Intl.NumberFormat().format(price.price) }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button @click="remove(price)" title="Xóa" color="danger" :icon="mdiCancel"  />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
  <!-- <div class="table-pagination">
    <level>
      <b>Số bản ghi: {{ items.length || 0 }}</b>
    </level>
  </div> -->
</template>
<script>
import { computed } from 'vue'
import { mdiEye, mdiCancel, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
// import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'

export default {
  name: 'PriceTable',
  components: {
    // Level,
    JbButtons,
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()
    store.dispatch('fetchActiveDayPrice')
    const items = computed(() => store.state.activedaysandprice)

    const remove = (price) => {
      if (confirm('Bạn có muốn xóa bản ghi đã chọn?')) {
        store.dispatch('ActiveDayPriceDelete', price)
      }
    }

    return {
      items,
      remove,
      mdiEye,
      mdiCancel,
      mdiAccount,
      mdiLockOpenVariant
    }
  }
}
</script>
