import { CreateCurse } from '../CreateCurse'
import { CreateQuestions } from '../CreateQuetions'
import { CreateSubject } from '../CreateSubject'
// import SwipeableViews from 'react-swipeable-views'

interface ITypeCadastroProps {
  create: 0 | 1 | 2
}

// Teste slider
// export const TypeCadastro = ({ create }: ITypeCadastroProps) => (
//   <SwipeableViews index={create} style={{ willChange: 'none' }}>
//     <CreateCurse />
//     <CreateSubject />
//     <CreateQuestions />
//   </SwipeableViews>
// )

export const TypeCadastro = ({ create }: ITypeCadastroProps) => {
  switch (create) {
    case 0:
      return <CreateCurse />
    case 1:
      return <CreateSubject />
    case 2:
      return <CreateQuestions />
    default:
      return <div />
  }
}
