import {makeStyles} from '@mui/styles'
import React from 'react'
import AppBarCustom from '../../components/appbar'
import infoIcon from '../../asset/icons/info_blue.png'
import forbiddenCircle from '../../asset/icons/forbidden-circle.png'
import InputForm from '../../components/input_form'
import textForm from '../../asset/icons/원.png'

const useStyles = makeStyles({
  payment_bank_credit_container: {
    '&>div:nth-of-type(1)': {
      padding: '1rem',
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
          width: '100%',
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
      },
      '&>p:nth-of-type(1)': {
        display: 'flex',
        '&>span:nth-of-type(1)': {
          fontWeight: 700,
          fontSize: '20px',
          marginRight: '1rem',
        },
        '&>span:nth-of-type(2)': {
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          fontSize: '14px',
          color: '#252B32',
          '&>img': {
            width: '18px',
            height: '18px',
          },
        },
      },
      '&>div:nth-of-type(2)': {
        position: 'relative',
        '&>img': {
          position: 'absolute',
          top: 62,
          right: 9,
        },
      },
      '&>p:nth-of-type(2)': {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px dashed #A2A5AA',
        paddingTop: '1rem',
        '&>span:nth-of-type(1)': {
          fontWeight: 700,
          fontSize: '14px',
        },
        '&>span:nth-of-type(2)': {
          color: '#6D00C3',
          fontWeight: 700,
          fontSize: '16px',
        },
      },
    },
  },
})

const PaymentBankCredit = () => {
  const classes = useStyles()
  return (
    <div className={classes.payment_bank_credit_container}>
      <AppBarCustom title='Payment' />
      <div>
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
        </div>
        <p>
          <span>안내</span>
          <span>
            <img src={forbiddenCircle} alt='' />
            하나카드 /현대카드는 사용불가
          </span>
        </p>
        <div>
          <InputForm
            label='결제 금액'
            onChange={() => console.log(1)}
            placeholder=''
            type='text'
          />
          <img src={textForm} alt='' />
        </div>

        <p>
          <span>받을 포인트</span> <span>1000 P</span>
        </p>
      </div>
    </div>
  )
}

export default PaymentBankCredit
