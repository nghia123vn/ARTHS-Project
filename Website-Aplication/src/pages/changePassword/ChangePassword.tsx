// import React from 'react'
// import { ArrowLeftIcon } from '@heroicons/react/24/solid';
// import { Link } from 'react-router-dom';

const ChangePassword = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-[40%] shadow-lg px-5 py-[6%] bg-white'>
                <div className='flex w-full'>
                    <div className='w-full'>
                        <h1 className='text-main text-center text-[30px]'>Thay đổi mật khẩu</h1>
                        <div className='flex flex-row w-full justify-center'>
                            <p>Tạo mật khẩu mới cho</p>&nbsp;
                            <p className='text-main'> suaxemay@gmail.com</p>
                        </div>
                        <form
                            onSubmit={() => {
                                ""
                            }}
                        >

                            <div className="px-[15%] pt-10">
                                <div className="py-3">
                                    <input type="password" placeholder="Mật khẩu mới" className="h-[70px] w-full text-[22px] border-2 border-[#9D9D9D] rounded-[10px] px-2" />
                                </div>
                                <div className="py-3">
                                    <input type="password" placeholder="Nhập lại mật khẩu" className="h-[70px] w-full text-[22px] border-2 border-[#9D9D9D] rounded-[10px] px-2" />
                                </div>

                                <div className="w-full h-full flex justify-end py-3">
                                </div>
                                <button
                                    type="submit"
                                    className="h-[70px] w-full bg-main text-white text-[24px] rounded-[10px] hover:border-4 hover:border-orange-600 hover:shadow-lg">
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword