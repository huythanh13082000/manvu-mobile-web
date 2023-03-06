import React, {useState, useEffect, useRef} from 'react'
import {makeStyles} from '@mui/styles'
import member from '../../asset/images/member_register.png'
import uploadIcon from '../../asset/icons/upload.png'
import {FILE_API} from '../../apis/urlConfig'

const useStyles = makeStyles({
  upload_avatar_container: {
    display: 'flex',
    '&>span': {
      margin: '0 auto',
      position: 'relative',
      width: '124px',
      height: '124px',
      '&>img:nth-of-type(1)': {
        width: '100%',
        height: '124px',
        borderRadius: '50%',
        objectFit: 'cover',
      },
      '&>img:nth-of-type(2)': {
        position: 'absolute',
        right: '5px',
        bottom: '5px',
      },
    },
  },
})

const UploadAvatar = (props: {
  setFile: (params?: File) => void
  avatar?: string
}) => {
  const classes = useStyles()
  const [file, setFile] = useState('')
  const refInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (props.avatar?.includes('https')) {
      setFile(`${props.avatar}`)
    } else if (props.avatar) setFile(`${FILE_API}${props.avatar}`)
  }, [props.avatar])
  function handleChange(e: any) {
    let url = URL.createObjectURL(e.target.files[0])
    props.setFile(e.target.files[0])
    setFile(url)
  }
  return (
    <div className={classes.upload_avatar_container}>
      <span
        onClick={() => {
          refInput.current?.click()
        }}
      >
        <img src={file ? file : member} alt='' />
        <img src={uploadIcon} alt='' />
      </span>
      <input
        hidden
        accept='image/*'
        type='file'
        name='upload-photo'
        onChange={handleChange}
        ref={refInput}
      />
    </div>
  )
}

export default UploadAvatar
