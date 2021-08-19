<template>
  <table>
    <thead>
    <tr>
      <th>Ngành Nghề</th>
      <th>Ngày tạo</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td data-label="Name">Abc</td>
      <td data-label="Phone">cav</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button  title="Xóa" color="danger" :icon="mdiCancel"  />
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
// import { computed } from 'vue'
import { mdiEye, mdiCancel, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
// import Level from '@/components/Level'
// import JbButtons from '@/components/JbButtons'
// import JbButton from '@/components/JbButton'
// import { useStore } from 'vuex'

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
    return {
      mdiEye,
      mdiCancel,
      mdiAccount,
      mdiLockOpenVariant
    }
  }
}
</script>
