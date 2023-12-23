import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {useEffect} from 'react'
const linkRole =[ 
  {
    to:'list-product',
    name:"Các sản phẩm đang hoạt động"
  },
  {
    to:'list-top-product',
    name:"Top sản phẩm bán chạy"
  },
  {
    to:'list-out-of-stock-product',
    name:"Các sản phẩm hết hàng"
  },
  {
    to:'list-not-product',
    name:"Các sản phẩm ngừng kinh doanh"
  },
]

const ManageProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-products') {
      navigate('list-product');
    }
  }, [location.pathname, navigate]);
  return (
    <div className="w-full min-h-full">
      <div className="flex space-x-4 font-bold pt-1">
        {linkRole.map((route,index)=>(
          <NavLink key={index} to={route.to} 
          end={route.to ==='/manage-order/list-order'}
          className={({isActive})=>
            isActive
            ?"bg-main text-white px-3 h-[45px] flex items-center justify-center rounded-md"
            :"bg-[#DEDEDE] px-3 text-white h-[45px] flex items-center justify-center hover:bg-main hover:text-white rounded-md"
          }>
          {route.name}
        </NavLink>
        ))}
      </div>
      <div className='pt-5 w-full h-full'>
        <Outlet/>
      </div>

    </div>
  )
}

export default ManageProduct