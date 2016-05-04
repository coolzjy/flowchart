import Firebase from 'firebase'

const FIREBASE_BASE_URL = 'https://eleme-flowchart.firebaseio.com/'

const root = new Firebase(FIREBASE_BASE_URL)

const projects = root.child('/projects')

export { root, projects }

// actions

const saveProject = function (name, data, fn) {
  projects.child(name).set(data, fn)
}

export { saveProject }
