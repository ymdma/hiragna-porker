import { stAnime } from "./startAnime.js";
import { Player } from "./class.js";
import { dakuten } from "./dakuten.js";
import { HBG_menu, onlyPortrait } from "./others.js";


// ひらがな５０音元配列( Length => 46 )
const data = [
            "あ","い","う","え","お",
            "か","き","く","け","こ",
            "さ","し","す","せ","そ",
            "た","ち","つ","て","と",
            "な","に","ぬ","ね","の",
            "は","ひ","ふ","へ","ほ",
            "ま","み","む","め","も",
            "や","ゆ","よ",
            "ら","り","る","れ","ろ",
            "わ","を","ん","ー"
            ];


// 元配列からコピーして使用
let cards = data.concat();

  // フィッシャー・イェーツのシャッフルにて配列内の順番をランダムに。
for ( var i = cards.length - 1; i  >  0 ; i-- ) {
  var j = Math.floor( Math.random() * ( i + 1 ) );
  var tmp = cards[i];
  cards[i] = cards[j];
  cards[j] = tmp;
}

let firstPlayerArray = cards.slice(42, 47);
let secondPlayerArray = cards.slice(37, 42);

// 先行
let firstPlayer;
// 後行
let secondPlayer;
// (プレーヤー名を代入)

// // プレーヤー
// プレーヤーインスタンス作成
let player1 = new Player( 'とり', 'image/tori.png', [], 4, '',  false );
let player2 = new Player( 'いぬ', 'image/inu.png', [], 4, '',  false );

// 行動中のプレイヤー
let currentPlayer = {
  name: '',
  player: null, // player object
  avatar: '', // url
  handCards: [],
  description: '',
  changesLeft: 4
}

let GameState = {
  stage: 'firstStage',
  reScrollPoint: 'first',
  finishedPlayer: 0,
  firstPlayer: null,
  secondPlayer: null
}

document.addEventListener('DOMContentLoaded', () => {
  // geme
  onlyPortrait();
  pushStartBtn();
  cardChange();
  moreCardChangeDone();
  changeSkip();
  sortWindowAppearance();
  sortReset();
  toDescription();
  backToSort();
  finalConfirmModal();
  descriptionWriteFunc();
  styleChangeToolbar();
  dakuten();
  // nav
  HBG_menu();
});



// ***** WindowEvent *****
// ***Scroll***

// 表示ブレのため、スクロールされたら戻す
window.addEventListener('scroll', () => {
  let timeoutId;
  if ( timeoutId ) return;
  timeoutId = setTimeout( () => {
    timeoutId = 0;
  GoToNextStage()}, 2000);
});

// ****リサイズに伴う表示のズレ補正****
// ウィンドウサイズが変更された時
window.addEventListener("resize", event => {
  let h = document.documentElement.clientHeight
  let first = 0;
  let sort = h ;
  let description = h * 2;
  let result = h * 3;
  // スコープの問題、また値が変動するため
  switch ( GameState.reScrollPoint ) {
    case 'first':
      scroll(first)
      break;
    case 'sort':
      scroll(sort)
      break;
    case 'description':
      scroll(description)
      break;
    case 'result':
      scroll(result)
      break;
  }
  function scroll(target) {
    scrollTo(0, target);
  }
})
// ***Scroll***

// ***** Functions *****

// ***Scroll***
let stageStep = document.documentElement.clientHeight;
let firstStage = 0;
let sortStage = stageStep;
let descriptionStage = stageStep * 2;
let resultStage = stageStep * 3;

// 次のウィンドウへ移動
function GoToNextStage() {
  // ステージの振り分け（基準となる値を取得後、string→変数にして引数へ）
  switch ( GameState.stage ) {
    case 'firstStage':
      scrollNext(firstStage);
      break;
    case 'sortStage':
      scrollNext(sortStage);
      break;
    case 'descriptionStage':
      scrollNext(descriptionStage);
      break;
    case 'resultStage':
      scrollNext(resultStage);
      break;
  }
  function scrollNext(target) {
    scrollTo(0, target);
  }
}
// ***Scroll***


// ****** Class付与関数 ******
// display:none 用
function isHidden(ele) {
  if (ele.classList.contains('is-hidden')) {
    ele.classList.remove('is-hidden')
  } else {
    ele.classList.add('is-hidden')
  }
};

// 交換希望カードの選択時
function isSelect(ele) {
  if (currentPlayer.changesLeft != 0) { // 誤作動防止
    if (ele.classList.contains("is-select")) {
      ele.classList.remove('is-select')
    } else {
      ele.classList.add('is-select')
    }
  }
};
// ****** Class付与関数 ******

// ボタンの無効化
function isDisabled(target,val) {
  target.setAttribute('disabled', val);
};
//ボタンの有効化
function removeDisabled(target) {
  target.removeAttribute('disabled');
};

// aria-expanded 切替
export const setAriaExpanded = (target) => {
  if ( target.getAttribute('aria-expanded') == 'false' ) {
    setAttr(target, 'true')
  }
  else {
    setAttr(target, 'false')
  }
};

// setAttribute
export function setAttr(target,val) {
  target.setAttribute('aria-expanded', val)
}

// ***** Functions *****




// 先攻プレーヤー(キャラ)の選択
const pushStartBtn = () => {
  const startBtn = document.getElementById('startBtn');
  const toriFirst = document.getElementById('toriFirst');
  const inuFirst = document.getElementById('inuFirst');

  // スタートボタン押した時 → 先攻プレーヤーを選択
  startBtn.addEventListener('click', () => {
    const firstAttackSelectModal = document.getElementById('firstAttackSelectModal');
    isHidden(firstAttackSelectModal);

    // ゲームステージ更新
    GameState.stage = 'firstStage'
    GameState.reScrollPoint = 'first'

    // ゲームスタート時のアニメーション用
    const startFlag = document.getElementById('startFlag')

    // とり先
    toriFirst.onclick = () => {
      setFirstPlayerTori();
      isHidden(firstAttackSelectModal);
      isDisabled(startBtn,true);
      isHidden(startBtn.parentNode); // 画面を覆っている為parent
      isHidden(startFlag);

      // animation
      stAnime();

    }
    // いぬ先
    inuFirst.onclick = () => {
      setFirstPlayerInu();
      isHidden(firstAttackSelectModal);
      isDisabled(startBtn,true);
      isHidden(startBtn.parentNode); // 画面を覆っている為parent
      isHidden(startFlag);

      // animation
      stAnime();
    }

    // ***閉じる用の記述**
    document.addEventListener('keydown',
    event => {
        if (event.key === 'Escape' ) {
          isHidden(firstAttackSelectModal)
        }
    });

  },false);
};

// 先攻プレーヤーの選択で「とり先」
const setFirstPlayerTori = () => {
  // currentPlayerにデータをセット
  currentPlayer.name = `${player1.name}`;
  currentPlayer.player = player1;
  currentPlayer.changesLeft = 4;
  currentPlayer.avatar = '../assets/images/tori.png';
  currentPlayer.handCards = firstPlayerArray;
  currentPlayer.description = '';

  firstPlayer = player1.name;
  secondPlayer = player2.name;


  setDisplay();
  setCards();
  setFirstInfo();
}

// 先攻プレーヤーの選択で「いぬ先」
const setFirstPlayerInu = () => {
  // currentPlayerにデータをセット
  currentPlayer.name = `${player2.name}`;
  currentPlayer.player = player2;
  currentPlayer.changesLeft = 4;
  currentPlayer.avatar = '../assets/images/inu.png';
  currentPlayer.handCards = firstPlayerArray;
  currentPlayer.description = '';

  firstPlayer = player2.name;
  secondPlayer = player1.name;


  // 二週目の為に3つに分けて記述
  setDisplay();
  setCards();
  setFirstInfo();
}

// プレーヤー操作部やアナウンスなどの表示
const setDisplay = () => {
  // 名前とアバターを画面上に表示
  document.getElementById('playerName').innerHTML = `${currentPlayer.name}`;
  document.getElementById('avatarImg').setAttribute('src', `${currentPlayer.avatar}`);
  if ( GameState.finishedPlayer == 0 ) {
    isHidden(document.getElementById('avatarImg')); // ＊改善ポイント ここだけ隠しとくのはスマートじゃないと思う
  }
}
const setFirstInfo = () => {
  const info = document.getElementById('information').children[0];
  info.innerHTML = `手札を交換して、言葉を完成させよう！`;

}

// 手札のセット
const setCards = () => {
  const CP_HandCards = document.getElementById('currentPlayerHandCards');
    let num = 0;
    currentPlayer.handCards.forEach((i) => {
      CP_HandCards.children[num].innerHTML = `${i}`;
      num++;
    });
};

// 後何回交換できるかの表示
// 未実装


// カードの交換セクション
const cardChange = () => {

  const changeDoneBtn = document.getElementById('changeDoneBtn');
  const changeSkipBtn = document.getElementById('changeSkipBtn');
  const info = document.getElementById('information').children[0];

  // 「手札の交換を始める」を押した時の表示の更新 (ボタン・アナウンス)
  const setDisplay = () => {
    isHidden(changeStartBtn); // [交換開始]ボタンを消す
    isHidden(changeDoneBtn); // [交換する]ボタンを表示
    isHidden(changeSkipBtn); // [交換を終える]ボタンを表示
    // アナウンスの変更
    info.innerHTML = 'カードを決めたら「交換する」ボタンを押そう';
  }


  // 「手札の交換を始める」ボタン
  changeStartBtn.onclick = () => {

    setDisplay(); //表示

    // 配列化
    const CP_HandCards_Elem_li = document.getElementById('currentPlayerHandCards').getElementsByTagName('li');
    let CP_handCardsArray = Array.prototype.slice.call(CP_HandCards_Elem_li);

    // クリックしたら is-selectクラスを付与する
    CP_handCardsArray.forEach (ele =>
      ele.onclick = () => {
        // ★注意★ 変数化するとなぜがカウントが１つ（+に）ズレる。
        // let selLength = document.querySelectorAll('.js_handCards > .is-select').length

        // クラスの付与
        isSelect(ele);

        // 残り交換数に応じた ”ボタンの表示・非表示・アナウンス” の振り分け
        if( document.querySelectorAll('.js_handCards > .is-select').length === 1 ) {
          removeDisabled(changeDoneBtn);
          info.innerHTML = 'カードを決めたら「交換する」ボタンを押そう';
        }
        else if( document.querySelectorAll('.js_handCards > .is-select').length === 0 ) {
          isDisabled(changeDoneBtn, true);
          info.innerHTML = '交換するカードを選ぼう！';
        }
        else{
          isDisabled(changeDoneBtn, true);
          info.innerHTML = '選ぶのは一枚だけだよ！';
        }
      }
    )
    // changeLeftが残り○枚(4-1)（「且つ、交換したいカードが選択済み」という条件は、querySelectorにライブ性がないので含まず。）

    if (player1.changesLeft === 4) {
      cardChangeDone(); //処理を次の関数へ受け渡す
    }
  }
}


//   // ******* [交換する] を押した時の処理 *******
const cardChangeDone = () => {
  const changeDoneBtn = document.getElementById('changeDoneBtn');
  const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');
  const info = document.getElementById('information').children[0];

    // 選んだカードを[交換する] ボタンを押した時
    changeDoneBtn.onclick = () => {

      // *****選択したカードを交換する関数******
      // SWITCH文で条件分岐して呼び出される。（山札から引くカードをダブらないようにする）
      function removeAndAdd(num) {
        // 1 選択した要素(.is-selectのある要素)の中身を消す処理
        const selectElements = document.querySelector('.js_handCards > .is-select');
        selectElements.innerHTML = '';
        // // （1-2 本当ならp-1手札の配列を直す）
        // 2 元データ（50音）から手札を補完する処理
        selectElements.innerHTML = cards[num];
        // 3 今付いているisSelectを外す
        selectElements.classList.remove('is-select');
        //
        isDisabled(changeDoneBtn);
      };
        // discard(); // 捨てたカードを置いておく

      function discard() {
        const firstPlayerDiscardArea = document.getElementById('firstDiscard');
        const secondPlayerDiscardArea = document.getElementById('secondDiscard');
        let target = document.querySelector('#currentPlayerHandCards > .is-select');
        switch (GameState.finishedPlayer ) {
          case 0:
            let newCard = document.createElement('li');
            firstPlayerDiscardArea.appendChild(newCard);
            let lastAdd = firstPlayerDiscardArea.lastElementChild;
            lastAdd.innerHTML = target.textContent;
          break;
          case 1:
            let newCard2 = document.createElement('li');
            secondPlayerDiscardArea.appendChild(newCard2);
            let lastAdd2 = secondPlayerDiscardArea.lastElementChild;
            lastAdd2.innerHTML = target.textContent;
          break;
        }
      }
      // カードを一枚選択している時のみボタンを使用可能にする
      const changeDoneBtn = document.getElementById('changeDoneBtn');

      // Player1のターンの場合
      // 山札から引くカードをダブらないようにする為の条件分岐
      switch (currentPlayer.changesLeft) {
        case 4:
          discard();
          // 各プレーヤーが山札からランダムに引くロジック
          if ( currentPlayer.name === 'とり' ) {
            removeAndAdd(0);
          }
          else if ( currentPlayer.name === 'いぬ' ) {
            removeAndAdd(4);
          }
          currentPlayer.changesLeft = 3;
          // 「選んでね」のアナウンスを出す。
          info.innerHTML = '交換は あと３回！';
          break;

        case 3:
          discard();
          info.innerHTML = "交換はあと２回！"
          if ( currentPlayer.name === 'とり' ) {
            removeAndAdd(1);
          }
          else if ( currentPlayer.name === 'いぬ' ) {
            removeAndAdd(5);
          }
          currentPlayer.changesLeft = 2;
          break;

        case 2:
          discard();
          info.innerHTML = "交換はあと１回だけ！"
          // moreCardChangeOnclickDone();
          if ( currentPlayer.name === 'とり' ) {
            removeAndAdd(2);
          }
          else if ( currentPlayer.name === 'いぬ' ) {
            removeAndAdd(6);
          }
          currentPlayer.changesLeft = 1;
          break;

        case 1:
          discard();

          // moreCardChangeOnclickDone()
          if ( currentPlayer.name === 'とり' ) {
            removeAndAdd(3);
          }
          else if ( currentPlayer.name === 'いぬ' ) {
            removeAndAdd(7);
          }
          currentPlayer.changesLeft = 0;
          // info.innerHTML = "交換終了！次のプレイヤーのターンへ！"
          changeEndFunc();
          break;
      }
      if ( currentPlayer.changesLeft >= 1 ) {
        // 4 「交換する」ボタンを一旦隠す
        // isHidden(changeStartBtn)
        isHidden(changeDoneBtn);
        // 5 「もう一度交換する」ボタンを表示
        isHidden(changeStartBtn2);
        // 6 次の行動をアナウンス
        // info.innerHTML = 'まだ交換する場合はボタンを押してね';
      }
      else{
        // isHidden(changeStartBtn2);
        changeSkipBtn.classList.add('is-hidden'); // 完全に隠れて欲しい（is-hiddenの数が増えないかを後ほど確認）
      }
    }
}
//   // ******* [交換する] を押した時の処理 *******


//   // ******* [次の交換をする] を押した時の処理 *******
const moreCardChangeDone = () => {
  const changeDoneBtn = document.getElementById('changeDoneBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');

  changeStartBtn2.onclick = () => {

    const info = document.getElementById('information').children[0];
    // 「もう一度交換する」ボタンを隠す
    isHidden(changeStartBtn2);
    // 「交換する」ボタンを再表示
    isHidden(changeDoneBtn);
    // アナウンス
    info.innerHTML = '交換するカードを選ぼう！';
  }
}
//   // ******* [次の交換をする] を押した時の処理 *******


//   // ******* [交換を終える] を押した時の処理 *******
const changeSkip = () => {
  const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');

  changeSkipBtn.onclick = () => {
    changeEndFunc();
    // 交換開始(this)ボタンを非表示
    // isHidden(changeStartBtn);
    // [もう一枚交換する]ボタンの非表示
    // isHidden(changeStartBtn2);
    changeStartBtn2.classList.add('is-hidden');
    // スキップボタンを非表示
    isHidden(changeSkipBtn)
    // isHidden(toSortWindowBtn)
    currentPlayer.changesLeft = 0;
  }
}
//   // ******* [交換スキップ] を押した時の処理 *******


//   // ******* 交換終了時の処理(ボタンの表示・非表示) *******
function changeEndFunc() {
  const changeDoneBtn = document.getElementById('changeDoneBtn');
  // const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');
  const info = document.getElementById('information').children[0];

  // //「もう一度交換する」ボタンを隠す
  changeStartBtn2.classList.add('is-hidden');
  // 「交換する」ボタンを非表示＆非活性に
  isDisabled(changeDoneBtn,true);
  // isHidden(changeDoneBtn);
  changeDoneBtn.classList.add('is-hidden')
  info.innerHTML = '交換終了！ 並び替えに移ろう！';
  isHidden(toSortWindowBtn);

  arrayFix();


  // 今付いているisSelectを外す
  const selectElements = document.querySelectorAll('.js_handCards > .is-select');
  if ( selectElements ) {
    selectElements.forEach (ele =>
      ele.classList.remove('is-select')
    );
  };
};

// // ***** 配列組み直し処理 *****
function arrayFix() {
  const CP_HandCards = document.getElementById('currentPlayerHandCards');
  // 配列の組み直し
  let num = 0;
    // currentPlayerオブジェクト内の配列を更新(一旦)
    currentPlayer.handCards = [];
    // 現状のカードを取得→配列へ
    num = 0;
    for( let n = 5 ; n-- ; n != 0 ) {
      let str = CP_HandCards.children[num].textContent;
      num++;
      // currentPlayer.handCards.splice(num - 1,0,str)
      currentPlayer.handCards.push(str)
    }
    // 並び替え （before） に値を挿入
    num = 0
    currentPlayer.handCards.forEach((i) => {
      currentPlayerSortBefore.children[num].innerHTML = `${i}`;
      num++;
    });
    // // ***** 配列組み直し・並び替え画面の元カードへの挿入の処理 *****
};
  // ******* 交換終了時の処理 *******


// *****[並べ替える]押した時の処理(次画面出現)*****
const sortWindowAppearance = () => {
  const toSortWindowBtn = document.getElementById('toSortWindowBtn');

  toSortWindowBtn.onclick = () => {
    // GameStage更新
    GameState.stage = 'sortStage'
    GameState.reScrollPoint = 'sort'

    // sortWindowへスクロール
    GoToNextStage();
    sortHandCards();
  };
};
// *****[並べ替える]押した時の処理(次画面出現)*****



// *****手札の並べ替え*****         // 【未ダブり対策】
function sortHandCards() {
  const sortBeforeCards_elem_li = document.getElementById('currentPlayerSortBefore').getElementsByTagName('li');
  const sortBeforeCardsArray = Array.prototype.slice.call(sortBeforeCards_elem_li);
  let sortArray = [];
  let num = 0;
  sortBeforeCardsArray.forEach(ele =>
    // カードをクリックした時
    ele.onclick = () => {
      if ( sortArray.length < 5 && !sortArray.includes(ele.innerHTML) ) {
        sortArray.splice(num,0,ele.textContent);
        document.getElementById('currentPlayerSortAfter').children[num].innerHTML = `${sortArray[num]}`;
        num++;
      }
      
      if ( num != 0 && num != 5 ) {
      }
      else if ( num === 5 ) {

        // 次に進む ボタンの無効化解除
        const toDescriptionBtn = document.getElementById('toDescriptionBtn');
        removeDisabled(toDescriptionBtn);

        // sortHandCar</ds(); // リセット！ *[並べ直し]用
      }
    }
  )
};
// *****手札の並べ替え（交換終了後）*****


// *****[もう一回並べ換える]ボタンを押した時の処理*****
const sortReset = () => {
  const sortResetBtn = document.getElementById('sortResetBtn')


  // もう一回ならべ換えるボタンを押した時
  sortResetBtn.onclick = () => {

    // 次に進む ボタンの無効化
    const toDescriptionBtn = document.getElementById('toDescriptionBtn');
    isDisabled(toDescriptionBtn, true);

    sortHandCards(); // リセット！ 誤作動防止の為の関数読み込み直し

    const sortAfterCards_elem_li = document.getElementById('currentPlayerSortAfter').getElementsByTagName('li');
    const sortAfterCardsArray = Array.prototype.slice.call(sortAfterCards_elem_li);

    // 全カードの文字消し
    sortAfterCardsArray.forEach (ele =>
      ele.innerHTML = ''
      )

  }
};
// *****[もう一回ならべ換える]ボタンを押した時の処理*****


// *****[次に進む] ボタン(toDescriptionBtn)を押した時の処理*****
const toDescription = () => {

  const toDescriptionBtn = document.getElementById('toDescriptionBtn');

  // ***** 次に進むボタンを押した時 *****
  // toDescriptionBtn.onclick = () => {
  toDescriptionBtn.addEventListener('click', () => {

    // 濁点付与の為のポップが出っぱなしにならない様に消しておく。
    const dakutenPopTarget = document.getElementById('dakutenPopTarget')
    while (dakutenPopTarget.firstChild) dakutenPopTarget.removeChild(dakutenPopTarget.firstChild);


    // HTMLモジュールの複製  currentPlayerSortAfter → descriptionDisplayAreaA
    const currentPlayerSortAfter = document.getElementById('currentPlayerSortAfter');
    const descriptionDisplayAreaA = document.getElementById('descriptionDisplayAreaA');
    const cardsClone = currentPlayerSortAfter.cloneNode(true);
    descriptionDisplayAreaA.appendChild(cardsClone);
    //コピーされてしまうidを消す
    const displayCards = document.querySelector('#descriptionDisplayAreaA > ul')
    displayCards.removeAttribute('id');
    //新たなIDを付与
    displayCards.setAttribute('id', 'displayCards');
    displayCards.classList.remove('c-hand-cards-large')
    displayCards.classList.add('c-display-hand-cards')

    displayAvatarSet();

    // 配列の更新(currentPlayer.handsCard)
    sortAfterToArray();


    //ボタンの非活性化
    isDisabled(toDescriptionBtn,true);

    // GameStage更新
    GameState.stage = 'descriptionStage'
    GameState.reScrollPoint = 'description'

    // sortWindowへスクロール
    GoToNextStage();
  })
}

const displayAvatarSet = () => {
//   // アバター用img要素を生成、所定の位置に設置、名前を表示、クラスの追加
  const avatarImg = document.getElementById('descriptionAvatarImg');
  avatarImg.setAttribute('src' , currentPlayer.avatar)

}


// 手札の並び替えを配列に反映する
const sortAfterToArray = () => {
  currentPlayer.handCards = []; // 初期化
  const displayCards_elem_li = document.getElementById('displayCards').getElementsByTagName('li');
  const displayCardsArray = Array.prototype.slice.call(displayCards_elem_li);
  displayCardsArray.forEach (ele =>
    currentPlayer.handCards.push(ele.textContent)
  );
};

const backToSort = () => {
  const backToSortBtn = document.getElementById('backToSortBtn')

  // *****並び替えに戻るボタンを押した時*****
  backToSortBtn.onclick = () => {
    const displayCards = document.getElementById('displayCards')

    // 現在ある要素の除去
    displayCards.parentNode.removeChild(displayCards);

    // ボタンの活性化
    const toDescriptionBtn = document.getElementById('toDescriptionBtn')
    removeDisabled(toDescriptionBtn);

    // GameStage更新
    GameState.stage = 'sortStage'
    GameState.reScrollPoint = 'sort'

    // sortWindowへスクロール
    GoToNextStage();
  }
}
// *****[次に進む] ボタンを押した時の処理*****

// ***** 説明書き テキストエリアの入力をasideに *****
const descriptionWriteFunc = () => {
  const descriptionWriteArea = document.getElementById('descriptionWriteArea')
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB')

  descriptionWriteArea.addEventListener('keyup', () => {
    let inputText = descriptionWriteArea.value;
    descriptionDisplayAreaB.innerHTML = `${replace(inputText)}` //ここに関数からの戻りを
  })
  // 文字変換
  function replace (str) {
    str = str.replace(/\n/g, '</br>'); // 改行をbrに
    str = str.replace(/ /g, '&nbsp;'); // 半角スペースの連続が反映されない対策でエスケープ
    str = str.replace(/<(script|\/script)>/, '*****インラインスクリプトは不許可*****'); // 今はローカルだけど一応XSS対策
    str = str.replace(/<(style|\/style)>/, '*****インラインスタイルは不許可*****');

    return str;
  }
}
// ***** 説明書き テキストエリアの入力をasideに *****


// ***** Style change Toolbar *****

const styleChangeToolbar = () => {
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB');
  //text-align
  const styleLeft = document.getElementById('styleLeft');
  const styleCenter = document.getElementById('styleCenter');
  const styleRight = document.getElementById('styleRight');

  // Color
  const styleColorPicker = document.getElementById('styleColorPicker');
  // font-size
  const openPopFontsize = document.getElementById('openPopFontsize');
  const popToolbarFontsize = document.getElementById('popToolbarFontsize');
  const styleLarge = document.getElementById('styleLarge');
  const styleMedium = document.getElementById('styleMedium');
  const styleSmall = document.getElementById('styleSmall');

  styleLeft.onclick = () => {
    descriptionDisplayAreaB.style.textAlign = 'left';
    setAriaExpanded(styleLeft)
    if ( styleCenter.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleCenter)
    }
    if ( styleRight.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleRight)
    }
  }
  styleCenter.onclick = () => {
    descriptionDisplayAreaB.style.textAlign ='center';
    setAriaExpanded(styleCenter)
    if ( styleLeft.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleLeft)
    }
    if ( styleRight.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleRight)
    }
  }
  styleRight.onclick = () => {
    descriptionDisplayAreaB.style.textAlign ='right';
    setAriaExpanded(styleRight)
    if ( styleLeft.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleLeft)
    }
    if ( styleCenter.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleCenter)
    }
  }
  // カーソルのある場所に文字列を挿入(タグを直接入力してしまうので辞める)
  // lineBreak.onclick = () => {
  //   let sentence = descriptionWriteAreA.value
  //   const textLength = sentence.length
  //   const cursorPosition = descriptionWriteAreA.selectionStart
  //   const cursorBefore = sentence.substr(0, cursorPosition);
  //   const addBrTag = '</br>'
  //   const cursorAfter = sentence.substr(cursorPosition, textLength);

  //   sentence = cursorBefore + addBrTag + cursorAfter
  //   descriptionWriteAreA.value = sentence

  //   descriptionDisplayAreaB.innerHTML = `${descriptionWriteAreA.value}`
  //   descriptionWriteAreA.focus()
  // }

  openPopFontsize.addEventListener('click', (event) => {
    isHidden(popToolbarFontsize);
    setAriaExpanded(openPopFontsize);

  })
  styleLarge.onclick = () => {
    descriptionDisplayAreaB.style.fontSize = `35px`;
    descriptionDisplayAreaB.style.lineHeight = `35px`;
    setAriaExpanded(styleLarge);
    if ( styleMedium.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleMedium);
    }
    if ( styleSmall.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleSmall);
    }
  }
  styleMedium.onclick = () => {
    descriptionDisplayAreaB.style.fontSize = `20px`;
    descriptionDisplayAreaB.style.lineHeight = `20px`;
    setAriaExpanded(styleMedium);
    if ( styleLarge.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleLarge);
    }
    if ( styleSmall.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleSmall);
    }
  }
  styleSmall.onclick = () => {
    descriptionDisplayAreaB.style.fontSize ='15px';
    descriptionDisplayAreaB.style.lineHeight ='15px';
    setAriaExpanded(styleSmall);
    if ( styleLarge.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleLarge);
    }
    if ( styleMedium.getAttribute('aria-expanded') == 'true' ) {
    setAriaExpanded(styleMedium);
    }
  }
  styleColorPicker.addEventListener('change', (event) => {
    const value = event.target.value; // 選択された色を確認
    descriptionDisplayAreaB.style.color = value;
  })
}
// ***** Style change Toolbar *****


// *****最終確認モーダル*****
const finalConfirmModal = () => {

  const finishBtn = document.getElementById('finishBtn');
  const finishModalDone = document.getElementById('finishModalDone');
  const finishModalCancel = document.getElementById('finishModalCancel');

  finishBtn.onclick = () => {
      // モーダルの文言
  const finishModalTextFirst = document.getElementById('finishModalTextFirst');
  const finishModalTextSecond = document.getElementById('finishModalTextSecond');

  switch ( GameState.finishedPlayer ) {
    case 0:
      isHidden(finishModalTextSecond);

      break;
      case 1:
      finishModalTextFirst.classList.add('is-hidden');
      finishModalTextSecond.classList.remove('is-hidden');


    break;
  };

    isHidden(finishModal);
  }
  finishModalCancel.onclick = () => {
    isHidden(finishModal);
  }

  // ***** 「これでOK？」→ [DONE] (並べ替え/説明入力終了後）*****

  finishModalDone.onclick = () => {

    // **********１人目が終わったタイミング**********
    if ( GameState.finishedPlayer == 0 ){

      // // ***** 作成した成果をresult-windowにセットする ***** // //
      const resultWindowDisplayA = document.getElementById('deliverablesA');
      const cardsDisp = document.querySelector('#descriptionDisplayAreaA > ul');
      const descriptionDisp = document.getElementById('descriptionDisplayAreaB');
      const cloneCards = cardsDisp.cloneNode(true);
      const cloneDesc = descriptionDisp.cloneNode(true);
      resultWindowDisplayA.appendChild(cloneCards);
      resultWindowDisplayA.appendChild(cloneDesc);
      //コピーされてしまうid/classを消す
      const clonedCardsA = document.querySelector('#deliverablesA > ul');
      const clonedDescA = document.querySelector('#deliverablesA > aside');
      clonedCardsA.removeAttribute('id');
      clonedDescA.removeAttribute('id');

      //新たなid/classを付与
      clonedCardsA.setAttribute('id', 'resultCardsA');
      clonedDescA.setAttribute('id', 'resultDescA');

      // アバター用img要素を生成、所定の位置に設置、名前を表示、クラスの追加
      var img = document.createElement('img');
      img.src = currentPlayer.avatar
      img.alt = '先行プレーヤーのアバター画像';
      img.title = '先行プレーヤーのアバター';
      const avatarImgA = document.getElementById('resultAvatarA'); // pにid
      avatarImgA.appendChild(img);
      // avatarImgA.classList.add('c-avatar');
      document.getElementById('resultAvatarA').appendChild(img);
      document.getElementById('resultPlayerNameA').classList.add('c-avatar__name');
      document.getElementById('resultPlayerNameA').innerHTML = currentPlayer.name;

      // resultModalにプレーヤー名を挿入
      const firstPlayerResultA = document.getElementById('firstPlayerResultA');
      const secondPlayerResultA = document.getElementById('secondPlayerResultA');
      firstPlayerResultA.innerHTML = currentPlayer.name
      secondPlayerResultA.innerHTML = currentPlayer.name
      // // 作成した成果をresult-windowにセットする // //


      dataMove(); // currentPlayerから済んだプレイヤーのobjectへ
      setDisplayDefault(); // 次プレイヤー用に現状復帰+a 表示の切り替え等
      isHidden(finishModal)
      setSecondPlayer(); // 次プレイヤー用にcurrentPlayerの値をセット
      setSecondPlayerHandCards(); //次プレーヤーの手札をセット

      // GameStage更新
      GameState.stage = 'firstStage'
      GameState.reScrollPoint = 'first'

      // sortWindowへスクロール
      GoToNextStage();

      // secondPlayer開始時のアニメーション
      // ゲームスタート時のアニメーション
      const startFlag = document.getElementById('startFlag');
      const startFlag_ele_p = document.querySelector('#startFlag p');
      startFlag.classList.remove('is-hidden');
      startFlag.setAttribute('aria-expanded',false);
      startFlag_ele_p.textContent = `${secondPlayer}さんのターン`;

      // animation
      function startFlagAppearance() {
        startFlag.setAttribute('aria-expanded',true);
      }
      function startFlagIsHidden() {
        startFlag.classList.add('is-hidden')
      }
      function anime_startFlagExit() {
        startFlag.animate({
          opacity: [1, 0, 1]
        }, {
          duration: 1700,
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

      // animation実行
      setTimeout(startFlagAppearance, 10); // ゲームスタートの帯出現
      setTimeout(anime_startFlagExit, 50);
      setTimeout(anime_startFlagExit2, 1750);// 1700+1500+a
      setTimeout(startFlagIsHidden, 5000);
  }

    // **********２人目が終わったタイミング（判定ウィンドウへ）**********
    else if ( GameState.finishedPlayer == 1 ) {

      // // 作成した成果をresult-windowにセットする // //
      // const resultWindowDisplayA = document.getElementById('deliverablesA');
      const resultWindowDisplayB = document.getElementById('deliverablesB');
      const cardsDisp = document.querySelector('#descriptionDisplayAreaA > ul');
      const descriptionDisp = document.getElementById('descriptionDisplayAreaB');
      const cloneCards = cardsDisp.cloneNode(true);
      const cloneDesc = descriptionDisp.cloneNode(true);

      resultWindowDisplayB.appendChild(cloneCards);
      resultWindowDisplayB.appendChild(cloneDesc);
      //コピーされてしまうid/classを消す
      const clonedCardsB = document.querySelector('#deliverablesB > ul');
      const clonedDescB = document.querySelector('#deliverablesB > aside');
      clonedCardsB.removeAttribute('id');
      clonedDescB.removeAttribute('id');

      //新たなid/classを付与
      clonedCardsB.setAttribute('id', 'resultCardsB');
      clonedDescB.setAttribute('id', 'resultDescB');

      // アバター用img要素を生成、所定の位置に設置、名前を表示、クラスの追加
      var img = document.createElement('img');
      img.src = currentPlayer.avatar
      img.alt = '後行プレーヤーのアバター画像';
      img.title = '後行プレーヤーのアバター';
      const avatarImgB = document.getElementById('resultAvatarB');//pにid
      avatarImgB.appendChild(img);
      document.getElementById('resultAvatarB').appendChild(img);
      document.getElementById('resultPlayerNameB').classList.add('c-avatar__name');
      document.getElementById('resultPlayerNameB').innerHTML = currentPlayer.name;

      // resultModalにプレーヤー名を挿入
      // resultModalにプレーヤー名を挿入
      const firstPlayerResultB = document.getElementById('firstPlayerResultB');
      const secondPlayerResultB = document.getElementById('secondPlayerResultB');
      firstPlayerResultB.innerHTML = currentPlayer.name
      secondPlayerResultB.innerHTML = currentPlayer.name
      // // 作成した成果をresult-windowにセットする // //


      dataMove(); // currentPlayerから済んだプレイヤーのobjectへ
      setDisplayDefault(); // 次プレイヤー用に現状復帰+a 表示の切り替え等
      isHidden(finishModal)
      setSecondPlayer(); // 次プレイヤー用にcurrentPlayerの値をセット

      // GameStage更新
      GameState.stage = 'resultStage'
      GameState.reScrollPoint = 'resultStage'

      // resultWindowへスクロール
      GoToNextStage();

      // *********** 結果表示Windowにて ************
      // 判定するボタンを押した時の処理の呼び出し
      openResultModal();

    }
  }
}
// *****最終確認モーダル*****

const dataMove = () => {
  const description_Ele = document.getElementById('descriptionDisplayAreaB');
  currentPlayer.description = description_Ele;

  if ( currentPlayer.player == player1 ) {

    player1.changesLeft = currentPlayer.changesLeft, // 0
    player1.handCards = currentPlayer.handCards,
    player1.description = currentPlayer.description
  }
  if ( currentPlayer.player == player2 ) {
    player2.changesLeft = currentPlayer.changesLeft, // 0
    player2.handCards = currentPlayer.handCards,
    player2.description = currentPlayer.description
  }

};

const setDisplayDefault = () => {
  // 全ての一時的な表示を元に戻す。

  // プレーヤーエリア
  //  手札を空に
  const CP_HandCards_Elem_li = document.getElementById('currentPlayerHandCards').getElementsByTagName('li');
  const CP_HandCardsArray = Array.prototype.slice.call(CP_HandCards_Elem_li);
  CP_HandCardsArray.forEach(ele =>
    ele.innerHTML = ''
  )
  //  [並び替える](次へ進む) ボタンを非表示
  const toSortWindowBtn = document.getElementById('toSortWindowBtn');
  isHidden(toSortWindowBtn);
  //  [] ボタンを表示
  const changeStartBtn = document.getElementById('changeStartBtn');
  isHidden(changeStartBtn);
  // 手札を引くボタンの表示
  const setCardsBtn = document.getElementById('setCardsBtn');
  isHidden(setCardsBtn);

  // 並べ替え
  //  beforeを空に
  const CP_SortBefore_Elem_li = document.getElementById('currentPlayerSortBefore').getElementsByTagName('li');
  const CP_SortBeforeArray = Array.prototype.slice.call(CP_SortBefore_Elem_li);

  CP_SortBeforeArray.forEach(ele =>
    ele.innerHTML = ''
  )

  //  afterを空に
  const CP_SortAfter_Elem_li = document.getElementById('currentPlayerSortAfter').getElementsByTagName('li');
  const CP_SortAfterArray = Array.prototype.slice.call(CP_SortAfter_Elem_li);

  CP_SortAfterArray.forEach(ele =>
    ele.innerHTML = ''
  )

  // 次に進む ボタンの無効化
  const toDescriptionBtn = document.getElementById('toDescriptionBtn');
  isDisabled(toDescriptionBtn,true);

  // 説明
  //  カードの要素の削除
  const displayCards = document.getElementById('displayCards');
  displayCards.parentNode.removeChild(displayCards);
  //  asideのHTMLの削除
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB')
  descriptionDisplayAreaB.innerHTML = '&nbsp;'
  //  textareaを空に
  const descriptionWriteArea = document.getElementById('descriptionWriteArea');
  descriptionWriteArea.value = ''
}


const setSecondPlayer = () => {
// 次プレイヤー用の値をオブジェクトにセットする
  if (currentPlayer.player == player1) {

    currentPlayer.name = 'いぬ';
    currentPlayer.player = player2;
    currentPlayer.avatar = '../assets/images/inu.png';
    currentPlayer.handCards = secondPlayerArray;
    currentPlayer.description = '';
    currentPlayer.changesLeft = 4;
    GameState.finishedPlayer = 1;
    GameState.stage = 'firstStage';
    GameState.reScrollPoint = 'first';

  }
  else if (currentPlayer.player == player2) {

    currentPlayer.name = 'とり';
    currentPlayer.player = player1;
    currentPlayer.avatar = '../assets/images/tori.png';
    currentPlayer.handCards = secondPlayerArray;
    currentPlayer.description = '';
    currentPlayer.changesLeft = 4;
    GameState.finishedPlayer = 1;
    GameState.stage = 'firstStage';
    GameState.reScrollPoint = 'first';

  }
}

// ２人目のプレイヤーのファーストステージ始めの処理

const setSecondPlayerHandCards = () => {
  const setCardsBtn = document.getElementById('setCardsBtn')
  const changeStartBtn = document.getElementById('changeStartBtn')
  const info = document.getElementById('information').children[0];
  isHidden(changeStartBtn)
  setDisplay();
  info.innerHTML = `${currentPlayer.name}さん、手札を引いて下さい！`;

  // 手札を引く ボタンを押した時
  setCardsBtn.onclick = () => {
    setCards();
    isHidden(changeStartBtn)
    isHidden(setCardsBtn)
    setFirstInfo();
  }
};

// 決着をつける！
const openResultModal = () => {
  const openResultModalBtn = document.getElementById('openResultModalBtn');
  const resultModalFirst = document.getElementById('resultModalFirst');
  const RM_FirstText = resultModalFirst.querySelector('p');
  const firstPlayerResultA = document.getElementById('firstPlayerResultA');
  const firstPlayerResultB = document.getElementById('firstPlayerResultB');

  // 判定する ボタンを押した時 <条件分岐によって結果が分かれる>
  openResultModalBtn.onclick = () => {

    //モーダル１に質問文を挿入
    RM_FirstText.innerHTML = `${currentPlayer.name}さん、どちらが勝ったと思いますか？`

    isHidden(resultModalFirst);

    //モーダル２に質問文を挿入
    const resultModalSecond = document.getElementById('resultModalSecond');
    const RM_SecondText = resultModalSecond.querySelector('p');
    RM_SecondText.innerHTML =  `${secondPlayer}さん、どちらが勝ったと思いますか？`

    const secondPlayerResultA = document.getElementById('secondPlayerResultA');
    const secondPlayerResultB = document.getElementById('secondPlayerResultB');
    const lastResult = document.getElementById('lastResult')

    // *************始めA(first)
    // firstPlayerが firstに1票入れる
    firstPlayerResultA.onclick = () => {
      isHidden(resultModalFirst); // 閉
      isHidden(resultModalSecond); // 開

      // first 2票
      secondPlayerResultA.onclick = () => {
        isHidden(resultModalSecond); // 開
        isHidden(lastResult); //開
        lastResult.innerHTML = `${firstPlayer}さんの勝ち！`
      }
      // 1:1
      secondPlayerResultB.onclick = () => {
        isHidden(resultModalSecond); // 開
        isHidden(lastResult); //開
        // lastResult.innerHTML = 'どちらも同じくらい面白かったようです。'
        lastResult.innerHTML = '意地の張り合いもほどほどに。'

      }
    }
    // *************始めB(second)
    // firstPlayerが secondに1票入れる
    firstPlayerResultB.onclick = () => {
      isHidden(resultModalFirst); // 閉
      isHidden(resultModalSecond); // 開

      // 1:1
      secondPlayerResultA.onclick = () => {
        isHidden(resultModalSecond); // 開
        isHidden(lastResult); //開
        // lastResult.innerHTML = 'どちらも同じくらい面白かったようです。'
        lastResult.innerHTML = '素晴らしい讃え合いです！'
      }
      // second２票
      secondPlayerResultB.onclick = () => {
        isHidden(resultModalSecond); // 開
        isHidden(lastResult); //開
        lastResult.innerHTML = `${secondPlayer}さんの勝ち！`
      }

    }
  }
}


