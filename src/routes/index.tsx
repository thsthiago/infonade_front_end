import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Consulta from '../pages/Consulta'
import Cadastro from '../pages/Cadastro'
import Curso from '../pages/Curso'
import Disciplina from '../pages/Disciplina'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/consulta" component={Consulta} />
    <Route path="/cadastro" component={Cadastro} />
    <Route path="/cursos" component={Curso} />
    <Route path="/disciplinas" component={Disciplina} />
  </Switch>
)

export default Routes
