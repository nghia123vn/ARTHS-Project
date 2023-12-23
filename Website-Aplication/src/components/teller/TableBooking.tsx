import BookingDetailModal from "@/pages/teller/manageBooking/BookingDetailModal";
import { itemBooking } from "@/types/listBooking";
import { statusBooking } from "@/types/typeBooking";
import { useState } from "react";

type Props = {
  data: itemBooking<string, number>[] | null;
}

const TableBooking = ({ data }: Props) => {

  //popup
  const [showModal, setShowModal] = useState(false);
  console.log(showModal)
  const [selectedBooking, setSelectedBooking] = useState<itemBooking<string, number> | null>(null);

  const handleDetailClick = (booking: itemBooking<string, number>) => {
    setSelectedBooking(booking);
    setShowModal(true);
  }

  const formatPhoneNumber = (phoneNumber: number): string => {
    return phoneNumber.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const renderStatus = (status: string) => {
    const commonClasses = "flex items-center space-x-2 px-3 py-0.5 rounded-full shadow-md";
    if (status === statusBooking.WaitForConfirm) {
      return (
        <span className={commonClasses}>
          <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
          <span className="text-orange-500 font-bold">{statusBooking.WaitForConfirm}</span>
        </span>
      );
    } else if (status === statusBooking.Canceled) {
      return (
        <span className={commonClasses}>
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          <span className="text-red-500 font-bold">{statusBooking.Canceled}</span>
        </span>
      );
    } else if (status === statusBooking.Confirmed) {
      return (
        <span className={commonClasses}>
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          <span className="text-green-500 font-bold">{statusBooking.Confirmed}</span>
        </span>
      );
    } else if (status === statusBooking.Came) {
      return (
        <span className={commonClasses}>
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
          <span className="text-blue-600 font-bold">{statusBooking.Came}</span>
        </span>
      );
    }
  };

  return (

    <>
      <div className="pt-3">
        <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-sm font-medium uppercase tracking-wider bg-yellow-500 text-white text-center">
              <th scope="col" className="w-1/6 px-6 py-4 border-b border-gray-300">Tên khách hàng</th>
              <th scope="col" className="w-1/6 px-6 py-4 border-b border-gray-300">Số điện thoại</th>
              <th scope="col" className="w-1/6 px-6 py-4 border-b border-gray-300">Ngày đến</th>
              <th scope="col" className="w-1/6 px-6 py-4 border-b border-gray-300">Trạng thái</th>
              <th scope="col" className="w-1/3 px-6 py-4 border-b border-gray-300">Lý do hủy</th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {data && data?.map((item: itemBooking<string, number>, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all duration-200" onClick={() => handleDetailClick(item)}>
                <td className="px-6 py-4">{item.customer.fullName}</td>
                <td className="">{formatPhoneNumber(item.customer.phoneNumber)}</td>
                <td className="">{formatDate(item.dateBook)}</td>
                <td className="">{renderStatus(item.status)}</td>
                <td className="">{item.cancellationReason}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <BookingDetailModal booking={selectedBooking} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default TableBooking;