import { detailService } from '@/actions/service';
import LoadingPage from '@/components/LoadingPage';
import { selectorDetailService } from '@/types/actions/detailService';
import { itemService } from '@/types/actions/listService';
import { typeActiveProduct } from '@/types/typeProduct';
import { typeService } from '@/types/typeService';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const DetailService = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const getDetailService: itemService<string, number> = useSelector((state: selectorDetailService<string, number>) => state.serviceDetailReducer.serviceDetail)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [data, setData] = useState<itemService<string, number>>();
  useEffect(() => {
    if (serviceId) {
      dispatch(detailService(serviceId));
      setIsLoading(true);
    }
  }, [dispatch, serviceId]);
  useEffect(() => {
    if (getDetailService?.id === serviceId) {
      setData(getDetailService);
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [dispatch, getDetailService, serviceId])
  const handleChangeImage = (index: number) => {
    setSelectedImage(index);
  }
  console.log(data)
  return (
    <div className="w-full">
      <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
        {data?.status===typeService.Active ?(
          <Link to="/manage-services" className="hover:text-main">Danh sách dịch vụ</Link>
        ):(
          <Link to="/manage-services/list-not-service" className="hover:text-main">Danh sách dịch vụ đã hủy</Link>
        )}
        <ChevronRightIcon className="w-5 h-5" />
        <p className="text-main">Chi tiết dịch vụ</p>
      </div>
      {isLoading
        ? <LoadingPage />
        : (<div>
          <div className="flex justify-between py-5  space-x-4">
            <div className="bg-white flex flex-col justify-center items-center rounded-lg py-3 w-[60%]">
              {data?.images && (
                <div className='bg-white shadow-lg p-2 rounded-lg'>
                  <img
                    src={data?.images[selectedImage].imageUrl}
                    alt=""
                    className='h-[480px] object-contain'
                  />
                </div>
              )}
              <div className='py-5'>
                <div className='flex justify-center px-2'>
                  <div className={`flex gap-x-3`}>
                    {data?.images && data?.images.map((item, index) => (
                      <div key={index} className={`p-2  rounded-lg flex justify-center cursor-pointer  items-center ${index === selectedImage ? 'border-4 border-blue-400' : ''} `}>
                        <img
                          src={item?.imageUrl?item?.imageUrl:'https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp'}
                          alt=""
                          className={`h-[170px] object-contain`}
                          onMouseEnter={() => handleChangeImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[45%] space-y-5">
              <div className="bg-white p-5 text-[17px] rounded-lg">
                <div className='flex justify-between items-start'>
                  <p className='font-semibold text-[20px] px-1'>{data?.name}</p>
                  <div className='flex min-w-[150px] space-x-2 p-2 items-center border-2 border-gray-200 rounded-lg'>
                    <div className={`w-2 h-2 rounded-full ${data?.status === typeActiveProduct.Active ? "bg-green-600" : "bg-black"}`}></div>
                    <p className='font-semibold text-[14px]'>
                      {data?.status}
                    </p>
                  </div>
                </div>
                <p className='font-semibold text-[19px] py-5'> Chi tiết</p>
                <div className='flex justify-between text-[#6B7280] items-center'>
                  <div className=' space-y-5'>
                  <p>Giá dịch vụ</p>
                  {data?.discountAmount ? <p>Giá sau khuyến mãi</p>:""}
                  {data?.duration && <p>Thời gian làm dịch vụ</p>}
                  {data?.reminderInterval ? <p>Thời gian nhắc nhở</p>:""}
                  {data?.warrantyDuration ? <p>Bảo hành</p>:""}
                  </div>
                  <div className='space-y-5 flex flex-col text-end'>
                    <p>{formatPrice(data?.price)}VNĐ</p>
                    {data?.discountAmount ? <p>{formatPrice(data?.price * (1 - data?.discountAmount / 100))}VNĐ</p>:""}
                    {data?.duration && <p>{data?.duration} phút</p>}
                    {data?.reminderInterval ? <p>{data?.reminderInterval} tháng</p>:""}
                    {data?.warrantyDuration ? <p>{data?.warrantyDuration} tháng</p>:""}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className=' flex justify-center items-center py-5'>
            {data?.description && (
              <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                <p className='font-semibold text-[20px]'>Mô tả sản phẩm</p>
                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
              </div>
            )}
          </div>
        </div>
        )
      }



    </div >
  )
}

export default DetailService