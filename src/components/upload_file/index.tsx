import {makeStyles} from '@mui/styles'
import download from '../../asset/images/download.png'
import excel from '../../asset/images/excel.png'
import pdf from '../../asset/images/pdf.png'
import {BASE_URL} from '../../constants'
import InputBase from '../input'

const useStyles = makeStyles({
  container_upload_file: {
    width: '100%',
    position: 'relative',
    '&>div:nth:child(1)': {
      display: 'flex',
      flexFlow: 'column',
      '&>label': {
        margin: '1rem 0',
      },
    },
    '&>div:nth-child(2)': {
      display: 'flex',
      position: 'absolute',
      top: '48px',
      left: '3px',
      '&>a': {
        color: '#374151',
        textDecoration: 'none',
        '&>span': {
          background: '#F3F4F6',
          borderRadius: '4px',
          display: 'flex',
          width: '140px',
          boxSizing: 'border-box',
          alignItems: 'center',
          padding: '8px 8px',
          fontSize: '14px',

          '&>img': {
            width: '18px',
            height: '18px',
          },
          '&>div': {
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '24px',
          },
        },
      },
    },
  },
})

const UploadFile = (props: {file: string[]}) => {
  const classes = useStyles()
  console.log(12323, props.file)
  return (
    <div className={classes.container_upload_file}>
      <div>
        <InputBase
          label='기획서'
          placeholder=''
          onChange={() => console.log(1)}
          disabled
          icon={
            !props.file ? (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: '12px',
                  background: 'rgba(196, 196, 196, 0.5)',
                  borderRadius: '4px',
                  padding: '4px 16px',
                }}
              >
                파일 선택
              </span>
            ) : (
              <></>
            )
          }
        />
      </div>
      <div>
        {props.file &&
          props.file.map((item) => (
            <a href={`${BASE_URL}/${item}`} target='_blank' rel='noreferrer'>
              <span>
                <img src={item.includes('.pdf') ? pdf : excel} alt='' />
                <div>{item}</div>
                <img src={download} alt='' />
              </span>
            </a>
          ))}
      </div>
    </div>
  )
}

export default UploadFile
