import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import { formatPrice } from '@/utils/formatPrice';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Description from '@/components/Description';
import { getDetailDiscount, updateDiscount } from '@/actions/discount';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detaiDiscount, motorbikeDiscount, repairDiscount, selectorDetailDiscount } from '@/types/actions/detailDiscount';
import ShowProductUpdateDiscount from '@/components/owner/ShowProductUpdateDiscount';
import ShowServiceUpdateDiscount from '@/components/owner/ShowServiceUpdateDiscount';
import LoadingCreateUpdate from '@/components/LoadingCreateUpdate';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
const UpdateDiscount = () => {
  const dispatch = useDispatch();
  const { discountId } = useParams();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const detailDiscountInfor: detaiDiscount<string, number> = useSelector((state: selectorDetailDiscount<string, number>) => state.detailDiscountReducer.detailDiscountInfor)
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [errorDate, setErrorDate] = useState<string>('');
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const [showService, setShowService] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<motorbikeDiscount<string, number>[]>([]);
  const [dataService, setDataService] = useState<repairDiscount<string, number>[]>([]);
  const formattedStartDate: string | null = startDate
    ? format(utcToZonedTime(startDate, 'Asia/Ho_Chi_Minh'), "yyyy-MM-dd'T'00:00:00.000'Z'")
    : null;

  const formattedEndDate: string | null = endDate
    ? format(utcToZonedTime(endDate, 'Asia/Ho_Chi_Minh'), "yyyy-MM-dd'T'00:00:00.000'Z'")
    : null;
  console.log("first", formattedStartDate)
  console.log("second", formattedEndDate)
  const [nameDiscount, setNameDiscount] = useState<string>('');
  const [numberDiscount, setNumberDiscount] = useState<number>(1);
  // const formattedStartDate: string | null = startDate
  //   ? new Date(startDate.setUTCHours(0, 0, 0, 0) + 7 * 60 * 60 * 1000).toISOString()
  //   : null;

  // const formattedEndDate: string | null = endDate
  //   ? new Date(endDate.setUTCHours(0, 0, 0, 0) + 7 * 60 * 60 * 1000).toISOString()
  //   : null;
  const [images, setImages] = useState<File | null>(null);
  const [imagesUrl, setImagesUrl] = useState<string>("");
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');

  // console.log("format", formattedStartDate, formattedEndDate)
  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      // if (date < new Date()) {
      setStartDate(new Date());
      // } else {
      //   setErrorDate('');
      //   setStartDate(date);
      if (endDate && date >= endDate) {
        setEndDate(null);
      }
    }
    // }
  };

  const handleEndDateChange = (date: Date | null) => {
    const newDate = format(utcToZonedTime(new Date(), 'Asia/Ho_Chi_Minh'), "yyyy-MM-dd'T'00:00:00.000'Z'")
    if (date && startDate && date > startDate && date > new Date(newDate) ) {
      setEndDate(date);
      setErrorDate('');
    } else {
      setEndDate(null);
      setErrorDate('Thời gian kết thúc lớn hơn thời gian bắt đầu và phải lớn hơn thời gian hiện tại')
    }
  };

  const handleClick = (item: motorbikeDiscount<string, number>) => {
    const isSelected = dataProduct.includes(item);

    if (isSelected) {
      setDataProduct(dataProduct.filter((selected) => selected.id !== item?.id));
    }
  };
  const handleClickService = (item: repairDiscount<string, number>) => {
    const isSelected = dataService.includes(item);

    if (isSelected) {
      setDataService(dataService.filter((selected) => selected.id !== item?.id));
    }
  };
  const handleDescription = (value: string) => {
    setDescriptionProduct(value);
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    setImages(selectedImage);
  }

  const handleCreateDiscount = () => {
    if (detailDiscountInfor.id) {
      setShowLoading(true);
      const data = {
        title: nameDiscount,
        discountAmount: numberDiscount,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        image: images,
        description: descriptionProduct,
        motobikeProductId: dataProduct?.map((item) => item.id),
        repairServiceId: dataService?.map((item) => item.id),
      }
      console.log(data)
      if (nameDiscount && numberDiscount > 0 && formattedStartDate && formattedEndDate && descriptionProduct &&
        (dataProduct.length > 0 || dataService.length > 0) || images) {
        dispatch(updateDiscount(detailDiscountInfor?.id, data));
      } else {
        alert('Hãy nhập đầy đủ các mục');
        setShowLoading(false);
      }
    }

  }

  useEffect(() => {
    if (discountId) {
      dispatch(getDetailDiscount(discountId));
    }
  }, [dispatch, discountId]);

  useEffect(() => {
    if (discountId === detailDiscountInfor?.id) {
      setNameDiscount(detailDiscountInfor?.title);
      setNumberDiscount(detailDiscountInfor?.discountAmount);
      setStartDate(new Date(detailDiscountInfor?.startDate));
      setEndDate(new Date(detailDiscountInfor?.endDate));
      if (new Date(detailDiscountInfor?.endDate) < new Date()) {
        setErrorDate('Ngày kết thúc hiện tại đã nhỏ hơn ngày hiện tại, hãy cập nhật lại.');
      }
      setImagesUrl(detailDiscountInfor?.imageUrl);
      setDataProduct(detailDiscountInfor?.motobikeProducts);
      setDataService(detailDiscountInfor?.repairService);
      setDescriptionProduct(detailDiscountInfor?.description);
    }
  }, [detailDiscountInfor?.description, detailDiscountInfor?.discountAmount, detailDiscountInfor?.endDate, detailDiscountInfor?.id, detailDiscountInfor?.imageUrl, detailDiscountInfor?.motobikeProducts, detailDiscountInfor?.repairService, detailDiscountInfor?.startDate, detailDiscountInfor?.title, discountId])


  return (
    <div className="w-full h-full pt-3">
      <p className="text-main text-[25px] font-semibold">Cập nhật khuyến mãi</p>
      <div className="w-full flex justify-center p-3 ">
        <div className="bg-white w-[95%] p-5 ">
          <p className="text-[20px] font-semibold pb-5">Thông tin chung</p>
          <div className="text-[#6B7280] space-y-7">
            <div className="space-y-3">
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Tên khuyến mãi</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="text"
                value={nameDiscount}
                className="w-[80%] h-[50px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black text-[18px] focus:bg-white px-2"
                placeholder='Nhập tên khuyến mãi ....'
                onChange={(e) => setNameDiscount(e.target.value)}
              />
            </div>

            <div className='flex space-x-3 items-center'>
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Phần trăm khuyến mãi (%)</p>
                <p className="text-red-800">*</p>
              </div>

              <input type="number"
                value={numberDiscount}
                max={100} min={1}
                onChange={(e) => {
                  if (0 < parseInt(e.target.value) && parseInt(e.target.value) <= 100) {
                    setNumberDiscount(parseInt(e.target.value))
                  } else {
                    if (parseInt(e.target.value) < 0) {
                      setNumberDiscount(1)
                    }
                    if (parseInt(e.target.value) > 100) {
                      setNumberDiscount(100)
                    }
                  }
                }}
                className='outline-none w-[100px] h-[35px] text-center border-2 border-[#E5E7EB] rounded-lg'
              />
            </div>

            <div className='flex space-x-3 items-center'>
              <div className="flex space-x-1">
                <p className='text-[18px] font-semibold'>Ngày bắt đầu - Ngày kết thúc</p>
                <p className="text-red-800">*</p>
              </div>

              <DatePicker
                // showTimeSelect
                className='py-2 text-center border-2 border-gray-400 rounded-lg'
                selected={startDate}
                minDate={new Date()}
                maxDate={new Date()}
                onChange={handleStartDateChange}
                locale={vi}
                // dateFormat='HH:mm | dd-MM-yyyy'
                dateFormat='dd-MM-yyyy'
                selectsStart
                endDate={endDate}
                startDate={startDate}
                popperClassName="w-[200px]"
              />
              <p>-</p>
              <DatePicker
                // showTimeSelect
                className='py-2 text-center border-2 border-gray-400 rounded-lg'
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                locale={vi}
                dateFormat='dd-MM-yyyy'
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                popperClassName="w-[200px]"
              />
            </div>
            {errorDate && <p className='text-red-600'>{errorDate}</p>}
            <div className='space-y-7'>
              <div className='flex space-x-3'>
                <button
                  className='bg-blue-gray-400 hover:bg-main text-white font-semibold px-5 py-3 rounded-lg'
                  onClick={() => {
                    setShowProduct(true);
                  }}
                >
                  Thêm sản phẩm</button>
                <button
                  className='bg-blue-gray-400 hover:bg-main text-white font-semibold px-5 py-3 rounded-lg'
                  onClick={() => setShowService(true)}
                >
                  Thêm dịch vụ</button>
              </div>
              <div className='flex flex-col items-center space-y-5'>
                {dataProduct?.length > 0 ? (
                  <div className='w-[80%] border-2 border-[#4A85F6] p-3'>
                    <p className='font-semibold'>Danh sách sản phẩm khuyến mãi:</p>
                    <div className='pt-5'>
                      <div>
                        <div className='flex font-semibold uppercase text-center'>
                          <p className='w-[5%] '>STT</p>
                          <p className='w-[45%]'>Tên sản phẩm</p>
                          <p className='w-[45%]'>Giá áp dụng sau khuyến mãi (VNĐ)</p>
                          <p className='w-[5%]'></p>
                        </div>
                        <div className='overflow-y-auto h-[20vh] space-y-3'>
                          {dataProduct?.map((item, index) => (
                            <div key={index} className="flex text-center items-center">
                              <p className='w-[5%]'>{index + 1}</p>
                              <div className='w-[45%] flex items-center space-x-3 pl-1'>
                                <img src={item?.imageUrl} alt="" className='w-[50px] h-[50px] object-cover' />
                                <p className=''>{item?.name}</p>
                              </div>
                              <p className='w-[45%]'>{formatPrice(item?.priceCurrent * (1 - numberDiscount / 100))} - {formatPrice(item?.priceCurrent)}</p>
                              <p className='w-[5%]'>
                                <button
                                  onClick={() => handleClick(item)}
                                >
                                  <XMarkIcon className="w-9 h-9 hover:text-red-600" />
                                </button>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : ""}
                {dataService?.length > 0 ? (
                  <div className='w-[80%] border-2 border-[#4A85F6] p-3'>
                    <p className='font-semibold'>Danh sách dịch vụ khuyến mãi:</p>
                    <div className='pt-5'>
                      <div>
                        <div className='flex font-semibold uppercase text-center'>
                          <p className='w-1/6 '>STT</p>
                          <p className='w-3/6'>Tên dịch vụ</p>
                          <p className='w-2/6'>Giá áp dụng sau khuyến mãi (VNĐ)</p>
                          <p className='w-1/6'></p>
                        </div>
                        <div className='overflow-y-auto h-[20vh] space-y-3'>
                          {dataService?.map((item, index) => (
                            <div key={index} className="flex text-center items-center">
                              <p className='w-1/6'>{index + 1}</p>
                              <div className='w-3/6 flex items-center space-x-3'>
                                <img src={item?.image} alt="" className='w-[50px] h-[50px] object-cover' />
                                <p className=''>{item?.name}</p>
                              </div>
                              <p className='w-2/6'>{formatPrice(item?.price * (1 - numberDiscount / 100))}</p>
                              <p className='w-1/6'>
                                <button
                                  onClick={() => handleClickService(item)}
                                >
                                  <XMarkIcon className="w-9 h-9 hover:text-red-600" />
                                </button>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : ""}
              </div>
            </div>
            {/* Ảnh */}
            <div className=" flex justify-center pt-7">
              <div className="bg-white w-[75%] min-h-[300px] rounded-md p-5 space-y-3">
                <div className="flex space-x-1">
                  <p className="text-[18px] font-semibold">Hình ảnh</p>
                  <p className="text-red-800">*</p>
                </div>
                <div className="bg-[#F9F9FC] border-dashed border-2 border-[#E0E2E7] py-5 flex flex-col justify-center items-center">
                  {images
                    ? (
                      <div className="flex justify-center items-center space-x-7 pb-5">
                        <img src={URL.createObjectURL(images)} alt="Uploaded" className="h-[150px] object-cover border-2 border-[#E0E2E7]" />
                      </div>
                    )
                    : imagesUrl ? (
                      <div className="flex justify-center items-center space-x-7 pb-5">
                        <img src={imagesUrl} alt="Uploaded" className="h-[150px] object-cover border-2 border-[#E0E2E7]" />
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center py-4">
                        <div className="rounded-full w-[50px] h-[50px] bg-[#DEDEFA] border-4 border-[#EFEFFD] flex justify-center items-center">
                          <PhotoIcon className="w-7 h-9 fill-[#5C59E8]" />
                        </div>
                        <p className="text-[#858D9D]">Chưa có ảnh được thêm vào</p>
                      </div>
                    )}
                  <label htmlFor="fileInput" className="relative cursor-pointer bg-[#DEDEFA] text-[#5C59E8] font-semibold px-4 py-2 rounded hover:bg-[#9b9ad7]">
                    <span className="absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 cursor-pointer"></span>
                    Thêm ảnh
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <div className="pt-7">
              <Description dataValue={descriptionProduct} handleDescription={handleDescription} />
            </div>
            {/* Tạo */}
            <div className=" py-5 flex flex-row-reverse space-x-reverse space-x-5">
              <button className={`px-2 h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 
              ${!errorDate ? "hover:bg-green-600" : ""} `}
                disabled={!errorDate ? false : true}
                onClick={handleCreateDiscount}
              >Cập nhật khuyến mãi</button>
              <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-red-700'
                onClick={() => {
                  setNameDiscount(detailDiscountInfor?.title);
                  setNumberDiscount(detailDiscountInfor?.discountAmount);
                  setStartDate(new Date(detailDiscountInfor?.startDate));
                  setEndDate(new Date(detailDiscountInfor?.endDate));
                  if (new Date(detailDiscountInfor?.endDate) < new Date()) {
                    setErrorDate('Ngày kết thúc hiện tại đã nhỏ hơn ngày hiện tại, hãy cập nhật lại.');
                  }
                  setImagesUrl(detailDiscountInfor?.imageUrl);
                  setDataProduct(detailDiscountInfor?.motobikeProducts);
                  setDataService(detailDiscountInfor?.repairService);
                  setDescriptionProduct(detailDiscountInfor?.description);
                }}
              >Hủy</button>
            </div>
          </div>
        </div>
      </div>
      <ShowProductUpdateDiscount
        discountId={discountId}
        dataProduct={dataProduct}
        isVisible={showProduct}
        onClose={() => setShowProduct(false)}
        setDataProduct={setDataProduct}
      />
      <ShowServiceUpdateDiscount
        discountId={discountId}
        dataProduct={dataService}
        isVisible={showService}
        onClose={() => setShowService(false)}
        setDataProduct={setDataService}
      />
      {showLoading ? <LoadingCreateUpdate /> : ""}
    </div>
  )
}

export default UpdateDiscount