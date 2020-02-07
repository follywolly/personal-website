<template>
  <div>
    <Header />
    <main>
      <nuxt class="page"/>
      <div class="page-transitioner">
      </div>
      <footer class="container footer">
        <div class="footer-content">
          © 2020 - Folkert-Jan van der Pol
        </div>
        
      </footer>
    </main>
    <div class="cursor cursor-pointer"></div>
    <div class="cursor cursor-content">
      <div class="cursor__text cursor__text--project" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon"><path class="icon__path" d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
      </div>
      <div class="cursor__text cursor__text--scroll" aria-hidden="true">
        <svg height="360" width="360" viewBox="-180 -180 360 360" xmlns:xlink="http://www.w3.org/1999/xlink" class="circle">
          <defs><path id="circle" class="circle__path" d="M-90 0A90 90 0 1190 0 90 90 0 11-90 0z"></path></defs>
          <text><textPath xlink:href="#circle" class="circle__text">scroll down for work · scroll down for work · scroll down for work · </textPath></text>
        </svg>
      </div>
      <div class="cursor__text cursor__text--external" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="icon"><path class="icon__path" d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/></svg>
      </div>
    </div>
    <div class="cursor cursor-follower"></div>
    
  </div>

</template>

<script>
  import Header from '~/components/organisms/Header.vue'
  import helpers from '~/components/modules/helpers.js'
  // import config from '~/components/modules/config.js'

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
        cursor: {
          pointer: null,
          content: null,
          follower: null
        },
        follower: null,
        hoverables: []
      }

    },
    mounted() {
      this.cursor.pointer = document.querySelector('.cursor-pointer')
      this.cursor.content = document.querySelector('.cursor-content')
      this.cursor.follower = document.querySelector('.cursor-follower')
      this.checkIfCursorAllowed()
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
        if (process.browser && helpers.getWindowSize().width >= 60 * 16 && !this.mouse.allowed) {
          this.initCursor()
        }
        if (process.browser && helpers.getWindowSize().width < 60 * 16 && this.mouse.allowed) {
          this.resetCursor()
        }
        window.addEventListener('resize', this.checkIfCursorAllowed)
      },
      resetCursor() {
        this.mouse.allowed = false
        this.cursor.pointer.classList.remove('hover')
        this.cursor.pointer.classList.remove('hover--project')
        this.cursor.pointer.classList.remove('above-fold')
        window.removeEventListener('mouseleave', this.onMouseLeave)
        window.removeEventListener('mousemove', this.onMouseMove)
        this.hoverables.forEach(hoverable => {
          hoverable.removeEventListener('mouseenter', this.onHoverableMouseEnter)
          hoverable.removeEventListener('mouseleave', this.onHoverableMouseLeave)
        })
      },
      initCursor() {
        this.mouse.allowed = true
        const links = [...document.querySelectorAll('a')].filter(link => !link.classList.contains('no-hover'))
        const buttons = [...document.querySelectorAll('button')]
        this.hoverables = links.concat(buttons)
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

          TweenLite.to(this.cursor.pointer, 0, {x: this.x, y: this.y, opacity: 1})
          TweenLite.to(this.cursor.content, 0, {x: this.x, y: this.y, opacity: 1})
          TweenLite.to(this.cursor.follower, .1, {x: this.x, y: this.y, opacity: .5})
        }
      },
      onMouseLeave() {
        TweenLite.to(this.cursor.pointer, .3, {opacity: 0})
        TweenLite.to(this.cursor.content, .3, {opacity: 0})
        TweenLite.to(this.cursor.follower, .5, {opacity: 0})
      },
      onHoverableMouseEnter(e) {
        this.cursor.pointer.classList.add('hover')
      },
      onHoverableMouseLeave(e) {
        this.cursor.pointer.classList.remove('hover')
        TweenLite.to(this.cursor.follower, .1, {x: this.x, y: this.y, opacity: .5})
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
.cursor {
  display: none;
  position: fixed;
  pointer-events: none;
  z-index: 12;
  opacity: 0;
  @media screen and (min-width: 60rem) {
    display: block;
  }
  &-pointer, &-content, &-follower {
    transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0s;
    position: fixed;
  }
  &-pointer {
    content: "";
    border-radius: 50%;
    width: 6px;
    height: 6px;
    top: -3px;
    left: -3px;
    mix-blend-mode: difference;
    background: red;
    background: #E53E3E;
  }
  &-content {
    width: 5rem;
    height: 5rem;
    top: -2.5rem;
    left: -2.5rem;
    .cursor__text {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: none;
      transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
      &--scroll {
        .circle {
          opacity: 0;
          overflow: visible;
          width: 18rem;
          height: 18rem;
          position: relative;
          top: .15rem;
          transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
          &__text {
            text-transform: uppercase;
            font-size: .85rem;
            fill: var(--color-light);
          }
        }
      }
      &--external {
        margin-top: 0;
      }
      .icon {
        margin-left: auto;
        margin-right: auto;
        &__path {
          fill: var(--color-light);
        }
      }
      span {
        display: block;
      }
    }
  }
  &-follower {
    content: "";
    position: fixed;
    border: 1px solid var(--color-semi-light);
    // background: blue;
    width: 1.5rem;
    height: 1.5rem;
    top: -.75rem;
    left: -.75rem;
    transition: transform .1s, all .6s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 11;
    border-radius: 50%;
  }
  &.above-fold {
    &~.cursor { 
      &-content  {
        .cursor__text--scroll {
          opacity: 1;
          .circle {
            opacity: 1;
          }
        }
      }
      &-follower {
        width: 8rem;
        height: 8rem;
        left: -4rem;
        top: -4rem;
      }
    }
  }
  &.hover {
    &.cursor-pointer {
      width: 5rem;
      height: 5rem;
      left: -2.5rem;
      top: -2.5rem;
    }
    &~.cursor {
      &-content {
        .cursor__text--scroll {
          opacity: 0;
        }
      }
      &-follower {
        width: 5rem;
        height: 5rem;
        left: -2.5rem;
        top: -2.5rem;
        opacity: 0;
        border-color: transparent;
        transition: transform 0s, all .3s;
      }
    }
    &.hover--external {
      &~.cursor {
        &-content {
          .cursor__text--external {
            opacity: 1;
            transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
        }
      }
      
    }
    &.hover--project {
      &~.cursor {
        &-content {
          .cursor__text--project {
            opacity: 1;
            transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
        }
      }
    }
  }
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
    // border-top: 32px solid var(--color-dark);
    border-radius: 25px;
  }
  @media screen and (min-width: 60rem) {
    cursor: none;
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
  // min-height: 100vh;
}
a {
  color: inherit;
  text-decoration: none;
  transition: color .3s;
  @media screen and (min-width: 60rem) {
    cursor: none;
  }
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
  @media screen and (min-width: 60rem) {
    cursor: none;
  }
}
p {
  text-transform: lowercase;
  font-size: 1rem;
  font-weight: lighter;
  max-width: 35rem;
  margin: 1.5rem 0;
}

.text {
  &-center {
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  &-small{
    font-size: .75rem;
    opacity: .75;
  }
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
.footer {
  padding-bottom: 2rem;
  &-content {
    opacity: .5;
    text-transform: lowercase;
    @media screen and (min-width: 40rem) {
      padding: 0 0 0 4rem;
    }
    @media screen and (min-width: 50rem) {
      padding: 0 8rem 0;
    }
  }
}
</style>
