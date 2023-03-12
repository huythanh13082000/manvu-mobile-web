import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import CardInappNotification from '../../components/card_notification'
import {
  inappNotificationActions,
  selectListInappNotification,
} from '../../feature/notification/inappNotificationSlice'

const useStyles = makeStyles({
  notification_container: {},
})

const Notification = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState<number>(0)
  useEffect(() => {
    if (localStorage.getItem('token'))
      dispatch(
        inappNotificationActions.getInappNotification({
          limit: 10,
          offset: offset,
        })
      )
  }, [dispatch, offset])
  const listInappNotification = useAppSelector(selectListInappNotification)
  return (
    <div className={classes.notification_container}>
      <AppBarCustom title='알림' />
      {listInappNotification && (
        <InfiniteScroll
          dataLength={listInappNotification.length}
          next={() => setOffset(offset + 5)}
          hasMore={true}
          loader={<></>}
        >
          {listInappNotification?.map((item) => (
            <CardInappNotification item={item} key={item.id} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Notification
