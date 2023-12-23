import { ShowTopProduct } from '@/actions/product'
import LoadingPage from '@/components/LoadingPage'
import SearchFilter from '@/components/SearchFilter'
import TableTopProductOwner from '@/components/owner/TableTopProductOwner'
import { itemTopProduct } from '@/types/actions/product'
import { selectorTopProduct } from '@/types/actions/topProduct'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ListTopProduct = () => {
    const dispatch = useDispatch();
    const productInfor: itemTopProduct<string, number>[] = useSelector((state: selectorTopProduct<string, number>) => state.topProductReducer.topProductInfor);
    console.log(productInfor)
    const [productData, setProductData] = useState<itemTopProduct<string, number>[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    useEffect(() => {
        dispatch(ShowTopProduct());
        setIsLoading(true);
    }, [dispatch]);

    useEffect(() => {
        if (productInfor) {
            setProductData(productInfor);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [productInfor]);


    useEffect(() => {
        setIsLoading(true);
        if (addSearch) {
            const filtered = productInfor.filter(item =>
                item.product.name.toLowerCase().includes(addSearch.toLowerCase())
            );
            setProductData(filtered);
            setIsLoading(false);
        } else {
            setProductData(productInfor);
            setIsLoading(false);
        }
    }, [addSearch, productInfor]);
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
                        <div className="min-h-[70vh]">
                            <TableTopProductOwner
                                productData={productData} />
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

export default ListTopProduct