import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Consulta from '../pages/Consulta'
import Cadastro from '../pages/Cadastro'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/consulta" component={Consulta} />
    <Route path="/cadastro" component={Cadastro} />
  </Switch>
)

export default Routes
