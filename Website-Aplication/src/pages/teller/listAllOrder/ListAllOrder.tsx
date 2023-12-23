import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
const linkRole = [
  {
    to: '/manage-order/list-all-order/list-order',
    name: "Danh sách đơn mới"
  },
  {
    to: '/manage-order/list-all-order/repair-order',
    name: "Danh sách đơn đang sửa"
  },
  {
    to: '/manage-order/list-all-order/wait-paid-order',
    name: "Danh sách đơn chờ thanh toán"
  },
  {
    to: '/manage-order/list-all-order/paid-order',
    name: "Danh sách đã thanh toán"
  },
  {
    to: '/manage-order/list-all-order/history-order',
    name: "Lịch sử đơn hàng"
  }

]

const ListAllOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-order/list-all-order') {
      navigate('/manage-order/list-all-order/list-order');
    }
  }, [location.pathname, navigate]);
  return (
    <div className="w-full min-h-full">
      <div className="flex space-x-4 font-bold">
        {linkRole.map((route, index) => (
          <NavLink key={index} to={route.to}
            className={({ isActive }) =>
              `flex items-center justify-center px-3 h-[45px] rounded-md text-white
              ${isActive
                ? "bg-main"
                : "bg-[#DEDEDE] hover:bg-main"}`
            
            }>
            {route.name}
          </NavLink>
        ))}
      </div>
      <div className='pt-5 w-full h-full'>
        <Outlet />
      </div>

    </div>
  )
}

export default ListAllOrder