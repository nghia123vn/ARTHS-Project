import { inStoreOrderDetails } from '@/types/actions/detailOrder';
import { formatDateTime } from '@/utils/formatDate';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    itemOrder: inStoreOrderDetails<string, number> | undefined;
}

const ShowListWarranty = ({ onClose, isVisible, itemOrder }: Props) => {
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[1200px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg flex justify-between items-center pr-1">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            {itemOrder?.motobikeProduct
                                ? "Danh sách bảo hành của sản phẩm"
                                : itemOrder?.repairService
                                    ? "Danh sách bảo hành của dịch vụ" : ""}
                        </p>
                    </div>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-7 h-7 hover:text-red-800 text-white" />
                    </button>
                </div>
                <div className="overflow-y-auto  h-[24.5vh] ">
                    <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center ">
                        <thead>
                            <tr className="text-xs font-medium uppercase tracking-wider bg-yellow-400 text-center">
                                {itemOrder?.warrantyHistories?.every((item)=> item.handledByNavigation!==null)?(
                                    <th scope="col" className="py-3">
                                    Nhân viên thực hiện
                                </th>
                                ):""}
                                <th scope="col" className="py-3">
                                    Ngày tạo bảo hành
                                </th>
                                {itemOrder?.motobikeProduct
                                    ? (<th scope="col" className=" ">
                                        Số lượng sản phẩm
                                    </th>) : ""}
                                <th scope="col" className=" ">
                                    {itemOrder?.warrantyHistories?.every((item)=> item.handledByNavigation!==null)?"Chi tiết sửa chữa":"Chi tiết bảo hành"}
                                </th>
                                <th scope="col" className=" ">
                                    Trạng thái bảo hành
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                            {itemOrder?.warrantyHistories && itemOrder?.warrantyHistories?.map((item, index) => (
                                <tr key={index}>
                                    {item.handledByNavigation!==null?(
                                        <td className="py-3 text-center">
                                        <div className="flex items-center justify-center space-x-3">
                                            <img src={item?.handledByNavigation.avatar ??
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
                                                alt="" className="rounded-full w-auto h-12" />
                                            <p>{item?.handledByNavigation.fullName}</p>
                                        </div>
                                    </td>
                                    ):""}
                                    <td className="py-3">
                                        {formatDateTime(item.repairDate.toString())}
                                    </td>
                                    {itemOrder?.motobikeProduct
                                        ? (<td className="">
                                            {item?.productQuantity}
                                        </td>) : ""}

                                    <td className="">
                                        {item?.repairDetails!==""?item?.repairDetails:"Không có gì để ghi"}
                                    </td>
                                    <td className="text-green-700 font-semibold">
                                        {item.status}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowListWarranty