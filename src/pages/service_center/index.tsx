import {makeStyles} from '@mui/styles'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import {IMAGE_URL} from '../../constants'
import {selectUser} from '../../feature/user/user.slice'
import arrowBig from '../../asset/icons/arrow_big.png'
import buttomImage from '../../asset/icons/button.png'
import noteIcon from '../../asset/icons/note.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {numberWithCommas} from '../../utils'
import NaverIcon from '../../asset/icons_component/naver'
import YoutubeIcon from '../../asset/icons_component/youtube'
import FacebookIcon from '../../asset/icons_component/facebook'
import InstagramIcon from '../../asset/icons_component/instagram'
import TwitterIcon from '../../asset/icons_component/twitter'
import TiktokIcon from '../../asset/icons_component/tiktok'
import userIcon from '../../asset/icons/user_circle.png'
import heartIcon from '../../asset/icons/heart_icon.png'
import crownStar from '../../asset/icons/crown_star.png'
import bell from '../../asset/icons/bell.png'
import letterUnread from '../../asset/icons/letter_unread.png'
import questionSquare from '../../asset/icons/question_square.png'
import setting from '../../asset/icons/settings.png'
import group from '../../asset/icons/group.png'
import rightIcon from '../../asset/icons/right.png'
import {useEffect} from 'react'
import {
  myCampaignActions,
  selectMemberCampaignMineCount,
} from '../../feature/my_campaign/myCampaign.slice'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  service_center_container: {
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
      padding: '1rem',
      background: ' #F4F4F4',
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

const ServiceCenter = () => {
  const classes = useStyles()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const memberCampaignMineCount: any = useAppSelector(
    selectMemberCampaignMineCount
  )
  useEffect(() => {
    dispatch(myCampaignActions.getMemberCampaignMineCount())
  }, [dispatch])
  const renderText = (index: number) => {
    switch (index) {
      case 0:
        return '신청'
      case 1:
        return '선정'
      case 2:
        return '수정'
      case 3:
        return '등록 '
      case 4:
        return '종료'
      default:
        break
    }
  }
  console.log('member', memberCampaignMineCount)
  return (
    <div className={classes.service_center_container}>
      <AppBarCustom
        title='강기연님'
        imageUrl={`${IMAGE_URL}${user.profile?.avatar}`}
      />
      <div>
        <div>
          <div>
            <span>현재 나의 포인트</span>
            <p>{numberWithCommas(Number(user.profile?.point))} P</p>
            <img
              src={buttomImage}
              alt=''
              onClick={() => navigate(ROUTE.POINT_MANAGEMENT)}
            />
            <span>
              <img
                src={noteIcon}
                alt=''
                style={{margin: '0 0 0.5rem 0.5rem'}}
              />
            </span>
          </div>
          <img src={arrowBig} alt='' style={{width: '130px'}} />
        </div>
      </div>
      <div>
        <p
          style={{display: 'flex'}}
          onClick={() => navigate(ROUTE.UPDATE_MEMBER)}
        >
          <span>SNS채널 연결 상태</span> <ArrowForwardIosIcon />
        </p>
        <span>연결한 SNS채널은 표기가 됩니다.</span>
        <div>
          <NaverIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.blog_naver)
                .length > 0
                ? '#00C73C'
                : '#999999'
            }
          />
          <FacebookIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.facebook)
                .length > 0
                ? '#0062E0'
                : '#999999'
            }
          />
          <YoutubeIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.youtube)
                .length > 0
                ? '#FF0000'
                : '#999999'
            }
          />
          <InstagramIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.instagram)
                .length > 0
                ? '#FF0000'
                : '#999999'
            }
          />
          <TwitterIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.twitter)
                .length > 0
                ? '#0CA8F6'
                : '#999999'
            }
          />
          <TiktokIcon
            color={
              user &&
              user.profile &&
              user.profile?.snsLinks.filter((item: any) => item.tiktok).length >
                0
                ? '#000000'
                : '#999999'
            }
          />
        </div>
      </div>

      <div>
        <p onClick={() => navigate(ROUTE.MY_CAMPAIGN)}>
          <span>나의 캠페인</span>
          <ArrowForwardIosIcon />
        </p>
        <div>
          {memberCampaignMineCount &&
            Object.keys(memberCampaignMineCount).map((key, index) => (
              <div>
                <img src={group} alt='' />
                <p>{memberCampaignMineCount[`${key}`]}</p>
                <div>{renderText(index)}</div>
                <img src={rightIcon} alt='' />
              </div>
            ))}
        </div>
      </div>

      <p onClick={() => navigate(ROUTE.UPDATE_MEMBER)}>
        <span>
          <img src={userIcon} alt='' />
          <span>개인정보수정</span>
        </span>
        <ArrowForwardIosIcon />
      </p>

      <p onClick={() => navigate(ROUTE.CAMPAIGN_FAVOURITE)}>
        <span>
          <img src={heartIcon} alt='' />
          <span>찜 목록 </span>
        </span>
        <ArrowForwardIosIcon />
      </p>

      <p onClick={() => navigate(ROUTE.POINT_MANAGEMENT)}>
        <span>
          <img src={crownStar} alt='' />
          <span>포인트 관리 </span>
        </span>
        <ArrowForwardIosIcon />
      </p>

      <p onClick={() => navigate(ROUTE.NOTIFICATION)}>
        <span>
          <img src={bell} alt='' />
          <span>알림 </span>
        </span>
        <ArrowForwardIosIcon />
      </p>
      <p onClick={() => navigate(ROUTE.CHAT)}>
        <span>
          <img src={letterUnread} alt='' />
          <span>1:1문의</span>
        </span>
        <ArrowForwardIosIcon />
      </p>
      <p onClick={() => navigate(ROUTE.FAQ)}>
        <span>
          <img src={questionSquare} alt='' />
          <span>FAQ</span>
        </span>
        <ArrowForwardIosIcon />
      </p>
      <p>
        <span>
          <img src={setting} alt='' />
          <span>알림설정</span>
        </span>
        <ArrowForwardIosIcon />
      </p>
      <div>
        <Button>로그아웃 계정</Button>
        <p>
          <span>© 리뷰팡팡</span>. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default ServiceCenter
