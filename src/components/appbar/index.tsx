import WestIcon from '@mui/icons-material/West'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import {useNavigate} from 'react-router-dom'

const AppBarCustom = (props: {
  title: string
  goBack?: () => void
  iconRightUrl?: string
  imageUrl?: string
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
            />
          )}
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarCustom
