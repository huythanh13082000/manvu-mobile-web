import {Button, Grid} from '@mui/material'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {FILE_API} from '../../apis/urlConfig'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {cardChannelActions} from '../../feature/card_channel/cardChannel.slice'
import {selectUser} from '../../feature/user/user.slice'
import './CardChannel.css'
import DialogReview from './dialogReview'
import DialogUserSNS, {UserMember} from './dialogUserSNS'
import noImage from '../../asset/images/no_image.png'

const CardChannel = (props: {
  status?: string
  data: {
    createdAt?: string
    user?: UserMember
    id?: string
    status?: number
    campaignId?: number
    postId?: number
    post?: {
      campaignId?: number
      createdAt?: string
      id?: number
      interactive?: boolean
      point?: number
      review?: string
      status?: number
      transactionId?: number
      updatedAt?: string
      url?: string
      userId?: string
      view?: number
    }
  }
}) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [openDialogReview, setOpenDialogReview] = useState(false)
  const user = useAppSelector(selectUser)
  const [like, setLike] = useState(false)
  useEffect(() => {
    if (props.data.post?.interactive) {
      setLike(true)
    }
  }, [props.data.post?.interactive])
  return (
    <Grid
      container
      padding='1rem'
      width='100%'
      border='1px solid #E1E1E1'
      alignContent='center'
    >
      <Grid item xs={6} container alignItems={'center'}>
        <img
          src={
            props.data?.user?.avatar
              ? `${FILE_API}${props.data?.user?.avatar}`
              : noImage
          }
          alt='avatar'
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginRight: '6px',
            objectFit: 'cover',
          }}
        />
        <Grid>
          <p className='ccn-p1'>
            {props.data?.user && props.data?.user.username}
          </p>
          <p className='ccn-p2'></p>
          <p className='ccn-p3'>
            {moment(props.data?.createdAt).format('YYYY/MM/DD hh:mm')}
          </p>
        </Grid>
      </Grid>
      {user.profile?.roles &&
      user.profile?.roles[0] &&
      user.profile?.roles[0].name === 'advertiser' ? (
        <Grid item xs={6}>
          <Grid
            item
            xs={12}
            container
            alignItems={'center'}
            justifyContent='end'
          >
            <Grid>
              {props.status === '0' ? (
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'white',
                    color: '#000000',
                    border: '1px solid #000000',
                    width: '132px',
                    height: '32px',
                    fontFamily: 'Noto Sans KR',
                    fontStyle: 'normal',
                    fontSize: '14px',
                  }}
                  onClick={() => setOpen(true)}
                >
                  <img
                    src='/img/naver.png'
                    alt=''
                    style={{marginRight: '3px'}}
                  />{' '}
                  채널보기
                </Button>
              ) : (
                props.data.postId && (
                  <a
                    className='ccn-b1'
                    style={{
                      height: '32px',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      color: '#000000',
                      border: '1px solid #000000',
                      width: '132px',
                      fontSize: '14px',
                    }}
                    target='newTab'
                    href={props.data.post?.url}
                  >
                    <img
                      src='/img/naver.png'
                      alt=''
                      style={{marginRight: '3px'}}
                    />{' '}
                    포스팅 보기
                  </a>
                )
              )}
            </Grid>
            {props.status !== '0' &&
            props.data.status === 1 &&
            props.data.postId &&
            props.data.post?.status === 1 ? (
              <Grid
                container
                bgcolor={'#D1D1D1'}
                justifyContent='center'
                width='132px'
                height={'32px'}
                alignItems='center'
                borderRadius={'5px'}
                style={{cursor: 'pointer', margin: '6px 0', marginTop: '6px'}}
              >
                <Grid>포스팅 완료</Grid>
              </Grid>
            ) : null}
            {props.status !== '0' &&
            props.data.status === 1 &&
            !props.data.postId ? (
              <p
                style={{
                  backgroundColor: '#C5C5C5',
                  color: '#FFFFFF',
                  width: '132px',
                  height: '32px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <img src='/img/pen.png' alt='' />
                포스팅 작성중
              </p>
            ) : null}
            {props.status !== '0' &&
            props.data.status === 1 &&
            props.data.postId &&
            props.data.post?.status === 0 ? (
              <Grid
                container
                item
                xs={12}
                // padding='0 2px'
                marginTop='6px'
                justifyContent={'end'}
              >
                {/* <Grid item xs={6}> */}
                <Button
                  variant='contained'
                  className='ccn-b-edit'
                  style={{
                    margin: '0 3px',
                    height: '32px',
                    width: '54px',
                    fontWeight: 400,
                    fontSize: '14px',
                    padding: 0,
                    textAlign: 'center',
                  }}
                  onClick={() => setOpenDialogReview(true)}
                >
                  수정요청
                </Button>
                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                <Button
                  variant='contained'
                  className='ccn-b-pass'
                  style={{
                    marginLeft: '3px',
                    height: '32px',
                    width: '54px',
                    padding: 0,
                    fontWeight: 400,
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 0,
                  }}
                  onClick={() => {
                    dispatch(
                      cardChannelActions.postCampaignStatus({
                        id: Number(props.data.campaignId),
                        status: 1,
                        idPost: Number(props.data.postId),
                        review: '',
                      })
                    )
                  }}
                >
                  <img src='/img/codicon_pass.png' alt='' /> 합격
                </Button>
                {/* </Grid> */}
              </Grid>
            ) : null}

            {props.status !== '0' &&
            props.data.status === 1 &&
            props.data.postId &&
            props.data.post?.status === 2 ? (
              <Button
                variant='outlined'
                style={{
                  color: '#FFFFFF',
                  height: '32px',
                  width: '132px',
                  backgroundColor: '#4C4C4C',
                  margin: '0 6px',
                  fontSize: '14px',
                }}
                onClick={() => {
                  dispatch(
                    cardChannelActions.postCampaignStatus({
                      id: Number(props.data.campaignId),
                      status: 0,
                      review: '',
                      idPost: Number(props.data.postId),
                    })
                  )
                }}
              >
                <img src='/img/eraser.png' alt='' /> 수정요청취소
              </Button>
            ) : null}

            {props.data.status === 0 ? (
              <Button
                variant='contained'
                className='ccn-b2'
                style={{
                  backgroundColor: '#44B400',
                  width: '132px',
                  height: '32px',
                  margin: '6px 0',
                  fontSize: '14px',
                  marginTop: '5px',
                }}
                onClick={() => {
                  dispatch(
                    cardChannelActions.replyRequest({
                      id: Number(props.data?.id),
                      status: 1,
                      campaignId: Number(props.data.campaignId),
                    })
                  )
                }}
              >
                승락
              </Button>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={5} container justifyContent='end'>
          <Grid>
            <img
              src={!like ? '/img/like.svg' : '/img/likeBlue.svg'}
              alt='like'
              onClick={() => {
                if (!like) {
                  dispatch(
                    cardChannelActions.advertiserLikePost(
                      Number(props.data.postId)
                    )
                  )
                  setLike(true)
                } else {
                  dispatch(
                    cardChannelActions.advertiserUnLikePost(
                      Number(props.data.postId)
                    )
                  )
                  setLike(false)
                }
              }}
            />
          </Grid>
        </Grid>
      )}
      <DialogUserSNS
        data={props.data && props.data?.user}
        open={open}
        setOpenDialog={() => setOpen(false)}
      />
      <DialogReview
        open={openDialogReview}
        data={props.data}
        setOpenDialog={() => setOpenDialogReview(false)}
      />
    </Grid>
  )
}

export default CardChannel
