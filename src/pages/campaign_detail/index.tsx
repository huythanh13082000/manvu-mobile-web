import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AppBarCustom from '../../components/appbar'
import iconShare from '../../asset/icons/icon_share.png'
import heart from '../../asset/icons/heart.png'
import heartRed from '../../asset/icons/heart_red.png'
import hanld from '../../asset/icons/hand.png'
import team from '../../asset/icons/team.png'
import mapPoint from '../../asset/icons/map_point.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InfoIcon from '@mui/icons-material/Info'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import {makeStyles} from '@mui/styles'
import {MEDIA_IMAGE_URL} from '../../constants'
import Copy from '../../components/copy'
import NaverMap from './naverMap'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  campaignDetailAction,
  selectcampaignDetail,
  selectListCampaignRelated,
  selectOffsetListCampaignRelated,
} from '../../feature/campaign_detail/campaignDetail.slice'
import {useNavigate, useParams} from 'react-router-dom'
import {selectUser} from '../../feature/user/user.slice'
import {selectTabCampaignDetail} from '../../feature/tab/tab.slice'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {FILE_API} from '../../apis/urlConfig'
import {cardActions} from '../../feature/card/card.slice'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {getDate, numberWithCommas, timeSpace} from '../../utils'

const useStyles = makeStyles({
  campaign_detail_container: {
    '&>div:nth-of-type(1)': {
      boxSizing: 'border-box',
      padding: '1rem',
      position: 'relative',
      '&>img': {
        width: '100%',
        objectFit: 'cover',
        height: '343px',
        filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))',
      },
      '&>span:nth-of-type(1)': {
        position: 'absolute',
        top: '45%',
        left: '1rem',
      },
      '&>span:nth-of-type(2)': {
        position: 'absolute',
        top: '45%',
        right: '1rem',
      },
      '&>img:nth-of-type(2)': {
        width: '24px',
        height: '24px',
        position: 'absolute',
        right: '2rem',
        bottom: '2rem',
        objectFit: 'contain',
      },
    },
    '&>div:nth-of-type(2)': {
      padding: '1rem',
      paddingTop: 0,
      '&>img:nth-of-type(1)': {
        width: '24px',
        height: '24px',
      },
      '&>div:nth-of-type(1)': {
        '&>span': {
          padding: '4px 8px',
          width: '72px',
          height: '26px',
          background: '#E5E5E5',
          borderRadius: '6px',
          fontWeight: 400,
          fontSize: '12px',
          marginRight: '5px',
        },
      },
      '&>div:nth-of-type(2)': {
        margin: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&>div': {
          display: 'flex',
          alignItems: 'center',
          '&>span': {
            border: '0.5px solid #A2A5AA',
            borderRadius: '100px',
            width: '89px',
            padding: '4px 8px',
            fontWeight: 400,
            fontSize: '12px',
            color: '#252B32',
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            marginRight: '5px',
            '&>img': {
              width: '16px',
              height: '16px',
            },
          },
          '&>div:nth-of-type(1)': {
            fontSize: '12px',
            '&>svg': {
              fontSize: '5px',
              marginRight: '5px',
            },
          },
        },
        '&>div:nth-of-type(2)': {
          fontWeight: 700,
          fontSize: '14px',
          color: '#8500FF',
          '&>svg': {
            fontSize: '5px',
            marginRight: '5px',
          },
        },
      },
    },
    '&>div:nth-of-type(3)': {
      padding: '0 1rem',
      '&>div': {
        display: 'flex',
        justifyContent: 'space-between',
        '&>span': {
          fontWeight: 700,
          fontSize: '14px',
        },
      },
      '&>ul': {
        margin: '0px',
        padding: '0px',
        paddingLeft: '10px',
        '&>li': {
          fontWeight: 400,
          fontSize: '14px',
          color: '#4A4F55',
          justifyContent: 'space-between',
          display: '-webkit-flex',
          margin: '10px 0',
          '&>span': {
            '&>svg': {
              fontSize: '5px',
              marginRight: '5px',
            },
          },
          '&>span:nth-of-type(2)': {
            fontWeight: 700,
          },
        },
      },
    },
    '&>div:nth-of-type(4)': {
      padding: '0 1rem',
      '&>span': {
        fontWeight: 700,
        fontSize: '14px',
      },
      '&>div': {
        '&>pre': {
          fontWeight: 400,
          fontSize: '14px',
          marginLeft: '1rem',
          color: '#252B32',
          fontFamily: 'Noto Sans KR',
          whiteSpace: 'break-spaces',
          wordWrap: 'break-word',
        },
      },
    },
    '&>div:nth-of-type(5)': {
      padding: '0 1rem',
      '&>span': {
        fontWeight: 700,
        fontSize: '14px',
      },
      '&>div': {
        '&>pre': {
          fontWeight: 400,
          fontSize: '14px',
          marginLeft: '1rem',
          color: '#252B32',
          fontFamily: 'Noto Sans KR',
          wordWrap: 'break-word',
        },
      },
    },
    '&>div:nth-of-type(6)': {
      padding: '1rem',
      '&>div': {
        display: 'flex',
        justifyContent: 'space-between',
        '&>div': {
          display: 'flex',
          fontWeight: 400,
          fontSize: '14px',
          color: '#222222',
          width: '80%',
          alignItems: 'start',
        },
      },
    },
    '&>div:nth-of-type(7)': {
      padding: '1rem',
      paddingBottom: '10px',
      '&>div': {
        display: 'flex',
        justifyContent: 'space-between',
        '&>span': {
          fontWeight: 700,
          fontSize: '14px',
        },
      },
      '&>span': {
        '&>pre': {
          fontWeight: 400,
          fontSize: '14px',
          marginLeft: '1rem',
          fontFamily: 'Noto Sans KR',
          whiteSpace: 'break-spaces',
          color: '#252B32',
          wordWrap: 'break-word',
        },
      },
    },
    '&>div:nth-of-type(8)': {
      padding: '1rem',
      paddingBottom: '5px',
      '&>div': {
        '&>span': {
          fontWeight: 700,
          fontSize: '14px',
        },
      },
      '&>div:nth-of-type(2)': {
        '&>pre': {
          fontWeight: 400,
          fontSize: '14px',
          marginLeft: '1rem',
          fontFamily: 'Noto Sans KR',
          whiteSpace: 'break-spaces',
          wordWrap: 'break-word',
          color: '#252B32',
        },
      },
    },
    '&>div:nth-of-type(9)': {
      padding: '1rem',
      paddingBottom: '5px',
      '&>div': {
        '&>span': {
          fontWeight: 700,
          fontSize: '14px',
        },
      },
      '&>div:nth-of-type(2)': {
        '&>pre': {
          fontWeight: 400,
          fontSize: '14px',
          marginLeft: '1rem',
          fontFamily: 'Noto Sans KR',
          color: '#252B32',
          whiteSpace: 'break-spaces',
          wordWrap: 'break-word',
        },
      },
    },
    '&>div:nth-of-type(10)': {
      padding: '1rem',
      position: 'sticky',
      bottom: '0',
      zIndex: 100,
      '&>button': {
        background:
          'linear-gradient(225.09deg, #8000FF 6.72%, #D50087 54.13%, #FFD600 93.85%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '4px',
        height: '56px',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '16px',
        width: '100%',
      },
    },
  },
})
const listImage = [
  'https://manvu.s3.ap-northeast-2.amazonaws.com//MTY3NzU0NTY5MzQ2MXE4ZWFmdDMyOQ-20230228_094354.png',
  'https://manvu.s3.ap-northeast-2.amazonaws.com//MTY3NzU0NTU3NTQ5OWV3NXMxejNsNw-20230228_094336.png',
  'https://manvu.s3.ap-northeast-2.amazonaws.com//MTY3NzU0NTU3NTI0M2kyOW03MDdmcQ-20230228_094354.png',
]

const CampaignDetail = () => {
  const classes = useStyles()
  const [indexImage, setIndexImage] = useState<number>(0)
  const [heartActive, setHeartActive] = useState(false)
  const [value, setValue] = React.useState(0)
  const [valueTabApp, setValueTabApp] = useState(0)
  const [titleTabApp, setTitleTabApp] = useState('최근순')
  const campaignDetail = useAppSelector(selectcampaignDetail)
  const [lng, setLng] = useState<number>(0)
  const [lat, setLat] = useState<number>(0)
  const p1Ref = React.useRef<HTMLInputElement>(null)
  const p2Ref = React.useRef<HTMLInputElement>(null)
  const p3Ref = React.useRef<HTMLInputElement>(null)
  const p4Ref = React.useRef<HTMLInputElement>(null)
  const p5Ref = React.useRef<HTMLInputElement>(null)
  const offsetCampaignDetail = useAppSelector(selectOffsetListCampaignRelated)
  const [offset, setOffset] = useState<number>(offsetCampaignDetail)
  const ListCampaignRelated = useAppSelector(selectListCampaignRelated)
  const navigate = useNavigate()
  const [loadMore, setLoadMore] = useState(false)
  const [blog_naver, setBlog_naver] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [facebook, setFacebook] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [twitter, setTwitter] = useState('')
  const user = useAppSelector(selectUser)
  const [open, setOpen] = useState(false)
  const [openDialogAddress, setOpenDialogAddress] = useState(false)
  const [openDialogCopy, setOpenDialogCopy] = useState(false)

  useEffect(() => {
    if (campaignDetail?.latitude && campaignDetail?.longitude) {
      setLat(Number(campaignDetail?.latitude))
      setLng(Number(campaignDetail?.longitude))
    }
    user.profile?.snsLinks &&
      user.profile?.snsLinks?.forEach((item: any) => {
        switch (Object.keys(item)[0]) {
          case 'instagram':
            setInstagram(item.instagram)
            break
          case 'blog_naver':
            setBlog_naver(item.blog_naver)
            break
          case 'youtube':
            setYoutube(item.youtube)
            break
          case 'facebook':
            setFacebook(item.facebook)
            break
          case 'tiktok':
            setTiktok(item.tiktok)
            break
          case 'twitter':
            setTwitter(item.twitter)
            break
          default:
            break
        }
      })
  }, [campaignDetail, user.profile?.snsLinks])

  let {id} = useParams()
  const dispatch = useAppDispatch()
  const handleChangeTabApp = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTabApp(newValue)
  }

  const joinRequest = (id: number) => {
    if (campaignDetail?.joinRequest) {
      dispatch(campaignDetailAction.deleteRequest(id))
    } else {
      dispatch(campaignDetailAction.createRequest(id))
    }
  }

  const activeTabCampaignDetail = useAppSelector(selectTabCampaignDetail)
  const styleTab = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '22px',
    color: '#4D4D4D',
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log(111)
    dispatch(campaignDetailAction.getCampaignDetail(Number(id)))
  }, [dispatch, id])
  useEffect(() => {
    setValue(activeTabCampaignDetail)
  }, [activeTabCampaignDetail, dispatch])

  useEffect(() => {
    campaignDetail?.interactive && setHeartActive(true)
  }, [campaignDetail?.interactive])
  useEffect(() => {
    dispatch(
      campaignDetailAction.getlistCampaignRelated({
        tabId: campaignDetail?.tabId,
        offset: offset,
        limit: 30,
      })
    )
  }, [dispatch, offset, campaignDetail])

  const copyToClipboard = async () => {
    const img: any = document.getElementById('img12')
    const data = await fetch(img.src)
    const blob = await data.blob()
    try {
      await navigator.clipboard.write([new ClipboardItem({[blob.type]: blob})])
      dispatch(
        snackBarActions.setStateSnackBar({
          content: '복사 되었습니다.',
          type: 'success',
        })
      )
    } catch (error) {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'error',
          type: 'error',
        })
      )
    }
  }
  console.log(111, campaignDetail)
  const listHashTag = useAppSelector(selectListHashTag)
  return (
    <>
      {' '}
      {campaignDetail && campaignDetail.id.toString().includes(id || '') && (
        <div className={classes.campaign_detail_container}>
          <AppBarCustom title='[송파]준준테라피' iconRightUrl={iconShare} />
          <div>
            <img src={FILE_API + campaignDetail?.images[indexImage]} alt='' />
            <span
              onClick={() => {
                if (indexImage !== 0) {
                  setIndexImage(indexImage - 1)
                }
              }}
            >
              <ChevronLeftIcon />
            </span>
            <span
              onClick={() => {
                if (
                  campaignDetail &&
                  indexImage !== campaignDetail.images.length - 1
                ) {
                  setIndexImage(indexImage + 1)
                }
              }}
            >
              <ChevronRightIcon />
            </span>
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
                    campaignDetail?.id
                  )
                    dispatch(
                      cardActions.postMemberCampaignUnLike(campaignDetail?.id)
                    )
                  else if (
                    user.profile?.roles &&
                    user.profile?.roles[0] &&
                    user.profile?.roles[0].name === 'advertiser' &&
                    campaignDetail?.id
                  )
                    dispatch(
                      cardActions.postAdvertiserCampaignUnLike(
                        campaignDetail?.id
                      )
                    )
                } else {
                  setHeartActive(true)
                  if (
                    user.profile?.roles &&
                    user.profile?.roles[0] &&
                    user.profile?.roles[0].name === 'member' &&
                    campaignDetail?.id
                  )
                    dispatch(
                      cardActions.postMemberCampaignLike(campaignDetail?.id)
                    )
                  else if (
                    user.profile?.roles &&
                    user.profile?.roles[0] &&
                    user.profile?.roles[0].name === 'advertiser' &&
                    campaignDetail?.id
                  )
                    dispatch(
                      cardActions.postAdvertiserCampaignLike(campaignDetail?.id)
                    )
                }
              }}
            />
          </div>
          <div>
            <img src={MEDIA_IMAGE_URL[`${campaignDetail?.media}`]} alt='' />
            <p>{campaignDetail?.name}</p>
            <div>
              {listHashTag?.map((item) => {
                if (campaignDetail?.tags.includes(item.id))
                  return <span>{item.text}</span>
                else return null
              })}
            </div>
            <div>
              <div>
                <span>
                  <img src={hanld} alt='' />
                  신청자:{' '}
                  {Number(campaignDetail?.members.length) +
                    Number(campaignDetail?.numberOfParticipants)}
                </span>
                <span>
                  <img src={team} alt='' />
                  모집: {campaignDetail?.numberOfRecruit}
                </span>
                <div>
                  <Brightness1Icon />{' '}
                  {campaignDetail &&
                    campaignDetail.campaignRegistrationDateTo &&
                    timeSpace(campaignDetail.campaignRegistrationDateTo)}
                  일 남음
                </div>
              </div>
              <div>
                <Brightness1Icon />
                {campaignDetail && numberWithCommas(campaignDetail.point)}P
              </div>
            </div>
          </div>
          <div>
            <div>
              <span>캠페인 신청기간</span>{' '}
              <span>
                {' '}
                {getDate(campaignDetail?.campaignRegistrationDateFrom || '') +
                  '~' +
                  getDate(campaignDetail?.campaignRegistrationDateTo || '')}
              </span>
            </div>
            <ul>
              <li>
                <span>
                  <Brightness1Icon />
                  인플루언서 발표
                </span>
                <span>
                  {' '}
                  {getDate(campaignDetail?.announcementToMemberDate || '')}
                </span>
              </li>
              <li>
                <span>
                  <Brightness1Icon />
                  인플루언서 발표
                </span>
                <span>
                  {' '}
                  {getDate(campaignDetail?.contentRegistrationDateFrom || '') +
                    '~' +
                    getDate(campaignDetail?.contentRegistrationDateTo || '')}
                </span>
              </li>
              <li>
                <span>
                  <Brightness1Icon />
                  인플루언서 발표
                </span>
                <span>
                  {getDate(campaignDetail?.announcementFinalDate || '')}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <span>캠페인 신청기간</span>
            <div>
              <pre>{campaignDetail?.offers}</pre>
            </div>
          </div>

          <div>
            <span>방문 및 예약안내</span>
            <div>
              <pre>{campaignDetail?.content}</pre>
            </div>
          </div>
          <div>
            {campaignDetail?.longitude && campaignDetail?.latitude ? (
              <>
                <div>
                  <div>
                    <img src={mapPoint} alt='' />
                    <div>{campaignDetail?.adddress}</div>
                  </div>
                  <Copy text='복사' copy={campaignDetail?.adddress || ''} />
                </div>
                <NaverMap data={campaignDetail} />
              </>
            ) : null}
          </div>
          <div>
            <div>
              <span>작업 키워드</span>
              <Copy text='키워드 복사' copy={campaignDetail?.keywords || ''} />
            </div>
            <span>
              <pre className='pd-p9'>{campaignDetail?.keywords}</pre>
            </span>
          </div>
          <div>
            <div>
              <span>캠페인 미션</span>
            </div>
            <div>
              <pre>{campaignDetail?.mission}</pre>
            </div>
          </div>
          <div>
            <div>
              <span>추가 안내사항</span>
            </div>
            <div>
              <pre>{campaignDetail?.notes}</pre>
            </div>
          </div>
          <div>
            <Grid item xs={12} container>
              {campaignDetail &&
              campaignDetail.joinRequest &&
              campaignDetail.joinRequest.status === 1 ? (
                <Button
                  variant='contained'
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: campaignDetail?.joinRequest
                      ? '#44B400B2'
                      : '#171A1F',
                    border: campaignDetail?.joinRequest
                      ? '1px solid #44B400B2'
                      : '1px solid #A2A5AA',
                  }}
                  className='pd-button'
                >
                  선정 취소하기
                </Button>
              ) : null}
            </Grid>
            {campaignDetail &&
            campaignDetail.joinRequest &&
            campaignDetail.joinRequest.status === 1 ? null : (
              <Grid item xs={12} marginTop='1rem'>
                {user.profile &&
                user.profile?.roles &&
                user.profile?.roles[0] &&
                user.profile?.roles[0].name === 'member' ? (
                  <Button
                    variant='contained'
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: campaignDetail?.joinRequest
                        ? '#FF2B2B'
                        : '#171A1F',
                      border: campaignDetail?.joinRequest
                        ? '1px solid #FF2B2BB2'
                        : '1px solid #A2A5AA',
                    }}
                    className='pd-button'
                    onClick={() => {
                      const sns: any = {
                        facebook,
                        blog_naver,
                        instagram,
                        tiktok,
                        twitter,
                      }
                      if (campaignDetail?.tabId !== 2) {
                        campaignDetail &&
                        campaignDetail.media &&
                        sns[`${campaignDetail.media}`]
                          ? campaignDetail?.id &&
                            joinRequest(campaignDetail?.id)
                          : setOpen(true)
                      } else {
                        campaignDetail.media &&
                        sns[`${campaignDetail.media}`] &&
                        user.profile &&
                        user.profile?.addressList &&
                        user.profile?.addressList.length > 0
                          ? campaignDetail?.id &&
                            joinRequest(campaignDetail?.id)
                          : campaignDetail.media &&
                            !sns[`${campaignDetail.media}`]
                          ? setOpen(true)
                          : setOpenDialogAddress(true)
                      }
                    }}
                  >
                    {campaignDetail?.joinRequest ? '신청취소하기' : '신청하기'}
                  </Button>
                ) : null}
              </Grid>
            )}
            <Grid>
              {campaignDetail?.joinRequest &&
              campaignDetail.joinRequest.status === 0 ? (
                <p className='pd-p10'>
                  <InfoIcon style={{fontSize: '35px', borderRadius: '10px'}} />
                  {campaignDetail?.joinRequest
                    ? '캠페인에 신청하셨습니다.선정 발표까지 기다려주세요..'
                    : ''}
                </p>
              ) : null}
              {campaignDetail?.joinRequest &&
              campaignDetail.joinRequest.status === 1 ? (
                <p
                  className='pd-p10'
                  style={{
                    backgroundColor: '#1BB650',
                    color: 'white',
                    borderRadius: '10px',
                  }}
                >
                  <InfoIcon style={{fontSize: '35px'}} />
                  {campaignDetail?.joinRequest
                    ? '캠페인에 선정 되셨습니다.'
                    : ''}
                </p>
              ) : null}
            </Grid>
            {!localStorage.getItem('token') ? (
              <Button
                variant='contained'
                style={{
                  width: '100%',
                  border: '1px solid #A2A5AA',
                  backgroundColor: 'white',
                  color: '#171A1F',
                }}
                className='pd-button'
                onClick={() => navigate('/login')}
              >
                신청하기
              </Button>
            ) : null}
            {/* </Grid> */}
            {/* <Button>신청은 로그인이 필요합니다.</Button> */}
          </div>
        </div>
      )}
    </>
  )
}

export default CampaignDetail
