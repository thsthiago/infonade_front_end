export interface IQuestionDescription {
  curso: string
  enunciado: string
  numeroQuestao: number
  edicao: number
  type: 'disertativa' | 'alternativa'
  disciplinas: string[]
  id: number
}
