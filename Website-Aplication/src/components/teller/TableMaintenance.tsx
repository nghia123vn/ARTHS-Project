import { itemMaintenance } from "@/types/actions/listMaintenance";
import { formatDateSeven } from "@/utils/formatDate";


type Props = {
    data: itemMaintenance<string>[];
    handlePost:(maintenanceId:string)=>void;
}
const TableMaintenance = ({ data,handlePost }: Props) => {
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                <thead>
                    <tr className="text-xs font-medium uppercase tracking-wider bg-[#e6eb65]">
                        <th scope="col" className="px-6 py-3" >Tên khách hàng</th>
                        <th scope="col" className="" >Số điện thoại</th>
                        <th scope="col" className="" >Dịch vụ</th>
                        <th scope="col">Ngày bảo trì sắp tới</th>
                        <th scope="col">Ngày gửi thông báo bảo trì</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4">
                                <div className='flex space-x-3 items-center'>
                                    <img src={
                                        item.customer.avatar
                                            ? item.customer.avatar
                                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'
                                    } alt="" className='w-[60px] h-[60px] rounded-full object-cover' />
                                    <p>{item.customer.fullName}</p>
                                </div>
                            </td>
                            <td className="">{item?.customer.phoneNumber}</td>
                            <td className="">{item?.orderDetail?.repairService?.name}</td>
                            <td className="">{formatDateSeven(item?.nextMaintenanceDate.toString())}</td>
                            <td className="">{formatDateSeven(item?.reminderDate.toString())}</td>
                            <td className="w-[150px] px-2">
                                <div className={`p-1 text-white rounded-lg 
                                ${item.remiderSend ? "bg-[#0095FF]" : "bg-[#FF000F] hover:bg-main"}`}>
                                    {item.remiderSend ? "Đã gửi" 
                                    :(<button
                                    onClick={()=>handlePost(item?.id)}
                                    >
                                    Chưa gửi
                                    </button>)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableMaintenance