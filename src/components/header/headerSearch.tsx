import React, {useEffect, useState} from 'react'
import makeStyles from '@mui/styles/makeStyles'
import menu from '../../asset/icons/menu.png'
import search from '../../asset/icons/search.png'
import logo from '../../asset/images/logo_login.png'
import Box from '@mui/material/Box/Box'
import Tabs from '@mui/material/Tabs/Tabs'
import Tab from '@mui/material/Tab/Tab'
import {useLocation, useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'
import {useAppSelector} from '../../app/hooks'
import {selectUser} from '../../feature/user/user.slice'

const useStyles = makeStyles({
  header_search_container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    padding: '1rem',
    '&> img:nth-child(1)': {
      width: '30px',
      height: '30px',
    },
    '&> img:nth-child(2)': {
      width: '50px',
      height: '50px',
    },
    '&> img:nth-child(3)': {
      width: '33px',
      height: '33px',
    },
  },
})
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const HeaderSearch = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [valueTab, setValueTab] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue)
  }
  const user = useAppSelector(selectUser)
  const routeMenu = () => {
    if (user.profile && user.profile?.roles) {
      user.profile?.roles.find((item) => item.name === 'advertiser')
        ? navigate(ROUTE.SERVICE_CENTER_ADVERTISER)
        : navigate(ROUTE.SERVICE_CENTER)
    } else {
      navigate(ROUTE.LOGIN)
    }
  }
  const location = useLocation()
  useEffect(() => {
    switch (location.pathname) {
      case ROUTE.HOME:
        setValueTab(0)
        break
      case ROUTE.SERVICE:
        setValueTab(1)
        break

      case ROUTE.PRODUCT:
        setValueTab(2)
        break

      case ROUTE.SERVICES:
        setValueTab(3)
        break

      case ROUTE.REPORTERS:
        setValueTab(4)
        break
      default:
        break
    }
  }, [location])
  return (
    <>
      <div className={classes.header_search_container}>
        <img src={menu} alt='' onClick={routeMenu} />
        <img src={logo} alt='' />
        <img src={search} alt='' onClick={() => navigate(ROUTE.PAGE_SEARCH)} />
      </div>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
        >
          <Tab
            label='??????'
            {...a11yProps(0)}
            onClick={() => navigate(ROUTE.HOME)}
          />
          <Tab
            label='??????'
            {...a11yProps(1)}
            onClick={() => navigate(ROUTE.SERVICE)}
          />
          <Tab
            label='??????'
            {...a11yProps(2)}
            onClick={() => navigate(ROUTE.PRODUCT)}
          />
          <Tab
            label='?????????'
            {...a11yProps(4)}
            onClick={() => navigate(ROUTE.SERVICES)}
          />
          <Tab
            label='?????????'
            {...a11yProps(5)}
            onClick={() => navigate(ROUTE.REPORTERS)}
          />
          <Tab
            label='?????????'
            {...a11yProps(6)}
            disabled
            // onClick={() => navigate(ROUTE.REPORTERS)}
          />
          ?????????
        </Tabs>
      </Box>
    </>
  )
}

export default HeaderSearch
