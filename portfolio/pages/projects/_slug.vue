<template>
  <div class="project">
    <section class="project__title-holder">
      <div class="container">
        <h2 class="project__title" ref="title">
          {{ project.title }}
        </h2>
        <div class="project__description" ref="description" v-html="project.description">
        </div>
      </div>
    </section>
    <div class="project__meta" v-if="project.meta">
      <div class="container">
        <ul class="project__meta-list" ref="meta">
          <li v-for="[key, value] in Object.entries(project.meta)" :key="key" class="project__meta-list-item">
            <h3 class="project__meta-text">
              <span class="project__meta-text-part project__meta-text-part--key">{{key}}</span>
              <span class="project__meta-text-part project__meta-text-part--value">{{value}}</span>
            </h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="project__banner">
      <figure class="project__img-holder project__img-holder--banner">
        <img :src="project.image" ref="banner" alt="" class="project__img project__img--banner">
      </figure>
    </div>
    <section class="project__section project__summary">
      <div class="container">
        <h3 class="project__section-title">Summary</h3>
        <div v-html="project.summary.content">

        </div>
      </div>
      <div class="project__section-image" :class="project.summary.class ? project.summary.class : ''">
        <figure class="project__img-holder project__img-holder--section">
          <img :data-src="project.summary.image" alt="" class="project__img project__img--section">
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
      this.$store.commit('setSplashScreen', false)
      
      const img = this.$refs.banner
      const title = this.$refs.title
      const description = this.$refs.description
      const meta = this.$refs.meta
      TweenLite.to(img, 1, {x: '-10vw'})
      TweenLite.to(title, 1, {opacity: 1, y: -16, delay: .75})
      TweenLite.to(description, 1, {opacity: 1, y: -16, delay: 1.25})
      if (meta) {
        TweenLite.to(meta, 1, {opacity: 1, y: -16, delay: 1.75})
      }

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
      if (!entry.target.src) entry.target.src = entry.target.dataset.src
      TweenLite.to(entry.target, 1, {x: '-10vw', opacity: 1, delay: .5})
    },
    fadeIn(entry) {
      TweenLite.to(entry.target, 1, {delay: .5, y: -32, opacity: 1})
    }
  }
}
</script>
<style lang="scss">
  .project {
    // position: relative;
    padding-top: 5rem;
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
      top: 1rem;
    }
    &__description {
      opacity: 0;
      position: relative;
      top: 1rem;
    }
    &__img-holder {
      overflow: hidden;
      display: block;
      width: 100vw;
      position: relative;

      &--banner {
        height: 50vh;
        @media screen and (min-width: 40rem) {
          width: 90vw;
          left: 10vw;
        }
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
      vertical-align: top;
      position: absolute;
      left: 10vw;
      top: 0;
      &--section {
        &.observable {
          opacity: 0;
        }
      }
    }
    &__meta {
      position: relative;
      @media screen and (min-width: 40rem) {
        transform: translateY(50%);
        z-index: 2;
      }
      .container {
        padding: 0;
        @media screen and (min-width: 40rem) {
          padding: 0 1.5rem;
        }
      }
      &-list {
        position: relative;
        top: 1rem;
        opacity: 0;
        list-style: none;
        padding: 0;
        display: inline-flex;
        justify-content: space-around;
        padding: 1rem 0;
        background-color: var(--color-semi-dark);
        width: 100%;
        @media screen and (min-width: 40rem) {
          padding: 1rem 2rem;
          width: auto;
        }
        &-item {
          margin: 0 .5rem;
          @media screen and (min-width: 40rem) {
            margin: 0 1rem;
          }
        }
      }
      &-text {
        font-family: var(--font-main);
        &-part {
          display: block;
          text-align: center;
          &--key {
            font-weight: 300;
            font-style: italic;
            font-size: 1rem;
            color: var(--color-semi-light);
          }
          &--value {
            font-weight: 600;
          }
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
