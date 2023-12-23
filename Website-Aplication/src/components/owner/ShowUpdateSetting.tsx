import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { itemSetting } from '@/types/actions/typeSetting';
import { updateShowSetting } from '@/actions/setting';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    data: itemSetting;
}

const ShowUpdateSetting = ({ isVisible, onClose, data }: Props) => {
    const dispatch = useDispatch();
    const [workHours, setWorkHours] = useState<number>(0);
    const [serviceTime, setServiceTime] = useState<number>(0);
    const [nonBookingPercentage, setNonBookingPercentage] = useState<number>(0);
    const [shippingMoney, setShippingMoney] = useState<number>(0);
    const [showError, setShowError] = useState<string>('');
    useEffect(() => {
        if (data) {
            setWorkHours(data.workHours)
            setServiceTime(data.serviceTime)
            setNonBookingPercentage(data.nonBookingPercentage)
            setShippingMoney(data.shippingMoney)
        }
    }, [data, dispatch]);
    const handleUpdateSetting = () => {
        const data = {
            workHours: workHours,
            serviceTime: serviceTime,
            nonBookingPercentage: nonBookingPercentage,
            shippingMoney: shippingMoney,
        }
        if (workHours > 0 && serviceTime > 0 && nonBookingPercentage > 0 && shippingMoney > 0) {
            dispatch(updateShowSetting(data));
            onClose();
            showSuccessAlert('Sửa thông tin chung thành công');
            setShowError('')
        } else {
            setShowError('Không được bỏ trống tất cả các mục')
        }

    }
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[700px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Cập nhật thông tin chung
                        </p>
                    </div>
                </div>
                <div className='py-5 px-3 space-y-3'>
                    <div className='grid grid-cols-2 justify-items-center gap-5 '>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Thời gian sửa chữa (giờ):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={workHours}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setWorkHours(newValue);
                                    if(newValue>0){
                                        setWorkHours(newValue);
                                    }else{
                                        setWorkHours(1);
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Thời gian làm dịch vụ (giờ):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={serviceTime}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setServiceTime(newValue);
                                    if(newValue>0){
                                        setServiceTime(newValue);
                                    }else{
                                        setServiceTime(1);
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Lịch hẹn offline/online(%):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                max={100}
                                value={nonBookingPercentage}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    
                                    if(newValue>0 && newValue<100){
                                        setNonBookingPercentage(newValue);
                                    }else{
                                        if(newValue<0){
                                            setNonBookingPercentage(1);
                                        }
                                        if(newValue>100){
                                            setNonBookingPercentage(100);
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Tiền giao hàng(VNĐ):</p>
                            <input type="number"
                                className='w-[100px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={shippingMoney}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if(newValue>0){
                                        setShippingMoney(newValue);
                                    }else{
                                        setShippingMoney(1);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {showError ? (
                        <p className='text-red-700 text-center text-[18px] font-semibold pt-3'>{showError}</p>
                    ) : ""}
                    <div className="font-bold text-white flex flex-row-reverse justify-center space-x-5 space-x-reverse pt-[20px]">

                        <button
                            type='button'
                            className={`${showError === '' ? 'hover:bg-blue-800' : ''} bg-blue-400 px-5 h-[40px]  rounded-md`}
                            disabled={showError === '' ? false : true}
                            onClick={() => {
                                handleUpdateSetting();
                            }}
                        >
                            Cập nhật
                        </button>
                        <button
                            className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                            onClick={() => {
                                onClose();
                                setWorkHours(data.workHours)
                                setServiceTime(data.serviceTime)
                                setNonBookingPercentage(data.nonBookingPercentage)
                                setShippingMoney(data.shippingMoney)
                                setShowError('')
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShowUpdateSetting