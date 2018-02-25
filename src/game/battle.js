import Card from './card'
import CardSet from './set'

class Battle {
  static colours = [
    '#eb2f06',
    '#4a69bd',
    '#78e08f',
    '#fa983a'
  ]

  constructor(players = 2, jokers = 2) {
    const deck = CardSet.fullDeck(jokers)
    deck.shuffle()
    this.deckSize = deck.size

    this.players = deck.distribute(players).map((set, i) => ({
      colour: Battle.colours[i % Battle.colours.length],
      history: [set.cards.length],
      number: i+1,
      playing: true,
      set
    }))

    this.running = true
    this.roundsCount = 0
  }

  findHighestCards(cards) {
    let maxValue = Card.MIN
    let maxIndexes = []

    cards.forEach((card, index) => {
      if (!card) return

      const res = card.compare(maxValue)
      if (res > 0) {
        maxValue = card
        maxIndexes = [index]
      } else if (res == 0) {
        maxIndexes.push(index)
      }
    })

    return maxIndexes
  }

  round() {
    if (!this.running) return

    const prizeCards = []
    let remainingPlayers = this.players.filter(p => p.playing)

    while (remainingPlayers.length !== 1) {
      // Draw cards
      const playingCards = remainingPlayers.map(player => player.set.shift())
      prizeCards.push(...playingCards)

      const highestIndexes = this.findHighestCards(playingCards)
      remainingPlayers = remainingPlayers.filter((p, i) => highestIndexes.includes(i))

      if (remainingPlayers.length === 1) break
      else {
        console.warn('BATTLE')
        // Remaining players add extra cards to the pot
        const extraCards = remainingPlayers.map(player => player.set.shift())
        prizeCards.push(...extraCards)
      }
    }

    // Winner gets the prize
    remainingPlayers[0].set.cards.push(...prizeCards)

    // Update history
    this.players.forEach(player => {
      player.history.push(player.set.cards.length)
    })

    // Remove losers
    this.players
      .filter(player => player.set.cards.length === 0)
      .forEach(player => player.playing = false)

    this.roundsCount++
    console.log(`[${this.roundsCount}] Player ${remainingPlayers[0].number} wins ${prizeCards}`)

    // Stop the game when there's only one player left
    if (this.players.filter(p => p.playing).length === 1) this.running = false
  }

  loop(speed = 1) {
    for (let i = 0; i<speed; i++) this.round()
  }

  get series () {
    return this.players.map(player => ({
      colour: player.colour,
      data: player.history.map((cards, round) => ({
        cards,
        round
      }))
    }))
  }
}

export default Battle
