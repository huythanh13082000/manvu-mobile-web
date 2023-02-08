import {makeStyles} from '@material-ui/core'
import React from 'react'

import logoMenu from '../../asset/images/logo-menu.png'

const useStyles = makeStyles({
  container_menu: {
    background: '#FFFFFF',
    border: '1px solid rgba(196, 196, 196, 0.5)',
    boxSizing: 'border-box',
    width: '300px',
    '&>div:nth-child(1)': {
      display: 'flex',
      padding: '0 32px',
      alignItem: 'center',
      margin: '32px 0 64px 0',
      '&>img': {
        width: '35px',
        height: '39px',
        marginRight: '1rem',
      },
      '&>span': {
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '30px',
        color: '#222222',
      },
    },
  },
})

const Menu = () => {
  const classes = useStyles()
  return (
    <div className={classes.container_menu}>
      <div>
        <img src={logoMenu} alt='' />
        <span>GreenApp</span>
      </div>
    </div>
  )
}

export default Menu
