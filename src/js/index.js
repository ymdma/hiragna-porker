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

// 各プレーヤーの手札を準備
// let player1Array =[ "ら","り","る","れ","ろ"] //表示確認用

  //5項の空配列を用意　テスト用　消してよし
// let player1 = new Array(5)
// let player2Array = new Array(5)

let player1Array = cards.slice(41,46);
let player2Array = cards.slice(36,41);

// ゲーム状態
let gameState ={
  sortNow: false
}

// プレーヤーのオブジェクトを作成(プロトタイプはなし)
let player1 = {
  name: 'Player1',
  avatar: './image/tori.png',
  handCards: player1Array,
  changesLeft: 4,
  myTurn: false,
  description: ''
}

let player2 = {
  name: 'Player2',
  avatar: './image/inu.png',
  handCards: player2Array,
  changesLeft: 4,
  myTurn: false,
  description: ''
}
// *****「ゲームなう」の状態の判定を加える*****
// 各ボタンを押せないようにする

console.log(player1)
console.log(player1.handCards)



document.addEventListener('DOMContentLoaded', () => {
  setGame();
  cardChange();
  playerChange();
  sortHandCards();
  sortWindowAppearance();
  sortReset();
  writeDescription();
  backToDescription();
  finalConfirmModal();
  descriptionWriteFunc();
  styleChangeToolbar();
});

function toggleDisabled(target,val) {
  target.setAttribute('disabled', val);
};



// スタートボタン押した時に走るメソッド
const setGame = () => {
  const startBtn = document.getElementById('startBtn');
  const player1HandCards = document.getElementById('player1HandCards');
  const player2HandCards = document.getElementById('player2HandCards');
  const info = document.getElementById('information').children[0]

  startBtn.onclick = () => {
    //スタートボタンを非活性に
    startBtn.setAttribute('disabled', true)
    // P1のターン開始
    player1.myTurn = true;
    // 名前とアバターのセッティング
    
    document.getElementById('playerName').innerHTML = 'とり'
    document.getElementById('avatarImg').setAttribute('src', './image/tori.png')
    // document.getElementById('avatarImg').style.opacity = '1'
    isHidden(document.getElementById('avatarImg'))

    // アナウンス
    info.innerHTML = 'カードを交換して言葉を完成させよう！'

    // 手札のセット
    let numP1 = 0;
    // player1.player1Array.forEach(function(i){
    console.log(player1.myTurn)
    player1.handCards.forEach(function(i){
      player1HandCards.children[numP1].innerHTML = `${i}`
      numP1++
    });

    let numP2 =0
    player2.handCards.forEach(function(i){
      player2HandCards.children[numP2].innerHTML = `${i}`
      numP2++
    });
  }
};



// カードの交換
const cardChange = () => {


  // 後何回交換できるかの表示
    // 未実装

  const changeDoneBtn = document.getElementById('changeDoneBtn');
  const changeSkipBtn = document.getElementById('changeSkipBtn');
  const changeStartBtn2 = document.getElementById('changeStartBtn2');

  // // ****** P1のターンの場合 *****
  
  // 「手札の交換を始める」ボタン
  changeStartBtn.onclick = () => {
    if ( player1.myTurn === true ) {
      const info = document.getElementById('information').children[0] // for info
      // 交換開始(this)ボタンを消す
      isHidden(changeStartBtn);
      // 交換するボタン(changeDoneBtn)・スキップボタンを表示
      isHidden(changeDoneBtn)
      isHidden(changeSkipBtn)
      // アナウンス
      info.innerHTML = 'カードを決めたら「交換する」ボタンを押そう'
      // ”手札を”クリックした時に、色を変えて、クラスを付与する
        // 要素をHTMLCollectionに
      let p1SelectField = document.getElementById('player1HandCards').getElementsByTagName('li')
        // HTMLCollectionを配列化
      let p1HandsSelect = Array.prototype.slice.call(p1SelectField)

      console.log(p1HandsSelect[0].classList)

      // クリックしたら is-selectクラスを付与する
      p1HandsSelect.forEach(ele =>

        ele.onclick = () => {
          // console.log(ele.classList)
          isSelect(ele)

          // 1枚ずつ交換パターン
          if( document.querySelectorAll('.js_handCards > .is-select').length === 1
            ) {
            changeDoneBtn.removeAttribute('disabled') //toggleDisabledが使えなかったので
            info.innerHTML = 'カードを決めたら「交換する」ボタンを押そう'
            console.log("カード選択数 １ (OK)")
          }
          else if( document.querySelectorAll('.js_handCards > .is-select').length === 0
          ) {
            changeDoneBtn.setAttribute('disabled',true)
            info.innerHTML = '交換するカードを選ぼう！'
            console.log("カード未選択")
          }
          else{
            changeDoneBtn.setAttribute('disabled',true)
            info.innerHTML = '選ぶのは一枚だけだよ！'
            console.log("カード選択数２〜５")
          }
        }
      )
      // changeLeftが残り○枚(4-1)（「且つ、交換したいカードが選択済み」という条件は、querySelectorにライブ性がないので含まず。）

        if (player1.changesLeft === 4) {
          cardChangeOnclickDone(); //処理を次の関数へ受け渡す
        }


    } // if P1 myTurn=true

    // ＊＊＊＊＊ここに P2ターン時の記述 ＊＊＊＊＊
    // if ( player2.myTurn === true ){}

  } // changeStartBtn.onclick


  // ******* [交換する] を押した時の処理 *******
  function cardChangeOnclickDone() {
    const info = document.getElementById('information').children[0] // for info
    // [選んだカードを交換する]ボタン を押した時
    changeDoneBtn.onclick = () => {
      console.log("cardChangeOnclickDone発動。残り交換数⤵︎")
      console.log(player1.changesLeft)

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
        selectElements.classList.remove('is-select')
      };
      // Player1のターンの場合
      // 山札から引くカードをダブらないようにする為の条件分岐
      switch (player1.changesLeft) {
        case 4:
          console.log('case4: 現在のプレイヤーの状態⤵︎')
          console.log(player1)
          if ( player1.myTurn = true ) {
            removeAndAdd(0)
          }
          else if ( player2.myTurn === true ) {
            removeAndAdd(4)
          }
          player1.changesLeft = 3;
          // 「選んでね」のインフォメーションを出す。
          info.innerHTML = '交換したいカードを選ぼう！ あと４回！'
          break;

        case 3:
          console.log('SWITCH文内 LEFT:3')
          info.innerHTML = "交換したいカードを選ぼう！ あと３回！"
          if ( player1.myTurn === true ) {
            removeAndAdd(1)
          }
          else if ( player2.myTurn === true ) {
            removeAndAdd(5)
          }
          player1.changesLeft = 2;
          break;

        case 2:
          console.log('SWITCH文内 LEFT:2')
          info.innerHTML = "交換したいカードを選ぼう！ あと２回！"
          // moreCardChangeOnclickDone()
          if ( player1.myTurn === true ) {
            removeAndAdd(2)
          }
          else if ( player2.myTurn === true ) {
            removeAndAdd(6)
          }
          player1.changesLeft = 1;
          break;

        case 1:
          console.log('SWITCH文内 LEFT:1')
          info.innerHTML = "交換したいカードを選ぼう！ これがラスチャン！"
          // moreCardChangeOnclickDone()
          if ( player1.myTurn === true ) {
            removeAndAdd(3)
          }
          else if ( player2.myTurn === true ) {
            removeAndAdd(7)
          }
          player1.changesLeft = 0;
          // info.innerHTML = "交換終了！次のプレイヤーのターンへ！"
          changeEnd();
          break;
      }
      if( player1.changesLeft >= 1 ) {
        // 4 「交換する」ボタンを一旦隠す
        // isHidden(changeStartBtn)
        isHidden(changeDoneBtn)
        // 5 「もう一度交換する」ボタンを表示
        isHidden(changeStartBtn2)
        // 6 次の行動をアナウンス
        info.innerHTML = 'まだ交換する場合はボタンを押してね'
        console.log("if Left >= 1")
      }
      else{
        console.log("else")
        // isHidden(changeStartBtn2)
        changeSkipBtn.classList.add('is-hidden');
      }
    }
  }
  // ******* [交換する] を押した時の処理 *******

  // ******* [次の交換をする] を押した時の処理 *******


  changeStartBtn2.onclick = () =>{
    console.log("moreCardChangeOnclickDone発動。残り交換数⤵︎")
    console.log(player1.changesLeft)
    const info = document.getElementById('information').children[0]
    // // 「もう一度交換する」ボタンを隠す
    isHidden(changeStartBtn2)
    // 「交換する」ボタンを再表示
    isHidden(changeDoneBtn)
    // アナウンス
    info.innerHTML = '交換するカードを選ぼう！'
  }

  // ******* [次の交換をする] を押した時の処理 *******

  // ******* [交換スキップ] を押した時の処理 *******
  // const changeSkipBtn = document.getElementById('changeSkipBtn');
  changeSkipBtn.onclick = () => {
    changeEnd();

    // 交換開始(this)ボタンを非表示
    // isHidden(changeStartBtn);
    // [もう一枚交換する]ボタンの非表示
    // isHidden(changeStartBtn2);
    changeStartBtn2.classList.add('is-hidden');
    // スキップボタンを非表示
    isHidden(changeSkipBtn)
    // isHidden(sortWindowBtn)
    player1.changesLeft = 0;
    console.log(player1)
  }
  // ******* [交換スキップ] を押した時の処理 *******




  // ******* 交換終了時の処理 *******
  function changeEnd() {
    const info = document.getElementById('information').children[0];
    console.log('function changeEnd');
    // //「もう一度交換する」ボタンを隠す
    changeStartBtn2.classList.add('is-hidden')
    // 「交換する」ボタンを非表示＆非活性に
    changeDoneBtn.setAttribute('disabled',true);
    // isHidden(changeDoneBtn);
    changeDoneBtn.classList.add('is-hidden')
    info.innerHTML = '交換終了！<ここに次のアナウンス>';
    isHidden(sortWindowBtn);
    arrayFix();

    const selectElements = document.querySelectorAll('.js_handCards > .is-select');
    // 3 今付いているisSelectを外す
    if ( selectElements ){
      selectElements.forEach(ele =>
        ele.classList.remove('is-select')
      );
    };
  };
  // // ***** 配列組み直し処理 *****
  function arrayFix() {

    // 配列の組み直し
    const player1HandCards = document.getElementById('player1HandCards');
    const player2HandCards = document.getElementById('player2HandCards');
    let num = 0;
    if (player1.myTurn === true) {
      // プレイヤーオブジェクト内の配列を更新
      player1.handCards = []
      num = 0
      for( let n = 5 ; n-- ; n != 0) {
        let str = player1HandCards.children[num].textContent;
        num++
        // player1.handCards.splice(num - 1,0,str)
        player1.handCards.push(str)
      }
      console.log(player1.handCards)
      // 並び替え （before） に値を挿入
      num = 0
      player1.handCards.forEach(function(i){
        player1SortBefore.children[num].innerHTML = `${i}`
        num++
      });

    }
    else if (player2.myTurn === true){
      // プレイヤーオブジェクト内の配列を更新
      player2.handCards = []
      num = 0
      for( let n = 5 ; n-- ; n != 0) {
        let str = player2HandCards.children[num].textContent;
        num++
        // player2.handCards.splice(numP1 - 1,0,str)
        player2.handCards.push(str)
      }
      console.log(player2.handCards)
            // 並び替え （before） に値を挿入
      num = 0
      player2.handCards.forEach(function(i){
        player2SortBefore.children[num].innerHTML = `${i}`
        num++
      });
    }
    // // ***** 配列組み直し・並び替え画面の元カードへの挿入の処理 *****
  };
  // ******* 交換終了時の処理 *******


  // ******* 並び替え時の処理 *******
  const player1SortAfter = document.getElementById('player1HandCards');
  const player2HandCards = document.getElementById('player2HandCards');

  // ******* 並び替え時の処理 *******



};




function isHidden(ele) {
  if (ele.classList.contains('is-hidden')) {
    ele.classList.remove('is-hidden')
  } else {
    ele.classList.add('is-hidden')
    console.log('isHidden作動')
  }
};

function isSelect(ele) {
  if ((player1.myTurn === true && player1.changesLeft != 0)
    || (player2.myTurn === true && player2.changesLeft != 0)) {
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
  const sortWindowBtn = document.getElementById('sortWindowBtn')
  console.log(sortWindowBtn)
  
  sortWindowBtn.onclick = () => {
    const sortWindow = document.getElementById('sortWindow')
    sortWindow.classList.add('sortWindowAppearance')
    // sortWindow.style.top = '0'
    console.log("並び替えBtn click成功")
  }
};
// *****[並べ替える]押した時の処理(次画面出現)*****


// *****手札の並べ替え（交換終了後）*****         // 【要ダブり対策】
function sortHandCards() {
  const p1SortBeforeCardsChild = document.getElementById('player1SortBefore').getElementsByTagName('li')
  const ttt = Array.prototype.slice.call(p1SortBeforeCardsChild)
  let sortArray = [];
  let num = 0;
  ttt.forEach(ele =>
    ele.onclick = () => {
      console.log(ele.textContent)

      if ( sortArray.length < 5 ) {
        sortArray.splice(num,0,ele.textContent)
        document.getElementById('player1SortAfter').children[num].innerHTML = `${sortArray[num]}`
        num++
      }
      if (num != 0 && num != 5 ) {
        gameState.sortNow = true
        console.log(gameState.sortNow)
      }
      else if ( num === 5 ) {
        gameState.sortNow = false
        sortHandCards(); // リセット！ *やり直し用
        console.log(gameState.sortNow)
      }
      console.log(num)
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
    // P1
    if ( player1.myTurn === true ) {
      const p1SortAfterCardsChild = document.getElementById('player1SortAfter').getElementsByTagName('li')
      const ttt = Array.prototype.slice.call(p1SortAfterCardsChild)
      ttt.forEach (ele =>
        ele.innerHTML = ''
        )
      console.log("並べ替えやり直し")
    }
    // P2
    else if ( player2.myTurn === true ) {
      const p2SortAfterCardsChild = document.getElementById('player2SortAfter').getElementsByTagName('li')
      const ttt = Array.prototype.slice.call(p2SortAfterCardsChild)
      ttt.forEach (ele =>
        ele.innerHTML = ''
        )
      console.log("並べ替えやり直し")
    }
  }
};
// *****[手札の並べ替えをリセットする]ボタンを押した時の処理*****


// *****[次に進む] ボタンを押した時の処理*****
const writeDescription = () => {
  const writeDescriptionBtn = document.getElementById('descriptionBtn')

  writeDescriptionBtn.onclick = () => {
        // モジュールの複製  player1SortAfter → descriptionDisplayAreaA
        const player1SortAfter = document.getElementById('player1SortAfter')
        const descriptionDisplayAreaA = document.getElementById('descriptionDisplayAreaA')
        const cardsClone = player1SortAfter.cloneNode(true)
        descriptionDisplayAreaA.children[0].appendChild(cardsClone)
    
    scrollBy(0, 2000);
    console.log("次に進む")
    // isHidden();
  }
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



// テキストエリアに入力
// ↓
// 正規表現
// ↓
// asideに挿入

// ***** 説明書き テキストエリアの入力をasideに *****

// ***** Style change Toolbar *****

const styleChangeToolbar = () => {
  const descriptionDisplayAreaB = document.getElementById('descriptionDisplayAreaB')
  const descriptionWriteArea = document.getElementById('descriptionWriteArea')
  //text-align
  const styleLeft = document.getElementById('styleLeft')
  const styleCenter = document.getElementById('styleCenter')

  // Color
  const styleColorPicker = document.getElementById('styleColorPicker')
  // font-size
  const styleLarge = document.getElementById('styleLarge')
  const styleMedium = document.getElementById('styleMedium')
  const styleSmall = document.getElementById('styleSmall')
  styleLeft.onclick = () => {
    descriptionDisplayAreaB.style.textAlign = 'left'
  }
  styleCenter.onclick = () => {
    descriptionDisplayAreaB.style.textAlign ='center'
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
    descriptionDisplayAreaB.style.fontSize = `35px`
  }
  styleMedium.onclick = () => {
    descriptionDisplayAreaB.style.fontSize = `20px`
  }
  styleSmall.onclick = () => {
    descriptionDisplayAreaB.style.fontSize ='15px'
  }
  styleColorPicker.addEventListener('change', (event) => {
    const value = event.target.value;// 選択された色を確認
    descriptionDisplayAreaB.style.color = value
  })
  //範囲を指定してタグで囲む仕様
}

// ***** Style change Toolbar *****


// *****最終確認モーダル*****
const finalConfirmModal = () => {

  const finishBtn = document.getElementById('finishBtn')
  const finishModalDone = document.getElementById('finishModalDone')
  const finishModalCancel = document.getElementById('finishModalCancel')

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
    console.log("Done")
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
  const changeTurnBtn = document.getElementById('changeTurnBtn');
  changeTurnBtn.onclick = () => {
    // myTurnのプレイヤー(P1)の残り交換数を0に
    player1.changesLeft = 0 ;
    // ターンのステート表示の切り替え
    const turnState = document.getElementById('turnState').children
    turnState.setAttribute('aria-expanded', 'true')
    // 自ボタンを消す
    toggleDisabled(changeTurnBtn, 'true');

    // P1のmyTurnをfalseに
    player1.myTurn = false;
    // P2のmyTurnをTrueに
    player2.myTurn = true;
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