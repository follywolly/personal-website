<template>
  <main>
    <section>
      <div class="container">
        <ul class="work-holder">
          <Card v-for="(project, i) in projects" :key="project.name" :index="i + 1" :total="projects.length" :project="project" />
        </ul>
      </div>
      <!-- <div class="shadow">
      </div> -->
    </section>
  </main>

</template>

<script>
import Card from '~/components/atoms/Card.vue'
export default {
  components: {
    Card,
  },
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.projects = [
        {
          title: 'katalysis.io',
          img: {
            src: 'https://unsplash.it/800/600'
          }
        },
        {
          title: 'jiskefet (cern)',
          img: {
            src: 'https://unsplash.it/900/600'
          }
        },
        {
          title: 'rainforest alliance',
          img: {
            src: 'https://unsplash.it/700/600'
          }
        },
        {
          title: 'katalysis.io',
          img: {
            src: 'https://unsplash.it/700/400'
          }
        },
        {
          title: 'jiskefet (cern)',
          img: {
            src: 'https://unsplash.it/800/400'
          }
        },
        {
          title: 'this is a really long project title',
          img: {
            src: 'https://unsplash.it/600/400'
          }
        },

      ]
    }, 10)
  }
}
</script>

<style lang="scss">
  main {
    overflow-x: hidden;
  }
  .title {
    margin: 1rem 0;
    span {
      white-space: nowrap;
    }
  }
  // .shadow {
  //   pointer-events: none;
  //   &::before, &::after {
  //     position: fixed;
  //     z-index: 8;
  //     bottom: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 20vh;
  //     content: "";
  //     background: -moz-linear-gradient(top, rgba(19,19,19,0) 0%, rgba(19,19,19,1) 100%); /* FF3.6-15 */
  //     background: -webkit-linear-gradient(top, rgba(19,19,19,0) 0%,rgba(19,19,19,1) 100%); /* Chrome10-25,Safari5.1-6 */
  //     background: linear-gradient(to bottom, rgba(19,19,19,0) 0%,rgba(19,19,19,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  //     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131313', endColorstr='#131313',GradientType=0 ); /* IE6-9 */
  //   }
  //   &::before {
  //     bottom: auto;
  //     top: 0;
  //     transform: rotate(180deg);
  //   }
  //
  // }
  .work-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 8rem 0;
    margin: 0;
  }
</style>
