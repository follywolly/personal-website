<template>
  <div class="contact">
    <!-- <div class="geos-holder">
      <span class="geo" v-for="geo in geos" :key="geo._id">On {{geo.visited.toLocaleDateString('nl-NL')}} someone from {{geo.city}} left a note: {{geo.emoji}}</span>
    </div> -->
    <div class="container">
      <h2 class="contact__title">Let's talk</h2>
      <a class="contact__link" id="email" :href="`mailto:${email}`"><span>email</span> info[at]folkertjan.nl</a>
      <a class="contact__link" id="linkedin" href="https://www.linkedin.com/in/folkertjanvanderpol/" target="_blank"><span>linkedin</span> /in/folkertjanvanderpol</a>
      <a class="contact__link" id="github" href="https://www.github.com/follywolly/" target="_blank"><span>github</span> /follywolly</a>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      geos: [],
      emojis: {
        hearth: '❤️',
        wave: '👋',
        eye: '👁️'
      }
    }
  },
  computed: {
    email() {
      const symbol = '@'
      return 'info' + symbol + 'folkertjan.nl'
    }
  },
  mounted() {
    if (process.browser) {
      this.printGeos()
    }
  },
  methods: {
    printGeos() {
      fetch('/geos')
        .then(res => res.json())
        .then(geos => {
          return geos
            .map(geo => ({
              ...geo,
              visited: new Date(geo.visited),
              emoji: this.emojify(geo.emoji)
            }))
        })
        .then(geos => {
          this.geos = geos
        })
    },
    emojify(emoji) {
      return this.emojis[emoji]
    }
  }
}
</script>
<style lang="scss">
  .contact {
    padding-top: 5rem;
    padding-bottom: 5rem;
    @media screen and (min-width: 60rem) {
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
    &__title {
      font-weight: 400;
      font-size: 2rem;
      margin-bottom: 2rem;
      @media screen and (min-width: 40rem) {
        font-size: 2.5rem;
      }
      @media screen and (min-width: 60rem) {
        font-size: 3rem;
      }
    }
    .contact__link {
      display: block;
      margin-bottom: 1.5rem;
      max-width: 20rem;
      span {
        display: block;
        font-style: italic;
        font-size: .75rem;
      }
    }
    .geos-holder {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      pointer-events: none;
      opacity: .15;
      width: 100%;
      font-size: 1rem;
      @media screen and (min-width: 60rem) {
        font-size: 1.5rem;
      }
      .geo {
        margin-right: 1rem;
      }
    }
  }
</style>
