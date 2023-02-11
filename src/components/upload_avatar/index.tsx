import {makeStyles} from '@mui/styles'
import React, {useState, useRef, useEffect} from 'react'
import inboxOut from '../../asset/images/inbox-out.png'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  container_upload_avatar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    gap: '8px',
    width: '100px',
    height: '100px',
    background: '#F9FAFB',
    border: '1px dashed #2C97EB',
    borderRadius: '12px',
    backgroundSize: 'cover',
    position: 'relative',
    '&>img': {
      width: '32px',
      height: '32px',
    },
    '&>span': {
      fontSize: '14px',
    },
    '&>input': {
      display: 'none',
    },
  },
})

const UploadAvatar = (props: {
  image: any
  setImage: (params?: FormData) => void
}) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState(props.image)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0])
    setAvatar(url)
    props.setImage(e.target.files[0])
    console.log(url)
  }
  return (
    <div style={{display: 'flex'}}>
      <div
        className={classes.container_upload_avatar}
        onClick={() => inputRef && inputRef.current && inputRef.current.click()}
        style={{backgroundImage: `url('${avatar}')`}}
      >
        {!avatar && (
          <>
            <img src={inboxOut} alt='' />
            <span>파일 선택</span>
          </>
        )}
        <input
          ref={inputRef}
          type='file'
          onChange={handleChange}
          hidden
          accept='image/*'
          name='upload-photo'
        />
      </div>
      {avatar && (
        <span onClick={() => setAvatar('')}>
          <CloseIcon />
        </span>
      )}
    </div>
  )
}

export default UploadAvatar
