<template>
  <div>
    <Header />
    <nuxt />
    <div class="page-t">
      <div class="page-t__item"></div>
      <div class="page-t__item"></div>
      <div class="page-t__item"></div>
    </div>
    <div id="cursor">
    </div>
    <div id="follower">
    </div>
  </div>

</template>

<script>
  import Header from '~/components/organisms/Header.vue'

  export default {
    components: {
      Header
    },
    data() {
      return {
        mouse: {
          x: 0,
          y: 0
        },
        counter: 0
      }

    },
    mounted() {
      if (process.browser) {
        const cursor = document.querySelector('#cursor')
        const follower = document.querySelector('#follower')
        window.addEventListener('mousemove', e => {
          if (this.allowUpdate) {
            this.x = e.clientX
            this.y = e.clientY
            cursor.style = `transform: translate(${this.x}px, ${this.y}px)`;
            follower.style = `transform: translate(${this.x}px, ${this.y}px)`;
          }
        })
        const links = [...document.querySelectorAll('a')]
        const buttons = [...document.querySelectorAll('button')]
        const hoverables = links.concat(buttons)
        hoverables.forEach(hoverable => {
          hoverable.addEventListener('mouseenter', () => {
            cursor.classList.add('hover')
          })
          hoverable.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover')
          })
        })
      }
    },
    computed: {
      allowUpdate() {
        const refreshRate = 1
        return this.counter++ % refreshRate === 0
      }
    }
  }
</script>
<style lang="scss">

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
#cursor, #follower {
  border-radius: 50%;
  width: 5px;
  height: 5px;
  border: 2px solid var(--color-light);
  content: "";
  position: fixed;
  top: -3px;
  left: -3px;
  background: var(--color-light);
  transition: all 1s, transform 0s;
  pointer-events: none;
  z-index: 12;
  &.hover {
    width: 30px;
    height: 30px;
    top: -15px;
    left: -15px;
    background: transparent;
    + #follower {
      transition: transform 0s;
    }
  }
}
#follower {
  border-width: 1px;
  width: 30px;
  height: 30px;
  opacity: .5;
  top: -15px;
  left: -15px;
  transition: opacity 1s, background 1s, transform .1s;
  background: transparent;
  z-index: 11;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
:root {
  --color-light: #f8f8f8;
  --color-dark: #131313;
  --color-semi-light: #a3a3a3;
  --color-grey: #767676;
  --color-semi-dark: #353535;
  --font-headings: 'brandon-grotesque', sans-serif;
  --font-card-headings: 'cortado', serif;
  --font-main: 'brandon-grotesque', sans-serif;
}
body {
  background-color: var(--color-dark);
  color: var(--color-semi-light);
  font-family: var(--font-main);
  font-weight: normal;
  cursor: none;
}
main {
  padding-top: 5rem;
  transition: opacity 1s;
}
h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-headings);
  color: var(--color-light);
  font-weight: 900;
}
.container {
  margin: 0 auto;
  padding: 3rem 1.5rem;
  max-width: 1080px;
  min-height: 50vh;
}
a {
  cursor: none;
}
p {
  text-transform: lowercase;
  font-size: 0.875rem;
  font-weight: lighter;
}
.page-t {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 100;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  .page-t__item {
    background-color: #131313;
    width: 200vw;
    content: "";
    display: block;
    transform: translateX(-200vw);
    flex: 1;
  }
}
.page-enter-active, .page-leave-active {
  transition: opacity 1s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
