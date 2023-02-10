import Snackbar from '@material-ui/core/Snackbar'
import {makeStyles, Theme} from '@material-ui/core/styles'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import React from 'react'
import {useAppSelector} from '../../app/hooks'
import {SelectSnackBar} from './snackbarSlice'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CustomizedSnackbars() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const snackbar = useAppSelector(SelectSnackBar)
  React.useEffect(() => {
    setOpen(snackbar.open)
  }, [snackbar])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.content}
        </Alert>
      </Snackbar>
    </div>
  )
}
