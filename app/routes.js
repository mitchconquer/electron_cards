// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import EditPage from './containers/EditPage'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/edit" component={EditPage} />
  </Route>
)
