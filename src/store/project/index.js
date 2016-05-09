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
      width: 160,
      height: 100
    },
    background: {
      background: '#ffffff',
      width: 800,
      height: 600
    },
    grid: {
      size: 20
    }
  }
}

const mutations = {
  'UPDATE_PROJECT_DATA' (state, data) {
    state.data = data
  },
  'UPDATE_PROJECT_SETTINGS' (state, settings) {
    Object.assign(state.settings, settings)
  },
  'ADD_BLOCK' (state, block) {
    state.data.blocks.push(block)
  },
  'UPDATE_BLOCK_POSITION' (state, { id, x, y }) {
    var index = state.data.blocks.findIndex(item => item.id === id)
    if (index > -1) {
      state.data.blocks[index].x = x
      state.data.blocks[index].y = y
    }
  },
  'REMOVE_BLOCK' (state, id) {
    var index = state.data.blocks.findIndex(item => item.id === id)
    if (index > -1) {
      state.data.blocks.splice(index, 1)
    }
  },
  'ADD_LINK' (state, begin, end) {
    const block = state.data.blocks.find(item => item.id === begin)
    if (block) {
      if (!block.links) {
        block.links = []
      }
      if (block.links.indexOf(end) < 0) {
        block.links.push(end)
      }
    }
  },
  'REMOVE_LINK' (state, blockId, pointId) {
    const block = state.data.blocks.find(item => item.id === blockId)
    if (block) {
      var index = block.links.indexOf(pointId)
      if (index > -1) {
        block.links.splice(index, 1)
      }
    }
  },
  'REFRESH_LINES' (state) {
    let lines = []
    state.data.blocks.forEach(block => {
      if (block.links && block.links.length) {
        block.links = block.links.filter(id => state.data.blocks.find(item => item.id === id))
        block.links.forEach(id => {
          const target = state.data.blocks.find(item => item.id === id)
          lines.push({
            x1: block.x * state.settings.grid.size + state.settings.block.width / 2,
            y1: block.y * state.settings.grid.size + state.settings.block.height,
            x2: target.x * state.settings.grid.size + state.settings.block.width / 2,
            y2: target.y * state.settings.grid.size
          })
        })
      }
    })
    state.data.lines = lines
  }
}

export default {
  state,
  mutations
}
