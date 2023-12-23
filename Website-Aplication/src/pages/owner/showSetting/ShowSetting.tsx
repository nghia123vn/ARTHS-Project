import { getShowSetting } from '@/actions/setting';
import ShowUpdateSetting from '@/components/owner/ShowUpdateSetting';
import { itemSetting, selectorDetailSetting } from '@/types/actions/typeSetting';
import { formatPrice } from '@/utils/formatPrice';
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ShowSetting = () => {
    const dispatch = useDispatch();
    const settingInfor: itemSetting = useSelector((state: selectorDetailSetting) => state.detailSettingReducer.detailSettingInfor);
    const [showUpdate,setShowUpdate] = useState<boolean>(false);
    useEffect(() => {
        dispatch(getShowSetting())
    }, [dispatch])
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="bg-white  w-[72%] h-[60vh] py-3 px-5 space-y-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <p className="text-[24px] font-semibold">Bảng thông tin chung</p>
                    <button className="py-2 px-3 bg-main hover:bg-[#ef6847] text-white rounded-lg text-[24px] font-semibold"
                    onClick={()=>setShowUpdate(true)}
                    >Cập nhật</button>
                </div>
                <div className="h-[80%] bg-[#ca8d62] rounded-lg text-[20px] font-semibold space-y-[10%] flex flex-col justify-center px-5 text-white">
                    <div className='flex items-center space-x-5'>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5 items-center">
                                <p className='text-[17px]'>Tổng nhân viên sửa chữa đang hoạt động:</p>
                                <p>{settingInfor?.totalStaff} nhân viên</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5">
                                <p>Tiền giao hàng:</p>
                                <p>{formatPrice(settingInfor?.shippingMoney)} VNĐ</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center space-x-5'>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5">
                                <p>Thời gian làm việc của 1 nhân viên:</p>
                                <p>{settingInfor?.workHours} giờ</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5">
                                <p>Thời gian tối đa làm dịch vụ:</p>
                                <p>{settingInfor?.serviceTime} giờ</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center space-x-5'>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5">
                                <p>Phần trăm ưu tiên lịch hẹn offline/online:</p>
                                <p>{settingInfor?.nonBookingPercentage}%</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center  border-2 border-white w-1/2 rounded-lg p-3">
                            <div className="flex space-x-5">
                                <p>Lịch hẹn tối đa trong ngày :</p>
                                <p>{settingInfor?.dailyOnlineBookings} đơn / 1 ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowUpdateSetting
            isVisible={showUpdate}
            onClose={() => setShowUpdate(false)}
            data={settingInfor}
            />
        </div>
    )
}

export default ShowSetting