import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import logo from '../../asset/images/logo-menu.png'
import passwordImg from '../../asset/images/password.png'
import userImg from '../../asset/images/user.png'
import InputBase from '../../components/input'
import { authAction } from '../../feature/auth/authSlice'

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
          width: '39.5px',
          height: '39.5px',
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
        background: '#0065F2',
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    dispatch(authAction.login({user_email: username, user_password: password}))
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
          />
        </div>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  )
}

export default Login
