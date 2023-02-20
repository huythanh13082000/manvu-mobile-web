import {makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {useRef} from 'react'
import excel from '../../asset/images/excel.png'
import pdf from '../../asset/images/pdf.png'

const useStyles = makeStyles({
  container_upload_file: {
    width: 'calc(100%)',
    position: 'relative',
    '&>label': {
      display: 'inline-block',
      marginBottom: '10px',
      marginTop: '10px',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '27px',
      color: '#111827',
      '&>span': {
        color: '#2C97EB',
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
    },
    '&>span': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '8px 16px',
      boxSizing: 'border-box',
      gap: '10px',
      width: '66px',
      background: '#2C97EB',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      position: 'absolute',
      top: '52px',
      right: '5px',
    },
    '&>div': {
      display: 'flex',
      position: 'absolute',
      flexWrap: 'wrap',
      top: '50px',
      left: '3px',
      '&>span': {
        background: '#F3F4F6',
        borderRadius: '4px',
        padding: '4px 12px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 2px',
        '&>img': {
          width: '18px',
          height: '18px',
        },
        '&>span': {
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#374151',
        },
      },
    },
  },
  '@media (max-width: 740px)': {
    container_input_base: {
      width: '100%',
      '&>label': {
        display: 'inline-block',
        marginBottom: '10px',
        marginTop: '10px',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#111827',
        '&>span': {
          color: '#2C97EB',
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
      },
      '&>div': {
        width: 'calc(100% - 66px)',
        display: 'flex',
        position: 'absolute',
        flexWrap: 'wrap',
        top: '50px',
        left: '3px',
        '&>span': {
          background: '#F3F4F6',
          borderRadius: '4px',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          margin: '1px 2px',
          '&>img': {
            width: '18px',
            height: '18px',
          },
          '&>span': {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#374151',
          },
        },
      },
    },
  },
})

const UploadFileDev = (props: {
  label?: string
  placeholder?: string
  setFile: (e: any) => void
  file?: File[]
}) => {
  const classes = useStyles()
  const refInput = useRef<HTMLInputElement>(null)
  const handleChange = (e: any) => {
    const data = [...e.target.files]
    props.file &&
      props.setFile([
        ...props.file,
        ...data.filter(
          (item) => item.type.includes('csv') || item.type.includes('pdf')
        ),
      ])
  }
  const deleteFile = (e: number) => {
    if (props.file)
      props.setFile([...props.file?.filter((item) => item.lastModified !== e)])
  }
  return (
    <div className={classes.container_upload_file}>
      <label htmlFor={props.label}>{props.label}</label>
      <br />
      <input id={props.label} placeholder={props.placeholder} />
      <input
        ref={refInput}
        type='file'
        onChange={handleChange}
        hidden
        name='upload-file'
        multiple
      />
      <span onClick={() => refInput.current && refInput.current.click()}>
        업로드
      </span>
      <div>
        {props.file?.map((item) => (
          <span key={item.lastModified}>
            <img src={item.name.includes('csv') ? excel : pdf} alt='' />
            <span>{item.name}</span>
            <div onClick={() => deleteFile(item.lastModified)}>
              <CloseIcon />
            </div>
          </span>
        ))}
      </div>
    </div>
  )
}

export default UploadFileDev
