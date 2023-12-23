import { itemOnlineOrder } from "@/types/actions/listOnlineOrder"
import { NavLink } from "react-router-dom";


type Props = {
    data: itemOnlineOrder<string, number>[]
}
const TableOrderOnlineOrder = ({ data }: Props) => {
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                <thead>
                    <tr className="text-xs font-medium uppercase tracking-wider bg-yellow-400">
                        <th scope="col" className="px-6 py-2">Mã đơn hàng</th>
                        <th scope="col" >Tên khách hàng</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td className="">{item.id}</td>
                            <td className="px-6 py-3">{item?.customer.fullName}</td>
                            <td className="">{item?.customerPhoneNumber}</td>
                            <td className="">{item.paymentMethod}</td>
                            <td className="">{item.status}</td>
                            <td className="text-blue-700 hover:underline pr-7">
                                <NavLink to={`/manage-orders-owner/online/${item.id}`}>Chi tiết</NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableOrderOnlineOrder