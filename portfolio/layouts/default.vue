<template>
  <div>
    <Header />
    <nuxt />
    <div class="page-t">
      <div class="page-t__item"></div>
      <div class="page-t__item"></div>
      <div class="page-t__item"></div>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/organisms/Header.vue'

  export default {
    components: {
      Header
    }
  }
</script>
<style lang="scss">

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
:root {
  --color-light: #f8f8f8;
  --color-dark: #131313;
  --color-semi-light: #a3a3a3;
  --color-grey: #767676;
  --color-semi-dark: #353535;
  --font-headings: 'cortado';
  --font-main: 'cortado'
}
body {
  background-color: var(--color-dark);
  color: var(--color-semi-light);
}
main {
  padding-top: 5rem;
  transition: opacity 1s;
}
h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-headings), serif;
  color: var(--color-light);
  font-weight: normal;
}
.container {
  margin: 0 auto;
  padding: 3rem 1.5rem;
  max-width: 1080px;
  min-height: 50vh;
}
p {
  text-transform: lowercase;
  font-size: 0.875rem;
  font-weight: lighter;
}
.page-t {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 100;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  .page-t__item {
    background-color: #131313;
    width: 200vw;
    content: "";
    display: block;
    transform: translateX(-200vw);
    flex: 1;
  }
}
.page-enter-active, .page-leave-active {
  transition: opacity 1s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
