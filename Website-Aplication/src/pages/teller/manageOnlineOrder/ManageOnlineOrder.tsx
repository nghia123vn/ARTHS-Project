import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const linkRole = [
  {
    to: '/manage-order/online-order/list-order',
    name: "Các đơn đặt hàng chưa thanh toán"
  },
  {
    to: '/manage-order/online-order/list-order-paid',
    name: "Các đơn đặt hàng đã thanh toán"
  },
  {
    to: '/manage-order/online-order/list-order-confirm',
    name: "Danh sách đơn xác nhận"
  },
  {
    to: '/manage-order/online-order/list-order-transport',
    name: "Danh sách đơn đang giao"
  },
  {
    to: '/manage-order/online-order/list-order-finish',
    name: "Danh sách đơn hoàn thành"
  },
  {
    to: '/manage-order/online-order/list-order-canceled',
    name: "Danh sách đơn đã hủy"
  },

]



const ManageOnlineOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-order/online-order') {
      navigate('/manage-order/online-order/list-order');
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

export default ManageOnlineOrder