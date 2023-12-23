import { itemBooking, listBooking, selectorBooking } from "@/types/listBooking";
import { useEffect, useState } from "react";
import { getChooseBooking, putBooking } from "@/actions/booking";
import { useDispatch, useSelector } from "react-redux";
import { statusBooking } from "@/types/typeBooking";
import LoadingPage from "@/components/LoadingPage";
import { Link } from "react-router-dom";
import { format } from "date-fns-tz";
import { resetError } from "@/actions/userInfor";

const BookingDetailModal = ({ booking, onClose }: { booking: itemBooking<string, number> | null, onClose: () => void }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showBooked, setShowBooked] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState('');
    const [newDate, setNewDate] = useState<string>('');
    const [newTime, setNewTime] = useState<string>('');
    const bookingInfo: listBooking<string, number> = useSelector((state: selectorBooking<string, number>) => state.bookingReducer?.bookingInfo);
    const chooseBooking: listBooking<string, number> = useSelector((state: selectorBooking<string, number>) => state.bookingReducer?.chooseBooking);
    const checkError: string | null = useSelector((state: selectorBooking<string, number>) => state.bookingReducer?.showError);
    const [localBooking, setLocalBooking] = useState<itemBooking<string, number> | null>(booking);
    console.log(chooseBooking,newDate);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };


    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'newDate') {
            setNewDate(value);
        } else if (name === 'newTime') {
            setNewTime(value);
        }
    };

    const handleConfirmBooking = async () => {
        const updateData = {
            timeBook: newTime,
            dateBook: newDate,
            status: statusBooking.Confirmed
        }
        dispatch(putBooking(localBooking?.id, updateData));
        setShowBooked(false);
        setIsLoading(true);
    };

    const handleCancelBooking = async () => {
        console.log('lý do hủy', cancelReason);
        const updateData = {
            cancellationReason: cancelReason,
            status: statusBooking.Canceled
        }
        dispatch(putBooking(localBooking?.id, updateData));
        setShowCancelModal(false);
        setIsLoading(true);

    };

    const handleUpdateDateBook = async () => {
        console.log(newDate);
        console.log(newTime);
        const updateData = {
            timeBook: newTime,
            dateBook: newDate
        }
        dispatch(putBooking(localBooking?.id, updateData));
        setShowBooked(false);
        setIsLoading(true);
    };

    const handleConfirmCameBooking = async () => {
        const updateData = {
            status: statusBooking.Came
        }
        dispatch(putBooking(localBooking?.id, updateData))
        setIsLoading(true);

    }

    const formatPhoneNumber = (phoneNumber: number): string => {
        return phoneNumber.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };

    const formatDate = (date: Date | undefined): string => {
        if (date !== undefined) {
            return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        return "";
    };

    const checkTimeDisplay = (date: Date): string => {
        if (date.getHours() >= 8 && date.getHours() <= 15) {
            return date.toLocaleTimeString('vi-VN');
        } else {
            return 'Chờ cập nhật';
        }
    };

    const convertDateToInputFormat = (date: Date): string => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2); // Thêm số 0 ở đầu nếu là một chữ số
        const day = ("0" + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const convertTimeToInputFormat = (date: Date): string => {
        const d = new Date(date);
        const hours = ("0" + d.getHours()).slice(-2);
        const minutes = ("0" + d.getMinutes()).slice(-2);
        return `${hours}:${minutes}`;
    };
    useEffect(() => {
        if (checkError) {
            setIsLoading(false);
            dispatch(resetError());
        }
    }, [checkError, dispatch]);
    useEffect(() => {
        if (showBooked) {
            setShowEditForm(true);
        }
    }, [showBooked]);
    useEffect(() => {
        const filters = {
            bookingDate: newDate,
            bookingStatus: statusBooking.Confirmed,
        }
        if(newDate){
            dispatch(getChooseBooking(100, filters));
        }
    }, [dispatch, newDate])

    useEffect(() => {
        if (localBooking && localBooking.dateBook) {
            setNewDate(convertDateToInputFormat(localBooking.dateBook));
            setNewTime(convertTimeToInputFormat(localBooking.dateBook));
        }

    }, [localBooking?.dateBook]);

    useEffect(() => {
        if (localBooking && localBooking.id) {
            console.log('update lại time nè');
            const updatedBooking = bookingInfo.data.find(b => b.id === localBooking.id);
            if (updatedBooking) {
                setLocalBooking(updatedBooking)
                setShowEditForm(false);


            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [bookingInfo.data, localBooking]);


    const renderActionButton = () => {
        if (localBooking?.status === statusBooking.WaitForConfirm) {
            return <button className="bg-green-500 text-white px-10 py-4 rounded hover:bg-green-600" onClick={handleConfirmBooking}>Xác nhận</button>;
        } else if (localBooking?.status === statusBooking.Confirmed) {
            return <button className="bg-red-500 text-white px-10 py-4 rounded hover:bg-red-600" onClick={handleConfirmCameBooking}>Xác nhận đã đến</button>;
        }
        return null;
    };

    const renderCancelButton = () => {
        if (localBooking?.status === statusBooking.Came || localBooking?.status === statusBooking.Canceled) {
            return null;
        } else {
            return <button className="bg-gray-300 text-black px-10 py-4 rounded hover:bg-gray-400" onClick={() => setShowCancelModal(true)}>Huỷ lịch đặt</button>;
        }
    };

    const renderEditButton = () => {
        if (localBooking?.status === statusBooking.Came || localBooking?.status === statusBooking.Canceled) {
            return null;
        } else {
            return <button className="bg-indigo-500 text-white font-semibold px-2 py-2 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out transform hover:scale-105"
                onClick={() => {
                    toggleEditForm();
                    setShowBooked(!showBooked);
                }}
            >
                Chỉnh sửa
            </button>;
        }
    };

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
                <div className="flex flex-col space-y-4">
                    <span className={commonClasses}>
                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                        <span className="text-blue-600 font-bold">{statusBooking.Came}</span>
                    </span>
                    {!localBooking?.orderId ? (
                        <Link to={`/manage-order/create-order/${localBooking?.id}`}
                            className="text-[18px] font-semibold text-white bg-gray-500 p-2 rounded-lg shadow-md hover:bg-green-600"
                        >Tạo đơn hàng</Link>
                    ) : ""}
                </div>

            );
        }
    };

    if (!localBooking) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
            {isLoading ? <LoadingPage /> : (
                <div className="flex justify-center space-x-3">
                    <div className="bg-white w-full max-w-4xl p-8 rounded-lg flex space-x-8" onClick={stopPropagation}>
                        {/* Customer Information */}
                        <div className="flex-none w-2/5 space-y-6 rounded-lg p-4 shadow-lg">
                            <div className="flex flex-col items-center relative">
                                <div className="bg-orange-500 w-full h-32 rounded relative z-0"></div>
                                <img
                                    src={localBooking.customer.avatar ?? "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"}
                                    alt="Avatar customer"
                                    className="w-40 h-40 rounded-full border-4 border-white absolute top-1/2 transform -translate-y-1/2 z-10 object-cover"
                                />
                                <div className="border-b border-gray-300 w-full rounded-b">
                                    <h2 className="text-2xl font-bold text-center mt-24 pb-4">{localBooking.customer.fullName}</h2>
                                </div>
                            </div>
                            <div className="space-y-9 rounded-lg p-1 shadow-md">
                                <div className="flex items-start space-x-5 text-md">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full border-4 border-gray"></div>
                                    <div>
                                        <div className="font-semibold">Số điện thoại</div>
                                        <div>{formatPhoneNumber(localBooking.customer.phoneNumber)}</div>
                                    </div>
                                </div >
                                <div className="flex items-start space-x-5 text-md">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full border-4 border-gray"></div>
                                    <div>
                                        <div className="font-semibold">Giới tính</div>
                                        <div>{localBooking.customer.gender}</div>
                                    </div>
                                </div >
                                <div className="flex items-start space-x-5 text-md">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full border-4 border-gray"></div>
                                    <div className="w-[70%]">
                                        <div className="font-semibold">Địa chỉ</div>
                                        <div>{localBooking.customer.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description and Action Buttons */}
                        <div className="flex-grow flex flex-col justify-between space-y-2 pl-4">
                            <h2 className="text-3xl font-bold mb-2">Thông tin mô tả xe</h2>
                            <div className="border rounded-lg p-6 border-gray-400 w-full h-48 mt-2">
                                <p className="text-md">{localBooking.description}</p>

                            </div>

                            {/* Date and Time */}

                            <div className="py-2">

                                <div className="flex flex-col space-y-2 text-xl font-bold text-gray-700 ">
                                    <div className=" flex justify-between items-center">
                                        <div>
                                            <h2 className="">Ngày Đến: {formatDate(localBooking?.dateBook)}</h2>
                                            <h2 className="">Thời gian: {checkTimeDisplay(new Date(localBooking?.dateBook || ''))}</h2>
                                        </div>
                                        <div>
                                            {renderEditButton()}
                                        </div>
                                    </div>

                                    {localBooking?.staff ? (
                                        <div className="flex space-x-3 items-center">
                                            <p>Nhân viên sửa chữa:</p>

                                            <div className="flex space-x-3 items-center">
                                                <img src={localBooking?.staff.avatar ?? "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"} alt=""
                                                    className="w-11 h-11 rounded-full"
                                                />
                                                <p>{localBooking?.staff?.fullName}</p>
                                            </div>
                                        </div>
                                    ) : ''}

                                </div>

                            </div>
                            <div className=" mt-2 flex flex-col md:flex-row justify-between items-center">
                                <div className="flex flex-col pl-5 space-y-4">
                                    {renderStatus(localBooking.status)}
                                    {localBooking.status === statusBooking.Canceled ? (
                                        <div className="text-red-500 text-lg rounded-lg p-2 bg-red-100">
                                            {localBooking.cancellationReason}
                                        </div>
                                    ) : ""}
                                </div>
                            </div>
                            {/* Edit Form */}
                            <div className={`mt-4 h-24 transition-opacity duration-300 flex items-center space-x-4 ${showEditForm ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <input
                                    type="date"
                                    name="newDate"
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    value={newDate}
                                    onChange={handleInputChange}
                                    className="border-2 border-indigo-300 focus:border-indigo-500 rounded px-4 py-2 transition duration-200 ease-in-out transform focus:scale-105"
                                />

                                <input
                                    type="time"
                                    name="newTime"
                                    value={newTime}
                                    onChange={handleInputChange}
                                    className="border-2 border-indigo-300 focus:border-indigo-500 rounded px-4 py-2 transition duration-200 ease-in-out transform focus:scale-105"
                                />
                                {localBooking.status !== statusBooking.WaitForConfirm ?
                                    (<button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-105"
                                        onClick={handleUpdateDateBook}>Cập nhật</button>)
                                    : null}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end items-end mt-10">
                                <div className="flex space-x-8">
                                    {renderCancelButton()}
                                    {showCancelModal && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                                            <div className="bg-white rounded-lg p-8 w-full max-w-2xl"> {/* Chỉnh max-w-2xl để thay đổi độ rộng tối đa của modal */}
                                                <h2 className="text-2xl font-semibold">Nhập lý do hủy</h2>
                                                <textarea
                                                    placeholder="Enter your reason"
                                                    className="border-2 border-indigo-300 focus:border-indigo-500 rounded px-4 py-2 mt-4 w-full h-48 text-lg resize-none"
                                                    value={cancelReason}
                                                    onChange={(e) => setCancelReason(e.target.value)}
                                                    style={{ width: '100%' }} // Bạn cũng có thể sử dụng inline style
                                                ></textarea>
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 text-lg"
                                                        disabled={!cancelReason}
                                                        onClick={handleCancelBooking}
                                                    >
                                                        Xác nhận hủy
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 ml-4 text-lg"
                                                        onClick={() => setShowCancelModal(false)}
                                                    >
                                                        Đóng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {renderActionButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {showBooked ? (
                        <div className="bg-white p-2 space-y-9 rounded-lg">
                            <div>
                                <p className="text-main font-semibold text-[20px]">Danh sách đã đặt lịch ngày: {format(new Date(newDate), 'dd-MM-yyyy')}</p>
                            </div>
                            {chooseBooking?.data?.length > 0
                                ? (
                                    <div className="w-full h-[50vh] overflow-auto ">
                                        <div className="w-full h-[40px] flex items-center border-2 border-gray-400 bg-main text-white">
                                            <p className="border-r-2 border-gray-400 w-[40%] h-full flex justify-center items-center">Thời gian</p>
                                            <p className="w-[60%] h-full flex justify-center items-center">Nhân viên sửa chữa</p>
                                        </div>
                                            <div className="w-full h-full">
                                                {chooseBooking?.data?.map((item, index) => (
                                                    <div key={index} className="flex justify-center items-center border-x-2 border-b-2 border-gray-400 h-[50px] w-full">
                                                        <p className="w-[40%] h-full border-r-2 border-gray-400 flex justify-center items-center">{format(new Date(item.dateBook), 'HH:mm')}</p>
                                                        <p className="w-[60%] h-full flex justify-center items-center">{item.staff ? `${item?.staff?.fullName}` : "Chưa có"}</p>
                                                    </div>
                                                ))}
                                            </div>

                                    </div>
                                )
                                : (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <p className="text-[20px] font-semibold text-main">Chưa có lịch đặt</p>
                                    </div>
                                )}
                        </div>
                    ) : ""}

                </div>
            )}
        </div>


    );
}
export default BookingDetailModal;

