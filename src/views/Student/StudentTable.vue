<template>
 <hero-bar>Sinh viên</hero-bar>
  <main-section>
      <card-component :icon="mdiAccount" title="Danh sách dinh viên" has-table>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Gmail</th>
            <th>Giới tính</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="recruiter in items" :key="recruiter.id">
            <td data-label="Name">{{ recruiter.id }}</td>
            <td data-label="Phone">{{ recruiter.gmail }}</td>
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
  name: 'StudentTable',
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

    store.dispatch('fetchStudent', page.value)

    const items = computed(() => store.state.students)

    const totalItem = computed(() => store.state.TotalStudents)

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
