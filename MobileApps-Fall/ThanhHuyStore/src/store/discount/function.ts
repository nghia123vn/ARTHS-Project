import { getToken } from "@/utils/loginHandle";
import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { IDiscount } from "@/store/discount/type";
import { setDiscountQueries, syncDiscount } from "@/store/discount/index";

export const requestAllDiscounts = async () => {
    const { data } = await axios.get<{
      pagination: {
        pageNumber: number,
        pageSize: number,
        totalRow: number,
      }
      data: IDiscount[]
    }>(`https://${BASE_URL}/api/discounts`, {
      headers: {
        "accept": "text/plain",
      }
    });
    batch(() => {
      if (data.data) {
        syncDiscount(data.data);
        setDiscountQueries((prev) => ({
          ...prev,
          "all": data.data.map((item) => item.id.toString()),
          "active": data.data.filter((item) => item.status === "Applying").map((item) => item.id.toString())
        }));
      }
    });
    return data;
};
export const requestDiscountById = async (id: string | number) => {
    const { data } = await axios.get<IDiscount>(`https://${BASE_URL}/api/discounts/${id}`, {
      headers: {
        "accept": "text/plain",
      }
    });
    return data;

}
