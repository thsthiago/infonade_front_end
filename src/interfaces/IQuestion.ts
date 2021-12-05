export interface IQuestionDescription {
  curso: string
  enunciado: string
  numeroQuestao: number
  edicao: number
  type: 'disertativa' | 'alternativa'
  disciplinas: string[]
  id: number
  alternativas?: IAlternativas[]
}

interface IAlternativas {
  id: number
  enunciado: string
  letra: string
}
