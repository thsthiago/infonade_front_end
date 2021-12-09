import { IQuestionResponse } from 'src/interfaces/IQuestion'
import { IResponse } from 'src/interfaces/IResponse'
import app from './app'

type IHeader = {
  [search: string]: string | number | undefined
}

type IParams = {
  header?: IHeader
  params?: IHeader
}

interface IGetQuestions extends IResponse {
  results: IQuestionResponse[]
}

class QuestionsService {
  async getQuestions(params?: IParams): Promise<IGetQuestions> {
    const { data } = await app.get('api/questoes', {
      headers: {
        ...params?.header
      },
      params: params?.params
    })
    return data
  }

  async addQuestion(form: any): Promise<void> {
    const { data } = await app.post('api/questao', form)
    return data
  }

  async updateCurse(questao: any): Promise<void> {
    const { data } = await app.put('api/questao', questao)
    return data
  }

  async findOneQuestion(id: number): Promise<IQuestionResponse> {
    const { data } = await app.get(`api/questao/${id}`, {
      params: {
        id
      }
    })
    return data
  }

  async deleteQuestion(id: number): Promise<void> {
    const { data } = await app.delete(`api/questao/${id}`)

    return data
  }
}

export const questionsService = new QuestionsService()
