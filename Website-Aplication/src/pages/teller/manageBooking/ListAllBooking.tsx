import { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const linkRole = [
    {
        to: '/manage-booking/list/wait-for-confirm-booking',
        name: "Chờ xác nhận"
    },
    {
        to: '/manage-booking/list/history-booking',
        name: "Lịch sử đặt lịch"
    }

]
const ListAllBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/manage-booking/list') {
            navigate('/manage-booking/list/wait-for-confirm-booking');
        }
    }, [location.pathname, navigate]);

    return (
        <div className="w-full min-h-full">
            <div className="flex space-x-4 font-bold">
                {linkRole.map((route, index) => (
                    <NavLink key={index} to={route.to}
                        end={route.to === '/manage-booking/list-booking'}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-main text-white w-[200px] h-[45px] flex items-center justify-center rounded-md"
                                : "bg-[#DEDEDE] w-[200px] text-white h-[45px] flex items-center justify-center hover:bg-main hover:text-white rounded-md"
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

export default ListAllBooking;