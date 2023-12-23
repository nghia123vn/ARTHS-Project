import { getOnlineOrder } from "@/actions/onlineOrder";
import { axiosPrivate } from "@/api/axios";
import LoadingPage from "@/components/LoadingPage";
import { showSuccessAlert } from "@/constants/chooseToastify";
import { itemOnlineOrder, listOnlineOrder, selectorOnlineOrder } from "@/types/actions/listOnlineOrder";
import { statusOrder } from "@/types/typeOrder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ListGhn = () => {
    const dispatch = useDispatch();
    const onlineOrderInfo: listOnlineOrder<string, number> = useSelector((state: selectorOnlineOrder<string, number>) => state.onlineOrderReducer.onlineOrderTransport);
    const [onlineOrderData, setOnlineOrderData] = useState<itemOnlineOrder<string, number>[]>([]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const handleConfirmTransportOrder = async (shippingCode: string) => {
        try {

            const data = {
                "codAmount": 0,
                "codTransferDate": "2023-11-28T02:33:16.904Z",
                "clientOrderCode": "string",
                "convertedWeight": 0,
                "description": "string",
                "fee": {
                    "codFailedFee": 0,
                    "codFee": 0,
                    "coupon": 0,
                    "deliverRemoteAreasFee": 0,
                    "documentReturn": 0,
                    "doubleCheck": 0,
                    "insurance": 0,
                    "mainService": 0,
                    "pickRemoteAreasFee": 0,
                    "r2S": 0,
                    "return": 0,
                    "stationDO": 0,
                    "stationPU": 0,
                    "total": 0
                },
                "height": 0,
                "isPartialReturn": true,
                "length": 0,
                "orderCode": shippingCode,
                "partialReturnCode": "string",
                "paymentType": 0,
                "reason": "string",
                "reasonCode": "string",
                "shopID": 0,
                "status": "delivered",
                "time": "2023-11-28T02:33:16.904Z",
                "totalFee": 0,
                "type": "string",
                "warehouse": "string",
                "weight": 0,
                "width": 0
            }
            setIsLoading(true);
            const response = await axiosPrivate.post(`/ghn/web-hook`, data)
            if (response.status === 200) {
                showSuccessAlert('Giao hành thành công');
                const data = {
                    customerName: "",
                    customerPhone: "",
                    number: paginationNumber,
                    orderStatus: statusOrder.Transport,
                }
                dispatch(getOnlineOrder(data))
            } else {
                console.log('Lỗi');
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (onlineOrderInfo.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [onlineOrderInfo.pagination?.totalRow]);

    useEffect(() => {
        const data = {
            customerName: "",
            customerPhone: "",
            number: paginationNumber,
            orderStatus: statusOrder.Transport,
        }
        dispatch(getOnlineOrder(data))
        setIsLoading(true);
    }, [dispatch, paginationNumber])

    useEffect(() => {
        if (onlineOrderInfo) {
            setOnlineOrderData(onlineOrderInfo?.data)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 800)
    }, [onlineOrderInfo])

    console.log('data', onlineOrderData)




    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="font-semibold text-4xl mb-8 text-blue-800">Danh sách đơn hàng đang giao của cửa hàng Thanh Huy</h1>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="border rounded-md overflow-hidden shadow-md w-full max-w-7xl bg-white border-gray-300">
                    {onlineOrderData?.length > 0 ? (
                        <div className={`${onlineOrderData?.length < 12 ? 'h-[67vh]' : ''} overflow-auto`}>
                            <div className="p-4">
                                <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
                                    <thead>
                                        <tr className="text-xs font-medium uppercase tracking-wider bg-yellow-500 text-brown-300">
                                            <th className="px-6 py-3">Mã đơn hàng</th>
                                            <th className="px-6 py-3">Mã vận đơn</th>
                                            <th className="px-6 py-3">Tên khách hàng</th>
                                            <th className="px-6 py-3">Số điện thoại</th>
                                            <th className="px-6 py-3">Thanh toán</th>
                                            <th className="px-6 py-3">Trạng thái</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {onlineOrderData && onlineOrderData.map((item, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}>
                                                <td className="py-4 px-6">{item.id}</td>
                                                <td className="py-4 px-6">{item.shippingCode}</td>
                                                <td className="py-4 px-6">{item?.customer.fullName}</td>
                                                <td className="py-4 px-6">{item?.customerPhoneNumber}</td>
                                                <td className="py-4 px-6">{item.paymentMethod}</td>
                                                <td className="py-4 px-6">{item.status}</td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        className="text-blue-700 hover:underline"
                                                        onClick={() => handleConfirmTransportOrder(item.shippingCode)}
                                                    >
                                                        Giao thành công
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[67vh]">
                            <p className="font-semibold text-2xl text-gray-500">Không tìm thấy đơn hàng</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default ListGhn