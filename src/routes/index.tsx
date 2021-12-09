import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Consulta from '../pages/Consulta'
import Cadastro from '../pages/Cadastro'
import Curso from '../pages/Curso'
import Disciplina from '../pages/Disciplina'
import { Questao } from 'src/pages/Questao'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/consulta" component={Consulta} />
    <Route path="/cadastro" component={Cadastro} />
    <Route path="/cursos" component={Curso} />
    <Route path="/disciplinas" component={Disciplina} />
    <Route path="/questao/:id" component={Questao} />
  </Switch>
)

export default Routes
