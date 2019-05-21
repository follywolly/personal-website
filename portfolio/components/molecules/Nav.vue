<template>
  <div class="nav">
    <button @click="toggleNav" class="nav__button">Open navigation</button>
    <nav>
      <ul>
        <li><nuxt-link @click.native="toggleNav" to="/" data-text="Home">Home <span aria-hidden="true">where the heart is</span></nuxt-link></li>
        <li><nuxt-link @click.native="toggleNav" to="/#projects" data-text="Projects">Projects <span aria-hidden="true">stuff i made</span></nuxt-link></li>
        <li><nuxt-link @click.native="toggleNav" to="/#experiences" data-text="Experience">Experiences <span aria-hidden="true">collection of memories</span></nuxt-link></li>
        <li><nuxt-link @click.native="toggleNav" to="/#contact" data-text="Contact">Contact <span aria-hidden="true">get in touch</span></nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  data() {
    return {
      nav: false,
    }
  },
  mounted() {
    this.body = document.querySelector('body'),
    this.links = document.querySelectorAll('header nav li')
  },
  methods: {
    toggleNav() {
      const links = this.links
      const length = links.length
      if (this.nav) {
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
      this.nav = !this.nav
    }
  }
}
</script>

<style lang="scss">
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
  nav {
    position: fixed;
    width: 100vw;
    height: 100vh;
    right: -100vw;
    top: 0;
    background-color: var(--color-grey);
    transition: all 0.3s;
    padding: 3rem 1.5rem 3rem;
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
      height: 100%;
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
          }
          &:hover {
            color: white;
            &::after {
              width: 150%;
              opacity: 1;
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
