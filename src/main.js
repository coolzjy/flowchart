import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Home from 'Home'
import Main from 'editor/Main'
import Render from 'render/Render'

Vue.directive('clickoutside', require('vue-clickoutside'))

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: false,
  history: true
})

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
