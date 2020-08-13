export function stAnime () {

  Promise.resolve()
  .then( () => {
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.setAttribute('aria-expanded', true);
        resolve();
      }, 300);
    })
  })
  .then( () => {
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.animate( {
          opacity: [1, 0, 1]
        }
        , {
          duration: 1700,
          iterations: 1
      });

        resolve();
      }, 800);
    })
  })
  .then( () => {
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.animate({
          opacity: [1, 0]
        }, {
          duration: 2000,
          easing: 'ease-in-out',
          fill: 'forwards'
        })

        resolve();
      }, 2100);
    })
  })
  .then( () => {
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.classList.add('is-hidden')
        resolve();
        resolve();
      }, 1900);
    })
  })

};
