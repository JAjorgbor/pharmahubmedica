import { create } from 'zustand'

interface SidebarState {
  openSidebar: boolean
  setOpenSidebar: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  openSidebar: false,
  setOpenSidebar: (open) => set({ openSidebar: open }),
}))
