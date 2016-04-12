import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  canvas: {
    style: {
      width: '800px',
      height: '600px',
      background: '#fff'
    },
    grid: {
      show: true,
      style: {
        size: '50px'
      }
    }
  }
}

const mutations = {
  CHANGE_CANVAS_STLYE (state, style) {
    Object.assign(state.canvas.style, style)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
