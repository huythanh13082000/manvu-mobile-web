import React, {ReactNode} from 'react'


const BaseLayout = (props: {children: ReactNode}) => {
  return <div>{props.children}</div>
}

export default BaseLayout
