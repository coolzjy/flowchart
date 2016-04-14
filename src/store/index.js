import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  canvas: {
    style: {
      width: 800,
      height: 600,
      background: '#ffffff'
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
  },
  lines: []
}

const mutations = {
  CHANGE_CANVAS_STYLE (state, style) {
    Object.assign(state.canvas.style, style)
  },
  CHANGE_LINE_STYLE (state, style) {
    Object.assign(state.canvas.line, style)
  },
  ADD_LINE (state, line) {
    state.lines.push(line)
  },
  RESET_LINE (state, line, newLine) {
    line = Object.assign(line, newLine)
  },
  FILTER_LINES (state, block) {
    state.lines = state.lines.filter((line) => {
      return line.start.block !== block && line.end.block !== block
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
