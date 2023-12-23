import { getFilterNotAccount, updateStatusAccount } from '@/actions/userInfor';
import { typeAccount } from '@/types/typeAuth';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchFilterAccount from '../SearchFilterAccount';
import { dataAccount, itemAccount, selectorListFilterAccount } from '@/types/actions/listAccount';
import Pagination from '../Pagination';
import TableAccount from './TableAccount';
import LoadingPage from '../LoadingPage';
import ShowCreateAccount from './ShowCreateAccount';

const ListNotAccount = () => {
    const dispatch = useDispatch();
    const accountAllInfor: dataAccount<number> = useSelector((state: selectorListFilterAccount<string, number>) => state.filterAccountReducer.ListFilterNotAccount);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showCreate,setShowCreate] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productData, setProductData] = useState<itemAccount[]>([]);
    useEffect(() => {
        if (accountAllInfor) {
            setProductData(accountAllInfor.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [accountAllInfor]);
    useEffect(() => {
        if (accountAllInfor.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [accountAllInfor.pagination?.totalRow]);

    useEffect(() => {
        const data = {
            pageNumber: paginationNumber,
            status: typeAccount.InActive,
            fullName: addSearch,
        }
        dispatch(getFilterNotAccount(data));
        setIsLoading(true);
    }, [addSearch, dispatch, paginationNumber])

    const handleRemove = (item: itemAccount) => {
        const data = {
            pageNumber: paginationNumber,
            status: typeAccount.InActive,
            fullName: addSearch,
        }
        if (item) {
            const shouldDelete = window.confirm(`Bạn có chắc chắn muốn mở khóa tài khoản: ${item.fullName} ?`);
            if (shouldDelete) {
                dispatch(updateStatusAccount(item.id,item.role, typeAccount.Active, data));
                setIsLoading(true)
            }
        }
    }
    return (
        <div className="pt-3">
            <div className="flex justify-between items-center px-3">
                <SearchFilterAccount place={'Tìm kiếm số điện thoại'} setAddSearch={setAddSearch} />
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (
                        <div className='pt-2'>
                            {productData?.length > 0
                                ? (<div className={`h-[53vh]`}>
                                    <TableAccount 
                                    handleRemove={handleRemove}
                                    data={productData} />
                                </div>)
                                : (
                                    <div className='flex justify-center items-center h-[55vh]'>
                                        <p className='font-semibold text-[30px]'>Không tìm thấy tài khoản</p>
                                    </div>
                                )}
                            <div>
                                <Pagination
                                    totalPosts={accountAllInfor.pagination?.totalRow}
                                    postsPerPage={accountAllInfor.pagination?.pageSize}
                                    setCurrentPage={setPaginationNumber}
                                    currentPage={paginationNumber}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
            <ShowCreateAccount
            onClose={() => setShowCreate(false)}
            isVisible={showCreate}
            />
        </div>
    )
}

export default ListNotAccount