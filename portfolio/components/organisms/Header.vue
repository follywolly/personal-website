<template>
  <header>
    <div class="top">
      <no-ssr>
        <Logo />
      </no-ssr>

      <Nav />
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

<style lang="scss" scoped>
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
      pointer-events: all;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      color: white;
      font-size: .875rem;
    }
  }
</style>
