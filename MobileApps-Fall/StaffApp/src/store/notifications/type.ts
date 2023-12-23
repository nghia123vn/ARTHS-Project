export interface INotification {
  id: string
  title: string
  body: string
  data: Data
}

export interface Data {
  link: string
  type: string
  isRead: boolean
  createAt: string
}
