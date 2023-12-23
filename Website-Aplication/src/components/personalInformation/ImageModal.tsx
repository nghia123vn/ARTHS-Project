import { itemProfile, selectorProfile } from '@/types/actions/profile';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingCreateUpdate from '../LoadingCreateUpdate';
import { UpdateImageProfile, resetError } from '@/actions/userInfor';
import { showSuccessAlert } from '@/constants/chooseToastify';

type props = {
  isVisible: boolean;
  onClose: () => void;
  item: itemProfile<string>,
}
const ImageModal = ({ isVisible, onClose, item }: props) => {
  const [showImage, setShowImage] = useState<File | null>(null);
  const errorItem: string | null = useSelector((state: selectorProfile<string>) => state.userReducer.showError);
  const checkImage: boolean = useSelector((state: selectorProfile<string>) => state.userReducer.checkImage);
  const [showError, setShowError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (showImage !== null) {
      const data = {
        image: showImage,
      }
      dispatch(UpdateImageProfile(item.role, data));
    } else {
      setShowError('Hãy thêm ảnh vào');
      setIsLoading(false);
    }
  };
  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;

    if (selectedImage) {
      const allowedFormats = [".png", ".jpg", ".jpeg"];
      const fileExtension = selectedImage.name.slice(((selectedImage.name.lastIndexOf(".") - 1) >>> 0) + 2);

      if (allowedFormats.indexOf(`.${fileExtension.toLowerCase()}`) === -1) {
        alert("Chỉ chấp nhận các file có định dạng .png, .jpg, hoặc .jpeg");
        return;
      }

      // Thực hiện các xử lý khác nếu cần
      setShowImage(selectedImage);

      // Nếu muốn xem thông tin chi tiết về file, bạn có thể sử dụng console.log(selectedImage)
    }
  };
  useEffect(() => {
    if (errorItem === null && checkImage === true) {
      showSuccessAlert('Cập nhật thành công');
      setShowError('');
      onClose();
      dispatch(resetError());
      window.location.reload();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [checkImage, dispatch, errorItem, onClose])
  if (!isVisible) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[500px] flex flex-col ">
        <div className="bg-gray-600 rounded-t-lg">
          <div className="w-full flex flex-row justify-between py-[5px] text-white ">
            <p className="ml-2 mt-1 font-bold">Cập nhật ảnh</p>
          </div>
        </div>

        <div className="bg-white p-2 rounded-b-lg">
          <form
            onSubmit={(e) => {
              postData(e);
            }}
          >
            <div className="flex flex-col justify-center">
              <label htmlFor="fileInput" className="relative flex justify-center items-center cursor-pointer w-[140px] bg-[#DEDEFA] text-[#5C59E8] font-semibold py-2 rounded hover:bg-[#9b9ad7]">
                <span className="absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 cursor-pointer"></span>
                Thêm ảnh
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  handleAvatar(e);
                }}
              />
              {showImage !== null && (
                <div className="py-[10px] flex items-center justify-center ">
                  <img
                    src={URL.createObjectURL(showImage)}
                    alt=""
                    className="rounded-full w-[400px] h-[400px] border-4 border-gray-700"
                  />
                </div>
              )}
            </div>
            {showError !== '' ? <p className="text-red-800 text-center">{showError}</p> : ""}
            <div className="font-bold text-white flex flex-row-reverse py-2">
              <button
                type="submit"
                className="bg-blue-300 hover:bg-blue-800 p-2  rounded-md ml-3"
              >
                Cập nhật ảnh
              </button>
              <button
                className="bg-red-700 hover:bg-red-900 w-[80px] h-[40px]  rounded-md  "
                onClick={() => {
                  onClose();
                  setShowImage(null);
                  setShowError('');
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading ? <LoadingCreateUpdate /> : ""}
    </div>
  );
};

export default ImageModal;
