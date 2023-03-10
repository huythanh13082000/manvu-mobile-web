import WestIcon from '@mui/icons-material/West'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setTokenAxios } from '../../apis/axiosClient'
import { useAppSelector } from '../../app/hooks'
import noAvatar from '../../asset/images/no_image.png'
import { selectUser } from '../../feature/user/user.slice'
import { ROUTE } from '../../router/routes'

const AppBarCustom = (props: {
  title?: string
  goBack?: () => void
  iconRightUrl?: string
  imageUrl?: string
  onClickRightIcon?: () => void
  buttonRight?: string
}) => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const routeAvatar = () => {
    user.profile &&
    user.profile?.roles &&
    user.profile?.roles.find((item) => item.name === 'advertiser')
      ? navigate(ROUTE.UPDATE_ADVERTISER)
      : navigate(ROUTE.UPDATE_MEMBER)
  }
  useEffect(() => {
    setTokenAxios()
  }, [])
  return (
    <AppBar position='static'>
      <Toolbar>
        <span
          onClick={() => {
            props.goBack ? props.goBack() : navigate(-1)
          }}
        >
          <WestIcon />
        </span>
        <p>{props.title}</p>

        <span>
          {props.iconRightUrl && (
            <img
              style={{width: '24px', height: '24px'}}
              src={props.iconRightUrl}
              alt=''
            />
          )}
          {props.buttonRight && (
            <img
              src={props.buttonRight}
              alt=''
              onClick={() => props.onClickRightIcon && props.onClickRightIcon()}
            />
          )}
          {props.imageUrl && (
            <img
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={!props.imageUrl.includes('null') ? props.imageUrl : noAvatar}
              alt=''
              onClick={routeAvatar}
            />
          )}
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarCustom
