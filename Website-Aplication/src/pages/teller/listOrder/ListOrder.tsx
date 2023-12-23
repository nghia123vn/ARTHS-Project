import SearchFilter from '@/components/SearchFilter'
import { useEffect, useState } from 'react'
import TableOrder from '@/components/teller/TableOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterOrderPaid, getOrderPaid } from '@/actions/order'
import { itemOrder, listOrder, selectorOrder } from '@/types/actions/listOrder'
import { statusOrder } from '@/types/typeOrder'
import LoadingPage from '@/components/LoadingPage'
import SelectFilterOrder from '@/components/SelectFilterOrder'
import PaginationParam from '@/components/PaginationParam'


const ListOrder = () => {
    const dispatch = useDispatch()
    const orderPaidInfor: listOrder<string, number> = useSelector((state: selectorOrder<string, number>) => state.orderReducer.orderPaidInfor);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orderData, setOrderData] = useState([] as itemOrder<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [addSearch, setAddSearch] = useState<string>("");
    const [chooseSelect, setChooseSelect] = useState<string>("name");

    useEffect(() => {
        if (orderPaidInfor.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [orderPaidInfor.pagination?.totalRow]);

    useEffect(() => {
        if (addSearch !== "") {
            if (chooseSelect === "name") {
                const data = {
                    customerName: addSearch,
                    customerPhone: "",
                    number: paginationNumber,
                    orderStatus: statusOrder.Processing,
                }
                dispatch(getFilterOrderPaid(data))
                setTimeout(() => {
                    setIsLoading(true);
                }, 200)
            } else if (chooseSelect === "sdt") {
                const data = {
                    customerName: "",
                    customerPhone: addSearch,
                    number: paginationNumber,
                    orderStatus: statusOrder.Processing,
                }
                dispatch(getFilterOrderPaid(data))
                setTimeout(() => {
                    setIsLoading(true);
                }, 200)
            }
        } else {
            dispatch(getOrderPaid(paginationNumber, statusOrder.Processing));
            setIsLoading(true);
        }

    }, [addSearch, chooseSelect, dispatch, paginationNumber])

    useEffect(() => {
        const isAnyPendingOrder = orderPaidInfor?.data?.every((item) => item.status === statusOrder.Processing);
        if (isAnyPendingOrder) {
            if (orderPaidInfor) {
                setOrderData(orderPaidInfor.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }

        }

    }, [orderPaidInfor]);

    return (
        <div className="w-full min-h-full">
            <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
            <div className="pt-2 flex space-x-1">
                <SelectFilterOrder setChooseSelect={setChooseSelect} setAddSearch={setAddSearch} />
                <SearchFilter place={'Tìm kiếm đơn hàng'} setAddSearch={setAddSearch} />
            </div>
            {isLoading
                ? <LoadingPage />
                : (
                    <div>
                        {/* Table */}
                        {orderData?.length > 0
                            ? (<div className={`${orderData?.length < 12 ? "h-[67vh]" : ""}`}>
                                <TableOrder data={orderData} />
                            </div>)
                            : (
                                <div className='flex justify-center items-center h-[67vh]'>
                                    <p className='font-semibold text-[30px]'>Không tìm thấy đơn hàng</p>
                                </div>
                            )}
                        <div className="pt-3">
                            <PaginationParam
                                totalPosts={orderPaidInfor.pagination?.totalRow}
                                postsPerPage={orderPaidInfor.pagination?.pageSize}
                                setCurrentPage={setPaginationNumber}
                                currentPage={paginationNumber}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListOrder