import { ShowProfile } from '@/actions/userInfor';
import ImageModal from '@/components/personalInformation/ImageModal';
import ModalProfile from '@/components/personalInformation/ModalProfile';
import ResetPassword from '@/components/personalInformation/ResetPassword';
import { itemProfile, selectorProfile } from '@/types/actions/profile';
import { Fragment, useEffect, useState } from 'react';
import { BiEdit, BiCamera, BiLock } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const title = [
  {
    detail: 'Họ và tên:',
  },
  {
    detail: 'Giới tính:',
  },
  {
    detail: 'Số điện thoại:',
  },
];

const PersonalInfor = () => {
  const dispatch = useDispatch();
  const profile: itemProfile<string> = useSelector((state: selectorProfile<string>) => state.userReducer.infor);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    dispatch(ShowProfile());
  }, [dispatch])
  return (
    <Fragment>
      <div className="flex items-center justify-center w-full pt-24">
        <div className="flex w-full justify-center">
          <div className="flex flex-col w-[20%] h-[60vh] bg-gray-400 border-r-4 border-white rounded-l-lg p-3">
            <div className=" flex items-center justify-center relative">
              <img
                src={profile?.avatar ? profile?.avatar : 'https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp'}
                alt="user"
                className="rounded-full w-[200px] h-[200px] border-4 border-white object-cover "
              />
              <button>
                <BiCamera
                  className="w-[30px] h-[30px] absolute bottom-[0] right-[30px] text-white hover:text-main"
                  onClick={() => {
                    setShowImage(true);
                  }}
                />
              </button>
            </div>

            <div className="flex flex-col items-center text-white px-2 py-2">
              <p className="font-bold text-[24px] mb-[10px]">
                {profile?.role === "Teller"?"Nhân viên thanh toán"
                :profile?.role === "Owner"?"Chủ cửa hàng"
                :profile?.role
                }
              </p>

              <p className="flex justify-center items-center bg-blue-800 w-[150px] h-[50px] rounded-xl font-semibold">
                {profile?.status}
              </p>
              <button>
                <BiEdit
                  className="w-[30px] h-[30px] mt-[10px] text-white hover:text-main"
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              </button>
            </div>
          </div>
          <div className=" bg-gray-400 w-[40%]  font-bold rounded-r-lg p-3 pl-10 pr-16">
            <div className="flex items-center w-full h-[7vh] border-b-[0.5px] border-y-main">
              <h1 className="text-[24px] ">Thông tin cá nhân</h1>
            </div>
            <div className="flex flex-row py-[10px]">
              <div className=" text-[20px]">
                {title.map((item, index) => {
                  return (
                    <div className="pt-[10px]" key={index}>
                      {item.detail}
                    </div>
                  );
                })}
              </div>
              <div className="px-[30px] text-[20px]">
                <p className="pt-[10px]">{profile?.fullName}</p>
                <p className="pt-[10px]"> {profile?.gender}</p>
                <p className="pt-[10px]"> {profile?.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center pt-[30px]">
              <button
                className="flex items-center text-[20px] px-2 py-1 border-solid border-[1px] border-gray-500 rounded-md bg-gray-300 hover:bg-main hover:text-white"
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                <BiLock className="mr-2" />
                Thay đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalProfile
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        item={profile}
      />
      <ImageModal
        isVisible={showImage}
        onClose={() => {
          setShowImage(false);
        }}
        item={profile}
      />
      <ResetPassword
        isVisible={showPassword}
        onClose={() => {
          setShowPassword(false);
        }}
        item={profile}
      />
    </Fragment>
  );
};

export default PersonalInfor;
