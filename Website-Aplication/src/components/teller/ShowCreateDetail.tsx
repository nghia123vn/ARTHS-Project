import { item } from '@/types/actions/product';
import { formatPrice } from '@/utils/formatPrice';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    itemDetail: item<string, number> | undefined;
}

const ShowCreateDetail = ({ onClose, isVisible, itemDetail }: Props) => {
    const [data, setData] = useState<item<string, number>>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [showVehicle, setShowVehicle] = useState<boolean>(false);
    const handleChangeImage = (index: number) => {
        setSelectedImage(index);
    }
    const handleBoxVehicle = () => {
        setShowVehicle(!showVehicle);
    }

    useEffect(() => {
        if (itemDetail) {
            setData(itemDetail);
        }
    }, [itemDetail])
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[1000px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg flex justify-between items-center pr-1">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Chi tiết sản phẩm
                        </p>
                    </div>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-7 h-7 hover:text-red-800 text-white" />
                    </button>
                </div>
                <div className="overflow-y-auto h-[50vh] px-3 ">
                    <div className="flex justify-between py-5 border-b-4 border-[#858585]">
                        <div className="w-[50%] bg-white flex flex-col justify-center items-center rounded-lg pt-3">
                            {data?.images && (
                                <div className='bg-white shadow-lg p-2 rounded-lg'>
                                    <img
                                        src={data?.images[selectedImage]?.imageUrl}
                                        alt=""
                                        className='h-[250px] object-contain'
                                    />
                                </div>
                            )}
                            <div className='py-5'>
                                <div className='flex justify-center'>
                                    <div className={`flex gap-x-3`}>
                                        {data?.images && data?.images.map((item, index) => (
                                            <div key={index} className={`p-2  rounded-lg flex justify-center cursor-pointer  items-center border-4 ${index === selectedImage ? ' border-blue-400' : 'border-gray-100'} `}>
                                                <img
                                                    src={item?.imageUrl}
                                                    alt=""
                                                    className={`h-[100px] object-contain`}
                                                    onMouseEnter={() => handleChangeImage(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <div className="bg-white p-5 text-[17px] rounded-lg">
                                <div className='flex justify-between items-start'>
                                    <p className='font-semibold text-[20px] px-1'>{data?.name}</p>
                                </div>
                                <div className=' py-3 space-y-3'>
                                    <div className='space-y-3'>
                                        <p className='font-semibold'>Giá sản phẩm:</p>
                                        <div className='flex items-center space-x-3 text-[20px]'>
                                            <p className={`${data?.discount ? "line-through text-gray-400 text-[17px]" : "text-main"}`}>{formatPrice(data?.priceCurrent)}VNĐ</p>
                                            {data?.discount && <p className='text-main'>{formatPrice(data?.priceCurrent * (1 - data?.discount.discountAmount / 100))}VNĐ</p>}
                                        </div>
                                    </div>
                                    <div className='flex space-x-3 items-center'>
                                        {data?.installationFee ? <p className="font-semibold">Giá thay phụ kiện:</p> : ""}
                                        {data?.installationFee ? <p className='text-main text-[20px]'>{formatPrice(data?.installationFee)} VNĐ</p> : ""}
                                    </div>
                                    {data?.warrantyDuration ? (
                                        <div className='flex space-x-3 items-center'>
                                            <p className='font-semibold'>Thời gian bảo hành:</p>
                                            <p>{data?.warrantyDuration} tháng</p>
                                        </div>
                                    ):""}
                                </div>
                                <div className='text-[#6B7280] flex justify-between items-center pb-5'>
                                    <p className='font-semibold text-black'>Loại xe phù hợp:</p>
                                    <div className='flex justify-end space-x-3 relative'>
                                        {data?.vehicles && data?.vehicles.slice(0, 3).map((vehicle, index) => (
                                            <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                                <p>{vehicle.vehicleName}</p>

                                            </div>
                                        ))}
                                        {data?.vehicles && data?.vehicles.length > 3 && (
                                            <button className='p-1 border-2 border-gray-200 rounded-lg hover:text-main'
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
                            </div>
                        </div>
                    </div>
                    <div className=' flex justify-center items-center pb-5'>
                        {data?.description && (
                            <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                                <p className='font-semibold text-[20px]'>Mô tả sản phẩm:</p>
                                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCreateDetail