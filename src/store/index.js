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
  blocks: [],
  maxBlockId: 0,
  blockCategories: [],
  maxCategoryId: 0,
  project: {
    current: ''
  }
}

const mutations = {
  CHANGE_CANVAS_STYLE (state, style) {
    Object.assign(state.canvas.style, style)
  },
  CHANGE_LINE_STYLE (state, style) {
    Object.assign(state.canvas.line, style)
  },
  CHANGE_CATEGORY (state, category, newCategory) {
    category = Object.assign(category, newCategory)
  },
  ADD_BLOCK_CATEGORY (state, category) {
    state.blockCategories.push(category)
  },
  ADD_LINE (state, line) {
    state.lines.push(line)
  },
  RESET_LINE (state, line, newLine) {
    line = Object.assign(line, newLine)
  },
  FILTER_LINES (state, id) {
    state.lines = state.lines.filter((line) => {
      return line.start.block !== id && line.end.block !== id
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
  DELETE_BLOCK (state, id) {
    state.blocks = state.blocks.filter(block => block.id !== id)
  },
  RESIZE_BLOCK (state, block, category) {
    block.width = category.width + 'px'
    block.height = category.height + 'px'
  },
  SET_CURRENT_PROJECT (state, name) {
    state.project.current = name
  },
  LOAD_PROJECT (state, data) {
    state.lines = data.lines || []
    state.blocks = data.blocks || []
    state.blockCategories = data.blockCategories || []
    Object.assign(state.canvas, data.canvas)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
