import {TextareaAutosize} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core'
import InputBase from '../../../components/input'
import InputSelectApi from '../../../components/input_select_api'

const useStyles = makeStyles({
  container_create_estimate_calculation: {
    width: '50%',
    padding: '32px 16px',
    margin: '1rem auto',
    background: 'white',
    borderRadius: '4px',
    '&>div:nth-child(3)': {
      '&>label': {
        display: 'inline-block',
        marginBottom: '10px',
        marginTop: '10px',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '27px',
        color: '#1F293',
      },
    },
    '&>div:nth-child(7)': {
      '&>p': {
        fontSize: '18px',
      },
    },
    '&>div:nth-child(8)': {
      textAlign: 'center',
      '&>button': {
        width: '120px',
        height: '48px',
        background: '#0065F2',
        borderRadius: '6px',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: '1rem 1rem 2rem',
      },
    },
  },
})

const CreateEstimateCalculation = () => {
  const classes = useStyles()

  return (
    <div className={classes.container_create_estimate_calculation}>
      <InputSelectApi
        onChange={() => console.log(1)}
        label='그룹선택'
        placeholder='플랫폼 및 개발언어'
      />
      <InputBase
        onChange={() => console.log(1)}
        label='제목'
        placeholder='직위를 입력하세요.'
      />
      <div style={{display: 'inherit'}}>
        <label htmlFor='textarea'>서비스의 주요 기능</label>
        <br />
        <TextareaAutosize
          aria-label='minimum height'
          minRows={3}
          id='textarea'
          placeholder='예: 인테리어 업체와 소비자 매칭 서비스'
          style={{
            width: '100%',
            paddingLeft: '10px',
            height: '144px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <InputBase
        onChange={() => console.log(1)}
        label='금액'
        placeholder='판매가를 입력해주세요 '
      />
      <InputSelectApi
        onChange={() => console.log(1)}
        label='기간'
        placeholder='최대 용어 수를 선택하십시오'
      />
      <InputBase
        onChange={() => console.log(1)}
        label='설명 URL'
        placeholder='링크를 입력하세요'
        icon={<>원</>}
      />
      <div>
        <p>이미지 업로드</p>
        {/* <UploadImages /> */}
      </div>
      <div>
        <Button>완료</Button>
      </div>
    </div>
  )
}

export default CreateEstimateCalculation
