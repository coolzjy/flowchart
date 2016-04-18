import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  canvas: {
    style: {
      width: 800,
      height: 600,
      background: 'transparent'
    },
    line: {
      width: 3,
      color: '#000000'
    },
    grid: {
      show: true,
      style: {
        size: 50
      }
    }
  },
  lines: [],
  blocks: []
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
  },
  ADD_BLOCK (state, block) {
    state.blocks.push(block)
  },
  DROP_BLOCK (state, block, stickTo, dragVector) {
    let gridSize = state.canvas.grid.style.size
    block.x = parseInt(block.x, 10) + Math[stickTo.x](dragVector.x / gridSize) * gridSize + 'px'
    block.y = parseInt(block.y, 10) + Math[stickTo.y](dragVector.y / gridSize) * gridSize + 'px'
  },
  DELETE_BLOCK (state, index) {
    state.blocks.splice(index, 1)
  },
  RESIZE_BLOCK (state, block, category) {
    block.width = category.width + 'px'
    block.height = category.height + 'px'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
