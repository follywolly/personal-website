export const state = () => ({
  mouse: {
    x: 0,
    y: 0
  }
})

export const mutations = {
  mouseMove (state, {x, y}) {
    state.mouse.x = x
    state.mouse.y = y
    console.log('updated store');
  }
}
