import { getDetailDiscount } from '@/actions/discount';
import LoadingPage from '@/components/LoadingPage';
import { detaiDiscount, selectorDetailDiscount } from '@/types/actions/detailDiscount';
import { StatusDiscount } from '@/types/typeDiscount';
import { formatDateTime } from '@/utils/formatDate';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const DetailDiscount = () => {
  const { discountId } = useParams();
  const dispatch = useDispatch();
  const detailDiscountInfor: detaiDiscount<string, number> = useSelector((state: selectorDetailDiscount<string, number>) => state.detailDiscountReducer.detailDiscountInfor)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<detaiDiscount<string, number>>();
  useEffect(() => {
    if (discountId) {
      dispatch(getDetailDiscount(discountId));
      setIsLoading(true);
    }
  }, [dispatch, discountId]);
  useEffect(() => {
    if (detailDiscountInfor?.id === discountId) {
      setData(detailDiscountInfor);
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [dispatch, detailDiscountInfor, discountId])
  console.log(data)
  return (
    <div className="w-full">
      <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
        {data?.status === StatusDiscount.Active ? (
          <Link to="/manage-discounts" className="hover:text-main">Danh sách khuyến mãi</Link>
        ) : (
          <Link to="/manage-discounts/list-not-discount" className="hover:text-main">Danh sách khuyến mãi ngừng hoạt động</Link>
        )}
        <ChevronRightIcon className="w-5 h-5" />
        <p className="text-main">Chi tiết khuyến mãi</p>
      </div>
      {isLoading
        ? <LoadingPage />
        : (<div>
          <div className="flex justify-between py-5">
            <div className="bg-white flex flex-col shadow-lg justify-center items-center rounded-lg py-2 w-[58%]">
              {data?.imageUrl ? (
                <div className='  px-2 rounded-lg'>
                  <img
                    src={data?.imageUrl}
                    alt=""
                    className='h-[480px] object-contain'
                  />
                </div>
              ) : ""}
            </div>
            <div className="w-[38%] space-y-5">
              <div className="bg-white p-5 text-[17px] rounded-lg">
                <div className='flex justify-between items-start'>
                  <p className='font-semibold text-[20px] px-1'>{data?.title}</p>
                  <div className='flex min-w-[150px] space-x-2 p-2 items-center border-2 border-gray-200 rounded-lg'>
                    <div className={`w-2 h-2 rounded-full ${data?.status === StatusDiscount.Active ? "bg-green-600" : "bg-black"}`}></div>
                    <p className='font-semibold text-[14px]'>
                      {data?.status === StatusDiscount.Active ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </p>
                  </div>
                </div>
                <p className='font-semibold text-[19px] py-5'> Chi tiết:</p>
                <div className='flex justify-between text-[#6B7280] items-center'>
                  <div className=' space-y-5 font-semibold'>
                    <p>Phần trăm khuyến mãi(%):</p>
                    <p>Ngày bắt đầu:</p>
                    <p>Ngày kết thúc:</p>
                  </div>
                  <div className='space-y-5 flex flex-col text-end'>
                    <p>{data?.discountAmount}</p>
                    {data?.startDate ? <p>{formatDateTime(data?.startDate.toString())}</p> : ""}
                    {data?.endDate ? <p>{formatDateTime(data?.endDate.toString())}</p> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=' flex justify-center items-center py-5 space-x-3'>
            {data?.motobikeProducts && (
              <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                <p className='font-semibold text-[20px]'>Số sản phẩm áp dụng: {data?.motobikeProducts?.length}</p>
                <div className='overflow-y-auto h-[25vh] space-y-3'>
                  {data?.motobikeProducts?.map((item,index) =>(
                    <div key={index} className='flex justify-start items-center space-x-3'>
                      <img src={item?.imageUrl} className='h-[70px] w-[70px]' />
                      <Link to={`/manage-products/${item?.id}`} 
                      className='hover:text-blue-500 text-[20px]'
                      >{item?.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data?.repairService && (
              <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                <p className='font-semibold text-[20px]'>Số dịch vụ áp dụng: {data?.repairService?.length}</p>
                <div className='overflow-y-auto h-[25vh] space-y-3'>
                  {data?.repairService?.map((item,index) =>(
                    <div key={index} className='flex justify-start items-center space-x-3'>
                    <img src={item?.image} className='h-[70px] w-[70px]' />
                    <Link to={`/manage-services/${item?.id}`} 
                    className='hover:text-blue-500 text-[20px]'
                    >{item?.name}</Link>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=' flex justify-center items-center py-5'>
            {data?.description && (
              <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                <p className='font-semibold text-[20px]'>Mô tả sản phẩm:</p>
                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
              </div>
            )}
          </div>
        </div>
        )}
    </div >
  )
}

export default DetailDiscount