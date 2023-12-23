export interface IBooking {
  id: string
  dateBook: string
  description: string
  cancellationReason: any
  cancellationDate: any
  status: EBookingStatus
  createAt: string
  customer: ICustomer
  orderId?: string
  staff?: Staff
}

export interface ICustomer {
  accountId: string
  phoneNumber: string
  fullName: string
  gender: string
  address: string
  avatar: string
}

export enum EBookingStatus {
  CONFIRMED = "Đã xác nhận",
  COMPLETED = "Đã đến",
  CANCELLED = "Đã huỷ",
  PENDING = "Chờ xác nhận",
}
export interface Staff {
  accountId: string
  fullName: string
  gender: string
  phoneNumber: string
  avatar: any
}

