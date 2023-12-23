import { useEffect, useRef } from 'react';
import logoLogin from "@/assets/LogoLogin.jpeg";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import useAuth from "@/hooks/useAuth";
import axios from '@/api/axios';
import jwtDecode from 'jwt-decode';
const LOGIN_URL = 'auth';
interface IDecodedToken {
    id: string;
    role: string;
    status: string;
    iat?: number;
    exp?: number;
}
const Login = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const { setAuth }: any = useAuth();

    useEffect(() => {
        if (userRef && userRef.current) {
            userRef.current.focus();
        }
    }, [])
    const postData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ phoneNumber, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const decodedToken: IDecodedToken = jwtDecode(accessToken) as IDecodedToken;
            const roles = decodedToken.role;
            console.log('hello', roles);
            const authData = {
                accessToken: accessToken,
                roles: roles
                // Các thông tin khác cần thiết
            };
            localStorage.setItem('auth', JSON.stringify(authData));
            // setAuth({roles, accessToken });
            setPhoneNumber('');
            setPassword('');
            if (roles === "Admin") {
                const from = "/";
                navigate(from, { replace: true });
            } else if (roles === "Teller") {
                const from = "/manage-order/create-order";
                navigate(from, { replace: true });
            } else if (roles === "Owner") {
                const from = "/owner";
                navigate(from, { replace: true });
            }else {
                navigate('/unauthorized')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Đăng nhập thất bại');
            } else if (err.response?.status === 404) {
                setErrMsg('Sai tài khoản hoặc mật khẩu');
            } else if (err.response?.status === 401) {
                setErrMsg('Bạn không có quyền đăng nhập vào');
            } else {
                setErrMsg('Lỗi sever, xin mời kiểm tra');
            }
            if (errRef && errRef.current) {
                errRef.current.focus();
            }
            setIsLoading(false)
        }
    }
    return (
        <div className="w-screen min-h-screen flex justify-center items-center">

            <div className="w-[60%]  flex justify-center items-center pl-[7vh]">
                <img alt="logo" src={logoLogin} className="rounded-lg w-full h-[93vh]" />
            </div>
            <div className="w-[50%] flex flex-col justify-center items-center font-semibold">
                <h1 className="text-main text-[36px] font-bold ">Đăng nhập</h1>
                <div className="pt-[50px] h-full w-full">
                    <form
                        onSubmit={postData}
                    >
                        <div className="px-[15%]">
                            <div className="">
                                <input
                                    type="text"
                                    ref={userRef}
                                    placeholder="Số điện thoại"
                                    className="h-[70px] w-full text-xl border-2 border-[#9D9D9D] rounded-[10px] px-2"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="pt-5">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="h-[70px] w-full text-xl border-2 border-[#9D9D9D] rounded-[10px] px-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-red-600 pt-2 px-1">
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </div>
                            <div className="w-full h-full flex justify-end py-3">
                                <Link to="/forgot" className="hover:text-red-700" >Quên mật khẩu?</Link>
                            </div>
                            <button
                                type="submit"
                                className=
                                "h-[70px] w-full bg-main font-semibold text-[24px] text-white rounded-[10px] hover:border-4 hover:border-orange-600 hover:shadow-lg flex justify-center items-center">
                                <p className={`
                                ${isLoading?"animate-spin rounded-full h-9 w-9 border-t-4 border-b-4 border-white":""}
                                `}>{isLoading?"":"Đăng nhập"}</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login