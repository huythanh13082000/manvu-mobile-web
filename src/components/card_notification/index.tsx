import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import DoneIcon from '@mui/icons-material/Done'
import {Grid, Menu, MenuItem} from '@mui/material'
import {makeStyles} from '@mui/styles'
import moment from 'moment'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../app/hooks'
import {inappNotificationActions} from '../../feature/notification/inappNotificationSlice'
import {tabActions} from '../../feature/tab/tab.slice'
import {InappNotification} from '../../types/InappNotification.type'

import logo from '../../asset/images/logo_login.png'
import moreIcon from '../../asset/icons/more_vertical.png'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  card_notification_container: {
    '& .MuiButtonBase-root': {
      height: '20px',
    },
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(39, 39, 39, 0.16)',
    padding: '0 2rem',
    justifyContent: 'space-between',
    '&>span': {
      width: '90%',
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
    },
  },
})

const CardInappNotification = (props: {item?: InappNotification}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const dispatch = useAppDispatch()
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <Grid
      className={classes.card_notification_container}
      bgcolor={props.item?.status === 1 ? '' : 'rgba(0, 101, 242, 0.16)'}
    >
      <span
        onClick={() => {
          if (!props.item?.campaignId) {
            if (props.item?.id)
              dispatch(
                inappNotificationActions.updateInappNotification({
                  id: props.item?.id,
                  status: 1,
                })
              )
            dispatch(tabActions.activeTabPointManagement(2))
            navigate(ROUTE.POINT_MANAGEMENT)
          } else {
            if (props.item?.id)
              dispatch(
                inappNotificationActions.updateInappNotification({
                  id: props.item?.id,
                  status: 1,
                })
              )
            navigate(`${ROUTE.CAMPAIGN_DETAIL}/${props.item.campaignId}`)
          }
        }}
      >
        <Grid marginRight='1rem'>
          <img src={logo} alt='logo' style={{width: '54px', height: '54px'}} />
        </Grid>
        <Grid item xs={9}>
          <p style={{fontWeight: 500, fontSize: '16px', margin: 0}}>
            {props.item?.title}
          </p>
          <p
            style={{
              fontWeight: 400,
              fontSize: '12px',
              color: '#4D4D4D',
              margin: 0,
            }}
          >
            {moment(props.item?.createdAt).format('hh:mm a DD/MM/YYYY')}
          </p>
        </Grid>
      </span>
      <Grid item xs={1}>
        <img
          src={moreIcon}
          alt='more'
          onClick={handleClick}
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '4px',
          }}
        />
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {props.item?.status === 1 ? (
            <MenuItem
              style={{height: '30px'}}
              onClick={() => {
                if (props.item?.id)
                  dispatch(
                    inappNotificationActions.updateInappNotification({
                      id: props.item?.id,
                      status: 0,
                    })
                  )
                handleClose()
              }}
            >
              <DoneIcon /> <p>읽지 않은 상태로 표시</p>
            </MenuItem>
          ) : null}

          <MenuItem
            style={{height: '30px'}}
            onClick={() => {
              if (props.item?.id) {
                dispatch(
                  inappNotificationActions.deleteInappNotification(
                    props.item?.id
                  )
                )
              }
              handleClose()
            }}
          >
            <DeleteForeverOutlinedIcon /> <p>알림 삭제</p>
          </MenuItem>
          <MenuItem
            style={{height: '30px'}}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseOutlinedIcon /> <p>취소</p>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

export default CardInappNotification
