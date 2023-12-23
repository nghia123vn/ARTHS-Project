import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import userRefreshToken from "../hooks/useRefreshToken";
// import useAuth from "@/hooks/useAuth";
import Loading from "@/components/LoadingPage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = userRefreshToken();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const { auth }: any = useAuth();
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        !initialAuth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(initialAuth?.accessToken)}`);
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <Loading />
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin