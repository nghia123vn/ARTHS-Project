import { selectStaff } from '@/actions/userInfor';
import { itemStaff, selectorListStaff } from '@/types/actions/listStaff';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    staffId: string;
    setStaffId: React.Dispatch<React.SetStateAction<string>>;
    handleCreateOrder: () => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    nameBox:string,
}

const StaffSelect = ({ isVisible, onClose, staffId, setStaffId, handleCreateOrder,setIsLoading,nameBox }: Props) => {
    const dispatch = useDispatch();
    const listStaff: itemStaff<string>[] = useSelector((state: selectorListStaff<string>) => state.listStaffReducer.listStaff);
    const [showError,setShowError] =useState<string>('');
    useEffect(() => {
        dispatch(selectStaff());
    }, [dispatch]);

const handleBoxCreateOrder = ()=>{
    if(staffId){
        handleCreateOrder();
        setShowError('');
        setIsLoading(true);
    }else{
        setShowError('Chưa chọn nhân viên sửa chữa');
    }
}
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[500px] bg-white rounded-lg">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">{nameBox==="create"?"Tạo đơn hàng":nameBox==="update"?"Cập nhật đơn hàng":""}</p>
                    </div>
                </div>
                <div className="w-full p-3">
                <div className="flex space-x-5 items-center">
                    <p className="font-semibold text-[20px]">Chọn nhân viên sửa chữa:</p>
                    <select className='h-10 border-2 border-gray-300 text-[18px] px-2 rounded-lg outline-none '
                        value={staffId}
                        onChange={(e) => {
                            setStaffId(e.target.value);
                            console.log(e.target.value);
                        }}
                    >
                        <option value="" >Nhân viên</option>
                        {listStaff && listStaff?.map((item, index) => (
                            <option key={index} value={item.id}>{item.fullName}</option>
                        ))}
                    </select>
                </div>
                
                {showError?(
                    <p className='text-red-700 text-center text-[18px] font-semibold pt-3'>{showError}</p>
                ):""}
                
                
                <div className="font-bold text-white flex flex-row-reverse justify-center space-x-5 space-x-reverse pt-[60px]">
                    <button
                        className="hover:bg-blue-800 bg-blue-400 px-5 h-[40px]  rounded-md"
                        onClick={handleBoxCreateOrder}
                    >
                        {nameBox==="create"?"Tạo đơn hàng":nameBox==="update"?"Cập nhật đơn hàng":""}
                    </button>
                    <button
                        className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                        onClick={() => {
                            onClose();
                            setShowError('');
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

export default StaffSelect