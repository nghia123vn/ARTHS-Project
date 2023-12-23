export interface ICart {
  id: string
  cartItems: CartItem[]
}

export interface CartItem {
  cartId: string
  quantity: number
  motobikeProduct: MotobikeProduct
}

export interface MotobikeProduct {
  id: string
  name: string
  priceCurrent: number
  image: string
  discountAmount: number
}
