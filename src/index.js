import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import ErrorBoundary from './ErrorBoundary'
import reducer from './reducers'

import App from './containers/App'
import Login from './containers/Login'
import './scss/app.scss'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

const A = () =>
  <ErrorBoundary>
    <Provider store={store}>
      <Router basepath='/'>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={App} />
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>

ReactDOM.render(<A />, document.getElementById('root'))
