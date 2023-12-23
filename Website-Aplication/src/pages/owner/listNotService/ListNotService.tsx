import { getSortServices, updateStatusService } from '@/actions/service'
import LoadingPage from '@/components/LoadingPage'
import Pagination from '@/components/Pagination'
import SearchFilter from '@/components/SearchFilter'
import TableService from '@/components/owner/TableService'
import { dataService, itemService, selectorService } from '@/types/actions/listService'
import { typeService } from '@/types/typeService'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const ListNotService = () => {
    const dispatch = useDispatch();
    const serviceInfor: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
    const [productData, setProductData] = useState([] as itemService<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [sortValue, setSortValue] = useState<string>("");
    const [sortAsc, setSortAsc] = useState<boolean | undefined>();
    const [sortAscPrice, setSortAscPrice] = useState<boolean | undefined>();
    console.log("not ser",productData)
    useEffect(() => {
        const checkStatus = serviceInfor?.data?.every((item) => item?.status === typeService.Discontinued);
        if (checkStatus && serviceInfor) {
            setProductData(serviceInfor.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [serviceInfor]);
    useEffect(() => {
        if (serviceInfor.pagination?.totalRow) {
            setPaginationNumber(0);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [serviceInfor.pagination?.totalRow]);
    useEffect(() => {
        if (sortValue === 'name') {
            const data = {
                value: sortValue,
                sortByAsc: sortAsc,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Discontinued,
            }
            setSortAscPrice(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        } else if (sortValue === 'price') {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Discontinued,
            }
            setSortAsc(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        } else {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Discontinued,
            }
            setSortAsc(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        }



    }, [addSearch, dispatch, paginationNumber, sortAsc, sortAscPrice, sortValue])
    const handleRemove = (item: itemService<string, number>) => {
        const data = {
            value: sortValue,
            sortByAsc: sortValue === 'price' ? sortAscPrice : sortAsc,
            name: addSearch,
            pageNumber: paginationNumber,
            status: typeService.Discontinued,
        };
        if (item?.id) {
            const shouldDelete = window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ này: ${item.name} ?`);
            if (shouldDelete) {
                dispatch(updateStatusService(item?.id, typeService.Active, data));
                setIsLoading(true)
            }
        }


    }

    return (
        <div className="w-full">
            <div className="py-5">
                <SearchFilter place={'Tìm kiếm dịch vụ'} setAddSearch={setAddSearch} />
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (productData?.length > 0 ? (
                        <div>
                            <div className="min-h-[70vh]">
                                <TableService
                                    handleRemove={handleRemove}
                                    setSortValue={setSortValue}
                                    setSortAscPrice={setSortAscPrice}
                                    setSortAsc={setSortAsc}
                                    productData={productData}
                                />
                            </div>
                            <Pagination
                                totalPosts={serviceInfor.pagination?.totalRow}
                                postsPerPage={serviceInfor.pagination?.pageSize}
                                setCurrentPage={setPaginationNumber}
                                currentPage={paginationNumber}
                            />
                        </div>
                    ) : (
                        <div className='h-[70vh] flex justify-center items-center'>
                            <p className="text-[25px] font-semibold">Không tìm thấy dịch vụ</p>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default ListNotService