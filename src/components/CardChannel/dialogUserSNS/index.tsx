import * as React from 'react'
import {styled} from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {Grid, TextField} from '@mui/material'
import {FILE_API} from '../../../apis/urlConfig'
import './dialogUserSNS.css'
import CopyToClipboard from 'react-copy-to-clipboard'
import {useAppDispatch} from '../../../app/hooks'
import {Topic} from '../../../types/topic.type'
import {snackBarActions} from '../../snackbar/snackbarSlice'
import facebookIcon from '../../../asset/icons/icon_facebook.png'
import instagramIcon from '../../../asset/icons/icon_instagram.png'
import naverIcon from '../../../asset/icons/icon_naver.png'
import tiktokIcon from '../../../asset/icons/tiktok.png'
import twitterIcon from '../../../asset/icons/icon_twitter.png'
import youtubeIcon from '../../../asset/icons/icon_youtube.png'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface UserMember {
  avatar?: string
  countPostAccepted?: number
  email?: string
  gender?: number
  snsEmail?: string
  snsLinks?: any[]
  topics?: Topic[]
  userId?: string
  username?: string
  addressList?: any[]
}
export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon
            style={{
              padding: '2px',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function DialogUserSNS(Props: {
  open: boolean
  setOpenDialog: Function
  data?: UserMember
  tabId?: number
}) {
  const [open, setOpen] = React.useState(Props.open)
  const [blog_naver, setBlog_naver] = React.useState('')
  const [instagram, setInstagram] = React.useState('')
  const [youtube, setYoutube] = React.useState('')
  const [facebook, setFacebook] = React.useState('')
  const [tiktok, setTiktok] = React.useState('')
  const [twitter, setTwitter] = React.useState('')
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    setOpen(Props.open)
  }, [Props.open])

  const handleClose = () => {
    Props.setOpenDialog()
  }
  React.useEffect(() => {
    if (Props.data?.snsLinks && Props.data?.snsLinks[0])
      setBlog_naver(Props.data?.snsLinks[0]['blog_naver'])
    if (Props.data?.snsLinks && Props.data?.snsLinks[1])
      setInstagram(Props.data?.snsLinks[1]['instagram'])
    if (Props.data?.snsLinks && Props.data?.snsLinks[2])
      setFacebook(Props.data?.snsLinks[2]['facebook'])
    if (Props.data?.snsLinks && Props.data?.snsLinks[3])
      setYoutube(Props.data?.snsLinks[3]['youtube'])
    if (Props.data?.snsLinks && Props.data?.snsLinks[4])
      setTiktok(Props.data?.snsLinks[4]['tiktok'])
    if (Props.data?.snsLinks && Props.data?.snsLinks[5])
      setTwitter(Props.data?.snsLinks[5]['twitter'])
  }, [Props.data?.snsLinks])
  return (
    <div>
      <BootstrapDialog
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          <Grid maxWidth='502px' padding='0 0.5rem'>
            <Grid
              item
              xs={12}
              container
              borderBottom='1px solid #E1E1E1'
              padding='0.5rem 0'
            >
              <Grid item xs={2}>
                <img
                  src={
                    Props.data?.avatar
                      ? `${FILE_API}${Props.data.avatar}`
                      : '/img/logo.png'
                  }
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  alt=''
                />
              </Grid>
              <Grid item xs={10}>
                <p className='dus_p1'>
                  이름:
                  <span className='dus_span1'>{Props.data?.username}</span>
                </p>
                <p className='dus_p1'>
                  선정횟수: {Props.data?.countPostAccepted}회
                </p>
                <p className='dus_p1'>
                  성별:{Props.data?.gender === 1 ? '남성' : '여자'}
                </p>
                <p className='dus_p1'>
                  채널 키워드:
                  {Props.data &&
                    Props.data.topics &&
                    Props.data.topics.map((item) => {
                      return <span>#{item.text} </span>
                    })}
                </p>
              </Grid>
            </Grid>
            <Grid>
              <p
                className='dus_p1'
                style={{fontWeight: 'bold', margin: '0.5rem 0'}}
              >
                SNS계정을 연결하기
              </p>
              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  container
                  margin='0.5rem 0'
                  justifyContent={'space-between'}
                >
                  <img
                    src={facebookIcon}
                    alt='facebook'
                    style={{height: '48px', width: '48px'}}
                  />
                  <a
                    href={facebook}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !facebook
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      value={facebook}
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      /* styles the input component */
                    />
                  </a>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  container
                  margin='0.5rem 0'
                  justifyContent={'space-between'}
                >
                  <img
                    src={instagramIcon}
                    alt='instagram'
                    style={{height: '48px', width: '48px'}}
                  />
                  <a
                    href={instagram}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !instagram
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      /* styles the input component */
                      value={instagram}
                    />
                  </a>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  container
                  margin='0.5rem 0'
                  justifyContent={'space-between'}
                >
                  <img
                    src={naverIcon}
                    alt=''
                    style={{height: '48px', width: '48px'}}
                  />
                  <a
                    href={blog_naver}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !blog_naver
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      value={blog_naver}
                    />
                  </a>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  container
                  margin='0.5rem 0'
                  justifyContent={'space-between'}
                >
                  <img
                    src={tiktokIcon}
                    alt=''
                    style={{height: '48px', width: '48px'}}
                  />
                  <a
                    href={tiktok}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !tiktok
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      value={tiktok}
                      inputProps={{
                        style: {
                          width: '100%',
                        },
                      }}
                    />
                  </a>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  container
                  margin='0.5rem 0'
                  justifyContent={'space-between'}
                >
                  <img
                    src={twitterIcon}
                    style={{height: '48px', width: '48px'}}
                    alt='instagram'
                  />
                  <a
                    href={twitter}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !twitter
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      value={twitter}
                    />
                  </a>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={12} container justifyContent={'space-between'}>
                  <img
                    src={youtubeIcon}
                    alt='instagram'
                    style={{height: '48px', width: '48px'}}
                  />
                  <a
                    href={youtube}
                    target={'_blank'}
                    rel='noopener noreferrer'
                    style={
                      !youtube
                        ? {pointerEvents: 'none', width: 'calc(100% - 56px)'}
                        : {width: 'calc(100% - 56px)'}
                    }
                  >
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='링크를 입력하기'
                      value={youtube}
                    />
                  </a>
                </Grid>
              </Grid>
              {Props.data?.addressList &&
                Props.data?.addressList.length > 0 &&
                Props.data?.addressList?.map((item) => (
                  <Grid
                    style={{background: '#F6F6F6', padding: '1rem'}}
                    key={item}
                    marginTop='1rem'
                  >
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent='space-between'
                      borderBottom='1px solid #030303'
                    >
                      <p
                        className='rca-title'
                        style={{
                          margin: 0,
                          marginBottom: '0.5rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <span>배송 주소</span>
                        <CopyToClipboard text={item.addressPostal}>
                          <Grid marginLeft='0.5rem'>
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #A2A5AA',
                                borderRadius: '4px',
                                height: '30px',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                dispatch(
                                  snackBarActions.setStateSnackBar({
                                    content: '복사 되었습니다.',
                                    type: 'success',
                                  })
                                )
                              }}
                            >
                              <img src='/img/copy.png' alt='' />{' '}
                              <span
                                style={{
                                  fontSize: '12px',
                                  marginRight: '5px',
                                  padding: '0 5px',
                                }}
                              >
                                복사
                              </span>
                            </span>
                          </Grid>
                        </CopyToClipboard>
                      </p>
                    </Grid>
                    <Grid item xs={12} container>
                      <Grid item xs={4}>
                        <p style={{marginTop: '4px'}}>받는 사람</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p style={{marginTop: '4px'}}>{item.receiver} </p>
                      </Grid>
                      <Grid item xs={4}>
                        <p style={{marginTop: '4px'}}> 연락처</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p style={{marginTop: '4px'}}>{item.phoneNumber} </p>
                      </Grid>

                      <Grid item xs={4}>
                        <p style={{marginTop: '4px'}}> 주소</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p style={{marginTop: '4px'}}>{item.addressPostal}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </BootstrapDialogTitle>
      </BootstrapDialog>
    </div>
  )
}
