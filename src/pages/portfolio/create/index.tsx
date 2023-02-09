import React from 'react'
import {makeStyles} from '@mui/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InputBase from '../../../components/input'
import UploadAvatar from '../../../components/upload_avatar'
import UploadImages from '../../../components/upload_images'
import {useNavigate} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  container_create_portfolio: {
    '&>div:nth-child(1)': {
      filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12))',
      borderRadius: '12px',
      width: '50%',
      background: 'white',
      margin: '20px auto 16px',
      '&>div:nth-child(1)': {
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItem: 'center',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '27px',
        color: '#13191D',
        background: '#F1F5F9',
        padding: '0.6rem 1rem',
        '&>span': {
          marginRight: '1rem',
        },
      },
      '&>div:nth-child(2)': {
        padding: '1rem',
        '&>div': {
          '&>p': {
            marginBottom: '10px',
            marginTop: '10px',
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '27px',
            color: '#1F293',
          },
        },
      },
      '&>div:nth-child(3)': {
        textAlign: 'center',
        '&>button': {
          width: '120px',
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
  },
})

const CreatePortfolio = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <div className={classes.container_create_portfolio}>
      <div>
        <div>
          <span onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </span>
          Add New Project
        </div>
        <div>
          <div>
            <p>로고 업로드</p>
            <UploadAvatar />
          </div>
          <InputBase
            onChange={() => console.log(1)}
            label='제목'
            placeholder='입력하십시오'
          />
          <InputBase
            onChange={() => console.log(1)}
            label='개발언어'
            placeholder='입력하십시오'
          />
          <InputBase
            onChange={() => console.log(1)}
            label='소개 및 내용'
            placeholder='입력하십시오'
          />
          <div>
            <p>이미지 업로드</p>
            <UploadImages />
          </div>
        </div>
        <div>
          <Button>완료</Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePortfolio
