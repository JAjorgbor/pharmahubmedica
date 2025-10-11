export interface SidebarState {
  openSidebar: boolean
}
export interface HeaderState {
  title: string | { sm: string; md: string }
}
export interface CurrencyState {
  currency: 'ngn' | 'usd'
}
export interface UserState {
  userId: string
}
