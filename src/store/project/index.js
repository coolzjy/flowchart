const state = {
  data: {
    blocks: [],
    lines: [],
    custom: []
  },
  settings: {
    line: {
      width: 1,
      color: '#333333'
    },
    block: {
      background: '#ffffff',
      borderColor: '#333333',
      width: 150,
      height: 100
    },
    background: {
      background: '#ffffff',
      width: 800,
      height: 600
    },
    grid: {
      size: 10
    }
  }
}

const mutations = {
  'UPDATE_PROJECT_DATA' (state, data) {
    Object.assign(state.data, data)
  },
  'UPDATE_PROJECT_SETTINGS' (state, settings) {
    Object.assign(state.settings, settings)
  },
  'ADD_BLOCK' (state, block) {
    state.data.blocks.push(block)
  },
  'UPDATE_BLOCK' (state, block) {
    var index = state.data.blocks.findIndex(item => item.id === block.id)
    if (index > -1) {
      state.data.blocks[index] = block
    }
  },
  'REMOVE_BLOCK' (state, id) {
    var index = state.data.blocks.findIndex(item => item.id === id)
    if (index > -1) {
      state.data.blocks.splice(index, 1)
    }
  }
}

export default {
  state,
  mutations
}
