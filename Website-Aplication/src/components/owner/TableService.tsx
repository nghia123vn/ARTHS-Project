import { formatDateSeven } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { itemService } from '@/types/actions/listService';
import { typeService } from '@/types/typeService';
type Props = {
    productData: itemService<string, number>[];
    setSortValue: React.Dispatch<React.SetStateAction<string>>;
    setSortAsc: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    setSortAscPrice: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    handleRemove: (item: itemService<string, number>) => void;
}
const TableService = ({ productData, setSortAsc, setSortValue, setSortAscPrice, handleRemove }: Props) => {
    const [showDivIndex, setShowDivIndex] = useState<number>(-1);
    const handleShowDiv = (index: number) => {
        if (showDivIndex === index) {
            setShowDivIndex(-1);
        } else {
            setShowDivIndex(index);
        }
    }
    const handleSort = () => {
        setSortValue("name");
        setSortAsc((prevSortAsc) => (prevSortAsc === undefined ? true : !prevSortAsc));
    };
    const handleSortPrice = () => {
        setSortValue("price");
        setSortAscPrice((prevSortAscPrice) => (prevSortAscPrice === undefined ? true : !prevSortAscPrice));
    };


    return (
        <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
            <thead>
                <tr className="text-xs uppercase tracking-wider bg-gray-600 text-white">
                    <th scope="col" >
                        <div className="flex items-center justify-center space-x-3 py-4">
                            <p>Tên dịch vụ</p>
                            <button
                                onClick={handleSort}
                            >
                                <ChevronDownIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </th>
                    <th scope="col" >
                        <div className="flex items-center justify-center space-x-3">
                            <p> Ngày tạo</p>

                        </div>
                    </th>
                    <th scope="col" >
                        <div className="flex items-center justify-center space-x-3">
                            <p> Tiền sau khi giảm - Tiền mặc định (VNĐ)</p>
                            <button
                                onClick={handleSortPrice}
                            >
                                <ChevronDownIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </th>
                    <th scope="col" >
                        <div className="flex items-center justify-center space-x-3">
                            <p>Trạng thái</p>

                        </div>
                    </th>
                    <th scope="col">
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[17px]">
                {productData && productData.map((item: itemService<string, number>, index: number) => (
                    <tr key={index}>
                        <td className="flex pl-3 items-center py-[10px] ">
                            <img src={item.images[0].imageUrl} alt="" className='w-8 h-8' />
                            <p className='pl-2'>{item.name}</p>
                        </td>
                        <td className="">
                            {formatDateSeven(item?.createAt.toString())}
                        </td>
                        <td className="">
                            {item?.discountAmount
                                ? <p>{formatPrice(item.price * (1 - item?.discountAmount / 100))} - {formatPrice(item.price)}</p>
                                : <p>{formatPrice(item.price)}</p>}


                        </td>
                        <td className="">
                            <div className="flex items-center justify-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${item.status === typeService.Active ? "bg-green-600" : "bg-red-600"} `}></div>
                                <p className={`${item.status === typeService.Active ? "text-green-600" : "text-red-600"}  text-[14px]`}> {item.status}</p>
                            </div>

                        </td>
                        <td className="pr-7 relative">
                            <button
                                onClick={() => handleShowDiv(index)}
                            >
                                <RxDotsHorizontal className='w-5 h-5 hover:text-main' />
                            </button>

                            {showDivIndex === index && (
                                <div className={`absolute z-10 flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-0 space-y-3 py-2 font-semibold text-[#667085]
                                                ${index === 11 ? 'top-[-120px]' : ''}`}>
                                    <Link to={`/manage-services/${item.id}`} className="hover:text-main">Chi tiết</Link>
                                    {item?.status === typeService.Active && (
                                        <Link to={`/manage-services/update-service/${item.id}`} className='flex items-center space-x-1 hover:text-main hover:stroke-main'>
                                            <PencilIcon className="w-5 h-5" />
                                            <p> Cập nhật</p>
                                        </Link>
                                    )}
                                    {item.status === typeService.Active ? (
                                        <button className='flex items-center space-x-1 hover:text-main hover:fill-main'
                                            onClick={() => {
                                                handleRemove(item)
                                                handleShowDiv(index)
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                            <p> Xóa</p>
                                        </button>
                                    ) : (
                                        <button className='flex items-center space-x-1 hover:text-main hover:fill-main'
                                            onClick={() => {
                                                handleRemove(item)
                                                handleShowDiv(index)
                                            }}
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                            <p> Khôi phục</p>
                                        </button>
                                    )}
                                </div>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableService