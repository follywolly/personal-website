<template>
  <div>
    <Header />
    <main>
      <nuxt class="page"/>
      <div class="page-transitioner">
      </div>
    </main>
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
          setTimeout(() => {
            this.checkIfCursorAllowed()
          }, 0)
        }, 1200)
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
        this.mouse.allowed = false
        this.cursor.classList.remove('hover')
        this.cursor.classList.remove('dark')
        window.removeEventListener('mouseleave', this.onMouseLeave)
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
        window.addEventListener('mouseleave', this.onMouseLeave)
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

          TweenLite.to(this.cursor, 0, {x: this.x, y: this.y, opacity: 1})
          TweenLite.to(this.follower, .1, {x: this.x, y: this.y, opacity: .5})

          // if (this.cursor.classList.contains('hover')) {
          //   // TweenLite.to(this.cursor, .3, {rotation: 45})
          //   // TweenLite.to(this.follower, .3, {rotation: -225})
          //   TweenLite.to(this.follower, 0, {x: this.x, y: this.y, opacity: .5})
          // } else {
          //   // TweenLite.to(this.cursor, .3, {rotation: 0})
          //   // TweenLite.to(this.follower, .3, {rotation: 0})
          //   TweenLite.to(this.follower, .1, {x: this.x, y: this.y, opacity: .5})
          // }

        }
      },
      onMouseLeave() {
        console.log('fired');
        TweenLite.to(this.cursor, .3, {opacity: 0})
        TweenLite.to(this.follower, .5, {opacity: 0})
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
          TweenLite.to(this.follower, .1, {x: this.x, y: this.y, opacity: .5})
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
  width: 6px;
  height: 6px;
  border: 1px solid white; /*var(--color-light)*/
  content: "";
  position: fixed;
  top: -3px;
  left: -3px;
  background: white; /*var(--color-light);*/
  transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0s;
  pointer-events: none;
  z-index: 12;
  opacity: 0;
  cursor: none;
  @media screen and (min-width: 60rem) {
    display: block;
  }
  &.hover {
    width: 12px;
    height: 12px;
    // border-radius: 2px;
    top: -6px;
    left: -6px;
    background: rgba(255,255,255,.8);
    background: white;
    width: 4rem;
    height: 4rem;
    left: -2rem;
    top: -2rem;
    mix-blend-mode: difference;

    + #follower {
      // border-radius: 5px;
      width: 4rem;
      height: 4rem;
      top: -2rem;
      left: -2rem;
      opacity: 0;
      border-color: transparent;
      transition: transform 0s, all .3s;
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
  width: 24px;
  height: 24px;
  top: -12px;
  left: -12px;
  transition: transform .1s, all .3s;
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
  min-height: 100vh;
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--color-dark);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey);
    border: 6px solid var(--color-dark);
    border-top: 32px solid var(--color-dark);
    border-radius: 25px;
  }
}
main {
  transition: opacity .75s;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  &.in-out-link {
    overflow: hidden;
    color: transparent;
    &::after, &::before {
      position: absolute;
      content: attr(data-text);
      display: block;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      min-height: 1rem;
      text-align: center;
      transition: transform .3s;
      color: var(--color-dark);
    }
    &::before {
      left: -100%;
    }
    &::after {
      left: 0;
    }
    &:hover {
      color: transparent;
      &::after, &::before {
        color: var(--color-dark);
        transform: translate(100%, -50%);
      }
    }
    &--light {
      &::before, &::after {
        color: var(--color-light);
      }
      &:hover {
        &::before, &::after {
          color: var(--color-light);
        }
      }
    }
  }
}
button {
  cursor: none;
}
p {
  text-transform: lowercase;
  font-size: 1rem;
  font-weight: lighter;
  max-width: 35rem;
  margin: 1.5rem 0;
}
.page {
  min-height: 100vh;
}
.page-leave-active {
  transition: opacity 1s;
  & + .page-transitioner {
    transition: transform .5s cubic-bezier(1,.01,.85,1);
    transform: translateX(100vw);
  }
}
.page-leave-active {
  opacity: 0;
}
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 1s;
  & + .page-transitioner {
    transition: transform .5s cubic-bezier(1,.01,.85,1);
    transform: translateX(200vw);
  }
}
.page-transitioner {
  position: fixed;
  top: 0;
  left: -100vw;
  bottom: 0;
  width: 100vw;
  background-color: var(--color-semi-dark);
  z-index: 9;
  // transition: all .3s;
}
</style>
