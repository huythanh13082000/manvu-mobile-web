import React, {useState} from 'react'
import Button from '@mui/material/Button'
import AppBarCustom from '../../components/appbar'
import iconShare from '../../asset/icons/icon_share.png'
import heart from '../../asset/icons/heart.png'
import heartRed from '../../asset/icons/heart_red.png'
import hanld from '../../asset/icons/hand.png'
import team from '../../asset/icons/team.png'
import mapPoint from '../../asset/icons/map_point.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import {makeStyles} from '@mui/styles'
import {MEDIA_IMAGE_URL} from '../../constants'
import Copy from '../../components/copy'
import NaverMap from './naverMap'

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
        fontWeight: 400,
        fontSize: '14px',
        color: '#252B32',
        margin: '10px 0 0 16px',
      },
    },
    '&>div:nth-of-type(5)': {
      padding: '0 1rem',
      '&>span': {
        fontWeight: 700,
        fontSize: '14px',
      },
      '&>div': {
        fontWeight: 400,
        fontSize: '14px',
        color: '#252B32',
        margin: '10px 0 0 16px',
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
        fontWeight: 400,
        fontSize: '14px',
        marginLeft: '1rem',
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
        fontWeight: 400,
        fontSize: '14px',
        marginLeft: '1rem',
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
        fontWeight: 400,
        fontSize: '14px',
        marginLeft: '1rem',
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
  return (
    <div className={classes.campaign_detail_container}>
      <AppBarCustom title='[송파]준준테라피' iconRightUrl={iconShare} />
      <div>
        <img src={listImage[indexImage]} alt='' />
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
            if (indexImage !== listImage.length - 1) {
              setIndexImage(indexImage + 1)
            }
          }}
        >
          <ChevronRightIcon />
        </span>
        <img
          src={heartActive ? heartRed : heart}
          alt=''
          onClick={() => setHeartActive(!heartActive)}
        />
      </div>
      <div>
        <img src={MEDIA_IMAGE_URL.blog_naver} alt='' />
        <p>[송파]준준테라피 가락본점 [송파]준준테라피 가락본점</p>
        <div>
          <span>서비스 경험</span>
          <span>서비스 경험</span>
        </div>
        <div>
          <div>
            <span>
              <img src={hanld} alt='' />
              신청자: 14
            </span>
            <span>
              <img src={team} alt='' />
              모집: 10
            </span>
            <div>
              <Brightness1Icon /> 18일 남음
            </div>
          </div>
          <div>
            <Brightness1Icon />
            50,000P
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>캠페인 신청기간</span> <span>11.11 ~ 11.23</span>
        </div>
        <ul>
          <li>
            <span>
              <Brightness1Icon />
              인플루언서 발표
            </span>
            <span>11.25</span>
          </li>
          <li>
            <span>
              <Brightness1Icon />
              인플루언서 발표
            </span>
            <span>11.25</span>
          </li>
          <li>
            <span>
              <Brightness1Icon />
              인플루언서 발표
            </span>
            <span>11.25</span>
          </li>
        </ul>
      </div>
      <div>
        <span>캠페인 신청기간</span>
        <div>
          월요일~금요일
          근무시간(9:00~18:00)ㅇㄴㄹㄴㅇㄹㅇㄹㄴㅇㄹㅇㄹㅇㄴㄹㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇㄹㄴㄹㅇㄴㄹ
        </div>
      </div>

      <div>
        <span>방문 및 예약안내</span>
        <div>
          부산맛집,부산여행,부산추천,부산커플추ㅀㅇㅀㄹㅇㅎㅇㅀㅇㅀㅇㅀㅇㅀㅀㅇㅀㅇㅎㅇㄹ천ㄹㅇㅎㄹㅇㅎㄹㅇㅎㅇㅀㅇㅀㅇㅀㅇㅀㅇㅀㅇㅀㅇㅀㅇㅀㄹㅇㅎㅇㅀㅇㅀㅇㅀㅇㄹ
        </div>
      </div>
      <div>
        <div>
          <div>
            <img src={mapPoint} alt='' />
            <div>
              서울 송파구 문정동 229-5 3번출구 (마곡 사이언스타워) 4층 후문
            </div>
          </div>
          <Copy text='복사' copy='thanh' />
        </div>
        <NaverMap />
      </div>
      <div>
        <div>
          <span>작업 키워드</span>
          <Copy text='키워드 복사' copy='thanh' />
        </div>
        <span>부산맛집,부산여행,부산추천,부산커플추천</span>
      </div>
      <div>
        <div>
          <span>캠페인 미션</span>
        </div>
        <div>
          ㄴㅇㄹㄴㅇㄹㅇㄴㅇㄹㄴㅇㄹ천ㅇㄴㄹㄴㅇㄹㅇㄹㅇㄹㅇㄹㄴㅇㄹㄴㅇㄹㄹㄹㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴ
        </div>
      </div>
      <div>
        <div>
          <span>추가 안내사항</span>
        </div>
        <div>부산맛집,부산여행,부산추천,부산커플추천</div>
      </div>
      <div>
        <Button>신청은 로그인이 필요합니다.</Button>
      </div>
    </div>
  )
}

export default CampaignDetail
