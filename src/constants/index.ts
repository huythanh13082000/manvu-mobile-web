import iconNaver from '../asset/icons/icon_naver.png'
import iconFacebook from '../asset/icons/icon_facebook.png'
import iconTiktok from '../asset/icons/icon_tiktok.png'
import icontwitter from '../asset/icons/icon_twitter.png'
import iconYoutube from '../asset/icons/icon_youtube.png'
import iconInstagram from '../asset/icons/icon_instagram.png'

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
