const observer = {
  exists: false
}

if (process.browser) {
  if ('IntersectionObserver' in window) {
    observer.exists = true
    observer.generate = (cb, threshold = 1.0, rootMargin = '0px 48px 0px 48px') => new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cb(entry)
        }
      })
    },
    {threshold, rootMargin})
  }
}

export default observer
