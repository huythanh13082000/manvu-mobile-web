import {makeStyles} from '@mui/styles'
import React from 'react'
import AppBarCustom from '../../components/appbar'
import infoIcon from '../../asset/icons/info_blue.png'
import forbiddenCircle from '../../asset/icons/forbidden-circle.png'
import InputForm from '../../components/input_form'
import textForm from '../../asset/icons/원.png'
import bankIcon from '../../asset/icons/bank_icon.png'
import creditIcon from '../../asset/icons/credit_icon.png'
import {FormControlLabel, Radio, RadioGroup, TextField} from '@mui/material'
import Copy from '../../components/copy'
import {useAppDispatch} from '../../app/hooks'
import {useNavigate} from 'react-router-dom'
import {paymentAction} from '../../feature/payment/payment.slice'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'

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
      '&>div:nth-of-type(3)': {
        fontWeight: 700,
        fontSize: '14px',
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
  span_icon_radio: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '14px',
    '&>img': {
      width: '25px',
      height: '25px',
      marginRight: '8px',
    },
  },
})

const PaymentBankCredit = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState<boolean>(false)
  const [type, setType] = React.useState<string>('0')
  const [price, setPrice] = React.useState<string>('')
  const [depositorName, setDepositorName] = React.useState<string>('')
  const [packageName, setPackageName] = React.useState('Free')
  const [paymentType, setPaymentType] = React.useState('buy-package')
  const [data, setData] = React.useState<string>('')
  const [card, setCard] = React.useState<{
    type: string
    accountName: string
    cardNumber: string
    expirationMonth: number
    expirationYear: number
  }>()
  const [check, setCheck] = React.useState<boolean>(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value)
  }
  const handleSubmit = () => {
    if (check) {
      if (type === '0') {
        dispatch(
          paymentAction.createPayment(
            paymentType === 'buy-package'
              ? {
                  type,
                  price:
                    data?.split(' ')[0] !== '1'
                      ? (
                          Number(data?.split(' ')[0]) *
                            Number(data?.split(' ')[1]) +
                          (Number(data?.split(' ')[0]) *
                            Number(data?.split(' ')[1]) *
                            10) /
                            100
                        ).toString()
                      : (
                          12 * Number(data?.split(' ')[1]) +
                          (12 * Number(data?.split(' ')[1]) * 10) / 100
                        ).toString(),
                  depositorName,
                  numberOfMonths: data?.split(' ')[0],
                  package: packageName.toLocaleUpperCase(),
                }
              : {
                  type,
                  price: price.replaceAll(',', ''),
                  depositorName,
                }
          )
        )
      } else {
        dispatch(
          paymentAction.createPayment(
            paymentType === 'buy-package'
              ? {
                  type,
                  price:
                    data?.split(' ')[0] !== '1'
                      ? (
                          Number(data?.split(' ')[0]) *
                            Number(data?.split(' ')[1]) +
                          (Number(data?.split(' ')[0]) *
                            Number(data?.split(' ')[1]) *
                            10) /
                            100
                        ).toString()
                      : (
                          12 * Number(data?.split(' ')[1]) +
                          (12 * Number(data?.split(' ')[1]) * 10) / 100
                        ).toString(),
                  card,
                  numberOfMonths: data?.split(' ')[0],
                  package: packageName.toLocaleUpperCase(),
                }
              : {
                  type,
                  price: price.replaceAll(',', ''),
                  card,
                }
          )
        )
      }
    } else if (!check)
      dispatch(
        snackBarActions.setStateSnackBar({
          content: '결제약관을 동의해야 합니다',
          type: 'error',
        })
      )
  }
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
        <div>
          <p>결제 수단</p>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            onChange={handleChange}
          >
            <FormControlLabel
              style={{
                border: '0.5px solid #A2A5AA',
                boxSizing: 'border-box',
                margin: 0,
              }}
              value='0'
              control={<Radio />}
              label={
                <span className={classes.span_icon_radio}>
                  <img src={bankIcon} alt='' />
                  계좌이체
                </span>
              }
            />
            <FormControlLabel
              style={{
                border: ' 0.5px solid #A2A5AA',
                borderTop: 0,
                boxSizing: 'border-box',
                margin: 0,
              }}
              value='1'
              control={<Radio />}
              label={
                <span className={classes.span_icon_radio}>
                  <img src={creditIcon} alt='' />
                  신용카드
                </span>
              }
            />
          </RadioGroup>
        </div>
        {type === '0' && (
          <div>
            <div>
              <div style={{marginTop: '8px'}}>
                <label
                  htmlFor=''
                  style={{
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#1A1E23',
                  }}
                >
                  <span style={{fontWeight: 700, fontSize: '16px'}}>
                    1 계좌안내:
                  </span>{' '}
                  입금할 계좌번호 안내
                </label>
                <p
                  style={{
                    padding: '1rem 0.5rem',
                    background: '#F6F6F6',
                    borderRadius: '5px',
                    width: '100%',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    className='payment-span'
                    style={{
                      color: '#0067FF',
                      fontWeight: '700',
                      marginRight: '8px',
                    }}
                  >
                    KB국민은행{' '}
                  </span>
                  <span
                    className='payment-span'
                    style={{
                      color: '#000000',
                      fontWeight: '700',
                      marginRight: '8px',
                    }}
                  >
                    885701-00-083063
                  </span>
                  <Copy copy='88570100083063' text='복사' />
                  <p
                    className='payment-span'
                    style={{
                      color: '#888888',
                      fontWeight: '700',
                      textAlign: 'center',
                    }}
                  >
                    (지엠포컴퍼니 주식회사)
                  </p>
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor='name_send'
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#1A1E23',
                }}
              >
                <span style={{fontWeight: 700, fontSize: '16px'}}>
                  2 입금자명:
                </span>
                입금자명을 입력해주세요.
              </label>

              <TextField
                id='name_send'
                placeholder='입금자명 '
                style={{marginTop: '8px'}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentBankCredit
