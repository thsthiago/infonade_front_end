export type ICurso = {
  id: number
  nome: string
}

export type ICursoResponse = {
  id: number
  nome: string
  edicoes: number[]
  createdAt: Date
  updatedAt: Date
}

export type ICursoCreate = {
  nome: string
  edicoes: number[]
}
