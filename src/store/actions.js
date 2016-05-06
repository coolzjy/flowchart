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
    dispatch('ADD_BLOCK', block)
    dispatch('SET_CURRENTT_BLOCK_ID', id)
  },
  updateBlock ({ dispatch }, block) {
    dispatch('UPDATE_BLOCK', block)
  },
  removeBlock ({ dispatch }, id) {
    dispatch('REMOVE_BLOCK', id)
    dispatch('SET_CURRENTT_BLOCK_ID', null)
  }
}
