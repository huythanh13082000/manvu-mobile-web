import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axiosClient from '../../apis/axiosClient'
import {VERIFY_PHONE_NUMBER} from '../../apis/urlConfig'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import bankIcon from '../../asset/icons/bank_icon.png'
import creditIcon from '../../asset/icons/credit_icon.png'
import forbiddenCircle from '../../asset/icons/forbidden-circle.png'
import infoIcon from '../../asset/icons/info_blue.png'
import noteGreen from '../../asset/icons/note_green.png'
import noteRed from '../../asset/icons/note_red.png'
import textForm from '../../asset/icons/원.png'
import AppBarCustom from '../../components/appbar'
import Copy from '../../components/copy'
import InputForm from '../../components/input_form'
import PackageRevuNew from '../../components/package_revu_new'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {BY_PACKAGE_REVU, CARD_TYPE, PACKAGE_RIVU} from '../../constants'
import {paymentAction} from '../../feature/payment/payment.slice'
import {selectUser} from '../../feature/user/user.slice'
import {auth} from '../../firebaseConfig'
import {numberWithCommas} from '../../utils'
import './payment.css'

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
          width: '80%',
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
      '&>div:nth-of-type(3)': {
        position: 'relative',
        '&>img': {
          position: 'absolute',
          top: 62,
          right: 9,
        },
      },
      '&>div:nth-of-type(4)': {
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
  p_label: {
    fontSize: '14px',
    margin: '8px 0',
  },
})

const PaymentBankCredit = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [type, setType] = React.useState<string>('0')
  const [price, setPrice] = React.useState<string>('')
  const [depositorName, setDepositorName] = React.useState<string>('')
  const [data, setData] = React.useState<string>('')
  const [card, setCard] = React.useState<{
    type: string
    accountName: string
    cardNumber: string
    expirationMonth?: number
    expirationYear?: number
  }>({
    type: '',
    accountName: '',
    cardNumber: '',
  })
  const [check, setCheck] = React.useState<boolean>(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value)
  }
  const handleSubmit = () => {
    if (check) {
      if (type === '0') {
        dispatch(
          paymentAction.createPayment(
            id !== 'no_package'
              ? {
                  data: {
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
                    numberOfMonths:
                      data?.split(' ')[0] === '1' ? '12' : data?.split(' ')[0],
                    package: id && id.toLocaleUpperCase(),
                  },
                  history: navigate,
                }
              : {
                  data: {
                    type,
                    price: price.replaceAll(',', ''),
                    depositorName,
                  },
                  history: navigate,
                }
          )
        )
      } else {
        dispatch(
          paymentAction.createPayment(
            id !== 'no_package'
              ? {
                  data: {
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
                    numberOfMonths:
                      data?.split(' ')[0] === '1' ? '12' : data?.split(' ')[0],
                    package: id && id.toLocaleUpperCase(),
                  },
                  history: navigate,
                }
              : {
                  data: {
                    type,
                    price: price.replaceAll(',', ''),
                    card,
                  },
                  history: navigate,
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
  const [code, setCode] = React.useState<string>('')
  const [buttonStatus, setButtonStatus] = React.useState(1)
  const [confirmOtp, setConfirmOtp] = React.useState<any>()
  const [checkOtp, setCheckOtp] = React.useState(1)
  const {id} = useParams()

  const getOtp = async () => {
    try {
      if (user.profile?.phoneNumber) {
        const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth)
        const res = await signInWithPhoneNumber(
          auth,
          user.profile.phoneNumber,
          recaptcha
        )
        setButtonStatus(2)
        setConfirmOtp(res)
        recaptcha.clear()
      } else
        dispatch(
          snackBarActions.setStateSnackBar({
            content: 'account has not registered phone number',
            type: 'error',
          })
        )
    } catch (error) {
      console.log(error)
    }
  }
  const handleCheckOtp = async () => {
    try {
      if (buttonStatus === 2) {
        const a: any = await confirmOtp.confirm(Number(code))
        await axiosClient.post(VERIFY_PHONE_NUMBER, {
          firebaseIdToken: a._tokenResponse.idToken,
        })
        setButtonStatus(3)
        setCheckOtp(3)
      }
    } catch (error) {
      if (buttonStatus === 2) {
        setCheckOtp(2)
      }
    }
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
          {id !== 'no_package' && (
            <span onClick={() => navigate('/payment_bank_credit/no_package')}>
              포인트 충전하기
            </span>
          )}
        </div>
        <p>
          <span>안내</span>
          <span>
            <img src={forbiddenCircle} alt='' />
            하나카드 /현대카드는 사용불가
          </span>
        </p>
        {PACKAGE_RIVU.map((item) => {
          if (item.name === id)
            return (
              <div
                style={{
                  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)',
                  borderRadius: '6px',
                }}
              >
                <PackageRevuNew {...item} />
              </div>
            )
        })}
        {id === 'no_package' && <div></div>}
        {id === 'no_package' ? (
          <>
            <div>
              <InputForm
                label='결제 금액'
                placeholder=''
                type='number'
                value={price}
                onChange={(e) => {
                  setPrice(e)
                }}
              />
              <img src={textForm} alt='' />
            </div>

            <p>
              <span>받을 포인트</span>{' '}
              <span>{numberWithCommas(Number(price))} P</span>
            </p>
          </>
        ) : (
          <div>
            <p
              style={{
                padding: '1rem 0',
                alignItems: 'start',
                margin: '0',
              }}
            >
              <span
                className='payment-span'
                style={{fontSize: '14px', fontWeight: 700}}
              >
                월단위 선택
              </span>
              <br />
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  name='radio-buttons-group'
                  onChange={(e) => setData(e.target.value)}
                >
                  <FormControlLabel
                    value={`3 ${BY_PACKAGE_REVU[`${id}`][3]}`}
                    control={<Radio />}
                    label={
                      <span
                        className='payment-span'
                        style={{
                          fontWeight: 700,
                          fontSize: '16px',
                        }}
                      >
                        3개월{' '}
                        <span style={{color: '#0067FF'}}>
                          {numberWithCommas(BY_PACKAGE_REVU[`${id}`][3])} 원{' '}
                          <span style={{color: 'black'}}>/월</span>
                        </span>
                      </span>
                    }
                  />
                  <FormControlLabel
                    value={`6 ${BY_PACKAGE_REVU[`${id}`][6]}`}
                    control={<Radio />}
                    label={
                      <span
                        className='payment-span'
                        style={{fontWeight: 700, fontSize: '16px'}}
                      >
                        6개월{' '}
                        <span style={{color: '#0067FF'}}>
                          {numberWithCommas(BY_PACKAGE_REVU[`${id}`][6])} 원
                        </span>
                        /월
                      </span>
                    }
                  />
                  <FormControlLabel
                    value={`1 ${BY_PACKAGE_REVU[`${id}`][1]}`}
                    control={<Radio />}
                    label={
                      <span
                        className='payment-span'
                        style={{fontWeight: 700, fontSize: '16px'}}
                      >
                        1년{' '}
                        <span style={{color: '#0067FF'}}>
                          {numberWithCommas(BY_PACKAGE_REVU[`${id}`][1])} 원
                        </span>
                        /월
                      </span>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <p style={{borderBottom: '1px solid #A2A5AA', margin: '0'}}></p>
            <p
              style={{
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0',
              }}
            >
              <span
                className='payment-span'
                style={{fontSize: '14px', fontWeight: 700}}
              >
                결제금액 합계
              </span>
              <span
                className='payment-span'
                style={{fontWeight: 700, fontSize: '14px'}}
              >
                {data && (
                  <span>
                    {data?.split(' ')[0]}
                    {data?.split(' ')[0] === '1' ? '년' : '개월'}{' '}
                    <span style={{color: '#FD584E'}}>
                      {numberWithCommas(
                        Number(data?.split(' ')[1]) *
                          Number(data?.split(' ')[0]) *
                          Number(data?.split(' ')[0] === '1' ? 12 : 1)
                      )}
                      원
                    </span>
                  </span>
                )}
              </span>
            </p>
          </div>
        )}

        <div>
          <p>결제 수단</p>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            onChange={handleChange}
            value={type}
          >
            <FormControlLabel
              style={{
                border: '0.5px solid #A2A5AA',
                boxSizing: 'border-box',
                margin: 0,
                padding: '0.3rem 0',
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
                padding: '0.3rem 0',
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
                value={depositorName}
                onChange={(e) => {
                  setDepositorName(e.target.value)
                }}
              />
            </div>
          </div>
        )}
        {type === '1' && (
          <div style={{width: '100%'}}>
            <div>
              <p className={classes.p_label}>카드 번호</p>
              <TextField
                value={card.cardNumber}
                size='small'
                style={{width: '100%'}}
                placeholder='카드 번호'
                onChange={(e) => setCard({...card, cardNumber: e.target.value})}
                error={card.cardNumber ? false : true}
              />
            </div>

            <div>
              <p className={classes.p_label}>만기 월 / 만료 년</p>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  type={'number'}
                  value={card.expirationMonth}
                  size='small'
                  style={{width: '49%'}}
                  placeholder='월'
                  onChange={(e) => {
                    if (
                      e.target.value.length <= 2 &&
                      Number(e.target.value) >= 0 &&
                      Number(e.target.value) <= 12
                    ) {
                      setCard({
                        ...card,
                        expirationMonth: Number(e.target.value),
                      })
                    }
                  }}
                  error={card.expirationMonth ? false : true}
                />
                <TextField
                  type={'number'}
                  value={card.expirationYear}
                  size='small'
                  style={{width: '49%'}}
                  placeholder='년도'
                  error={card.expirationYear ? false : true}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      setCard({...card, expirationYear: Number(e.target.value)})
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <p className={classes.p_label}>
                {buttonStatus === 1
                  ? '할부선택'
                  : buttonStatus === 2
                  ? '확인'
                  : '완료'}
              </p>
              <div
                style={{
                  width: '49%',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <FormControl fullWidth size='small' style={{width: '100%'}}>
                  <Select
                    value={card.type}
                    onChange={(e) => {
                      setCard({...card, type: e.target.value})
                    }}
                    error={card.type ? false : true}
                  >
                    {CARD_TYPE.map((item) => {
                      return <MenuItem value={item}>{item}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <div className={classes.p_label} style={{fontWeight: 700}}>
                전화번호 인증 *
              </div>
              <p className={classes.p_label}>
                회원가입시 가입한 휴대전화 번호로 인증번호가 전송됩니다.
                인증해주세요.
              </p>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '78%', position: 'relative'}}>
                  <TextField
                    value={code}
                    size='small'
                    style={{width: '100%'}}
                    placeholder='인증번호 입력바랍니다.'
                    onChange={(e) => setCode(e.target.value)}
                    error={!code ? true : false}
                    disabled={checkOtp === 3 ? true : false}
                  />
                  <span
                    className='payment-spanDialog'
                    style={{
                      color: '#0067FF',
                      borderBottom: '1px solid #0067FF',
                      fontWeight: 700,
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '0.6rem',
                      right: '1rem',
                      width: '39px',
                      fontSize: '14px',
                    }}
                    onClick={() => {
                      checkOtp !== 3 && getOtp()
                    }}
                  >
                    보내기
                  </span>
                </div>
                <button
                  className={`payment-button-check-phoneNumber ${
                    checkOtp === 1
                      ? 'accuracy'
                      : checkOtp === 2
                      ? 'error'
                      : 'confirm'
                  }`}
                  onClick={() => {
                    handleCheckOtp()
                  }}
                  style={{height: '48px', width: '20%'}}
                  disabled={buttonStatus === 3 ? true : false}
                >
                  인증전송
                </button>
              </div>
            </div>
            <p
              className='payment-spanDialog'
              style={{textAlign: 'start', width: '100%'}}
            >
              {checkOtp === 2 ? (
                <span
                  style={{color: '#F52C1D', display: 'flex', fontSize: '14px'}}
                >
                  <img src={noteRed} alt='' style={{width: '20px'}} />
                  &nbsp;잘못된 인증 코드를 입력했습니다.
                </span>
              ) : checkOtp === 3 ? (
                <span
                  style={{color: '#11CE90', display: 'flex', fontSize: '14px'}}
                >
                  <img src={noteGreen} style={{width: '20px'}} alt='' />
                  &nbsp;성공적인 인증.
                </span>
              ) : (
                ''
              )}
            </p>
            <div style={{width: '100%'}} id='recaptcha-container'></div>
          </div>
        )}
        <div>
          <p className='payment-title' style={{margin: '1rem 0'}}>
            결제 동의
          </p>
          <p style={{borderBottom: '1px solid #A2A5AA', margin: '0'}}></p>
          <p style={{marginTop: '0', padding: '0rem 0'}}>
            <div style={{display: 'flex', padding: '1rem 0'}}>
              <input
                type='checkbox'
                id='vehicle1'
                name='vehicle1'
                value='Bike'
                checked={check}
                style={{transform: 'scale(1.5)'}}
                onClick={() => setCheck(!check)}
              />
              <span
                className='payment-span'
                style={{marginLeft: '0.5rem', fontWeight: '600'}}
                onClick={() => setCheck(!check)}
              >
                키인승인 결제 정보에 동의합니다.
              </span>
            </div>
            <span className='payment-span' style={{padding: '1rem 0'}}>
              환불을 요청할 경우, 환불 수수료10% 제외된 금액으로 환불처리됩니다.
            </span>
            <p style={{margin: '0.5rem 0'}}></p>
            <span className='payment-span' style={{padding: '1rem 0'}}>
              (프로젝트 진행 이력이 없는 경우 환불 수수료는 발생되지 않습니다.)
            </span>
          </p>
        </div>
        <Button
          variant='contained'
          style={{width: '100%'}}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </div>
  )
}

export default PaymentBankCredit
