import CloseIcon from '@mui/icons-material/Close'
import {Button, Grid, TextareaAutosize} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {useDispatch} from 'react-redux'
import {cardChannelActions} from '../../../feature/card_channel/cardChannel.slice'
import {UserMember} from '../dialogUserSNS'

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

export default function DialogReview(Props: {
  open: boolean
  setOpenDialog: Function
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
}) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(Props.open)
  const [review, setReview] = React.useState('')
  React.useEffect(() => {
    setOpen(Props.open)
  }, [Props.open])

  const handleClose = () => {
    Props.setOpenDialog()
  }
  React.useEffect(() => {
    if (Props.data && Props.data.post && Props.data.post?.review)
      setReview(Props.data.post?.review)
  }, [Props.data])
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
          <Grid
            item
            xs={12}
            maxWidth='502px'
            height='200px'
            container
            justifyContent='end'
            paddingTop='1rem'
          >
            <Grid item xs={12}>
              <TextareaAutosize
                style={{width: '100%'}}
                className='dialog-TextareaAutosize'
                aria-label='minimum height'
                minRows={3}
                placeholder='내용을 입력해주세요.'
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Grid>
            <Button
              variant='contained'
              style={{backgroundColor: '#0078ff'}}
              onClick={() => {
                dispatch(
                  cardChannelActions.postCampaignStatus({
                    id: Number(Props.data.campaignId),
                    review: review,
                    idPost: Number(Props.data.postId),
                    status: 2,
                  })
                )
                Props.setOpenDialog()
              }}
            >
              저장
            </Button>
          </Grid>
        </BootstrapDialogTitle>
      </BootstrapDialog>
    </div>
  )
}
