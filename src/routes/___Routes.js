import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateRecord from './CreateRecord'

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact>
        home
      </Route>
      <Route path="/new">
        <CreateRecord />
      </Route>
      <Route path="/record/:record" exact>
        view
      </Route>
      <Route path="/record/:record/edit">edit</Route>
    </Router>
  )
}
