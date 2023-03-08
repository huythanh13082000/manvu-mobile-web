import {Button, Grid, TextField} from '@mui/material'
import {useState} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {userActions} from '../../feature/user/user.slice'
import logoIcon from '../../asset/images/logo_login.png'
import AppBarCustom from '../../components/appbar'
import {useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const handleSubmit = () => {
    dispatch(
      userActions.forgotPasswordSendMail({email: email, history: navigate})
    )
  }

  return (
    <Grid container justifyContent='center'>
      <AppBarCustom title='비밀번호찾기' />
      <div style={{padding: '0 1rem'}}>
        <Grid item xs={12} container justifyContent='center'>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              marginTop: '4rem',
            }}
          >
            비밀번호를 잊어버리셨나요?
          </p>
        </Grid>

        <Grid item xs={12} container justifyContent='center'>
          <p
            style={{
              textAlign: 'center',
              fontWeight: 400,
              margin: 0,
            }}
          >
            가입할때 사용한 이메일 주소를 입력하시면 비밀번호 재설정 안내 메일을
            보내드립니다.
          </p>
        </Grid>
        <Grid item xs={12} container justifyContent={'center'}>
          <Grid style={{width: '100%'}}>
            <p className='label-input'>Email</p>
            <TextField
              id='outlined-basic'
              variant='outlined'
              size='small'
              style={{width: '100%'}}
              placeholder='이메일을 입력해주세요.'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent={'center'}
          margin='1.5rem 0'
        >
          <Button
            onClick={handleSubmit}
            style={{
              boxShadow: ' 0px 4px 12px -4px #4C98ED',
              fontSize: '15px',
              width: '100%',
            }}
            variant='contained'
          >
            로그인
          </Button>
        </Grid>
      </div>
    </Grid>
  )
}

export default ForgotPassword
