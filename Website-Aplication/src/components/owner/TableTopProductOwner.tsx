import {itemTopProduct } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatDateSeven } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { PencilIcon} from '@heroicons/react/24/solid';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react'
import { Link } from 'react-router-dom';
type Props = {
    productData: itemTopProduct<string, number>[];
}

const TableTopProductOwner = ({ productData }: Props) => {
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
                    <th scope="col" className="py-3 w-[30%]">
                        <div className="">
                            <p>Tên sản phẩm</p>
                        </div>
                    </th>
                    <th scope="col" className="">
                        Ngày tạo
                    </th>
                    <th scope="col" className=" ">
                        Loại sản phẩm
                    </th>
                    <th scope="col" className="">
                        Số lượng đã bán
                    </th>
                    <th scope="col" className=" ">
                        <div className="flex items-center justify-center space-x-3">
                            <p> Tiền sau khi giảm - Tiền mặc định (VNĐ)</p>
                        </div>
                    </th>
                        <th scope="col" className=" ">
                            Trạng thái
                        </th>
                    <th scope="col" className="">
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[17px]">
                {productData && productData.map((item: itemTopProduct<string, number>, index: number) => (
                    <tr key={index}>
                        <td className="flex pl-1 items-center py-[15px]">
                            <img src={item?.product.images[0].imageUrl} alt="" className='w-8 h-8' />
                            <p className='pl-3 text-start'>{item?.product.name}</p>
                        </td>
                        <td className="">
                            {formatDateSeven(item?.product?.createAt.toString())}
                        </td>
                        <td className="">
                            {item?.product?.category.categoryName}
                        </td>
                        <td className="">
                        {item?.totalQuantitySold}
                        </td>
                        <td className="">
                            {item?.product?.discount
                                ? <p>{formatPrice(item?.product.priceCurrent * (1 - item?.product?.discount.discountAmount / 100))} - {formatPrice(item?.product.priceCurrent)}</p>
                                : <p>{formatPrice(item?.product.priceCurrent)}</p>}


                        </td>
                        <td className="">
                            <div className="flex items-center justify-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${item?.product.status === typeActiveProduct.Active ? "bg-green-600"
                                    : item?.product.status === typeActiveProduct.OutOfStock ? "bg-orange-700" : "bg-red-600"} `}></div>
                                <p className={`${item?.product.status === typeActiveProduct.Active ? "text-green-600"
                                    : item?.product.status === typeActiveProduct.OutOfStock ? "text-orange-700" : "text-red-600"}  text-[14px]`}> {item?.product.status}</p>
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
                                ${index === productData?.length - 1 ? 'top-[-60px]' : ''}`}>
                                    <Link to={`/manage-products/${item?.product.id}`} className="hover:text-main">Chi tiết</Link>
                                    {productData?.some((item) => item?.product.status === typeActiveProduct.Active || item?.product.status === typeActiveProduct.OutOfStock) && (
                                        <Link to={`/manage-products/update-product/${item?.product.id}`} className='flex items-center space-x-1 hover:text-main hover:stroke-main'
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                            <p> Cập nhật</p>
                                        </Link>
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

export default TableTopProductOwner