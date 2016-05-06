import Vue from 'vue'
import Vuex from 'vuex'

import project from './project'
import workspace from './workspace'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    project,
    workspace
  }
})
