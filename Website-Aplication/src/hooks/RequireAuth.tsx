import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import SiderBar from "@/components/SiderBar";
import Header from "@/components/Header";
import useLogout from "./useLogout";
import Notification from "@/components/Notification";

type Props = {
  allowedRoles: string;
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const logout = useLogout();
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
  const location = useLocation();
  const handleLogout = () => {
    setShow(!show);
  }

  const handleNotification = ()=>{
    setShowNotification(!showNotification)
  }
  const signOut = async () => {
    await logout();
    navigate('/login');
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialAuth?.roles === allowedRoles
      ? (

        <div className='w-full min-h-screen flex bg-mainB'>
          <div className='bg-white w-[17%] min-h-full'>
            <SiderBar role={initialAuth?.roles} />
          </div>
          <div className='w-full px-5 '>
            <Header 
            handleLogout={handleLogout}
            handleNotification={handleNotification} 
            
            />
            <div className='w-full relative'>
              {showNotification&&(
                <Notification handleNotification={handleNotification} />
              )}

              {show &&
                <div className='absolute right-0 top-0 pr-[49px] pt-2'>
                  <button
                    className="bg-[#E5E5E5] w-[150px] h-[50px] rounded-[10px] hover:text-main"
                    onClick={signOut}>
                    Đăng xuất
                  </button>
                </div>}
              <div className="w-full min-h-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )
      : initialAuth?.accessToken
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth