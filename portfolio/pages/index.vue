<template>
  <!-- <div class="home" :class="showSplash ? 'restrained' : ''"> -->
  <div class="home">
    <SplashScreen />

    <div class="container">
      <ul class="work-holder">
        <Card v-for="(project, i) in projects" :key="project.name" :index="i + 1" :total="projects.length" :project="project" />
      </ul>
    </div>
    <!-- <SplashScreen v-if="showSplash" /> -->
    <div class="button-section">
      <h2 class="note-button-title">Leave a visitor's note</h2>
      <div class="button-holder">
        <button class="note-button hoverable" @click="postNote('hearth')"><span>❤️</span> Love</button>
        <button class="note-button hoverable" @click="postNote('wave')"><span>👋</span> Wave</button>
        <button class="note-button hoverable" @click="postNote('eye')"><span>👁️</span> Eye see you</button>
      </div>
      <div id="input">

      </div>
    </div>
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
    showSplash() {
      return this.$store.getters.getSplashScreen
    },
    projects() {
      return this.$store.getters.getProjects()
    }
  },
  mounted() {
    if (!process.browser && !observer.exists) {
      return
    }
    if (process.browser && !observer.exists) {
      const cards = document.querySelectorAll('.card')
      cards.forEach(card => {
        const img = card.querySelector('.card__image--inner')
        img.src = img.dataset.src
      })
    }

    const cardIntersector = observer.generate(this.fadeIn, .25)
    const cards = document.querySelectorAll('.card')

    if (cards.length && cards.length > 0) {
      cards.forEach(card => {
        card.classList.add('observable')
        cardIntersector.observe(card)
      })
    }

    const buttonIntersector = observer.generate(this.fadeInButtons, .25)
    const titleIntersector = observer.generate(this.fadeInTitle, .25)

    const buttons = [...document.querySelectorAll('.note-button')]
    const buttonTitle = document.querySelector('.note-button-title')

    if (buttonTitle) {
      buttonTitle.classList.add('observable')
      titleIntersector.observe(buttonTitle)
    }
    if (buttons.length && buttons.length > 0) {
      buttons.forEach(button => {
        button.classList.add('observable')
        buttonIntersector.observe(button)
      })
    }

  },
  methods: {
    postNote(emoji) {
      const body = JSON.stringify({emoji})
      fetch('/note', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        console.log('send');
      })
      .catch(e => {
        console.log(e);
      })
    },
    fadeIn(entry) {
      const img = entry.target.querySelector('.card__image--inner')
      if (!img.src) img.src = img.dataset.src
      TweenLite.to(entry.target, 1, {delay: .3, y: -64, opacity: 1})
    },
    fadeInButtons(entry) {
      TweenLite.to(entry.target, 1, {delay: .6, y: -64, opacity: 1})
    },
    fadeInTitle(entry) {
      TweenLite.to(entry.target, 1, {delay: .3, y: -64, opacity: 1})
    }
  }
}
</script>

<style lang="scss">
  .home {
    // padding-top: 5rem;
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
  .button-section {
    padding-bottom: 20rem;
    .note-button-title {
      text-align: center;
      margin-bottom: 3rem;
      &.observable {
        position: relative;
        top: 4rem;
        opacity: 0;
      }
    }
    .button-holder {
      display: flex;
      max-width: 60rem;
      margin: 0 auto;
      justify-content: center;
      button {
        background: transparent;
        border: none;
        // border: 1px solid red;
        // padding: 1rem;
        width: 3rem;
        color: transparent;
        margin: 0 1rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        &.observable {
          position: relative;
          top: 4rem;
          opacity: 0;
        }
        span {
          color: white;
          display: block;
          font-size: 2rem;
        }
      }
    }
  }
  .work-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 8rem 0;
    margin: 0;
    min-height: 100vh;
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
