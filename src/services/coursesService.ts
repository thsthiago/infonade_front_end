import { ICurso } from 'src/interfaces/ICurso'
import app from './app'

type IHeader = {
  [search: string]: string | number | undefined
}

type IParams = {
  header?: IHeader
  params?: IHeader
}

class CoursesService {
  async getCourses(params?: IParams): Promise<ICurso[]> {
    const { data } = await app.get('api/cursos', {
      headers: {
        ...params?.header
      },
      params: params?.params
    })
    return data
  }

  async addCurse(form: any): Promise<void> {
    const { data } = await app.post('api/curso', form)
    return data
  }

  async updateCurse(curso: ICurso): Promise<void> {
    const { data } = await app.put('api/curso', curso)
    return data
  }

  async findOneCurse(id: number): Promise<ICurso[]> {
    const { data } = await app.get('api/curso', {
      params: {
        id
      }
    })
    return data
  }
}

export const coursesService = new CoursesService()
