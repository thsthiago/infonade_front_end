import app from './app'

type IHeader = {
  [search: string]: string | number | undefined
}

type IParams = {
  header?: IHeader
  params?: IHeader
}

class QuestionsService {
  async getQuestions(params?: IParams): Promise<any> {
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

  async findOneQuestion(id: number): Promise<any> {
    const { data } = await app.get('api/curso', {
      params: {
        id
      }
    })
    return data
  }
}

export const questionsService = new QuestionsService()
