export const state = () => ({
  projects: [
    {
      title: 'Quality TV',
      image: '/images/quality-tv/screenshot_1.jpg',
      description: '<p>Quality Media was busy developing a streaming service for television channels in the first half of 2019. They were searching for someone to build an ecosystem of websites, a dashboard and an administrative backend system.</p><p>After a while they also requested me to build a webplayer to support their streaming services. The project had a lot of challenges like authentication, subscriptions and third party resellers.</p>',
      summary: {
        content: '<p>The process of development took off in july of 2019. I started the development of the administrative backend. This included setting up a server and database for accounts, clients and channel bundles. After the basic setup I created a dashboard to interact with the backend for three different roles of accounts. QualityTV subscriptions were going to be sold via third parties as well, which all needed their own analytics, stores and employees to be editable in the dashboard.</p><p>Furthermore, I created a dynamically generated shop page for each third party. This shop page had an offline and online variant, to make cash payments in stores possible.</p><p>Currently, I\'m developing a webplayer for their streaming services. This will be a dynamic webapp which serves content based on user\'s previously watched channels and preferences.</p>',
        image: '/images/quality-tv/screenshot_2.jpg',
      },
      meta: {
        client: 'Quality TV',
        role: 'Developer & Designer',
        date: 'Ongoing',
      },
      technologies: ['Nuxt', 'NodeJS', 'MongoDB'],
      href: 'https://watch.qualitytv.eu'
    },
    {
      title: 'Rainforest Alliance',
      image: '/images/rainforest-alliance/screenshot_1.png',
      description: '<p>At the end of 2018 I had the opportunity via my studies to develop a project for Rainforest Alliance.</p><p>I worked in a team of four to create an interactive product that would show people the livelyhood of Ghanian farmers.</p><p>This project has won a <a href="https://www.cmd-amsterdam.nl/gda-2019/" target="_blank">Golden Dot Award</a> for best interactive design.</p>',
      summary: {
        content: '<p>My role inside the team was developer. The other roles in the team consisted of a content manager (Angelique Janssen), user interface designer (Sam Hofman) and illustrator (Matthias Leuhof). Besides these roles, we worked closely together at every step in the process. This way we all learned from eachother and made sure to create a product we and Rainforest Alliance would be happy with.</p><p>In the end we ended up with an interactive website which tells the story of the Ghanian farmers through text, illustrations and graphs. It explores topics like income, food security and land size.</p><p>The data visualizations are customly made with a library called D3.js. This library allows you to create custom SVG data visualizations, but requires you to make them from scratch.</p><p>In the end Rainforest Alliance was really happy with the end product and are currently working on investigating the data visualizations to make sure no wrong conclusions are being insiuated.</p><p>This project has won a <a href="https://www.cmd-amsterdam.nl/gda-2019/" target="_blank">Golden Dot Award</a> for best interactive design.</p>',
        image: '/images/rainforest-alliance/screenshot_2.png',
      },
      meta: {
        client: 'Rainforest Alliance',
        role: 'Developer',
        date: '29/02/2019',
      },
      technologies: ['Vue', 'D3.js', 'GSAP'],
      href: 'https://rautz.netlify.com'
    },
    {
      title: 'Blue Ivy Amsterdam',
      image: '/images/blue-ivy/screenshot_1.jpg',
      description: '<p>In december of 2018 the content manager of nightclub Blue Ivy Amsterdam approached me to design and develop their main website.</p><p>After designing a few iterations they ended up choosing a fully blue design.</p><p>The website was developed with Wordpress as a custom theme.</p>',
      summary: {
        content: '<p>One of the interesting parts of the project was that they requested a custom agenda functionality that allowed them to create agenda items which would be automatically removed after their date had passed. This was solved with a simple cron-job.</p><p>Another custom feature they requested was the possibility to have people sign up for an event\'s guestlist. They requested the possibility to generate a spreadsheet per event with the attendees.</p>',
        image: '/images/blue-ivy/blueivy_fullscreen_sm.jpg',
      },
      meta: {
        client: 'Blue Ivy',
        role: 'Developer & Designer',
        date: '21/02/2019',
      },
      technologies: ['PHP'],
      href: 'https://blueivyamsterdam.com/'
    },
    // {
    //   title: 'Katalysis.io',
    //   image: '/images/katalysis/screenshot_1.svg',
    //   description: '<p>In march 2018, the startup Katalysis approached me with the question if I was available to develop the front-end of their website.</p><p>The design was made by Padraig Mckee. It was a quick little project to get their startup ready to inform and attract clients via the web.</p>',
    //   summary: {
    //     content: '<p>Katalysis is a start-up company based in Amsterdam. Katalysis was founded by Alex Tran Qui and Eveline Klumpers. Alex and Eveline bring together a broad set of disciplines and backgrounds: tech, ﬁnance and entrepreneurship.</p><p>Katalysis develops software based on smart contract blockchain technology aimed to help the publishing industry with the transition from off- to online. Katalysis’ product, Katalysis DecPub (Katalysis Decentralized Publishing), is the first blockchain based implementation used in the publishing industry in the Netherlands.</p>',
    //     image: '/images/katalysis/screenshot_2.png',
    //     class: 'mouse-dark'
    //   },
    //   meta: {
    //     client: 'Katalysis',
    //     role: 'Developer',
    //     date: '21/02/2019',
    //   },
    //   href: 'https://katalysis.io/'
    // }
  ],
  splashScreen: true
})

export const mutations = {
  setProjects(state, payload) {
    state.projects = payload
  },
  setSplashScreen(state, payload) {
    state.splashScreen = payload
  }
}

export const getters = {
  getProjects(state) {
    return (slug) => {
      if (!slug) {
        return state.projects
      }
      return state.projects.find(project => {
        const sanitized = project.title.replace(/[^A-Za-z0-9\s]/g,'').toLowerCase()
        return sanitized.split(' ').join('-') === slug
      })
    }
  },
  getSplashScreen(state) {
    return state.splashScreen
  }
}
