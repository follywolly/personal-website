<template>
  <div>
    <div v-if="!error" class="medium-container">
      <h2 class="medium-title observable">Medium articles</h2>
      <ul class="medium-list" v-if="!loading">
        <li v-for="publication in publications" :key="publication.title" class="medium-list__item">
          <a :href="publication.link" target="_blank" class="medium-list__item-link">
            <img v-if="publication.thumbnail" class="medium-list__item-img" :src="publication.thumbnail" alt="">
            <h3 class="medium-list__item-title">{{publication.title}}</h3>
          </a>
        </li>
      </ul>
      <div class="medium-list--loader" v-else>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve" class="icon">
        <rect x="0" y="10" width="4" height="10" fill="var(--color-semi-light)" opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="8" y="10" width="4" height="10" fill="var(--color-semi-light)"  opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="16" y="10" width="4" height="10" fill="var(--color-semi-light)"  opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </svg>
      <span>Fetching medium publications...</span>
    </div>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'
import observer from '~/components/modules/observer.js'
import tokens from '~/components/modules/config.js'
export default {
  data() {
    return {
      error: false,
      loading: true,
      publications: [],
      observables: []
    }
  },
  mounted() {
    this.getMediumPublications()
    if (!observer.exists && !process.browser) {
      return
    }

    const title = document.querySelector('.medium-title')

    if (!observer.exists) {
      title.classList.remove('observable')
    }
    
    title.classList.add('observable')
    this.createFadeInObserver(title, this.fadeIn)

    const loader = document.querySelector('.medium-list--loader')
    loader.classList.add('observable')
    this.createFadeInObserver(loader, this.fadeIn)
    

  },
  methods: {
    createFadeInObserver(entry, animator) {
      const entryObserver = observer.generate(animator, .25)
      entryObserver.observe(entry)
    },
    setListeners() {
      const items = document.querySelectorAll('.medium-list__item')
      const cursor = document.querySelector('.cursor-pointer')
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          cursor.classList.add('hover')
          cursor.classList.add('hover--external')
        })
        item.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover')
          cursor.classList.remove('hover--external')
        })
      })

      if (!observer.exists) {
        return
      }
      const itemIntersector = observer.generate(this.fadeInItems, .25)

      this.observables = [...items]

      items.forEach(item => {
        item.classList.add('observable')
        itemIntersector.observe(item)
      })
    },
    fadeInItems(entry) {
      const index = this.observables.findIndex(node => node === entry.target)
      const factor = window.innerWidth < 50 * 16 ? .3 : (.2 * (index + 1))
      const timing = window.innerWidth < 50 * 16 ? .5 : .75
      TweenLite.to(entry.target, timing, {delay: factor, y: -48, opacity: .8})
    },
    fadeIn(entry) {
      TweenLite.to(entry.target, .75, {delay: .3, y: -48, opacity: 1})
    },
    getMediumPublications() {
      fetch(`https://api.rss2json.com/v1/api.json?api_key=${tokens.MEDIUM}&rss_url=https://medium.com/feed/@folkertjanvanderpol`, {method: 'GET'})
        .then(res => res.json())
        .then(res => res.items)
        .then(publications => {
          console.log(publications)
          this.publications = publications
          this.loading = false
          setTimeout(this.setListeners, 0)
        })
        .catch(err => {
          this.error = true
        })
    }
  }
}
</script>

<style lang="scss">
.medium-container {
  padding: 0;
  @media screen and (min-width: 40rem) {
    margin: 0;
    padding: 0 0 0 4rem;
  }
  @media screen and (min-width: 50rem) {
    padding: 0 8rem 0rem;
  }
}
.medium-title {
  margin-bottom: 2rem;
  &.observable {
    position: relative;
    top: 3rem;
    opacity: 0;
  }
}
.medium-list {
  display: flex;
  padding: 0;
  list-style: none;
  flex-direction: column;
  @media screen and (min-width: 50rem) {
    flex-direction: row;
  }
  &--loader {
    // padding: 4rem 0;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 1.5rem;
    }
    &.observable {
      position: relative;
      top: 3rem;
      opacity: 0;
    }
  }
  &__item {
    display: block;
    margin-bottom: 3rem;
    opacity: .8;
    &.observable {
      position: relative;
      top: 3rem;
      opacity: 0;
    }
    @media screen and (min-width: 50rem) {
      max-width: 20rem;
      margin-right: 1rem;
      margin-bottom: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      .medium-list__item-img {
        transform: translateY(-1rem);
        opacity: 1;
      }
    }
    &-link {
      display: flex;
      flex-direction: column;
      @media screen and (min-width: 30rem) {
        flex-direction: row;
        align-items: center;
      }
      @media screen and (min-width: 50rem) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &-title {
      font-weight: normal;
      @media screen and (min-width: 30rem) {
        padding-right: 5rem;
      }
      @media screen and (min-width: 50rem) {
        padding-right: 0;
      }
    }
    &-img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1rem;
      transition: opacity .5s, transform .75s cubic-bezier(0.165, 0.84, 0.44, 1);
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.2);
      @media screen and (min-width: 30rem) {
        width: calc(50% - 1rem);
        margin-right: 1rem;
        margin-bottom: 0;
      }
      @media screen and (min-width: 50rem) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>