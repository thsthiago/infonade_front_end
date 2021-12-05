import app from './app'

class ImgBBService {
  async uploadImg(file: any) {
    file.set('key', '4cf8902c1c150d858a729f3fb9c4b2dd')
    const { data } = await app.post('https://api.imgbb.com/1/upload', file)
    return data
  }
}

export const imgBBService = new ImgBBService()
