<template>
  <li class="card" ref="card">
    <nuxt-link :to="`/projects/${slug}`" class="card__link no-hover">
      <div class="card__image-holder" ref="image">
        <figure class="card__image">
          <img class="card__image--inner" :data-src="project.image" alt="">
        </figure>
      </div>
      <div class="card__title" ref="title">
        <div class="card__title-outline">
          <h3 class="title">{{project.title}}</h3>
        </div>
        <div class="card__title-body">
          <h3 class="title">{{project.title}}</h3>
        </div>
      </div>
      <div class="card__count"><span class="card__count-current">{{modIndex}}</span> / {{total}}</div>
      <div class="card__button">
        {{project.meta.date}}
      </div>

    </nuxt-link>
  </li>
</template>
<script>
import { TweenLite } from 'gsap'
import helpers from '~/components/modules/helpers.js'
export default {
  props: ['project', 'index', 'total'],
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
  mounted() {
    if (process.browser) {
      this.mouse.cursor = document.querySelector('#cursor')
      this.checkIfHoverAllowed()
    }

  },
  computed: {
    modIndex() {
      return this.total > 9 ? '0' + this.index : this.index
    },
    allowUpdate() {
      const refreshRate = 10
      return this.counter++ % refreshRate === 0
    },
    slug() {
      const sanitized = this.project.title.replace(/[^A-Za-z0-9\s]/g,'').toLowerCase()
      return sanitized.split(' ').join('-')
    }
  },
  methods: {
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
      this.mouse.cursor.classList.remove('hover--project')
      const image = this.$refs.image
      if (image) {
        image.style = `transform: rotateX(0deg) rotateY(0deg); transition: transform 1s`
      }
    },
    update(event) {
      if (!this.allowUpdate) return

      if (!this.mouse.cursor.classList.contains('hover')) {
        this.mouse.cursor.classList.add('hover')
      }
      if (!this.mouse.cursor.classList.contains('hover--project')) {
        this.mouse.cursor.classList.add('hover--project')
      }
      this.updatePosition(event)

      const x = (this.mouse.y / this.$refs.image.offsetHeight / 2)
      const y = (this.mouse.x / this.$refs.image.offsetWidth / 2)
      const image = this.$refs.image
      if (image) {
        image.style = `transform: rotateX(${x * 30}deg) rotateY(${y * 30}deg);`
      }
    }
  }
}

</script>
<style lang="scss">
.card {
  position: relative;
  width: 100%;
  max-width: 40rem;
  min-height: 15rem;
  margin-bottom: 10rem;
  perspective: 1000px;
  &:hover {
    .card__image {
      transform: scale(1.15);
    }
  }
  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    &:focus {
      outline: none;
      .card__image {
        transform: scale(1.10);
      }
    }

  }
  &__count {
    font-size: .875rem;
    &-current {
      font-size: 1.5rem;
      font-weight: 900;
    }
  }
  &__button {
    position: absolute;
    bottom: 0;
    left: -2rem;
    color: white;
    padding-left: 3rem;
    opacity: 0;
    transition: opacity .25s, transform .25s;
    pointer-events: none;
    &::before {
      position: absolute;
      left: 0;
      width: 2rem;
      height: 2px;
      background-color: white;
      content: "";
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__image {
    opacity: .5;
    width: 100%;
    height: 15rem;
    overflow: hidden;
    transition: opacity .5s, transform .75s cubic-bezier(0.165, 0.84, 0.44, 1);
    background-color: var(--color-semi-dark);
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: transform .5s;
    }
    &-holder {
      pointer-events: none;
      transition: transform 0;
      transform-style: preserve-3d;
      position: absolute;
      left: 50%;
      z-index: 2;
      background-color: var(--color-dark);
      width: 100%;
      max-width: 30rem;
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.2);
      @media screen and (min-width: 50rem) {
        left: 12.5rem;
      }

    }
  }
  &__title {
    position: relative;
    height: 2rem;
    pointer-events: none;
    &-outline, &-body {
      position: absolute;
      top: 5rem;
      left: 0;
      transition: opacity .5s, transform .5s;
      .title {
        font-family: var(--font-decorative);
        font-weight: 400;
        font-style: normal;
        font-size: 4rem;
        transition: opacity .5s, transform .5s;
      }
    }
    &-outline {
      z-index: 3;
      .title {
        color: transparent;
        -webkit-text-stroke: 1px white;
      }
    }
    &-body {
      .title {
        &:hover {
          opacity: 0;
        }
      }
    }

  }
  &:hover {
    .card__image {
      opacity: 1;
      img {
        transform: scale(1.25);
        transition: transform 10s ease-out;
      }
    }
    .card__button {
      opacity: 1;
      transform: translateX(2rem);
      transition: opacity .5s, transform .5s;
    }
    // .card__title {
    //   &-body {
    //     .title {
    //       opacity: 1;
    //     }
    //     z-index: 4;
    //   }
    // }
  }
}
</style>
