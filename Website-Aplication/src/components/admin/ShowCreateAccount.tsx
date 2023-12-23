import { createAccount, resetError } from '@/actions/userInfor';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { selectorCreateUpdateAccount } from '@/types/actions/createUpdateAccount';
import { formatPhoneNumber } from '@/utils/formatPhone';
import { Option, Select } from '@material-tailwind/react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingCreateUpdate from '../LoadingCreateUpdate';

type Props = {
    isVisible: boolean;
    onClose: () => void;
}

enum roleCreate {
    Other = "",
    Staff = "Staff",
    Customer = "Customer",
    Teller = "Teller",
}

enum genderCreate {
    Other = "",
    Male = "Nam",
    Female = "Nữ",
}
const ShowCreateAccount = ({ isVisible, onClose }: Props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const itemError: string | null = useSelector((state: selectorCreateUpdateAccount<string, number>) => state.createUpdateReducer.showError);
    const showItem = useSelector((state: selectorCreateUpdateAccount<string, number>) => state.createUpdateReducer.accountInfor);
    console.log("first", itemError, showItem);
    const [showError, setShowError] = useState<string | null>(itemError)
    const [nameAccount, setNameAccount] = useState<string>("")
    const [phoneAccount, setPhoneAccount] = useState<string>("")
    const [genderAccount, setGenderAccount] = useState<genderCreate>(genderCreate.Other)
    const [passwordAccount, setPasswordAccount] = useState<string>("")
    const [rePassAccount, setRePassAccount] = useState<string>("");
    const [errorPasswordAccount, setErrorPasswordAccount] = useState<string>("");
    const [errorLengthPassword,setErrorLengthPassword] = useState<string>("");
    const [roleAccount, setRoleAccount] = useState<roleCreate>(roleCreate.Other);

    const handleAddRole = (e: string | undefined) => {
        if (e) {
            const selectedRole = e as roleCreate;
            setRoleAccount(selectedRole);
        }
    }
    const handleAddGender = (e: string | undefined) => {
        if (e) {
            const selectedRole = e as genderCreate;
            setGenderAccount(selectedRole);
        }
    }
    const handleCreateAccount = () => {
        setIsLoading(true);
        const data = {
            phoneNumber: phoneAccount,
            password: rePassAccount,
            fullName: nameAccount,
            gender: genderAccount,
        }
        if (phoneAccount.length===10 && rePassAccount && passwordAccount && nameAccount && genderAccount !== genderCreate.Other && roleAccount !== roleCreate.Other) {
            dispatch(createAccount(roleAccount, data));
            setIsLoading(false)
        } else {
            setIsLoading(false)
            alert("Hãy nhập đầy đủ các mục");
        }
    }
    useEffect(() => {
        if (itemError === null && showItem !== null) {
            onClose();
            showSuccessAlert('Tạo tài khoản thành công');
            dispatch(resetError());
            setIsLoading(false);
            setNameAccount('');
            setPhoneAccount('');
            setPasswordAccount('');
            setRePassAccount('');
            setGenderAccount(genderCreate.Other);
            setRoleAccount(roleCreate.Other)
            setErrorPasswordAccount('')
        } else {
            setShowError(itemError);
            setIsLoading(false);
        }
    }, [dispatch, itemError, onClose, showItem])
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[60%] flex justify-center">
                <div className="w-full bg-white rounded-lg pb-3">
                    <div className="bg-gray-600 py-2 rounded-t-lg">
                        <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                            <p className="ml-2 mt-1 font-bold">
                                Tạo tài khoản
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
                                value={nameAccount}
                                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                                placeholder='Nhập họ và tên ....'
                                onChange={(e) => setNameAccount(e.target.value)}
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
                                        value={genderAccount}
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
                            <div className="flex space-x-3 items-center">
                                <div className="flex space-x-1">
                                    <p className='text-[18px] font-semibold'>Vai trò</p>
                                    <p className="text-red-800">*</p>
                                </div>
                                <div className="w-[220px]">
                                    <Select
                                        className="text-[18px] h-[50px] bg-gray-50"
                                        size="lg"
                                        label="Lựa chọn vai trò"
                                        onChange={handleAddRole}
                                        value={roleAccount}
                                    >
                                        <Option
                                            value={roleCreate.Teller}
                                            className="text-[18px]"
                                        >Nhân viên giao dịch</Option>
                                        <Option
                                            value={roleCreate.Staff}
                                            className="text-[18px]"
                                        >Nhân viên sửa chữa</Option>
                                        {/* <Option
                                            value={roleCreate.Customer}
                                            className="text-[18px]"
                                        >Khách hàng</Option> */}
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex space-x-1">
                                <p className='text-[18px] font-semibold'>Số điện thoại</p>
                                <p className="text-red-800">*</p>
                            </div>

                            <input type="text"
                                value={phoneAccount}
                                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                                placeholder='Nhập số điện thoại ....'
                                onChange={(e) => setPhoneAccount(formatPhoneNumber(e.target.value))}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex space-x-1">
                                <p className='text-[18px] font-semibold'>Mật khẩu</p>
                                <p className="text-red-800">*</p>
                            </div>

                            <input type="password"
                                value={passwordAccount}
                                className="w-[80%] h-[40px] outline-none rounded-lg border-2 border-[#E5E7EB] bg-[#F9FAFB] text-black focus:bg-white px-2"
                                placeholder='Nhập mật khẩu ....'
                                onChange={(e) => {
                                    setPasswordAccount(e.target.value);
                                    if(e.target.value.length>=8){
                                        setErrorLengthPassword('')
                                    }else{
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
                        ${(errorPasswordAccount || errorLengthPassword ) ? "" : "hover:bg-blue-700"}
                        bg-gray-400 px-5 h-[40px]  rounded-md`}
                            disabled={(errorPasswordAccount || errorLengthPassword) ? true : false}
                            onClick={() => handleCreateAccount()}
                        >
                            Tạo tài khoản
                        </button>
                        <button
                            className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                            onClick={() => {
                                dispatch(resetError());
                                setNameAccount('');
                                setPhoneAccount('');
                                setPasswordAccount('');
                                setRePassAccount('');
                                setGenderAccount(genderCreate.Other);
                                setRoleAccount(roleCreate.Other)
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
    )
}

export default ShowCreateAccount