import { Link } from "react-router-dom"


const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="font-bold text-3xl text-blue-600 lg:text-6xl">
            Không thể vào trang này
          </h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Chờ đã!</span>
            Tài khoản này không có quyền truy cập
          </h6>

          <p className="mb-4 text-center text-gray-500 md:text-lg">
            Xin hãy đăng nhập bằng tài khoản khác
          </p>

          <Link
            to="/login"
            className="px-5 py-2 rounded-md text-white font-semibold bg-orange-900 hover:bg-main"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized