<template>
  <table>
    <thead>
    <tr>
      <th>Tài khoản</th>
      <th>Họ tên</th>
      <th>Ngày tạo</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="staff in items" :key="staff.id">
      <td data-label="Name">{{ staff.username }}</td>
      <td data-label="Phone">{{ staff.fullName }}</td>
      <td data-label="Phone">{{ staff.createDate }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button v-if="!staff.isBanned" title="Khóa tài khoản" color="danger" :icon="mdiCancel" small @click="BannedStaff(staff, true)" />
          <jb-button v-if="staff.isBanned" title="Mở tài khoản" color="info" :icon="mdiLockOpenVariant" small @click="BannedStaff(staff, false)" />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <b>Số bản ghi: {{ items.length || 0 }}</b>
    </level>
  </div>
</template>

<script>
import { computed } from 'vue'
import { mdiEye, mdiCancel, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
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

    const BannedStaff = (staff, isBanned) => {
      if (confirm('Bạn có muốn khóa tài khoản?')) {
        staff.isBanned = isBanned
        store.dispatch('BannedStaff', { ...staff })
      }
    }

    return {
      BannedStaff,
      mdiEye,
      mdiCancel,
      mdiAccount,
      mdiLockOpenVariant,
      items
    }
  }
}
</script>
