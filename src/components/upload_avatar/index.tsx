import React from 'react'
import {makeStyles} from '@mui/styles'
import member from '../../asset/images/member_register.png'

const useStyles = makeStyles({
  upload_avatar_container: {
    
  },
})

const UploadAvatar = () => {
  const classes = useStyles()
  return (
    <div className={classes.upload_avatar_container}>
      <img src={member} alt='' />
    </div>
  )
}

export default UploadAvatar
