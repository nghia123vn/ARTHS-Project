import { getEmployee } from '@/actions/employee'
import LoadingPage from '@/components/LoadingPage'
import PaginationParam from '@/components/PaginationParam'
import SearchFilter from '@/components/SearchFilter'
import TableEmployee from '@/components/owner/TableEmployee'
import { itemAccount } from '@/types/actions/listAccount'
import { selectorListEmployee } from '@/types/actions/listEmployee'
import { roleAccount, typeAccount } from '@/types/typeAuth'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ListTeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tellerInfor: itemAccount[] = useSelector((state: selectorListEmployee) => state.listEmployeeReducer.employeeTellerInfor);
    const [productData, setProductData] = useState<itemAccount[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage =productData.length>7?7:productData.length;
    const lastPostIndex= (currentPage +1) * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.length>7?productData.slice(firstPostIndex,lastPostIndex):productData;
    console.log("eee",currentPosts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    useEffect(() => {
        if (tellerInfor) {
            setProductData(tellerInfor);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [tellerInfor]);
    useEffect(() => {
        if (tellerInfor.length && addSearch) {
            setCurrentPage(0);
            navigate('?page=1');
            setIsLoading(true)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [addSearch, navigate, tellerInfor.length]);
    useEffect(() => {
        const data = {
            fullName:addSearch,
            status: typeAccount.InActive,
        }
        dispatch(getEmployee(roleAccount.Teller,data));
        setIsLoading(true);

    }, [addSearch, dispatch, currentPage])
    // const handleRemove = (item: itemDiscount<string, number>) => {
    //   const data = {
    //     title: addSearch,
    //     pageNumber: paginationNumber,
    //     status: StatusDiscount.Active,
    //   };
    //   if (item) {
    //     const shouldDelete = window.confirm(`Bạn có chắc chắn muốn xóa khuyến mãi này: ${item.title} ?`);
    //     if (shouldDelete) {
    //       dispatch(updateStatusDiscount(item.id, StatusDiscount.Discontinued, data));
    //       setIsLoading(true)
    //     }
    //   }
    // }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center pb-5">
                <SearchFilter
                    place={'Tìm kiếm tên nhân viên'} setAddSearch={setAddSearch}
                />
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (productData?.length > 0 ? (
                        <div>
                            <div className="min-h-[70vh]">
                                <TableEmployee
                                    // handleRemove={handleRemove}
                                    data={currentPosts} />
                            </div>
                            <PaginationParam
                                totalPosts={productData.length}
                                postsPerPage={postsPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div>
                    ) : (
                        <div className='h-[70vh] flex justify-center items-center'>
                            <p className="text-[25px] font-semibold">Không tìm thấy nhân viên</p>
                        </div>
                    )

                    )
                }
            </div>


        </div>
    )
}

export default ListTeller