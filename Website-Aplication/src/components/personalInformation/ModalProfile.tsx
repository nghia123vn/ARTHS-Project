import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemProfile } from '@/types/actions/profile';
import { Option, Select } from '@material-tailwind/react';
import LoadingCreateUpdate from '../LoadingCreateUpdate';
import { UpdateProfile, resetError } from '@/actions/userInfor';
import { showSuccessAlert } from '@/constants/chooseToastify';

type props = {
  isVisible: boolean;
  onClose: () => void;
  item: itemProfile<string>,
}
enum genderCreate {
  Other = "",
  Male = "Nam",
  Female = "Nữ",
}

function ModalProfile({ isVisible, onClose, item }: props) {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setName(item.fullName);
    setGender(item.gender);
  }, [item.fullName, item.gender]);

  const handleAddGender = (e: string | undefined) => {
    if (e) {
      const selectedRole = e as genderCreate;
      setGender(selectedRole);
    }
  }
  const handleUpdateProfile = () => {
    setIsLoading(true);
    const data = {
        fullName: name,
        gender: gender,
    }
    if (name && gender !== genderCreate.Other) {
        dispatch(UpdateProfile(item.id,item.role,data));
        setIsLoading(false);
        showSuccessAlert('Cập nhật thành công')
        onClose();
    } else {
        setIsLoading(false)
        alert("Xin đừng bỏ trống");
    }
}
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[30%] flex justify-center">
        <div className="w-full bg-white rounded-lg pb-3">
          <div className="bg-gray-600 py-2 rounded-t-lg">
            <div className="w-full flex flex-row justify-between py-[5px] text-white ">
              <p className="ml-2 mt-1 font-bold">
                Cập nhật thông tin cá nhân
              </p>
            </div>
          </div>
          <div className="text-[#6B7280] space-y-7 py-5 px-[15%]">
            <div className="space-y-3">
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Họ và tên</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="text"
                value={name}
                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                placeholder='Nhập họ và tên ....'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-[80%] flex justify-between items-center'>
              <div className="flex space-x-3 items-center">
                <div className="flex space-x-1">
                  <p className='text-[18px] font-semibold'>Giới tính</p>
                  <p className="text-red-800">*</p>
                </div>
                <div className="w-[80px]">
                  <Select
                    className="text-[18px] h-[50px] bg-gray-50"
                    size="lg"
                    label="Lựa chọn giới tính"
                    onChange={handleAddGender}
                    value={gender}
                  >
                    <Option
                      value={genderCreate.Male}
                      className="text-[18px]"
                    >{genderCreate.Male}</Option>
                    <Option
                      value={genderCreate.Female}
                      className="text-[18px]"
                    >{genderCreate.Female}</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold text-white flex flex-row-reverse justify-start space-x-5 space-x-reverse pt-[20px] px-[10px]">
            <button
              type='button'
              className={`hover:bg-blue-700 bg-gray-400 px-5 h-[40px]  rounded-md`}
              onClick={() => handleUpdateProfile()}
            >
              Cập nhật
            </button>
            <button
              className=" bg-red-700 px-5 h-[40px]  rounded-md  "
              onClick={() => {
                dispatch(resetError());
                setName(item.fullName);
                setGender(item.gender);
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
}

export default ModalProfile;
