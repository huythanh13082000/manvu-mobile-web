import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import HeaderSearch from '../../components/header/headerSearch'
import Box from '@mui/material/Box/Box'
import Tabs from '@mui/material/Tabs/Tabs'
import Tab from '@mui/material/Tab/Tab'
import Filter from '../../components/filter'
import CardBase from '../../components/card_base'

const useStyles = makeStyles({
  home_container: {
    '&>div:last-child': {
      padding: '0.5rem',
      display: 'flex',
    },
  },
})

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Home = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className={classes.home_container}>
      <HeaderSearch />
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
        >
          <Tab label='전체' {...a11yProps(0)} />
          <Tab label='지역' {...a11yProps(1)} />
          <Tab label='제품' {...a11yProps(2)} />
          <Tab label='서비스' {...a11yProps(4)} />
          <Tab label='기자단' {...a11yProps(5)} />
        </Tabs>
      </Box>
      <Box bgcolor={'#F6F6F6'} padding='1rem'>
        <Filter />
      </Box>
      <div>
        <CardBase />
        <CardBase />
      </div>
    </div>
  )
}

export default Home
