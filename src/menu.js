import {
  mdiDesktopMac,
  mdiAccount,
  mdiAlphaJBox,
  mdiImageAlbum
} from '@mdi/js'

export default [
  [
    {
      to: '/',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    },
    {
      to: '/staff',
      label: 'Quản lý nhân viên',
      icon: mdiAccount
    },
    {
      to: '/job',
      label: 'Duyệt công việc',
      icon: mdiAlphaJBox
    },
    {
      to: '/banner',
      label: 'Banner',
      icon: mdiImageAlbum
    }
  ]
]
