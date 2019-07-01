<template>
  <main class="about">
    <section>
      <div class="container">
        <h2 class="about__title" ref="title">My name is <span>Folkert-Jan</span>. I'm an <span>Amsterdam</span> based front-end developer with a passion for design and user-experience.</h2>
        <div class="about__image-holder" ref="image_holder">
          <img class="about__image" src="" ref="image">
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <p class="about__title">Through design research, digital design and a user-centered approach I help clients aquire digital products that enhance the core values of their businesses.</p>
        <p class="about__title">In march of 2018 I joined forces with Troop, where we collaborate with a team of freelancers to tackle complex projects for a variety of companies.</p>
      </div>
    </section>
    <!-- <section>
      <div class="container">
        <h3>Clients</h3>
        <ul class="clients__list">
          <li>
            Client 1
          </li>
          <li>
            Client 2
          </li>
          <li>
            Client 3
          </li>
        </ul>
      </div>

    </section> -->
  </main>

</template>

<script>
export default {
  data() {
    return {
      images: ['/images/about/folkert.jpg', '/images/about/amsterdam.jpg']
    }
  },
  mounted() {
    this.hovers = document.querySelectorAll('.about__title span')
    this.titles = document.querySelectorAll('.about__title')
    this.hovers.forEach((hover, i) => {
      hover.addEventListener('mouseenter', (e) => this.onMouseEnter(e, hover, i))
      hover.addEventListener('mousemove', this.onMouseMove)
      hover.addEventListener('mouseleave', this.onMouseLeave)
    })
    this.titles.forEach((title, i) => {
      TweenLite.to(title, 1, {opacity: 1, y: -24, delay: .5 * i})
    })
  },
  methods: {
    onMouseEnter(e, element, index) {
      this.$refs.image.src = this.images[index]

      TweenLite.to(this.$refs.image_holder, .5, {x: e.clientX - (this.$refs.image_holder.offsetWidth / 2), y: e.clientY - (this.$refs.image_holder.offsetHeight / 2), opacity: 1})
      TweenLite.to(this.titles, .1, {color: 'rgba(255,255,255,.1)'})
      this.hovers.forEach(hover => {
        TweenLite.to(hover, .1, {color: 'rgba(255,255,255,.1)'})
      })
      TweenLite.to(element, .1, {color: 'white'})
    },
    onMouseMove(e) {
      TweenLite.to(this.$refs.image_holder, 1, {x: e.clientX - (this.$refs.image_holder.offsetWidth / 2), y: e.clientY - (this.$refs.image_holder.offsetHeight / 2), opacity: 1})
    },
    onMouseLeave() {
      TweenLite.to(this.$refs.image_holder, .1, {opacity: 0})
      this.titles.forEach(title => {
        title.style.color = ''
      })
      this.hovers.forEach(hover => {
        hover.style.color = ''
      })
      this.$refs.image.src = ''

    }
  }
}

</script>

<style lang="scss">
  .about {
    padding-top: 5rem;
    &__title {
      font-size: 1.5rem;
      font-weight: 400;
      position: relative;
      z-index: 2;
      transition: color .1s;
      color: var(--color-semi-light);
      max-width: 100%;
      text-transform: none;
      top: 1.5rem;
      opacity: 0;
      span {
        transition: color .1s;

        color: var(--color-light);
      }
      @media screen and (min-width: 40rem) {
        font-size: 2rem;
      }
      @media screen and (min-width: 60rem) {
        font-size: 2.5rem;
      }
    }
    &__image-holder {
      position: fixed;
      pointer-events: none;
      top: 0;
      left: 0;
      opacity: 0;
    }
    &__image {
      opacity: .5;
      width: 100%;
      height: auto;
      // max-height: 20rem;
      max-width: 40vw;
      @media screen and (min-width: 40rem) {
        max-width: 15rem;
      }
      @media screen and (min-width: 60rem) {
        max-width: 20rem;
      }
    }
  }
</style>
