
export interface selectorCategoryProduct<T> {
    categoryProductReducer: {
        categoryProduct: itemCategoryProduct<T>[];
        showError: T | null;
    }
}

export interface storeCategoryProduct<T> {
    showError: T | null,
    categoryProduct: categoryProductSaga<T>[];
}

export interface categoryProductSaga<T> {
    data: itemCategoryProduct<T>
}

export interface itemCategoryProduct<T> {
    id: T;
    categoryName: T;
}



