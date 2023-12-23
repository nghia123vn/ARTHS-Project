export const formatCurrency = (value: number) => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    const formatted = new Intl.NumberFormat('vi-VN', config).format(value);
    return formatted;
}
export enum EPaymentMethod {
    COD = "Tiền mặt",
    VNPAY = "VNPay",

}
