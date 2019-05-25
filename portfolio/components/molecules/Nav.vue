<template>
  <div class="nav">
    <button @click="toggleNav" class="nav__button">Open navigation</button>
    <nav>
      <ul>
        <li><nuxt-link @click.native="onClick" to="/" data-text="Home">Home</nuxt-link></li>
        <li><nuxt-link @click.native="onClick" to="/about" data-text="Projects">About</nuxt-link></li>
        <li><nuxt-link @click.native="onClick" to="/contact" data-text="Contact">Contact</span></nuxt-link></li>
      </ul>
    </nav>
    <div class="nav__link-follower" ref="follower">
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  data() {
    return {
      id: null
    }
  },
  mounted() {
    this.body = document.querySelector('body'),
    this.links = document.querySelectorAll('header nav li')
    if (process.browser && window.innerWidth > 60 * 16) {
      const active = document.querySelector('nav .nuxt-link-exact-active')
      if (!active) {
        TweenLite.to(this.$refs.follower, .5, {opacity: 0})
      } else {
        TweenLite.to(this.$refs.follower, .5, {opacity: 1})
        TweenLite.to(this.$refs.follower, .5, {left: active.parentNode.offsetLeft, width: active.parentNode.offsetWidth})
      }
      this.links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          TweenLite.to(this.$refs.follower, .5, {left: link.offsetLeft, width: link.offsetWidth, opacity: 1})
        })
        link.addEventListener('mouseleave', () => {
          const current = document.querySelector('nav .nuxt-link-exact-active')
          if (current) {
            TweenLite.to(this.$refs.follower, .5, {left: current.parentNode.offsetLeft, width: current.parentNode.offsetWidth})
          } else {
            return TweenLite.to(this.$refs.follower, .5, {opacity: 0})
          }
        })
      })
    }
  },
  watch: {
    $route() {
      if (window.innerWidth > 60 * 16) {
        setTimeout(() => {
          const active = document.querySelector('nav .nuxt-link-exact-active')
          if (!active) {
            TweenLite.to(this.$refs.follower, .5, {opacity: 0})
          } else {
            TweenLite.to(this.$refs.follower, .5, {left: active.parentNode.offsetLeft, width: active.parentNode.offsetWidth, opacity: 1})
          }

        }, 0)
      }


      if(this.$route.hash) {
        setTimeout(() => {
          if (!this.id) {
            return
          }
          const el = document.querySelector(this.id)
          TweenLite.to(window, 1.2, { scrollTo: el })

          this.id = null
        }, 1000)
      }
    }
  },
  methods: {
    onClick(e) {
      const hash = this.$route.hash
      if (!hash) {
        return this.toggleNav()
      }
      this.id = hash
      const el = document.querySelector(this.id)
      if (!el) {
        return this.toggleNav() // route watcher takes over
      }
      this.id = null
      this.toggleNav()
      // TweenLite.to(window, 1.2, { scrollTo: el, delay: .5 })
    },
    toggleNav() {
      const links = this.links
      const length = links.length
      if (window.innerWidth >= 16 * 60) {
        return
      }
      if (this.body.classList.contains('nav-open')) {
        links.forEach((link, i) => {
          TweenLite.to(links[length - 1 - i], 0.15, {delay: 0.05 * i, y: 32, opacity: 0, onComplete: () => {
            if (i === length - 1) {
              this.body.classList.remove('nav-open')
            }
          }})
        })
      } else {
        this.body.classList.add('nav-open')
        links.forEach((link, i) => {
          TweenLite.to(link, .4, {delay: 0.2 * (i + 1), y: -32, opacity: 1})
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .nav__link-follower {
    width: 1rem;
    height: .125rem;
    position: absolute;
    top: 2rem;
    left: 0;
    background: white;
    content: "";
    display: none;
    @media screen and (min-width: 60rem) {
      display: block;
    }
  }
  .nav__button {
    appearance: none;
    border: 0;
    background: transparent;
    height: 40px;
    width: 40px;
    overflow: hidden;
    color: transparent;
    position: relative;
    padding: 0;
    z-index: 2;
    cursor: none;
    @media screen and (min-width: 60rem) {
      display: none;
    }
    &:active, &:focus {
      outline: none;
      &::after, &::before {
        background-color: #fff;
      }
    }
    &::after, &::before {
      display: block;
      position: absolute;
      content: "";
      background-color: var(--color-light);
      width: 24px;
      height: 2px;
      top: 15px;
      right: 0;
      transition: all 0.3s;
      transform-origin: center;
    }
    &::after {
      top: auto;
      bottom: 15px;
    }
  }
  .nav {
    position: relative;
  }
  nav {
    position: fixed;
    width: 100vw;
    height: 100vh;
    right: -100vw;
    top: 0;
    background-color: var(--color-grey);
    transition: all 0.3s;
    padding: 3rem 1.5rem 3rem;
    @media screen and (min-width: 60rem) {
      position: relative;
      width: auto;
      height: 2rem;
      right: auto;
      top: auto;
      background: transparent;
      padding: 0;
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
      height: 100%;
      @media screen and (min-width: 60rem) {
        flex-direction: row;
      }
      li {
        font-size: 1.25rem;
        text-align: center;
        padding: 1rem;
        transition: padding .3s;
        position: relative;
        top: 2rem;
        opacity: 0;
        @media screen and (min-width: 40rem) {
          padding: 2rem;
        }
        @media screen and (min-width: 60rem) {
          padding: 0;
          opacity: 1;
          margin: 0 1rem;
          top: 0;
          &:last-of-type {
            margin-right: 0;
          }
        }
        a {
          display: block;
          text-decoration: none;
          color: transparent;
          font-family: var(--font-decorative);
          font-size: 3rem;
          font-weight: 400;
          position: relative;
          padding: 0;
          width: 100%;
          margin: 0 auto;
          z-index: 1;
          -webkit-text-stroke: .5px white;
          transition: color 1s;
          @media screen and (min-width: 60rem) {
            font-size: 1.25rem;
            font-family: var(--font-main);
            font-weight: 400;
            color: var(--color-semi-light);
            -webkit-text-stroke: 0;
            text-transform: lowercase;
            &.nuxt-link-exact-active {
              color: white;
            }
          }
          &::after {
            width: 0;
            content: "";
            transform: skew(15deg);
            background: var(--color-semi-light);
            position: absolute;
            top: 2.5rem;
            left: -25%;
            height: 1.5rem;
            display: block;
            opacity: 0;
            transition: width 0.4s, opacity 0.3s;
            z-index: -1;
            @media screen and (min-width: 60rem) {
              display: none;
            }
          }
          &:hover {
            color: white;
            &::after {
              width: 150%;
              opacity: 1;
              @media screen and (min-width: 60rem) {
                width: 110%;
              }
            }
          }
        }
        span {
          -webkit-text-stroke: 0px transparent;
          font-family: var(--font-main);
          font-weight: 300;
          font-style: italic;
          font-size: 0.875rem;
          display: none;
          color: var(--color-light);
          margin-top: 0.5rem;
          text-transform: lowercase;
          @media screen and (min-width: 40rem) {
            display: block;
          }
        }
      }
    }
  }
  .nav-open {
    // max-height: 100vh;
    // overflow: hidden;
    nav {
      transform: translateX(-100vw);
    }
    .nav__button {
      &::before {
        transform: rotate(45deg) translateY(5px);
      }
      &::after {
        transform: rotate(-45deg) translateY(-6px);
      }
    }
  }
</style>
