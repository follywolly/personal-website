<template>
  <div>
    <div v-if="!error && !loading" class="medium-container">
      <h2 class="medium-title">Medium articles</h2>
      <ul class="medium-list">
        <li v-for="publication in publications" :key="publication.title" class="medium-list__item">
          <a :href="publication.link" target="_blank" class="medium-list__item-link">
            <img v-if="publication.thumbnail" class="medium-list__item-img" :src="publication.thumbnail" alt="">
            <h3 class="medium-list__item-title">{{publication.title}}</h3>
          </a>
        </li>
      </ul>
    </div>
    <div v-else-if="loading">
      loading
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      loading: true,
      publications: []
    }
  },
  mounted() {
    this.getMediumPublications()
  },
  methods: {
    setMouseListener() {
      const links = document.querySelectorAll('.medium-list__item')
      const cursor = document.querySelector('#cursor')
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          cursor.classList.add('hover')
        })
        link.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover')
        })
      })
    },
    getMediumPublications() {
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@folkertjanvanderpol', {method: 'GET'})
        .then(res => res.json())
        .then(res => res.items)
        .then(publications => {
          console.log(publications)
          this.publications = publications
          this.loading = false
          setTimeout(this.setMouseListener, 0)
        })
        .catch(err => {
          this.error = true
        })
    }
  }
}
</script>

<style lang="scss">
.medium-container {
  padding: 0;
  @media screen and (min-width: 40rem) {
    margin: 0;
    padding: 0 0 0 4rem;
  }
  @media screen and (min-width: 50rem) {
    padding: 0 8rem 0rem;
  }
}
.medium-title {
  margin-bottom: 2rem;
}
.medium-list {
  display: flex;
  padding: 0;
  list-style: none;
  flex-direction: column;
  @media screen and (min-width: 50rem) {
    flex-direction: row;
  }
  &__item {
    display: block;
    margin-bottom: 3rem;
    opacity: .8;
    transition: opacity .5s;
    @media screen and (min-width: 50rem) {
      max-width: 20rem;
      margin-right: 1rem;
      margin-bottom: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      .medium-list__item-img {
        transform: translateY(-1rem);
      }
      opacity: 1;
    }
    &-link {
      display: flex;
      flex-direction: column;
      @media screen and (min-width: 30rem) {
        flex-direction: row;
        align-items: center;
      }
      @media screen and (min-width: 50rem) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &-title {
      font-weight: normal;
      @media screen and (min-width: 30rem) {
        padding-right: 5rem;
      }
      @media screen and (min-width: 50rem) {
        padding-right: 0;
      }
    }
    &-img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1rem;
      transition: opacity .5s, transform .75s cubic-bezier(0.165, 0.84, 0.44, 1);
      box-shadow: 2px 2px 50px rgba(100, 100, 100, 0.2);
      @media screen and (min-width: 30rem) {
        width: calc(50% - 1rem);
        margin-right: 1rem;
        margin-bottom: 0;
      }
      @media screen and (min-width: 50rem) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>