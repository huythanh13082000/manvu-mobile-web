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
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const location = useLocation()
  useEffect(() => {
    switch (location.pathname) {
      case ROUTE.HOME:
        setValue(0)
        break
      case ROUTE.SERVICE:
        setValue(1)
        break

      case ROUTE.PRODUCT:
        setValue(2)
        break

      case ROUTE.SERVICES:
        setValue(3)
        break

      case ROUTE.REPORTERS:
        setValue(4)
        break
      default:
        break
    }
  }, [location])
  console.log(11, value)
  return (
    <>
      <div className={classes.header_search_container}>
        <img src={menu} alt='' />
        <img src={logo} alt='' />
        <img src={search} alt='' />
      </div>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
        >
          <Tab
            label='전체'
            {...a11yProps(0)}
            onClick={() => navigate(ROUTE.HOME)}
          />
          <Tab
            label='지역'
            {...a11yProps(1)}
            onClick={() => navigate(ROUTE.SERVICE)}
          />
          <Tab
            label='제품'
            {...a11yProps(2)}
            onClick={() => navigate(ROUTE.PRODUCT)}
          />
          <Tab
            label='서비스'
            {...a11yProps(4)}
            onClick={() => navigate(ROUTE.SERVICES)}
          />
          <Tab
            label='기자단'
            {...a11yProps(5)}
            onClick={() => navigate(ROUTE.REPORTERS)}
          />
          <Tab
            label='앱테크'
            {...a11yProps(6)}
            disabled
            // onClick={() => navigate(ROUTE.REPORTERS)}
          />
          앱테크
        </Tabs>
      </Box>
    </>
  )
}

export default HeaderSearch
