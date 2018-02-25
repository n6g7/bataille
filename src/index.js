import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import App from './components/App'

injectGlobal`
  body {
    background: #242424;
  }
`

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
