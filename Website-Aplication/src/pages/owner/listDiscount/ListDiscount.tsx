import { getDiscount, updateStatusDiscount, 
  // updateStatusDiscount 
} from '@/actions/discount'
import LoadingPage from '@/components/LoadingPage'
import PaginationParam from '@/components/PaginationParam'
import SearchFilter from '@/components/SearchFilter'
import TableDiscount from '@/components/owner/TableDiscount'
import { dataDiscount, itemDiscount, selectorDiscount } from '@/types/actions/listDiscout'
import { StatusDiscount } from '@/types/typeDiscount'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ListDiscount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const discountInfor: dataDiscount<string, number> = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.discountInfor);
  const [productData, setProductData] = useState<itemDiscount<string, number>[]>([]);
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addSearch, setAddSearch] = useState<string>("");
  useEffect(() => {
    if (discountInfor) {
      setProductData(discountInfor.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [discountInfor]);
  useEffect(() => {
    if (discountInfor.pagination?.totalRow && addSearch) {
      setPaginationNumber(0);
      navigate('?page=1');
      setIsLoading(true)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [addSearch, navigate, discountInfor.pagination?.totalRow]);
  useEffect(() => {
    const data = {
      title: addSearch,
      pageNumber: paginationNumber,
      status: StatusDiscount.Active,
    }
    dispatch(getDiscount(data));
    setIsLoading(true);

  }, [addSearch, dispatch, paginationNumber])
  const handleRemove = (item: itemDiscount<string, number>) => {
    const data = {
      title: addSearch,
      pageNumber: paginationNumber,
      status: StatusDiscount.Active,
    };
    if (item) {
      const shouldDelete = window.confirm(`Bạn có chắc chắn muốn xóa khuyến mãi này: ${item.title} ?`);
      if (shouldDelete) {
        dispatch(updateStatusDiscount(item.id, data));
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
        <Link to={'/create-discount'} className="p-3 bg-main hover:bg-[#d68669] text-white font-semibold rounded-lg flex space-x-3 items-center "
        >
          <p>Tạo khuyến mãi</p>
          <PlusIcon className="w-7 h-7" />
        </Link>
      </div>
      <div className="">
        {isLoading
          ? <LoadingPage />
          : (productData?.length > 0 ? (
            <div>
              <div className="min-h-[70vh]">
                <TableDiscount
                  handleRemove={handleRemove}
                  productData={productData} />
              </div>
              <PaginationParam
                totalPosts={discountInfor.pagination?.totalRow}
                postsPerPage={discountInfor.pagination?.pageSize}
                setCurrentPage={setPaginationNumber}
                currentPage={paginationNumber}
              />
            </div>
          ) : (
            <div className='h-[70vh] flex justify-center items-center'>
              <p className="text-[25px] font-semibold">Không tìm thấy khuyến mãi</p>
            </div>
          )

          )
        }
      </div>


    </div>
  )
}

export default ListDiscount