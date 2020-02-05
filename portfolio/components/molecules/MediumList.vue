<template>
  <div class="container">
    <div v-if="!error && !loading" class="medium-container">
      <h2 class="medium-title">Medium articles</h2>
      <ul class="medium-list">
        <li v-for="publication in publications" :key="publication.title" class="medium-list__item">
          <img v-if="publication.thumbnail" class="medium-list__item-img" :src="publication.thumbnail" alt="">
          <h3 class="medium-list__item-title">{{publication.title}}</h3>
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
    getMediumPublications() {
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@folkertjanvanderpol', {method: 'GET'})
        .then(res => res.json())
        .then(res => res.items)
        .then(publications => {
          console.log(publications)
          this.publications = publications
          this.loading = false
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
  padding: 0 6rem 5rem;
}
.medium-title {
  margin-bottom: 2rem;
}
.medium-list {
  display: flex;
  padding: 0;
  list-style: none;
  &__item {
    margin-right: 1rem;
    max-width: 20rem;
    &-title {

    }
    &-img {
      width: 100%;
      border-radius: 5px;
    }
  }
}
</style>