import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { getProduct, getProductByQuery, setProductQueries, syncProduct } from "./index";
import { IPagination, IProduct } from "./type";
import { ECategory } from "@/store/category/type";


export interface IProductQuery {
  name: string;
  repairService: string;
  category: string;
  vehiclesName: string;
  discountId: string;
}

export const requestListProducts = async () => {
  const { data } = await axios.get<{
    pagination:IPagination
    data:IProduct[]
  }>(`https://${BASE_URL}/api/motobike-products`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      const _data = data.data;
      syncProduct(_data);
      setProductQueries(prev => ({
        ...prev,
        ["all"]: _data.map(item => item.id.toString()),
        ['active']: _data.filter(item => item.status === "Đang hoạt động").map(item => item.id.toString()),
        [ECategory.BIKE_ACCESSORIES]: _data.filter(item => item.category.id === ECategory.BIKE_ACCESSORIES).map(item => item.id.toString()),
        [ECategory.BIKE_OIL]: _data.filter(item => item.category.id === ECategory.BIKE_OIL).map(item => item.id.toString()),
        [ECategory.BIKE_TIRES]: _data.filter(item => item.category.id === ECategory.BIKE_TIRES).map(item => item.id.toString()),
        [ECategory.BIKE_TOYS]: _data.filter(item => item.category.id === ECategory.BIKE_TOYS).map(item => item.id.toString()),
      }));
    }
  });
};
export const requestLoadMoreProducts = async (pageNumber:number) => {
  const { data } = await axios.get<{
    pagination:IPagination
    data:IProduct[]
  }>(`https://${BASE_URL}/api/motobike-products?pageNumber=${pageNumber}`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      const _data = data.data;
      syncProduct(_data);
      const _all = getProductByQuery("all");
      setProductQueries(prev => ({
        ...prev,
        ["all"]: [..._all, ..._data.map(item => item.id.toString())],
        ['active']: [...prev['active'], ..._data.filter(item => item.status === "Đang hoạt động").map(item => item.id.toString())],
    }));
    }
  });
};

export const requestListProductsByCategory = async (category:ECategory) => {
  const { data } = await axios.get<{
    pagination:IPagination
    data:IProduct[]
  }>(`https://${BASE_URL}/api/motobike-products?category=${category}`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      const _data = data.data;
      syncProduct(_data);
      setProductQueries(prev => ({
        ...prev,
        [category]: _data.map(item => item.id.toString())
      }));
    }
  });
};

export const requestProduct = async (params: {id: string | number}) => {
  const { data } = await axios.get<IProduct>(`https://${BASE_URL}/api/motobike-products/${params.id}`);
  batch(() => {
    if (data) {
      syncProduct([data]);
    }
  });
  return data;
};
export const requestSearchProducts = async (query: IProductQuery) => {
  const { name, repairService, category, vehiclesName, discountId } = query;
  const { data } = await axios.get<{
    pagination:IPagination
    data:IProduct[]
  }>(`https://${BASE_URL}/api/motobike-products?name=${name}&repairService=${repairService}&category=${category}&vehiclesName=${vehiclesName}&discountId=${discountId}`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    const _data = data.data;
    if (_data) {
      syncProduct(_data);
      setProductQueries(prev => ({
        ...prev,
        ["search"]: _data.map(item => item.id.toString())
      }));
    }
  });
};
export const requestBestSellerProducts = async () => {
  const { data } = await axios.get<{
    product:IProduct,
    totalQuantitySold:number
  }[]>(`https://${BASE_URL}/api/motobike-products/best-sellers`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      syncProduct([...data.map(item => {
        return {
          ...item.product,
          totalQuantitySold: item.totalQuantitySold
        };
      })]);
      setProductQueries(prev => ({
        ...prev,
        ["best-sellers"]: data.map(item => item.product.id.toString())
      }));
    }
  });
};
