import { itemAccount } from "@/types/actions/listAccount";
import { roleAccount, typeAccount } from "@/types/typeAuth";
import { formatDateSeven } from "@/utils/formatDate";
import { EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";


type Props = {
    data: itemAccount[];
    handleRemove: (item: itemAccount) => void;
}
const TableAccount = ({ data,handleRemove }: Props) => {
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                <thead>
                    <tr className="text-xs font-medium uppercase tracking-wider bg-[#EFF4FA]">
                        <th scope="col" className="px-6 py-3" >Tên tài khoản</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4">{item.fullName} </td>
                            <td className="">{item.phoneNumber} </td>
                            <td className="w-[200px]">
                                <p className={`p-1 text-white rounded-lg
                                    ${item.role === roleAccount.Admin ? "bg-main"
                                        : item.role === roleAccount.Owner ? "bg-[#FF6B00]"
                                            : item.role === roleAccount.Teller ? "bg-[#8F9BB3]"
                                                : item.role === roleAccount.Staff ? "bg-[#8F9BB3]" : "bg-[#0095FF]"}
                                    `}>
                                    {item.role === roleAccount.Admin ? "Quản trị viên"
                                        : item.role === roleAccount.Owner ? "Chủ cửa hàng"
                                            : item.role === roleAccount.Teller ? "Nhân viên giao dịch"
                                                : item.role === roleAccount.Staff ? "Nhân viên sửa chữa" : "Khách hàng"}</p>
                            </td>
                            <td className="">{formatDateSeven(item?.createAt.toString())}</td>
                            <td className="w-[150px]">
                                <p className={`p-1 text-white rounded-lg 
                                ${item.status === typeAccount.InActive ? "bg-[#FF000F]" : "bg-[#0095FF]"}`}>
                                    {item.status === typeAccount.InActive ? "Đang khóa" : "Đang hoạt động"}
                                </p>
                            </td>
                            <td className="text-gray-500 hover:text-red-600">
                                {item.status === typeAccount.Busy || item.role === roleAccount.Admin ? "" : (
                                    (
                                        <button
                                        onClick={()=>handleRemove(item)}
                                        >
                                            {item.status === typeAccount.Active ? <EyeSlashIcon className="w-7 h-5"/>
                                            :item.status === typeAccount.InActive?<EyeIcon className="w-7 h-5"/>:"" }
                                        </button>
                                    )
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableAccount