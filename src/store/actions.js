export default {
  changeCanvasStyle: makeAction('CHANGE_CANVAS_STYLE'),
  changeLineStyle: makeAction('CHANGE_LINE_STYLE'),
  changeCategory: makeAction('CHANGE_CATEGORY'),
  addBlockCategory: makeAction('ADD_BLOCK_CATEGORY'),
  addLine: makeAction('ADD_LINE'),
  resetLine: makeAction('RESET_LINE'),
  filterLines: makeAction('FILTER_LINES'),
  addBlock: makeAction('ADD_BLOCK'),
  dropBlock: makeAction('DROP_BLOCK'),
  deleteBlock: makeAction('DELETE_BLOCK'),
  resizeBlock: makeAction('RESIZE_BLOCK'),
  setCurrentProject: makeAction('SET_CURRENT_PROJECT'),
  loadProject: makeAction('LOAD_PROJECT')
}

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
