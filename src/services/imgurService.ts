import app from './app'

class ImgurService {
  async uploadImg(file: FormData): Promise<any> {
    const { data } = await app.post('https://api.imgur.com/3/image', file, {
      headers: {
        // eslint-disable-next-line prettier/prettier
        'Authorization': `Client-ID ${process.env.REACT_APP_CLIENT_ID_IMGUR}`
      }
    })

    return data
  }
}

export const imgurService = new ImgurService()
