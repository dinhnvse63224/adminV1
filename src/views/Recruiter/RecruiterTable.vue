<template>
 <hero-bar>Nhà tuyển dụng</hero-bar>
  <main-section>
      <card-component :icon="mdiAccount" title="Danh sách nhà tuyển dụng" has-table>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>UserName</th>
            <th>Gmail</th>
            <th>Điện thoại</th>
            <th>Giới tính</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="recruiter in items" :key="recruiter.id">
            <td data-label="Name">{{ recruiter.id }}</td>
            <td data-label="Phone">{{ recruiter.firstName + " " + recruiter.lastName }}</td>
            <td data-label="Name">{{ recruiter.username }}</td>
            <td data-label="Phone">{{ recruiter.gmail }}</td>
            <td data-label="Phone">{{ recruiter.phone }}</td>
            <td data-label="Phone">
              <span v-if="recruiter.sex">Nam</span>
              <span v-if="!recruiter.sex">Nữ</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="table-pagination">
          <level>
            <b>Số bản ghi: {{ items.length || 0 }}</b>
          </level>
        </div>
      </card-component>
  </main-section>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiCancel, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
import Level from '@/components/Level'
import { useStore } from 'vuex'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'RecruiterTable',
  components: {
    Level,
    CardComponent,
    HeroBar
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()
    const page = ref(0)

    store.dispatch('fetchRecruiter', page.value)

    const items = computed(() => store.state.recruiters)

    const totalItem = computed(() => store.state.TotalRecruiters)

    return {
      totalItem,
      mdiEye,
      mdiCancel,
      mdiAccount,
      mdiLockOpenVariant,
      items
    }
  }
}
</script>
