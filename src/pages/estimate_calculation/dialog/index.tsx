import {Button, makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import {useEffect, useState} from 'react'
import {useAppDispatch} from '../../../app/hooks'
import InputBase from '../../../components/input'
import UploadFileDev from '../../../components/upload_file-dev'
import {optionAction} from '../../../feature/option/optionSlice'
import {OptionType} from '../../../types/option.type'

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

const DialogCreate = (props: {
  open: boolean
  setOpen: () => void
  type: string
  tag: string
  data?: OptionType
}) => {
  const classes = useStyles()
  const handleClose = () => {
    props.setOpen()
  }
  const [data, setData] = useState<OptionType>({
    nameOption: '',
    price: 0,
    schedule: 0,
    image: '',
  })
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    if (props.data?.id) {
      dispatch(
        optionAction.update({
          data: {...data},
          setOpen: handleClose,
        })
      )
    } else
      dispatch(
        optionAction.create({
          data: {...data, tag: props.tag, type: props.type},
          setOpen: handleClose,
        })
      )
  }
  useEffect(() => {
    if (props.data) {
      setData({
        ...props.data,
        price: Number(props.data.price),
        schedule: Number(props.data.schedule),
      })
    } else {
      setData({
        nameOption: '',
        price: 0,
        schedule: 0,
        image: '',
      })
    }
  }, [props.data])

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
          onChange={(e) => setData({...data, nameOption: e})}
          label='Name Option'
          placeholder='Name Option'
          value={data.nameOption}
        />
        <InputBase
          onChange={(e) => setData({...data, schedule: Number(e)})}
          label='Schedule'
          placeholder='Schedule'
          type='number'
          value={data.schedule}
        />
        <InputBase
          onChange={(e) => setData({...data, price: Number(e)})}
          label='Price'
          placeholder='Price'
          type='number'
          value={data.price}
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
          // file={[]}
          file={data.image as string}
          setFile={(e) => setData({...data, image: e})}
        />
        {/* <input
          type='file'
          name='upload-file'
          onChange={(e: any) => setData({...data, image: e.target.files[0]})}
        /> */}
        <div>
          <Button variant='outlined' onClick={handleClose}>
            취소
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleSubmit()}
            disabled={
              !data.price || !data.nameOption || !data.schedule ? true : false
            }
          >
            완료
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogCreate
