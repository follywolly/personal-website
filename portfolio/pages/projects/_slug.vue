<template>
  <div class="project">
    <section class="project__title-holder">
      <div class="container">
        <h2 class="project__title" ref="title">
          {{ project.title }}
        </h2>
        <p class="project__description" ref="description">
          {{ project.description }}
        </p>
      </div>
    </section>
    <div class="project-banner">
      <figure class="project__img-holder project__img-holder--banner">
        <img :src="project.image" ref="banner" alt="" class="project__img project__img--banner">
      </figure>
    </div>
    <section class="project__section project__summary">
      <div class="container">
        <h3 class="project__section-title">Summary</h3>
        <div v-html="project.summary_content">

        </div>
      </div>
      <div class="project__section-image">
        <figure class="project__img-holder project__img-holder--section">
          <img :src="project.summary_image" alt="" class="project__img project__img--section">
        </figure>
      </div>
    </section>

  </div>


</template>
<script>
import { TweenLite } from 'gsap'
import observer from '~/components/modules/observer.js'

export default {
  computed: {
    project() {
      return this.$store.getters.getProjects(this.$route.params.slug)
    }
  },
  mounted() {
    if (process.browser) {
      const img = this.$refs.banner
      const title = this.$refs.title
      const description = this.$refs.description
      TweenLite.to(img, 1, {x: "-100vw"})
      TweenLite.to(title, 1, {opacity: 1, y: -10, delay: .5})
      TweenLite.to(description, 1, {opacity: 1, y: -10, delay: 1})

      if (observer.exists) {
        const titles = document.querySelectorAll('.project__section-title')
        const paragraphs = document.querySelectorAll('.project__section p')
        const images = document.querySelectorAll('.project__img--section')

        const titleIntersector = observer.generate(this.slideInLeft)
        const paragraphIntersector = observer.generate(this.fadeIn)
        const imageIntersector = observer.generate(this.slideInRight, 0.01)

        titles.forEach(title => {
          title.classList.add('observable')
          titleIntersector.observe(title)
        })
        paragraphs.forEach(paragraph => {
          paragraph.classList.add('observable')
          paragraphIntersector.observe(paragraph)
        })
        images.forEach(image => {
          image.classList.add('observable')
          imageIntersector.observe(image)
        })
      }

    }
  },
  methods: {
    slideInLeft(entry) {
      TweenLite.to(entry.target, 1, {delay: .5, x: 32, opacity: 1})
    },
    slideInRight(entry) {
      TweenLite.to(entry.target, 1, {x: '-80vw', opacity: 1, delay: .5})
    },
    fadeIn(entry) {
      TweenLite.to(entry.target, 1, {delay: .5, y: -32, opacity: 1})
    }
  }
}
</script>
<style lang="scss">
  .project {
    p {
      max-width: 30rem;
      margin: 1rem 0;
    }
    &__title {
      font-size: 4rem;
      font-family: var(--font-decorative);
      color: transparent;
      -webkit-text-stroke: 1px var(--color-light);
      font-weight: 400;
      margin-bottom: .5em;
      opacity: 0;
      position: relative;
      top: 10px;
    }
    &__description {
      opacity: 0;
      position: relative;
      top: 10px;
    }
    &__img-holder {
      overflow: hidden;
      display: block;
      width: 100%;
      position: relative;
      &--banner {
        height: 50vh;
      }
      &--section {
        min-height: 10rem;
        height: 80vh;
      }
    }
    &__img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      background-color: var(--color-semi-dark);
      &--banner {
        position: absolute;
        left: 100vw;
        top: 50%;
        transform: translateY(-50%);
      }
      &--section {
        &.observable {
          opacity: 0;
          position: absolute;
          left: 80vw;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &__section {
      .container {
        padding: 6rem 2rem;
      }
      &-title {
        font-size: 3rem;
        &.observable {
          position: relative;
          left: -2rem;
          opacity: 0;
        }
      }
      p {
        &.observable {
          position: relative;
          top: 2rem;
          opacity: 0;
        }
      }
    }
  }
</style>
