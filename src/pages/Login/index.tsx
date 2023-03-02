import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import CloseIcon from '@mui/icons-material/Close'
import logo from '../../asset/images/logo_login.png'
import InputBase from '../../components/input'
import mail from '../../asset/images/mail.png'
import lock from '../../asset/images/lock.png'
import lineLeft from '../../asset/images/line_left.png'
import lineRight from '../../asset/images/line_right.png'
import {Checkbox, FormControlLabel, FormGroup, Button} from '@mui/material'
import CardLoginSns from '../../components/card_login_sns'
import naver from '../../asset/images/naver_login.png'
import kakaoTalk from '../../asset/images/kakaotalk_login.png'
import google from '../../asset/images/google_login.png'
import facebook from '../../asset/images/facebook_login.png'
import apple from '../../asset/images/apple_login.png'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  login_container: {
    padding: '1rem',
    '& .MuiFormControlLabel-label': {
      fontFamily: 'Noto Sans KR',
    },
    '&>div:nth-child(1)': {
      textAlign: 'end',
    },
    '&>div:nth-child(2)': {
      textAlign: 'center',
      '&>img': {
        width: '50px',
        height: '50px',
      },
      '&> p:nth-of-type(2)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
      },
      '&> button': {
        width: '100%',
        background: '#7977FD',
      },
    },
    '&>div:nth-child(3)': {
      textAlign: 'center',
      '&>p': {
        margin: '20px 0',
        fontWeight: 400,
        fontSize: '14px',
        color: '#4A4F55',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&>span': {
          margin: '0 1rem',
        },
        '&>img': {
          width: '30%',
        },
      },
      '&>span': {
        height: '32px',
        border: '0.5px solid #A2A5AA',
        borderRadius: '100px',
        padding: '4px 24px',
        marginTop: '2rem',
        display: 'inline-block',
        boxSizing: 'border-box',
        cursor: 'pointer',
      },
    },
  },
})

const Login = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <div className={classes.login_container}>
      <div>
        <span onClick={() => navigate(ROUTE.HOME)}>
          <CloseIcon />
        </span>
      </div>
      <div>
        <img src={logo} alt='' />
        <p>리뷰팡팡에 오신걸 환영합니다 ^^</p>
        <InputBase
          onChange={(e: any) => console.log(111)}
          placeholder='아이디를 이메일 형식으로 입력해주세요.'
          type='text'
          iconLeftUrl={mail}
        />
        <InputBase
          onChange={(e: any) => console.log(111)}
          placeholder='비밀번호를 입력해주세요.'
          type='password'
          iconLeftUrl={lock}
        />
        <p>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label='자동로그인'
            />
          </FormGroup>
          <span>비밀번호찾기</span>
        </p>
        <Button variant='contained'>로그인</Button>
      </div>
      <div>
        <p>
          <img src={lineLeft} alt='' />
          <span>또는 SNS</span>
          <img src={lineRight} alt='' />
        </p>
        <CardLoginSns iconUrl={naver} text='네이버로 로그인' />
        <CardLoginSns iconUrl={kakaoTalk} text='카카오로 로그인' />
        <CardLoginSns iconUrl={google} text='구글로 로그인' />
        <CardLoginSns iconUrl={facebook} text='페이스북으로 로그인' />
        <CardLoginSns iconUrl={apple} text='Apple로 로그인' />

        <span>회원가입</span>
      </div>
    </div>
  )
}

export default Login
