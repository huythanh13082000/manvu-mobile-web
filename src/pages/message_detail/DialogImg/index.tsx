import CloseIcon from '@mui/icons-material/Close'
import {Grid} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {FILE_API} from '../../../apis/urlConfig'

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

export default function DialogImg(Props: {
  open: boolean
  setOpenDialog: Function
  url: string
}) {
  const [open, setOpen] = React.useState(Props.open)
  React.useEffect(() => {
    setOpen(Props.open)
  }, [Props.open])

  const handleClose = () => {
    Props.setOpenDialog()
  }
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
          <img
            src={`${FILE_API}${Props.url}`}
            alt='img'
            style={{width: '100%', height: '100%'}}
          />
        </BootstrapDialogTitle>
      </BootstrapDialog>
    </div>
  )
}
