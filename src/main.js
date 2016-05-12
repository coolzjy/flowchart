import Vue from 'vue'
import VueRouter from 'vue-router'
import FirebasePlugin from './common/FirebasePlugin'

import App from './App'
import Home from 'components/Home'
import Projects from 'components/Projects'
import Editor from 'components/Editor'

import swal from 'sweetalert'

Vue.use(VueRouter)
Vue.use(FirebasePlugin)

const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: Home
  },
  '/projects': {
    name: 'projects',
    component: Projects
  },
  '/editor/:name': {
    name: 'editor',
    component: Editor
  }
})

router.redirect({
  '*': '/'
})

router.start(App, 'app')

// get post message
window.addEventListener('message', event => {
  if (/http(s)*:\/\/portal\.dt\..+\.me/.test(event.origin)) {
    swal('欢迎', `成功校验用户权限信息 [ ${event.data.nickname} ]`, 'success')
  } else {
    swal('警告', '检测到用户没有通过数据门户进入，将无法使用部分功能。', 'warning')
  }
})
