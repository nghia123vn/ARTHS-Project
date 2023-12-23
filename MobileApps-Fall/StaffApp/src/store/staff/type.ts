export interface IStaff {
    accountId: string
    fullName: string
    gender: string
    phoneNumber: string
    avatar: string
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
