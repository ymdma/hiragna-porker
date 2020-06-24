// export function hello() {
//   console.log("SUB読み込み");
// };

// -----------------旧コード保管------------------------


// "stAnime.js"に記述のスタートアニメーション部分の元記述


    // animation
    function startFlagAppearance() {
      startFlag.setAttribute('aria-expanded',true);
      resolve();
    }
    function startFlagIsHidden() {
      startFlag.classList.add('is-hidden')
      resolve();
    }
    function anime_startFlagExit() {
      startFlag.animate({
        opacity: [1, 0, 1]
      }, {
        duration: 1700,
        // direction: 'reverse',
        iterations: 1
      });
    }
    function anime_startFlagExit2() {
      startFlag.animate({
        opacity: [1, 0]
      }, {
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'forwards'
      })
    }


// とり先
toriFirst.onclick = () => {
  setFirstPlayerTori();
  isHidden(firstAttackSelectModal);
  isDisabled(startBtn,true);
  isHidden(startBtn.parentNode); // 画面を覆っている為parent
  isHidden(startFlag);

  // animation  **** promiseの順次処理に書き換える ****
  setTimeout(startFlagAppearance, 300); // ゲームスタートの帯出現
  setTimeout(anime_startFlagExit, 1500);
  setTimeout(anime_startFlagExit2, 4800);// 1700+1500+a
  setTimeout(startFlagIsHidden, 6800);

}