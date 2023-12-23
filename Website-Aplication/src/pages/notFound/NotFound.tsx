import { useNavigate } from "react-router-dom";



const NotFound = () => {
    const navigate = useNavigate();
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    const handleGoBack = () => {
        if(initialAuth){
            if (initialAuth?.roles === "Admin") {
                const from = "/";
                navigate(from, { replace: true });
            } else if (initialAuth?.roles === "Teller") {
                const from = "/manage-order/create-order";
                navigate(from, { replace: true });
            } else if (initialAuth?.roles === "Owner") {
                const from = "/owner";
                navigate(from, { replace: true });
            }else {
                navigate('/unauthorized')
            }
        }else{
            navigate('/login')
        }
    }
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Không tìm thấy trang
            </div>
            <button className="mt-5">
                <a
                    className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <button className="relative block px-8 py-3 bg-[#1A2238] border border-current"
                        onClick={handleGoBack}
                    >
                        <p>Trang chủ</p>
                    </button>
                </a>
            </button>
        </div>
    )
}

export default NotFound