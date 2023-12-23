export interface IOrder {
    id: string
    tellerId: string
    shippingCode: any
    shippingMoney: any
    customerPhoneNumber: string
    customerName: string
    address: any
    paymentMethod: any
    status: string
    totalAmount: number
    cancellationReason: any
    cancellationDate: any
    licensePlate: string
    orderType: string
    orderDate: string
    customer: any
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
    discount?: Discount
    price: number
    instUsed: boolean
    subTotalAmount: number
    warrantyStartDate: string
    warrantyEndDate: string
    createAt: string
    motobikeProduct: MotobikeProduct
    repairService: any
    warrantyHistories: any[]
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
export interface MotobikeProduct {
    id: string
    name: string
    priceCurrent: number
    installationFee: number
    discountAmount: number
    image: string
}
export enum EOrderStatus {
    Processing = "Chờ xử lý",
    Repairing = "Đang sửa chữa",
    Finished = "Hoàn thành",
    WaitForPay = "Chờ thanh toán",

}
