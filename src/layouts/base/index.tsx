import {makeStyles} from '@mui/styles'
import React, {ReactNode} from 'react'

const useStyles = makeStyles({
  base_layout_container: {
    minHeight: '100vh',
    maxWidth: '502px',
    margin: '0 auto',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
})

const BaseLayout = (props: {children: ReactNode}) => {
  const classes = useStyles()
  return <div className={classes.base_layout_container}>{props.children}</div>
}

export default BaseLayout
