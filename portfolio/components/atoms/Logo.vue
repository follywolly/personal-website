<template>
  <div class="logo">
    <nuxt-link to="/" aria-label="Navigate to home screen">
      <div class="eye__holder">
        <div class="eye__lashes">
        </div>
        <div id="eye" class="eye">
          <div class="eye__iris" :style="'transform: rotate('+(rot + 180) +'deg)'">
          </div>
        </div>
      </div>

    </nuxt-link>
  </div>
</template>
<script>
import { TweenLite } from 'gsap'
export default {
  data() {
    return {
      rot: 90
    }
  },
  methods: {
    boundaries() {
      const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0]
      return {
        width: w.innerWidth || e.clientWidth || g.clientWidth,
        height: w.innerHeight|| e.clientHeight|| g.clientHeight
      }
    }
  },
  mounted() {
    if (!process.browser) {
      return
    }
    const eye = document.querySelector('#eye')

    const getCursorXY = e => {
      const eye = document.querySelector('#eye')

      const x = eye.offsetLeft + (eye.offsetWidth / 2)
      const y = eye.offsetTop + (eye.offsetHeight / 2)

      const rad = Math.atan2(event.clientX - x, event.clientY - y)
      this.rot = (rad * (180 / Math.PI) * -1) + 180
    }

    if (window.Event) {
      document.captureEvents(Event.MOUSEMOVE);
    }
    document.addEventListener('mousemove', getCursorXY)
  }
}
</script>


<style lang="scss" scoped>

.eye {
  width: 3.5rem;
  height: 3.5rem;
  border: 2px solid white;
  border-radius: 5px 80%;
  position: relative;
  transform: rotate(-45deg) scale(.5);
  overflow: hidden;
  margin-top: -.75rem;
  z-index: 4;
  // transition: transform 1s, width 1s, height 1s, margin 1s;
  &__holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__lashes, &__lashes::after, &__lashes::before {
    content: "";
    width: 1px;
    height: .3rem;
    position: relative;
    background-color: white;
    display: block;
    border-radius: 0;
    z-index: 4;
  }
  &__lashes::before, &__lashes::after {
    position: absolute;
    left: -1rem;
    top: .2rem;
    transform: rotate(-40deg);
  }
  &__lashes::after {
    left: auto;
    right: -1rem;
    transform: rotate(40deg);
  }
  &__iris {
    border-radius: 50%;
    width: calc(3rem + 4px);
    height: calc(3rem + 4px);
    position: absolute;
    top: 0;
    left: calc(.25rem - 4px);
    border: 2px solid white;
    &::after {
      width: 1rem;
      height: 1rem;
      border: 2px solid white;
      position: absolute;
      bottom: .7rem;
      left: .7rem;
      content: "";
      border-radius: 50%;
    }
  }
}
.logo {
  width: 3rem;
  path {
    fill: var(--color-light);
  }
}
</style>
