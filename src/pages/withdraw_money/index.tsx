import {
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosClient from '../../apis/axiosClient'
import {VERIFY_PHONE_NUMBER} from '../../apis/urlConfig'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {BANKING_LIST} from '../../constants'
import {selectUser} from '../../feature/user/user.slice'
import {withdrawMoneyActions} from '../../feature/withdraw_money/withdrawMoney.slice'
import {auth} from '../../firebaseConfig'
import {WithdrawMoney} from '../../types/withdraw.type'
import {numberWithCommas, numberWithCommasNew} from '../../utils'
import noteRed from '../../asset/icons/note_red.png'
import noteGreen from '../../asset/icons/note_green.png'

const useStyles = makeStyles({
  withdraw_money: {},
  payment_button_check_phoneNumber: {
    fontSize: '14px',
    fontWeight: 700,
    height: '48px',
    width: '20%',
  },
  accuracy: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    background: '#ffffff',
    border: '1px solid #252b32',
    borderRadius: '4px',
  },
  confirm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    background: '#f2fff5',
    border: '1px solid #00a811',
    borderRadius: '4px',
    color: '#00a811',
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    background: '#ffffff',
    border: '1px solid #fe7182',
    borderRadius: '4px',
    color: '#fe7182',
  },
  wm_p2: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#222222',
  },
  tb1: {
    borderCollapse: 'collapse',
    width: '100%',
    fontFamily: 'Noto Sans KR',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    fontWeight: 400,
    fontSize: '14px',
  },
  th: {
    fontSize: '14px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    fontWeight: 400,
  },
})

const WithdrawMoneyPage = (props: {data?: WithdrawMoney}) => {
  const classes = useStyles()
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}
  const [bankName, setBankName] = useState('')
  const [point, setPoint] = useState('')
  const [name, setName] = useState('')
  const [identityCard, setIdentityCard] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [code, setCode] = useState<string>('')
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [buttonStatus, setButtonStatus] = useState(1)
  const [confirmOtp, setConfirmOtp] = useState<any>()
  const [checkOtp, setCheckOtp] = useState(1)
  const [id, setId] = useState<number>()
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('data_withdraw_money')
    if (data) {
      const dateParse = JSON.parse(data)
      setBankName(dateParse.recipientInformation.bankName)
      setPoint(numberWithCommas(dateParse.point.toString()))
      setName(dateParse.recipientInformation.name)
      setIdentityCard(dateParse.recipientInformation.identityCard.toString())
      setBankAccountNumber(
        dateParse.recipientInformation.bankAccountNumber.toString()
      )
      setCheck1(true)
      setCheck2(true)
      setId(dateParse.id)
    }
  }, [])
  useEffect(() => {
    return () => localStorage.removeItem('data_withdraw_money')
  })

  const handleChange = (event: SelectChangeEvent) => {
    setBankName(event.target.value as string)
  }
  const handleChangeinput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'bankAccountNumber') {
      setBankAccountNumber(event.target.value)
    } else if (event.target.name === 'point') {
      const text = event.target.value
      text.replaceAll(',', '')
      setPoint(numberWithCommasNew(text.replaceAll(',', '')))
    } else if (event.target.name === 'name') {
      setName(event.target.value)
    } else if (event.target.name === 'identityCard') {
      setIdentityCard(event.target.value)
    }
  }
  const handleUpdate = () => {
    const data: WithdrawMoney = {
      status: 0,
      recipientInformation: {
        bankName: bankName,
        bankAccountNumber: bankAccountNumber,
        name: name,
        identityCard: identityCard,
      },
      point: Number(point.replaceAll(',', '')),
      id: id,
    }
    dispatch(
      withdrawMoneyActions.update({
        data: data,
        history: navigate,
      })
    )
  }
  const onSubmit = () => {
    const data: WithdrawMoney = {
      status: 0,
      recipientInformation: {
        bankName: bankName,
        bankAccountNumber: bankAccountNumber,
        name: name,
        identityCard: identityCard,
      },
      point: Number(point.replaceAll(',', '')),
    }
    if (
      bankName &&
      bankAccountNumber &&
      name &&
      identityCard &&
      point &&
      check1 &&
      check2
    ) {
      dispatch(
        withdrawMoneyActions.createWithdrawMoney({
          data: data,
          history: navigate,
        })
      )
    } else if (
      !bankName ||
      !bankAccountNumber ||
      !name ||
      !identityCard ||
      !point
    ) {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: '????????? ????????? ???????????? ???????????????.',
          type: 'error',
        })
      )
    } else if (!check1 || !check2) {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: '????????? ??????????????????',
          type: 'error',
        })
      )
    }
  }
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
    <div className={classes.withdraw_money}>
      <Grid item xs={12}>
        <Grid item xs={12} container padding={' 0 1rem'}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <p className={classes.wm_p2}>
                ???????????? * (
                <span style={{color: '#A2A5AA'}}>
                  1?????? ????????? ???????????? ??????
                </span>
                )
              </p>
              <p className={classes.wm_p2} style={{color: '#9e03d1'}}>
                ?????? ?????? ????????? {numberWithCommas(Number(user.profile?.point))}
                P
              </p>
              <div style={{position: 'relative'}}>
                <TextField
                  name='point'
                  value={point}
                  onChange={handleChangeinput}
                  id='outlined-basic'
                  variant='outlined'
                  size='small'
                  placeholder='?????? ????????? ????????????'
                  error={point ? false : true}
                />
                <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                  <span style={{fontWeight: 700}}>
                    P |
                    <span
                      style={{color: '#9e03d1', cursor: 'pointer'}}
                      onClick={() =>
                        setPoint(numberWithCommas(Number(user.profile?.point)))
                      }
                    >
                      &nbsp;Max
                    </span>
                  </span>
                </div>
              </div>
            </Grid>
            <Grid
              container
              bgcolor={'#E9F3FF'}
              padding='1rem'
              marginTop={'1rem'}
            >
              <Grid>
                <img src='/img/danger.png' alt='' style={{width: '24px'}} />
                &nbsp;
              </Grid>
              <Grid item xs={11} style={{fontSize: '14px'}}>
                <p style={{color: '#0078FF', margin: 0, fontWeight: 700}}>
                  Note
                </p>
                <p>
                  <span style={{color: '#0078FF', fontWeight: 700}}>
                    {point}
                  </span>
                  ??? ?????????{' '}
                  <span style={{color: '#0078FF', fontWeight: 700}}>
                    {numberWithCommas(
                      Number(
                        (
                          (Number(point.replaceAll(',', '')) * 3.3) /
                          100
                        ).toFixed()
                      )
                    )}
                  </span>
                  ??? (3.3%) ????????? ????????? ????????? ??????
                </p>
              </Grid>
            </Grid>
            <p className={classes.wm_p2}>?????? ??????????????? ???????????? ?????? *</p>
            <Grid
              container
              bgcolor={'#E9F3FF'}
              padding='1rem'
              marginTop={'1rem'}
            >
              <Grid>
                <img src='/img/danger.png' alt='' style={{width: '24px'}} />
                &nbsp;
              </Grid>
              <Grid item xs={11} style={{fontSize: '14px'}}>
                <p style={{color: '#0078FF', margin: 0, fontWeight: 700}}>
                  Note
                </p>
                <p style={{margin: 0}}>
                  1???~10???:?????? 15??? <br />
                  11???~20???:?????? 25???
                  <br />
                  21???~??????:?????? 5???
                </p>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <p style={{marginRight: '1rem'}} className={classes.wm_p2}>
                ?????? ???????????? *
              </p>
              <Checkbox {...label} defaultChecked style={{color: '#03CB5E'}} />
              <p className={classes.wm_p2}>??????</p>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={bankName}
                onChange={handleChange}
                sx={{width: '100%', height: '48px'}}
                error={bankName ? false : true}
              >
                {BANKING_LIST.map((item) => {
                  return <MenuItem value={item.name}>{item.name}</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={12} margin='1rem 0'>
              <TextField
                name='bankAccountNumber'
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                size='small'
                value={bankAccountNumber}
                onChange={handleChangeinput}
                placeholder='???????????? - ??? ????????? ????????? ??????*'
                error={bankAccountNumber ? false : true}
              />
            </Grid>

            <Grid item xs={12}>
              <p className={classes.wm_p2}>
                ?????????(??????) * (
                <span style={{color: '#A2A5AA'}}>
                  ???????????? 3.3% ???????????? ??????
                </span>
                )
              </p>
              <TextField
                name='name'
                onChange={handleChangeinput}
                value={name}
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                size='small'
                placeholder='??????'
                error={name ? false : true}
              />
            </Grid>

            <Grid item xs={12} margin='1rem 0'>
              <TextField
                name='identityCard'
                value={identityCard}
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                onChange={handleChangeinput}
                size='small'
                // type='number'
                placeholder='?????????????????? ??????*'
                error={identityCard ? false : true}
              />
            </Grid>
            <Grid item xs={12}>
              <p className={classes.wm_p2} style={{margin: '1rem 0'}}>
                ???????????? ????????????
              </p>
              <Grid item xs={12}>
                <table className={classes.tb1}>
                  <tr>
                    <th className={classes.th} style={{width: '20%'}}>
                      ?????????
                    </th>
                    <th className={classes.th} style={{width: '20%'}}>
                      ??????
                    </th>
                    <th className={classes.th} style={{width: '60%'}}>
                      ?????????
                    </th>
                  </tr>
                  <tr>
                    <td className={classes.td}>NICE????????????</td>
                    <td className={classes.td}>???????????? </td>
                    <td className={classes.td}>
                      ?????? ???????????? ?????? ???????????? ?????? ?????????????????? ?????????
                      ????????? ???????????? ??????
                    </td>
                  </tr>
                </table>
                <Grid item xs={12} container>
                  <Checkbox
                    {...label}
                    // defaultChecked
                    onClick={() => {
                      check1 ? setCheck1(false) : setCheck1(true)
                    }}
                    checked={check1}
                    style={{color: '#03CB5E'}}
                  />
                  <p className={classes.wm_p2} style={{fontWeight: 500}}>
                    ???????????? ??????????????? ?????? ???????????????.
                  </p>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <table className={classes.tb1}>
                  <tr>
                    <th className={classes.th} style={{width: '40%'}}>
                      ??????
                    </th>
                    <th className={classes.th} style={{width: '30%'}}>
                      ??????
                    </th>
                    <th className={classes.th} style={{width: '30%'}}>
                      ????????? ????????????
                    </th>
                  </tr>
                  <tr>
                    <td className={classes.td}>
                      ????????????: ????????? ???????????? ??????, ??????????????????:
                      ????????????????????? ?????? ??????
                    </td>
                    <td className={classes.td}>
                      ????????????, ??????, ??????????????????{' '}
                    </td>
                    <td className={classes.td}>??????????????? ????????? ??????</td>
                  </tr>
                </table>
              </Grid>

              <Grid item xs={12} container>
                <Checkbox
                  {...label}
                  onClick={() => {
                    check2 ? setCheck2(false) : setCheck2(true)
                  }}
                  checked={check2}
                  style={{color: '#03CB5E'}}
                />
                <p className={classes.wm_p2} style={{fontWeight: 500}}>
                  ???????????? ????????? ????????? ???????????????.
                </p>
              </Grid>
              <div>
                <div>
                  <p
                    // className='payment-spanDialog'
                    style={{
                      fontWeight: 700,
                      fontSize: '16px',
                      marginBottom: '0px',
                    }}
                  >
                    ???????????? ?????? *
                  </p>
                  <p style={{width: '100%', fontSize: '14px'}}>
                    ??????????????? ????????? ???????????? ????????? ??????????????? ???????????????.
                    ??????????????????.
                  </p>
                  <div
                    style={{display: 'flex', justifyContent: 'space-between'}}
                  >
                    <div style={{width: '78%', position: 'relative'}}>
                      <TextField
                        value={code}
                        size='small'
                        style={{width: '100%'}}
                        placeholder='???????????? ??????????????????.'
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
                          top: '0.7rem',
                          right: '1rem',
                          width: '39px',
                          fontSize: '14px',
                        }}
                        onClick={() => {
                          checkOtp !== 3 && getOtp()
                        }}
                      >
                        ?????????
                      </span>
                    </div>
                    <button
                      className={`${classes.payment_button_check_phoneNumber} ${
                        checkOtp === 1
                          ? `${classes.accuracy}`
                          : checkOtp === 2
                          ? `${classes.error}`
                          : `${classes.confirm}`
                      }`}
                      onClick={() => {
                        handleCheckOtp()
                      }}
                      disabled={buttonStatus === 3 ? true : false}
                    >
                      {buttonStatus === 3 ? '????????????' : '????????????'}
                    </button>
                  </div>
                </div>
                <p
                  style={{textAlign: 'start', width: '100%', fontSize: '12px'}}
                >
                  {checkOtp === 2 ? (
                    <span style={{color: '#F52C1D', display: 'flex'}}>
                      <img src={noteRed} alt='' style={{width: '20px'}} />
                      &nbsp;????????? ?????? ????????? ??????????????????.
                    </span>
                  ) : checkOtp === 3 ? (
                    <span style={{color: '#11CE90', display: 'flex'}}>
                      <img src={noteGreen} style={{width: '20px'}} alt='' />
                      &nbsp;???????????? ??????.
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <div style={{width: '100%'}} id='recaptcha-container'></div>
              </div>
              <Grid item xs={12} container marginTop='2rem'>
                <Button
                  variant='contained'
                  style={{width: '100%'}}
                  onClick={() => (id ? handleUpdate() : onSubmit())}
                  disabled={
                    !identityCard ||
                    !name ||
                    !bankAccountNumber ||
                    !bankName ||
                    !point ||
                    checkOtp !== 3
                      ? true
                      : false
                  }
                >
                  ????????????
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default WithdrawMoneyPage
