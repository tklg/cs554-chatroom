import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'

import thunk from 'redux-thunk'
import ErrorBoundary from './ErrorBoundary'
import reducer from './reducers'

import App from './containers/App'
import Login from './containers/Login'
import Preloader from './components/Preloader'
import './scss/app.scss'

const history = createBrowserHistory()

const store = createStore(
  reducer(history),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
)

const A = () =>
  <ErrorBoundary>
    <Provider store={store}>
      <Router basepath='/' history={history} >
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Preloader} />
          <Route path='/channels/:channel' exact component={App} />
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>

ReactDOM.render(<A />, document.getElementById('root'))
