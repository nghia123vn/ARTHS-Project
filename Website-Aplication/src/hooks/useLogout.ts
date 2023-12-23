import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import userAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setAuth }: any = useAuth();
    const axiosPrivate = userAxiosPrivate();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            navigate('/login');
            const response = await axiosPrivate('/auth/logout', {
                withCredentials: true
            });
            response;


        } catch (error) {
            console.error(error);
        }
        setAuth({});
        localStorage.removeItem('auth');

    }
    return logout;
}

export default useLogout;