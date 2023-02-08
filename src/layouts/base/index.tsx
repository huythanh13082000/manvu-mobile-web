import {makeStyles} from '@material-ui/styles'
import React, {ReactNode} from 'react'
import Menu from '../../components/menu'
interface Props {
  children: ReactNode
}
const useStyles = makeStyles({
  container_base_layout: {
    display: 'flex',
    '&>div:nth-child(1)': {},
    '&>div:nth-child(2)': {
      boxSizing: 'border-box',
      width: 'calc(100% - 300px)',
      background: '#F3F4F6',
    },
  },
})
const BaseLayout: React.FC<Props> = ({children}) => {
  const classes = useStyles()
  return (
    <div className={classes.container_base_layout}>
      <div>
        <Menu />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default BaseLayout
