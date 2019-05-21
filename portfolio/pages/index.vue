<template>
  <div class="home">
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
  </div>

</template>

<script>
import Card from '~/components/atoms/Card.vue'
import { TweenLite } from 'gsap'
import observer from '~/components/modules/observer.js'
export default {
  components: {
    Card,
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects()
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
      TweenLite.to(entry.target, 1, {delay: .3, y: -64, opacity: 1})
    }
  }
}
</script>

<style lang="scss">
  main {
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
    .card {
      &.observable {
        position: relative;
        top: 4rem;
        opacity: 0;
      }
    }
  }
</style>
