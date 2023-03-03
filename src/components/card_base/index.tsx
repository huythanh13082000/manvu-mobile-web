import React, {useState} from 'react'
import {makeStyles} from '@mui/styles'
import heartRed from '../../asset/icons/heart_red.png'
import heart from '../../asset/icons/heart.png'
import userJoin from '../../asset/icons/icon_user_join.png'
import user from '../../asset/icons/icon_user.png'
import {COLOR, MEDIA_IMAGE_URL} from '../../constants'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  card_base_container: {
    width: '50%',
    margin: '0.5rem',
    '&>div': {
      position: 'relative',
      '&>img:nth-child(1)': {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
      },
      '&>img:nth-child(2)': {
        width: '23px',
        height: '23px',
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
      },
    },
    '&>div:nth-child(2)': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '0.5rem',
      borderBottom: `0.5px solid ${COLOR.border}`,
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        '&>img': {
          width: '24px',
          height: '24px',
          marginRight: '5px',
        },
        '&>span': {
          width: '59px',
          height: '25px',
          background: '#ECECEC',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
        },
      },
      '&>span': {
        width: '68px',
        height: '25px',
        background: '#747FFF',
        borderRadius: '12px',
        fontSize: '13px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    '&>p:nth-of-type(1)': {
      fontWeight: 400,
      fontSize: '14px',
      margin: '0',
    },
    '&>p:nth-of-type(2)': {
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '20px',
      color: '#888888',
      margin: '0',
    },
    '&>div:nth-of-type(3)': {
      border: '1px solid #747FFF',
      borderRadius: '5px',
      width: '82px',
      height: '19px',
      display: 'flex',
      alignItem: 'center',
      background: '#747FFF',
      '&>span:nth-child(1)': {
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '14px',
        background: '#747FFF',
        width: '32%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5px',
      },
      '&>span:nth-child(2)': {
        fontSize: '12px',
        color: '#747FFF',
        textAlign: 'center',
        width: '68%',
        background: 'white',
        borderRadius: '2px',
      },
    },
    '&>div:nth-of-type(4)': {
      margin: '5px 0',
      width: '100%',
      '&>span': {
        boxSizing: 'border-box',
        width: '40px',
        height: '19px',
        background: '#F4F4F4',
        borderRadius: '3px',
        fontWeight: 400,
        fontSize: '10px',
        padding: '2.5px 6px',
        marginRight: '5px',
      },
    },
    '&>div:nth-of-type(5)': {
      display: 'flex',
      '&>span': {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 400,
        fontSize: '11px',
        '&>img': {
          width: '10px',
        },
      },
      '&>span:nth-child(1)': {
        color: '#747FFF',
      },
      '&>span:nth-child(2)': {
        color: '#888888',
      },
    },
  },
})

const CardBase = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [heartActive, setHeartActive] = useState(false)
  return (
    <div
      className={classes.card_base_container}
      onClick={() => navigate(ROUTE.CAMPAIGN_DETAIL)}
    >
      <div>
        <img
          src='https://i.ytimg.com/vi/HDd0PDNGFoM/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVPKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLBNHi5gDlUbC0TKgTM4yJm5_arfNA'
          alt=''
        />
        <img
          src={heartActive ? heartRed : heart}
          alt=''
          onClick={() => setHeartActive(!heartActive)}
        />
      </div>
      <div>
        <div>
          <img src={MEDIA_IMAGE_URL.blog_naver} alt='' />
          <span>배송형</span>
        </div>
        <span>3일남음</span>
      </div>
      <p>[루치펠로] 맞집, 치약&가글 6종 세트입니다.</p>
      <p>치약&가능 6종 세트입니다.</p>
      <div>
        <span>p</span>
        <span>50,000P</span>
      </div>
      <div>
        <span>배송형</span>
        <span>포인트</span>
        <span>배송형</span>
      </div>
      <div>
        <span>
          <img src={userJoin} alt='' />
          신청 225
        </span>
        <span>
          &nbsp;/&nbsp;
          <img src={user} alt='' />
          모집4
        </span>
      </div>
    </div>
  )
}

export default CardBase
