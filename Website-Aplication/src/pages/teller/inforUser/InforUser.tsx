import { useState, useEffect } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { item } from '@/types/actions/product'
import { itemOrder } from '@/types/actions/createOrder';
import { showErrorAlert, showSuccessAlert, showWarningAlert } from '@/constants/chooseToastify';
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { formatPhoneNumber } from '@/utils/formatPhone';
import StaffSelect from '@/components/teller/StaffSelect';
import { itemService } from '@/types/actions/listService';
import LoadingCreateUpdate from '@/components/LoadingCreateUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBooking } from '@/actions/booking';
import { itemBooking } from '@/types/listBooking';
import { selectorDetailBooking } from '@/types/typeDetailBooking';
type Props = {
    addProduct?: item<string, number>[];
    addService?: itemService<string, number>[]
    removeProduct: (itemId: string) => void,
    removeService: (itemId: string) => void,
    setAddProduct: React.Dispatch<React.SetStateAction<item<string, number>[]>>;
    setAddService: React.Dispatch<React.SetStateAction<itemService<string, number>[]>>;

}

const InforUser = ({ addProduct = [], addService = [], removeProduct, removeService, setAddProduct, setAddService }: Props) => {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCustomer, setPhoneCustomer] = useState<string>('');
    const [nameCustomer, setNameCustomer] = useState<string>('');
    const [staffId, setStaffId] = useState<string>('');
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [showService, setShowService] = useState<boolean[]>(Array(addProduct.length).fill(false));
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [orderService, setOrderService] = useState<{ repairServiceId: string; }[]>([]);
    console.log(orderData)
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const axiosPrivate = userAxiosPrivate();
    const { bookingId } = useParams();
    const detailBookingInfor: itemBooking<string, number> = useSelector((state: selectorDetailBooking<string, number>) => state.detailBookingReducer.detailBookingInfor);
    console.log("Id", detailBookingInfor)
    useEffect(() => {
        if (bookingId)
            dispatch(getDetailBooking(bookingId));
    }, [bookingId, dispatch]);
    useEffect(() => {
        if (bookingId && detailBookingInfor) {
            setNameCustomer(detailBookingInfor?.customer?.fullName ?? '');
            setPhoneCustomer(detailBookingInfor?.customer?.phoneNumber.toString() ?? '');
            setStaffId(detailBookingInfor?.staff?.accountId ?? '');
        } else {
            setPhoneCustomer('');
            setNameCustomer('');
            setStaffId('');
        }
    }, [detailBookingInfor])
    useEffect(() => {
        // Nếu orderData chưa được thiết lập,tạo dữ liệu ban đầu
        if (!orderData.length) {
            const dataCart: itemOrder<string, number>[] = addProduct.map((item) => ({
                motobikeProductId: item.id,
                productQuantity: 1,
                instUsed: false
            }));
            localStorage.setItem('orderData', JSON.stringify(dataCart));
            setOrderData(dataCart);
        } else {
            const newProducts = addProduct.filter((product) => !orderData.some((item) => item.motobikeProductId === product.id));
            if (newProducts.length > 0) {
                const newData = [
                    ...orderData,
                    ...newProducts.map((product) => ({
                        motobikeProductId: product.id,
                        productQuantity: 1,
                        instUsed: false
                    }))
                ];

                localStorage.setItem('orderData', JSON.stringify(newData));
                setOrderData(newData);
            }
        }
    }, [addProduct]);
    useEffect(() => {
        const dataCart: { repairServiceId: string; }[] = addService.map((item) => ({
            repairServiceId: item.id,
        }));
        setOrderService(dataCart);
    }, [addService])

    //Ẩn/hiện dịch vụ
    const toggleService = (itemId: string, index: number) => {
        const savedData = JSON.parse(localStorage.getItem('orderData') as string);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData = savedData.map((item: any) => {
            if (item.motobikeProductId === itemId) {
                return {
                    ...item,
                    instUsed: !item.instUsed
                };
            }
            return item;
        });

        // Lưu trạng thái vào localStorage
        localStorage.setItem('orderData', JSON.stringify(updatedData));
        setOrderData(updatedData);

        const updatedShowService = [...showService];
        updatedShowService[index] = !updatedShowService[index];
        setShowService(updatedShowService);
    };

    const handleQuantityChange = (itemId: string, value: number) => {

        const savedData = JSON.parse(localStorage.getItem('orderData') as string);

        // Tìm sản phẩm trong savedData dựa trên itemId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData = savedData.map((item: any) => {
            if (item.motobikeProductId === itemId) {
                return {
                    ...item,
                    productQuantity: value
                };
            }
            return item;
        });

        localStorage.setItem('orderData', JSON.stringify(updatedData));

        // Cập nhật lại state
        setOrderData(updatedData);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhoneCustomer(formattedPhoneNumber);
    };

    const handleCreateOrder = async () => {
        const data = {
            staffId: staffId,
            customerName: nameCustomer,
            bookingId:detailBookingInfor.id??"",
            customerPhoneNumber: phoneCustomer,
            licensePlate: licensePlate,
            orderDetailModel: [...orderData, ...orderService]
        };
        console.log("date", data)
        try {
            const response = await axiosPrivate.post('/orders/offline', data);

            if (response.status === 201) {
                const orderId = response.data.id;
                navigate(`/manage-order/${orderId}`);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('orderData');
                localStorage.removeItem('serviceItems');
                showSuccessAlert('Tạo đơn hàng thành công');
            } else {
                console.log('Lỗi');
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log('error', error);
            if (error.response) {
                if (error.response.status === 409) {
                    showWarningAlert(error.response.data.Message);
    
                } else {
                    showErrorAlert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
                }
            } else {
                showErrorAlert('Không thể kết nối tới máy chủ. Vui lòng thử lại sau.');
            }
            setIsLoading(false);
        }
    }

    const handleRemoveItemNotChange = (indexToRemove: number) => {
        if (indexToRemove >= 0 && indexToRemove < showService.length) {
            setShowService((prevAddProduct) => {
                const updatedAddProduct = [...prevAddProduct];
                updatedAddProduct.splice(indexToRemove, 1);
                return updatedAddProduct;
            });
        }
        const savedData = JSON.parse(localStorage.getItem('orderData') as string);

        // Xóa item khỏi savedData dựa trên index
        savedData?.splice(indexToRemove, 1);

        localStorage.setItem('orderData', JSON.stringify(savedData));

        // Cập nhật lại state
        setOrderData(savedData);
        console.log(indexToRemove)
    };

    return (
        <div className="w-[45%] border-x-2 border-t-2 border-gray-400">
            <div className='bg-white w-full text-center py-[20px] border-b-2 border-gray-400'>
                <h1 className="text-2xl font-semibold">Đơn hàng</h1>
            </div>
            <div className=' w-full h-[82.4vh]  flex flex-col justify-between '>
                <div className='px-3 pt-3 bg-white'>
                    <div className=' flex items-center pb-3'>
                        <ClipboardDocumentListIcon className="w-9 h-9 stroke-gray-400 fill-white" />
                        <p>Thông tin khách hàng</p>
                    </div>
                    <div className='w-full flex flex-col justify-between '>
                        <div className='w-full flex justify-between'>
                            <div className='flex flex-col space-y-3 text-[20px]'>
                                <p>Số điện thoại</p>
                                <p>Tên khách hàng</p>
                                <p>Biển số xe</p>
                            </div>

                            <div>
                                <div className='flex flex-col space-y-3 text-[18px] pb-2'>
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phoneCustomer}
                                        onChange={handlePhoneChange}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Tên khách hàng"
                                        value={nameCustomer}
                                        onChange={(e) => setNameCustomer(e.target.value)}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Biển số xe"
                                        value={licensePlate}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex">
                    <div className="w-[50%] space-y-3 border-r-2 border-y-2 border-gray-400">
                        {addProduct?.length > 0 && (<p className="font-semibold bg-white py-2 text-center ">Các sản phẩm</p>)}
                        <div className="w-full h-[50vh] pl-2 overflow-auto space-y-3 pr-1">
                            {addProduct &&
                                addProduct.map((item: item<string, number>, index: number) => (
                                    <div key={index} className='bg-white w-full rounded-lg flex items-center pb-1'>
                                        <div className='p-1 '>
                                            <img src={item.images[0].imageUrl} className='min-w-[95px] h-[70px] object-cover' alt="" />
                                        </div>
                                        <div className='pl-2 w-full'>
                                            <div className='font-semibold pt-1'>
                                                <div className='flex justify-between items-start'>
                                                    <p className='text-[13px]'>{item.name}</p>
                                                    <button className='text-red-700 font-semibold px-2'
                                                        onClick={() => {
                                                            removeProduct(item.id)
                                                            handleRemoveItemNotChange(index);
                                                        }}>X</button>
                                                </div>
                                                {item.discount ? (
                                                    <div>
                                                        <p className='text-[#888888] text-[13px] line-through'>{item.priceCurrent}đ</p>
                                                        <p className='text-[#FE3A30] text-[13px]'>{item.priceCurrent * (1 - item.discount.discountAmount / 100)}đ</p>
                                                    </div>
                                                ) : (
                                                    <p className='text-[#FE3A30] text-[13px]'>{item.priceCurrent}đ</p>
                                                )}


                                            </div>
                                            <div className='flex items-center space-x-1 pb-1'>
                                                <h3 className='font-semibold text-[10px]'>Số lượng:</h3>
                                                <input
                                                    type="number"
                                                    value={orderData?.find((checked) => checked.motobikeProductId === item?.id)?.productQuantity || 1}
                                                    min={1}
                                                    max={item.quantity}
                                                    onChange={(e) => {
                                                        if(parseInt(e.target.value)<item.quantity){
                                                            handleQuantityChange(item.id, parseInt(e.target.value))
                                                        }else{
                                                            handleQuantityChange(item.id, item.quantity)
                                                        }
                                                    }}
                                                    className='w-[50px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                                />
                                                {item.installationFee > 0 && (
                                                    <button
                                                        className='font-bold pl-2 text-blue-700 text-[10px]'
                                                        onClick={() => toggleService(item.id, index)}
                                                    >{showService[index] ? "Đã chọn sửa chữa" : "Chọn sửa chữa"} </button>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="w-[50%] space-y-3 border-y-2 border-gray-400">
                        {addService?.length > 0 && (<p className="font-semibold pl-1 bg-white py-2 text-center">Các dịch vụ</p>)}
                        <div className="w-full h-[50vh] overflow-auto space-y-3 pl-2 pr-1">
                            {addService &&
                                addService.map((item: itemService<string, number>, index: number) => (
                                    <div key={index} className="w-full">
                                        <div className='bg-white w-full rounded-lg flex justify-between pb-1'>
                                            <div className='flex pl-2'>
                                                <div className='py-2 pr-1'>
                                                    <img src={item.images[0].imageUrl} className='min-w-[100px] h-[70px] object-cover' alt="" />
                                                </div>
                                                <div className='pl-2 flex flex-col justify-between'>
                                                    <div className='font-semibold pt-1'>
                                                        <p className='text-[13px]'>{item.name}</p>
                                                        {item.discountAmount ? (
                                                            <div>
                                                                <p className='text-[#888888] text-[13px] line-through'>{item.price}đ</p>
                                                                <p className='text-[#FE3A30] text-[13px]'>{item.price * (1 - item.discountAmount / 100)}đ</p>
                                                            </div>
                                                        ) : (
                                                            <p className='text-[#FE3A30] text-[13px]'>{item.price}đ</p>
                                                        )}

                                                    </div>
                                                </div>

                                            </div>
                                            <button className='text-red-700 h-[30px] font-semibold px-1'
                                                onClick={() => {
                                                    removeService(item.id)
                                                }}>X</button>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
                {phoneCustomer?.length === 10 && nameCustomer && ( orderData?.length > 0 || orderService?.length > 0 )
                    ?(
                        <div className='w-full bg-white h-[10vh] flex justify-around items-center'>
                            <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-red-900 hover:text-white font-semibold text-[18px] rounded-lg'
                                onClick={() => {
                                    setPhoneCustomer('');
                                    setNameCustomer('');
                                    setLicensePlate('');
                                    setStaffId('')
                                    localStorage.removeItem('cartItems');
                                    localStorage.removeItem('orderData');
                                    localStorage.removeItem('orderData');
                                    localStorage.removeItem('serviceItems');
                                    setOrderData([]);
                                    setOrderService([]);
                                    setShowService([false]);
                                    setAddProduct([]);
                                    setAddService([]);
                                }}
                            >Hủy đơn</button>
                            {orderData.some((item) => item.instUsed === true) || orderService?.length > 0
                                ? (
                                    <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                        onClick={() => setShowStaff(true)}
                                    >Tiếp theo</button>
                                ) : (
                                    <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                        onClick={() => {
                                            setIsLoading(true)
                                            handleCreateOrder()
                                        }}
                                    >Tạo đơn hàng</button>
                                )}

                        </div>
                    ) : (
                        <div className='w-full h-[10vh] py-5'>
                        </div>
                    )}

            </div>
            {isLoading ? <LoadingCreateUpdate /> : ""}
            <StaffSelect
                nameBox={"create"}
                setIsLoading={setIsLoading}
                handleCreateOrder={handleCreateOrder}
                staffId={staffId}
                setStaffId={setStaffId}
                isVisible={showStaff}
                onClose={() => setShowStaff(false)}
            />
        </div>
    )
}

export default InforUser