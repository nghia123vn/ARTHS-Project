// import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { itemOrder } from '@/types/actions/listOrder'
import { NavLink } from 'react-router-dom'
import { formatDateSeven } from '@/utils/formatDate'
type Props = {
    data: itemOrder<string, number>[]
}

const TableOrderOwner = ({ data }: Props) => {
    const formatPrice = (price: number) => {
        const formattedPrice = (price / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 });

        return formattedPrice.replace(",", ".");
    }
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center ">
                <thead>
                    <tr className="text-xs font-medium uppercase tracking-wider bg-yellow-400 text-center">
                        <th scope="col" className="px-6 py-3">
                            Mã đơn
                        </th>
                        <th scope="col" className="">
                            Tên khách hàng
                        </th>
                        <th scope="col" className=" ">
                            Ngày Tạo
                        </th>
                        <th scope="col" className=" ">
                            Số điện thoại
                        </th>

                        {/* <th scope="col" className=" ">
                            Loại đơn
                        </th> */}
                        <th scope="col" className=" ">
                            Tổng tiền (VND)
                        </th>
                        <th scope="col" className=" ">
                            Trạng thái đơn hàng
                        </th>
                        <th scope="col" className="">
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {data && data.map((item: itemOrder<string, number>, index) => (
                        <tr key={index}>
                            <td className="py-[12px] px-3">
                                {item.id}
                            </td>
                            <td className="">
                                {item.customerName}
                            </td>
                            <td className="">
                                {formatDateSeven(item.orderDate.toString())}
                            </td>
                            <td className="">
                                {item.customerPhoneNumber}
                            </td>
                            {/* <td className="">
                                {item.orderType}
                            </td> */}
                            <td className="">
                                {formatPrice(item.totalAmount)}
                            </td>
                            <td className="">
                                {item.status}
                            </td>
                            <td className="text-blue-700 hover:underline pr-7">
                                <NavLink to={`/manage-orders-owner/${item.id}`}>Chi tiết</NavLink>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableOrderOwner