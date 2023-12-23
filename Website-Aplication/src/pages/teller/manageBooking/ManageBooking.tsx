import {Outlet} from 'react-router-dom';

const ManageBooking = () => {
  return (
      <div className='pt-5 w-full min-h-full'>
        <Outlet />
      </div>
  )
}

export default ManageBooking