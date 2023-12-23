import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-[700px] h-[400px] shadow-lg p-5 bg-white'>
        <div className='flex w-full'>
          <Link to='/' className='pl-5 '>
            <ArrowLeftIcon className='h-9 w-9 stroke-main' />
          </Link>
          <div className='w-full'>
            <h1 className='text-main text-center text-[30px] font-semibold'>Đặt lại mật khẩu</h1>
            <div className="px-[15%] pt-10">
              <div className="">
                <input type="text" placeholder="Số Điện thoại" className="h-[70px] w-full text-xl border-2 border-[#9D9D9D] rounded-[10px] px-2" />
              </div>
              <div className="w-full h-full flex justify-end py-3">
              </div>
              <button
                type="submit"
                className="h-[70px] w-full text-[24px] font-semibold bg-main text-white rounded-[10px] hover:border-4 hover:border-orange-600 hover:shadow-lg">
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword