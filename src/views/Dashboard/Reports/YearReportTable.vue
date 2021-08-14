<template>
  <table>
    <tbody>
    <tr>
      <td>Số nhà tuyển dụng tham gia vào hệ thống: 0</td>
    </tr>
    <tr>
      <td>Số việc làm được đăng lên: 0</td>
    </tr>
    <tr>
     <td>Số lượng sinh viên nhà tuyển dụng có nhu cầu tuyển dụng: 0</td>
    </tr>
     <tr>
      <td>
         <jb-button title="Tải báo cáo" label="Tải về" color="info" :icon="mdiDownload" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue'
import { mdiEye, mdiDownload, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
import { useStore } from 'vuex'
import JbButton from '@/components/JbButton'

export default {
  name: 'YearReportTable',
  components: {
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchStaff')

    const items = computed(() => store.state.staffs)

    return {
      mdiEye,
      mdiDownload,
      mdiAccount,
      mdiLockOpenVariant,
      items,
      JbButton
    }
  }
}
</script>
