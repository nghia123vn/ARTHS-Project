import { getDetailEmployee } from '@/actions/employee';
import { itemDetailAccount, selectorDetailAccount } from '@/types/actions/detailAccount';
import { roleAccount } from '@/types/typeAuth';
import { ChevronRightIcon, IdentificationIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import {useEffect} from 'react'
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'


const DetailTeller = () => {
  const {employeeId} =useParams();
  const dispatch = useDispatch();
  const staffInfor: itemDetailAccount<string,number> = useSelector((state: selectorDetailAccount<string, number>) => state.detailAccountReducer.detailAccountInfor);
  console.log(staffInfor)
  useEffect(()=>{
    if(employeeId){
      dispatch(getDetailEmployee(roleAccount.Teller,employeeId))
    }
  },[dispatch, employeeId])
  return (
    <div className="w-full max-h-[80vh]">
      <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
        <Link to="/manage-employees/list-teller" className="hover:text-main">Danh sách nhân viên thanh toán</Link>
        <ChevronRightIcon className="w-5 h-5" />
        <p className="text-main">Chi tiết nhân viên</p>
      </div>
      <div className="w-full h-[70vh] flex justify-center items-center space-x-5">
        <div className="w-[40%] h-[500px] bg-white flex flex-col items-center relative p-3 rounded-md">
          <div className="w-full h-1/2 bg-main rounded-md"></div>
          <img src={staffInfor?.avatar
            ? staffInfor?.avatar
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
            className='absolute top-1/2 transform -translate-y-1/2 z-10 w-[50%] h-[60%] object-cover rounded-full' />
        </div>
        <div className='w-[60%] bg-white py-3 px-[5%] min-h-[500px] flex flex-col justify-center space-y-5 rounded-lg'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center space-x-5'>
              <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                <IdentificationIcon className='w-16 h-auto text-[#667085]' />
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
                <PhoneIcon className='w-14 h-auto text-[#667085]' />
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
                <RxAvatar className='w-16 h-auto text-[#667085]' />
              </div>
              <p className='text-[24px] font-semibold'>Giới tính:</p>
            </div>
            <div>
              <p className='text-[24px] font-semibold'>{staffInfor?.gender}</p>
            </div>
          </div>
          {staffInfor?.address?(
            <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center space-x-5'>
              <div className='bg-[#E0E2E7] rounded-full border-8 border-[#F0F1F3] flex justify-center items-center p-2'>
                <MapPinIcon className='w-16 h-auto text-[#667085]' />
              </div>
              <p className='text-[24px] font-semibold'>Địa chỉ:</p>
            </div>
              <p className='text-[24px] text-end font-semibold w-[70%] pl-5 pt-8'>{staffInfor?.address}</p>
          </div>
          ):""}
          
        </div>
      </div>

    </div>
  )
}

export default DetailTeller