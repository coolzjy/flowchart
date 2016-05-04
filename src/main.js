import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Home from 'Home'
import Editor from 'Editor'
import Render from 'render/Render'
import Manage from 'Manage'
import Project from 'Project'
import ProjectDetail from 'Project/Detail'

Vue.directive('clickoutside', require('vue-clickoutside'))

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/home': {
    name: 'home',
    component: Home
  },
  '/render': {
    name: 'render',
    component: Render
  },
  '/manage': {
    name: 'manage',
    component: Manage
  },
  '/project': {
    name: 'project',
    component: Project,
    subRoutes: {
      '/:id': {
        name: 'project-detail',
        component: ProjectDetail
      }
    }
  },
  '/edit/:id': {
    name: 'editor',
    component: Editor
  }
})

router.redirect({
  '*': '/project'
})

router.start(App, 'app')
