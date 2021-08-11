<template>
  <hero-bar>Duyệt công việc</hero-bar>
  <main-section>
     <card-component title="" has-table>
      <assignment-table />
    </card-component>
  </main-section>
</template>
<script>
import AssignmentTable from './AssignmentTable'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiMonitorCellphone } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'Assignment',
  components: {
    MainSection,
    HeroBar,
    AssignmentTable,
    CardComponent
  },
  setup () {
    return {
      AssignmentTable,
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
