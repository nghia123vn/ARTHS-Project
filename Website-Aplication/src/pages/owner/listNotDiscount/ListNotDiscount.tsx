import { getDiscount } from '@/actions/discount'
import LoadingPage from '@/components/LoadingPage'
import PaginationParam from '@/components/PaginationParam'
import SearchFilter from '@/components/SearchFilter'
import TableDiscount from '@/components/owner/TableDiscount'
import { dataDiscount, itemDiscount, selectorDiscount } from '@/types/actions/listDiscout'
import { StatusDiscount } from '@/types/typeDiscount'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ListDiscount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const discountInfor: dataDiscount<string, number> = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.notDiscountInfor);
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
      status: StatusDiscount.Discontinued,
    }
    dispatch(getDiscount(data));
    setIsLoading(true);

  }, [addSearch, dispatch, paginationNumber])
  const handleRemove = () => {
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-5">
        <SearchFilter
          place={'Tìm kiếm sản phẩm'} setAddSearch={setAddSearch}
        />
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