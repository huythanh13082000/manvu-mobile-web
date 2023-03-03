import {makeStyles} from '@mui/styles'
import React, {ReactNode, useEffect} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {createCampaignActions} from '../../feature/create_campaign/createCampaign.slice'
import { userActions } from '../../feature/user/user.slice'

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
  useEffect(() => {
    dispatch(createCampaignActions.getListHashTag())
  }, [dispatch])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.getProfile())
    }
  }, [dispatch])
  return <div className={classes.base_layout_container}>{props.children}</div>
}

export default BaseLayout
