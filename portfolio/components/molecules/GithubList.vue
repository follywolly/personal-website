<template>
  <div>
    <div class="github-container" v-if="!error">
      <h2 class="github-title observable">Featured github projects</h2>
      <ul class="github-list" v-if="!loading">
        <li  class="github-list__item" v-for="repo in repositories" :key="repo.name">
          <div class="github-list__item-container">
            <a :href="repo.url" target="_blank" class="github-list__item-link">
              <h3 class="github-list__item-title">{{repo.name}}</h3>
              <p class="github-list__item-description">{{repo.description}}</p>
              <p class="github-list__item-meta">
                <span class="github-list__item-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon"><path class="icon__path" d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"/></svg>
                  {{repo.created_at.toLocaleDateString()}}
                </span>
                <span v-if="repo.language" class="github-list__item-meta-item"> - </span>
                <span class="github-list__item-meta-item" v-if="repo.language">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon"><path class="icon__path" d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z"/></svg>
                  {{repo.language}}
                </span>
              </p>
            </a>     
          </div>
        </li>
      </ul>
      <div class="github-list--loader" v-else>
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
        <span>Fetching github repositories...</span>
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
      repositories: [],
      observables: [],
    }
  },
  mounted() {
    this.getRepositories()
    if (!observer.exists && !process.browser) {
      return
    }
    const title = document.querySelector('.github-title')

    if (!observer.exists) {
      title.classList.remove('observable')
    }
    
    title.classList.add('observable')
    this.createFadeInObserver(title, this.fadeIn)

    const loader = document.querySelector('.github-list--loader')
    loader.classList.add('observable')
    this.createFadeInObserver(loader, this.fadeIn)
    
    
  },
  methods: {
    createFadeInObserver(entry, animator) {
      const entryObserver = observer.generate(animator, .25)
      entryObserver.observe(entry)
    },
    fadeIn(entry) {
      TweenLite.to(entry.target, .75, {delay: .3, y: -48, opacity: 1})
    },
    fadeInItems(entry) {
      const index = this.observables.findIndex(node => node === entry.target)
      const factor = window.innerWidth < 50 * 16 ? .3 : (.2 * ((index < 2 ? index : 0) + 1))
      const timing = window.innerWidth < 50 * 16 ? .5 : .75
      TweenLite.to(entry.target, timing, {delay: factor, y: -48, opacity: 1})
    },
    setListeners() {
      const items = document.querySelectorAll('.github-list__item')
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
      const factor = window.innerWidth < 50 * 16 ? .1 : .25
      const itemIntersector = observer.generate(this.fadeInItems, factor)

      this.observables = [...items]

      items.forEach(item => {
        item.classList.add('observable')
        itemIntersector.observe(item)
      })
    },
    fetcher(url, type) {
      return fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `token ${tokens.GITHUB}`,
          Accept: type ? type : 'application/vnd.github.v3+json'
        }
      })
      .then(res => res.json())
    },
    getRepositories() {
      this.fetcher('https://api.github.com/users/follywolly/repos?private=false')
        .then(repos => {
          const promises = repos.map(repo => {
            return this.fetcher(`https://api.github.com/repos/follywolly/${repo.name}/topics`, 'application/vnd.github.mercy-preview+json')
          })
          return Promise.all(promises)
            .then(tags => {
              return tags.map((t, i) => {
                return {
                  ...t,
                  index: i
                }
              })
              .filter(t => t.names.includes('project'))
              .map(t => t.index)
            })
            .then(indexes => {
              const filtered = repos
                .filter((r, i) => indexes.includes(i))
                
              this.repositories = filtered
                
                .map(r => ({
                  name: r.name.replace('-', ' '),
                  description: r.description,
                  created_at: new Date(r.created_at),
                  language: r.language,
                  url: r.html_url
                }))
                .sort((a, b) => b.created_at - a.created_at)
                
              this.loading = false
              setTimeout(this.setListeners, 0)
            })
        })
        .catch(e => {
          this.error = true
        })
    },
  }
}
</script>

<style lang="scss">
.icon {
  width: 100%;
  max-width: 1rem;
  margin-right: .5rem;
  &__path {
    fill: var(--color-semi-light);
  }
}
.github-container {
  position: relative;
  padding: 0 0 3rem 1.5rem;
  margin: 0 -1.5rem;
  @media screen and (min-width: 40rem) {
    margin: 0;
    padding: 0 0 3rem 4rem;
  }
  @media screen and (min-width: 50rem) {
    padding: 0 8rem 3rem 8rem;
  }
  &::before, &::after {
    display: none;
    position: absolute;
    top: 0;
    left: -1.5rem;
    width: 5rem;
    height: 100%;
    content: "";
    background: -moz-linear-gradient(left, rgba(19,19,19,1) 0%, rgba(19,19,19,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131313', endColorstr='#00131313',GradientType=0 ); /* IE6-9 */
    // background: red;
    z-index: 2;
    @media screen and (min-width: 40rem) {
      
      display: block;
      // background: red;
    }
    @media screen and (min-width: 50rem) {
      left: 3rem;
    }
  }
  &::after {
    left: auto;
    right: -1.5rem;
    background: -moz-linear-gradient(right, rgba(19,19,19,1) 0%, rgba(19,19,19,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(right, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to left, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131313', endColorstr='#00131313',GradientType=0 ); /* IE6-9 */
    // background: red;
    @media screen and (min-width: 50rem) {
      right: 3rem;
    }
  }
}
.github-title {
  margin-bottom: -2rem;
  &.observable {
    position: relative;
    top: 3rem;
    opacity: 0;
  }
}
.github-list {
  list-style: none;
  padding: 4rem 5rem;
  display: flex;
  align-items: stretch;
  overflow-x: scroll;
  transform: translateX(-5rem);
  min-width: calc(100% + 10rem);
  &::-webkit-scrollbar {
    display: none;
  } 
  width: calc(100% + 5rem);
  &--loader {
    .icon {
      margin-right: 1.5rem;
    }
    padding: 4rem 0;
    display: flex;
    align-items: center;
    &.observable {
      position: relative;
      top: 3rem;
      opacity: 0;
    }
  }
  &__item {
    vertical-align: top;
    min-height: 100%;
    display: inline-block;
    white-space: normal;
    margin: 0;
    margin-right: .5rem;
    &.observable {
      position: relative;
      top: 3rem;
      opacity: 0;
    }
    @media screen and (min-width: 40rem) {
      margin-right: 1.5rem;
    }
    &:last-of-type {
      padding-right: 6.5rem;
      @media screen and (min-width: 40rem) {
        padding-right: 9rem;
      }
    }
    &-container {
      height: 100%;
    }
    &-link {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1rem;
      opacity: 1;
      height: 100%;
      border: 1px solid #444;
      border-radius: 5px;
      width: 25rem;
      max-width: 75vw;
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.15);
      transition: opacity .5s, transform .75s cubic-bezier(0.165, 0.84, 0.44, 1);
      @media screen and (min-width: 50rem) {
        opacity: .8;
        &:hover {
          transform: translateY(-1rem);
          opacity: 1;
        }
      }
    }
    
    &-title {
      text-transform: capitalize;
      margin-bottom: .5rem;
    }
    &-description {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    &-meta {
      margin-top: auto;
      margin-bottom: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        margin-right: .5rem;
      }
    }
  }
}
</style>