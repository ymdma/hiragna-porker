import { setAriaExpanded, setAttrAE } from "./script.js";

// ********** HBG **********
export const HBG_menu = () => {

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navList = document.getElementById('navList');

  hamburgerBtn.addEventListener('click', () => {
    setAriaExpanded(hamburgerBtn);
    setAriaExpanded(navList);
    zIndexFix();
  })

  const toRules = document.getElementById('toRules');
  const Rules = document.getElementById('Rules');
  const closeRules = document.getElementById('closeRules');
  const toRequirements = document.getElementById('toRequirements');
  const Requirements = document.getElementById('Requirements');
  const closeRequirements = document.getElementById('closeRequirements');

  toRules.onclick = () => {
    setAriaExpanded(Rules);
    setAttrAE(Requirements, false)
  };
  closeRules.onclick = () => {
    setAriaExpanded(Rules);
  };
  toRequirements.onclick = () => {
    setAriaExpanded(Requirements);
    setAttrAE(Rules, false)
  };
  closeRequirements.onclick = () => {
    setAriaExpanded(Requirements);
  };
}


// menu のz-indexバグfix
const changeState = (target, val) => {
  target.setAttribute('state', val);
};

const zIndexFix = () => {
  const startBtnScreen = document.getElementById('startBtnScreen');
  const firstAttackSelectModal = document.getElementById('firstAttackSelectModal');
  const startFlag = document.getElementById('startFlag');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  if ( hamburgerBtn.getAttribute('aria-expanded') == 'true' ) {
    changeState(startBtnScreen, 'hide');
    changeState(firstAttackSelectModal, 'hide');
    changeState(startFlag, 'hide');
  }
  else {
    changeState(startBtnScreen, 'show');
    changeState(firstAttackSelectModal, 'show');
    changeState(startFlag, 'show');
  }
};


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