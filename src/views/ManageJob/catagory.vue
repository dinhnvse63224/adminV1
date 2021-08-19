<template>
  <hero-bar>Quản trị công việc</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
    <card-component title="Cập nhật Ngành nghề" :icon="mdiSearch" @submit.prevent="submit" form>
      <field v-if="!updateCategory">
        <control placeholder="Ngành nghề muốn thêm" place :icon="mdiClipboardList" v-model="catagory.value" />
      </field>
      <field v-if="updateCategory">
        <control placeholder="Ngành nghề muốn thêm" place :icon="mdiClipboardList" v-model="updateCategory.value" />
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" :label="!updateCategory ? 'Thêm' : 'Cập nhật'" />
      </jb-buttons>
      <br/>
     <card-component :icon="mdiAccount" title="Ngành nghề" has-table>
      <catagory-table />
    </card-component>
    </card-component>
    <card-component title="Cập nhật ngày và giá tiền" :icon="mdiSearch" @submit.prevent="submitdays" form>
      <field>
        <control placeholder="Số ngày" place :icon="mdiCalendarBlank" v-model="days.activeDays" />
        <control placeholder="Số tiền" type="text" :icon="mdiCurrencyUsd" v-model="days.price" />
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Thêm" />
      </jb-buttons>
       <br/>
<card-component :icon="mdiAccount" title="Ngày và giá tiền" has-table>
      <price-table />
    </card-component>
    </card-component>
      </div>
  </main-section>
</template>

<script>
import { computed, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiCurrencyUsd, mdiCheck, mdiMonitorCellphone, mdiCalendarBlank, mdiClipboardList } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import CatagoryTable from './catatable'
import PriceTable from './price'
import { useStore } from 'vuex'

export default {
  name: 'catagory',
  components: {
    MainSection,
    HeroBar,
    CardComponent,
    Field,
    Control,
    JbButton,
    JbButtons,
    CatagoryTable,
    PriceTable
  },
  setup () {
    const store = useStore()
    const updateCategory = computed(() => store.state.updateCategory)
    const catagory = reactive({
      value: ''
    })
    const days = reactive({
      days: '',
      price: ''
    })
    const submit = () => {
      if (updateCategory.value != null) {
        store.dispatch('CatogoryUpdate', { ...updateCategory.value })
        catagory.value = ''
      } else {
        store.dispatch('CatogoryInsert', { ...catagory })
        catagory.value = ''
      }
    }
    const submitdays = () => {
      store.dispatch('ActiveDaysInsert', { ...days })
      days.activeDays = ''
      days.price = ''
    }
    return {
      catagory,
      days,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiCurrencyUsd,
      mdiCheck,
      mdiMonitorCellphone,
      submit,
      submitdays,
      CatagoryTable,
      PriceTable,
      mdiCalendarBlank,
      mdiClipboardList,
      updateCategory
    }
  }
}
</script>
