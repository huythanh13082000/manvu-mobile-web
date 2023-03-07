import {makeStyles} from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
  input_form_container: {
    width: '100%',
    '&>label': {
      display: 'inline-block',
      marginBottom: '8px',
      margin: '1rem 0',
    },
    '&>input': {
      boxSizing: 'border-box',
      height: '48px',
      width: '100%',
      fontWeight: 500,
      fontSize: '17px',
      background: '#FFFFFF',
      border: '2px solid #ECEDEF',
      padding: '0 1rem ',
    },
  },
})

const InputForm = (props: {
  type?: 'number' | 'text' | 'password'
  placeholder: string
  label?: string
  onChange: (e: any) => void
  value?: string
  style?: React.CSSProperties
  disabled?: boolean
  hidden?:boolean
}) => {
  const classes = useStyles()
  return (
    <div className={classes.input_form_container} style={{...props.style}}>
      {props.label && <label htmlFor={props.label}>{props.label}</label>}
      <input
        value={props.value}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder}
        id={props.label}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
        hidden={props.hidden}
      />
    </div>
  )
}

export default InputForm
