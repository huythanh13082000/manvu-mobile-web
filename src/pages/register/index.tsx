import {makeStyles} from '@mui/styles'
import React from 'react'
import AppBarCustom from '../../components/appbar'
import member from '../../asset/icons/member.png'
import advertiser from '../../asset/icons/advertiser.png'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'
import {useAppSelector} from '../../app/hooks'
import {selectSnsUserInfor} from '../../feature/auth/auth.slice'

const useStyles = makeStyles({
  register_container: {
    '&>div': {
      padding: '2rem',
      '&>p': {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#999999',
      },
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 2rem',
        background: '#FFFFFF',
        boxShadow: '0px 8px 26px rgba(12, 10, 61, 0.06)',
        margin: '1rem',
        '&>div': {
          marginLeft: '8px',
          '&>p:nth-child(1)': {
            fontWeight: 700,
            fontSize: '18px',
            margin: '0',
          },
          '&>p:nth-child(2)': {
            fontWeight: 400,
            fontSize: '12px',
            margin: '0',
          },
        },
      },
    },
  },
})

const Register = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const userSns = useAppSelector(selectSnsUserInfor)
  const handleSubmit = () => {
    userSns
      ? navigate(`${ROUTE.RESISTER_MEMBER}/sns`)
      : navigate(ROUTE.RESISTER_MEMBER)
  }
  const handleSubmitAdvertiser = () => {
    userSns
      ? navigate(`${ROUTE.RESISTER_ADVERTISER}/sns`)
      : navigate(ROUTE.RESISTER_ADVERTISER)
  }

  return (
    <div className={classes.register_container}>
      <AppBarCustom title='회원가입' />
      <div>
        <p>회원가입 종류를 선택해주세요.</p>
        <div onClick={handleSubmit}>
          <img src={member} alt='' />
          <div>
            <p>체험단 회원가입</p>
            <p>바로가기</p>
          </div>
        </div>
        <div onClick={handleSubmitAdvertiser}>
          <img src={advertiser} alt='' />
          <div>
            <p>광고주 회원가입</p>
            <p>바로가기</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
