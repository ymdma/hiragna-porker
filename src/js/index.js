import {hello} from "./sub.js";

console.log("indexの読み込み1")
hello();

// // //

// ひらがな５０音元配列( Length => 46 )
const data=[
            "あ","い", "う","え","お",
            "か","き","く","け","こ",
            "さ","し","す","せ","そ",
            "た","ち","つ","て","と",
            "な","に","ぬ","ね","の",
            "は","ひ","ふ","へ","ほ",
            "ま","み","む","め","も",
            "や","ゆ","よ",
            "ら","り","る","れ","ろ",
            "わ","を","ん"
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
// console.log(cards)

let player1Array = cards.slice(41,46);
let player2Array = cards.slice(36,41);

let firstPlayerArray = cards.slice(41,46);
let secondPlayerArray = cards.slice(36,41);

// ゲーム状態
let gameState = {
  sortNow: false
}

// プレーヤー
let player1 = {
  name: 'とり',
  avatar: './image/tori.png',
  handCards: [],
  changesLeft: 4,
  // myTurn: false,
  description: ''
}
let player2 = {
  name: 'いぬ',
  avatar: './image/inu.png',
  handCards: [],
  changesLeft: 4,
  // myTurn: false,
  description: ''
}
let currentPlayer = {
  name: '',
  player: player1,
  sortNow: false,
  changesLeft: 4,
  avatar: '',
  handCards: null,
  description: '',
  // acted: false,
  finishedPlayer: 0
}

document.addEventListener('DOMContentLoaded', () => {
  pushStartBtn();
  // setCards();
  cardChange();
  moreCardChangeDone();
  changeSkip();
  sortHandCards();
  sortWindowAppearance();
  sortReset();
  writeDescription();
  backToDescription();
  finalConfirmModal();
  descriptionWriteFunc();
  styleChangeToolbar();
  playerChange();
});

function toggleDisabled(target,val) {
  target.setAttribute('disabled', val);
};

// 先攻プレーヤー(キャラ)の選択
const pushStartBtn = () => {
  const startBtn = document.getElementById('startBtn');
  const toriFirst = document.getElementById('toriFirst');
  const inuFirst = document.getElementById('inuFirst');
  // スタートボタン押した時 → 先攻プレーヤーを選択
  startBtn.onclick = () => {
    const firstAttackSelectModal = document.getElementById('firstAttackSelectModal');
    isHidden(firstAttackSelectModal);
    // とり先
    toriFirst.onclick = () =>{
      setPlayerTori();
      isHidden(firstAttackSelectModal);
      // isHidden(startBtn)
      startBtn.setAttribute('disabled', true);
      // startBtn.style.opacity = "0"
    }
    // いぬ先
    inuFirst.onclick = () =>{
      setPlayerInu();
      isHidden(firstAttackSelectModal);
      // isHidden(startBtn)
      startBtn.setAttribute('disabled', true);
      // startBtn.style.opacity = "0"
    }
    // 閉じる用の記述あとで
    // firstAttackSelectModal.onclick = () => {
    //   console.log("aaa")
    //   isHidden(firstAttackSelectModal)
    // }
  }
}

// 先攻プレーヤーの選択で「とり先」
const setPlayerTori = () => {
  console.log("とり開始"),
  // currentPlayerにデータをセット
  currentPlayer.name = `${player1.name}`,
  currentPlayer.player = player1,
  currentPlayer.sortNow = false,
  currentPlayer.changesLeft = 4,
  currentPlayer.avatar = './image/tori.png',
  currentPlayer.handCards = firstPlayerArray,
  currentPlayer.description = '',
  currentPlayer.acted = false

  console.log(currentPlayer);

  setDisplay();
  setCards();
}

// 先攻プレーヤーの選択で「いぬ先」
const setPlayerInu = () => {
  console.log("いぬ開始")
  // currentPlayerにデータをセット
  currentPlayer.name = `${player2.name}`,
  currentPlayer.player = player2,
  currentPlayer.sortNow = false,
  currentPlayer.changesLeft = 4,
  currentPlayer.avatar = './image/inu.png',
  currentPlayer.handCards = firstPlayerArray,
  currentPlayer.description = '',
  currentPlayer.acted = false

  console.log(currentPlayer);

  setDisplay();
  setCards();
}

// プレーヤー操作部やアナウンスなどの表示
const setDisplay = () => {
  const info = document.getElementById('information').children[0];
      // 名前とアバターを画面上に表示
      document.getElementById('playerName').innerHTML = `${currentPlayer.name}`;
      document.getElementById('avatarImg').setAttribute('src',  `${currentPlayer.avatar}`);
      isHidden(document.getElementById('avatarImg')); // ＊改善ポイント ここだけ隠しとくのはスマートじゃないと思う

      // アナウンスの表示
      info.innerHTML = 'カードを交換して言葉を完成させよう！';
}

// 手札のセット
const setCards = () => {
  const CP_HandCards = document.getElementById('currentPlayerHandCards');
    let num = 0;
    console.log(player1.myTurn);
    currentPlayer.handCards.forEach(function(i){
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
    // console.log(CP_handCardsArray[0].classList)

    // クリックしたら is-selectクラスを付与する
    CP_handCardsArray.forEach (ele =>
      ele.onclick = () => {
        // console.log(ele.classList)
        // ★注意★ 変数化するとなぜがカウントが１つ（+に）ズレる。
        // let selLength = document.querySelectorAll('.js_handCards > .is-select').length

        // クラスの付与
        isSelect(ele);

        // 残り交換数に応じた ”ボタンの表示・非表示・アナウンス” の振り分け
        if( document.querySelectorAll('.js_handCards > .is-select').length === 1 ) {
          changeDoneBtn.removeAttribute('disabled'); //toggleDisabledが使えないため
          info.innerHTML = 'カードを決めたら「交換する」ボタンを押そう';
          console.log("カード選択数 １ (OK)");
        }
        else if( document.querySelectorAll('.js_handCards > .is-select').length === 0 ) {
          changeDoneBtn.setAttribute('disabled',true);
          info.innerHTML = '交換するカードを選ぼう！';
          console.log("カード未選択");
        }
        else{
          changeDoneBtn.setAttribute('disabled',true);
          info.innerHTML = '選ぶのは一枚だけだよ！';
          console.log("カード選択数２〜５");
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
      console.log("cardChangeDone発動。残り交換数⤵︎");
      console.log(currentPlayer.changesLeft);

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
        console.log("入れ替え関数動作！");
      };
      // Player1のターンの場合
      // 山札から引くカードをダブらないようにする為の条件分岐
      switch (currentPlayer.changesLeft) {
        case 4:
          console.log('case4: 現在のプレイヤーの状態⤵︎');
          console.log(currentPlayer);

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
          console.log('SWITCH文内 LEFT:3')
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
          console.log('SWITCH文内 LEFT:2')
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
          console.log('SWITCH文内 LEFT:1')
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
        console.log("if Left >= 1");
      }
      else{
        console.log("else");
        // isHidden(changeStartBtn2);
        changeSkipBtn.classList.add('is-hidden'); // 完全に隠れて欲しい（is-hiddenの数が増えないかを後ほど確認）
      }
    }
}
//   // ******* [交換する] を押した時の処理 *******

//   // ******* [次の交換をする] を押した時の処理 *******

const moreCardChangeDone = () => {
  const changeDoneBtn = document.getElementById('changeDoneBtn');
  // const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');
  // const info = document.getElementById('information').children[0];
  changeStartBtn2.onclick = () =>{
    console.log("moreCardChangeDone発動");
    // console.log(currentPlayer.changesLeft);

    const info = document.getElementById('information').children[0];
        // // 「もう一度交換する」ボタンを隠す
    isHidden(changeStartBtn2);
    // 「交換する」ボタンを再表示
    isHidden(changeDoneBtn);
    // アナウンス
    info.innerHTML = '交換するカードを選ぼう！';
  }
}
//   // ******* [次の交換をする] を押した時の処理 *******

//   // ******* [交換スキップ] を押した時の処理 *******
const changeSkip = () => {
  // const changeDoneBtn = document.getElementById('changeDoneBtn');
  const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');
  // const info = document.getElementById('information').children[0];
  changeSkipBtn.onclick = () => {
    changeEndFunc();

    // 交換開始(this)ボタンを非表示
    // isHidden(changeStartBtn);
    // [もう一枚交換する]ボタンの非表示
    // isHidden(changeStartBtn2);
    changeStartBtn2.classList.add('is-hidden');
    // スキップボタンを非表示
    isHidden(changeSkipBtn)
    // isHidden(sortWindowBtn)
    currentPlayer.changesLeft = 0;
    console.log('changeSkip発動')
    console.log(`CP_LEFT => ${currentPlayer.changesLeft}`)
  }
}
//   // ******* [交換スキップ] を押した時の処理 *******


//   // ******* 交換終了時の処理(ボタンの表示・非表示 クラスを取る) *******
function changeEndFunc() {
  const changeDoneBtn = document.getElementById('changeDoneBtn');
  // const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');
  const info = document.getElementById('information').children[0];

  // //「もう一度交換する」ボタンを隠す
  changeStartBtn2.classList.add('is-hidden');
  // 「交換する」ボタンを非表示＆非活性に
  changeDoneBtn.setAttribute('disabled',true);
  // isHidden(changeDoneBtn);
  changeDoneBtn.classList.add('is-hidden')
  info.innerHTML = '交換終了！<ここに次のアナウンス>';
  isHidden(sortWindowBtn);

  arrayFix();

  console.log('changeEnd関数 発動');

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
    console.log(currentPlayer.handCards)
    // 並び替え （before） に値を挿入
    num = 0
    currentPlayer.handCards.forEach(function(i) {
      currentPlayerSortBefore.children[num].innerHTML = `${i}`;
      num++;
    });
    // // ***** 配列組み直し・並び替え画面の元カードへの挿入の処理 *****
};
  // ******* 交換終了時の処理 *******


function isHidden(ele) {
  if (ele.classList.contains('is-hidden')) {
    ele.classList.remove('is-hidden')
  } else {
    ele.classList.add('is-hidden')
    console.log('isHidden作動')
  }
};

function isSelect(ele) {
  if (currentPlayer.changesLeft != 0) { // 誤作動防止
    if (ele.classList.contains("is-select")) {
      ele.classList.remove('is-select')
    } else {
      ele.classList.add('is-select')
      console.log("is-select作動")
    }
  }
};

// *****[並べ替える]押した時の処理(次画面出現)*****
const sortWindowAppearance = () => {
  const sortWindowBtn = document.getElementById('sortWindowBtn');

  console.log(sortWindowBtn);

  sortWindowBtn.onclick = () => {
    const sortWindow = document.getElementById('sortWindow');
    sortWindow.classList.add('sortWindowAppearance');
    // sortWindow.style.top = '0';
    console.log("並び替えBtn click成功");
  };

};
// *****[並べ替える]押した時の処理(次画面出現)*****


// *****手札の並べ替え（交換終了後）*****         // 【未ダブり対策】
function sortHandCards() {
  const sortBeforeCards_elem_li = document.getElementById('currentPlayerSortBefore').getElementsByTagName('li');
  const sortBeforeCardsArray = Array.prototype.slice.call(sortBeforeCards_elem_li);
  let sortArray = [];
  let num = 0;
  sortBeforeCardsArray.forEach(ele =>
    ele.onclick = () => {
      console.log(ele.textContent);

      if ( sortArray.length < 5 ) {
        sortArray.splice(num,0,ele.textContent);
        document.getElementById('currentPlayerSortAfter').children[num].innerHTML = `${sortArray[num]}`;
        num++
      }
      if (num != 0 && num != 5 ) {
        currentPlayer.sortNow = true; // 交換中の状態を付与 この値は現在不使用..
        console.log(currentPlayer.sortNow);
      }
      else if ( num === 5 ) {
        currentPlayer.sortNow = false; // 交換中の状態を付与 この値は現在不使用..
        console.log(currentPlayer.sortNow);

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

  gameState.sortNow = false
  sortResetBtn.onclick = () => {

    sortHandCards(); // リセット！ 誤作動防止の為の関数読み込み直し

    const sortAfterCards_elem_li = document.getElementById('currentPlayerSortAfter').getElementsByTagName('li');
    const sortAfterCardsArray = Array.prototype.slice.call(sortAfterCards_elem_li);

    // 全カードの文字消し
    sortAfterCardsArray.forEach (ele =>
      ele.innerHTML = ''
      )
    console.log("並べ替えやり直し")

  }
};
// *****[手札の並べ替えをリセットする]ボタンを押した時の処理*****


// *****[次に進む] ボタン(descriptionBtn)を押した時の処理*****
const writeDescription = () => {
  const writeDescriptionBtn = document.getElementById('descriptionBtn')

  writeDescriptionBtn.onclick = () => {
        // モジュールの複製  currentPlayerSortAfter → descriptionDisplayAreaA
        const currentPlayerSortAfter = document.getElementById('currentPlayerSortAfter')
        const descriptionDisplayAreaA = document.getElementById('descriptionDisplayAreaA')
        const cardsClone = currentPlayerSortAfter.cloneNode(true)
        descriptionDisplayAreaA.children[0].appendChild(cardsClone)
    
    scrollBy(0, 2000);
    console.log("次に進む")
    // isHidden();
  }

  // ここに並べ替え確定の処理を書く（currentPlayer.handCardsに代入）
}

const backToDescription = () => {
  const backToDescriptionBtn = document.getElementById('backToDescriptionBtn')

  backToDescriptionBtn.onclick = () => {

    // 移動
    scrollBy(0, -765);
    console.log("次に進む")
    // isHidden();
  }
}
// *****[次に進む] ボタンを押した時の処理*****

// ***** 説明書き テキストエリアの入力をasideに *****
const descriptionWriteFunc = () => {
  const descriptionWriteArea = document.getElementById('descriptionWriteArea')
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB')

  // descriptionWriteArea.addEventListener('keyup', function() {
  //   console.log(`${descriptionWriteArea.value}`)
    // descriptionDisplayAreaB.innerHTML = `${descriptionWriteArea.value}`
  descriptionWriteArea.addEventListener('keyup', function() {
    console.log(`${descriptionWriteArea.value}`)
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
  const descriptionWriteArea = document.getElementById('descriptionWriteArea');
  //text-align
  const styleLeft = document.getElementById('styleLeft');
  const styleCenter = document.getElementById('styleCenter');

  // Color
  const styleColorPicker = document.getElementById('styleColorPicker');
  // font-size
  const styleLarge = document.getElementById('styleLarge');
  const styleMedium = document.getElementById('styleMedium');
  const styleSmall = document.getElementById('styleSmall');
  styleLeft.onclick = () => {
    descriptionDisplayAreaB.style.textAlign = 'left';
  }
  styleCenter.onclick = () => {
    descriptionDisplayAreaB.style.textAlign ='center';
  }
  // カーソルのある場所に文字列を挿入
  // lineBreak.onclick = () => {
  //   let sentence = descriptionWriteArea.value
  //   const textLength = sentence.length
  //   const cursorPosition = descriptionWriteArea.selectionStart
  //   const cursorBefore = sentence.substr(0, cursorPosition);
  //   const addBrTag = '</>'
  //   const cursorAfter = sentence.substr(cursorPosition, textLength);

  //   sentence = cursorBefore + addBrTag + cursorAfter
  //   descriptionWriteArea.value = sentence

  //   descriptionDisplayAreaB.innerHTML = `${descriptionWriteArea.value}`
  //   descriptionWriteArea.focus()
  // }

  styleLarge.onclick = () => {
    descriptionDisplayAreaB.style.fontSize = `35px`;
  }
  styleMedium.onclick = () => {
    descriptionDisplayAreaB.style.fontSize = `20px`;
  }
  styleSmall.onclick = () => {
    descriptionDisplayAreaB.style.fontSize ='15px';
  }
  styleColorPicker.addEventListener('change', (event) => {
    const value = event.target.value;// 選択された色を確認
    descriptionDisplayAreaB.style.color = value;
  })
  //範囲を指定してタグで囲む仕様
}

// ***** Style change Toolbar *****


// *****最終確認モーダル*****
const finalConfirmModal = () => {

  const finishBtn = document.getElementById('finishBtn');
  const finishModalDone = document.getElementById('finishModalDone');
  const finishModalCancel = document.getElementById('finishModalCancel');

  // finishModalBtn.onclick = () => { //confirm finish modal ?? 英語がわからん
  //   console.log("FinishModalOpen")
  //   isHidden(finishModal);
  // }


  finishBtn.onclick = () => {
    isHidden(finishModal);
  }
  finishModalCancel.onclick = () => {
    isHidden(finishModal);
  }

  // *****[DONE] オブジェクトにゲームの結果を保管(並べ替え/説明入力終了後）*****
  finishModalDone.onclick = () => {
    console.log("Done");
  }
  // *****オブジェクトにゲームの結果を保管(並べ替え/説明入力終了後）*****
}
// *****最終確認モーダル*****

// *****次のプレーヤーへ*****
// 各要素の初期化
// // 説明
// // 並び替えカード
// // 手札
// // プレーヤーオブジェクト
// // 各window
// //

// *****次のプレーヤーへ*****
// ターンの切り替え（P1終了確定とP2の為の初期化）
const playerChange = () => {
  // const changeTurnBtn = document.getElementById('changeTurnBtn');
  const finishModalDoneBtn = document.getElementById('finishModalDone');
  const description = document.getElementById('descriptionDisplayAreaB');
  finishModalDoneBtn.onclick = () => {
    // myTurnのプレイヤー(P1)の残り交換数を0に
    // currentPlayer.changesLeft = 0 ;
    // 本来ならHTMLに変換されたものを保存したいが、とりまこれで問題ないので節約。
    currentPlayer.description = description.textContent;
    currentPlayer.acted = true;

    if ( currentPlayer.player == player1 ) {

      player1.sortNow = currentPlayer.sortNow,
      player1.changesLeft = currentPlayer.changesLeft, // 0
      player1.handCards = currentPlayer.handCards,
      player1.description = currentPlayer.description,
      player1.acted =  currentPlayer.acted
      console.log(currentPlayer);
    
    }
    if ( currentPlayer.player == player2 ) {
      player2.sortNow = currentPlayer.sortNow,
      player2.changesLeft = currentPlayer.changesLeft, // 0
      player2.handCards = currentPlayer.handCards,
      player2.description = currentPlayer.description,
      player2.acted =  currentPlayer.acted
      console.log(currentPlayer);
    }
    currentPlayer.finishedPlayer++;
    
    console.log(currentPlayer);


    // ターンのステート表示の切り替え
    // const turnState = document.getElementById('turnState').children
    // turnState.setAttribute('aria-expanded', 'true')
    // 自ボタンを消す
    // toggleDisabled(changeTurnBtn, 'true');

    // // P1のmyTurnをfalseに
    // player1.myTurn = false;
    // // P2のmyTurnをTrueに
    // player2.myTurn = true;
    // 判定に進むボタンを生成（or表示）
    //未実装
    //手札の交換ボタンの再配置
    //未実装
    // どこかでP2のターンをアナウンスする
    //未実装
    console.log(player1)
    console.log(player2)

  };
};

// *****濁点*****
  // const p1SortAfterCard = document.getElementById('player1SortAfter').getElementsByTagName('li')
  // p1SortAfterCards.addEventListener('click', function() {

  // })

// *****濁点*****




// *****ゲーム後に勝敗判定*****
  // 自己申告制
  // 勝ち数の記録を表示