import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Home from 'Home'
import Main from 'Main'
import Render from 'Render'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: Home
  },
  '/main': {
    name: 'main',
    component: Main
  },
  '/render': {
    name: 'render',
    component: Render
  }
})

router.start(App, 'app')
