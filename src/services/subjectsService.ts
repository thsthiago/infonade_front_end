import { IDisciplina } from 'src/interfaces/IDisciplina'
import app from './app'

class SubjectsService {
  async getSubjects(params?: any): Promise<IDisciplina[]> {
    const { data } = await app.get('api/disciplinas', { params })
    return data
  }

  async addSubject(dataSubjects: any): Promise<void> {
    const { data } = await app.post('api/disciplina', { ...dataSubjects })

    return data
  }

  async updateSubject(disciplina: IDisciplina): Promise<void> {
    const { data } = await app.put('api/disciplina', disciplina)
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
}

export const subjectsService = new SubjectsService()
