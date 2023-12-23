import { getDetailEmployee } from '@/actions/employee';
import { itemDetailAccount, selectorDetailAccount } from '@/types/actions/detailAccount';
import { roleAccount } from '@/types/typeAuth';
import { ChevronRightIcon, IdentificationIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { formatDateFeedback } from '@/utils/formatDate';
const DetailEmployee = () => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const staffInfor: itemDetailAccount<string, number> = useSelector((state: selectorDetailAccount<string, number>) => state.detailAccountReducer.detailAccountInfor);
  console.log(staffInfor)
  useEffect(() => {
    if (employeeId) {
      dispatch(getDetailEmployee(roleAccount.Staff, employeeId))
    }
  }, [dispatch, employeeId])
  return (
    <div className="w-full max-h-[80vh]">
      <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
        <Link to="/manage-employees" className="hover:text-main">Danh sách nhân viên sửa chữa</Link>
        <ChevronRightIcon className="w-5 h-5" />
        <p className="text-main">Chi tiết nhân viên</p>
      </div>
      <div className="w-full flex justify-center space-x-5 pt-[20px]">
        <div className="w-[30%] min-h-[50vh] bg-white flex flex-col items-center rounded-md">
          <div className="w-full rounded-md h-[400px] relative">
            <div className="w-full h-[50%] bg-main rounded-t-md"></div>
            <img src={staffInfor?.avatar
              ? staffInfor?.avatar
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
              className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 w-[50%] h-[60%] object-cover rounded-full' />
          </div>

          <div className='space-y-3 w-full px-3 pb-3'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-center items-center space-x-5'>
                <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                  <IdentificationIcon className='w-10 h-auto text-[#667085]' />
                </div>
                <p className='text-[24px] font-semibold'>Tên nhân viên:</p>
              </div>
              <div>
                <p className='text-[24px] font-semibold'>{staffInfor?.fullName}</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex justify-center items-center space-x-5'>
                <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                  <PhoneIcon className='w-8 h-auto text-[#667085]' />
                </div>
                <p className='text-[24px] font-semibold'>Số điện thoại:</p>
              </div>
              <div>
                <p className='text-[24px] font-semibold'>{staffInfor?.phoneNumber}</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex justify-center items-center space-x-5'>
                <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                  <RxAvatar className='w-10 h-auto text-[#667085]' />
                </div>
                <p className='text-[24px] font-semibold'>Giới tính:</p>
              </div>
              <div>
                <p className='text-[24px] font-semibold'>{staffInfor?.gender}</p>
              </div>
            </div>
            {staffInfor?.address ? (
              <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center space-x-5'>
                  <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                    <MapPinIcon className='w-10 h-auto text-[#667085]' />
                  </div>
                  <p className='text-[24px] font-semibold'>Địa chỉ:</p>
                </div>
                <p className='text-[24px] text-end font-semibold w-[70%] pl-5 pt-8'>{staffInfor?.address}</p>
              </div>
            ) : ""}
          </div>
        </div>
        <div className='w-[60%] bg-white py-3 px-[5%] space-y-5 rounded-lg'>
          <p className='text-[30px] font-semibold'>Lịch sử nhận xét</p>
          {staffInfor && staffInfor?.feedbackStaffs?.length > 0
            ? (
              <div className='space-y-3 overflow-auto h-[60vh]'>
                {staffInfor?.feedbackStaffs?.map((item, index) => (
                  <div key={index}>
                    <div className='flex items-center'>
                      {item?.customer?.avatar
                        ? (
                          <img src={item?.customer.avatar} alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                        ) :
                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
                          alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                      }

                      <div className='pl-[30px] flex flex-col justify-start items-start space-y-4'>
                        <p className='font-semibold text-[18px]'>{item?.customer.fullName}</p>
                        <p className='text-[#9D9D9D]'>{formatDateFeedback(item?.sendDate?.toString())} </p>
                      </div>
                    </div>
                    <div className='mt-5 bg-[#D8D8D8] opacity-80 text-[17px] rounded-full py-4 px-7'
                    >
                      <p>{item?.content}</p>
                    </div>
                  </div>
                ))}
                
              </div>
            ) : (
              <div className='flex justify-center items-center h-[40vh]'
              >
                <p className='text-[30px] text-center'>Chưa có nhận xét</p>
              </div>
            )}


        </div>
      </div>

    </div>
  )
}

export default DetailEmployee