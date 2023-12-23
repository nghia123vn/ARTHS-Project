import { createArrayReducer } from "@/utils/createArrayReducer";
import { ECategory, ICategory } from "@/store/category/type";

export const {
  sync: syncCategory,
  reducer: categoryReducer,
  setStore: setCategoryStore,
  useByKey: useCategory,
  setQueries: setCategoryQueries,
  useKeysByQuery: useCategoryByQuery,
  getKeysByQuery: getCategoryByQuery,
  getByKey: getCategory,
  deleteItem: deleteCategory,
  reset: resetCategory
} = createArrayReducer<ICategory>("category", ["id"]);

export const SERVICE_CATEGORY :ICategory = {
  id: "service",
  categoryName: ECategory.SERVICE
}

