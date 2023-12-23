import {Outlet} from 'react-router-dom';

const ManageOrder = () => {
  return (
      <div className='pt-5 w-full min-h-full'>
        <Outlet />
      </div>
  )
}

export default ManageOrder