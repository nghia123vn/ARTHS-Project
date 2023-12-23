export interface IProduct {
  id: string
  name: string
  priceCurrent: number
  quantity: number
  warrantyDuration: number
  description: string
  status: string
  updateAt: string
  createAt: string
  category: ICategory
  discount: IDiscount
  repairService: IRepairService
  feedbackProducts: IFeedbackProduct[]
  images: IImage[]
  motobikeProductPrices: IMotobikeProductPrice[]
  vehicles: IVehicle[]
  totalQuantitySold?: number
}

export interface ICategory {
  id: string
  categoryName: string
}

export interface IDiscount {
  id: string
  title: string
  discountAmount: number
  startDate: string
  endDate: string
  imageUrl: string
  description: string
  status: string
}

export interface IRepairService {
  id: string
  name: string
  price: number
  image: string
}

export interface IFeedbackProduct {
  id: string
  title: string
  rate: number
  content: string
  updateAt: string
  createAt: string
  customer: ICustomer
}

export interface ICustomer {
  accountId: string
  fullName: string
  gender: string
  address: string
  avatar: string
}

export interface IImage {
  id: string
  thumbnail: boolean
  imageUrl: string
}

export interface IMotobikeProductPrice {
  id: string
  dateApply: string
  priceCurrent: number
  createAt: string
}

export interface IVehicle {
  id: string
  vehicleName: string
}
export interface IPagination {
  pageNumber: number,
  pageSize: number,
  totalRow:number
}
