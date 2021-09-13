import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Consulta from '../pages/Consulta'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/consulta" component={Consulta} />
  </Switch>
)

export default Routes
