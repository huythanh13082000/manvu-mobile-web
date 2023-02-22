import {makeStyles} from '@material-ui/core'
import {useLocation, useNavigate} from 'react-router-dom'
import IconBagMenu from '../../asset/icons/icon_bag_menu'
import IconMoneyMenu from '../../asset/icons/icon_money_menu'
import IconNoteMenu from '../../asset/icons/icon_note_menu'

import logoMenu from '../../asset/images/logo-menu.png'
import {ROUTE} from '../../router/routes'
import React, {useEffect} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles({
  container_menu: {
    background: '#FFFFFF',
    border: '1px solid rgba(196, 196, 196, 0.5)',
    borderBottom: 'none',
    boxSizing: 'border-box',
    width: '300px',
    padding: '0 1rem',
    height: '100vh',
    position: 'relative',
    '&>div:nth-child(1)': {
      boxSizing: 'border-box',
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
    '&>div': {
      display: 'flex',
      alignItem: 'center',
      padding: '16px',
      borderRadius: '4px',
      margin: '0.5rem 0',
      '&>p': {
        margin: '0 16px',
      },
    },
    '&>div:hover': {
      background: '#0065F2',
      color: 'white',
    },
    '&>div:nth-child(1):hover': {
      background: 'white',
    },
    '&>span': {
      background: '#F3F4F6',
      borderRadius: '4px',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      width: '245px',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      color: '#111827',
      paddingLeft: '1rem',
      position: 'absolute',
      bottom: '1rem',
    },
  },
})

const Menu = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogOut = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      localStorage.clear()
      navigate(ROUTE.LOGIN)
    }
  }
  return (
    <div className={classes.container_menu}>
      <div>
        <img src={logoMenu} alt='' />
        <span>GreenApp</span>
      </div>
      <div
        style={
          location.pathname === ROUTE.PORTFOLIO
            ? {
                background: '#0065F2',
                color: 'white',
              }
            : {}
        }
        onClick={() => navigate(ROUTE.PORTFOLIO)}
      >
        <IconBagMenu
          color={location.pathname === ROUTE.PORTFOLIO ? 'white' : ''}
        />
        <p>포트폴리오</p>
      </div>
      <div
        style={
          location.pathname === ROUTE.ESTIMATE_CALCULATION
            ? {
                background: '#0065F2',
                color: 'white',
              }
            : {}
        }
        onClick={() => navigate(ROUTE.ESTIMATE_CALCULATION)}
      >
        <IconMoneyMenu
          color={
            location.pathname === ROUTE.ESTIMATE_CALCULATION ? 'white' : ''
          }
        />
        <p>견적관리</p>
      </div>
      <div
        style={
          location.pathname === ROUTE.DEVELOPMENT_INQUIRY
            ? {
                background: '#0065F2',
                color: 'white',
              }
            : {}
        }
        onClick={() => navigate(ROUTE.DEVELOPMENT_INQUIRY)}
      >
        <IconNoteMenu
          color={
            location.pathname === ROUTE.DEVELOPMENT_INQUIRY ? 'white' : 'black'
          }
        />
        <p>제작문의</p>
      </div>
      <span onClick={handleLogOut}>
        <ExitToAppIcon /> Logout
      </span>
    </div>
  )
}

export default Menu
