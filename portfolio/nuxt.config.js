const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Folkert-Jan van der Pol - Webdeveloper Portfolio',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#131313'},
      {
        hid: 'description',
        name: 'description',
        content: 'Folkert-Jan van der Pol - Webdeveloper Portfolio'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/ttb3wia.css'}
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'UA-103649458-1'
  },

  generate: {
    routes: [
      '/projects/rainforest-alliance',
      '/projects/quality-tv',
      '/projects/blue-ivy-amsterdam',
    ]
  },

  router: {
    // scrollBehavior: async (to, from, savedPosition) => {
    //   if (savedPosition) {
    //     return savedPosition
    //   }
    //
    //   const findEl = async (hash, x) => {
    //     return document.querySelector(hash) ||
    //       new Promise((resolve, reject) => {
    //         if (x > 50) {
    //           return resolve()
    //         }
    //         setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
    //       })
    //   }
    //
    //   if (to.hash) {
    //     let el = await findEl(to.hash)
    //     if ('scrollBehavior' in document.documentElement.style) {
    //       return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    //     } else {
    //       return window.scrollTo(0, el.offsetTop)
    //     }
    //   }
    //
    //   return { x: 0, y: 0 }
    // }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
