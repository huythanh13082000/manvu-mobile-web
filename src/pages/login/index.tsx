import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {useState} from 'react'

import {Md5} from 'md5-typescript'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../app/hooks'
import logo from '../../asset/images/logo-menu.png'
import passwordImg from '../../asset/images/password.png'
import userImg from '../../asset/images/user.png'
import InputBase from '../../components/input'
import {authAction} from '../../feature/auth/authSlice'

const useStyles = makeStyles({
  container_login: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '&>div:nth-child(1)': {
      boxSizing: 'border-box',
      width: '511px',
      height: '444px',
      background: '#FFFFFF',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      padding: '56px',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      '&>img': {
        width: '50px',
        height: '55px',
        marginBottom: '1rem',
      },
      '&>div': {
        width: '100%',
        position: 'relative',
        '&>img': {
          width: '40px',
          height: '40px',
          position: 'absolute',
          top: '26.45px',
          left: '1px',
          zIndex: 100,
        },
      },
      '&>span': {
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '36px',
        color: '#000000',
      },
      '&>button': {
        width: '100%',
        height: '48px',
        borderRadius: '6px',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: '1rem 1rem 2rem',
      },
    },
  },
})

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = useState('admin@greenapp.com')
  const [password, setPassword] = useState('123456')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSubmit = () => {
    dispatch(
      authAction.login({
        data: {
          user_email: username,
          user_password: Md5.init(password),
        },
        history: navigate,
      })
    )
  }
  console.log(username)
  return (
    <div className={classes.container_login}>
      <div>
        <img src={logo} alt='' />
        <span>Login to Adminpage</span>
        <div>
          <img src={userImg} alt='' />
          <InputBase
            onChange={(e) => setUsername(e)}
            label=''
            placeholder='Username'
            style={{paddingLeft: '46px'}}
            value={username}
          />
        </div>
        <div>
          <img src={passwordImg} alt='' />
          <InputBase
            style={{paddingLeft: '46px'}}
            onChange={(e) => setPassword(e)}
            label=''
            placeholder='Password'
            type='password'
            value={password}
          />
        </div>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!username || !password ? true : false}
          color='primary'
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login
