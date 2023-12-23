import { getDetailProduct } from '@/actions/product';
import LoadingPage from '@/components/LoadingPage';
import FeedBackProduct from '@/components/owner/FeedBackProduct';
import { selectorDetailProduct } from '@/types/actions/detailProduct';
import { item } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const detailProduct: item<string, number> = useSelector((state: selectorDetailProduct<string, number>) => state.productDetailReducer.productDetail)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showVehicle, setShowVehicle] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [data, setData] = useState<item<string, number>>();

    useEffect(() => {
        if (productId) {
            dispatch(getDetailProduct(productId));
            setIsLoading(true);
        }

    }, [dispatch, productId]);
    useEffect(() => {
        setData(detailProduct);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [detailProduct])

    const handleBoxVehicle = () => {
        setShowVehicle(!showVehicle);
    }
    const handleChangeImage = (index: number) => {
        setSelectedImage(index);
    }
    console.log(data)
    return (
        <div className="w-full">
            <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
                {data?.status===typeActiveProduct.Active?(
                    <Link to="/manage-products" className="hover:text-main">Danh sách sản phẩm</Link>
                ):data?.status===typeActiveProduct.OutOfStock?(
                    <Link to="/manage-products" className="hover:text-main">Các sản phẩm hết hàng</Link>
                ):(
                    <Link to="/manage-products/list-not-product" className="hover:text-main">Danh sách sản phẩm đã hủy</Link>
                )}
                <ChevronRightIcon className="w-5 h-5" />
                <p className="text-main">Chi tiết sản phẩm</p>
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
                                <div className='flex justify-center'>
                                    <div className={`flex gap-x-3`}>
                                        {data?.images && data?.images.map((item, index) => (
                                            <div key={index} className={`p-2  rounded-lg flex justify-center cursor-pointer  items-center ${index === selectedImage ? 'border-4 border-blue-400' : ''} `}>
                                                <img
                                                    src={item.imageUrl}
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
                        <div className="w-[45%]">
                            <div className="bg-white p-5 text-[17px] rounded-lg">
                                <div className='flex justify-between items-start'>
                                    <p className='font-semibold text-[20px] px-1'>{data?.name}</p>
                                    <div className='flex min-w-[150px] space-x-2 p-2 justify-center items-center border-2 border-gray-200 rounded-lg'>
                                        <div className={`w-2 h-2 rounded-full ${data?.status === typeActiveProduct.Active ? "bg-green-600" 
                                        :data?.status === typeActiveProduct.OutOfStock ? "bg-orange-700" : "bg-red-600"}`}></div>
                                        <p className='font-semibold text-[14px]'>
                                            {data?.status}
                                        </p>
                                    </div>
                                </div>
                                <p className='font-semibold text-[19px] py-5'> Chi tiết</p>
                                <div className='text-[#6B7280] flex justify-between items-center pb-5'>
                                    <p>Loại xe phù hợp</p>
                                    <div className='flex justify-end space-x-1 relative'>
                                        {data?.vehicles && data?.vehicles.slice(0, 3).map((vehicle, index) => (
                                            <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                                <p>{vehicle.vehicleName}</p>

                                            </div>
                                        ))}
                                        {data?.vehicles && data?.vehicles.length > 3 && (
                                            <button className='p-1 border-2 border-gray-200 rounded-lg'
                                                onClick={handleBoxVehicle}
                                            >
                                                <RxDotsHorizontal className='w-5 h-5' />
                                            </button>

                                        )}
                                        {showVehicle ? (
                                            <div
                                                className='bg-white shadow-lg w-[500px] h-[240px] overflow-y-scroll absolute right-9 p-3 rounded-lg'>
                                                <div className='grid grid-cols-3 gap-2'>
                                                    {data?.vehicles && data?.vehicles.map((vehicle, index) => (
                                                        <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                                            <p>{vehicle.vehicleName}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : ""}

                                    </div>
                                </div>
                                <div className='flex justify-between text-[#6B7280] items-center'>
                                    <div className='space-y-6'>
                                        <p>Loại sản phẩm</p>
                                        {data?.installationFee ? <p>Giá thay phụ kiện</p>:""}
                                        <p>Giá bán</p>
                                        <p>Số lượng</p>
                                        {data?.warrantyDuration !== 0 && <p>Bảo hành</p>}
                                        <p>Trạng thái giảm giá</p>
                                        <p>Phần trăm chiết khấu</p>
                                        {data?.discount && <p>Giá sau khuyến mãi</p>}
                                    </div>
                                    <div className='space-y-5 flex flex-col text-end'>
                                        <p>{data?.category?.categoryName}</p>
                                        {data?.installationFee ? <p>{formatPrice(data?.installationFee)} VNĐ</p>:""}
                                        <p>{formatPrice(data?.priceCurrent)}VNĐ</p>
                                        <p>{data && data?.quantity >0?data?.quantity:'Đã hết hàng'}</p>
                                        {data?.warrantyDuration !== 0 && (<p>{data?.warrantyDuration} tháng</p>)}
                                        <p>{data?.discount ? "Có" : "Không"}</p>
                                        <p>{data?.discount ? data?.discount.discountAmount : "0"}%</p>
                                        {data?.discount && <p>{formatPrice(data?.priceCurrent * (1 - data?.discount.discountAmount / 100))}VNĐ</p>}
                                    </div>
                                </div>
                                {data?.discount && (
                                    <div className="pt-5">
                                        <p className='font-semibold'>Đã áp dụng khuyến mãi</p>
                                        <div className='flex py-3 items-center'>
                                            <img src={data?.discount.imageUrl} alt="" className='w-7 h-7' />
                                            <p className='pl-3'>{data?.discount.title}</p>
                                        </div>
                                    </div>
                                )}

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
                    <FeedBackProduct data={data?.feedbackProducts} />
                </div>
                )
            }



        </div >
    )
}

export default ProductDetail