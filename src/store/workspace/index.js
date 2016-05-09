const state = {
  projectList: [],
  currentProjectName: '',
  currentBlockId: null,
  currentPointId: null,
  mousePosition: { x: 0, y: 0 },
  mouseOffsetBlock: { x: 0, y: 0 },
  isBlockMoving: false
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
  },
  'SET_CURRENTT_POINT_ID' (state, id) {
    state.currentPointId = id
  },
  'SET_MOUSE_POSITION' (state, position) {
    state.mousePosition = position
  },
  'SET_MOUSE_OFFSET' (state, position) {
    state.mouseOffsetBlock = position
  },
  'SET_BLOCK_MOVING' (state, isMoving) {
    state.isBlockMoving = isMoving
  }
}

export default {
  state,
  mutations
}
