export interface IBooking {
  id: string
  dateBook: string
  description: string
  cancellationReason: string
  cancellationDate: string
  status: string
  createAt: string
  staff: Staff
  customer: Customer
  orderId?: string
}

export interface Staff {
  accountId: string
  fullName: string
  gender: string
  phoneNumber: string
  avatar: string
}

export interface Customer {
  accountId: string
  phoneNumber: string
  fullName: string
  gender: string
  address: string
  avatar: string
}
