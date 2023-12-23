import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    ChevronRightIcon,
    CalendarDaysIcon,
    CreditCardIcon,
    UserIcon,
    DevicePhoneMobileIcon,
    ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/solid';
import { FaMotorcycle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { getDetailOrder, updateStatusOrder } from '@/actions/order'
import { inStoreOrderDetails, itemDetailOrder, selectorDetailOrder } from '@/types/actions/detailOrder'
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { statusOrder } from '@/types/typeOrder';
import RepairCustomer from '@/components/teller/RepairCustomer';
import Loading from '@/components/LoadingPage';
import RepairProduct from '@/components/teller/RepairProduct';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { RxDotsHorizontal } from 'react-icons/rx';
import ShowListWarranty from '@/components/teller/ShowListWarranty';

const DetailOfflineOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const detailOrder: itemDetailOrder<string, number> = useSelector((state: selectorDetailOrder<string, number>) => state.orderDetailReducer.orderDetail);
    console.log("orderDetail", detailOrder)
    const [data, setData] = useState<itemDetailOrder<string, number>>();
    const axiosPrivate = userAxiosPrivate();
    const [payment, setPayment] = useState<string>("Tiền mặt");
    const [showUpdate, setShowUpdate] = useState<boolean>(false)
    const [showUpdateProduct, setShowUpdateProduct] = useState<boolean>(false);
    const [showDivIndex, setShowDivIndex] = useState<number>(-1);
    const [showDivService, setShowDivService] = useState<number>(-1);
    const [showLisWarranty, setShowLisWarranty] = useState<boolean>(false);
    const [itemOrder, setItemOrder] = useState<inStoreOrderDetails<string, number>>();
    const handleShowDiv = (index: number) => {
        if (showDivIndex === index) {
            setShowDivIndex(-1);
        } else {
            setShowDivIndex(index);
            setShowDivService(-1);
        }
    }
    const handleShowService = (index: number) => {
        if (showDivService === index) {
            setShowDivService(-1);
        } else {
            setShowDivService(index);
            setShowDivIndex(-1);
        }
    }
    useEffect(() => {
        if (orderId) {
            dispatch(getDetailOrder(orderId));
            setIsLoading(true);
        }

    }, [dispatch, orderId]);
    useEffect(() => {
        if (detailOrder.id === orderId) {
            setData(detailOrder);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }


    }, [detailOrder, orderId])

    const TotalOrderProduct = () => {
        let total = 0;
        data?.orderDetails?.forEach((item) => {
            total += (item.quantity * item?.price) + (item?.instUsed === true ? item?.motobikeProduct?.installationFee : 0);
        });
        return total;
    };

    const TotalOrderService = () => {
        let total = 0;
        data?.orderDetails?.forEach((item) => {
            if (item.repairService) {

                total += item.repairService.price;
            }
        });
        return total;
    };
    //chỉnh format tiền
    const formatPrice = (price: number) => {
        const formattedPrice = (price / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 });

        return formattedPrice.replace(",", ".");
    }
    const TotalOrderDetail = TotalOrderProduct();
    const TotalService = TotalOrderService();

    const handleCreateBill = async () => {
        if (data?.id) {
            try {
                const response = await axiosPrivate.get(`/orders/generate-invoice/${data?.id}`)
                if (response.status === 200) {
                    window.open(response.data, '')
                    dispatch(updateStatusOrder(data?.id, statusOrder.Finished));
                    setIsLoading(true);
                    showSuccessAlert('Đơn hàng đang xuất bill');

                } else {
                    console.log('Lỗi');
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const handlePayment = async () => {
        try {
            const response = await axiosPrivate.post('/payments/vn-pay',
                {
                    orderId: data?.id,
                    amount: data?.totalAmount
                }
            )
            if (response.status === 200) {
                window.location.href = response.data;
            } else {
                console.log('Lỗi');
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleZaloPay = async () => {
        try {
            const response = await axiosPrivate.post('/payments/zalo-pay',
                {
                    orderId: data?.id
                }
            )
            if (response.status === 200) {
                //window.location.href = response.data.order_url;
                window.open(response.data.order_url, '')
            } else {
                console.log('Lỗi');
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleCash = () => {
        if (data?.id) {
            dispatch(updateStatusOrder(data?.id, statusOrder.Paid));
            setIsLoading(true);
            showSuccessAlert('Thanh toán thành công');
        }
    }

    return (
        <div>
            {isLoading
                ? <Loading />
                : data && (
                    <div className={`w-full bg-white rounded-md px-3 py-3`}>
                        <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
                            {data?.status === statusOrder.Processing ?
                                (
                                    <Link to="/manage-order/list-all-order/list-order" className="hover:text-main">Danh sách đơn hàng</Link>
                                ) : data?.status === statusOrder.WaitForPay ?
                                    (
                                        <Link to="/manage-order/list-all-order/wait-paid-order" className="hover:text-main">Danh sách đơn chờ thanh toán</Link>
                                    ) : data?.status === statusOrder.Paid ?
                                        (
                                            <Link to="/manage-order/list-all-order/paid-order" className="hover:text-main">Danh sách đơn đã thanh toán</Link>
                                        ) : data?.status === statusOrder.Repairing ?
                                            (
                                                <Link to="/manage-order/list-all-order/paid-order" className="hover:text-main">Danh sách đơn đang sửa</Link>
                                            ) : (
                                                <Link to="/manage-orders-owner/offline-order/history-order" className="hover:text-main">Đơn hàng offline</Link>
                                            )}
                            <ChevronRightIcon className="w-5 h-5 " />
                            <p className='text-main'>Chi tiết đơn hàng</p>
                        </div>
                        {/* Thông tin người dùng */}
                        <div className='flex space-x-5 py-3'>
                            <div className='w-[50%] border-2 border-[#E0E2E7] px-5 pt-5 pb-2 space-y-3  rounded-lg'>
                                <p className={`rounded-2xl font-semibold py-1 w-[170px] text-center text-[19px]
                    ${data?.status === statusOrder.Paid ? "bg-[#E7F4EE] text-[#0D894F]" :
                                        data?.status === statusOrder.Finished ? "bg-[#E7F4EE] text-[#083b0db5]" :
                                            data?.status === statusOrder.Processing ? "bg-[#bac5e9] text-blue-500" :
                                                data?.status === statusOrder.Repairing ? "bg-[#d8e0c0] text-[#6b6921b5]" :
                                                    data?.status === statusOrder.WaitForPay ? "bg-[#FBEABC] text-[#90530C]" :
                                                        data?.status === statusOrder.Canceled ? "bg-[#f2a8a9] text-[#900c0c]" :
                                                            ""}`}>
                                    {data?.status}
                                </p>
                                <div className='pt-3 text-[18px] flex justify-between'>
                                    <div className='text-[#1A1C21] font-semibold flex flex-col space-y-7'>
                                        <div className=' flex space-x-3'>
                                            <CalendarDaysIcon className='w-7 h-7 fill-gray-500' />
                                            <p>Ngày đặt</p>
                                        </div>
                                        {(data?.orderDetails?.every((item) => item?.instUsed === false && item?.repairService === null) && data?.status === statusOrder.Processing) || data?.paymentMethod || data?.status === statusOrder.WaitForPay ? (
                                            <div className='flex space-x-3'>
                                                <CreditCardIcon className='w-7 h-7  fill-gray-500 ' />
                                                <p>Phương thức thanh toán</p>
                                            </div>
                                        ) : ""}

                                        {data?.staff && (
                                            <div className='flex space-x-3'>
                                                <UserIcon className='w-7 h-7 fill-gray-500' />
                                                <p>Nhân viên sửa chữa</p>
                                            </div>
                                        )}

                                        <div className='flex space-x-3'>
                                            <ArrowPathRoundedSquareIcon className='w-7 h-7 fill-gray-500' />
                                            <p>Loại đơn</p>
                                        </div>
                                    </div>
                                    <div className='text-[#1A1C21] font-semibold flex flex-col space-y-6 text-end'>
                                        <div>
                                            <p>
                                                {data && data.orderDate && (
                                                    new Intl.DateTimeFormat('en-GB', {
                                                        timeZone: 'UTC'
                                                    }).format(new Date(Date.parse(data.orderDate.toString()) + 7 * 60 * 60 * 1000))
                                                )}
                                            </p>
                                        </div>
                                        {data?.paymentMethod
                                            ? <p>{data?.paymentMethod}</p>
                                            : (data?.orderDetails.every((item) => item.instUsed === false && item.repairService === null) && data?.status === statusOrder.Processing) || data?.status === statusOrder.WaitForPay ? (
                                                <select className='border-2 bg-main text-white pl-1 border-mainB w-[170px] py-2 rounded-lg'
                                                    defaultValue={payment}
                                                    onChange={(e) => setPayment(e.target.value)}
                                                >
                                                    <option className='bg-white text-black'>
                                                        Tiền mặt
                                                    </option>
                                                    <option className='bg-white text-black'>
                                                        VN Pay
                                                    </option>
                                                    <option className='bg-white text-black'>
                                                        QR ZaloPay
                                                    </option>
                                                </select>
                                            ) : ""}
                                        {data.staff ? (
                                            <div>
                                                <p>{data?.staff.fullName}</p>
                                            </div>
                                        ) : ""}

                                        <div>
                                            {data?.orderType}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%] border-2 border-[#E0E2E7] px-5 py-5 rounded-lg'>
                                <div className='flex justify-between pb-3'>
                                    <h1 className='text-[20px] font-semibold '>Thông tin khách hàng</h1>
                                    {data?.status !== statusOrder.Paid && data?.status !== statusOrder.Finished && (
                                        <button className='underline text-[22px] text-[#13B2E4] font-semibold hover:text-main'
                                            onClick={() => setShowUpdate(true)}
                                        >Sửa thông tin</button>
                                    )}
                                </div>
                                <div className={`text-[18px] flex justify-between pt-3`}>
                                    <div className='text-[#1A1C21] font-semibold flex flex-col space-y-7 '>
                                        <div className='flex space-x-3'>
                                            <UserIcon className='w-7 h-7 fill-gray-500' />
                                            <p>Khách hàng</p>
                                        </div>
                                        <div className='flex space-x-3'>
                                            <DevicePhoneMobileIcon className='w-7 h-7 fill-gray-500' />
                                            <p>Số điện thoại</p>
                                        </div>
                                        {data?.licensePlate && (
                                            <div className='flex space-x-3'>
                                                <FaMotorcycle className='w-7 h-7 fill-gray-500' />
                                                <p>Biển số xe</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className='text-[#1A1C21] font-semibold text-end space-y-7'>
                                        <div>
                                            <p>{data?.customerName}</p>
                                        </div>
                                        <div >
                                            <p>{data?.customerPhoneNumber}</p>
                                        </div>
                                        <div>
                                            <p>{data?.licensePlate}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* thông tin sản phẩm */}
                        <div className={`w-full border-[#E0E2E7] space-y-3 border-2 rounded-md py-3 `}>
                            <div className='flex justify-between w-full px-3'>
                                <div className='font-semibold flex items-center space-x-3 '>
                                    <h2 className='text-[20px]'>Danh sách sản phẩm</h2>
                                    <h3 className='bg-[#E7F4EE] text-[#0D894F] w-[100px] py-1 text-center rounded-lg'>{data?.orderDetails?.length} sản phẩm</h3>
                                </div>
                                {data?.status !== statusOrder.Paid && data?.status !== statusOrder.WaitForPay && data?.status !== statusOrder.Finished && (
                                    <button className='bg-main w-[200px] text-center py-3 rounded-lg font-semibold text-white hover:bg-[#ec504b]'
                                        onClick={() => {
                                            setShowUpdateProduct(true);
                                        }}
                                    >Thêm / Sửa sản phẩm</button>
                                )}
                            </div>

                            <div className={`overflow-auto ${data?.orderDetails.every((item) =>
                                item.instUsed === false && item.repairService === null) || data?.status === statusOrder.WaitForPay ? "h-[30vh]" : "h-[35vh]"}`}>
                                {data?.orderDetails?.some((item) => item.motobikeProduct)
                                    ? (
                                        <div className="w-full bg-white pb-3">
                                            <div className="flex items-center text-xs uppercase tracking-wider bg-mainB font-semibold">
                                                <div className="w-[30%] py-3 flex justify-center">
                                                    <p>Tên sản phẩm</p>
                                                </div>
                                                {data?.orderDetails?.some((item) => item?.warrantyEndDate) ? (
                                                    <div className="w-[10%] text-center">
                                                        <p>Bảo hành đến</p>
                                                    </div>
                                                ) : <p className='w-[10%]'></p>}

                                                {data?.orderDetails?.some((item) => item?.discount) ? (
                                                    <div className="w-[16%] text-center">
                                                        <p>Áp dụng khuyến mãi</p>
                                                    </div>
                                                ) : <p className='w-[16%]'></p>}
                                                <div className="w-[6%] text-center">
                                                    <p>Số lượng</p>
                                                </div>
                                                <div className="w-[11%] text-center">
                                                    <p>Đơn giá</p>
                                                </div>
                                                <div className="w-[11%] text-center">
                                                    <p>Giá thay phụ kiện</p>
                                                </div>
                                                <div className="w-[11%] text-center">
                                                    <p>Tổng tiền(VNĐ)</p>
                                                </div>
                                                <div className="w-[5%]">
                                                </div>
                                            </div>
                                            {data?.orderDetails?.filter((item) => item.motobikeProduct).map((item: inStoreOrderDetails<string, number>, index) => (
                                                <div key={index} className='w-full flex items-center border-t-2 border-mainB'>
                                                    <div className="w-[30%] py-3 px-3 flex items-center">
                                                        <img src={item?.motobikeProduct?.image} alt="" className="h-11 mr-5" />
                                                        <p className='text-start'>{item?.motobikeProduct?.name}</p>
                                                    </div>
                                                    {data?.orderDetails?.some((item) => item?.warrantyEndDate) ? (
                                                        <div className="w-[10%] text-center">
                                                            {item && item.warrantyEndDate ? (
                                                                new Intl.DateTimeFormat('en-GB', {
                                                                    timeZone: 'UTC'
                                                                }).format(new Date(Date.parse(item.warrantyEndDate.toString()) + 7 * 60 * 60 * 1000))
                                                            ) : 'không có'}
                                                        </div>
                                                    ) : <p className='w-[10%]'></p>}

                                                    {data?.orderDetails?.some((item) => item?.discount) ? (
                                                        <div className="w-[16%] text-center">
                                                            {item?.discount ? `${item?.discount?.title} (${item?.discount?.discountAmount}%)` : "không có"}
                                                        </div>
                                                    ) : <p className='w-[16%]'></p>}

                                                    <div className="w-[6%] text-center">
                                                        {item?.quantity}
                                                    </div>
                                                    <div className="w-[11%] text-center">
                                                        {formatPrice(item?.price)}
                                                    </div>
                                                    <div className="w-[11%] text-center">
                                                        {formatPrice(item?.instUsed === true ? item?.motobikeProduct?.installationFee : 0)}
                                                    </div>
                                                    <div className="w-[11%] text-center">
                                                        {formatPrice((item?.quantity * item?.price) + (item?.instUsed === true ? item?.motobikeProduct?.installationFee : 0))}
                                                    </div>
                                                    {detailOrder?.status === statusOrder.Finished &&
                                                        (item?.warrantyEndDate !== null && item?.warrantyHistories?.length > 0) && (
                                                            <div className="w-[5%] flex items-center justify-center relative">
                                                                <button
                                                                    onClick={() => handleShowDiv(index)}
                                                                >
                                                                    <RxDotsHorizontal className='w-5 h-5 hover:text-main' />
                                                                </button>
                                                                {showDivIndex === index && (
                                                                    <div className="absolute z-10 flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-1 top-7 space-y-3 py-2 font-semibold text-[#667085]">
                                                                        {item?.warrantyHistories?.length > 0 && (
                                                                            <button className='flex items-center space-x-1 hover:text-main hover:fill-main'
                                                                                onClick={() => {
                                                                                    handleShowDiv(index);
                                                                                    setShowLisWarranty(true)
                                                                                    setItemOrder(item)
                                                                                }}
                                                                            >
                                                                                <p> Xem bảo hành </p>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                </div>
                                            ))}
                                        </div>
                                    ) : ""}

                                {data?.orderDetails?.some((item) => item.repairService) && (
                                    <div className='w-full'>
                                        <div className="w-full bg-white">
                                            <div className="flex bg-mainB items-center text-xs uppercase tracking-wider font-semibold">
                                                <div className=" w-[64%] py-3 flex justify-center">
                                                    <p>Tên dịch vụ</p>
                                                </div>
                                                {data?.orderDetails?.some((item) => item?.discount) ? (
                                                    <div className="w-[20%] text-center">
                                                        <p>Áp dụng khuyến mãi</p>
                                                    </div>
                                                ) : <p className='w-[20%]'></p>}
                                                <div className='w-[11%] text-center'>
                                                    <p>Tổng tiền(VNĐ)</p>
                                                </div>
                                                <div className="w-[5%]">
                                                </div>
                                            </div>
                                            {data?.orderDetails?.filter((item) => item.repairService).map((item: inStoreOrderDetails<string, number>, index) => (
                                                item.repairService ? (
                                                    <div key={index} className='w-full flex items-center border-t-2 border-mainB'>
                                                        <div className="w-[64%] py-5 px-3 flex justify-start items-center">
                                                            <img src={item?.repairService?.image} alt="" className=" h-11 mr-5" />
                                                            <p>{item?.repairService?.name}</p>
                                                        </div>
                                                        {data?.orderDetails?.some((item) => item?.discount) ? (
                                                            <div className="w-[20%] text-center">
                                                                {item?.discount ? `${item?.discount?.title} (${item?.discount?.discountAmount}%)` : "không có"}
                                                            </div>
                                                        ) : <p className='w-[20%]'></p>}
                                                        <div className="w-[11%] text-center">
                                                            <p>{formatPrice(item?.price)}</p>
                                                        </div>
                                                        {detailOrder?.status === statusOrder.Finished &&
                                                            (item?.warrantyEndDate !== null && item?.warrantyHistories?.length > 0) && (
                                                                <div className="w-[5%] flex items-center justify-center relative">
                                                                    <button
                                                                        onClick={() => handleShowService(index)}
                                                                    >
                                                                        <RxDotsHorizontal className='w-5 h-5 hover:text-main' />
                                                                    </button>
                                                                    {showDivService === index && (
                                                                        <div className="absolute z-10 flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-1 top-7 space-y-3 p-2 font-semibold text-[#667085]">
                                                                            {item?.warrantyHistories?.length > 0 && (
                                                                                <button className='flex items-center space-x-1 hover:text-main hover:fill-main'
                                                                                    onClick={() => {
                                                                                        handleShowService(index);
                                                                                        setShowLisWarranty(true)
                                                                                        setItemOrder(item)
                                                                                    }}
                                                                                >
                                                                                    <p> Xem bảo hành </p>
                                                                                </button>
                                                                            )}

                                                                        </div>
                                                                    )}

                                                                </div>
                                                            )}

                                                    </div>
                                                ) : ""
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/*footer */}
                            <div className='flex justify-end pr-[90px] space-x-[20px] text-main'>
                                <p className='text-[19px] font-semibold'>Tổng cộng:</p>
                                <p className='font-semibold text-[19px]'>{formatPrice(TotalOrderDetail + TotalService)} VNĐ</p>
                            </div>
                            <div className='font-semibold'>
                                {data?.orderDetails.every((item) => item.instUsed === false && item.repairService === null)
                                    || data?.status === statusOrder.WaitForPay
                                    ?
                                    data?.status !== statusOrder.Paid && data?.status !== statusOrder.Finished ? (
                                        payment === "Tiền mặt" ? (
                                            <div className='flex justify-end pr-[90px] pt-2'>
                                                <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                                                    onClick={handleCash}
                                                >Xác nhận thanh toán</button>
                                            </div>
                                        ) : payment === "VN Pay" ? (
                                            <div className='flex justify-end pr-[90px] pt-2'>
                                                <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                                                    onClick={handlePayment}
                                                >Thanh toán VN Pay</button>
                                            </div>
                                        ) : (
                                            <div className='flex justify-end pr-[90px] pt-2'>
                                                <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                                                    onClick={handleZaloPay}
                                                >Quét mã OR</button>
                                            </div>
                                        )
                                    ) : ""
                                    : ""
                                }
                                {data?.status === statusOrder.Paid && (
                                    <div className='flex justify-end pr-[90px] pt-2'>
                                        <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                                            onClick={handleCreateBill}
                                        >In bill đơn hàng</button>
                                    </div>
                                )}
                            </div>



                        </div>
                        <RepairCustomer
                            isVisible={showUpdate}
                            onClose={() => setShowUpdate(false)}
                            idOrder={data?.id}
                            nameCustomer={data?.customerName}
                            phoneCustomer={data?.customerPhoneNumber}
                            licensePlate={data?.licensePlate}
                        />

                        <RepairProduct
                            dataProduct={data?.orderDetails}
                            staffId={data?.staff?.accountId}
                            idOrder={data?.id}
                            isVisible={showUpdateProduct}
                            onClose={() => setShowUpdateProduct(false)}
                        />
                        <ShowListWarranty
                            itemOrder={itemOrder}
                            isVisible={showLisWarranty}
                            onClose={() => setShowLisWarranty(false)}
                        />
                    </div>
                )
            }
        </div>

    )
}

export default DetailOfflineOrder