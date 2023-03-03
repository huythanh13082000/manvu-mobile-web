import {Button} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import {makeStyles} from '@mui/styles'
import {useNavigate} from 'react-router-dom'
import {TERMS_OF_USE} from '../../constants/termsOfUse'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  term_of_use_container: {
    padding: '1rem',
    '&>div:nth-of-type(1)': {
      fontWeight: 700,
      fontSize: '18px',
      color: '#222222',
      textAlign: 'center',
    },
    '&>div': {
      '&>p': {
        color: '#222222',
      },
      '&>div': {
        height: '24vh',
        overflow: 'auto',
        overflowX: 'hidden',
        border: '1px solid rgba(39, 39, 39, 0.37)',
        padding: '0 5px',
        '&>pre': {
          fontFamily: 'Noto Sans KR',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '14px',
          color: '#4D4D4D',
        },
      },
    },
    '&>div:nth-last-child(1)': {
      position: 'sticky',
      bottom: '0',
      zIndex: 100,
      '&>button': {
        width: '50%',
        fontSize: '14px',
        height: '56px',
        borderRadius: '0',
      },
      '&>button:nth-child(1)': {
        background: '#F3F3F3',
        color: '#222222',
      },
      '&>button:nth-child(2)': {
        background: '#0078FF',
        color: '#FFFFFF',
      },
    },
  },
})

const TermOfUse = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <div className={classes.term_of_use_container}>
      <div>약관동의</div>
      <div>
        <p>1. 이용약관 동의 (필수)</p>
        <div>
          <pre>{TERMS_OF_USE.one}</pre>
        </div>
      </div>
      <div>
        <p>2. 개인 정보 수집 및 이용 (필수)</p>
        <div>
          <pre>{TERMS_OF_USE.one}</pre>
        </div>
      </div>
      <div>
        <p>3. 위치정보 이용약권 (필수)</p>
        <div>
          <pre>{TERMS_OF_USE.one}</pre>
        </div>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label='이용약관,개인정보 수집 및 이용에 모두 동의합니다.'
        />
      </div>
      <div>
        <Button onClick={() => navigate(-1)}>취소</Button>
        <Button onClick={() => navigate(ROUTE.REGISTER)}>가입하기</Button>
      </div>
    </div>
  )
}

export default TermOfUse
