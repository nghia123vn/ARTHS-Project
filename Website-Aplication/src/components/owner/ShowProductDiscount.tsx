import { useState, useEffect } from 'react'
import Pagination from '../Pagination';
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr';
import { useDispatch, useSelector } from 'react-redux';
import { typeActiveProduct } from '@/types/typeProduct';
import { item, itemProduct, selectorProduct } from '@/types/actions/product';
import { CategoryProduct, FilterProductDiscount } from '@/actions/product';
import LoadingPage from '../LoadingPage';
import { CheckCircleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    setDataProduct: React.Dispatch<React.SetStateAction<item<string, number>[]>>;
    dataProduct: item<string, number>[]
}

const ShowProductDiscount = ({ isVisible, onClose, setDataProduct, dataProduct }: Props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productData, setProductData] = useState([] as item<string, number>[]);

    const [addCategory, setAddCategory] = useState<string>("");
    const [addSearch, setAddSearch] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
    const [dataItem, setDataItem] = useState<item<string, number>[]>([]);
    console.log(dataItem)

    const handleMouseEnter = (index: number) => {
        setHoveredItemIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredItemIndex(null);
    };

    const handleClick = (item: item<string, number>) => {
        const isSelected = dataItem.includes(item);

        if (isSelected) {
            setDataItem(dataItem.filter((selected) => selected.id !== item?.id));
        } else {
            setDataItem([...dataItem, item]);
        }
    };

    const handleSelectAll = () => {
        const allItemIds = productInfor?.data?.map((item) => item) || [];

        setDataItem(allItemIds);
    };

    const handleDeselectAll = () => {
        setDataItem([]);
    };
    const handleAddProduct = () => {
        const uniqueItems = dataItem.filter((item) => (
            !dataProduct.some((productItem) => productItem.id === item.id)
        ));

        setDataProduct([...dataProduct, ...uniqueItems]);
    };
    useEffect(() => {
        dispatch(CategoryProduct());
    }, [dispatch])
    useEffect(() => {
        setProductData(productInfor.data);
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [productInfor?.data]);
    useEffect(() => {
        if (productInfor.pagination?.totalRow) {
            setPaginationNumber(0);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }

    }, [productInfor.pagination?.totalRow]);
    useEffect(() => {
        const data = {
            paginationNumber: paginationNumber,
            name: addSearch,
            category: addCategory,
            status: typeActiveProduct.Active,
            haveDiscount: false,
            discountId:undefined,
        }
        dispatch(FilterProductDiscount(data))
        setIsLoading(true);
    }, [addCategory, addSearch, dispatch, paginationNumber])
    useEffect(() => {
        if (dataProduct) {
            setDataItem(dataProduct)
        }
        setIsLoading(false);
    }, [dataProduct])

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[70%] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 p-2 rounded-t-lg flex justify-between items-center">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">Thêm sản phẩm cho khuyễn mãi.Hiện có:{dataProduct?.length} sản phẩm</p>
                    </div>
                    <button
                        onClick={onClose}
                    ><XMarkIcon className="w-7 h-7 hover:text-red-700" /></button>
                </div>
                <div className='px-3 pt-5'>
                    <div className="w-full px-3">
                        <div className="w-full">
                            <div className=" w-full flex justify-around">
                                <select className='cursor-pointer w-[220px] font-semibold rounded-lg text-center text-main focus:outline-none capitalize drop-shadow-xl'
                                    value={addCategory}
                                    onChange={(e) => {
                                        setAddCategory(e.target.value??"")
                                    }}
                                >
                                    <option value=' ' className='text-gray-700'>Danh mục</option>
                                    {categoryProduct
                                        ? categoryProduct.map((item, index) => (
                                            <option
                                                className='text-gray-700'
                                                key={index}
                                            >{item.categoryName}</option>
                                        ))
                                        : ""
                                    }
                                </select>
                                {/* search */}
                                <div className="w-[70%]">
                                    <div className="w-full relative">
                                        <input
                                            defaultValue={addSearch}
                                            type="text"
                                            placeholder="Tìm kiếm sản phẩm"
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
                                </div>
                            </div>

                            {/* danh sách sản phẩm*/}
                            {isLoading ? (
                                <LoadingPage />
                            ) : productData?.length > 0 ? (
                                <div className='w-full flex flex-col justify-center space-y-3'>
                                    <div className='flex justify-between px-[70px] text-white font-semibold py-3'>
                                        <div className='flex space-x-3'>
                                            <button className='bg-[#24E037] p-2 rounded-lg' onClick={handleSelectAll}>
                                                Chọn tất cả
                                            </button>
                                            <button className='bg-red-500 p-2 rounded-lg' onClick={handleDeselectAll}>
                                                Hủy chọn tất cả
                                            </button>
                                        </div>
                                        <button className='bg-main p-2 rounded-lg'
                                            onClick={handleAddProduct}
                                        >Thêm</button>
                                    </div>
                                    <div className='grid grid-cols-4 justify-items-center gap-2'>
                                        {productData && productData.map((item, index) => (
                                            <div key={index} className='relative shadow-lg pt-3 pb-1 w-[160px] space-y-3 flex flex-col items-center rounded-lg'
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleClick(item)}
                                            >
                                                <img src={item?.images[0]?.imageUrl} alt="" className='h-[90px] w-[100px] object-cover bg-white p-2 shadow-lg' />
                                                <p className='text-center'>{item?.name}</p>
                                                {(hoveredItemIndex === index || dataItem?.some(data => data.id === item.id)) && (
                                                    <button className='absolute bg-[#192038] bg-opacity-40 w-full h-[95%] top-0 rounded-lg flex justify-center items-end pb-5'
                                                    >
                                                        <CheckCircleIcon className='z-20 w-14 h-14 fill-white' />
                                                    </button>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                    <Pagination
                                        totalPosts={productInfor.pagination?.totalRow}
                                        postsPerPage={productInfor.pagination?.pageSize}
                                        setCurrentPage={setPaginationNumber}
                                        currentPage={paginationNumber}
                                    />
                                </div>
                            ) : (
                                <div className='w-full h-[60vh] flex justify-center items-center'>
                                    <p className='text-[20px]'>Không tìm thấy sản phẩm</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShowProductDiscount