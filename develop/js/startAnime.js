

export function stAnime () {

  Promise.resolve()
  .then( () => {
    console.log('0');
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.setAttribute('aria-expanded', true);
        console.log("1");
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
          // direction: 'reverse',
          iterations: 1
      });

        console.log('2');
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

        console.log('3');
        resolve();
      }, 2100);
    })
  })
  .then( () => {
    return new Promise( (resolve) => {
      setTimeout( () => {
        startFlag.classList.add('is-hidden')
        resolve();

        console.log('4');
        resolve();
      }, 1900);
    })
  })

};
