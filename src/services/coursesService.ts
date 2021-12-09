import { AxiosResponse } from 'axios'
import { ICursoResponse, ICurso, ICursoCreate } from 'src/interfaces/ICurso'
import { IParams } from 'src/interfaces/IParams'
import { IResponse } from 'src/interfaces/IResponse'
import app from './app'

interface IGetCurse extends IResponse {
  results: ICursoResponse[]
}

class CoursesService {
  async getCourses(params?: IParams): Promise<IGetCurse> {
    const { data } = await app.get('api/cursos', {
      headers: {
        ...params?.header
      },
      params: params?.params
    })
    return data
  }

  async addCourse(form: ICursoCreate): Promise<void> {
    const { data } = await app.post('api/curso', form)
    return data
  }

  async updateCourse(curso: ICurso): Promise<void> {
    const { data } = await app.put('api/curso', curso)
    return data
  }

  async findOneCourse(id: number): Promise<ICurso[]> {
    const { data } = await app.get('api/curso', {
      params: {
        id
      }
    })
    return data
  }

  async deleteCourse(id: number): Promise<void> {
    const { data } = await app.delete(`api/curso/${id}`)

    return data
  }
}

export const coursesService = new CoursesService()
