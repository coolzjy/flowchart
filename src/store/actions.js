export const changeCanvasStyle = makeAction('CHANGE_CANVAS_STYLE')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
