import {formatDateTime } from '@/utils/formatDate';
import { PencilIcon, TrashIcon,
    //  TrashIcon 
    } from '@heroicons/react/24/solid';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { itemDiscount } from '@/types/actions/listDiscout';
import { StatusDiscount } from '@/types/typeDiscount';
type Props = {
    productData: itemDiscount<string, number>[];
    handleRemove: (item: itemDiscount<string, number>) => void;
}

const TableDiscount = ({ productData,handleRemove }: Props) => {
    const [showDivIndex, setShowDivIndex] = useState<number>(-1);

    const handleShowDiv = (index: number) => {
        if (showDivIndex === index) {
            setShowDivIndex(-1);
        } else {
            setShowDivIndex(index);
        }
    }

    return (
        <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
            <thead>
                <tr className="text-xs uppercase tracking-wider bg-gray-600 text-white text-center">
                    <th scope="col" className="">
                        <div className="flex items-center justify-center space-x-3 py-4">
                            <p>Tên khuyến mãi</p>
                        </div>
                    </th>
                    <th scope="col" className=" ">
                            <p> Khuyến mãi (%)</p>
                    </th>
                    <th scope="col" className="">
                        Ngày bắt đầu
                    </th>
                    <th scope="col" className=" ">
                    Ngày kết thúc
                    </th>
                    
                    {productData?.some((item) => item.status === StatusDiscount.Active) && (
                        <th scope="col" className=" ">
                            Trạng thái
                        </th>
                    )}

                    <th scope="col" className="">
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[17px]">
                {productData && productData.map((item: itemDiscount<string, number>, index: number) => (
                    <tr key={index}>
                        <td className="flex pl-3 items-center py-[10px] ">
                            <img src={item.imageUrl} alt="" className='w-8 h-8' />
                            <p className='pl-2'>{item.title}</p>
                        </td>

                        <td className="">
                            <p>{item?.discountAmount}</p>
                        </td>
                        <td className="">
                            {formatDateTime(item?.startDate.toString())}
                        </td>
                        <td className="">
                            {formatDateTime(item?.endDate.toString())}
                        </td>
                        
                        {productData?.every((item) => item.status === StatusDiscount.Active) && (
                            <td className="">
                                <div className="flex items-center justify-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${item.status === StatusDiscount.Active ? "bg-green-600" : "bg-red-600"} `}></div>
                                    <p className={`${item.status === StatusDiscount.Active ? "text-green-600" : "text-red-600"}  text-[14px]`}> {item.status === StatusDiscount.Active?"Đang hoạt động":"Ngừng hoạt động"}</p>
                                </div>

                            </td>
                        )}

                        <td className="pr-7">
                            <button
                                onClick={() => handleShowDiv(index)}
                            >
                                <RxDotsHorizontal className='w-5 h-5 hover:text-main' />
                            </button>

                            {showDivIndex === index && (
                                <div className="absolute flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-0 space-y-3 py-2 font-semibold text-[#667085]">
                                    <Link to={`/manage-discounts/${item.id}`} className="hover:text-main">Chi tiết</Link>
                                    {productData?.some((item) => item.status === StatusDiscount.Active) && (
                                        <Link to={`/manage-discounts/update-discount/${item.id}`} className='flex items-center space-x-1 hover:text-main hover:stroke-main'
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                            <p> Cập nhật</p>
                                        </Link>
                                    )}

                                    {item.status === StatusDiscount.Active ? (
                                        <button className='flex items-center space-x-1 hover:text-main hover:fill-main'
                                            onClick={() => {
                                                handleRemove(item)
                                                handleShowDiv(index)
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                            <p> Xóa</p>
                                        </button>
                                    ) :""}
                                </div>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableDiscount