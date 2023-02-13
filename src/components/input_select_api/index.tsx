import { makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useEffect, useState } from 'react'

const useStyles = makeStyles({
  container_input_select_api: {
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
    '&>svg': {
      position: 'absolute',
      top: '55px',
      right: '7px',
    },
    '&>div': {
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
      padding: '0.5rem 0',
      width: '100%',
      position: 'absolute',
      background: 'white',
      zIndex: 100,
      '&>p': {
        padding: '0.5rem 1rem',
        margin: '0',
      },
      '&>p:hover': {
        background: '#E5E7EB',
      },
    },
  },
})

const InputSelectApi = (props: {
  label: string
  placeholder: string
  require?: boolean
  onChange: (event: any) => void
  type?: 'text' | 'number'
}) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [value, setValue] = useState<string>('')
  const [data, setData] = useState<string[]>(['asdsdadas', 'asdasdsdaasdsda'])
  const handleSelect = (params: string) => {
    setValue(params)
    setShow(false)
  }
  useEffect(() => {}, [show])
  return (
    <div className={classes.container_input_select_api}>
      <label htmlFor={props.label}>
        {props.label} {props.require && <span>*</span>}
      </label>
      <br />
      <input
        type={props.type ? props.type : 'text'}
        id={props.label}
        placeholder={props.placeholder}
        required={props.require}
        onChange={(e) => props.onChange(e.target.value)}
        onClick={() => setShow(true)}
        value={value}
      />
      <ExpandMoreIcon />
      <div style={!show ? {display: 'none'} : {}}>
        {data.map((item) => (
          <p
            onClick={() => {
              handleSelect(item)
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default InputSelectApi
