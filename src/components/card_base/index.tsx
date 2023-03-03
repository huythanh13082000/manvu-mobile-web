import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import heartRed from '../../asset/icons/heart_red.png'
import heart from '../../asset/icons/heart.png'
import userJoin from '../../asset/icons/icon_user_join.png'
import user from '../../asset/icons/icon_user.png'
import {COLOR, MEDIA_IMAGE_URL} from '../../constants'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'
import {Campaign} from '../../types/campaign.type'
import {FILE_API} from '../../apis/urlConfig'
import {numberWithCommas, timeSpace} from '../../utils'
import {useAppSelector} from '../../app/hooks'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'

const useStyles = makeStyles({
  card_base_container: {
    width: '50%',
    padding: '0.5rem',
    boxSizing: 'border-box',
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

const CardBase = (props: {data: Campaign}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const listHashTag = useAppSelector(selectListHashTag)
  const [heartActive, setHeartActive] = useState(false)
  useEffect(() => {
    props.data.interactive ? setHeartActive(true) : setHeartActive(false)
  }, [props.data.interactive])
  return (
    <div
      className={classes.card_base_container}
      onClick={() => navigate('/campaign_detail/' + props.data.id)}
    >
      <div>
        <img
          src={
            props.data?.images?.length === 0
              ? '/img/Sell-Your-Product.png'
              : `${FILE_API}${props.data?.images && props.data?.images[0]}`
          }
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
          <img src={MEDIA_IMAGE_URL[`${props.data.media}`]} alt='' />
          {props.data.applications.text && (
            <span style={{color: props.data.applications.color}}>
              {props.data.applications.text}
            </span>
          )}
        </div>
        <span>
          {props.data.campaignRegistrationDateTo &&
            timeSpace(props.data.campaignRegistrationDateTo)}
          일남음
        </span>
      </div>
      <p> {props.data.name}</p>
      <p>{props.data.shortDescription}</p>
      <div>
        <span>p</span>
        <span>{numberWithCommas(props.data.point)}P</span>
      </div>
      <div>
        {listHashTag?.map((item) => {
          if (props.data?.tags.includes(item.id))
            return <span>{item.text}</span>
          else return null
        })}
      </div>
      <div>
        <span>
          <img src={userJoin} alt='' />
          신청{' '}
          {Number(props.data.numberOfParticipants) +
            Number(props.data.members.length)}
        </span>
        <span>
          &nbsp;/&nbsp;
          <img src={user} alt='' />
          모집{props.data.numberOfRecruit}
        </span>
      </div>
    </div>
  )
}

export default CardBase
