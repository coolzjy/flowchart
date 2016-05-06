const state = {
  projectList: [],
  currentProjectName: '',
  currentBlockId: null
}

const mutations = {
  'UPDATE_PROJECT_LIST' (state, list) {
    state.projectList = list
  },
  'SET_CURRENT_PROJECT_NAME' (state, name) {
    state.currentProjectName = name
  },
  'SET_CURRENTT_BLOCK_ID' (state, id) {
    state.currentBlockId = id
  }
}

export default {
  state,
  mutations
}
