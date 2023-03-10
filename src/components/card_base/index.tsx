import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FILE_API} from '../../apis/urlConfig'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import heart from '../../asset/icons/heart.png'
import heartRed from '../../asset/icons/heart_red.png'
import userImage from '../../asset/icons/icon_user.png'
import userJoin from '../../asset/icons/icon_user_join.png'
import {COLOR, MEDIA_IMAGE_URL} from '../../constants'
import {cardActions} from '../../feature/card/card.slice'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {selectUser} from '../../feature/user/user.slice'
import {Campaign} from '../../types/campaign.type'
import {numberWithCommas, timeSpace} from '../../utils'

const useStyles = makeStyles({
  card_base_container: {
    width: '50%',
    padding: '0.5rem',
    boxSizing: 'border-box',
    position: 'relative',
    '&>div': {
      '&>div': {
        position: 'relative',
        '&>img:nth-child(1)': {
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '8px',
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
        width: '100%',
        margin: 'auto',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scrollSnapType: 'x',
        display: 'flex',
        '&>div': {
          height: '19px',
          background: '#F4F4F4',
          borderRadius: '3px',
          fontWeight: 400,
          fontSize: '12px',
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
    '&>img': {
      width: '23px',
      height: '23px',
      position: 'absolute',
      top: '8rem',
      right: '1rem',
    },
  },
})

const CardBase = (props: {data: Campaign; style?: React.CSSProperties}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const listHashTag = useAppSelector(selectListHashTag)
  const [heartActive, setHeartActive] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  useEffect(() => {
    props.data.interactive ? setHeartActive(true) : setHeartActive(false)
  }, [props.data.interactive])
  return (
    <div className={classes.card_base_container} style={{...props.style}}>
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
              return <div>{item.text}</div>
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
            <img src={userImage} alt='' />
            모집{props.data.numberOfRecruit}
          </span>
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

export default CardBase
