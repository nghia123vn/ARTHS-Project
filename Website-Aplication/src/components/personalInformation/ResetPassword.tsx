import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePasswordProfile, resetError } from '@/actions/userInfor';
import LoadingCreateUpdate from '../LoadingCreateUpdate';
import { itemProfile, selectorProfile } from '@/types/actions/profile';
import { showSuccessAlert } from '@/constants/chooseToastify';
import useLogout from '@/hooks/useLogout';
type props = {
  isVisible: boolean;
  onClose: () => void;
  item: itemProfile<string>,
}
const ResetPassword = ({ isVisible, onClose, item }: props) => {
  const logout = useLogout();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [passwordAccount, setPasswordAccount] = useState<string>("")
  const [rePassAccount, setRePassAccount] = useState<string>("");
  const [errorPasswordAccount, setErrorPasswordAccount] = useState<string>("");
  const [errorLengthPassword, setErrorLengthPassword] = useState<string>("");
  const [showError, setShowError] = useState<string | null>(null)
  const dispatch = useDispatch();
  const errorItem: string | null = useSelector((state: selectorProfile<string>) => state.userReducer.showError);
  const checkPassword: boolean = useSelector((state: selectorProfile<string>) => state.userReducer.checkPassword);
  const handleResetPassword = () => {
    setIsLoading(true);
    const data = {
      oldPassword: currentPassword,
      newPassword: rePassAccount,
    }
    if (rePassAccount && passwordAccount && currentPassword) {
      dispatch(UpdatePasswordProfile(item.id, item.role, data));
    } else {
      setIsLoading(false)
      alert("Hãy nhập đầy đủ các mục");
    }
  }
  useEffect(() => {
    if (errorItem === null && checkPassword === true) {
      showSuccessAlert('Cập nhật thành công');
      logout();
      dispatch(resetError());
    } else {
      setShowError(errorItem);
      setIsLoading(false);
    }
  }, [checkPassword, dispatch, errorItem, logout])
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[50%] flex justify-center">
        <div className="w-full bg-white rounded-lg pb-3">
          <div className="bg-gray-600 py-2 rounded-t-lg">
            <div className="w-full flex flex-row justify-between py-[5px] text-white ">
              <p className="ml-2 mt-1 font-bold">
                Thay đổi mật khẩu
              </p>
            </div>
          </div>
          <div className="text-[#6B7280] space-y-7 py-5 px-[15%]">
            <div className="space-y-3">
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Mật khẩu cũ</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="password"
                value={currentPassword}
                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                placeholder='Nhập mật khẩu ....'
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </div>
            <div className="space-y-3">
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Mật khẩu mới</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="password"
                value={passwordAccount}
                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                placeholder='Nhập mật khẩu ....'
                onChange={(e) => {
                  setPasswordAccount(e.target.value);
                  if (e.target.value.length >= 8) {
                    setErrorLengthPassword('')
                  } else {
                    setErrorLengthPassword('Nhập ít nhất 8 ký tự')
                  }
                  if (e.target.value !== rePassAccount) {
                    setErrorPasswordAccount('Mật khẩu không trùng nhau, xin kiểm tra lại')
                  } else {
                    setErrorPasswordAccount('')
                  }
                }}
              />
              {errorLengthPassword ? <p className="text-red-800">{errorLengthPassword}</p> : ""}
              {errorPasswordAccount ? <p className="text-red-800">{errorPasswordAccount}</p> : ""}
            </div>
            <div className="space-y-3">
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Nhập lại mật khẩu</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="password"
                value={rePassAccount}
                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                placeholder='Nhập lại mật khẩu ....'
                onChange={(e) => {
                  setRePassAccount(e.target.value)
                  if (e.target.value !== passwordAccount) {
                    setErrorPasswordAccount('Mật khẩu không trùng nhau, xin kiểm tra lại')
                  } else {
                    setErrorPasswordAccount('')
                  }
                }}
              />
              {errorPasswordAccount ? <p className="text-red-800">{errorPasswordAccount}</p> : ""}
            </div>
          </div>
          {showError !== null ? <p className="text-red-800 text-center">{showError}</p> : ""}
          <div className="font-bold text-white flex flex-row-reverse justify-start space-x-5 space-x-reverse pt-[20px] px-[10px]">
            <button
              type='button'
              className={`
                        ${(errorPasswordAccount || errorLengthPassword) ? "" : "hover:bg-blue-700"}
                        bg-gray-400 px-5 h-[40px]  rounded-md`}
              disabled={(errorPasswordAccount || errorLengthPassword) ? true : false}
              onClick={() => handleResetPassword()}
            >
              Thay đổi mật khẩu
            </button>
            <button
              className=" bg-red-700 px-5 h-[40px]  rounded-md  "
              onClick={() => {
                dispatch(resetError());
                setCurrentPassword('');
                setPasswordAccount('');
                setRePassAccount('');
                setErrorPasswordAccount('')
                onClose();
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      {isLoading ? <LoadingCreateUpdate /> : ""}
    </div>
  );
};

export default ResetPassword;
