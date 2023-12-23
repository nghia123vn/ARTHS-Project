import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {useEffect} from 'react'
const linkRole =[ 
  {
    to:'list-service',
    name:"Các dịch vụ đang hoạt động"
  },
  {
    to:'list-not-service',
    name:"Các dịch vụ ngừng hoạt động"
  },
]

const ManageService = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-services') {
      navigate('list-service');
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

export default ManageService