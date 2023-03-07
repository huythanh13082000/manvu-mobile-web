import {Tab, Tabs} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import AppBarCustom from '../../components/appbar'

const useStyles = makeStyles({
  point_management_container: {
    '&>div:nth-of-type(1)': {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '0.5px solid #A2A5AA',
    },
  },
})

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const PointManagement = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className={classes.point_management_container}>
      <AppBarCustom title='포인트 관리' />
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='출금신청' {...a11yProps(0)} />
          <Tab label='포인트 관리' {...a11yProps(1)} />
        </Tabs>
      </div>
    </div>
  )
}

export default PointManagement
