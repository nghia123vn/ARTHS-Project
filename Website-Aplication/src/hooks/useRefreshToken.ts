import axiosPrivate from "../api/axios";
import jwtDecode from 'jwt-decode';
interface IDecodedToken {
    id: string;
    role: string;
    status: string;
    iat?: number;
    exp?: number;  
}
const userRefreshToken = () => {
    
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    const refresh = async () => {
        const response = await axiosPrivate.post("/auth/refresh-token",null,{
            headers:{
                'Authorization':`Bearer ${initialAuth?.accessToken}`,
            }
        });
        
        const decodedToken: IDecodedToken = jwtDecode(response.data.accessToken) as IDecodedToken;
            const roles = decodedToken.role;
        const authData = {
            accessToken: response.data.accessToken,
            roles: roles
            // Các thông tin khác cần thiết
        };
        localStorage.setItem('auth', JSON.stringify({...authData}));
        return response.data.accessToken;
    };
    return refresh;
};

export default userRefreshToken;
