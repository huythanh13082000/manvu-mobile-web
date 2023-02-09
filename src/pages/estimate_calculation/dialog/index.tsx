import {Button, makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import InputBase from '../../../components/input'

const useStyles = makeStyles({
  container_dialog_create: {
    width: '440px',
    padding: '1rem',
    '&>p': {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '28px',
      textAlign: 'center',
      color: '#13191D',
    },
    '&>div:nth-child(3)': {
      display: 'flex',
      justifyContent: 'center',
      margin: '1rem 0 0',
      '&>button': {
        width: '116px',
        height: '42px',
        margin: '0 0.5rem',
      },
      '&>button:nth-child(2)': {
        background: '#0078FF',
        width: '116px',
        height: '42px',
      },
    },
  },
})

const DialogCreate = (props: {open: boolean; setOpen: () => void}) => {
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
    >
      <div className={classes.container_dialog_create}>
        <p>새로 추가 </p>
        <InputBase
          onChange={() => console.log(1)}
          label='그룹이름 입력창'
          placeholder='그룹명을 입력해주세요'
        />
        <div>
          <Button variant='outlined' onClick={handleClose}>취소</Button>
          <Button variant='contained' color='primary'>
            완료
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogCreate
