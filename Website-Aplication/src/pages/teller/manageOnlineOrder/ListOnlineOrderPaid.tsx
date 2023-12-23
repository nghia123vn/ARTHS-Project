import { getOnlineOrder } from "@/actions/onlineOrder";
import LoadingPage from "@/components/LoadingPage";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import SelectFilterOrder from "@/components/SelectFilterOrder";
import TableOnlineOrder from "@/components/teller/TableOnlineOrder";
import { itemOnlineOrder, listOnlineOrder, selectorOnlineOrder } from "@/types/actions/listOnlineOrder";
import { statusOrder } from "@/types/typeOrder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListOnlineOrderPaid = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onlineOrderInfo: listOnlineOrder<string, number> = useSelector((state: selectorOnlineOrder<string, number>) => state.onlineOrderReducer.onlineOrderPaid);
    const [onlineOrderData, setOnlineOrderData] = useState<itemOnlineOrder<string, number>[]>([]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [addSearch, setAddSearch] = useState<string>("");
    const [chooseSelect, setChooseSelect] = useState<string>("name");

    useEffect(() => {
        if (onlineOrderInfo.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [onlineOrderInfo.pagination?.totalRow]);

    useEffect(() => {
        if (addSearch !== "") {
            if (chooseSelect === "name") {
                const data = {
                    customerName: addSearch,
                    customerPhone: "",
                    number: paginationNumber,
                    orderStatus: statusOrder.Paid,
                }
                dispatch(getOnlineOrder(data))
                setIsLoading(true);
            } else if (chooseSelect === "sdt") {
                const data = {
                    customerName: "",
                    customerPhone: addSearch,
                    number: paginationNumber,
                    orderStatus: statusOrder.Paid,
                }
                dispatch(getOnlineOrder(data))
                setIsLoading(true);
            }
        } else {
            const data = {
                customerName: "",
                customerPhone: "",
                number: paginationNumber,
                orderStatus: statusOrder.Paid,
            }
            dispatch(getOnlineOrder(data));
            setIsLoading(true);
        }
    }, [addSearch, chooseSelect, dispatch, paginationNumber])

    useEffect(() => {
        if (onlineOrderInfo) {
            setOnlineOrderData(onlineOrderInfo?.data)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500)

    }, [onlineOrderInfo])



    return (
        <div className="w-full min-h-full">
            <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
            <div className="py-3 flex space-x-1">
                <SelectFilterOrder setChooseSelect={setChooseSelect} setAddSearch={setAddSearch} />
                <SearchFilter place={'Tìm kiếm đơn hàng'} setAddSearch={setAddSearch} />
            </div>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div>
                    {onlineOrderData?.length > 0
                        ? (<div className={`${onlineOrderData?.length < 12 ? "h-[65vh]" : ""}`}>
                            <TableOnlineOrder data={onlineOrderData} />
                        </div>)
                        : (
                            <div className='flex justify-center items-center h-[67vh]'>
                                <p className='font-semibold text-[30px]'>Không tìm thấy đơn hàng</p>
                            </div>
                        )}

                    <div className="pt-3">
                        <Pagination
                            totalPosts={onlineOrderInfo.pagination?.totalRow}
                            postsPerPage={onlineOrderInfo.pagination?.pageSize}
                            setCurrentPage={setPaginationNumber}
                            currentPage={paginationNumber}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListOnlineOrderPaid

