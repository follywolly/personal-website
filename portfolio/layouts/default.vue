<template>
  <div>
    <Header />
    <main>
      <nuxt class="page"/>
    </main>
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
  import helpers from '~/components/modules/helpers.js'
  import config from '~/components/modules/config.js'

  export default {
    components: {
      Header
    },
    data() {
      return {
        mouse: {
          x: 0,
          y: 0,
          allowed: false
        },
        counter: 0,
        cursor: null,
        follower: null,
        hoverables: []
      }

    },
    mounted() {
      this.cursor = document.querySelector('#cursor')
      this.follower = document.querySelector('#follower')

      this.checkIfCursorAllowed()

      // if (process.browser) {
      //   fetch(config.api.url + 'posts')
      //     .then(res => res.json())
      //     .then(posts => {
      //       const projects = posts.map(post => post.acf)
      //       this.$store.commit('setProjects', projects)
      //     })
      // }
    },
    watch: {
      $route(to, from) {
        setTimeout(() => {
          this.resetCursor()
          this.checkIfCursorAllowed()
        }, 1000)
      }
    },
    computed: {
      allowUpdate() {
        const refreshRate = 1
        return this.counter++ % refreshRate === 0
      }
    },
    methods: {
      checkIfCursorAllowed() {
        if (process.browser && helpers.getWindowSize().width > 1024 && !this.mouse.allowed) {

          this.initCursor()
        }
        if (process.browser && helpers.getWindowSize().width < 1024 && this.mouse.allowed) {

          this.resetCursor()
        }
        window.addEventListener('resize', this.checkIfCursorAllowed)
      },
      resetCursor() {
        console.log('resetting mouse');
        this.mouse.allowed = false
        this.cursor.classList.remove('hover')
        window.removeEventListener('mouseout', this.onMouseOut)
        window.removeEventListener('mousemove', this.onMouseMove)
        this.hoverables.forEach(hoverable => {
          hoverable.removeEventListener('mouseenter', this.onHoverableMouseEnter)
          hoverable.removeEventListener('mouseleave', this.onHoverableMouseLeave)
        })
      },
      initCursor() {
        this.mouse.allowed = true
        const links = [...document.querySelectorAll('a')]
        const buttons = [...document.querySelectorAll('button')]
        const lights = [...document.querySelectorAll('.mouse-dark')]
        this.hoverables = links.concat(buttons).concat(lights)
        window.addEventListener('mouseout', this.onMouseOut)
        window.addEventListener('mousemove', this.onMouseMove)
        this.hoverables.forEach(hoverable => {
          hoverable.addEventListener('mouseenter', this.onHoverableMouseEnter)
          hoverable.addEventListener('mouseleave', this.onHoverableMouseLeave)
        })
      },
      onMouseMove(e) {
        if (this.allowUpdate) {
          this.x = e.clientX
          this.y = e.clientY
          this.cursor.style = `transform: translate(${this.x}px, ${this.y}px);`;
          this.follower.style = `transform: translate(${this.x}px, ${this.y}px);`;
        }
      },
      onMouseOut() {
        this.cursor.style.opacity = 0
        this.follower.style.opacity = 0
      },
      onHoverableMouseEnter(e) {
        if (e.target.classList.contains('mouse-dark')) {
          this.cursor.classList.add('dark')
        } else {
          this.cursor.classList.add('hover')
        }
      },
      onHoverableMouseLeave(e) {
        if (e.target.classList.contains('mouse-dark')) {
          this.cursor.classList.remove('dark')
        } else {
          this.cursor.classList.remove('hover')
        }
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
  display: none;
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
  @media screen and (min-width: 60rem) {
    display: block;
  }
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
  &.dark {
    border-color: var(--color-dark);
    background: var(--color-dark);
    &+ #follower {
      border-color: var(--color-dark);
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
  --font-decorative: 'cortado', serif;
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
  transition: opacity .75s;
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
}
a {
  cursor: none;
  color: inherit;
  text-decoration: none;
  transition: color .3s;
  // &:visited {
  //   color: inherit;
  // }
  &:hover {
    color: white;
  }
}
p {
  text-transform: lowercase;
  font-size: 1rem;
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
  transition: opacity .75s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
