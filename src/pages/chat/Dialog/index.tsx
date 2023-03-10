import CloseIcon from '@mui/icons-material/Close'
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import './Dialog.css'

import {useAppDispatch} from '../../../app/hooks'
import {Question} from '../../../types/question.type'
import {requestActions} from '../../../feature/request/request.slice'
import UploadImg from '../../../components/UploadImg'

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
              border: '2px solid #4D4D4D',
              padding: '2px',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function DialogRequest(Props: {
  open: boolean
  setOpenDialog: Function
  question?: Question
  status?: string
  setQuestion: Function
  setOpenDialogCreate?: () => void
}) {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = React.useState(Props.open)
  const [type, setType] = React.useState<string>()
  const [phoneNumber, setPhoneNumber] = React.useState<string>()
  const [category, setCategory] = React.useState<string>()
  const [content, setContent] = React.useState<string>()
  const [file, setFile] = React.useState<string[]>([])
  const clearInput = () => {
    setType('')
    setPhoneNumber('')
    setCategory('')
    setFile([])
    setContent('')
  }
  const createQuestion = () => {
    const formData = new FormData()
    file.forEach((item) => {
      if (typeof item !== 'string') formData.append('images', item)
    })
    dispatch(
      requestActions.createQuestion({
        formData: formData,
        data: {
          content: content,
          category: category,
          phoneNumber: phoneNumber,
          type: type,
        },
      })
    )
    clearInput()
    handleClose()
  }
  const updateQuestion = () => {
    const formData = new FormData()
    const images: string[] = []
    file.forEach((item) => {
      if (typeof item !== 'string') {
        formData.append('images', item)
      } else if (!item.includes('blob')) {
        images.push(item)
      }
    })
    const thumbs: string[] = []
    images.forEach((item) => {
      thumbs.push(`/thumbs${item}`)
    })
    dispatch(
      requestActions.updateQuestion({
        formData: formData,
        data: {
          content: content,
          category: category,
          phoneNumber: phoneNumber,
          type: type,
          images: images,
          thumbnails: thumbs,
          id: Props.question?.id,
        },
      })
    )
    clearInput()
    Props.setQuestion()
    handleClose()
    Props.setOpenDialogCreate && Props.setOpenDialogCreate()
  }
  React.useEffect(() => {
    setType(Props.question?.type)
    setPhoneNumber(Props.question?.phoneNumber)
    setCategory(Props.question?.category)
    setFile(Props.question?.images || [])
    setContent(Props.question?.content)
  }, [Props.question])
  React.useEffect(() => {
    setOpen(Props.open)
  }, [Props.open])
  const options = [
    {id: 1, label: '광고 문의', value: 'ADVERTISING_INQUIRY'},
    {id: 2, label: '디자인수정', value: 'CHANGE_DESIGN', color: '#549C1F'},
    {
      id: 3,
      label: '광고비 결제',
      value: 'PAYMENT_ADVERTISEMENT',
      color: '#5290E3',
    },
    {id: 4, label: '기능제안', value: 'LIMIT_FUNCTION', color: '#0500FF'},
    {id: 5, label: '일반 문의', value: 'NORMAL_QUESTION', color: '#FF7A00'},
    {id: 6, label: '이용오류', value: 'ERROR', color: '#AD00FF'},
    {id: 7, label: '기타 문의', value: 'OTHER', color: '#D6B300'},
    {id: 8, label: '이벤트 문의', value: 'EVENT_QUESTION'},
  ]
  const handleClose = () => {
    Props.setOpenDialog()
  }
  const setFileUpload = (params: string[]) => {
    setFile(params)
  }
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullScreen={fullScreen}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          <p className='dialog-title'> 문의 작성</p>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid>
            <p className='r-p2'>문의구분</p>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={type}
              style={{width: '100%'}}
              onChange={(event: SelectChangeEvent) =>
                setType(event.target.value as string)
              }
            >
              {options.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <p className='r-p2'>휴대폰번호</p>
            <TextField
              className='r-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='휴대폰 번호를 입력해주세요.'
              type='number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p className='r-p2'>제목</p>
            <TextField
              className='r-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='제목을 입력해주세요.'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              className='dialog-TextareaAutosize'
              aria-label='minimum height'
              minRows={3}
              placeholder='내용을 입력해주세요.'
              value={content}
              style={{width: '100%'}}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <p className='r-p2'>캡처이미지 & 이미지 자료</p>
            <Grid item xs={12}>
              <UploadImg
                images={Props.question?.images}
                setFile={(params) => {
                  setFileUpload(params)
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            className='dialog-button'
            variant='contained'
            onClick={
              Props.status === 'create' ? createQuestion : updateQuestion
            }
          >
            문의접수
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
