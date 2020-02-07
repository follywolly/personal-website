<template>
  <!-- <div class="home" :class="showSplash ? 'restrained' : ''"> -->
  <div class="home">
    <SplashScreen />
    
    <button ref="button" @click="scrollDown" class="home__scroll-button">scroll for work<div ref="button_after" class="home__scroll-button--after"></div></button>

    <div class="container">
      <ul class="work-holder">
        <Card v-for="(project, i) in projects" :key="project.name" :index="i + 1" :total="projects.length" :project="project" />
      </ul>
      <GithubList />
      <MediumList />
    </div>
  </div>
</template>

<script>
import Card from '~/components/atoms/Card.vue'
import GithubList from '~/components/molecules/GithubList.vue'
import MediumList from '~/components/molecules/MediumList.vue'
import SplashScreen from '~/components/organisms/SplashScreen.vue'
import { TweenLite } from 'gsap'
import observer from '~/components/modules/observer.js'
export default {
  head: {
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js'}
    ]
  },
  data() {
    return {
      timeout: false,
      counter: 0,
      cursor_scroll_treshold: 0
    }
  },
  components: {
    Card,
    SplashScreen,
    GithubList,
    MediumList
  },
  computed: {
    showSplash() {
      return this.$store.getters.getSplashScreen
    },
    projects() {
      return this.$store.getters.getProjects()
    },
    allowUpdate() {
      const refreshRate = 1
      return this.counter++ % refreshRate === 0
    }
  },
  mounted() {
    if (!process.browser) {
      return
    }
    if (window.innerWidth < 60 * 16) {
      window.addEventListener('scroll', this.onScroll)

      TweenLite.to(this.$refs.button, .5, {opacity: 1, delay: 3, onComplete: () => {
        if (this.$refs.button_after) {
          this.$refs.button_after.classList.add('animate')
        }
      }})
    } else {
      const cursor = document.querySelector('.cursor-pointer')
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
      this.cursor_scroll_treshold = window.innerHeight / 4 * 3
      if (scrollTop < this.cursor_scroll_treshold) {
        setTimeout(() => {
          if (scrollTop < this.cursor_scroll_treshold) {
            cursor.classList.add('above-fold')
            window.addEventListener('scroll', this.cursorOnScroll)
          }
        }, 4000)
      }
    }
    

    if (process.browser && !observer.exists) {
      const cards = document.querySelectorAll('.card')
      cards.forEach(card => {
        const img = card.querySelector('.card__image--inner')
        img.src = img.dataset.src
      })
      return
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
    const conditionsIntersector = observer.generate(this.fadeInConditions, .25)

    const buttons = [...document.querySelectorAll('.note-button')]
    const buttonTitle = document.querySelector('.note-button-title')
    const buttonConditions = document.querySelector('.note-button-conditions')

    if (buttonTitle) {
      buttonTitle.classList.add('observable')
      titleIntersector.observe(buttonTitle)
    }
    if (buttonConditions) {
      buttonConditions.classList.add('observable')
      conditionsIntersector.observe(buttonConditions)
    }
    if (buttons.length && buttons.length > 0) {
      buttons.forEach(button => {
        button.classList.add('observable')
        buttonIntersector.observe(button)
      })
    }

  },
  methods: {
    cursorOnScroll(){
      if (this.allowUpdate) {
        const cursor = document.querySelector('.cursor-pointer')
        const scrollText = document.querySelector('.cursor-content .circle')
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        TweenLite.to(scrollText, .1, {rotation: Math.round(scrollTop / 5)})
        if (scrollTop > this.cursor_scroll_treshold) {
          window.removeEventListener('scroll', this.cursorOnScroll)
          cursor.classList.remove('above-fold')
        }
      }
      
    },
    onScroll(e) {
      if (this.timeout) {
		    window.cancelAnimationFrame(this.timeout);
	    }

        // Setup the new requestAnimationFrame()
      this.timeout = window.requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight && this.$refs.button) {
          this.$refs.button.style = `opacity: ${1 - (window.scrollY / window.innerHeight * 2.5)};`
        }
        
      })
    },
    scrollDown() {
      TweenLite.to(window, 1, {scrollTo: window.innerHeight})
    },
    fadeIn(entry) {
      const img = entry.target.querySelector('.card__image--inner')
      if (!img.src) img.src = img.dataset.src
      TweenLite.to(entry.target, 1, {delay: .3, y: -64, opacity: 1})
    },
    fadeInButtons(entry) {
      TweenLite.to(entry.target, 1, {delay: .3, y: -48, opacity: 1})
    },
    fadeInTitle(entry) {
      TweenLite.to(entry.target, 1, {delay: .3, y: -48, opacity: 1})
    },
    fadeInConditions(entry) {
      TweenLite.to(entry.target, 1, {delay: .9, y: -48, opacity: 1})
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
    &__scroll-button {
      &:focus {
        outline: none;
      }
      opacity: 0;
      bottom: 1rem;
      z-index: 24;
      appearance: none;
      color: var(--color-grey);
      position: absolute;
      padding-top: 1rem;
      padding-bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font: inherit;
      background: none;
      border: none;
      @media screen and (min-width: 60rem) {
        display: none;
      }
      &--after {
        position: absolute;
        top: 3rem;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 1px;
        height: 0;
        background-color: var(--color-grey);
        &.animate {
          animation: scroll 2s linear infinite;
          @keyframes scroll {
            0% {
              transform: translateY(0);
              height: 0;
            }
            50% {
              transform: translateY(0);
              height: 2.5rem;
            }
            100% {
              height: 0;
              transform: translateY(2.5rem);
            }
          }
        }
      }
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
        top: 3rem;
        opacity: 0;
      }
    }
    .note-button-conditions {
      max-width: 16rem;
      &.observable {
        position: relative;
        top: 3rem;
        opacity: 0;
      }
    }
    .button-holder {
      display: flex;
      max-width: 60rem;
      margin: 0 auto 2rem;
      justify-content: center;
      button {
        background: transparent;
        border: none;
        // border: 1px solid red;
        // padding: 1rem;
        width: 4rem;
        color: transparent;
        margin: 0 1rem;
        text-align: center;
        white-space: nowrap;
        // overflow: hidden;
        &:focus, &:hover {
          outline: none;
          span {
            transform: scale(1.1);
          }
        }
        &.observable {
          position: relative;
          top: 3rem;
          opacity: 0;
        }
        span {
          color: white;
          display: block;
          font-size: 2rem;
          position: relative;
          transition: transform .3s;
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            opacity: .5;
            width: 100%;
            height: 100%;
            text-align: center;
            content: attr(data-content);
          }
          &.clicked {
            &::after {
              transition: all 2s;
              transform: translateY(-100vh);
              opacity: 0;
            }
          }
        }
      }
    }
  }
  .work-holder {
    list-style: none;
    padding: 4rem 0;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    // perspective: 1000px;
    @media screen and (min-width: 40rem) {
      padding: 4rem;
    }
    @media screen and (min-width: 50rem) {
      padding: 4rem 8rem;
    }
    .card {
      &:nth-of-type(even) {
        margin-left: auto;
      }
      &.observable {
        position: relative;
        top: 4rem;
        opacity: 0;
      }
    }
  }
</style>
