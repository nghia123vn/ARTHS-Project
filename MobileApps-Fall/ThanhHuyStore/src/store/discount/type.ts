import { IRepairService } from "@/store/product/type";

export interface IDiscount {
  id: string;
  title: string;
  discountAmount: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  description: string;
  status: string;
  motobikeProducts?: DiscountMotobikeProduct[];
  repairService?: DiscountRepairService[];
}

export interface DiscountMotobikeProduct {
  id: string;
  name: string;
  priceCurrent: number;
  installationFee: number;
  discountAmount: number;
  imageUrl: string;
}

export interface DiscountRepairService {
  id: string;
  name: string;
  price: number;
  image: string;
  duration: number;
  discountAmount: number;
}
