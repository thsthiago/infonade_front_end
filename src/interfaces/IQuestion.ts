import { ICursoResponse } from './ICurso'
import { IDisciplinaResponse } from './IDisciplina'

export interface IQuestionResponse {
  id: number
  curso: ICursoResponse
  enunciado: string
  numQuestao: number
  edicao: number
  resposta: string
  tipoQuestao: 'Dissertativa' | 'Alternativa'
  disciplina: IDisciplinaResponse[]
  alternativas: IAlternativas[]
  anotacoes?: IAnotacao[]
  createdAt: Date
  updatedAt: Date
}

export interface IQuestionDescription {
  curso: ICursoResponse
  enunciado: string
  numQuestao: number
  edicao: number
  disciplina: IDisciplinaResponse[]
  id: number
  tipoQuestao: 'Disertativa' | 'Alternativa'
}

export interface IAnotacao {
  anotacao: string
  createdAt: string
}

interface IAlternativas {
  enunciado: string
  letra: string
}
