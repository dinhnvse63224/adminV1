<template>
  <main-section>
    <card-component  class="w-11/12 md:w-5/12 shadow-2xl rounded-lg" @submit.prevent="submit" form>
      <field label="Login" help="Please enter your login">
        <control :ref="'userName'" v-model="form.userName" :icon="mdiAccount" name="userName" autocomplete="username"/>
      </field>
      <field label="Password" help="Please enter your password">
        <control v-model="form.password" :icon="mdiAsterisk" type="password" name="password" autocomplete="current-password"/>
      </field>
      <span class="error-msg" v-if="errorMessage">{{ errorMessage }}</span>
      <divider />
      <jb-buttons>
        <jb-button type="submit" color="info" label="Login" />
      </jb-buttons>
    </card-component>
  </main-section>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
// import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import { authenticationService } from '../services/authentication.service'
import { useStore } from 'vuex'
import { Role } from '../utils/enum'
import { Menu } from '../menu'

export default {
  name: 'Login',
  components: {
    MainSection,
    CardComponent,
    Field,
    Control,
    Divider,
    JbButton,
    JbButtons
  },
  setup () {
    const store = useStore()

    const form = reactive({
      userName: '',
      password: '',
      remember: ['remember']
    })

    const errorMessage = ref('')

    const router = useRouter()

    const submit = () => {
      try {
        if (!form.userName || !form.password) {
          console.log('aaa')
        } else {
          authenticationService.login(form.userName, form.password).then(user => {
            if (user.role === Role.Staff) {
              router.push('/job')
            } else {
              router.push('/')
            }
            store.commit('user', user)
            store.commit('menuRole', [Menu.filter(m => m.authorize.includes(user.role))])
          }).catch(error => {
            errorMessage.value = error.response.data.error_description
            console.log('err', errorMessage.value)
          })
        }
      } catch (error) {
        console.error(error.response)
      }
    }

    return {
      form,
      submit,
      mdiAccount,
      mdiAsterisk,
      errorMessage
    }
  }
}
</script>
