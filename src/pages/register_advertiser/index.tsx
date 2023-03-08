import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import UploadAvatar from '../../components/upload_avatar'
import {selectUser} from '../../feature/user/user.slice'
import {DatePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import moment from 'moment'
import {selectSnsUserInfor} from '../../feature/auth/auth.slice'
import {selectListTopic, topicAction} from '../../feature/topics/topics.slice'
import {Topic} from '../../types/topic.type'
import {registerAdvertiserAction} from '../../feature/register_advertiser/registerAdvertiser.slice'
import AppBarCustom from '../../components/appbar'
import axiosClient from '../../apis/axiosClient'
import {REMOVE_ACCOUNT} from '../../apis/urlConfig'
import UploadImg from '../../components/UploadImg'
import PhoneInput from 'react-phone-input-2'
import {Close} from '@mui/icons-material'
import './register-company.css'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  register_advertiser_container: {
    '&>div': {
      padding: '1rem',
      '&>div': {
        '&>label': {
          fontWeight: 700,
        },
      },
    },
  },
})

const RegisterAdvertiser = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const [file, setFile] = useState<File>()
  const [companyLink, setCompanyLink] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState<string>('')
  const [companyName, setCompanyName] = useState('')
  const [companyTargetGender, setCompanyTargetGender] = useState('')
  const [topicIds, setTopicIds] = useState<any[]>([])
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyBusinessType, setCompanyBusinessType] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [year, setYear] = useState<Number>(moment().year())
  const [avatar, setAvatar] = useState<any>('')
  const [snsEmail, setSnsEmail] = useState('')
  const [companyStaffContact, setCompanyStaffContact] = useState('')
  const [error, setError] = useState<string[]>([])
  const [loginType, setLoginType] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const snsUserInfor = useAppSelector(selectSnsUserInfor)
  const listTopic = useAppSelector(selectListTopic)

  const handleChangeFile = (params?: File) => {
    setFile(params)
  }
  const [selected, setSelected] = useState<string[]>([])
  const handleChangeSelect = async (event: any) => {
    const value = event.target.value
    setSelected(value)
  }
  useEffect(() => {
    const array1: any[] = []
    selected &&
      selected.forEach((items: string) => {
        let array = listTopic?.filter((item: Topic) =>
          item.text.includes(items)
        )
        array1.push(array && array[0])
      })
    setTopicIds(array1)
  }, [selected, listTopic])
  const registerAdvertiser = () => {
    const arrayTopicId: number[] = []
    topicIds.forEach((item: {id: number; text: string}) => {
      arrayTopicId.push(item.id)
    })
    const formData = new FormData()
    formData.append('avatar', file || '')
    formData.append('companyLink', companyLink)
    formData.append('companyName', companyName)
    formData.append('username', companyName)
    formData.append('companyTargetGender', companyTargetGender)
    formData.append('topicIds', JSON.stringify(arrayTopicId))
    formData.append('companyAddress', companyAddress)
    formData.append('companyBusinessType', companyBusinessType)
    formData.append('phoneNumber', `+${phoneNumber}`)
    formData.append('companyYearFounded', JSON.stringify(year))
    formData.append('companyStaffContact', companyStaffContact)
    if (location.pathname === `${ROUTE.RESISTER_ADVERTISER}/sns`) {
      if (snsUserInfor) {
        formData.append('snsLoginId', snsUserInfor.snsLoginId)
        formData.append('snsEmail', snsUserInfor.snsEmail)
        formData.append('loginType', JSON.stringify(loginType))
      }
    } else {
      formData.append('password', password)
      formData.append('retypePassword', retypePassword)
      formData.append('email', email)
    }

    if (location.pathname === `${ROUTE.RESISTER_ADVERTISER}/sns`) {
      dispatch(registerAdvertiserAction.signUpAdvertiserSns(formData))
    } else
      dispatch(
        registerAdvertiserAction.signUpAdvertiser({
          data: formData,
          history: navigate,
          user: {username: companyName, password: password},
        })
      )
  }
  const updateAdvertiser = () => {
    const arrayTopicId: number[] = []
    topicIds.forEach((item: {id: number; text: string}) => {
      arrayTopicId.push(item.id)
    })
    const formData = new FormData()
    formData.append('avatar', file ? file : avatar)
    formData.append('companyLink', companyLink)
    formData.append('companyName', companyName)
    formData.append('companyTargetGender', companyTargetGender)
    formData.append('topicIds', JSON.stringify(arrayTopicId))
    formData.append('companyAddress', companyAddress)
    formData.append('companyBusinessType', companyBusinessType)
    formData.append(
      'phoneNumber',
      phoneNumber.includes('+') ? `${phoneNumber}` : `+${phoneNumber}`
    )
    formData.append('companyYearFounded', JSON.stringify(year))
    formData.append('companyStaffContact', companyStaffContact)
    dispatch(
      registerAdvertiserAction.updateAdvertiser({
        form: formData,
        history: navigate,
      })
    )
  }

  const resetForm = () => {
    setAvatar('')
    setCompanyName('')
    setCompanyLink('')
    setCompanyTargetGender('')
    setCompanyStaffContact('')
    setCompanyAddress('')
    setCompanyBusinessType('')
    setPhoneNumber('')
    setYear(moment().year())
    setSelected([])
  }

  useEffect(() => {
    dispatch(topicAction.getListTopics())
  }, [dispatch])
  useEffect(() => {
    if (location.pathname === ROUTE.UPDATE_ADVERTISER && user.profile) {
      setAvatar(user.profile?.avatar)
      setCompanyName(user.profile?.companyName || '')
      setCompanyLink(user.profile?.companyLink || '')
      setEmail(user.profile?.email || '')
      setCompanyTargetGender(user.profile?.companyTargetGender || '')
      setCompanyStaffContact(user.profile?.companyStaffContact || '')
      setCompanyAddress(user.profile?.companyAddress || '')
      setCompanyBusinessType(user.profile?.companyBusinessType || '')
      setPhoneNumber(user.profile?.phoneNumber || '')
      setYear(Number(user.profile?.companyYearFounded) || 1)
      if (user.profile?.topics) {
        const arraySelected: string[] = []
        user.profile?.topics.forEach((item) => {
          if (item.text) arraySelected.push(item.text)
        })
        setSelected(arraySelected)
        setTopicIds(user.profile?.topics)
      }
    }
  }, [user, location.pathname])
  useEffect(() => {
    if (snsUserInfor) {
      setAvatar(snsUserInfor.photoURL)
      setSnsEmail(snsUserInfor.snsEmail)
      setEmail(snsUserInfor.snsEmail)
      setLoginType(snsUserInfor.loginType)
      setYear(moment().year())
    }
  }, [snsUserInfor])
  return (
    <div className={classes.register_advertiser_container}>
      <AppBarCustom title='광고주 회원가입' />
      <Grid container border='1px solid  #D1D1D1' width={'100%'}>
        <Grid item xs={12}>
          <p className='rc-p2'>1.프로필 이미지</p>
        </Grid>
        <Grid item xs={12} className='rc-grid-img' container>
          <UploadAvatar setFile={handleChangeFile} avatar={avatar} />
        </Grid>
        <Grid item xs={12}>
          <p className='rc-p2'>2.회사명</p>
          <TextField
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className='rc-input'
            id='outlined-basic'
            variant='outlined'
            size='small'
            placeholder='회사명을  입력해주세요.'
          />
        </Grid>
        <Grid item xs={12}>
          <p className='rc-p2'>3.타겟팅 성별</p>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='male'
              name='radio-buttons-group'
              row
              value={companyTargetGender}
              onChange={(e) => {
                setCompanyTargetGender(e.target.value)
              }}
            >
              <FormControlLabel value='0' control={<Radio />} label='남성' />
              <FormControlLabel value='1' control={<Radio />} label='여성' />
              <FormControlLabel value='2' control={<Radio />} label='무관' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <p className='rc-p2'>4.회사 사이트</p>
          <TextField
            value={companyLink}
            onChange={(e) => setCompanyLink(e.target.value)}
            className='rc-input'
            id='outlined-basic'
            variant='outlined'
            size='small'
            placeholder='url 입력바랍니다.'
          />
        </Grid>

        <Grid item xs={12}>
          <p className='rc-p2'>5.회사 제품 및 주제 설정</p>
          <FormControl
            style={{
              width: '100%',
            }}
          >
            <Select
              labelId='mutiple-select-label'
              multiple
              value={selected}
              onChange={handleChangeSelect}
              renderValue={(selected) => selected.join(', ')}
            >
              {listTopic &&
                listTopic.map((option: Topic) => (
                  <MenuItem key={option.id} value={option.text}>
                    <ListItemIcon>
                      <Checkbox checked={selected.indexOf(option.text) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option.text} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {location.pathname === ROUTE.RESISTER_ADVERTISER ||
        location.pathname === `${ROUTE.RESISTER_ADVERTISER}/sns` ? (
          <Grid item xs={12}>
            <p className='rc-p2'>
              6.아이디(<span style={{color: '#ACB1B6'}}>이메일 형식</span>)
            </p>
            <TextField
              error={error.includes('email') ? false : true}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (!emailRegex.test(e.target.value)) {
                  const errorNew = error.filter((item) => item !== 'email')
                  setError([...errorNew])
                } else {
                  setError([...error, 'email'])
                }
              }}
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='이메일 아이디 입력바랍니다.'
            />
          </Grid>
        ) : null}

        {location.pathname === ROUTE.RESISTER_ADVERTISER ? (
          <Grid item xs={12}>
            <p className='rc-p2'>7.비밀번호</p>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              type='password'
              placeholder='비밀번호를 입력해주세요.'
            />
          </Grid>
        ) : null}
        {location.pathname === ROUTE.RESISTER_ADVERTISER ? (
          <Grid item xs={12}>
            <p className='rc-p2'>비밀번호 확인</p>
            <TextField
              value={retypePassword}
              onChange={(e) => {
                setRetypePassword(e.target.value)
              }}
              type='password'
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='비밀번호를 입력해주세요.'
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Grid item xs={12}>
            <p className='rc-p2'>8.담당자 연락처</p>
            <TextField
              value={companyStaffContact}
              onChange={(e) => setCompanyStaffContact(e.target.value)}
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='회사 사업자번호 입력해주세요.'
            />
          </Grid>

          <Grid item xs={12}>
            <p className='rc-p2'>9.회사주소</p>
            <TextField
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='회사주소 입력해주세요.'
            />
          </Grid>
          <Grid item xs={12}>
            <p className='rc-p2'>10.회사 업종/업태</p>
            <TextField
              value={companyBusinessType}
              onChange={(e) => setCompanyBusinessType(e.target.value)}
              className='rc-input'
              id='outlined-basic'
              variant='outlined'
              size='small'
              placeholder='회사 업종/업태 입력해주세요'
            />
          </Grid>

          <Grid item xs={12}>
            <p className='rc-p2'>11.연락처</p>
            <PhoneInput
              inputStyle={{width: '100%', height: '48px'}}
              country='kr'
              value={phoneNumber}
              onChange={(e: string) => setPhoneNumber(e)}
              placeholder='연락처를 입력해주세요'
            />
          </Grid>
          <Grid item xs={12}>
            <p className='rc-p2'>12.설립연도</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                openTo='year'
                views={['year']}
                value={`${year}`}
                onChange={(newValue: any) => {
                  setYear(newValue?.year())
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      style={{width: '100%'}}
                      {...params}
                      inputProps={{value: year === 1 ? 2022 : year}}
                    />
                  )
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} container justifyContent='end'>
            <Button
              variant='contained'
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#0078FF',
                fontSize: '20px',
                fontWeight: 700,
                marginTop: '2rem',
              }}
              onClick={() =>
                location.pathname === ROUTE.UPDATE_ADVERTISER
                  ? updateAdvertiser()
                  : registerAdvertiser()
              }
            >
              완료
            </Button>
          </Grid>
          {location.pathname === ROUTE.UPDATE_ADVERTISER && (
            <Grid item xs={12} container justifyContent='end'>
              <Button
                variant='contained'
                style={{
                  width: '100%',
                  height: '48px',
                  marginTop: '1rem',
                  fontSize: '20px',
                  fontWeight: 700,
                  backgroundColor: '#000000',
                }}
                onClick={() => {
                  setOpen(true)
                }}
              >
                탈퇴
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='responsive-dialog-title'
      >
        <div style={{padding: '1rem'}}>
          <p style={{display: 'flex', justifyContent: 'end', margin: 0}}>
            <span onClick={() => setOpen(false)}>
              <Close />
            </span>
          </p>
          <p style={{margin: 0, textAlign: 'center'}}>
            회원을 탈퇴하시겠습니까?
          </p>
          <p style={{margin: '10px', textAlign: 'center'}}>
            탈퇴하면 모든 정보가 사라집니다.
          </p>
          <div style={{display: 'flex', justifyContent: 'end'}}>
            <span
              className='rc-btn'
              style={{background: '#F6F6F6', marginRight: '1rem'}}
              onClick={() => setOpen(false)}
            >
              아니요
            </span>
            <span
              className='rc-btn'
              style={{background: '#5A5DF8', color: '#FFFFFF'}}
              onClick={async () => {
                setOpen(false)
                await axiosClient.delete(REMOVE_ACCOUNT)
                navigate('/home')
                window.location.reload()
              }}
            >
              네
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default RegisterAdvertiser
