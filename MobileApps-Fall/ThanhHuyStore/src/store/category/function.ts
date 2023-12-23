import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { setCategoryQueries, syncCategory } from "@/store/category/index";
import { ICategory } from "@/store/category/type";


export interface ICategoryParams {
  name: string;
}

export const requestAllCategories = async (params: ICategoryParams) => {
    const { data } = await axios.get<ICategory[]>(`https://${BASE_URL}/api/categories?name=${params.name}`, {
      headers: {
        "accept": "text/plain"
      }
    });
    batch(() => {
      if (data.length) {
        syncCategory(data);
        setCategoryQueries(prev => ({
          ...prev,
          ["all"]: data.map(item => item.categoryName.toString())
        }));
      }
    });

};
