import Vue from 'vue'
import VueRouter from 'vue-router'
import FirebasePlugin from './common/FirebasePlugin'

import App from './App'
import Home from 'components/Home'
import Projects from 'components/Projects'
import Editor from 'components/Editor'

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
