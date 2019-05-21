export const state = () => ({
  projects: []
})

export const mutations = {
  mouseMove (state, {x, y}) {
    state.mouse.x = x
    state.mouse.y = y
    console.log('updated store');
  },
  setProjects(state, payload) {
    state.projects = payload
  }
}

export const getters = {
  getProjects(state) {
    return (slug) => {
      if (!slug) {
        return state.projects
      }
      return state.projects.find(project => {
        const sanitized = project.title.replace(/[^A-Za-z0-9\s]/g,'').toLowerCase()
        return sanitized.split(' ').join('-') === slug
      })
    }
  }
}
