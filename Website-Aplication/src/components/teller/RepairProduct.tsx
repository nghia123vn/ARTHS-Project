import { CategoryProduct, FilterProduct} from '@/actions/product';
import { showWarningAlert } from '@/constants/chooseToastify';
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr';
import { addProductOrder, addProductService, item, itemProduct, selectorProduct } from '@/types/actions/product';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import ListProduct from '@/pages/teller/listProduct/ListProduct';
import Loading from '../LoadingPage';
import UpdateProduct from '@/components/teller/UpdateProduct';
import { inStoreOrderDetails } from '@/types/actions/detailOrder';
import { typeActiveProduct } from '@/types/typeProduct';
import ChooseServiceOrder from './ChooseServiceOrder';
import { dataService, itemService, selectorService } from '@/types/actions/listService';
import { getFilterServices, getServices } from '@/actions/service';
import { typeService } from '@/types/typeService';
import ShowCreateDetail from './ShowCreateDetail';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    dataProduct?: inStoreOrderDetails<string, number>[];
    idOrder: string | null;
    staffId: string | null;
}
enum createShow {
    showProduct = "show_product",
    showService = "show_service",
}
const RepairProduct = ({ isVisible, onClose, dataProduct, idOrder, staffId }: Props) => {
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [itemDetail, setItemDetail] = useState<item<string, number>>();
    const [showCreate, setShowCreate] = useState<createShow>(createShow.showProduct);

    const tranfomDataProduct: addProductOrder<string, number>[] = (dataProduct ?? [])?.filter((item) => item?.motobikeProduct)?.map((item: inStoreOrderDetails<string, number>) => {
        const transformedItem: addProductOrder<string, number> = {
            idProduct: item?.motobikeProduct.id,
            nameProduct: item?.motobikeProduct.name,
            installationFee: item?.motobikeProduct.installationFee,
            priceProduct: item?.price,
            discountAmount: item.motobikeProduct?.discountAmount ?? 0,
            image: item.motobikeProduct.image,
            productQuantity: item?.quantity,
            instUsed: item.instUsed,
        };
        return transformedItem;
    });
    const tranfomDataService: addProductService<string, number>[] = (dataProduct ?? [])?.filter((item) => item?.repairService)?.map((item: inStoreOrderDetails<string, number>) => {
        const transformedItem: addProductService<string, number> = {
            id: item?.repairService.id,
            name: item?.repairService.name,
            price: item?.repairService.price,
            image: item?.repairService.image,
            discountAmount: item?.repairService.discountAmount,
        };
        return transformedItem;
    });
    useEffect(() => {
        if (tranfomDataProduct) {
            setAddProduct(tranfomDataProduct);
        }
        if (tranfomDataService) {
            setAddService(tranfomDataService)
        }
    }, [dataProduct])

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productData, setProductData] = useState([] as item<string, number>[]);

    const [addProduct, setAddProduct] = useState<addProductOrder<string, number>[]>([]);
    const [addService, setAddService] = useState<addProductService<string, number>[]>([]);
    const [addCategory, setAddCategory] = useState<string>("");
    const [addSearch, setAddSearch] = useState<string>("");
    const [addSearchService, setAddSearchService] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [paginationNumberService, setPaginationNumberService] = useState<number>(0);
    const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const dataService: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);

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
        if (dataService.pagination?.totalRow) {
            setPaginationNumberService(0);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [dataService.pagination?.totalRow, productInfor.pagination?.totalRow]);
    useEffect(() => {
        const data = {
            paginationNumber: paginationNumber,
            name: addSearch,
            category: addCategory,
            status: typeActiveProduct.Discontinued,
        }
        if (addCategory || addSearch) {
            setTimeout(() => {
                dispatch(FilterProduct(data))
                setIsLoading(true);
            }, 200)

        } else {
            const data = {
                category: "",
                name: "",
                status: typeActiveProduct.Discontinued,
                paginationNumber: paginationNumber
            }
            dispatch(FilterProduct(data));
            setIsLoading(true);
        }
    }, [dispatch, addCategory, addSearch, paginationNumber])
    useEffect(() => {
        if (showCreate === createShow.showService) {
            if (addSearchService !== "") {
                const data = {
                    paginationNumber: paginationNumberService,
                    name: addSearchService,
                    status: typeService.Active
                }
                setTimeout(() => {
                    dispatch(getFilterServices(data))
                    setIsLoading(true);
                }, 200)
            } else {
                const dataService = {
                    status: typeService.Active,
                    pageNumber: paginationNumberService,
                }
                dispatch(getServices(dataService));
                setIsLoading(true);
            }
        }
    }, [addSearchService, dispatch, paginationNumberService, showCreate])


    //thêm product
    const handleAddProduct = (data: item<string, number>) => {
        const newData: addProductOrder<string, number> = {
            idProduct: data.id,
            nameProduct: data.name,
            installationFee: data?.installationFee,
            priceProduct: data?.priceCurrent,
            discountAmount: data?.discount ? data.discount?.discountAmount : 0,
            image: data.images[0].imageUrl,
            productQuantity: 1,
            instUsed: false,
        }
        const itemToAdd = newData;
        const existingCartItems = addProduct || [];

        const isProductInCart = existingCartItems.some((item) => item.idProduct === itemToAdd.idProduct);
        if (isProductInCart) {
            showWarningAlert(`Sản phẩm đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddProduct(updatedItems);
        }
    }
    //thêm service
    const handleAddService = (dataService: itemService<string, number>) => {
        const newDataService: addProductService<string, number> = {
            id: dataService?.id,
            name: dataService?.name,
            price: dataService?.price,
            image: dataService?.images[0].imageUrl,
            discountAmount: dataService?.discountAmount,
        }
        const itemToAdd = newDataService;
        const existingCartItems = addService || [];
        const isServiceInCart = existingCartItems.some((item) => item.id === itemToAdd.id);
        if (isServiceInCart) {
            showWarningAlert(`Dịch vụ đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddService(updatedItems);
        }
    }

    //xóa product
    const handleRemoveProduct = (itemId: string) => {
        const updatedItems = addProduct.filter((item: addProductOrder<string, number>) => item.idProduct !== itemId);
        setAddProduct(updatedItems);
    }
    //xóa service
    const handleRemoveService = (itemId: string) => {
        const updatedItems = addService.filter((item: addProductService<string, number>) => item.id !== itemId);
        setAddService(updatedItems);
    }

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[80%] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">Cập nhật sản phẩm</p>
                    </div>
                </div>
                <div className='px-3 pt-5 flex'>
                    <div className="w-[55%] px-3">
                        <div className="flex space-x-4 font-bold pb-5">
                            <button
                                onClick={() => setShowCreate(createShow.showProduct)}
                                className={`flex items-center justify-center px-7 h-[45px] rounded-md text-white
                            ${showCreate === createShow.showProduct
                                        ? "bg-main"
                                        : "bg-[#DEDEDE] hover:bg-main"}`}
                            >
                                Chọn sản phẩm
                            </button>
                            <button
                                onClick={() => setShowCreate(createShow.showService)}
                                className={`flex items-center justify-center px-7 h-[45px] rounded-md text-white
                            ${showCreate === createShow.showService
                                        ? "bg-main"
                                        : "bg-[#DEDEDE] hover:bg-main"}`}
                            >
                                Chọn  dịch vụ
                            </button>
                        </div>
                        {showCreate === createShow.showProduct
                            ? (
                                <div className="w-full">
                                    <div className=" w-full flex justify-between space-x-5">
                                        <select className='cursor-pointer w-[220px] font-semibold rounded-lg text-center text-main focus:outline-none capitalize drop-shadow-xl'
                                            onChange={(e) => {
                                                setAddCategory(e.target.value)
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
                                        <form className="w-[70%]">
                                            <div className="w-full relative">
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm sản phẩm"
                                                    className="w-full py-3 pl-3 pr-4 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gray-20"
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
                                        <Loading />
                                    ) : productData?.length > 0 ? (
                                        <div className='flex flex-col pt-5 space-y-3'>
                                            <div className=' w-full flex flex-col space-y-3'>
                                                <ListProduct
                                                    setItemDetail={setItemDetail}
                                                    setShowDetail={setShowDetail}
                                                    onClickAdd={handleAddProduct}
                                                    data={productData} />
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
                            ) : (
                                <ChooseServiceOrder
                                    paginationNumber={paginationNumberService}
                                    setPaginationNumber={setPaginationNumberService}
                                    onClickAdd={handleAddService}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    dataService={dataService}
                                    setAddSearch={setAddSearchService} />
                            )}
                    </div>

                    <UpdateProduct
                        staffIdDetail={staffId}
                        idOrder={idOrder}
                        tranfomDataProduct={tranfomDataProduct}
                        tranfomDataService={tranfomDataService}
                        setAddProduct={setAddProduct}
                        setAddService={setAddService}
                        addProduct={addProduct}
                        addService={addService}
                        removeProduct={handleRemoveProduct}
                        removeService={handleRemoveService}
                        onClose={onClose}
                    />
                </div>

            </div>
            <ShowCreateDetail
                itemDetail={itemDetail}
                isVisible={showDetail}
                onClose={() => setShowDetail(false)}
            />
        </div>
    )
}

export default RepairProduct