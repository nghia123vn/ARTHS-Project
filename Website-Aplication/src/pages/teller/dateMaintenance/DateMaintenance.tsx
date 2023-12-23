import { getShowMaintenance } from '@/actions/dateMaintenance';
import LoadingPage from '@/components/LoadingPage';
import Pagination from '@/components/Pagination';
// import SearchFilter from '@/components/SearchFilter';
import TableMaintenance from '@/components/teller/TableMaintenance';
import { showErrorAlert, showSuccessAlert } from '@/constants/chooseToastify';
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { dataMaintenance, itemMaintenance, selectorMaintenance } from '@/types/actions/listMaintenance';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const DateMaintenance = () => {
    const dispatch = useDispatch();
    const maintenanceInfor: dataMaintenance<string, number> = useSelector((state: selectorMaintenance<string, number>) => state.maintenanceReducer.maintenanceInfor);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [addSearch, setAddSearch] = useState<string>("");
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productData, setProductData] = useState<itemMaintenance<string>[]>([]);
    console.log("first", productData)
    useEffect(() => {
        if (maintenanceInfor) {
            setProductData(maintenanceInfor.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [maintenanceInfor]);
    useEffect(() => {
        if (maintenanceInfor.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [maintenanceInfor.pagination?.totalRow]);

    useEffect(() => {
        const data = {
            pageNumber: paginationNumber,
            fullName: '',
        }
        dispatch(getShowMaintenance(data));
        setIsLoading(true);
    }, [dispatch, paginationNumber]);
    const handlePost = async (maintenanceId: string) => {
        setIsLoading(true);
        if (maintenanceId) {
            const axiosPrivate = userAxiosPrivate();
            try {
                const response = await axiosPrivate.post(`/maintanance-schedules?maintenanceSheduleId=${maintenanceId}`)
                if (response.status === 200) {
                    const data = {
                        pageNumber: paginationNumber,
                        fullName: '',
                    }
                    dispatch(getShowMaintenance(data));
                    showSuccessAlert('Gửi thành công');
                }
            } catch (error) {
                console.log(error);
                showErrorAlert('Gửi thất bại');
            }
        }
    }
    return (
        <div className="pt-3">
            <p className='text-[30px] font-semibold text-main py-5'>Danh sách các khách hàng có lịch bảo dưỡng</p>
            {/* <div className="flex justify-between items-center">
                <SearchFilter place={'Tên khách hàng'} setAddSearch={setAddSearch}/>
            </div> */}
            <div className="pt-7">
                {isLoading
                    ? <LoadingPage />
                    : (
                        <div className='pt-2'>
                            {productData?.length > 0
                                ? (<div className={`h-[53vh]`}>
                                    <TableMaintenance
                                        data={productData}
                                        handlePost={handlePost}
                                    />
                                </div>)
                                : (
                                    <div className='flex justify-center items-center h-[55vh]'>
                                        <p className='font-semibold text-[30px]'>Không tìm thấy tài khoản</p>
                                    </div>
                                )}
                            <div>
                                <Pagination
                                    totalPosts={maintenanceInfor.pagination?.totalRow}
                                    postsPerPage={maintenanceInfor.pagination?.pageSize}
                                    setCurrentPage={setPaginationNumber}
                                    currentPage={paginationNumber}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DateMaintenance