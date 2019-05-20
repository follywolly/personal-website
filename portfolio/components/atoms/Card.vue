<template>
  <div class="card" ref="card">
    <nuxt-link :to="`/projects/${project.title}`" class="card__link">
      <div class="card__image-holder" ref="image">
        <figure class="card__image">
          <img :src="project.img.src" alt="">
        </figure>
      </div>
      <div class="card__title">
        <div class="card__title-outline">
          <h3 class="title">{{project.title}}</h3>
        </div>
        <div class="card__title-body">
          <h3 class="title">{{project.title}}</h3>
        </div>
      </div>
      {{modIndex}}
      <div class="card__button">
        check out
      </div>

    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['project', 'index', 'total'],
  data() {
    return {
      coords: {
        x: 0,
        y: 0,
      },
      mouse: {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        cursor: null
      },
      counter: 0
    }
  },
  mounted() {
    if (process.browser) {
      this.cursor = document.querySelector('#cursor')
      this.$refs.card.addEventListener('mouseenter', e => {
        this.cursor.classList.add('hover')
        this.update(e)
      })
      this.$refs.card.addEventListener('mousemove', e => {
        if (this.allowUpdate) {
          this.update(e)
        }
      })
      this.$refs.card.addEventListener('mouseout', () => {
        this.cursor.classList.remove('hover')
        this.reset()
      })
      this.setOrigin(this.$refs.card)
    }

  },
  computed: {
    modIndex() {
      return this.total > 9 ? `0${this.index} / ${this.total}` : `${this.index} / ${this.total}`
    },
    allowUpdate() {
      const refreshRate = 10
      return this.counter++ % refreshRate === 0
    }
  },
  methods: {
    updatePosition(event) {
      const e = event || window.event
      const rect = e.target.getBoundingClientRect()
      this.mouse.x = (e.clientX - rect.left) - this.mouse._x
      this.mouse.y = ((e.clientY - rect.top) - this.mouse._y) * -1
    },
    setOrigin(e) {
      this.mouse._x = Math.floor(e.offsetWidth / 2)
      this.mouse._y = Math.floor(e.offsetHeight / 2)
      console.log(this.mouse._x, this.mouse._y);
    },
    reset() {
      this.$refs.image.style = `transform: rotateX(0deg) rotateY(0deg); transition: transform 1s`
    },
    update(event) {
      this.updatePosition(event)

      const x = (this.mouse.y / this.$refs.image.offsetHeight / 2).toFixed(2)
      const y = (this.mouse.x / this.$refs.image.offsetWidth / 2).toFixed(2)

      this.$refs.image.style = `transform: rotateX(${x * 20}deg) rotateY(${y * 20}deg);`
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
  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
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
    transition: opacity .5s;
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
      left: 10rem;
      z-index: 2;
      background-color: var(--color-dark);
      width: 100%;
      max-width: 30rem;
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.2);

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
        font-family: var(--font-card-headings), sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 4rem;
        transition: opacity .5s, transform .5s;
      }
    }
    &-outline {
      z-index: 2;
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
