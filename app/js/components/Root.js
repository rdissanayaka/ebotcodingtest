import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { routes } from '../constants'
import App from './App'
import Categorize from './Categorize'
import Checkout from './Checkout'
import Success from './Success'
import Failure from './Failure'
import PageNotFound from './PageNotFound'

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path={routes.Categorize} component={App}>
        <IndexRoute component={Categorize} />
        <Route path={routes.Checkout} component={Checkout} />
        <Route path={routes.Success} component={Success} />
        <Route path={routes.Failure} component={Failure} />
        <Route path={routes.PageNotFound} component={PageNotFound} />
      </Route>
    </Router>
  </Provider>
)

export default Root;
