<template>
  <div class="nav">
    <button @click="toggleNav" class="nav__button">Open navigation</button>
    <nav>
      <ul>
        <li><nuxt-link to="/">Home <span aria-hidden="true">where the heart is</span></nuxt-link></li>
        <li><nuxt-link to="/#projects">Projects <span aria-hidden="true">stuff i made</span></nuxt-link></li>
        <li><nuxt-link to="/#experiences">Experiences <span aria-hidden="true">collection of memories</span></nuxt-link></li>
        <li><nuxt-link to="/#contact">Contact <span aria-hidden="true">get in touch</span></nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nav: false
    }
  },
  methods: {
    toggleNav() {
      const body = document.querySelector('body')
      if (this.nav) {
        body.classList.remove('nav-open')
      } else {
        body.classList.add('nav-open')
      }
      this.nav = !this.nav
    }
  },
  watch: {
    $route(to, from){
      if (this.nav){
        this.toggleNav()
      }
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
    cursor: pointer;
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
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    ul {
      list-style: none;
      padding: 0;
      li {
        font-size: 1.25rem;
        text-align: center;
        padding: 2rem;
        a {
          text-decoration: none;
          color: var(--color-light);
          font-family: var(--font-headings);
          position: relative;
          padding: 0;
          width: 100%;
          display: block;
          max-width: 10rem;
          margin: 0 auto;
          z-index: 1;
          &::after {
            width: 0;
            transform: skewX(15deg);
            background-color: var(--color-semi-light);
            height: 1rem;
            position: absolute;
            top: 1rem;
            left: 0;
            content: "";
            display: block;
            opacity: 0;
            transition: all 0.3s;
            z-index: -1;
          }
          &:hover {
            &::after {
              width: 100%;
              opacity: 1;
            }
          }
        }
        span {
          font-weight: normal;
          font-style: italic;
          font-size: 0.875rem;
          display: block;
          color: var(--color-semi-light);
          margin-top: 0.5rem;
          text-transform: lowercase;
        }
      }
    }
  }
  .nav-open {
    max-height: 100vh;
    overflow: hidden;
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
