<template>
  <table>
    <thead>
    <tr>
      <th>Họ tên</th>
      <th>Số điện thoại</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="staff in items" :key="staff.id">
      <td data-label="Name">{{ staff.full_name }}</td>
      <td data-label="Phone">{{ staff.mobile_phone }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button color="danger" :icon="mdiTrashCan" small @click="deleteEmployee(staff)" />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <small>Số bản ghi: {{ items.length || 0 }}</small>
    </level>
  </div>
</template>

<script>
import { computed } from 'vue'
import { mdiEye, mdiTrashCan, mdiAccount } from '@mdi/js'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'

export default {
  name: 'StaffTable',
  components: {
    Level,
    JbButtons,
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchStaff')

    const items = computed(() => store.state.staffs)

    const deleteEmployee = (employee) => {
      if (confirm('Bạn có muốn xóa nhân viên')) {
        store.dispatch('deleteEmployee', { ...employee })
      }
    }

    return {
      deleteEmployee,
      mdiEye,
      mdiTrashCan,
      mdiAccount,
      items
    }
  }
}
</script>
