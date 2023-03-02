import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import menu from '../../asset/icons/menu.png'
import search from '../../asset/icons/search.png'
import logo from '../../asset/images/logo_login.png'

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

const HeaderSearch = () => {
  const classes = useStyles()
  return (
    <div className={classes.header_search_container}>
      <img src={menu} alt='' />
      <img src={logo} alt='' />
      <img src={search} alt='' />
    </div>
  )
}

export default HeaderSearch
