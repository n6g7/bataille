import _ from 'lodash'
import Card from './card'

class CardSet {
  constructor() {
    this.cards = []
  }

  static fullDeck(jokers=0) {
    const deck = new CardSet()
    Card.colours.forEach(colour => {
      Card.values.forEach(value => {
        deck.cards.push(new Card(colour, value))
      })
    })

    for (let i = 0; i<jokers; i++) deck.cards.push(Card.joker())

    return deck
  }

  get size () {
    return this.cards.length
  }

  shuffle() {
    this.cards = _.shuffle(this.cards)
  }

  shift() {
    return this.cards.shift()
  }

  distribute(n) {
    const sets = new Array(n).fill().map(() => new CardSet())

    this.cards.forEach((card, index) => {
      sets[index % n].cards.push(card)
    })

    return sets
  }
}

export default CardSet
