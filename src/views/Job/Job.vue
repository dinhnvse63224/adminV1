<template>
  <hero-bar>Duyệt công việc</hero-bar>
  <main-section>
     <card-component title="" has-table>
      <job-table />
    </card-component>
  </main-section>
</template>
<script>
import JobTable from './JobTable'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiMonitorCellphone } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'Job',
  components: {
    MainSection,
    HeroBar,
    JobTable,
    CardComponent
  },
  setup () {
    return {
      JobTable,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck,
      mdiMonitorCellphone
    }
  }
}
</script>
