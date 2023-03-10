import iconNaver from '../asset/icons/icon_naver.png'
import iconFacebook from '../asset/icons/icon_facebook.png'
import iconTiktok from '../asset/icons/icon_tiktok.png'
import icontwitter from '../asset/icons/icon_twitter.png'
import iconYoutube from '../asset/icons/icon_youtube.png'
import iconInstagram from '../asset/icons/icon_instagram.png'
import wait from '../asset/icons/wait.png'
import success from '../asset/icons/success.png'
import error from '../asset/icons/error.png'
import bankIcon from '../asset/icons/bank_icon.png'
import credit from '../asset/icons/credit_icon.png'
import {PackageType} from '../types/package.type'
import freeIcon from '../asset/images/free_icon.png'
import starterIcon from '../asset/images/starter_icon.png'
import proIcon from '../asset/images/pro_icon.png'
import globalIcon from '../asset/images/global_icon.png'

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}
export const BASE_URL = 'https://server.rivupang.com/api/'
export const IMAGE_URL = `https://manvu.s3.ap-northeast-2.amazonaws.com/`

export const AREA_LIST = [
  {id: 1, area: '서울', subArea: '강남/논현'},
  {id: 2, area: '서울', subArea: '강동/천호'},
  {id: 3, area: '서울', subArea: '강서/목동'},
  {id: 4, area: '서울', subArea: '건대/왕십리'},
  {id: 5, area: '서울', subArea: '관악/신림'},
  {id: 6, area: '서울', subArea: '교대/사당'},
  {id: 7, area: '서울', subArea: '노원/강북'},
  {id: 8, area: '서울', subArea: '명동/이태원'},
  {id: 9, area: '서울', subArea: '삼성/선릉'},
  {id: 10, area: '서울', subArea: '송파/잠실'},
  {id: 11, area: '서울', subArea: '수유/동대문'},
  {id: 12, area: '서울', subArea: '신촌/이대'},
  {id: 13, area: '서울', subArea: '압구정/신사'},
  {id: 14, area: '서울', subArea: '여의도/영등포'},
  {id: 15, area: '서울', subArea: '종로/대학로'},
  {id: 16, area: '서울', subArea: '홍대/마포'},
  {id: 17, area: '경기/인천', subArea: '일산/파주'},
  {id: 18, area: '경기/인천', subArea: '용인/분당/수원'},
  {id: 19, area: '경기/인천', subArea: '인천/부천'},
  {id: 20, area: '경기/인천', subArea: '남양주/구리/하남'},
  {id: 21, area: '경기/인천', subArea: '안양/안산/광명'},
  {id: 22, area: '대전/충청', subArea: '대전'},
  {id: 23, area: '대전/충청', subArea: '충청'},
  {id: 24, area: '대구/경북', subArea: '대구'},
  {id: 25, area: '대구/경북', subArea: '경북'},
  {id: 26, area: '부산/경남', subArea: '부산'},
  {id: 27, area: '부산/경남', subArea: '경남'},
  {id: 28, area: '광주/전라', subArea: '광주'},
  {id: 29, area: '광주/전라', subArea: '전라'},
  {id: 30, area: '다른지역', subArea: '강원'},
  {id: 31, area: '다른지역', subArea: '제주'},
]

export const BANKING_LIST = [
  {id: 1, name: '카카오뱅크'},
  {id: 2, name: '기업은행'},
  {id: 3, name: '신한은행'},
  {id: 4, name: '우리은행 '},
  {id: 5, name: '하나은행'},
  {id: 6, name: '경남은행'},
  {id: 7, name: '대구은행'},
  {id: 8, name: '뱅크오브아메리카'},
  {id: 9, name: '산림조합중앙회'},
  {id: 10, name: '새마을금고'},
  {id: 11, name: '국민은행'},
  {id: 12, name: '농협은행'},
  {id: 13, name: '산업은행'},
  {id: 14, name: '한국씨티은행'},
  {id: 15, name: 'SC제일은행'},
  {id: 16, name: '광주은행'},
  {id: 17, name: '도이치은행'},
  {id: 18, name: '부산은행'},
  {id: 19, name: '저축은행'},
  {id: 20, name: '수협은행'},
]

export const USER_ROLE_IDS = {
  ADMIN: 1,
  ADVITISER: 2,
  MEMBER: 3,
  MANAGER: 4,
  ADVITISER_FREE: 5,
  ADVITISER_STARTER: 6,
  ADVITISER_PRO: 7,
  ADVITISER_GLOBAL: 8,
}

export const MEDIA_IMAGE_URL: any = {
  blog_naver: iconNaver,
  tiktok: iconTiktok,
  youtube: iconYoutube,
  instagram: iconInstagram,
  twitter: icontwitter,
  facebook: iconFacebook,
}
export const COLOR = {
  border: '#E1E1E1',
}
export const LOGIN_TYPE: {
  USERNAME: number
  NAVER: number
  FACEBOOK: number
  KAKAO_TALK: number
  GOOGLE: number
} = {
  USERNAME: 0,
  NAVER: 1,
  FACEBOOK: 2,
  KAKAO_TALK: 3,
  GOOGLE: 4,
}

export const TEXT_COLOR_WH: any = [
  {
    text: '처리중',
    color: '#FFB227',
    background: '#FFECDC',
    icon: wait,
    colorPoint: '#818488',
  },
  {
    text: '완료 ',
    color: '#05CB58',
    background: '#DCFFE8',
    icon: success,
    colorPoint: '#6D00C3',
  },
  {
    text: '취소',
    color: '#B6291B',
    background: '#FFDFDC',
    icon: error,
    colorPoint: '#B6291B',
  },
]
export const MY_CAMPAIGN_ADVERTISER_STATUS = {}
export const MEDIA_TEXT: any = {
  blog_naver: '네이버',
  facebook: '페이스북',
  tiktok: 'Tik의 톡',
  youtube: '유튜브',
  instagram: '인스 타 그램',
  twitter: '트위터',
}
export const COLOR_QUESTION_TYPE: any = {
  ADVERTISING_INQUIRY: '#E0457F',
  CHANGE_DESIGN: '#549C1F',
  PAYMENT_ADVERTISEMENT: '#5290E3',

  LIMIT_FUNCTION: '#0500FF',
  NORMAL_QUESTION: '#FF7A00',
  ERROR: '#AD00FF',
  OTHER: '#D6B300',
  EVENT_QUESTION: '#0065F2 ',
}
export const TEXT_QUESTION_TYPE: any = {
  ADVERTISING_INQUIRY: '광고 문의',
  CHANGE_DESIGN: '디자인수정',
  PAYMENT_ADVERTISEMENT: '광고비 결제',
  LIMIT_FUNCTION: '기능제안',
  NORMAL_QUESTION: '일반 문의',
  ERROR: '이용오류',
  OTHER: '기타 문의',
  EVENT_QUESTION: '이벤트 문의',
}
export const LIST_TAB = [
  {
    id: 1,
    text: '지역',
  },
  {
    id: 2,
    text: '제품',
  },
  {
    id: 3,
    text: '서비스',
  },
  {
    id: 4,
    text: '기자단',
  },
]
export const PAYMENT_HISTORY_ICON: any = {
  '0': bankIcon,
  '1': credit,
}
export const KAKAO_TALK_TOKEN = '923068423948123ce72b86bdbb111550'

export const PACKAGE_RIVU: PackageType[] = [
  {
    recomend: '무료로 시작하는',
    name: 'Free',
    point: '0원',
    description: [
      '캠페인 1개 등록가능',
      '인플루언서 2명 이하 선정가능',
      '기업회원 관리페이지 제공',
      '모집 블로그/인스타그램/페이스북 등록가능',
    ],
    button: {text: '무료시작', color: '#4A4F55'},
    img: freeIcon,
  },
  {
    recomend: '작은 비즈니스는',
    name: 'Starter',
    point: '40,000 원/월',
    description: [
      '브랜드 2개 캠페인 등록가능',
      '인플루언서 5명 이하 선정가능',
      '기업회원 관리페이지 제공',
      '모집 블로그/인스타그램/페이스북/유튜브 등록가능',
    ],
    button: {text: '스타트로 시작', color: '#0078FF'},
    img: starterIcon,
  },
  {
    recomend: '전문 비즈니스는',
    name: 'Pro',
    point: '120,000 원/월',
    description: [
      '브랜드 3개 캠페인 등록가능',
      '인플루언서 10명 이하 선정가능',
      '기업회원 관리페이지 제공',
      '모집 블로그/인스타그램/페이스북/유튜브/트위터/틱톡 등록가능',
      '전담 CX매니저 배정',
    ],
    suggest: '전담 CX매니저가 추천하는 상품',
    button: {text: '프로로 시작', color: '#FF006B'},
    img: proIcon,
  },
  {
    recomend: '프로 비즈니스는',
    name: 'Global',
    point: '180,000 원/월',
    suggest: '리뷰팡팡을 무제한 이용할 수 있는 방법',
    description: [
      '캠페인 브랜드 무제한 등록가능',
      '인플루언서 무제한 선정가능',
      '기업회원 관리페이지 매니저 대행 관리',
      '모집 블로그/인스타그램/페이스북/유튜브/트위터/틱톡 등록가능',
      '전담 CX매니저 배정',
    ],
    button: {text: '글로벌로 시작', color: '#7C2BFF'},
    img: globalIcon,
  },
]
export const BY_PACKAGE_REVU: any = {
  Free: {
    3: 0,
    6: 0,
    1: 0,
  },
  Starter: {
    3: 47500,
    6: 45000,
    1: 40000,
  },
  Pro: {
    3: 150000,
    6: 140000,
    1: 120000,
  },
  Global: {
    3: 260000,
    6: 200000,
    1: 180000,
  },
}
export const CARD_TYPE = [
  '일시불',
  '2개월',
  '3개월',
  '4개월',
  '5개월',
  '6개월',
  '7개월',
  '8개월',
  '9개월',
  '10개월',
  '11개월',
  '12개월',
]
