import { IDisciplina, IDisciplinaResponse } from 'src/interfaces/IDisciplina'
import { IParams } from 'src/interfaces/IParams'
import { IResponse } from 'src/interfaces/IResponse'
import app from './app'

interface IGetDisciplinas extends IResponse {
  results: IDisciplinaResponse[]
}

class SubjectsService {
  async getSubjects(params?: IParams): Promise<IGetDisciplinas> {
    const { data } = await app.get('api/disciplinas', {
      headers: {
        ...params?.header
      },
      params: params?.params
    })
    return data
  }

  async addSubject(dataSubjects: any): Promise<void> {
    const { data } = await app.post('api/disciplina', { ...dataSubjects })

    return data
  }

  async updateSubject(disciplina: IDisciplina): Promise<void> {
    const { data } = await app.put(
      `api/disciplina/${disciplina.id}`,
      disciplina
    )
    return data
  }

  async findOneSubject(id: number): Promise<IDisciplina> {
    const { data } = await app.get('api/disciplina', {
      params: {
        id
      }
    })

    return data
  }

  async deleteSubject(id: number): Promise<void> {
    const { data } = await app.delete(`api/disciplina/${id}`)

    return data
  }
}

export const subjectsService = new SubjectsService()
