export interface IAccount {
  id: string
  fullName: string
  gender: string
  avatar: string
  phoneNumber: string
  role: string
  status: string
  createAt: string
  address: string
}
export interface IRegisterAccount {
  accountId: string
  fullName: string
  gender: string
  phoneNumber: string
  address: string
  avatar: any
  cart: Cart
}

export interface Cart {
  id: string
  cartItems: any[]
}
