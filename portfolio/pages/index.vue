<template>
  <div class="home" :class="showSplash ? 'restrained' : ''">
    <section id="projects">
      <div class="container">
        <ul class="work-holder">
          <Card v-for="(project, i) in projects" :key="project.name" :index="i + 1" :total="projects.length" :project="project" />
        </ul>
      </div>
    </section>
    <section id="contact">
      <div class="container">
        <h2>Contact</h2>
      </div>
    </section>
    <SplashScreen v-if="showSplash" />
  </div>

</template>

<script>
import Card from '~/components/atoms/Card.vue'
import SplashScreen from '~/components/organisms/SplashScreen.vue'
import { TweenLite } from 'gsap'
import observer from '~/components/modules/observer.js'
export default {
  components: {
    Card,
    SplashScreen
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects()
    },
    showSplash() {
      return this.$store.getters.getSplashScreen
    }
  },
  mounted() {
    if (!process.browser || !observer.exists) {
      return
    }

    const cards = document.querySelectorAll('.card')
    const cardIntersector = observer.generate(this.fadeIn, .25)

    cards.forEach(card => {
      card.classList.add('observable')
      cardIntersector.observe(card)
    })
  },
  methods: {
    fadeIn(entry) {
      // window.addEventListener('scroll', (e) => {
      //   const top = entry.target.getBoundingClientRect().top
      //   const perc = 1 - top / window.innerHeight
      //   if (top > 0) {
      //     TweenLite.to(entry.target, .1, {z: -100 + 100 * perc})
      //   }
      //   if (top > window.innerHeight / 2) {
      //     TweenLite.to(entry.target, .1, {z: 0 - 100 * perc})
      //   }
      // })
      const img = entry.target.querySelector('.card__image--inner')
      if (!img.src) img.src = img.dataset.src
      TweenLite.to(entry.target, 1, {delay: .3, y: -64, opacity: 1})
    }
  }
}
</script>

<style lang="scss">
  .home {
    padding-top: 5rem;
    &.restrained {
      max-height: 100vh;
      overflow-y: hidden;
    }
  }
  main {
    padding-top: 0;
    overflow-x: hidden;
  }
  .title {
    margin: 1rem 0;
    span {
      white-space: nowrap;
    }
  }
  .work-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 8rem 0;
    margin: 0;
    // perspective: 1000px;
    .card {
      &.observable {
        position: relative;
        top: 4rem;
        opacity: 0;
      }
    }
  }
</style>
