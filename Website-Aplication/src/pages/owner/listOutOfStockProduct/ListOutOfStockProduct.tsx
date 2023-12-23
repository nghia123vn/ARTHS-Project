import { SortProduct, updateStatusProduct } from '@/actions/product'
import LoadingPage from '@/components/LoadingPage'
import PaginationParam from '@/components/PaginationParam'
import SearchFilter from '@/components/SearchFilter'
import TableProductOwner from '@/components/owner/TableProductOwner'
import { item, itemProduct, selectorProduct } from '@/types/actions/product'
import { typeActiveProduct } from '@/types/typeProduct'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ListOutOfStockProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const [productData, setProductData] = useState<item<string, number>[]>([]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [sortValue, setSortValue] = useState<string>("");
    const [sortAsc, setSortAsc] = useState<boolean | undefined>();
    const [sortAscPrice, setSortAscPrice] = useState<boolean | undefined>();
    useEffect(() => {
        if (productInfor) {
            setProductData(productInfor.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [productInfor]);
    useEffect(() => {
        if (productInfor.pagination?.totalRow && addSearch) {
            setPaginationNumber(0);
            navigate('?page=1');
            setIsLoading(true)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [addSearch, navigate, productInfor.pagination?.totalRow]);
    useEffect(() => {
        if (sortValue === 'name') {
            const data = {
                value: sortValue,
                sortByAsc: sortAsc,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.OutOfStock,
            }
            setSortAscPrice(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        } else if (sortValue === 'price') {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.OutOfStock,
            }
            setSortAsc(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        } else {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.OutOfStock,
            }
            setSortAsc(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        }
    }, [addSearch, dispatch, paginationNumber, sortAsc, sortAscPrice, sortValue])
    const handleRemove = (item: item<string, number>) => {
        const data = {
            value: sortValue,
            sortByAsc: sortValue === 'price' ? sortAscPrice : sortAsc,
            name: addSearch,
            pageNumber: paginationNumber,
            status: typeActiveProduct.OutOfStock,
        };
        if (item) {
            const shouldDelete = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${item.name} ?`);
            if (shouldDelete) {
                dispatch(updateStatusProduct(item.id, typeActiveProduct.Discontinued, data));
                setIsLoading(true)
            }
        }


    }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center pb-5">
                <SearchFilter
                    place={'Tìm kiếm sản phẩm'} setAddSearch={setAddSearch}
                />
                <Link to={'/create-product'} className="p-3 bg-main hover:bg-[#d68669] text-white font-semibold rounded-lg flex space-x-3 items-center "
                >
                    <p>Tạo sản phẩm</p>
                    <PlusIcon className="w-7 h-7" />
                </Link>
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (productData?.length > 0 ? (
                        <div>
                            <div className="min-h-[70vh]">
                                <TableProductOwner
                                    handleRemove={handleRemove}
                                    setSortValue={setSortValue}
                                    setSortAscPrice={setSortAscPrice}
                                    setSortAsc={setSortAsc}
                                    productData={productData} />
                            </div>
                            <PaginationParam
                                totalPosts={productInfor.pagination?.totalRow}
                                postsPerPage={productInfor.pagination?.pageSize}
                                setCurrentPage={setPaginationNumber}
                                currentPage={paginationNumber}
                            />
                        </div>
                    ) : (
                        <div className='h-[70vh] flex justify-center items-center'>
                            <p className="text-[25px] font-semibold">Không tìm thấy sản phẩm</p>
                        </div>
                    )

                    )
                }
            </div>


        </div>
    )
}

export default ListOutOfStockProduct