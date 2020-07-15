
// import { setAriaExpanded, setAttr } from "./script.js";

// ********** HBG **********
export const HBG_menu = () =>{

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navList = document.getElementById('navList');

  hamburgerBtn.addEventListener('click', function() {
    setAriaExpanded(hamburgerBtn);
    setAriaExpanded(navList);
  })

  const toRules = document.getElementById('toRules');
  const Rules = document.getElementById('Rules');
  const closeRules = document.getElementById('closeRules');
  const toRequirements = document.getElementById('toRequirements');
  const Requirements = document.getElementById('Requirements');
  const closeRequirements = document.getElementById('closeRequirements');

  toRules.onclick = () => {
    setAriaExpanded(Rules);
    setAttr(Requirements, false)
    // setAttr(hamburgerBtn, false);
    // setAttr(navList, false);
  };
  closeRules.onclick = () => {
    setAriaExpanded(Rules);
  };
  toRequirements.onclick = () => {
    setAriaExpanded(Requirements);
    setAttr(Rules, false)
    // setAttr(hamburgerBtn, false);
    // setAttr(navList, false);
  };
  closeRequirements.onclick = () => {
    setAriaExpanded(Requirements);
  };


}

// スマホの横置き時、「縦でお願いします」のダイアログを出す。


export const onlyPortrait = () => {

  window.onorientationchange = () => {
    switch ( window.orientation ) {
      case 0:
        break;
      case 90:
        alert('スマホでは画面を縦にしてプレイしてください');
        break;
      case -90:
        alert('スマホでは画面を縦にしてプレイしてください２');
        break;
    }
  }
}
