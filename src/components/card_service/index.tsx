import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import heartRed from '../../asset/icons/heart_red.png'
import heart from '../../asset/icons/heart.png'
import userJoin from '../../asset/icons/icon_user_join.png'
import userIcon from '../../asset/icons/icon_user.png'
import {COLOR, MEDIA_IMAGE_URL} from '../../constants'
import {useNavigate} from 'react-router-dom'
import {Campaign} from '../../types/campaign.type'
import {FILE_API} from '../../apis/urlConfig'
import {numberWithCommas, timeSpace} from '../../utils'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {cardActions} from '../../feature/card/card.slice'
import {selectUser} from '../../feature/user/user.slice'

const useStyles = makeStyles({
  card_service_container: {
    width: '100%',
    padding: '0.5rem',
    position: 'relative',
    '&>div:nth-of-type(1)': {
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      '&>div:nth-of-type(1)': {
        position: 'relative',
        width: '32%',
        '&>img:nth-child(1)': {
          width: '100%',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '8px',
        },
        '&>img:nth-child(2)': {
          width: '23px',
          height: '23px',
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 4000,
        },
        '&>span': {
          background: 'rgba(204, 204, 204, 0.7)',
          borderRadius: '3px',
          padding: '2px 6px',
          fontWeight: 400,
          fontSize: '10px',
          color: 'white',
          position: 'absolute',
          bottom: '1.7rem',
          right: '0.5rem',
        },
      },
      '&>div:nth-of-type(2)': {
        width: '66%',
        '&>div:nth-of-type(1)': {
          display: 'flex',
          paddingBottom: '0.5rem',
          justifyContent: 'space-between',
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
          fontWeight: 500,
          fontSize: '15px',
          margin: '5px 0',
        },
        '&>p:nth-of-type(2)': {
          fontWeight: 400,
          fontSize: '13px',
          lineHeight: '20px',
          color: '#888888',
          margin: '5px 0',
        },
        '&>div:nth-of-type(2)': {
          display: 'flex',
          justifyContent: 'space-between',
          '&>span': {
            background: '#747DFE',
            borderRadius: '3px',
            padding: '2px 6px',
            fontWeight: 500,
            fontSize: '10px',
            color: '#FFFFFF',
            lineHeight: '14px',
            display: 'flex',
            alignItems: 'center',
          },
          '&>div': {
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
        '&>div:nth-of-type(3)': {
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
      },
    },
    '&>img': {
      width: '23px',
      height: '23px',
      position: 'absolute',
      top: '1rem',
      left: '8em',
      zIndex: 4000,
    },
  },
})

const CardService = (props: {data: Campaign}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const listHashTag = useAppSelector(selectListHashTag)
  const [heartActive, setHeartActive] = useState(false)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  useEffect(() => {
    props.data.interactive ? setHeartActive(true) : setHeartActive(false)
  }, [props.data.interactive])
  return (
    <div className={classes.card_service_container}>
      <div onClick={() => navigate('/campaign_detail/' + props.data.id)}>
        <div>
          <img
            src={
              props.data?.images?.length === 0
                ? '/img/Sell-Your-Product.png'
                : `${FILE_API}${props.data?.images && props.data?.images[0]}`
            }
            alt=''
          />

          {props.data.distance && (
            <span className='cardService-span23'>
              {Math.ceil(Number(props.data.distance))}km
            </span>
          )}
        </div>
        <div>
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
            <span>{numberWithCommas(props.data.point)}P</span>
            <div>
              <span>
                <img src={userJoin} alt='' />
                신청{' '}
                {Number(props.data.numberOfParticipants) +
                  Number(props.data.members.length)}
              </span>
              <span>
                &nbsp;/&nbsp;
                <img src={userIcon} alt='' />
                모집{props.data.numberOfRecruit}
              </span>
            </div>
          </div>
          <div>
            {listHashTag?.map((item) => {
              if (props.data?.tags.includes(item.id))
                return <span>{item.text}</span>
              else return null
            })}
          </div>
        </div>
      </div>
      <img
        src={heartActive ? heartRed : heart}
        alt=''
        onClick={() => {
          if (heartActive) {
            setHeartActive(false)
            if (
              user.profile?.roles &&
              user.profile?.roles[0] &&
              user.profile?.roles[0].name === 'member' &&
              props.data?.id
            )
              dispatch(cardActions.postMemberCampaignUnLike(props.data?.id))
            else if (
              user.profile?.roles &&
              user.profile?.roles[0] &&
              user.profile?.roles[0].name === 'advertiser' &&
              props.data?.id
            )
              dispatch(cardActions.postAdvertiserCampaignUnLike(props.data?.id))
          } else {
            setHeartActive(true)
            if (
              user.profile?.roles &&
              user.profile?.roles[0] &&
              user.profile?.roles[0].name === 'member' &&
              props.data?.id
            )
              dispatch(cardActions.postMemberCampaignLike(props.data?.id))
            else if (
              user.profile?.roles &&
              user.profile?.roles[0] &&
              user.profile?.roles[0].name === 'advertiser' &&
              props.data?.id
            )
              dispatch(cardActions.postAdvertiserCampaignLike(props.data?.id))
          }
        }}
      />
    </div>
  )
}

export default CardService
