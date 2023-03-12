import {makeStyles} from '@mui/styles'
import React, {ReactNode, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {setTokenAxios} from '../../apis/axiosClient'
import {useAppDispatch} from '../../app/hooks'
import HeaderSearch from '../../components/header/headerSearch'
import {createCampaignActions} from '../../feature/create_campaign/createCampaign.slice'
import {userActions} from '../../feature/user/user.slice'
import {ROUTE} from '../../router/routes'

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
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(createCampaignActions.getListHashTag())
  }, [dispatch])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setTokenAxios()
      dispatch(userActions.getProfile())
    }
  }, [dispatch])
  const showHeaderSearch = () => {
    const arrayRoute = [
      ROUTE.HOME,
      ROUTE.PRODUCT,
      ROUTE.REPORTERS,
      ROUTE.SERVICE,
      ROUTE.SERVICES,
    ]
    if (arrayRoute.includes(location.pathname)) return <HeaderSearch />
  }
  return (
    <div className={classes.base_layout_container}>
      {showHeaderSearch()}
      {props.children}
    </div>
  )
}

export default BaseLayout
