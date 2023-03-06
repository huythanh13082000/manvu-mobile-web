import React, {useState} from 'react'
import makeStyles from '@mui/styles/makeStyles'
import eye from '../../asset/images/eye.png'
import eyeClosed from '../../asset/images/eye_closed.png'

const useStyles = makeStyles({
  input_base_container: {
    position: 'relative',
    marginBottom: '1rem',
    '&>input': {
      width: '100%',
      height: '48px',
      border: '0.5px solid #A2A5AA',
      boxSizing: 'border-box',
      borderRadius: '6px',
      padding: '12px 16px',
      fontSize: '14px',
      paddingLeft: '46px',
    },
    '&>img:nth-child(2)': {
      position: 'absolute',
      width: '24px',
      height: '24px',
      top: '12px',
      left: '14px',
    },
    '&>img:nth-child(3)': {
      position: 'absolute',
      width: '24px',
      height: '24px',
      top: '12px',
      right: '14px',
    },
  },
})

const InputBase = (props: {
  placeholder?: string
  onChange: (e: any) => void
  type: 'text' | 'number' | 'password'
  iconLeftUrl?: any
  disabled?: boolean
}) => {
  const classes = useStyles()
  const [hidePassword, setHidePassword] = useState(false)
  return (
    <div className={classes.input_base_container}>
      <input
        type={
          props.type !== 'password'
            ? props.type
            : hidePassword
            ? 'text'
            : 'password'
        }
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
      />
      <img src={props.iconLeftUrl} alt='' />
      {props.type === 'password' && (
        <img
          src={hidePassword ? eye : eyeClosed}
          alt=''
          onClick={() => setHidePassword(!hidePassword)}
        />
      )}
    </div>
  )
}

export default InputBase
