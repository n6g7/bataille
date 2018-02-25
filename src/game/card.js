class Card {
  static colours = [
    '♥️',
    '♦️',
    '♣️',
    '♠️'
  ]
  static values = new Array(13).fill(0).map((v, i) => i+1)
  static count = Card.colours.length * Card.values.length
  static MIN = new Card('', 0)

  constructor(colour, value) {
    this.colour = colour
    this.value = value
  }

  static joker() {
    return new Card('🃏', 14)
  }

  get valueAsString() {
    if (this.value === 14) return 'JOKER'
    if (this.value === 13) return 'A'
    if (this.value === 12) return 'K'
    if (this.value === 11) return 'Q'
    if (this.value === 10) return 'J'
    return this.value+1
  }

  toString() {
    return `${this.colour}${this.valueAsString}`
  }

  compare(other) {
    return this.value - other.value
  }
}

export default Card
