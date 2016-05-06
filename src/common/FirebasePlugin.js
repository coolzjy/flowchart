import Firebase from 'firebase'

const url = 'http://eleme-flowchart.firebaseio.com'

export default {
  install (Vue) {
    Vue.prototype.$firebase = new Firebase(url)
  }
}
