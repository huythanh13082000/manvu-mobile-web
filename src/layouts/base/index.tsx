import {makeStyles} from '@material-ui/styles'
import React, {ReactNode} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Menu from '../../components/menu'
import {ROUTE} from '../../router/routes'
interface Props {
  children: ReactNode
}
const useStyles = makeStyles({
  container_base_layout: {
    display: 'flex',
    '&>div:nth-child(1)': {
      maxHeight: '100vh',
    },
    '&>div:nth-child(2)': {
      boxSizing: 'border-box',
      width: 'calc(100%)',
      background: '#E5E7EB',
      minHeight: '100vh',
    },
  },
})

const BaseLayout: React.FC<Props> = ({children}) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <div className={classes.container_base_layout}>
      <div>{location.pathname !== ROUTE.LOGIN && <Menu />}</div>
      <div>{children}</div>
    </div>
  )
}

export default BaseLayout
