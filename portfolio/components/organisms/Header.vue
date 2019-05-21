<template>
  <header>
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
export default {
  components: {
    Logo,
    Nav,
    Socials
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
    .top, .bottom {
      width: 100%;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
    }
    .top {
      a, button {
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
      color: white;
      opacity: 0;
      > * {
        transition: color .3s, opacity .3s;
      }
      @media screen and (min-width: 60rem) {
        color: var(--color-grey);
        opacity: 1;
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
          color: var(--color-semi-dark);
        }
      }
    }
  }
</style>
