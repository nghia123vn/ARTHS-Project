export interface vnpayResultDetail<T,N>{
    orderInfo:T,
    orderId:T,
    amount:N,
    bankCode:T,
    cardType:T,
    response:T,
    transactionStatus:T,
    transactionNo:T,
    payDate:Date
}