import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {Button} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import bell from '../../asset/icons/bell.png'
import crownStar from '../../asset/icons/crown_star.png'
import group from '../../asset/icons/group.png'
import heartIcon from '../../asset/icons/heart_icon.png'
import letterUnread from '../../asset/icons/letter_unread.png'
import questionSquare from '../../asset/icons/question_square.png'
import rightIcon from '../../asset/icons/right.png'
import setting from '../../asset/icons/settings.png'
import userIcon from '../../asset/icons/user_circle.png'
import medal from '../../asset/icons/medal_ribbons_ star.png'
import AppBarCustom from '../../components/appbar'
import pointIcon from '../../asset/icons/point_icon.png'
import {IMAGE_URL} from '../../constants'
import {
  myCampaignAdvertiserActions,
  selectAdvertiserCampaignMineCount,
} from '../../feature/my_campaign_advertiser/myCampaignAdvertiser.slice'
import {selectUser} from '../../feature/user/user.slice'
import {ROUTE} from '../../router/routes'
import rightImage from '../../asset/icons/arrow_right.png'
import {numberWithCommas} from '../../utils'

const useStyles = makeStyles({
  service_center_advertiser_container: {
    position: 'relative',
    '&>div:nth-of-type(1)': {
      padding: '0.5rem 1rem',
      '&>div': {
        padding: '1rem',
        display: 'flex',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        alignItems: 'start',
        justifyContent: 'space-between',
        '&>div': {
          '&>span': {
            fontWeight: 400,
            fontSize: '16px',
          },
          '&>p': {
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '42px',
            padding: 0,
          },
        },
      },
    },
    '&>div:nth-of-type(2)': {
      padding: '0 1rem',
      '&>p': {
        fontWeight: 700,
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      '&>span': {
        fontWeight: 400,
        fontSize: '14px',
      },
      '&>div': {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-between',
        margin: '1rem 0',
      },
    },
    '&>div:nth-of-type(3)': {
      padding: '1rem',
      '&>p': {
        display: 'flex',
        justifyContent: 'space-between',
        '&>span': {
          fontWeight: 700,
          fontSize: '16px',
        },
      },
      '&>div': {
        display: 'flex',
        '&>div': {
          width: '20%',
          textAlign: 'center',
          position: 'relative',
          '&>div': {
            fontWeight: 500,
            fontSize: '14px',
          },
          '&>p': {
            position: 'absolute',
            width: '100%',
            top: '-5px',
          },
          '&>img:nth-of-type(2)': {
            position: 'absolute',
            right: 0,
            top: '15px',
          },
        },
      },
    },
    '&>p': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      borderBottom: '1px solid #F6F6F6',
      margin: '0',
      '&>span': {
        display: 'flex',
        alignItem: 'center',
        '&>img': {
          width: '24px',
          height: '24px',
          marginRight: '5px',
        },
        '&>span': {
          fontWeight: 400,
          fontSize: '16px',
        },
      },
    },
    '&>div:nth-of-type(4)': {
      display: 'flex',
      padding: '1rem',
      justifyContent: 'space-between',
      alignItem: 'center',
      background:
        'linear-gradient(270deg, rgba(230, 188, 210, 0.3) 0%, rgba(195, 169, 224, 0.3) 51.1%, rgba(164, 152, 236, 0.3) 100%), #FFFFFF',
      '&>div': {
        display: 'flex',
        '&>img': {
          width: '40px',
          height: '40px',
        },
        '&>div': {
          '&>p': {
            fontWeight: 700,
            padding: 0,
            margin: 0,
          },
          '&>p:nth-of-type(2)': {
            fontWeight: 400,
            fontSize: '14px',
          },
        },
      },
    },
    '&>div:nth-of-type(5)': {
      marginTop: '7rem',
      padding: '1rem',
      background: ' #F4F4F4',
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      '&>button': {
        background: '#FFFFFF',
        border: '0.5px solid #A2A5AA',
        borderRadius: '4px',
        width: '100%',
        color: 'black',
      },
      '&>p': {
        fontWeight: 500,
        fontSize: '14px',
        color: '#252B32',
        textAlign: 'center',
        '&>span': {
          color: '#000000',
          fontWeight: 600,
        },
      },
    },
  },
})

const ServiceCenterAdvertiser = () => {
  const classes = useStyles()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const advertiserCampaignMineCount: any = useAppSelector(
    selectAdvertiserCampaignMineCount
  )
  useEffect(() => {
    dispatch(myCampaignAdvertiserActions.getAdvertiserCampaignMineCount())
  }, [dispatch])
  const renderText = (index: number) => {
    switch (index) {
      case 0:
        return '????????????'
      case 1:
        return '?????????'
      case 2:
        return '????????????'
      case 3:
        return '????????????'
      default:
        break
    }
  }
  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate(ROUTE.LOGIN)
    window.location.reload()
  }
  const navigateSwitch = (index: number) => {
    switch (index) {
      case 0:
        navigate(`${ROUTE.MY_CAMPAIGN_ADVERTISER}/all`)
        break
      case 1:
        navigate(`${ROUTE.MY_CAMPAIGN_ADVERTISER}/in_progress`)
        break
      case 2:
        navigate(`${ROUTE.MY_CAMPAIGN_ADVERTISER}/requesting_update`)
        break
      case 3:
        navigate(`${ROUTE.MY_CAMPAIGN_ADVERTISER}/complete`)
        break
      default:
        break
    }
  }
  return (
    <div className={classes.service_center_advertiser_container}>
      <AppBarCustom
        title={user.profile?.username}
        imageUrl={`${IMAGE_URL}${user.profile?.avatar}`}
      />
      <div></div>
      <div></div>

      <div>
        <p onClick={() => navigate(`${ROUTE.MY_CAMPAIGN_ADVERTISER}/all`)}>
          <span>?????? ?????????</span>
          <img
            src={rightImage}
            alt=''
            style={{width: '24px', height: '24px'}}
          />
        </p>
        <div style={{justifyContent: 'space-between'}}>
          {advertiserCampaignMineCount &&
            Object.keys(advertiserCampaignMineCount).map((key, index) => (
              <div onClick={() => navigateSwitch(index)}>
                <img src={group} alt='' />
                <p>{advertiserCampaignMineCount[`${key}`]}</p>
                <div>{renderText(index)}</div>
                <img src={rightIcon} alt='' />
              </div>
            ))}
        </div>
      </div>
      <div onClick={() => navigate(ROUTE.PAYMENT)}>
        <div>
          <img src={medal} alt='' />
          <div>
            <p>????????????</p>
            <p>????????? ???????????? ????????????</p>
          </div>
        </div>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </div>

      <p onClick={() => navigate(ROUTE.PAYMENT_HISTORY)}>
        <span>
          <img src={pointIcon} alt='' />
          <span style={{fontSize: '16px'}}>
            ????????? ??????(
            <span style={{color: 'violet'}}>
              ?????? ????????? {numberWithCommas(Number(user.profile?.point))}P
            </span>
            )
          </span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      <p onClick={() => navigate(ROUTE.UPDATE_ADVERTISER)}>
        <span>
          <img src={userIcon} alt='' />
          <span>??????????????????</span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>

      <p onClick={() => navigate(ROUTE.CREATE_CAMPAIGN)}>
        <span>
          <img src={crownStar} alt='' />
          <span>????????? ?????? </span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      <p onClick={() => navigate(ROUTE.MY_CAMPAIGN_ADVERTISER)}>
        <span>
          <img src={heartIcon} alt='' />
          <span>????????? ?????? ??? ??????</span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      <p onClick={() => navigate(ROUTE.NOTIFICATION)}>
        <span>
          <img src={bell} alt='' />
          <span>?????? </span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      <p onClick={() => navigate(ROUTE.CHAT)}>
        <span>
          <img src={letterUnread} alt='' />
          <span>1:1??????</span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      <p onClick={() => navigate(ROUTE.FAQ)}>
        <span>
          <img src={questionSquare} alt='' />
          <span>FAQ</span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p>
      {/* <p>
        <span>
          <img src={setting} alt='' />
          <span>????????????</span>
        </span>
        <img src={rightImage} alt='' style={{width: '24px', height: '24px'}} />
      </p> */}
      <div>
        <Button onClick={handleLogout}>???????????? ??????</Button>
        <p>
          <span>?? ????????????</span>. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default ServiceCenterAdvertiser
