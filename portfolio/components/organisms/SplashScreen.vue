<template>
  <div class="intro-holder" ref="holder">
    <div class="intro" ref="card">
      <div class="intro__image" ref="image">
        <img src="images/eye.png" alt="">
      </div>
      <h2 class="intro__title">
        <div class="intro__title-fg"><span class="intro__title-part">Folkert</span><span class="intro__title-part">-Jan</span></div>
        <div class="intro__title-bg" aria-hidden><span class="intro__title-part intro__title-part--bg">Folkert</span><span class="intro__title-part intro__title-part--bg">-Jan</span></div>
      </h2>
      <p ref="text" class="intro__sub">Portfolio of a designer who loves to code</p>

      <div class="intro__loader">
        <div class="intro__loader-inner" ref="loader">
        </div>
      </div>
    </div>
    <div ref="button" class="intro__link mouse-dark">
      <button @click="toggleSplashScreen">enter</button>
    </div>
  </div>

</template>

<script>
import { TweenLite } from 'gsap'
import helpers from '~/components/modules/helpers.js'
export default {
  data() {
    return {
      mouse: {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        cursor: null,
        allowed: false
      },
      counter: 0
    }
  },
  computed: {
    allowUpdate() {
      const refreshRate = 10
      return this.counter++ % refreshRate === 0
    }
  },
  mounted() {
    if (!process.browser) {
      return
    }
    this.mouse.cursor = document.querySelector('#cursor')
    const image = this.$refs.image
    const textTops = document.querySelectorAll('.intro__title-part')
    const textBgs = [textTops[2], textTops[3]]
    const text = this.$refs.text
    const button = this.$refs.button

    TweenLite.to(image, 1, {y: '-10vh', opacity: 1, delay: .5, onComplete: () => {
      this.checkIfHoverAllowed()
    }})
    TweenLite.to(textTops[0], 1, {x: '10vw', opacity: 1, delay: 1})
    TweenLite.to(textBgs[0], 1, {x: '10vw', opacity: 1, delay: 1})
    TweenLite.to(textTops[1], 1, {x: '-10vw', opacity: 1, delay: 1.5})
    TweenLite.to(textBgs[1], 1, {x: '-10vw', opacity: 1, delay: 1.5})
    TweenLite.to(text, 1, {x: '10vw', opacity: 1, delay: 3})
    TweenLite.to(button, 1, {y: '-10vh', opacity: 1, delay: 4.5, onComplete: () => {
      this.initLoader()
    }})
  },
  methods: {
    toggleSplashScreen() {
      this.mouse.cursor.classList.remove('hover')
      this.mouse.cursor.classList.remove('dark')
      if (!this.$refs.holder) {
        return
      }
      TweenLite.to(this.$refs.holder, 1, {opacity: 0, onComplete: () => {
        this.$store.commit('setSplashScreen', false)
      }})
    },
    initLoader() {
      const loader = this.$refs.loader
      if (!loader) {
        setTimeout(() => {
          this.toggleSplashScreen()
        }, 9000)
        return
      }
      TweenLite.to(loader, 9, {width: '100%', ease: Linear.easeNone, delay: 1, onComplete: () => {
        this.toggleSplashScreen()
      }})
    },
    checkIfHoverAllowed() {
      if (process.browser && helpers.getWindowSize().width > 1024 && !this.mouse.allowed) {
        this.initHover()
      }
      if (process.browser && helpers.getWindowSize().width < 1024 && this.mouse.allowed) {
        this.resetHover()
      }
      window.addEventListener('resize', this.checkIfHoverAllowed)
    },
    initHover() {
      this.mouse.allowed = true
      const card = this.$refs.card
      if (!card) return
      card.addEventListener('mousemove', this.update)
      card.addEventListener('mouseout', this.reset)
      this.setOrigin(card)
    },
    resetHover() {
      this.mouse.allowed = false
      const card = this.$refs.card
      if (card) {
        card.removeEventListener('mousemove', this.update)
        card.removeEventListener('mouseout', this.reset)
      }
    },
    updatePosition(event) {
      const e = event || window.event
      const rect = e.target.getBoundingClientRect()
      this.mouse.x = (e.clientX - rect.left) - this.mouse._x
      this.mouse.y = ((e.clientY - rect.top) - this.mouse._y) * -1
    },
    setOrigin(e) {
      this.mouse._x = Math.floor(e.offsetWidth / 2)
      this.mouse._y = Math.floor(e.offsetHeight / 2)
    },
    reset() {
      this.mouse.cursor.classList.remove('hover')
      this.$refs.image.style = `transform: rotateX(0deg) rotateY(0deg) translateY(-10vh); transition: transform 1s; opacity: 1;`
    },
    update(event) {
      if (!this.allowUpdate) return
      this.updatePosition(event)

      const x = (this.mouse.y / this.$refs.image.offsetHeight / 2).toFixed(2)
      const y = (this.mouse.x / this.$refs.image.offsetWidth / 2).toFixed(2)

      this.$refs.image.style = `transform: rotateX(${x * 30}deg) rotateY(${y * 30}deg) translateY(-10vh); opacity: 1;`
    }
  }
}
</script>

<style lang="scss">
  .intro {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    height: 100vh;
    width: 100%;
    background: var(--color-dark);
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    // position: relative;
    perspective: 1000px;
    &__sub {
      pointer-events: none;
      position: absolute;
      top: 17.5vh;
      left: 5vw;
      max-width: 70vw;
      opacity: 0;
      z-index: 4;
      color: white;
      font-size: 1.5rem;
      @media screen and (min-width: 40rem) {
        top: 20vh;
        left: 40vw;
      }
    }
    &__title {
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      font-size: 3rem;
      margin: 0;
      @media screen and (min-width: 40rem) {
        font-size: 5rem;
      }
      @media screen and (min-width: 60rem) {
        font-size: 7rem;
      }
      &-part {
        display: block;
        position: absolute;
        white-space: nowrap;
        color: transparent;
        -webkit-text-stroke: 1px white;
        opacity: 0;
        &:first-of-type {
          top: 45vh;
          left: 1rem;
          @media screen and (min-width: 40rem) {
            left: 20vw;
            top: 35vh;
          }
        }
        &:last-of-type {
          top: 50vh;
          left: 70vw;
          @media screen and (min-width: 40rem) {
            left: 60vw;
          }
        }
        &--bg {
          color: white;
        }
      }
      &-fg, &-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
      }
      &-bg {
        z-index: 2;
      }
      &-fg {
        z-index: 4;
      }
    }
    &__image {
      transition: transform 0;
      transform-style: preserve-3d;
      z-index: 3;
      position: relative;
      background: var(--color-dark);
      opacity: 0;
      top: 35vh;
      width: 60%;
      max-width: 20rem;
      pointer-events: none;
      @media screen and (min-width: 40rem) {
        top: 25vh;
      }
      img {
        opacity: .5;
        width: 100%;
      }
    }
    &__link {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3vh;
      opacity: 0;
      z-index: 4;
      transition: color .3s, background .3s;
      button {
        border: 1px solid white;
        background: white;
        color: var(--color-dark);
        padding: .3rem 3rem;
        transition: all .3s;
        font-size: 1.25rem;
        font-family: var(--font-main);
        &:hover {
          transform: scale(1.125);
        }
      }

    }
    &__loader {
      width: 100vh;
      height: .25rem;
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: top left;
      transform: rotate(-90deg);
      @media screen and (min-width: 40rem) {
        width: 100vw;
        transform: rotate(0);
      }
      &-inner {
        display: block;
        background-color: var(--color-grey);
        content: "";
        height: .25rem;
        width: 0;
      }
    }

  }
</style>
