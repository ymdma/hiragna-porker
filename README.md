  # ひらがな DE ポーカー

<div display="flex" align="center">
  <img src="./public/image/start.png" width="50%">
</div>

  ## ひらがな DE ポーカーとは

  "ひらがな DE ポーカー"は、ポーカーのようでそうでない…一風変わったカードゲームアプリです。

<br>

  ### :link:サイトURL:<br>
[https://hiragana-de-porker.web.app/](https://hiragana-de-porker.web.app/)

<br>

  ### 制作・動作確認環境: <br>
Mac GoogleChrome(ver: 最新) <br>
iOS 13 GoogleChrome,safari (画面サイズ: iPhoneで言うと6以上))<br>
<br>
＊PCでのプレイ時、ブラウザ画面の縦幅640px以上推奨<br>
＊スマホでは縦のみ対応。横置き時は「縦でプレイしてください」というダイアログが出ます。<br>
<br>

  #  ひらがな DE ポーカー とは

元となるゲームは、数年前にTwitterで話題になったゲーム「ひらがなポーカー」。

五十音のひらがなの中から一文字づつ記されたカードを使ったゲームです。

ランダムで配られた５枚のカードを、面白い言葉のになるように並べ替え、プレイヤー同士発表し合います。

勝敗は「面白い方が勝ち！」というユニークなゲームです。


  <br>

  # ゲームの流れ

  ## 先行するプレーヤーを決める<br>
  「ひらがなDEポーカー」は、2人のプレーヤーで遊ぶ仕様になっています。

  プリセットされている2つのアバター:chicken: :dog:のうちいずれかを選択し、先行するプレーヤーを決めます。

<br>

  ## カードを交換する
  先行するプレーヤーから行動を開始します。

  まずは、ランダムに(被りなく)配られる、５枚のカードを確認します。（以降これを手札と呼びます）
  手札の文字達からイメージを膨らませ、交換したいカードがあれば、「カードの交換」を行います。
  (交換は最大で４枚まで行えます。)

   なお、交換して不要になったカードは「交換済みカード」として表示されます。

<div display="flex" align="center">
  <img src="https://i.gyazo.com/0b638fb57070ea53c58f34a2d2a04c6b.gif" width="50%">
</div>

  これ以上交換の必要がないと考えた場合、また、交換を終えた時には、「並び替える」ボタンを押して並び替えの画面に移ります。

<br>

  ## 手札を並び替える
  手札が揃ったら並び替えに移ります。

  並び替え画面に用意されている２組のカード達のうち、上段が"元の並び"の手札、下段が"並び替え後"の手札となります。

  まずは、上段の手札を並ばせたい順番にクリックすることで、下段に新しい並びの手札が作成されてゆきます。

<div display="flex" align="left">
  <img src="./public/image/sort.png" width="30%">
</div>
  並びを直したい時（また、文字が被ってしまった時）には、画面下部の「もう一回並び替える」を押すことで、始めからやり直すことができます。
<div display="flex" align="right">
  <img src="https://i.gyazo.com/30559106526d41368c8bb54b31a7749a.gif" width="30%">
</div>
  思った通りに並び替えたら、「次へ進む」を押します。

<br>
<br>

  ＊ ( 濁点、半濁点の添加機能作成中 )

<br>
<br>

  ## コメントを添える
  このウィンドウでは、完成した言葉に対して、任意のコメントを添えることができます、

  例えばTwitterで、面白い写真をtweetする際に、一言ボケコメントを添えて笑いを誘うように、気の利いた一言コメントを添えたり。
  または、なんでもない言葉でも詳しいシチュエーションを説明して面白くしてみたり。それぞれの発想で活用してください。

<div display="flex" align="center">
  <img src="./public/image/comment.png" width="40%">
</div>

  使い方としては、
  ・テキストエリアを選択して文字入力(上限は140文字)。
  ・テキストエリア下のツールバーの各ボタンを押すことで、書式の変更が行えます(全体に一括してかかります)。

  また、並び替えに戻りたい時は、「並び替えに戻る」ボタンを押します。この時、入力途中のものは削除されませんので、安心して選択してください。

<br>
  満足したところで、「行動を終える」ボタンを押し、次プレイヤーにバトンタッチします。

<br>
<br>

  ## 後行プレーヤーのターン
  後行のプレイヤーも、先行のプレイヤーと同じ流れでプレイします。
  
  後行プレイヤーが、コメントを添える画面で「行動を終える」ボタンを押した時に、判定に移ってよいかどうか確認するモーダルウィンドウが現れます。
  問題なければそのまま肯定し、判定画面に映ってください。

<br>

  ## 判定(発表)画面
  各プレーヤーが作った"文字"と”コメント”が発表されます。
  先行プレーヤーが上に、後行のプレーヤーが下に、アバターとともに縦に並んで表示されます。

<br>
<br>
<div display="flex" align="center">
  <img src="./public/image/result.png" width="40%">
</div>


<br>
<br>

## 投票する

「判定する」ボタンを押すことで、投票に移ります。<br>
勝敗は各プレイヤーの感覚に委ねられます。<br>

各プレイヤーに対し、勝敗を問うモーダルが表示されますので、正直にどちらが勝ったか答えて下さい。

<br>
<br>

最後に、結果の表示がされ、ゲーム終了となります。

<br>

お疲れ様でした！

<br>
<br>

***

<br>

  ## 制作背景

ライブラリを使わないJavaScript、Webpack4を用いたコンパイル、Sassや、FLOCSSを用いた(意識)したCSS等、フロントエンド系の諸技術を使用した習作として製作しました。

<br>

***

<br>


  ## なぜこのゲームにしたのか

  - 「やってみたいね」と言う話になったが既製品でアプリが見つからなかったこと。<br>
  - 検索すると、 [*** アプリ] のように表示されるが、どうやら既製品がないこと。<br>
  - 流行ったのは数年前ですが、前とはいえ普遍的な面白さがあること。<br>
  - ゲームのルールには著作権が適用されないこと。<br>

<br>

***
<br>

  ## 苦労した点

  - 素のJavaScriptの様々な書き方による、DOM取得時の細かい仕様の違いについて。<br>

    例えば、ここは .querySelectorAll()で取得しているので、戻り値がNodeListで返って来ていて…それを配列のようにループ処理するには…と、
    「これはこうだからこう処理する」というような部分が、感覚的に入ってくるまでに時間がかかりました。

  - 手順を考える<br>
    複数のステップに渡るゲームアプリの制作は初めてだったので、
    要素の取得のタイミングや、表示の入り切り、ゲームの進行と処理の流れ（順番）を意識しながらコードを組み立てるのは、少し慣れるまで大変でした。
    始めの段階ではイベントドリブンであることをしっかり意識することができなかったため、苦戦しました。

  - 再利用可能なコード設計<br>
    再利用可能なコードを考えるのに、何度か書き直した場面が（多く）ありました。<br>
    しかしそれは、可読性をよくし、さらに整理して書き足すことや、複数プレイヤーでのプレイや拡張性を想定するのに必要なポイントでした。


***
<br>

  ## 工夫した点
  - スクロールの制御<br>
    ゲーム進行のステップ（画面遷移）を縦スクロールによって実装したため、いくつかの問題を解決する必要がありました<br>
    
    1 <br>
    ユーザーがスクロールすることで、見せたくない部分が見れてしまう。<br>
    （例えば、先行ユーザーの結果を先にセットしていると見れてしまう、など。）
    2 <br>
    「ユーザーがブラウザ画面幅の再指定を行うと、表示エリアが変わってしまう（縦方向にズレてしまう）」
    
    それらを防ぐため、３つのスクロールに関する関数(機能)を用意しました。

    一つ目は、普通に次のステージへジャンプする処理。<br>
    二つ目は、画面のリサイズを検知して、ゲームの進行状況に合わせてスクロールし直す処理。<br>
    二つ目は、スクロールを検知して、ゲームの進行状況に合わせてスクロールし直す（一つ目の関数）処理。<br>

それぞれバッティングさせないように組むのに、少し工夫が必要でした。

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
          console.log("スクロール動作:ジャンプ");
          console.log(sortStage);
          }
        }

<br>


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

<br>

        // 表示ブレのため、スクロールされたら戻す
        window.addEventListener('scroll', () => {
          let timeoutId;
          if ( timeoutId ) return;
          timeoutId = setTimeout( function () {
            timeoutId = 0;
          GoToNextStage()}, 2000);
        });

<br>
***

<br>

  ## 今後実装・修正するポイント

   ### 実装予定
  - 濁点・半濁点について<br>
    → 別の文字として元のカードに混ぜるか、並べ替えの際に自由に付けられるようにするか迷っていたため未実装。<br>
       濁点なしのひらがなに付加する形で実装予定。

  - （PC向け）初めのウィンドウ以外でもハンバーガーメニューを表示させるようにする。<br>
    → aria-expandedとメディアクエリによって振り分けているが、PCのみ、一部スクロールの位置で表示を変えるようにする。

  ### 修正予定
  - ハンバーガーメニューの内容が現在入っていないので「動作推奨環境について」、「ゲームルール」の二つをゲーム中に参照できるようにする。

  - 並び替えの際に、同じカードを二枚並べることができてしまうので、これは要修正。

  - 初めの画面のインフォメーションとカードの選択との兼ね合いが一部崩れるため、バグフィックス。

  - アニメーションの部分を、Promiseを用いた順次処理の形に書き換える。
***
<br>

:copyright: MasatoYamada

