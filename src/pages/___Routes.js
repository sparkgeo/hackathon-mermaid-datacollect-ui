import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateRecord from './CreateRecord'
import HomePage from './HomePage'
import EditSite from './EditSite'

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/new">
        <CreateRecord />
      </Route>
      {/* <Route path="/record/:record" exact>
        view
      </Route> */}
      <Route path="/record/:record/edit">
        <EditSite />
      </Route>
    </Router>
  )
}
