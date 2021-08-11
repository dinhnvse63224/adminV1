import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiGithub,
  mdiLock,
  mdiMonitorClean,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide
} from '@mdi/js'

export default [
  'General',
  [
    {
      to: '/',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Examples',
  [
    {
      to: '/tables',
      label: 'Tables',
      icon: mdiTable,
      updateMark: true
    },
    {
      to: '/tables',
      label: 'Tables',
      icon: mdiTable,
      updateMark: true
    },
    {
      to: '/employees',
      label: 'Quản lý nhân viên',
      icon: mdiSquareEditOutline
    },
    {
      to: '/assignment',
      label: 'Duyệt công việc',
      icon: mdiTelevisionGuide
    },
    {
      to: '/banner',
      label: 'Banner',
      icon: mdiAccountCircle
    },
    {
      to: '/login',
      label: 'Login',
      icon: mdiLock
    },
    {
      label: 'Submenus',
      subLabel: 'Submenus Example',
      icon: mdiViewList,
      menu: [
        {
          label: 'Sub-item One'
        },
        {
          label: 'Sub-item Two'
        }
      ]
    }
  ],
  'About',
  [
    {
      href: 'https://tailwind-vue.justboil.me/',
      label: 'Premium version',
      icon: mdiMonitorClean
    },
    {
      href: 'https://github.com/justboil/admin-one-vue-tailwind',
      label: 'GitHub',
      icon: mdiGithub
    }
  ]
]
