export default {
  updateProjectList ({ dispatch }, list) {
    if (!Array.isArray(list)) {
      list = Object.keys(list)
    }
    dispatch('UPDATE_PROJECT_LIST', list)
  },
  setCurrentProjectName ({ dispatch, state }, name) {
    if (state.workspace.projectList.indexOf(name) > -1 || !name) {
      dispatch('SET_CURRENT_PROJECT_NAME', name)
    }
  },
  setCurrentBlockId ({ dispatch }, id) {
    dispatch('SET_CURRENTT_BLOCK_ID', id)
  },
  setCurrentPointId ({ dispatch }, id) {
    dispatch('SET_CURRENTT_POINT_ID', id)
  },
  setMousePosition ({ dispatch }, position) {
    dispatch('SET_MOUSE_POSITION', position)
  },
  setMouseOffsetBlock ({ dispatch }, position) {
    dispatch('SET_MOUSE_OFFSET', position)
    dispatch('SET_BLOCK_MOVING', true)
  },
  setBlockMoving ({ dispatch }, isMoving) {
    dispatch('SET_BLOCK_MOVING', isMoving)
  },
  updateProjectData ({ dispatch }, data) {
    dispatch('UPDATE_PROJECT_DATA', data)
  },
  updateProjectSettings ({ dispatch }, settings) {
    dispatch('UPDATE_PROJECT_SETTINGS', settings)
  },
  addBlock ({ dispatch, state }, block) {
    var id = 1
    if (state.project.data.blocks.length) {
      id = Math.max.apply(null, state.project.data.blocks.map(block => block.id)) + 1
    }
    block.id = id
    if (!block.name) {
      block.name = '未命名' + id
    }
    dispatch('ADD_BLOCK', block)
    dispatch('SET_CURRENTT_BLOCK_ID', id)
  },
  updateBlockPosition ({ state, dispatch }, data) {
    if (data.id === undefined) {
      data.id = state.workspace.currentBlockId
    }
    dispatch('UPDATE_BLOCK_POSITION', data)
    dispatch('REFRESH_LINES')
  },
  removeBlock ({ dispatch }, id) {
    dispatch('REMOVE_BLOCK', id)
    dispatch('SET_CURRENTT_BLOCK_ID', null)
    dispatch('REFRESH_LINES')
  },
  addLink ({ dispatch }, begin, end) {
    dispatch('ADD_LINK', begin, end)
    dispatch('REFRESH_LINES')
  },
  removeBlockLink ({ dispatch }, blockId, pointId) {
    dispatch('REMOVE_LINK', blockId, pointId)
    dispatch('REFRESH_LINES')
  }
}
