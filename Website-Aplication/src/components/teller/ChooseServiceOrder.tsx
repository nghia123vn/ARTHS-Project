import LoadingPage from '@/components/LoadingPage';
import Pagination from '@/components/Pagination';
import { dataService, itemService } from '@/types/actions/listService';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import ListService from '@/pages/teller/listService/ListService';
import ShowCreateServiceDetail from './ShowCreateServiceDetail';

type Props = {
    dataService: dataService<string, number>,
    setAddSearch: React.Dispatch<React.SetStateAction<string>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    onClickAdd: (data: itemService<string, number>) => void,
    paginationNumber: number,
    setPaginationNumber: React.Dispatch<React.SetStateAction<number>>
}

const ChooseServiceOrder = ({ dataService, setAddSearch, isLoading, setIsLoading, onClickAdd, setPaginationNumber, paginationNumber }: Props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [itemDetail, setItemDetail] = useState<itemService<string, number>>();
    const [serviceData, setServiceData] = useState([] as itemService<string, number>[]);
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    useEffect(() => {
        setServiceData(dataService.data);
        setIsLoading(false);
    }, [dataService.data, setIsLoading]);

    return (
        <div className="w-full">
            <div className=" w-full flex justify-between space-x-5">
                {/* search */}
                <form className="w-[70%]">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm dịch vụ"
                            className="w-full py-3 pl-3 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gray-20"
                            onChange={(e) => {
                                if (searchTimeout) {
                                    clearTimeout(searchTimeout);
                                }
                                const newTimeSearch = window.setTimeout(() => {
                                    setAddSearch(e.target.value);
                                }, 800);

                                // Cập nhật trạng thái searchTimeout
                                setSearchTimeout(newTimeSearch);
                            }}

                        />
                        <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-0 bottom-0 my-auto stroke-gray-500" />
                    </div>
                </form>
            </div>

            {/* danh sách sản phẩm*/}
            {isLoading ? (
                <LoadingPage />
            ) : dataService?.data?.length > 0 ? (
                <div className='flex flex-col space-y-3 pt-5'>
                    <div className=' w-full flex flex-col space-y-3'>
                        <ListService
                            setItemDetail={setItemDetail}
                            setShowDetail={setShowDetail}
                            onClickAdd={onClickAdd}
                            data={serviceData} />
                    </div>
                    <Pagination
                        totalPosts={dataService.pagination?.totalRow}
                        postsPerPage={dataService.pagination?.pageSize}
                        setCurrentPage={setPaginationNumber}
                        currentPage={paginationNumber}
                    />
                </div>
            ) : (
                <div className='w-full h-[60vh] flex justify-center items-center'>
                    <p className='text-[20px]'>Không tìm thấy dịch vụ</p>
                </div>
            )}
            <ShowCreateServiceDetail
                itemDetail={itemDetail}
                isVisible={showDetail}
                onClose={() => setShowDetail(false)}
            />
        </div>
    )
}

export default ChooseServiceOrder