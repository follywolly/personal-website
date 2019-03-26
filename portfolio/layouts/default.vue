<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
  import Header from '~/components/header/Header.vue'

  export default {
    components: {
      Header
    }
  }
</script>
<style>
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
}
body {
  background-color: var(--color-dark);
  color: var(--color-semi-light);
}
main {
  padding-top: 5rem;
}
h1,h2,h3,h4,h5,h6 {
  font-family: serif;
  color: var(--color-light);
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
</style>
