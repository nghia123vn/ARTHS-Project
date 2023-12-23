import { Select, Option } from "@material-tailwind/react";
import { CategoryProduct, WarrantyProduct, createVehicle, deleteVehicle, getVehicleProduct, postCreateProduct } from '@/actions/product';
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr';
import { ChevronDownIcon, MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemVehicleProduct, selectorVehicleProduct } from "@/types/actions/listVehicle";
import { getDiscountChoose } from "@/actions/discount";
import { dataDiscount, itemDiscount, selectorDiscount } from "@/types/actions/listDiscout";
import Description from "@/components/Description";
import { itemWarrantyProduct, selectorWarrantyProduct } from "@/types/actions/listWarranty";
import LoadingPage from "@/components/LoadingPage";
import '../../../css/showDiscount.css';
import LoadingCreateUpdate from "@/components/LoadingCreateUpdate";
const CreateProduct = () => {
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const dispatch = useDispatch();
  const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
  const warrantyChoose: itemWarrantyProduct<string, number>[] = useSelector((state: selectorWarrantyProduct<string, number>) => state.warrantyReducer.warrantyProduct);
  const discountProduct: dataDiscount<string, number> = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.discountInfor);
  const [dataDiscount, setDataDiscount] = useState<itemDiscount<string, number>[]>([])
  const vehicleProduct: itemVehicleProduct<string>[] = useSelector((state: selectorVehicleProduct<string>) => state.vehicleProductReducer.vehicleProduct);
  const createVehicleProduct: itemVehicleProduct<string> = useSelector((state: selectorVehicleProduct<string>) => state.vehicleProductReducer.createVehicleProduct);
  const [nameProduct, setNameProduct] = useState<string>('');
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [priceInstallationFee, setPriceInstallationFee] = useState<number>(0)
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [addCategory, setAddCategory] = useState<string>("");
  const [addDiscount, setAddDiscount] = useState<string>("");
  const [addWarranty, setAddWarranty] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [createAddVehicle, setCreateAddVehicle] = useState<string>("");
  const [errorVehicleProduct, setErrorVehicleProduct] = useState<string>("");
  const [createDataVehicle, setCreateDataVehicle] = useState<itemVehicleProduct<string>[]>([]);
  const [checkedVehicles, setCheckedVehicles] = useState<itemVehicleProduct<string>[]>([]);
  const [addVehicle, setAddVehicle] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [addSearch, setAddSearch] = useState<string>("")
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [dataVehicle, setDataVehicle] = useState<itemVehicleProduct<string>[]>([]);
  // console.log("creee", createVehicleProduct)
  // console.log("second",createDataVehicle);
  useEffect(() => {
    if (discountProduct?.data?.length > 0) {
      setDataDiscount(discountProduct.data)
    }
    setIsLoading(false)

  }, [discountProduct]);
  useEffect(() => {
    if (vehicleProduct?.length > 0) {
      const filteredCheckedVehicles = vehicleProduct.filter(
        checkedItem => !createDataVehicle.some(createItem => createItem.id === checkedItem.id)
      );
      setDataVehicle(filteredCheckedVehicles)
    } else {
      setDataVehicle([]);
    }
  }, [createDataVehicle, vehicleProduct])

  const itemSearch = dataVehicle?.filter((item) => {
    return item?.vehicleName?.toLowerCase()?.includes(addSearch?.toLowerCase());
  })
  useEffect(() => {
    const matched = vehicleProduct?.filter((vehicle) => addVehicle.includes(vehicle.id));
    setCheckedVehicles(matched);
  }, [addVehicle, vehicleProduct]);
  useEffect(() => {
    dispatch(getVehicleProduct())
  }, [dispatch])
  useEffect(() => {
    dispatch(CategoryProduct());
    dispatch(WarrantyProduct());
    dispatch(getDiscountChoose(50));
    setIsLoading(true);
  }, [dispatch])



  const handleShowVehicle = () => {
    setShowVehicle(!showVehicle);
  }
  const handleAddCategory = (e: string | undefined) => {
    if (e) {
      setAddCategory(e)
    }
  }

  const handleAddWarranty = (inputValue: number) => {
    if (inputValue > 0) {
      const matchingWarranty = warrantyChoose?.find(item => item.duration === inputValue);
      if (matchingWarranty) {
        setAddWarranty(matchingWarranty.id);
        setSelectedDuration(inputValue);
      }
    } else {
      setAddWarranty('');
      setSelectedDuration(null);
    }
  };
  console.log(addWarranty, selectedDuration, warrantyChoose)

  const handleAddDiscount = (e: string | undefined) => {
    if (e) {
      setAddDiscount(e)
    }
  }
  const handleVehicleChange = (value: string) => {
    if (addVehicle.includes(value)) {
      setAddVehicle(addVehicle.filter(item => item !== value));
    } else {
      setAddVehicle([...addVehicle, value]);
    }
  };
  const handleRemoveStore = (value: string) => {
    dispatch(deleteVehicle(value));
    const updatedCreateDataVehicle = createDataVehicle.filter(item => item.id !== value);
    setCreateDataVehicle(updatedCreateDataVehicle);
    localStorage.setItem('dataCreateVehicle', JSON.stringify(updatedCreateDataVehicle));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const selectedImages = Array.from(fileList) as File[];

      if (selectedImages.length + images.length <= 4) {
        setImages([...images, ...selectedImages]);
      } else {
        alert('Bạn chỉ có thể tải lên tối đa 4 ảnh.');
      }
    }

  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  const handleDescription = (value: string) => {
    setDescriptionProduct(value);
  }


  const handleCreateProduct = () => {
    setIsLoadingCreate(true);
    const dataCreate = {
      name: nameProduct,
      priceCurrent: priceProduct,
      quantity: quantityProduct,
      description: descriptionProduct,
      installationFee: priceInstallationFee,
      discountId: addDiscount,
      warrantyId: addWarranty,
      categoryId: addCategory,
      vehiclesId: [...addVehicle, ...createDataVehicle.map(item => item.id)],
      images: images
    }
    if (nameProduct && quantityProduct > 0 && priceProduct && descriptionProduct && addCategory && addVehicle?.length > 0 && images) {
      dispatch(postCreateProduct(dataCreate))
    } else {
      alert('Hãy nhập đầy đủ các mục có dấu *');
      setIsLoadingCreate(false);
    }
  }
  useEffect(() => {
    // Cuộn id="error" khi errorVehicleProduct là true
    if (errorVehicleProduct && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [errorVehicleProduct]);
  const handleClear = () => {
    setNameProduct('');
    setPriceProduct(0);
    setPriceInstallationFee(0);
    setDescriptionProduct('');
    setAddDiscount("");
    setAddWarranty("");
    setSelectedDuration(null);
    setAddCategory("");
    setAddVehicle([]);
    setImages([]);
    setCreateAddVehicle('');
    if (createDataVehicle) {
      createDataVehicle.forEach(item => {
        dispatch(deleteVehicle(item.id));
      });
      localStorage.removeItem('dataCreateVehicle');
      setCreateDataVehicle([]);
    }
  }

  const handleCreateVehicle = () => {
    if (createAddVehicle) {
      if (dataVehicle?.some((item) => item?.vehicleName === createAddVehicle) || checkedVehicles?.some((item) => item?.vehicleName === createAddVehicle)) {
        setErrorVehicleProduct('Đã tồn tại thương hiệu xe này')
      } else {
        dispatch(createVehicle(createAddVehicle));
        setErrorVehicleProduct("")
      }
    } else {
      setErrorVehicleProduct('Chưa nhập tên thương hiệu xe')
    }
  }
  useEffect(() => {
    const localStorageItem = localStorage.getItem('dataCreateVehicle');
    if (localStorageItem) {
      const localStorageArray = JSON.parse(localStorageItem) as itemVehicleProduct<string>[];

      // Gọi dispatch cho mỗi id trong localStorage
      localStorageArray.forEach(item => {
        dispatch(deleteVehicle(item.id));
      });
      // Xóa dữ liệu localStorage sau khi đã dispatch
      localStorage.removeItem('dataCreateVehicle');
    }
  }, [dispatch]);
  useEffect(() => {
    const localStorageItem = localStorage.getItem('dataCreateVehicle');
    if (localStorageItem) {
      const localStorageArray = JSON.parse(localStorageItem) as itemVehicleProduct<string>[];
      // Cập nhật state checkedVehicles từ localStorage
      setCreateDataVehicle(localStorageArray);
    }
  }, []);

  useEffect(() => {
    if (createVehicleProduct && createVehicleProduct.vehicleName === createAddVehicle) {
      const isExist = checkedVehicles.some(item => item.id === createVehicleProduct.id);

      if (!isExist) {
        // Cập nhật state checkedVehicles và lưu vào localStorage
        const newCheckedVehicles = [...createDataVehicle, createVehicleProduct];
        setCreateDataVehicle(newCheckedVehicles);
        localStorage.setItem('dataCreateVehicle', JSON.stringify(newCheckedVehicles));

        console.log('newCheckedVehicles:', newCheckedVehicles);
      }
    }
  }, [createVehicleProduct]);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <h1 className="text-[25px] font-semibold text-main">Tạo mới sản phẩm</h1>
          <div className="flex space-x-[3%] pt-5">
            <div className="bg-white w-[60%] p-5 rounded-md">
              <p className="text-[21px] font-semibold">Thông tin chung</p>
              <div className="w-[97%] text-[#6B7280] text-[19px] py-5 ">
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    <p>Tên sản phẩm </p>
                    <p className="text-red-800">*</p>
                  </div>
                  <input type="text"
                    value={nameProduct}
                    placeholder='Nhập tên sản phẩm'
                    className='outline-none  w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl '
                    onChange={(e) => setNameProduct(e.target.value)}
                  />
                </div>
                <div className="flex justify-between pt-7">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <p>Giá lắp đặt</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="number"
                        value={priceInstallationFee !== 0 ? String(priceInstallationFee) : ''}
                        placeholder="Số tiền(tối đa 500 nghìn)"
                        className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                        onChange={(e) => {
                          if (e.target.value) {
                            if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 500000) {
                              setPriceInstallationFee(parseInt(e.target.value))
                            } else {
                              if (parseInt(e.target.value) <= 0) {
                                setPriceInstallationFee(0)
                              }
                              if (parseInt(e.target.value) > 500000) {
                                setPriceInstallationFee(500000)
                              }

                            }
                          } else {
                            setPriceInstallationFee(0)
                          }

                        }}
                      />
                      <p>VNĐ</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <p>Giá tiền </p>
                      <p className="text-red-800">*</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="number"
                        min={1}
                        value={priceProduct === 0 ? "" : priceProduct}
                        placeholder="Số tiền(tối đa 100 triệu)"
                        className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                        onChange={(e) => {
                          if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100000000) {
                            setPriceProduct(parseInt(e.target.value))
                          } else {
                            if (parseInt(e.target.value) < 0) {
                              setPriceProduct(1)
                            }
                            if (parseInt(e.target.value) > 100000000) {
                              setPriceProduct(100000000)
                            }
                          }
                        }}
                      />
                      <p>VNĐ</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-7">
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-1">
                      <p>Thời gian bảo hành(tối đa {warrantyChoose?.length} tháng) </p>
                    </div>
                    <div className="w-full flex space-x-3 items-center">
                      <input
                        type="number"
                        placeholder="Nhập thời gian bảo hành"
                        className="text-[18px] w-[250px] h-[50px] bg-gray-50 border-2 border-blue-gray-200 rounded-lg p-2"
                        value={selectedDuration ?? ''}
                        max={36}
                        onChange={(e) => {
                          handleAddWarranty(parseInt(e.target.value))
                        }}
                      />
                      <p>THÁNG</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-1">
                      <p>Số lượng </p>
                      <p className="text-red-800">*</p>
                    </div>
                    <input type="number"
                      min={1}
                      value={quantityProduct}
                      placeholder="Nhập số sản phẩm"
                      className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 1000) {
                          setQuantityProduct(parseInt(e.target.value))
                        } else {
                          if (parseInt(e.target.value) < 0) {
                            setQuantityProduct(1)
                          }
                          if (parseInt(e.target.value) > 1000) {
                            setQuantityProduct(1000)
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Thể loại */}
            <div className="bg-white w-[40%] p-5 rounded-md ">
              <p className="text-[21px] font-semibold">Thể loại</p>
              <div className="w-[97%] text-[#6B7280] text-[19px] py-5 space-y-5 ">
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-1">
                    <p>Loại sản phẩm </p>
                    <p className="text-red-800">*</p>
                  </div>
                  <Select
                    size="lg"
                    label="Lựa chọn sản phẩm"
                    className="text-[20px] h-[50px] bg-gray-50"
                    onChange={handleAddCategory}
                  >
                    {categoryProduct
                      ? categoryProduct.map((item, index) => (
                        <Option
                          value={item.id}
                          key={index}
                          className="text-[18px]"
                        >{item.categoryName}</Option>
                      ))
                      : ""
                    }
                  </Select>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="pl-1">Khuyến mãi</p>
                  <Select
                    size="lg"
                    label="Lựa chọn khuyến mãi"
                    className="text-[20px] h-[50px] bg-gray-50 custom-truncate-product"
                    onChange={handleAddDiscount}
                  >
                    {dataDiscount
                      ? dataDiscount?.map((item, index) => (
                        <Option
                          value={item.id}
                          key={index}
                          className="text-[18px]"
                        >{item.title}</Option>
                      ))
                      : ""
                    }
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    <p>Thương hiệu xe </p>
                    <p className="text-red-800">*</p>
                  </div>
                  {checkedVehicles?.length > 0 || createDataVehicle?.length > 0
                    ? (
                      <div className="flex w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl focus:border-blue-500">
                        <div className={`${(checkedVehicles?.length + createDataVehicle?.length) > 3 ? "overflow-y-scroll h-[100px]" : ""}  w-[98%] `}>
                          <div className='grid grid-cols-3 gap-2 px-1'>
                            {createDataVehicle?.map((item, index) => (
                              <div key={index} className='flex justify-between text-[14px] items-center px-2  py-2 border-2 border-gray-200 rounded-lg'>
                                <p className="text-center">{item?.vehicleName}</p>
                                <button className="font-semibold text-[20px]" onClick={() => handleRemoveStore(item?.id)}>x</button>
                              </div>
                            ))}
                            {checkedVehicles?.map((item, index) => (
                              <div key={index} className='flex justify-between text-[14px] items-center px-2  py-2 border-2 border-gray-200 rounded-lg'>
                                <p className="text-center">{item?.vehicleName}</p>
                                <button className="font-semibold text-[20px]" onClick={() => handleVehicleChange(item.id)}>x</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={handleShowVehicle}
                        >
                          <ChevronDownIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="">
                        <button className="w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl focus:border-blue-500"
                          onClick={handleShowVehicle}
                        >
                          <div className="flex justify-between items-center">
                            <p>Chọn thương hiệu xe</p>
                            <ChevronDownIcon className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    )}
                </div>
                {showVehicle ? (
                  <div className='space-y-5'>
                    <div className="flex px-3 space-x-3 items-center border-2 border-[#E0E2E7] bg-[#E0E2E7] rounded-xl">
                      <MagnifyingGlassIcon className="w-5 h-5" />
                      <input type="text"
                        placeholder='Tìm kiếm dòng xe'
                        className='py-3 text-[16px] outline-none bg-[#E0E2E7]'
                        onChange={(e) => {
                          if (searchTimeout) {
                            clearTimeout(searchTimeout);
                          }
                          const newTimeSearch = window.setTimeout(() => {
                            setAddSearch(e.target.value);
                          }, 800);
                          setSearchTimeout(newTimeSearch);
                        }}
                      />
                    </div>

                    <div className="overflow-y-scroll h-[30vh] px-3" >
                      {itemSearch?.length > 0
                        ? (<div ref={errorRef}>
                          {itemSearch?.map((item, index) => (
                            <div className='flex space-x-3 items-center' key={index}>
                              <input type="checkbox"
                                className='w-5 h-5'
                                checked={addVehicle.includes(item?.id)}
                                onChange={() => handleVehicleChange(item?.id)}
                              />
                              <label>{item?.vehicleName}</label>
                            </div>
                          ))}
                          <div className="flex items-center pt-3 space-x-3">
                            <p>Thương hiệu khác:</p>
                            <div className="space-x-3">
                              <input type="text"
                                value={createAddVehicle || ""}
                                onChange={(e) => setCreateAddVehicle(e.target.value)} className="w-[60%] outline-none border-b-2 border-gray-300 focus:border-black" />
                              <button className="bg-blue-500 hover:bg-blue-900 p-2 text-white rounded-lg text-[14px] font-semibold"
                                onClick={() => {
                                  handleCreateVehicle()

                                }}
                              >Chọn</button>
                            </div>
                          </div>
                          {errorVehicleProduct ? <p id="error" className="text-red-600 text-start">{errorVehicleProduct}</p> : ""}
                        </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            <p>Không tìm thấy thương hiệu này</p>
                          </div>
                        )}
                    </div>
                  </div>
                ) : ""}
              </div>
            </div>
          </div>
          {/* Ảnh */}
          <div className=" flex justify-center pt-7">
            <div className="bg-white w-[75%] min-h-[300px] rounded-md p-5 space-y-3">
              <div className="flex space-x-1">
                <p>Hình ảnh</p>
                <p className="text-red-800">*</p>
              </div>
              <div className="bg-[#F9F9FC] border-dashed border-2 border-[#E0E2E7] py-5 flex flex-col justify-center items-center">
                {images.length > 0
                  ? (
                    <div className="flex justify-center items-center space-x-7 pb-5">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(image)} alt="Uploaded" className="h-32 object-cover border-2 border-[#E0E2E7]" />
                          <button onClick={() => handleRemoveImage(index)} className="absolute right-1 top-1 text-gray-400 w-5 h-5 bg-white rounded-full flex justify-center items-center">x</button>
                        </div>
                      ))}
                    </div>
                  )
                  : (
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
                  multiple
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
          <div className="py-5 flex flex-row-reverse space-x-reverse space-x-5">
            <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 hover:bg-green-600'
              onClick={handleCreateProduct}
            >Thêm sản phẩm</button>
            <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-red-700'
              onClick={handleClear}
            >Hủy</button>
          </div>
        </div>
      )}
      {isLoadingCreate ? <LoadingCreateUpdate /> : ""}
    </div>
  )
}

export default CreateProduct