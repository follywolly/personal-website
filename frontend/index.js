import config from './config/config.js'

console.log('linked')

;(()=>{
  fetch(`https://api.github.com/users/follywolly/repos?client_id=${config.github.id}&client_secret=${config.github.secret}`)
    .then(res => res.json())
    .then(render)

    function render(data) {

      const filtered = data.filter(repo => repo.license !== null && repo.description && !repo.name.includes('shelter'))
      filtered.push(data.find(repo => repo.name === 'RAUTZ'))


      const output = document.querySelector('#output')
      const gh = document.createElement('div')
      gh.classList.add('gh-holder')
      output.appendChild(gh)

      filtered.forEach(repo => {
        const div = document.createElement('div')
        div.classList.add('repo')
        div.innerHTML = `
          <h2>${repo.name} | ${repo.stargazers_count} stars</h2>
          <h3>${repo.language}</h3>
          <p>${repo.description}</p>
        `
        gh.appendChild(div)
      })
    }
})()



;(()=>{
  fetch(`${config.personal.url}/wp-json/wp/v2/posts`)
    .then(res => res.json())
    .then(render)

  function render(data) {
    const output = document.querySelector('#output')
    const wp = document.createElement('div')
    wp.classList.add('wp-holder')
    output.appendChild(wp)

    data.forEach(post => {
      const div = document.createElement('div')
      div.classList.add('post')
      div.innerHTML = `<h2>${post.title.rendered}</h2>${post.content.rendered}`
      wp.appendChild(div)
    })
  }
})()
