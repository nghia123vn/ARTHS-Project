export interface typeAuth {
    accessToken: string | null,
    roles: string | null,
}

export enum typeAccount {
    Active = "Đang hoạt động",
    InActive = "Không hoạt động",
    Pending = "Chờ xác nhận",
    Busy = "Bận",
}

export enum roleAccount{
    Admin = "Admin",
    Owner = "Owner",
    Staff = "Staff",
    Customer = "Customer",
    Teller = "Teller",
}