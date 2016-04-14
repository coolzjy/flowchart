export const changeCanvasStyle = makeAction('CHANGE_CANVAS_STYLE')
export const changeLineStyle = makeAction('CHANGE_LINE_STYLE')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
