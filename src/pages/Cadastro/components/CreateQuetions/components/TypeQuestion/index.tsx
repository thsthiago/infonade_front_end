import { Container } from './styles'
import { QuestionAlternative } from '../QuestionAlternative'
import { QuestionDiscusive } from '../QuestionDiscursive'

interface ITypeQuestion {
  type: 'alternativa' | 'dissertativa'
}

const typeQuestions = {
  alternativa: (
    <>
      <QuestionAlternative
        name="letraA"
        nameRadio="teste"
        value="A"
        letra="A"
      />
      <QuestionAlternative
        name="letraB"
        nameRadio="teste"
        value="B"
        letra="B"
      />
      <QuestionAlternative
        name="letraC"
        nameRadio="teste"
        value="C"
        letra="C"
      />
      <QuestionAlternative
        name="letraD"
        nameRadio="teste"
        value="D"
        letra="D"
      />
      <QuestionAlternative
        name="letraE"
        nameRadio="teste"
        value="E"
        letra="E"
      />
    </>
  ),
  dissertativa: (
    <>
      <QuestionDiscusive name="letraA" value="A" letra="A" />
      <QuestionDiscusive name="letraB" value="B" letra="B" />
      <QuestionDiscusive name="letraC" value="C" letra="C" />
      <QuestionDiscusive name="letraD" value="D" letra="D" />
      <QuestionDiscusive name="letraE" value="E" letra="E" />
    </>
  )
}

export const TypeQuestion = ({ type }: ITypeQuestion) => (
  <Container>{typeQuestions[type]}</Container>
)
