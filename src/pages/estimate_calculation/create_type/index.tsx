import {Button, makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import {useEffect, useState} from 'react'
import {useAppDispatch} from '../../../app/hooks'
import InputBase from '../../../components/input'
import {typeAction} from '../../../feature/type/typeSlice'

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

const DialogCreateType = (props: {open: boolean; setOpen: () => void}) => {
  const classes = useStyles()
  const handleClose = () => {
    props.setOpen()
  }
  const [nameType, setNameType] = useState<string>('')
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    dispatch(
      typeAction.create({
        data: {name: nameType},
        setOpen: handleClose,
      })
    )
  }
  // useEffect(() => {
  //   setNameType(props.type.nameType)
  // }, [props.type])

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={classes.container_dialog_create}>
        <p>CREATE TYPE </p>
        <InputBase
          onChange={(e) => setNameType(e)}
          label='Name type'
          placeholder='Name type'
          value={nameType}
        />

        <div>
          <Button variant='outlined' onClick={handleClose}>
            취소
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleSubmit()}
            disabled={!nameType ? true : false}
          >
            완료
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogCreateType
