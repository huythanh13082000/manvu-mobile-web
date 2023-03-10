import {Grid, Tab, Tabs} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import Point from '../../components/card_point'
import ComponentWH from '../../components/card_withdraw_history'
import {
  pointTransactionActions,
  selectListPointTransaction,
} from '../../feature/point_transaction/pointTransaction.slice'
import {selectUser} from '../../feature/user/user.slice'
import {
  selectListWithdraw,
  withdrawActions,
} from '../../feature/withdraw/withdraw.slice'
import {WithdrawMoney} from '../../types/withdraw.type'

const useStyles = makeStyles({
  point_transaction_container: {
    padding: '0 1rem',
    '&>div:nth-of-type(1)': {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid #C4C4C4',
    },
  },
})

const PointTransaction = (props: {setValue?: () => void}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [limitPoint, setLimitPoint] = useState(20)
  const [limitWithdraw, setLimitWithdraw] = useState(20)
  const [offsetPoint, setOffsetPoint] = useState<number>(0)
  const [offsetWithdraw, setOffsetWithdraw] = useState<number>(0)
  const [showTermsofuse, setShowTermsofuse] = useState(false)
  const dispatch = useAppDispatch()
  const listPointTransaction = useAppSelector(selectListPointTransaction)
  const listWithdraw = useAppSelector(selectListWithdraw)
  const [showWithdrawMoney, setShowWithdrawMoney] = useState(false)
  const user = useAppSelector(selectUser)
  const [dataWithdrawMoney, setDataWithdrawMoney] = useState<
    WithdrawMoney | undefined
  >(undefined)
  useEffect(() => {
    dispatch(
      pointTransactionActions.getPointTransaction({
        limit: limitPoint,
        offset: offsetPoint,
      })
    )
  }, [dispatch, limitPoint, offsetPoint])

  useEffect(() => {
    dispatch(
      withdrawActions.getListWithdraw({
        limit: limitWithdraw,
        offset: offsetWithdraw,
      })
    )
  }, [dispatch, limitWithdraw, offsetWithdraw, showWithdrawMoney])
  const withdrawMoneySuccess = () => {
    setValue(1)
    setShowWithdrawMoney(false)
  }
  return (
    <div className={classes.point_transaction_container}>
      <div>
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label='Tabs where each tab needs to be selected manually'
          style={{margin: 0, padding: 0}}
        >
          <Tab label='적립' />
          <Tab label='출금내역' />
        </Tabs>
      </div>
      {value === 0 && (
        <InfiniteScroll
          dataLength={listPointTransaction.length}
          next={() => setOffsetPoint(offsetPoint + 5)}
          hasMore={true}
          loader={<></>}
        >
          {listPointTransaction?.map((item) => {
            return (
              <Grid key={item.id} item xs={12}>
                <Point data={item} />
              </Grid>
            )
          })}
        </InfiniteScroll>
      )}
      {value === 1 && (
        <InfiniteScroll
          dataLength={listWithdraw.length}
          next={() => setOffsetWithdraw(offsetWithdraw + 5)}
          hasMore={true}
          loader={<></>}
        >
          {listWithdraw?.map((item) => {
            return (
              <Grid key={item.id} item xs={12}>
                <ComponentWH
                  data={item}
                  setShowWithdrawMoney={() => setShowWithdrawMoney(true)}
                  setDataWithdrawMoney={(data: WithdrawMoney) =>
                    setDataWithdrawMoney(data)
                  }
                  setValue={props.setValue}
                />
              </Grid>
            )
          })}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default PointTransaction
