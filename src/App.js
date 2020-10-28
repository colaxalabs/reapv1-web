import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Web3 from 'web3'

// Containers
import { DesktopContainer } from './containers'

// Components
import {
  Homepage,
  Userpage,
} from './components/pages'

// Redux actions
import {
  networkFound,
  disconnectWallet,
} from './actions'

// Utils
import { loadWeb3 } from './utils'

// Redux store
import { store } from './store'

import './App.less'

function App() {

  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'

  useEffect(() => {
    loadWeb3()
  })

  if (isMetamaskInstalled) {
    window.ethereum.on('chainChanged', async(_chainId) => {
      const networkInfo = {}
      networkInfo.currentNetwork = Web3.utils.isHex(_chainId) ? Web3.utils.hexToNumber(_chainId) : _chainId
      store.dispatch(networkFound({ ...networkInfo }))
    })
    window.ethereum.on('disconnect', (error) => {
      store.dispatch(disconnectWallet())
      window.alert(`Error ${error.message}`)
    })
  }

  return (
    <DesktopContainer>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/wallet/' component={Userpage} />
      </Switch>
    </DesktopContainer>
  );
}

export default App;

