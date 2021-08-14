<template>
  <nav-bar/>
  <aside-menu :menu="menuRole"/>
  <router-view/>
  <footer-bar/>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { Menu } from './menu'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  setup () {
    const store = useStore()
    const menuRole = computed(() => store.state.menus)
    if (localStorage.getItem('userToken')) {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      store.commit('user', user)
      store.commit('menuRole', [Menu.filter(m => m.authorize.includes(user.role))])
    }
    return {
      menuRole
    }
  }
}
</script>
