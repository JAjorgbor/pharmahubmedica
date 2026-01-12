import type { FC, ReactNode } from 'react'

export const dynamic = 'force-dynamic'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return children
}
export default layout
