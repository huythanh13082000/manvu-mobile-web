import {makeStyles} from '@mui/styles'
import {useNavigate} from 'react-router-dom'
import infoIcon from '../../asset/icons/info_blue.png'
import AppBarCustom from '../../components/appbar'
import PackageRevu from '../../components/package_revu'
import {PACKAGE_RIVU} from '../../constants'

const useStyles = makeStyles({
  payment_container: {
    '&>div:nth-of-type(1)': {
      padding: '1rem',
      '&>p': {
        textAlign: 'center',
        margin: 0,
        fontWeight: 400,
        fontSize: '14px',
      },
      '&>div:nth-of-type(1)': {
        display: 'flex',
        background: '#E9F3FF',
        borderLeft: '2px solid #0078FF',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        padding: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        '&>div:nth-of-type(1)': {
          width: '70%',
          '&>p:nth-of-type(1)': {
            fontWeight: 700,
            fontSize: '14px',
            color: '#0078FF',
            margin: 0,
            '&>img': {
              width: '16px',
              height: '16px',
            },
          },
          '&>p:nth-of-type(2)': {
            fontWeight: 400,
            fontSize: '12px',
            color: '#252B32',
            margin: '6px',
          },
        },
        '&>span': {
          width: '79px',
          height: '25px',
          background: '#0078FF',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 500,
          fontSize: '10px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
})

const Payment = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <div className={classes.payment_container}>
      <AppBarCustom title='리뷰팡팡 요금' />
      <div>
        <p>인플루언서를 모집하는 가장 좋은 방법 리뷰팡팡을 선택해</p>
        <p>주셔서 감사드립니다.^-^</p>

        <div>
          <div>
            <p>
              <img src={infoIcon} alt='' /> 포인트 충전
            </p>
            <p>
              포인트 충전을 한다면 QR코드로 포인트전송 혹은 생성한 캠페인에서
              참여한 체험단들에게 포인트를 줄 수 있습니다.
            </p>
          </div>
          <span onClick={() => navigate('/payment_bank_credit/no_package')}>
            포인트 충전하기
          </span>
        </div>
        {PACKAGE_RIVU.map((item) => {
          return (
            <div
              style={{
                boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)',
                borderRadius: '6px',
              }}
            >
              <PackageRevu {...item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Payment
