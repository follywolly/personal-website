<template>
  <header>
    <Logo />
    <Nav />
  </header>
</template>

<script>
import Logo from '~/components/header/Logo.vue'
import Nav from '~/components/header/Nav.vue'
export default {
  components: {
    Logo,
    Nav
  }
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
  }
</style>
