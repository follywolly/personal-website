<template>
  <header ref="header">
    <div class="top">
      <Logo />
      <Nav />
      <div class="shadow"></div>
    </div>

    <div class="bottom">
      <Socials />
      <span>folkert-jan van der pol</span>
    </div>


  </header>
</template>

<script>
import Logo from '~/components/atoms/Logo.vue'
import Nav from '~/components/molecules/Nav.vue'
import Socials from '~/components/atoms/Socials.vue'
import { TweenLite } from 'gsap'
export default {
  components: {
    Logo,
    Nav,
    Socials
  },
  mounted() {

    if (this.$router.currentRoute.name === 'index') {
      TweenLite.to(this.$refs.header, 1, {opacity: 1, delay: 4})
    } else {
      TweenLite.to(this.$refs.header, 1, {opacity: 1})
    }
  }
}
</script>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    .top, .bottom {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
    }
    .top {
      @media screen and (min-width: 60rem) {
        padding-top: 2rem;
      }
      a, button, nav {
        pointer-events: all;
      }
      .shadow {
        content: "";
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 8rem;
        z-index: -1;
        background: -moz-linear-gradient(top, rgba(19,19,19,1) 0%, rgba(19,19,19,0) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(19,19,19,1) 0%,rgba(19,19,19,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131313', endColorstr='#00131313',GradientType=0 ); /* IE6-9 */
        @media screen and (min-width: 40rem) {
          height: 10rem;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: .875rem;
      font-size: 1rem;
      color: white;
      transition: color .3s, opacity .3s;
      opacity: 0;
      @media screen and (min-width: 60rem) {
        color: var(--color-grey);
        opacity: 1;
        padding: 1rem 1.5rem 2rem;
        a {
          pointer-events: all
        }
      }
    }
  }
  .nav-open {
    .bottom {
      color: white;
      opacity: 1;
      a {
        pointer-events: all;
        &:hover {
          color: var(--color-semi-light);
        }
      }
    }
  }
</style>
