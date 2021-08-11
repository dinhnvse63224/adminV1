<template>
  <table>
    <thead>
    <tr>
      <th>Họ tên</th>
      <th>Số điện thoại</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <td data-label="Name">{{ client.name }}</td>
      <td data-label="Phone">{{ client.phone }}</td>
      <td data-label="Email">{{ client.email }}</td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          @click="currentPage = page"
          :active="page === currentPage"
          :label="page + 1"
          :key="page"
          small
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'

export default {
  name: 'EmployersTable',
  components: {
    Level,
    JbButtons,
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    // const store = useStore()

    // const items = computed(() => store.state.clients)

    const items = ref([
      {
        name: 'Google',
        phone: '12345678',
        email: 'google@gmail.com'
      },
      {
        name: 'Facebook',
        phone: '12345678',
        email: 'Facebook@gmail.com'
      },
      {
        name: 'Nasa',
        phone: '12345678',
        email: 'Nasa@gmail.com'
      }
    ])

    const isModalActive = ref(false)

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const startIndex = ref(0)

    const itemsPaginated = computed(
      () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
    )

    const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const currentPageHuman = computed(() => currentPage.value + 1)

    const pagesList = computed(() => {
      const pagesList = []

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
      }

      return pagesList
    })

    const remove = (arr, cb) => {
      const newArr = []

      arr.forEach(item => {
        if (!cb(item)) {
          newArr.push(item)
        }
      })

      return newArr
    }

    const checked = (isChecked, client) => {
      if (isChecked) {
        checkedRows.value.push(client)
      } else {
        checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
      }
    }

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      checked,
      mdiEye,
      mdiTrashCan,
      startIndex
    }
  }
}
</script>
