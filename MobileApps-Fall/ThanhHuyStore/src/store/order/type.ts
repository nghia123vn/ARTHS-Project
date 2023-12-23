export interface IOrder {
  id: string
  tellerId: string
  shippingCode: any
  shippingMoney: any
  customerPhoneNumber: string
  customerName: string
  address: any
  paymentMethod: any
  status: EOrderStatus
  totalAmount: number
  cancellationReason: any
  cancellationDate: any
  licensePlate: any
  orderType: string
  orderDate: string
  customer?: any
  staff?: Staff
  orderDetails: OrderDetail[]
}

export interface Staff {
  accountId: string
  fullName: string
  gender: string
  phoneNumber: string
  avatar: any
}

export interface OrderDetail {
  id: string
  quantity: number
  price: number
  instUsed: boolean
  subTotalAmount: number
  warrantyStartDate: string
  warrantyEndDate: string
  createAt: string
  discount?: Discount
  motobikeProduct?: MotobikeProduct
  repairService?: RepairService
  warrantyHistories: any[]
}

export interface MotobikeProduct {
  id: string
  name: string
  priceCurrent: number
  installationFee: number
  discountAmount: number
  image: string
}

export interface RepairService {
  id: string
  name: string
  duration: number
  price: number
  discountAmount: number
  image: string
}
export interface Discount {
  id: string
  title: string
  discountAmount: number
  startDate: string
  endDate: string
  imageUrl: string
  description: string
  status: string
}

export enum EOrderStatus {
  PENDING = "Chờ xử lý",
  SUCCESS ="Đã thanh toán",
  PROCESSING = "Đang giao",
  TRANSFER = 'Hoàn thành',
  CANCEL = "Đã hủy",
}
