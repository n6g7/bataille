import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Battle from '../game'
import Graph from './Graph'

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 100%;
`

class App extends PureComponent {
  state = {
    data: [{data:[]}],
    game: null,
    interval: 100,
    players: 4,
    timerId: null
  }

  componentDidMount () {
    this.setState(state => ({
      game: new Battle(state.players),
      timerId: setInterval(this.loop, state.interval)
    }))
  }

  loop = () => {
    const { game } = this.state

    game.loop()
    this.setState({ data: game.series })

    // Stop the loop when the game is over
    if (!game.running) clearInterval(this.state.timerId)
  }

  render () {
    const { data, game } = this.state

    return <Main>
      <Graph
        series={data}
        size={game ? game.deckSize : 0}
      />
    </Main>
  }
}

export default App
