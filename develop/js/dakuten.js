// *****濁点*****

export const dakuten = () => {
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
        case 'ー': openPop_dakuten('ー','〜','','-',index);
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
    if ( maru != '' ) {
      let Maru = document.createElement('p')
      Maru.innerHTML = maru
      Div.appendChild(Maru)
      Maru.setAttribute('id', 'optionB');
    }
    // 小文字
    if ( komoji != '' ) {
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

