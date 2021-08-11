<template>
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="512"
        label="Nhà tuyển dụng"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiCartOutline"
        :number="7770"
        prefix="$"
        label="Sinh viên"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix="%"
        label="Công việc đã đăng"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <card-component
        title="Nhà tuyển dụng"
        has-table>
        <employers-table />
      </card-component>
      <card-component
        title="Sinh viên"
        has-table>
        <students-table />
      </card-component>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <button @click="EmployerSession = !EmployerSession" v-if="EmployerSession">Chuyển session sinh viên</button>
      <button @click="EmployerSession = !EmployerSession" v-if="!EmployerSession">Chuyển session nhà tuyển dụng</button>
    </div>

    <card-component v-if="EmployerSession" title="Nhà tuyển dụng" has-table>
      <employer-task-table />
    </card-component>

    <card-component v-if="!EmployerSession" title="Sinh viên" has-table>
      <student-task-table />
    </card-component>
  </main-section>
</template>

<script>
// @ is an alias to /src
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub
} from '@mdi/js'

import MainSection from '@/components/MainSection'
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import StudentsTable from './StudentsTable.vue'
import EmployersTable from './EmployersTable.vue'
import EmployerTaskTable from './EmployerTaskTable.vue'
import StudentTaskTable from './StudentTaskTable.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
    MainSection,
    CardComponent,
    CardWidget,
    HeroBar,
    StudentsTable,
    EmployersTable,
    EmployerTaskTable,
    StudentTaskTable
  },
  setup () {
    const EmployerSession = ref(true)

    return {
      mdiAccountMultiple,
      mdiCartOutline,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiGithub,

      StudentsTable,
      EmployersTable,
      EmployerTaskTable,
      StudentTaskTable,
      EmployerSession
    }
  }
}
</script>
