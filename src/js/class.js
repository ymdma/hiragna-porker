

export class Player {

  constructor( name, avatar, handCards, changesLeft, description, winner ) {
    this.name = name;
    this.avatar = avatar;
    this.handCards = handCards;
    this.changesLeft = changesLeft;
    this.description = description;
    this.winner = winner;
  }
}


// 子クラス
// class CurrentPlayer extends Player {

// }

// 元の記述（グローバルに変数を登録）
// let player1 = {
//   name: 'とり',
//   avatar: './image/tori.png',
//   handCards: [],
//   changesLeft: 4,
//   description: '',
//   winner: false
// }
// let player2 = {
//   name: 'いぬ',
//   avatar: './image/inu.png',
//   handCards: [],
//   changesLeft: 4,
//   description: '',
//   winner: false
// }
