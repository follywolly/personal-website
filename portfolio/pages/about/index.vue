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
    this.hovers.forEach((hover, i) => {
      hover.addEventListener('mouseenter', (e) => this.onMouseEnter(e, hover, i))
      hover.addEventListener('mousemove', this.onMouseMove)
      hover.addEventListener('mouseleave', this.onMouseLeave)
    })
  },
  methods: {
    onMouseEnter(e, element, index) {
      this.$refs.image.src = this.images[index]
      
      TweenLite.to(this.$refs.image_holder, .5, {x: e.clientX - (this.$refs.image_holder.offsetWidth / 2), y: e.clientY - (this.$refs.image_holder.offsetHeight / 2), opacity: 1})
      TweenLite.to(this.$refs.title, .3, {color: 'rgba(255,255,255,.1)'})
      this.hovers.forEach(hover => {
        TweenLite.to(hover, .3, {color: 'rgba(255,255,255,.1)'})
      })
      TweenLite.to(element, .3, {color: 'white'})
    },
    onMouseMove(e) {
      TweenLite.to(this.$refs.image_holder, .5, {x: e.clientX - (this.$refs.image_holder.offsetWidth / 2), y: e.clientY - (this.$refs.image_holder.offsetHeight / 2), opacity: 1})
    },
    onMouseLeave() {
      TweenLite.to(this.$refs.image_holder, .1, {opacity: 0})
      this.$refs.title.style.color = ''
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
      font-size: 2rem;
      font-weight: 400;
      position: relative;
      z-index: 2;
      transition: color .3s;
      color: var(--color-semi-light);
      span {
        transition: color .3s;

        color: var(--color-light);
      }
      @media screen and (min-width: 40rem) {
        font-size: 2.5rem;
      }
      @media screen and (min-width: 60rem) {
        font-size: 3rem;
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
