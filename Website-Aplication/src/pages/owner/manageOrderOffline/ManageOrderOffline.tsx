import { useEffect } from 'react'
import {Outlet, useLocation, useNavigate } from 'react-router-dom'
// const linkRole = [
//     {
//         to: '/manage-orders-owner/offline-order/history-order',
//         name: "Lịch sử đơn hàng"
//     },

// ]

const ManageOrderOffline = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/manage-orders-owner/offline-order') {
            navigate('/manage-orders-owner/offline-order/history-order');
        }
    }, [location.pathname, navigate]);
    return (
        <div className="w-full min-h-full">
            {/* <div className="flex space-x-4 font-bold">
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
            </div> */}
            <div className='pt-5 w-full h-full'>
                <Outlet />
            </div>

        </div>
    )
}

export default ManageOrderOffline