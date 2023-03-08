import CloseIcon from '@mui/icons-material/Close'
import {Grid, TextField} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {
  campaignDetailAction,
  selectcampaignDetail,
} from '../../../feature/campaign_detail/campaignDetail.slice'
import {cardActions} from '../../../feature/card/card.slice'
import {selectUser} from '../../../feature/user/user.slice'
import imageDialog from '../../../asset/images/img_dialog.png'
import './cardDialog.css'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function CustomizedDialogs(props: {
  open: boolean
  onClose(): void
  id?: number
  status?: string
  type?: string
}) {
  const [url, setUrl] = React.useState('')
  const [review, setReview] = React.useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  React.useEffect(() => {
    dispatch(campaignDetailAction.getCampaignDetail(Number(props.id)))
  }, [dispatch, props.id])

  const campaignDetail = useAppSelector(selectcampaignDetail)
  React.useEffect(() => {
    campaignDetail?.members.forEach((item) => {
      if (item.userId === user.profile?.userId) {
        if (item.post && item.post.url && item.post.review) {
          setUrl(item.post.url)
          setReview(item.post.review)
        }
      }
    })
  }, [campaignDetail, user])
  return (
    <div>
      <BootstrapDialog
        onClose={() => props.onClose()}
        aria-labelledby='customized-dialog-title'
        open={props.open}
        maxWidth='md'
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={() => props.onClose()}
        >
          <p className='ccd-p1' style={{textAlign: 'start'}}>
            링크를 보내기
          </p>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid item xs={12} textAlign='center'>
            <img src={imageDialog} alt='img' style={{width: '90px'}} />
            <p
              className='ccd-p1'
              style={{
                textAlign: 'center',
                margin: '0 auto',
                marginBottom: '2rem',
              }}
            >
              오호! 멋진 포스팅을 작성 하셨군요. 아래에 링크를 전달주세요!
            </p>
            {review && (
              <p className='ccd-p1'>
                <span style={{color: '#B10101'}}>수정요청</span>: {review}{' '}
              </p>
            )}
            <TextField
              name='link'
              id='outlined-basic'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              variant='outlined'
              size='small'
              placeholder='리뷰 링크 입력'
            />
            <Button
              className='ccd-button'
              variant='contained'
              onClick={() => {
                if (props.id && props.status === 'create') {
                  dispatch(
                    cardActions.postReviewCampaign({
                      id: props.id,
                      url: url,
                      type: props.type,
                    })
                  )
                } else if (props.id && props.status === 'update') {
                  dispatch(
                    cardActions.updateReviewCampaign({
                      id: props.id,
                      url: url,
                      type: props.type,
                    })
                  )
                }

                props.onClose()
              }}
            >
              완료
            </Button>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}
