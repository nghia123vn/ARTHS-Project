import { useState, useEffect } from 'react'
import { addProductOrder, addProductService } from '@/types/actions/product'
import { itemOrder } from '@/types/actions/createOrder';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductOrder } from '@/actions/order';
import { showSuccessAlert, showWarningAlert } from '@/constants/chooseToastify';
import StaffSelect from './StaffSelect';
import LoadingCreateUpdate from '../LoadingCreateUpdate';
import { itemServiceOrder } from '@/types/actions/updateCustomerOrder';
import { selectorDetailOrder } from '@/types/actions/detailOrder';
import { resetError } from '@/actions/userInfor';
import { typeActiveProduct } from '@/types/typeProduct';
import { FilterProduct } from '@/actions/product';
type Props = {
    addProduct?: addProductOrder<string, number>[];
    addService?: addProductService<string, number>[];
    removeProduct: (itemId: string) => void;
    removeService: (itemId: string) => void;
    onClose: () => void;
    setAddProduct: React.Dispatch<React.SetStateAction<addProductOrder<string, number>[]>>;
    setAddService: React.Dispatch<React.SetStateAction<addProductService<string, number>[]>>;
    tranfomDataProduct: addProductOrder<string, number>[];
    tranfomDataService: addProductService<string, number>[];
    idOrder: string | null;
    staffIdDetail: string | null
}

const UpdateProduct = ({ addProduct = [], addService = [], removeProduct, onClose, setAddProduct,
    tranfomDataProduct, tranfomDataService, setAddService, removeService, idOrder, staffIdDetail }: Props) => {
    const errorUpdate: string | null = useSelector((state: selectorDetailOrder<string, number>) => state.orderDetailReducer.showError);
    console.log("first",errorUpdate)
    const checkUpdate: boolean = useSelector((state: selectorDetailOrder<string, number>) => state.orderDetailReducer.checkUpdate);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const [staffId, setStaffId] = useState<string>('');
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [productQuantity, setProductQuantity] = useState<{ [key: string]: number }>({});
    const [orderService, setOrderService] = useState<itemServiceOrder<string>[]>([]);
    const [showService, setShowService] = useState<boolean[]>(addProduct.map((item) => item.instUsed));
    useEffect(() => {
        if (staffIdDetail === null) {
            setStaffId("")
        } else {
            setStaffId(staffIdDetail)
        }
    }, [staffIdDetail]);

    useEffect(() => {
        const dataCart: itemServiceOrder<string>[] = addService.map((item) => ({
            repairServiceId: item.id,
        }));
        setOrderService(dataCart);
    }, [addService])
    useEffect(() => {
        if (addProduct?.length > 0) {
            const dataCart: itemOrder<string, number>[] = (addProduct || []).map((item) => {
                const matchingItem: addProductOrder<string, number> | undefined = tranfomDataProduct.find((transformedItem) => transformedItem.idProduct === item.idProduct);
                if (matchingItem) {
                    // Sản phẩm đã tồn tại trong orderData, sử dụng giá trị từ addProduct
                    return {
                        motobikeProductId: item?.idProduct,
                        productQuantity: item?.productQuantity,
                        instUsed: item.instUsed
                    };
                } else {
                    // Dữ liệu thêm mới, chỉ set giá trị mặc định cho sản phẩm mới
                    return {
                        motobikeProductId: item.idProduct,
                        productQuantity: 1,
                        instUsed: false
                    };
                }
            });

            // Kiểm tra xem orderData có dữ liệu không
            if (orderData.length === 0) {
                localStorage.setItem('updateOrderData', JSON.stringify(dataCart));
                setOrderData(dataCart);
                // Số lượng sản phẩm ở order
                const initialProductQuantity = addProduct.reduce((itemCurrent, item) => {
                    return {
                        ...itemCurrent,
                        [item.idProduct]: item.productQuantity
                    };
                }, {});
                setProductQuantity(initialProductQuantity);
            } else {
                // Nếu orderData đã có dữ liệu, thêm mới sản phẩm chưa tồn tại
                const newProducts = addProduct.filter((product) => !orderData.some((item) => item.motobikeProductId === product.idProduct));
                if (newProducts.length > 0) {
                    const newData = [
                        ...orderData,
                        ...newProducts.map((product) => ({
                            motobikeProductId: product.idProduct,
                            productQuantity: 1,
                            instUsed: false
                        }))
                    ];

                    localStorage.setItem('updateOrderData', JSON.stringify(newData));
                    setOrderData(newData);
                }
            }
        }
    }, [addProduct, tranfomDataProduct]);


    //Ẩn/hiện sửa chữa
    const toggleService = (itemId: string, index: number) => {
        const savedData = JSON.parse(localStorage.getItem('updateOrderData') as string);
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
        localStorage.setItem('updateOrderData', JSON.stringify(updatedData));
        setOrderData(updatedData);
        setShowService((prevShowService) => {
            const updatedShowService = [...prevShowService];
            updatedShowService[index] = !updatedShowService[index];
            return updatedShowService;
        });
    };

    const handleQuantityChange = (itemId: string, value: number) => {
        if (value > 0 ) {
            setProductQuantity((prevProductQuantity) => {
                return {
                    ...prevProductQuantity,
                    [itemId]: value
                };
            });
        } else {
            setProductQuantity((prevProductQuantity) => {
                return {
                    ...prevProductQuantity,
                    [itemId]: 1
                };
            });
        }

        const savedData = JSON.parse(localStorage.getItem('updateOrderData') as string);

        // Tìm sản phẩm trong savedData dựa trên itemId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData = savedData?.map((item: any) => {
            if (item.motobikeProductId === itemId) {
                return {
                    ...item,
                    productQuantity: value
                };
            }
            return item;
        });

        localStorage.setItem('updateOrderData', JSON.stringify(updatedData));

        // Cập nhật lại state
        setOrderData(updatedData);
    };
    //gửi dispatch update
    const handleUpdateStaffProduct = () => {
        setIsLoading(true);
        const data = {
            staffId: (orderData.some((item) => item.instUsed === true) || orderService?.length > 0) ? staffId : null,
            orderDetailModel: [...orderData, ...orderService]
        };
        if (idOrder) {
            dispatch(updateProductOrder(idOrder, data))
        }
    }
    useEffect(() => {
        if (errorUpdate === null && checkUpdate ===true) {
            onClose();
            showSuccessAlert("Cập nhật thành công")
            dispatch(resetError());
            setIsLoading(false);
            const data = {
                category: "",
                name: "",
                status: typeActiveProduct.InActive,
                paginationNumber: 0
            }
            dispatch(FilterProduct(data));
        } else {
            if(errorUpdate){
                showWarningAlert(errorUpdate);
                setIsLoading(false);
                dispatch(resetError());
            }
        }
    }, [checkUpdate, dispatch, errorUpdate, onClose])

    const handleRemoveItemNotChange = (indexToRemove: number) => {
        if (indexToRemove >= 0 && indexToRemove < showService.length) {
            setShowService((prevShowService) => {
                const updatedShowService = [...prevShowService];
                updatedShowService.splice(indexToRemove, 1);
                return updatedShowService;
            });
        }
        if (indexToRemove >= 0 && indexToRemove < orderData.length) {
            const motobikeProductIdToRemove = orderData[indexToRemove].motobikeProductId;

            // Cập nhật orderData bằng cách loại bỏ mục
            const updatedOrderData = orderData.filter((item) => item.motobikeProductId !== motobikeProductIdToRemove);
            setOrderData(updatedOrderData);

            // Cập nhật productQuantity bằng cách loại bỏ motobikeProductId tương ứng
            setProductQuantity((prevProductQuantity) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [motobikeProductIdToRemove]: removedItem, ...rest } = prevProductQuantity;
                return rest;
            });

            // Cập nhật localStorage
            localStorage.setItem('updateOrderData', JSON.stringify(updatedOrderData));
        }
    };

    return (
        <div className="w-[45%] ">
            <div className='bg-white w-full text-center pt-[10px] pb-[20px]'>
                <h1 className="text-2xl font-semibold">Sản phẩm đơn hàng</h1>
            </div>
            <div className=' w-full flex flex-col justify-between'>
                <div className=" w-full flex">
                    <div className="w-[50%] space-y-3 border-x-2 border-y-2 border-gray-400">
                        {addProduct?.length > 0 && (<p className="font-semibold bg-white py-2 text-center ">Các sản phẩm</p>)}
                        <div className="w-full h-[65vh] px-2 overflow-auto space-y-3">
                            {addProduct &&
                                addProduct.map((item, index: number) => (
                                    <div key={index} className='bg-white w-full rounded-lg flex items-center pb-1 shadow-lg'>
                                        <div className='p-1 '>
                                            <img src={item.image} className='min-w-[95px] h-[70px] object-cover' alt="" />
                                        </div>
                                        <div className='pl-2 w-full'>
                                            <div className='font-semibold pt-1'>
                                                <div className='flex justify-between items-start'>
                                                    <p className='text-[13px]'>{item.nameProduct}</p>
                                                    <button className='text-red-700 font-semibold px-2'
                                                        onClick={() => {
                                                            removeProduct(item.idProduct)
                                                            handleRemoveItemNotChange(index);
                                                        }}>X</button>
                                                </div>
                                                {item.discountAmount ? (
                                                    <div>
                                                        <p className='text-[#888888] text-[13px] line-through'>{item.priceProduct}đ</p>
                                                        <p className='text-[#FE3A30] text-[13px]'>{item.priceProduct * (1 - item.discountAmount / 100)}đ</p>
                                                    </div>
                                                ) : (
                                                    <p className='text-[#FE3A30] text-[13px]'>{item.priceProduct}đ</p>
                                                )}


                                            </div>
                                            <div className='flex items-center space-x-1 pb-1'>
                                                <h3 className='font-semibold text-[10px]'>Số lượng:</h3>
                                                <input
                                                    type="number"
                                                    value={isNaN(productQuantity[item.idProduct]) ? 1 : productQuantity[item.idProduct]}
                                                    min={1}
                                                    onChange={(e) => {
                                                        handleQuantityChange(item.idProduct, parseInt(e.target.value))
                                                    }}
                                                    className='w-[50px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                                />
                                                {item.installationFee > 0 && (
                                                    <button
                                                        className='font-bold pl-2 text-blue-700 text-[10px]'
                                                        onClick={() => toggleService(item.idProduct, index)}
                                                    >{showService[index] ? "Đã chọn sửa chữa" : "Chọn sửa chữa"} </button>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="w-[50%] space-y-3 border-y-2 border-r-2 border-gray-400">
                        {addService?.length > 0 && (<p className="font-semibold pl-1 bg-white py-2 text-center">Các dịch vụ</p>)}
                        <div className="w-full h-[65vh] overflow-auto space-y-3 pl-2 pr-1">
                            {addService &&
                                addService.map((item: addProductService<string, number>, index: number) => (
                                    <div key={index} className='bg-white w-full rounded-lg flex justify-between py-2 shadow-lg px-2'>
                                        <div className='flex pl-2'>
                                            <div className='py-2 pr-1'>
                                                <img src={item?.image} className='min-w-[100px] h-[80px] object-cover' alt="" />
                                            </div>
                                            <div className='pl-2 flex flex-col justify-between'>
                                                <div className='font-semibold pt-1'>
                                                    <p className='text-[13px]'>{item.name}</p>
                                                    {item.discountAmount > 0 ? (
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
                                ))
                            }
                        </div>

                    </div>

                </div>
                <div className='w-full h-full bg-white flex justify-around items-center py-3'>
                    <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-red-900 hover:text-white font-semibold text-[18px] rounded-lg'
                        onClick={() => {
                            localStorage.removeItem('updateOrderData');
                            setOrderData([]);
                            setAddProduct([...tranfomDataProduct]);
                            setAddService([...tranfomDataService]);
                            onClose();
                        }}
                    >Hủy</button>
                    {orderData?.length > 0 || orderService?.length > 0
                        ? orderData.some((item) => item.instUsed === true) || orderService?.length > 0
                            ? (
                                <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                    onClick={() => setShowStaff(true)}
                                >Tiếp theo</button>
                            ) : (
                                <button className='w-[200px] h-[50px] bg-gray-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                    onClick={() => {
                                        setIsLoading(true)
                                        handleUpdateStaffProduct()
                                    }}
                                >Cập nhật</button>
                            ) : ""}
                </div>
            </div>
            {isLoading ? <LoadingCreateUpdate /> : ""}
            <StaffSelect
                nameBox={"update"}
                setIsLoading={setIsLoading}
                handleCreateOrder={handleUpdateStaffProduct}
                staffId={staffId}
                setStaffId={setStaffId}
                isVisible={showStaff}
                onClose={() => setShowStaff(false)}
            />
        </div>
    )
}

export default UpdateProduct