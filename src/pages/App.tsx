import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import ThemeProvider, { ThemedGlobalStyle } from 'theme'
import AppLayout from './AppLayout'
import Home from './Home'
import Liquidity from './Liquidity'
import Swap from './Swap'

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <ThemedGlobalStyle />
        <AppLayout>
          <Switch>
            <Route exact strict path="/home" component={Home} />
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/liquidity" component={Liquidity} />

            <Redirect from="/" to="/home" />
          </Switch>
        </AppLayout>
      </ThemeProvider>
    </HashRouter>
  )
}
export default App
