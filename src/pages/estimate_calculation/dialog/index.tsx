import { Button, makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import InputBase from '../../../components/input'
import UploadFileDev from '../../../components/upload_file-dev'

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
    '&>div:last-child': {
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
          label='Name Option'
          placeholder='Name Option'
        />
        <InputBase
          onChange={() => console.log(1)}
          label='Schedule'
          placeholder='Schedule'
        />
        <InputBase
          onChange={() => console.log(1)}
          label='Price'
          placeholder='Price'
          type='number'
          icon={
            <span
              style={{
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#000000',
              }}
            >
              원
            </span>
          }
        />
        <UploadFileDev
          label='이미지 업로드'
          placeholder='파일 선택'
          file={[]}
          setFile={() => console.log(11)}
        />
        <div>
          <Button variant='outlined' onClick={handleClose}>
            취소
          </Button>
          <Button variant='contained' color='primary'>
            완료
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogCreate
