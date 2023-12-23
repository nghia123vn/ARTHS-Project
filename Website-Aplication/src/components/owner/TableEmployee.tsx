import { NavLink } from 'react-router-dom'
import { formatDateSeven } from '@/utils/formatDate'
import { itemAccount } from '@/types/actions/listAccount'
import { roleAccount, typeAccount } from '@/types/typeAuth'
type Props = {
    data: itemAccount[]
}

const TableEmployee = ({ data }: Props) => {
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center ">
                <thead>
                    <tr className="text-xs font-medium uppercase tracking-wider bg-yellow-400 text-center">
                        <th scope="col" className="px-6 py-3">
                            Tên nhân viên
                        </th>
                        <th scope="col" className="">
                            Số điện thoại
                        </th>
                        <th scope="col" className=" ">
                            Ngày Tạo
                        </th>
                        <th scope="col" className=" ">
                            Trạng thái
                        </th>
                        <th scope="col" className="">
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {data && data.map((item: itemAccount, index) => (
                        <tr key={index}>
                            <td className="py-[12px] px-3">
                                <div className='flex space-x-3 items-center'>
                                    <img src={
                                        item.avatar
                                            ? item.avatar
                                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'
                                    } alt="" className='w-[60px] h-[60px] rounded-full object-cover' />
                                    <p>{item.fullName}</p>
                                </div>
                            </td>
                            <td className="">
                                {item.phoneNumber}
                            </td>
                            <td className="">
                                {formatDateSeven(item.createAt.toString())}
                            </td>
                            <td className="w-[150px]">
                                <p className={`p-1 text-white rounded-lg font-semibold
                                ${item.status === typeAccount.Busy ? "bg-[#FF000F]" : "bg-[#04ff00]"}`}>
                                    {item.status}
                                </p>

                            </td>
                            <td className="text-blue-700 hover:underline pr-7">
                                <NavLink to={item.role===roleAccount.Teller?`/manage-employees/teller/${item.id}`:`/manage-employees/${item.id}`}>Chi tiết</NavLink>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableEmployee