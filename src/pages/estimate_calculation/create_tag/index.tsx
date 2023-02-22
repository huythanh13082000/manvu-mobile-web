import {Button, makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import {useEffect, useState} from 'react'
import {useAppDispatch} from '../../../app/hooks'
import InputBase from '../../../components/input'
import {tagAction} from '../../../feature/tag/tagSlice'

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

const DialogCreateTag = (props: {
  open: boolean
  setOpen: () => void
  type: string
  tag: {nameTag: string; id?: number}
}) => {
  const classes = useStyles()
  const handleClose = () => {
    props.setOpen()
  }
  console.log('tag', props.tag)
  const [nameTag, setNameTag] = useState<string>('')
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    !props.tag.id
      ? dispatch(
          tagAction.create({
            data: {name: nameTag, type: props.type},
            setOpen: handleClose,
          })
        )
      : dispatch(
          tagAction.update({
            data: {name: nameTag, type: props.type, id: props.tag.id},
            setOpen: handleClose,
          })
        )
  }
  useEffect(() => {
    setNameTag(props.tag.nameTag)
  }, [props.tag])

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={classes.container_dialog_create}>
        <p>CREATE TAG </p>
        <InputBase
          onChange={(e) => setNameTag(e)}
          label='Name tag'
          placeholder='Name tag'
          value={nameTag}
        />

        <div>
          <Button variant='outlined' onClick={handleClose}>
            취소
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleSubmit()}
            disabled={!nameTag || !props.type ? true : false}
          >
            완료
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogCreateTag
