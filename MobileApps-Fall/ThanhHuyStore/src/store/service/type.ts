export interface IService {
  id: string
  name: string
  price: number
  description: string
  status: string
  createAt: string
  images: Image[]
  discountAmount: number
}

export interface Image {
  id: string
  thumbnail: boolean
  imageUrl: string
}
