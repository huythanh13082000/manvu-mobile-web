import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  container_input_base: {
    width: '100%',
    position: 'relative',
    '&>label': {
      display: 'inline-block',
      marginBottom: '10px',
      marginTop: '10px',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '27px',
      color: '#1F293',
      '&>span': {
        color: '#F22828',
      },
    },
    '&>input': {
      width: '100%',
      height: '42px',
      fontFamily: 'Pretendard',
      paddingLeft: '10px',
      border: '1px solid #9CA3AF',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: '16px',
    },
    '&>input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&>span': {
      position: 'absolute',
      top: '54px',
      right: '13px',
    },
  },
})

const InputBase = (props: {
  label: string
  placeholder: string
  require?: boolean
  onChange: (event: any) => void
  type?: 'text' | 'number' | 'password' | 'email'
  icon?: any
  style?: React.CSSProperties
  value?: string | number
  disabled?: boolean
}) => {
  const classes = useStyles()
  return (
    <div className={classes.container_input_base}>
      <label htmlFor={props.label}>
        {props.label} {props.require && <span>*</span>}
      </label>
      <br />
      <input
        disabled={props.disabled}
        style={props.style ? {...props.style} : {}}
        type={props.type ? props.type : 'text'}
        id={props.label}
        placeholder={props.placeholder}
        required={props.require}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
      {props.icon && (
        <span>
          <>{props.icon}</>
        </span>
      )}
    </div>
  )
}

export default InputBase
