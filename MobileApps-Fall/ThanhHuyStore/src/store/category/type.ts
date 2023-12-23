export interface ICategory {
  id:string;
  categoryName:ECategory;
}
export enum ECategory {
  BIKE_TOYS = "đồ chơi xe máy",
  BIKE_ACCESSORIES = "phụ kiện thay thế",
  BIKE_OIL = "dầu nhớt",
  BIKE_TIRES = "vỏ xe máy",
  SERVICE =  "Dịch vụ"
}
