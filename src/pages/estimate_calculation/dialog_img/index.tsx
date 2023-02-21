import {makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import {BASE_URL} from '../../../constants'

const useStyles = makeStyles({
  container_dialog_create: {},
})

const DialogImg = (props: {
  open: boolean
  setOpen: () => void
  img: string
}) => {
  const classes = useStyles()
  const handleClose = () => {
    props.setOpen()
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='lg'
    >
      <div className={classes.container_dialog_create}>
        <img src={`${BASE_URL}/${props.img}`} alt='' style={{width: '100%'}} />
      </div>
    </Dialog>
  )
}

export default DialogImg
