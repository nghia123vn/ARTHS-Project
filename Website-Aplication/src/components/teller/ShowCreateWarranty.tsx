import { useEffect, useState } from 'react'
import { selectStaff } from '@/actions/userInfor';
import { inStoreOrderDetails, staffOrder } from '@/types/actions/detailOrder';
import { itemStaff, selectorListStaff } from '@/types/actions/listStaff';
import { useDispatch, useSelector } from 'react-redux';
import { postWarranty } from '@/actions/order';
import { showSuccessAlert } from '@/constants/chooseToastify';

type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    onClose: () => void;
    isVisible: boolean;
    itemOrder: inStoreOrderDetails<string, number> | undefined;
    idOrder: string;
    isStaff:staffOrder<string>;
}

const ShowCreateWarranty = ({ isVisible, onClose, itemOrder, idOrder, setIsLoading,isStaff }: Props) => {
    const dispatch = useDispatch();
    const listStaff: itemStaff<string>[] = useSelector((state: selectorListStaff<string>) => state.listStaffReducer.listStaff);
    const [showError, setShowError] = useState<string>('');
    const [errorQuantity, setErrorQuantity] = useState<string>('');
    const [staffId, setStaffId] = useState<string>('')
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [repairDetails,setRepairDetails] = useState<string>('');
    useEffect(() => {
        dispatch(selectStaff());
    }, [dispatch]);
    const handleCreateWarrantyStaff = () => {
        const data = {
            orderDetailId: itemOrder?.id ??"",
            handledBy: staffId??"",
            productQuantity: productQuantity,
            repairDetails: repairDetails,
        }
        dispatch(postWarranty(data, idOrder));
        onClose();
        setIsLoading(true);
        showSuccessAlert('Tạo bảo hành thành công');
    }

    const handleCreateWarrantyNotStaff = () => {
        const data = {
            orderDetailId: itemOrder?.id ??"",
            handledBy:"",
            productQuantity: productQuantity,
            repairDetails: repairDetails,
        }
        dispatch(postWarranty(data, idOrder));
        onClose();
        setIsLoading(true);
        showSuccessAlert('Tạo bảo hành thành công');
    }
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[500px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            {itemOrder?.motobikeProduct
                                ? "Tạo bảo hành sản phẩm"
                                : itemOrder?.repairService
                                    ? "Tạo bảo hành dịch vụ" : ""}
                        </p>
                    </div>
                </div>
                <div className='p-3 space-y-3'>
                    {itemOrder?.motobikeProduct && (
                        <div>
                            <div className='flex items-center space-x-3 pt-3 font-semibold '>
                                <p className='text-[17px]'>Số lượng bảo hành</p>
                                <input type="number"
                                    className='w-[50px] outline-none border-b-2 border-gray-600 text-center'
                                    min={1}
                                    defaultValue={1}
                                    max={itemOrder?.quantity}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 1 && newValue <= itemOrder?.quantity) {
                                            setProductQuantity(newValue);
                                            setErrorQuantity('');
                                        } else {
                                            setErrorQuantity('Số lượng phải lớn hơn 1 và không vượt quá số lượng đã mua');
                                        }
                                    }}
                                />
                            </div>
                            {errorQuantity && <p style={{ color: 'red' }}>{errorQuantity}</p>}
                        </div>

                    )}
                    {isStaff!==null?(
                        <div>
                            <div className="flex space-x-5 items-center">
                        <p className="font-semibold text-[17px]">Chọn nhân viên sửa chữa:</p>
                        <select className='h-10 border-2 border-gray-300 text-[17px] px-2 rounded-lg outline-none '
                            value={staffId}
                            onChange={(e) => {
                                setStaffId(e.target.value);
                            }}
                        >
                            <option value="" >Nhân viên</option>
                            {listStaff && listStaff?.map((item, index) => (
                                <option key={index} value={item.id}>{item.fullName}</option>
                            ))}
                        </select>
                    </div>

                    {showError ? (
                        <p className='text-red-700 text-center text-[18px] font-semibold py-3'>{showError}</p>
                    ) : ""}
                        </div>
                    ):""}
                    <div className='space-y-1'>
                        <p className='text-[17px] font-semibold'>{isStaff!==null?"Chi tiết đã sửa chữa:":"Chi tiết bảo hành:"} </p>
                        <textarea onChange={(e)=>setRepairDetails(e.target.value)}
                        className='w-full min-h-[100px] border-2 border-gray-300 p-1'
                        placeholder='Nhập thông tin sửa chữa...'></textarea>
                    </div>
                </div>


                <div className="font-bold text-white flex flex-row-reverse justify-center space-x-5 space-x-reverse pt-[20px]">

                    <button
                        type='button'
                        className={`${errorQuantity === '' ? 'hover:bg-blue-800' : ''} bg-gray-400 px-5 h-[40px]  rounded-md`}
                        disabled={errorQuantity === '' ? false : true}
                        onClick={() => {
                            if (isStaff!==null) {
                                if(staffId){
                                    handleCreateWarrantyStaff();
                                    setShowError('');
                                    setStaffId('');
                                }else{
                                    setShowError('Chưa chọn nhân viên sửa chữa');
                                }
                            } else {
                                handleCreateWarrantyNotStaff();
                            }
                        }}
                    >
                        Tạo bảo hành
                    </button>
                    <button
                        className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                        onClick={() => {
                            onClose();
                            setShowError('');
                            setErrorQuantity('');
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowCreateWarranty