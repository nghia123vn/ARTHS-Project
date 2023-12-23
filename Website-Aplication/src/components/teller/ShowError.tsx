import { itemOnlineOrder } from "@/types/actions/listOnlineOrder";
import { formatDateFeedback } from "@/utils/formatDate";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
    onClose: () => void;
    isVisible: boolean;
    data:itemOnlineOrder<string, number>
}

const ShowError = ({ onClose, isVisible,data }: Props) => {

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-0 flex justify-center items-center">
            <div className="min-w-[500px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Thông tin hủy đơn
                        </p>
                        <button
                            onClick={onClose}
                        ><XMarkIcon className="w-7 h-7 hover:text-red-700" /></button>
                    </div>
                </div>
                <div className="p-3 space-y-5">
                <div className="flex space-x-3 items-center">
                    <p className="font-semibold">Thời gian:</p>
                    <p>{formatDateFeedback(data.cancellationDate.toString())}</p>
                </div>
                <div className="space-y-3">
                    <p className="font-semibold">Lý do hủy đơn:</p>
                    <div className="border-2 border-gray-400 rounded-lg p-3">
                    <p>{data.cancellationReason}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ShowError