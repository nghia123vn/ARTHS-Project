export interface IStaff {
  id: string
  fullName: string
  gender: string
  avatar: any
  phoneNumber: string
  role: string
  status: string
  createAt: string
}
export interface IStaffDetail {
  accountId: string
  fullName: string
  gender: string
  phoneNumber: string
  avatar: string
  feedbackStaffs: FeedbackStaff[]
}

export interface FeedbackStaff {
  id: string
  title: string
  content: string
  sendDate: string
  customer: Customer
}

export interface Customer {
  accountId: string
  phoneNumber: string
  fullName: string
  gender: string
  address: string
  avatar: string
}
export enum EStaffStatus {
  ACTIVE = "Đang hoạt động",
  INACTIVE = "Không hoạt động"
}
