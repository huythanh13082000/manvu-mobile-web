import WestIcon from '@mui/icons-material/West'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'

const AppBarCustom = (props: {
  title: string
  goBack?: () => void
  iconRightUrl?: string
  imageUrl?: string
  onClickRightIcon?: () => void
  buttonRight?: string
}) => {
  const navigate = useNavigate()
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
              src={props.imageUrl}
              alt=''
              onClick={() => navigate(ROUTE.UPDATE_MEMBER)}
            />
          )}
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarCustom
