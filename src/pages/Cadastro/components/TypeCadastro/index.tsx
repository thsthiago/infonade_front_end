import { CreateCurse } from '../CreateCurse'
import { CreateQuestions } from '../CreateQuetions'
import { CreateSubject } from '../CreateSubject'

interface ITypeCadastroProps {
  create: 'curso' | 'disciplina' | 'questao'
}

export const TypeCadastro = ({ create }: ITypeCadastroProps) => {
  switch (create) {
    case 'curso':
      return <CreateCurse />
    case 'disciplina':
      return <CreateSubject />
    case 'questao':
      return <CreateQuestions />
    default:
      return <div />
  }
}
