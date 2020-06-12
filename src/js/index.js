// ひらがな５０音元配列( Length => 46 )
const data=[
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
for(var i = cards.length - 1; i > 0; i--){
  var j = Math.floor(Math.random() * (i + 1));
  var tmp = cards[i];
  cards[i] = cards[j];
  cards[j] = tmp;
}

let firstPlayerArray = cards.slice(42,47);
let secondPlayerArray = cards.slice(37,42);


// 対戦記録
let gameRecord = []
// 一回終わるごとにオブジェクトをpushしてく
// 未実装
let firstPlayer;
let secondPlayer;

// プレーヤー
let player1 = {
  name: 'とり',
  avatar: './image/tori.png',
  handCards: [],
  changesLeft: 4,
  description: '',
  winner: false
}
let player2 = {
  name: 'いぬ',
  avatar: './image/inu.png',
  handCards: [],
  changesLeft: 4,
  description: '',
  winner: false
}

// 行動中のプレイヤー
let currentPlayer = {
  name: '',
  player: player1,
  avatar: '',
  handCards: null,
  description: '',
  changesLeft: 4,
  sortNow: false,
  sortEnd: false,
  // acted: false,
  finishedPlayer: 0,
  gameStage: 'firstStage',
  ReScrollPoint: 'first'
}

document.addEventListener('DOMContentLoaded', () => {
  // geme
  pushStartBtn();
  cardChange();
  moreCardChangeDone();
  changeSkip();
  sortHandCards();
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
  timeoutId = setTimeout( function () {
    timeoutId = 0;
  GoToNextStage()}, 2000);
});

// ****リサイズに伴う表示のズレ補正****
// ウィンドウサイズが変更された時
window.addEventListener("resize", function(event) {
  let h = document.documentElement.clientHeight
  let first = 0;
  let sort = h ;
  let description = h * 2;
  let result = h * 3;
  // スコープの問題、また値が変動するため
  switch ( currentPlayer.ReScrollPoint ) {
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
  function scroll(target){
    scrollTo(0, target);
    console.log("スクロール動作 :補正")
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
  switch ( currentPlayer.gameStage ) {
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
    // console.log("スクロール動作:ジャンプ");
    // console.log(sortStage);
  }
}
// ***Scroll***

// ****** Class付与関数 ******
// display:none
function isHidden(ele) {
  if (ele.classList.contains('is-hidden')) {
    ele.classList.remove('is-hidden')
  } else {
    ele.classList.add('is-hidden')
    // console.log('isHidden作動')
  }
};
// 交換を希望するカードを選択時の表示
function isSelect(ele) {
  if (currentPlayer.changesLeft != 0) { // 誤作動防止
    if (ele.classList.contains("is-select")) {
      ele.classList.remove('is-select')
    } else {
      ele.classList.add('is-select')
      // console.log("is-select作動")
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
function setAriaExpanded(target) {
  if ( target.getAttribute('aria-expanded') == 'false' ) {
    setAttr(target, 'true')
  }
  else{
    setAttr(target, 'false')
  }
};

// setAttribute
function setAttr(target,val) {
  target.setAttribute('aria-expanded', val)
}

// ***** Functions *****



// 先攻プレーヤー(キャラ)の選択
const pushStartBtn = () => {
  const startBtn = document.getElementById('startBtn');
  const toriFirst = document.getElementById('toriFirst');
  const inuFirst = document.getElementById('inuFirst');
  // スタートボタン押した時 → 先攻プレーヤーを選択
  startBtn.addEventListener('click', function() {
    const firstAttackSelectModal = document.getElementById('firstAttackSelectModal');
    isHidden(firstAttackSelectModal);

    // ゲームステージ更新
    currentPlayer.gameStage = 'firstStage'
    currentPlayer.ReScrollPoint = 'first'

    // ゲームスタート時のアニメーション
    const startFlag = document.getElementById('startFlag')
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
    // いぬ先
    inuFirst.onclick = () => {
      setFirstPlayerInu();
      isHidden(firstAttackSelectModal);
      isDisabled(startBtn,true);
      isHidden(startBtn.parentNode); // 画面を覆っている為parent
      isHidden(startFlag);

      // animation
      setTimeout(startFlagAppearance, 300); // ゲームスタートの帯出現
      setTimeout(anime_startFlagExit, 1500);
      setTimeout(anime_startFlagExit2, 4500);// 1700+1500+a
      setTimeout(startFlagIsHidden, 6800);
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
  // console.log("とり開始");
  // currentPlayerにデータをセット
  currentPlayer.name = `${player1.name}`;
  currentPlayer.player = player1;
  currentPlayer.sortNow = false;
  currentPlayer.changesLeft = 4;
  currentPlayer.avatar = './image/tori.png';
  currentPlayer.handCards = firstPlayerArray;
  currentPlayer.description = '';
  currentPlayer.acted = false;

  firstPlayer = player1.name;
  secondPlayer = player2.name;

  // console.log(currentPlayer);

  setDisplay();
  setCards();
  setFirstInfo();
}

// 先攻プレーヤーの選択で「いぬ先」
const setFirstPlayerInu = () => {
  // console.log("いぬ開始");
  // currentPlayerにデータをセット
  currentPlayer.name = `${player2.name}`;
  currentPlayer.player = player2;
  currentPlayer.sortNow = false;
  currentPlayer.changesLeft = 4;
  currentPlayer.avatar = './image/inu.png';
  currentPlayer.handCards = firstPlayerArray;
  currentPlayer.description = '';
  currentPlayer.acted = false;

  firstPlayer = player2.name;
  secondPlayer = player1.name;

  // console.log(currentPlayer);

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
  // console.log(playerName)
  if ( currentPlayer.finishedPlayer == 0 ) {
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
    currentPlayer.handCards.forEach(function(i) {
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

    // 要素をHTMLCollectionに
    const CP_HandCards_Elem_li = document.getElementById('currentPlayerHandCards').getElementsByTagName('li');
    // HTMLCollectionを配列化
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
          // console.log("カード選択数 １ (OK)");
        }
        else if( document.querySelectorAll('.js_handCards > .is-select').length === 0 ) {
          isDisabled(changeDoneBtn, true);
          info.innerHTML = '交換するカードを選ぼう！';
          // console.log("カード未選択");
        }
        else{
          isDisabled(changeDoneBtn, true);
          info.innerHTML = '選ぶのは一枚だけだよ！';
          // console.log("カード選択数２〜５");
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
      // console.log("cardChangeDone発動。残り交換数⤵︎");
      // console.log(currentPlayer.changesLeft);

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
        // console.log("入れ替え関数動作！");
      };
        // discard(); // 捨てたカードを置いておく

      function discard() {
        const firstPlayerDiscardArea = document.getElementById('firstDiscard')
        const secondPlayerDiscardArea = document.getElementById('secondDiscard')
        let target = document.querySelector('#currentPlayerHandCards > .is-select')
        switch (currentPlayer.finishedPlayer ){
          case 0:
            let newCard = document.createElement('li');
            firstPlayerDiscardArea.appendChild(newCard);
            let lastAdd = firstPlayerDiscardArea.lastElementChild;
            lastAdd.innerHTML = target.textContent
          break;
          case 1:
            let newCard2 = document.createElement('li');
            secondPlayerDiscardArea.appendChild(newCard2);
            let lastAdd2 = secondPlayerDiscardArea.lastElementChild;
            lastAdd2.innerHTML = target.textContent
          break;
        }
      }
      // カードを一枚選択している時のみボタンを使用可能にする
      const changeDoneBtn = document.getElementById('changeDoneBtn')

      // Player1のターンの場合
      // 山札から引くカードをダブらないようにする為の条件分岐
      switch (currentPlayer.changesLeft) {
        case 4:
          discard();
          // console.log('case4: 現在のプレイヤーの状態⤵︎');
          // console.log(currentPlayer);
          // 各プレーヤーが山札からランダムに引くロジック
          if ( currentPlayer.name === 'とり' ) {
            removeAndAdd(0);
          }
          else if ( currentPlayer.name === 'いぬ' ) {
            removeAndAdd(4);
          }
          currentPlayer.changesLeft = 3;
          // 「選んでね」のアナウンスを出す。
          info.innerHTML = '交換したいカードを選ぼう！ あと４回！';
          break;

        case 3:
          discard();
          // console.log('SWITCH文内 LEFT:3')
          info.innerHTML = "交換したいカードを選ぼう！ あと３回！"
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
          // console.log('SWITCH文内 LEFT:2')
          info.innerHTML = "交換したいカードを選ぼう！ あと２回！"
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
          // console.log('SWITCH文内 LEFT:1')
          info.innerHTML = "交換したいカードを選ぼう！ これがラスチャン！"
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
        info.innerHTML = 'まだ交換する場合はボタンを押してね';
        // console.log("if Left >= 1");
      }
      else{
        // console.log("else");
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

  changeStartBtn2.onclick = () =>{
    // console.log("moreCardChangeDone発動");

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
    // console.log('changeSkip発動')
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
  info.innerHTML = '交換終了！<ここに次のアナウンス>';
  isHidden(toSortWindowBtn);

  arrayFix();

  // console.log('changeEnd関数 発動');

  // 今付いているisSelectを外す
  const selectElements = document.querySelectorAll('.js_handCards > .is-select');
  if ( selectElements ){
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
    for( let n = 5 ; n-- ; n != 0) {
      let str = CP_HandCards.children[num].textContent;
      num++;
      // currentPlayer.handCards.splice(num - 1,0,str)
      currentPlayer.handCards.push(str)
    }
    // console.log(currentPlayer.handCards)
    // 並び替え （before） に値を挿入
    num = 0
    currentPlayer.handCards.forEach(function(i) {
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
    // gameStage更新
    currentPlayer.gameStage = 'sortStage'
    currentPlayer.ReScrollPoint = 'sort'

    // sortWindowへスクロール
    GoToNextStage();
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
      if ( sortArray.length < 5 ) {
        sortArray.splice(num,0,ele.textContent);
        document.getElementById('currentPlayerSortAfter').children[num].innerHTML = `${sortArray[num]}`;
        num++;
      }

      if (num != 0 && num != 5 ) {
        currentPlayer.sortNow = true; // 交換中の状態を付与 この値は現在不使用..
        // console.log(currentPlayer.sortNow);
      }
      else if ( num === 5 ) {
        currentPlayer.sortNow = false; // 交換中の状態を付与 この値は現在不使用..
        // console.log(currentPlayer.sortNow);

        // 次に進む ボタンの無効化解除
        const toDescriptionBtn = document.getElementById('toDescriptionBtn');
        removeDisabled(toDescriptionBtn);

        sortHandCards(); // リセット！ *[並べ直し]用
      }
      console.log(`num: ${num}`)
    }
  )
};
// *****手札の並べ替え（交換終了後）*****


// *****[手札の並べ替えをリセットする]ボタンを押した時の処理*****
const sortReset = () => {
  const sortResetBtn = document.getElementById('sortResetBtn')

  currentPlayer.sortNow = false

  // 並べ替えをやり直すボタンを押した時
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
    // console.log("並べ替えやり直し")

  }
};
// *****[手札の並べ替えをリセットする]ボタンを押した時の処理*****


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

    // currentPlayer sortEnd ステートの変更
    currentPlayer.sortEnd = true;

    //ボタンの非活性化
    isDisabled(toDescriptionBtn,true);

    // gameStage更新
    currentPlayer.gameStage = 'descriptionStage'
    currentPlayer.ReScrollPoint = 'description'

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
    // ステートの変更を戻す sortEnd
    currentPlayer.sortEnd = false;

    // ボタンの活性化
    const toDescriptionBtn = document.getElementById('toDescriptionBtn')
    removeDisabled(toDescriptionBtn);

    // gameStage更新
    currentPlayer.gameStage = 'sortStage'
    currentPlayer.ReScrollPoint = 'sort'

    // sortWindowへスクロール
    GoToNextStage();
  }
}
// *****[次に進む] ボタンを押した時の処理*****

// ***** 説明書き テキストエリアの入力をasideに *****
const descriptionWriteFunc = () => {
  const descriptionWriteArea = document.getElementById('descriptionWriteArea')
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB')

  descriptionWriteArea.addEventListener('keyup', function() {
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

  switch ( currentPlayer.finishedPlayer ) {
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
    if ( currentPlayer.finishedPlayer == 0 ){

      // // ***** 作成した成果をresult-windowにセットする ***** // //
      const resultWindowDisplayA = document.getElementById('deliverablesA');
      const cardsDisp = document.querySelector('#descriptionDisplayAreaA > ul');
      const descriptionDisp = document.getElementById('descriptionDisplayAreaB');
      const cloneCards = cardsDisp.cloneNode(true);
      const cloneDesc = descriptionDisp.cloneNode(true);
      console.log(resultWindowDisplayA)
      resultWindowDisplayA.appendChild(cloneCards);
      resultWindowDisplayA.appendChild(cloneDesc);
      //コピーされてしまうid/classを消す
      const clonedCardsA = document.querySelector('#deliverablesA > ul');
      const clonedDescA = document.querySelector('#deliverablesA > aside');
      clonedCardsA.removeAttribute('id');
      clonedDescA.removeAttribute('id');
      // clonedCardsA.classList.remove('c-hand-card-large');
      // clonedDescA.classList.remove('');
      //新たなid/classを付与
      clonedCardsA.setAttribute('id', 'resultCardsA');
      clonedDescA.setAttribute('id', 'resultDescA');
      // clonedCardsA.classList.add('c-hand__result-window');
      // clonedDescA.classList.add('c-desc__result-window');
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

      // console.log('Player2のターンへ');

      // // 画面を一番上元に戻す
      // scrollTop(500);

      // // 重さを考慮して↓に差し替え

      // gameStage更新
      currentPlayer.gameStage = 'firstStage'
      currentPlayer.ReScrollPoint = 'first'

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
    else if( currentPlayer.finishedPlayer == 1 ){
      // console.log('判定Windowへ');

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
      // console.log(currentPlayer);
      // console.log(player1);
      // console.log(player2);

      // gameStage更新
      currentPlayer.gameStage = 'resultStage'
      currentPlayer.ReScrollPoint = 'resultStage'

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
  currentPlayer.acted = true;

  if ( currentPlayer.player == player1 ) {

    player1.sortNow = currentPlayer.sortNow,
    player1.changesLeft = currentPlayer.changesLeft, // 0
    player1.handCards = currentPlayer.handCards,
    player1.description = currentPlayer.description,
    player1.acted =  currentPlayer.acted
  }
  if ( currentPlayer.player == player2 ) {
    player2.sortNow = currentPlayer.sortNow,
    player2.changesLeft = currentPlayer.changesLeft, // 0
    player2.handCards = currentPlayer.handCards,
    player2.description = currentPlayer.description,
    player2.acted =  currentPlayer.acted
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

// //画面をスクロールで一番上に戻す(スピード変更可)
//   function scrollTop(duration) {
//     let currentY = window.pageYOffset;
//     let step = duration/currentY > 1 ? 10 : 100;
//     let timeStep = duration/currentY * step;
//     let intervalID = setInterval(scrollUp, timeStep);

//     function scrollUp(){
//       currentY = window.pageYOffset;
//       if(currentY === 0) {
//           clearInterval(intervalID);
//       } else {
//           scrollBy( 0, -step );
//       }
//     }
//   }


const setSecondPlayer = () => {
// 次プレイヤー用の値をオブジェクトにセットする
  if (currentPlayer.player == player1) {
    player1.acted = true;

    currentPlayer.name = 'いぬ';
    currentPlayer.player = player2;
    currentPlayer.avatar = './image/inu.png';
    currentPlayer.handCards = secondPlayerArray;
    currentPlayer.description = '';
    currentPlayer.changesLeft = 4;
    currentPlayer.sortNow = false;
    currentPlayer.sortEnd = false;
    currentPlayer.acted = false;
    currentPlayer.finishedPlayer = 1;
    currentPlayer.gameStage = 'firstStage';
    currentPlayer.ReScrollPoint = 'first';

  }
  else if (currentPlayer.player == player2) {
    player2.acted = true;

    currentPlayer.name = 'とり';
    currentPlayer.player = player1;
    currentPlayer.avatar = './image/tori.png';
    currentPlayer.handCards = secondPlayerArray;
    currentPlayer.description = '';
    currentPlayer.changesLeft = 4;
    currentPlayer.sortNow = false;
    currentPlayer.sortEnd = false;
    currentPlayer.acted = false;
    currentPlayer.finishedPlayer = 1;
    currentPlayer.gameStage = 'firstStage';
    currentPlayer.ReScrollPoint = 'first';

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
  // console.log(currentPlayer)

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


// *****濁点*****

const dakuten = () => {
  const sortResetBtn = document.getElementById('sortResetBtn');
  const dakutenPopTarget = document.getElementById('dakutenPopTarget');
  const CP_HandCards = document.getElementById('currentPlayerSortAfter');
  const CP_HandCards_Elem_Li = document.getElementById('currentPlayerSortAfter').getElementsByTagName('li');
  const CP_HandCardsArray = Array.prototype.slice.call(CP_HandCards_Elem_Li);



  // カードをクリックしたら、文字を判定する + 要素の情報を次の関数に渡す
  CP_HandCardsArray.forEach (function FxA(ele,index) {
    ele.addEventListener('click', () => {

      // 出ているポップの(要素)を消す
      while (dakutenPopTarget.firstChild) dakutenPopTarget.removeChild(dakutenPopTarget.firstChild);

      // カードの文字の判定して、元文字と候補を次の関数に送る
      switch ( ele.innerHTML ) {
        case 'あ': openPop_dakuten('あ','','','ぁ',index);
          break;
        case 'い': openPop_dakuten('い','','','ぃ',index);
          break;
        case 'う': openPop_dakuten('う','ゔ','','ぅ',index);
          break;
        case 'え': openPop_dakuten('え','','','ぇ',index);
          break;
        case 'お': openPop_dakuten('お','','','ぉ',index);
          break;
        case 'か': openPop_dakuten('か','が','','',index);
          break;
        case 'き': openPop_dakuten('き','ぎ','','',index);
          break;
        case 'く': openPop_dakuten('く','ぐ','','',index);
          break;
        case 'け': openPop_dakuten('け','げ','','',index);
          break;
        case 'こ': openPop_dakuten('こ','ご','','',index);
          break;
        case 'さ': openPop_dakuten('さ','ざ','','',index);
          break;
        case 'し': openPop_dakuten('し','じ','','',index);
          break;
        case 'す': openPop_dakuten('す','ず','','',index);
          break;
        case 'せ': openPop_dakuten('せ','ぜ','','',index);
          break;
        case 'そ': openPop_dakuten('そ','ぞ','','',index);
          break;
        case 'た': openPop_dakuten('た','だ','','',index);
          break;
        case 'ち': openPop_dakuten('ち','ぢ','','',index);
          break;
        case 'つ': openPop_dakuten('つ','づ','','っ',index);
          break;
        case 'て': openPop_dakuten('て','で','','',index);
          break;
        case 'と': openPop_dakuten('と','ど','','',index);
          break;
        case 'は': openPop_dakuten('は','ば','ぱ','',index);
          break;
        case 'ひ': openPop_dakuten('ひ','び','ぴ','',index);
          break;
        case 'ふ': openPop_dakuten('ふ','ぶ','ぷ','',index);
          break;
        case 'へ': openPop_dakuten('へ','べ','ぺ','',index);
          break;
        case 'ほ': openPop_dakuten('ほ','ぼ','ぽ','',index);
          break;
        case 'や': openPop_dakuten('や','','','ゃ',index);
          break;
        case 'ゆ': openPop_dakuten('ゆ','','','ゅ',index);
          break;
        case 'よ': openPop_dakuten('よ','','','ょ',index);
          break;
      }
    })
  })
  function openPop_dakuten (moto,ten,maru,komoji,index) {
    // *要素の生成*
    // div 入れ物
    let Div = document.createElement('div');
    Div.className = 'p-pop__dakuten';
    // 元の文字
    let Moto = document.createElement('p')
    Moto.innerHTML = moto
    Div.appendChild(Moto)
    Moto.setAttribute('id', 'optionDefault');
    // ⇆
    let Arrow = document.createElement('p')
    // Arrow.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
    Arrow.innerHTML = '<i class="fas fa-exchange-alt"></i>'
    Div.appendChild(Arrow)
    // 点
    if ( ten != '' ){
      let Ten = document.createElement('p')
      Ten.innerHTML = ten
      Div.appendChild(Ten)
      Ten.setAttribute('id', 'optionA');
    }
    // 丸
    if ( maru != '' ){
      let Maru = document.createElement('p')
      Maru.innerHTML = maru
      Div.appendChild(Maru)
      Maru.setAttribute('id', 'optionB');
    }
    // 小文字
    if ( komoji != '' ){
      let Komoji = document.createElement('p')
      Komoji.innerHTML = komoji
      Div.appendChild(Komoji)
      Komoji.setAttribute('id', 'optionC');
    }

    // 完成した要素を挿入 '.p-pop__dakuten ＞ p*4'
    dakutenPopTarget.appendChild(Div);

    // 各選択肢をクリックした時

      choiceOptions(optionDefault,index);
    if ( ten != '' ) {
      choiceOptions(optionA,index);
    }
    if ( maru != '' ) {
      choiceOptions(optionB,index);
    }
    if ( komoji != '' ) {
      choiceOptions(optionC,index);
    }

  }

  //  ポップの文字をクリックした時にカードの文字を変える
  function choiceOptions (target,index) {
    target.addEventListener('click',() => {
      CP_HandCards.children[index].innerHTML = target.innerHTML;
    })
  }

  // 「もう一回並べ換える」ボタンを押した時、出ているポップを消す。
  sortResetBtn.addEventListener('click', () => {
    while (dakutenPopTarget.firstChild) dakutenPopTarget.removeChild(dakutenPopTarget.firstChild);
  })

}

// *****濁点*****



// 勝ち数の記録を表示？
// ネット対戦…？
// Vueで作り直す…？






// ********** HBG **********
const HBG_menu = () =>{

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

