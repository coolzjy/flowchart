import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  canvas: {
    style: {
      width: 800,
      height: 600,
      background: 'fff'
    },
    line: {
      width: 3,
      color: '000'
    },
    grid: {
      show: true,
      style: {
        size: 50
      }
    }
  }
}

const mutations = {
  CHANGE_CANVAS_STYLE (state, style) {
    Object.assign(state.canvas.style, style)
  },
  CHANGE_LINE_STYLE (state, style) {
    Object.assign(state.canvas.line, style)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
