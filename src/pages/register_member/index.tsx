import {makeStyles} from '@mui/styles'
import React from 'react'
import AppBarCustom from '../../components/appbar'
import UploadAvatar from '../../components/upload_avatar'

const useStyles = makeStyles({
  register_member_container: {
    '&>div': {
      padding: '1rem',
      '&>div': {
        '&>label': {
          fontWeight: 700,
        },
      },
    },
  },
})

const RegisterMember = () => {
  const classes = useStyles()
  return (
    <div className={classes.register_member_container}>
      <AppBarCustom title='체험단 회원가입' />
      <div>
        <div>
          <label htmlFor=''>프로필 이미지</label>
          <UploadAvatar />
        </div>
      </div>
    </div>
  )
}

export default RegisterMember
