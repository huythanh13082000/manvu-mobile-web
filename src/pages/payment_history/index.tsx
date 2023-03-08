import {Grid} from '@mui/material'
import moment from 'moment'
import {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import {PAYMENT_HISTORY_ICON} from '../../constants'
import {
  paymentAction,
  selectListPaymentHistory,
} from '../../feature/payment/payment.slice'
import {selectUser} from '../../feature/user/user.slice'
import {numberWithCommas} from '../../utils'
import './paymentHistory_Points.css'

const PaymentHistory = () => {
  const [offset, setOffset] = useState<number>(0)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  useEffect(() => {
    dispatch(paymentAction.getListPaymentHistory({limit: 10, offset}))
  }, [dispatch, offset])
  const listPaymentHistory = useAppSelector(selectListPaymentHistory)

  return (
    <>
      <Grid container justifyContent={'center'}>
        <AppBarCustom title='포인트 관련' />
        <Grid
          container
          color={'#0078FF'}
          justifyContent='space-between'
          fontWeight={700}
          fontSize={14}
          padding='1rem'
          bgcolor={'#c5b9b91f'}
          alignItems='center'
        >
          <span
            style={{
              padding: '6px 24px',
              background: '#D1E7FF',
              borderRadius: '100px',
            }}
          >
            포인트 내역
          </span>
          <span>
            현재 내 포인트:{numberWithCommas(Number(user.profile?.point))}P
          </span>
        </Grid>
        <Grid item container>
          <Grid
            item
            xs={12}
            padding='0 1rem'
            margin={'0.5rem 0'}
            bgcolor='white'
            borderRadius={'10px'}
          >
            <Grid item xs={12} overflow='hidden'>
              <InfiniteScroll
                dataLength={listPaymentHistory.length}
                next={() => setOffset(offset + 5)}
                hasMore={true}
                loader={<></>}
              >
                {listPaymentHistory?.map((item) => {
                  return (
                    <>
                      <Grid key={item.id} item xs={12} padding='1rem 0'>
                        <Grid
                          item
                          xs={12}
                          fontSize='12px'
                          container
                          alignContent={'center'}
                          justifyContent='space-between'
                        >
                          <span style={{display: 'flex', alignItems: 'center'}}>
                            {' '}
                            <img
                              src={PAYMENT_HISTORY_ICON[`${item.type}`]}
                              alt=''
                              style={{
                                width: '30px',
                                height: '30px',
                                marginRight: '0.5rem',
                              }}
                            />
                            <span
                              style={{
                                backgroundColor: '#E5E5E5',
                                padding: '4px',
                                borderRadius: '5px',
                              }}
                            >
                              {item.type === '0'
                                ? '계좌이체'
                                : item.type === '1'
                                ? '신용카드'
                                : ''}
                            </span>
                          </span>
                          <span>
                            {' '}
                            {moment(item.createdAt).format(
                              'YYYY/MM/DD hh:mm a'
                            )}
                          </span>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent={'space-between'}
                        >
                          <p
                            style={{
                              width: '60%',
                              marginBottom: 0,
                              color: '#171A1F',
                              fontWeight: 600,
                            }}
                          >
                            {item.type === '0'
                              ? '계좌이체로 포인트 충'
                              : item.type === '1'
                              ? '카드결제로 포인트 충전'
                              : ''}
                          </p>
                          <p
                            style={{
                              color: '#6D00C3',
                              fontWeight: 700,
                              marginBottom: 0,
                            }}
                          >
                            +{numberWithCommas(Number(item.price))}P
                          </p>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        borderBottom='1px solid #A2A5AA'
                      ></Grid>
                    </>
                  )
                })}
              </InfiniteScroll>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PaymentHistory
