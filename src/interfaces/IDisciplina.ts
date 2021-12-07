import { ICursoResponse } from './ICurso'

export interface IDisciplina {
  id: number
  nome: string
  curso: { id: number }
  createdAt: Date
}

export type IDisciplinaResponse = {
  id: number
  nome: string
  curso: ICursoResponse
  createdAt: Date
  updatedAt: Date
}
