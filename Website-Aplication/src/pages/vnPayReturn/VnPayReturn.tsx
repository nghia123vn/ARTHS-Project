// VnPayReturn.tsx
import { axiosPrivate } from '@/api/axios';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { vnpayResultDetail } from '@/types/vnpayResult';

const VnPayReturn = () => {
    const [data, setData] = useState<vnpayResultDetail<string, number>>();
    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search);

    const vnp_Amount = queryParams.get('vnp_Amount');
    const vnp_BankCode = queryParams.get('vnp_BankCode');
    const vnp_CardType = queryParams.get('vnp_CardType');
    const vnp_OrderInfo = queryParams.get('vnp_OrderInfo');
    const vnp_PayDate = queryParams.get('vnp_PayDate');
    const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');
    const vnp_TmnCode = queryParams.get('vnp_TmnCode');
    const vnp_TransactionNo = queryParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = queryParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = queryParams.get('vnp_TxnRef');
    const vnp_BankTranNo = queryParams.get('vnp_BankTranNo');
    const vnp_SecureHash = queryParams.get('vnp_SecureHash');

    const sendParams = {
        vnp_Amount,
        vnp_BankCode,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_BankTranNo,
        vnp_SecureHash
    };

    const callApiResult = async () => {
        try {
            const response = await axiosPrivate.get('/payments/result', { params: sendParams });
            if (response.status === 200) {
                setData(response.data);
            } else {
                console.log('API Error: Unexpected response status');
            }
        } catch (error) {
            console.error('API error', error);
        }
    };

    const formatPrice = (price: number) => {
        const formattedPrice = (price / 1000).toLocaleString('vi-VN');
        return `${formattedPrice}.000 VNĐ`;
    };

    const formatDate = (date: Date) => {
        const dateFormatter = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return dateFormatter.format(new Date(Date.parse(date.toString())));
    };



    useEffect(() => {
        callApiResult();
    }, [location.search]);

    console.log("data: ", data);
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-main py-4 text-white text-center">
                <h1 className="text-3xl font-semibold">Kết quả thanh toán từ ví điện tử VN Pay</h1>
            </header>

            {/* Content */}
            <div className="flex-grow bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full text-center">
                    {data?.response === '00' ? (
                        <div>
                            <h1 className="text-4xl font-semibold mb-4 text-main">Thanh toán thành công</h1>
                            <p className="text-gray-600">Đơn hàng của bạn đã được thanh toán thành công.</p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-4xl font-semibold mb-4 text-red-500">Thanh toán thất bại</h1>
                            <p className="text-gray-600">Có một số lỗi đã xảy ra trong quá trình thanh toán. Đơn hàng của bạn chưa được thanh toán. Vui lòng thử lại sau.</p>
                        </div>
                    )}
                    <hr className="my-6 border-t border-gray-300" />
                    {/* Thông tin thanh toán (nếu có) */}
                    {data?.response === '00' && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-left">
                                    <p>Mô tả đơn hàng:</p>
                                    <p>Ngân hàng thanh toán:</p>
                                    <p>Số tiền thanh toán:</p>
                                    <p>Phí giao dịch:</p>
                                    <p>Thời gian thanh toán:</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-main">Thanh toán hóa đơn cửa hàng Thanh Huy</p>
                                    <p className="font-semibold text-main">{data.bankCode}</p>
                                    <p className="font-semibold text-main">{formatPrice(data.amount)}</p>
                                    <p className="font-semibold text-main">Miễn phí</p>
                                    <p className="font-semibold text-main">{formatDate(data.payDate)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr className="my-6 border-t border-gray-300" />

                    <div className="mt-8">
                        <NavLink to={`/manage-order/${data?.orderId}`} className="text-blue-600  hover:underline">Quay về trang quản lý đơn hàng</NavLink>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-main py-4 text-white text-center">
                <p>&copy; {new Date().getFullYear()} Thanh Huy Motobike.</p>
            </footer>
        </div>
    );
};

export default VnPayReturn;