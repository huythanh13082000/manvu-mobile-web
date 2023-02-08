import React, {ReactNode} from 'react'
interface Props {
  children: ReactNode
}
const BaseLayout: React.FC<Props> = ({children}) => {
  return <div>{children}</div>
}

export default BaseLayout
