import React, {useState, useEffect} from 'react'
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
import {auth} from '../../firebaseConfig'
import KakaoLogin from 'react-kakao-login'
import NaverLogin from 'react-login-by-naver'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  authActions,
  selectCurrentUser,
  selectloginFail,
  selectLoginMessage,
  selectLoginSns,
} from '../../feature/auth/auth.slice'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth'
import {KAKAO_TALK_TOKEN, LOGIN_TYPE} from '../../constants'
import {NaverUser} from '../../types/naverUser.type'
import {KakaoData} from '../../types/kakaoData.type'

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
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const currentUser = useAppSelector(selectCurrentUser)
  const loginMessage = useAppSelector(selectLoginMessage)
  const loginSns = useAppSelector(selectLoginSns)
  const loginFail = useAppSelector(selectloginFail)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  const providerGoogle = new GoogleAuthProvider()
  const providerFaceBook = new FacebookAuthProvider()

  const signInGoogle = async () => {
    await signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        if (user.providerData[0].email && user.providerData[0].photoURL) {
          dispatch(
            authActions.loginSns({
              loginType: LOGIN_TYPE.GOOGLE,
              snsLoginId: user.providerData[0].uid,
              snsEmail: user.providerData[0].email,
              photoURL: user.providerData[0].photoURL,
              history: navigate,
            })
          )
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)

        // ...
      })
  }
  const signInFaceBook = async () => {
    await signInWithPopup(auth, providerFaceBook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result)
        const accessToken = credential?.accessToken
        if (user.providerData[0].email && user.providerData[0].photoURL) {
          dispatch(
            authActions.loginSns({
              loginType: LOGIN_TYPE.FACEBOOK,
              snsLoginId: user.providerData[0].uid,
              snsEmail: user.providerData[0].email,
              photoURL: user.providerData[0].photoURL,
              history: navigate,
            })
          )
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error)
        // ...
      })
  }
  const signInNaver = (naverUser: NaverUser) => {
    dispatch(
      authActions.loginSns({
        loginType: LOGIN_TYPE.NAVER,
        snsLoginId: naverUser.id,
        snsEmail: naverUser.email,
        photoURL: naverUser.profile_image,
        history: navigate,
      })
    )
  }
  const signInKakaoTalk = (kakaoData: KakaoData) => {
    if (kakaoData.profile) {
      dispatch(
        authActions.loginSns({
          loginType: LOGIN_TYPE.KAKAO_TALK,
          snsLoginId: kakaoData.profile.id.toString(),
          snsEmail: kakaoData.profile.kakao_account.email,
          history: navigate,
        })
      )
    }
  }

  const handleSubmit = async () => {
    dispatch(
      authActions.login({
        username: username,
        password: password,
        history: navigate,
      })
    )
  }
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
          onChange={(e: any) => setUsername(e)}
          placeholder='아이디를 이메일 형식으로 입력해주세요.'
          type='text'
          iconLeftUrl={mail}
        />
        <InputBase
          onChange={(e: any) => setPassword(e)}
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
          <span onClick={() => navigate(ROUTE.FORGOT_PASSWORD)}>
            비밀번호찾기
          </span>
        </p>
        <Button variant='contained' onClick={handleSubmit}>
          로그인
        </Button>
      </div>
      <div>
        <p>
          <img src={lineLeft} alt='' />
          <span>또는 SNS</span>
          <img src={lineRight} alt='' />
        </p>
        {window.location.href.includes('login') && (
          <NaverLogin
            clientId='snV4rWk1rnPhdd68jcJZ'
            callbackUrl={window.location.href}
            render={(props) => (
              <div onClick={props.onClick}>
                <CardLoginSns iconUrl={naver} text='네이버로 로그인' />
              </div>
            )}
            onSuccess={(naverUser) => signInNaver(naverUser)}
            onFailure={() => console.log(111)}
          />
        )}
        <KakaoLogin
          token={KAKAO_TALK_TOKEN}
          onSuccess={(kakaoData) => signInKakaoTalk(kakaoData)}
          onFail={console.error}
          onLogout={console.info}
          style={{width: '100%', border: 'none', padding: 0}}
        >
          <CardLoginSns
            iconUrl={kakaoTalk}
            text='카카오로 로그인'
            style={{margin: 0}}
          />
        </KakaoLogin>

        <div onClick={() => signInGoogle()}>
          <CardLoginSns iconUrl={google} text='구글로 로그인' />
        </div>
        <div onClick={() => signInFaceBook()}>
          <CardLoginSns iconUrl={facebook} text='페이스북으로 로그인' />
        </div>
        {/* <CardLoginSns iconUrl={apple} text='Apple로 로그인' /> */}

        <span onClick={() => navigate(ROUTE.TERMS_OF_USE)}>회원가입</span>
      </div>
    </div>
  )
}

export default Login
