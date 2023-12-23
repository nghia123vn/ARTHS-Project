import { getAccount, getAllAccount, getNotAccount } from "@/actions/userInfor";
import ListAccount from "@/components/admin/ListAccount";
import ListNotAccount from "@/components/admin/ListNotAccount";
import { selectorListAccount } from "@/types/actions/listAccount";
import { itemPagination } from "@/types/pagination";
import { typeAccount } from "@/types/typeAuth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
  const [showStatus, setShowStatus] = useState<string>("active");
  const dispatch = useDispatch();
  const accountAllInfor: itemPagination<number> = useSelector((state: selectorListAccount<string, number>) => state.accountReducer.ListAllAccount);
  const accountInfor: itemPagination<number> = useSelector((state: selectorListAccount<string, number>) => state.accountReducer.ListAccount);
  const accountNotInfor: itemPagination<number> = useSelector((state: selectorListAccount<string, number>) => state.accountReducer.ListNotAccount);

  useEffect(() => {
    dispatch(getAllAccount());
    dispatch(getAccount(typeAccount.InActive));
    dispatch(getNotAccount(typeAccount.InActive));
  }, [dispatch])
  return (
    <div className="pt-2">
      <p className="text-main font-semibold text-[25px]">Quản lý tài khoản</p>
      <div className="flex w-full justify-center">
        <div className="w-[95%]">
          <div className="flex justify-between items-center py-3">
            <div className="p-3 w-[280px] rounded-lg text-start bg-white flex flex-col justify-center">
              <p className="text-[#8F9BB3] ">Tổng tài khoản</p>
              <p className="text-[20px] font-semibold">{accountAllInfor?.totalRow}</p>
            </div>
            <div className="p-3  w-[280px] rounded-lg text-start bg-white flex flex-col justify-center">
              <p className="text-[#8F9BB3] ">Đang hoạt động</p>
              <p className="text-[20px] font-semibold">{accountInfor?.totalRow}</p>
            </div>
            <div className="p-3  w-[280px] rounded-lg text-start bg-white flex flex-col justify-center">
              <p className="text-[#8F9BB3] ">Khóa tài khoản</p>
              <p className="text-[20px] font-semibold">{accountNotInfor?.totalRow}</p>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex space-x-3 items-center pb-5">
              <button className={`p-3 hover:bg-main text-white font-semibold rounded-lg
              ${showStatus === "active" ? 'bg-main' : 'bg-gray-500'} `}
                onClick={() => {
                  setShowStatus("active")
                }}
              >Tài khoản đang hoạt động</button>
              <button className={`p-3 hover:bg-main text-white font-semibold rounded-lg
              ${showStatus === "notActive" ? 'bg-main' : 'bg-gray-500'} `}
                onClick={() => { setShowStatus("notActive") }}
              >Tài khoản bị khóa</button>
            </div>
            <div className="bg-white py-3">

              {showStatus === "active" ? (
                <ListAccount
                />
              ) : showStatus === "notActive" ? (
                <ListNotAccount />
              ) : ""}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home