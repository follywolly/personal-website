<template>
  <div class="card" ref="card">
    <nuxt-link :to="`/projects/${project.name}`">
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
  props: ['project', 'index'],
  data() {
    return {
      coords: {
        x: 0,
        y: 0,
      }
    }
  },
  mounted() {
    this.$refs.card.addEventListener('mousemove', this.moveCard)
    this.$refs.card.addEventListener('mouseout', this.resetCard)
  },
  computed: {
    modIndex() {
      return this.index < 9 ? '0' + this.index : this.index
    }
  },
  methods: {
    resetCard() {
      this.$refs.image.style = `transform: rotateX(0) rotateY(0deg); transition: transform 1s`

    },
    moveCard(e) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left; //x position within the element.
      const y = (e.clientY - rect.top) * -1;
      this.coords = {x, y}

      const degs = this.calcRange(x, y, rect, [-5, 5])

      this.$refs.image.style = `transform: rotateX(${degs.x}deg) rotateY(${degs.y}deg);`

    },
    calcRange(x, y, rect, minmax) {
      const [min, max] = minmax
      const range = Math.abs(min - max)
      const position = {x: x / rect.width * range, y: y / rect.height * range}
      const degs = {x: (min + position.x).toFixed(2), y: (min + position.y).toFixed(2)}
      return degs
    }
  }
}

</script>
<style lang="scss">
.card {
  position: relative;
  width: 100%;
  max-width: 30rem;
  min-height: 15rem;
  margin-bottom: 10rem;
  cursor: pointer;
  perspective: 1000px;
  &__button {
    position: absolute;
    bottom: 0;
    left: -2rem;
    color: white;
    padding-left: 3rem;
    opacity: 0;
    transition: opacity .25s, transform .25s;
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
    max-height: 15rem;
    overflow: hidden;
    transition: opacity .5s;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition: transform .5s;
    }
    &-holder {
      transition: transform 0;

      transform-style: preserve-3d;
      position: absolute;
      left: 10rem;
      z-index: 2;
      background-color: var(--color-dark);
      width: 100%;
      max-width: 30rem;
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.2);
      &:hover {
        img {
          transform: scale(1.25);
          transition: transform 10s ease-out;
        }
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
        font-family: var(--font-main), sans-serif;
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
