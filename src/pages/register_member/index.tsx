import {
  Button,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import {makeStyles} from '@mui/styles'
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import {useEffect, useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import facebookIcon from '../../asset/icons/icon_facebook.png'
import instagramIcon from '../../asset/icons/icon_instagram.png'
import naverIcon from '../../asset/icons/icon_naver.png'
import tiktokIcon from '../../asset/icons/icon_tiktok.png'
import twitterIcon from '../../asset/icons/icon_twitter.png'
import youtubeIcon from '../../asset/icons/icon_youtube.png'
import mailIcon from '../../asset/icons/mail.png'
import plusIcon from '../../asset/icons/plus.png'
import AppBarCustom from '../../components/appbar'
import InputBase from '../../components/input'
import InputForm from '../../components/input_form'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import UploadAvatar from '../../components/upload_avatar'
import {authActions, selectSnsUserInfor} from '../../feature/auth/auth.slice'
import {registerMemberAction} from '../../feature/register_member/registerMember.slice'
import {selectListTopic, topicAction} from '../../feature/topics/topics.slice'
import {selectUser} from '../../feature/user/user.slice'
import {auth} from '../../firebaseConfig'
import {Topic} from '../../types/topic.type'
import DialogAddress from './dialog_address'
import {ROUTE} from '../../router/routes'

const useStyles = makeStyles({
  register_member_container: {
    '&>div': {
      padding: '1rem',
      '&>div': {
        '&>label': {
          fontWeight: 700,
        },
      },
      '&>div:nth-of-type(8)': {
        '&>div:nth-of-type(1)': {
          display: 'flex',
          justifyContent: 'space-between',
          color: '#4D4D4D',
          borderTop: '1px solid #4D4D4D',
          borderBottom: '1px solid #4D4D4D',
          padding: '1rem 0',
          '&>span': {
            fontWeight: 400,
            fontSize: '14px',
          },
          '&>span:nth-child(1)': {
            width: '19%',
          },
          '&>span:nth-child(2)': {
            width: '19%',
          },
          '&>span:nth-child(3)': {
            width: '40%',
          },
          '&>span:nth-child(4)': {
            width: '20%',
          },
        },
        '&>p': {
          display: 'flex',
          justifyContent: 'space-between',
          '&>span': {
            fontWeight: 400,
            fontSize: '14px',
          },
          '&>span:nth-child(1)': {
            width: '19%',
          },
          '&>span:nth-child(2)': {
            width: '19%',
          },
          '&>span:nth-child(3)': {
            width: '40%',
          },
          '&>span:nth-child(4)': {
            width: '20%',
          },
        },
        '&>div:nth-of-type(2)': {
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid #4D4D4D',
          '&>span': {
            padding: '1rem 0',
            display: 'flex',
            fontSize: '14px',
            color: '#4D4D4D',
          },
        },
      },
    },
  },
})

const RegisterMember = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [file, setFile] = useState<File>()
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [retypePassword, setRetypePassword] = useState<string>('')
  const [gender, setGender] = useState<number>(1)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [otp, setOtp] = useState<string>()
  const [topicIds, setTopicIds] = useState<any[]>([])
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const [error, setError] = useState<string[]>([])
  const [addressList, setAddressList] = useState<
    {
      address: string
      receiver: string
      receiverReceive?: boolean
      addressPostal: string
      addressPostalDetail: string
      codePostal: string
      phoneNumber: string
      phoneNumberAndCodePostal: string
    }[]
  >([])
  const listTopic = useAppSelector(selectListTopic)
  const [confirmOtp, setConfirmOtp] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [checkVerify, setCheckVerify] = useState(false)
  const [checkGetOtp, setCheckGetOtp] = useState(false)
  const [blog_naver, setBlog_naver] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [facebook, setFacebook] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [twitter, setTwitter] = useState('')
  const [avatar, setAvatar] = useState<any>('')
  const [snsEmail, setSnsEmail] = useState('')
  const snsUserInfor = useAppSelector(selectSnsUserInfor)
  const [loginType, setLoginType] = useState<number>(0)
  const location = useLocation()
  const [addressItem, setAddressItem] = useState<{
    address: string
    receiver: string
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
    receiverReceive?: boolean
  }>()
  const handleChangeFile = (params?: File) => {
    setFile(params)
  }
  const setStateOpenDialog = () => {
    setOpenDialog(false)
  }
  const createAddressList = (params: {
    address: string
    receiver: string
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
    receiverReceive?: boolean
  }) => {
    setAddressList([...addressList, params])
  }
  const deleteAddressItem = (address: string) => {
    setAddressList([...addressList])

    setAddressList(
      addressList.filter((item) => {
        return item.address !== address
      })
    )
  }
  const editAddressList = (params: {
    addressOld: string
    address: string
    receiver: string
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
    receiverReceive?: boolean
  }) => {
    let addressListNew = [...addressList]
    addressList.forEach((item, index) => {
      if (item.address === params.addressOld) {
        addressListNew[index] = {
          address: params.address,
          receiver: params.receiver,
          addressPostal: params.addressPostal,
          addressPostalDetail: params.addressPostalDetail,
          codePostal: params.codePostal,
          phoneNumber: params.phoneNumber,
          phoneNumberAndCodePostal: params.phoneNumberAndCodePostal,
        }
      }
    })
    setAddressList(addressListNew)
  }

  const registerMember = () => {
    const sns: {}[] = []
    if (blog_naver) {
      sns.push({blog_naver: blog_naver})
    }
    if (instagram) {
      sns.push({instagram: instagram})
    }
    if (facebook) {
      sns.push({facebook: facebook})
    }
    if (youtube) {
      sns.push({youtube: youtube})
    }
    if (tiktok) {
      sns.push({tiktok: tiktok})
    }
    if (twitter) {
      sns.push({twitter: twitter})
    }
    const arrayTopicId: number[] = []
    topicIds.forEach((item: {id: number; text: string}) => {
      arrayTopicId.push(item.id)
    })
    const formData = new FormData()

    formData.append('avatar', file || '')
    formData.append('loginType', JSON.stringify(loginType))
    formData.append('username', username)
    formData.append('snsLinks', JSON.stringify(sns))
    if (location.pathname === ROUTE.RESISTER_MEMBER) {
      formData.append('password', password)
      formData.append('retypePassword', retypePassword)
      formData.append('email', email)
    } else {
      if (snsUserInfor) {
        formData.append('snsLoginId', snsUserInfor.snsLoginId)
        formData.append('snsEmail', snsUserInfor.snsEmail)
      }
    }
    formData.append('gender', JSON.stringify(gender))
    formData.append('phoneNumber', `+${phoneNumber}`)
    formData.append('topicIds', JSON.stringify(arrayTopicId))
    formData.append('addressList', JSON.stringify(addressList))

    if (location.pathname === `${ROUTE.RESISTER_MEMBER}/sns`) {
      dispatch(
        registerMemberAction.signUpMemberSns({
          data: formData,
          history: navigate,
        })
      )
    } else
      checkVerify
        ? dispatch(
            registerMemberAction.signUpMember({
              data: formData,
              history: navigate,
              user: {username, password},
            })
          )
        : dispatch(
            snackBarActions.setStateSnackBar({
              content: '????????? ????????? ???????????????',
              type: 'error',
            })
          )
  }

  useEffect(() => {
    if (snsUserInfor) {
      setAvatar(snsUserInfor.photoURL)
      setSnsEmail(snsUserInfor.snsEmail)
      setEmail(snsUserInfor.snsEmail)
      setLoginType(snsUserInfor.loginType)
    }
  }, [snsUserInfor])
  const updateMember = () => {
    const sns: {}[] = []
    if (blog_naver) {
      sns.push({blog_naver: blog_naver})
    }
    if (instagram) {
      sns.push({instagram: instagram})
    }
    if (facebook) {
      sns.push({facebook: facebook})
    }
    if (youtube) {
      sns.push({youtube: youtube})
    }
    if (tiktok) {
      sns.push({tiktok: tiktok})
    }
    if (twitter) {
      sns.push({twitter: twitter})
    }
    const arrayTopicId: number[] = []
    topicIds.forEach((item: {id: number; text: string}) => {
      arrayTopicId.push(item.id)
    })
    const formData = new FormData()
    formData.append('username', username)
    formData.append('avatar', file || avatar)
    formData.append('gender', JSON.stringify(gender))
    formData.append(
      'phoneNumber',
      phoneNumber.includes('+') ? `${phoneNumber}` : `+${phoneNumber}`
    )
    formData.append('topicIds', JSON.stringify(arrayTopicId))
    formData.append('addressList', JSON.stringify(addressList))
    formData.append('snsLinks', JSON.stringify(sns))
    if (user.profile?.phoneNumber !== phoneNumber) {
      checkVerify
        ? dispatch(
            registerMemberAction.updateMember({
              form: formData,
              history: navigate,
            })
          )
        : dispatch(
            snackBarActions.setStateSnackBar({
              content: '????????? ????????? ???????????????',
              type: 'error',
            })
          )
    } else {
      dispatch(
        registerMemberAction.updateMember({form: formData, history: navigate})
      )
    }
  }
  const [selected, setSelected] = useState<string[]>([])
  const handleChangeSelect = async (event: any) => {
    const value = event.target.value
    setSelected(value)
  }
  useEffect(() => {
    dispatch(topicAction.getListTopics())
  }, [dispatch])
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
  const resetSns = () => {
    setTiktok('')
    setInstagram('')
    setBlog_naver('')
    setYoutube('')
    setTwitter('')
    setFacebook('')
  }
  useEffect(() => {
    if (location.pathname === ROUTE.UPDATE_MEMBER && user.profile) {
      setUsername(user.profile?.username)
      setTopicIds(user.profile?.topics)
      setAvatar(user.profile?.avatar)
      setGender(Number(user.profile?.gender))
      setAddressList(user.profile?.addressList)
      if (user.profile?.topics) {
        const arraySelected: string[] = []
        user.profile?.topics.forEach((item) => {
          if (item.text) arraySelected.push(item.text)
        })
        setSelected(arraySelected)
        setTopicIds(user.profile?.topics)
      }
      setPhoneNumber(user.profile.phoneNumber)
      resetSns()
      user.profile?.snsLinks &&
        user.profile?.snsLinks?.forEach((item: any) => {
          switch (Object.keys(item)[0]) {
            case 'instagram':
              setInstagram(item.instagram)
              break
            case 'blog_naver':
              setBlog_naver(item.blog_naver)
              break
            case 'youtube':
              setYoutube(item.youtube)
              break
            case 'facebook':
              setFacebook(item.facebook)
              break
            case 'tiktok':
              setTiktok(item.tiktok)
              break
            case 'twitter':
              setTwitter(item.twitter)
              break
            default:
              break
          }
        })
    }
  }, [user, location])

  const setUpRecaptcha = (number: string) => {
    setLoading(true)
    const auth1 = getAuth()
    const number1 = `+${number}`
    const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth1)
    recaptcha.render()
    return signInWithPhoneNumber(auth, number1, recaptcha)
  }

  const getOtp = async () => {
    const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth)

    if (phoneNumber) {
      try {
        const reponse = await setUpRecaptcha(phoneNumber)
        setConfirmOtp(reponse)
        setCheckGetOtp(true)
        setLoading(false)
        recaptcha.clear()
      } catch (error) {
        recaptcha.clear()
        dispatch(
          snackBarActions.setStateSnackBar({
            type: 'error',
            content: 'too many requests',
          })
        )
        setCheckGetOtp(false)
        setLoading(false)
      }
    }
  }
  const verifyOtp = async () => {
    if (otp) {
      try {
        const data: any = await confirmOtp.confirm(Number(otp))
        setPhoneNumber(data.user.phoneNumber)
        setCheckVerify(true)
      } catch (error) {
        setCheckVerify(false)
      }
    }
  }
  return (
    <div className={classes.register_member_container}>
      <AppBarCustom title='????????? ????????????' />
      <div>
        <div>
          <label htmlFor=''>????????? ?????????</label>
          <UploadAvatar setFile={handleChangeFile} avatar={avatar} />
        </div>
        {location.pathname === ROUTE.RESISTER_MEMBER ? (
          <InputForm
            label='Email'
            placeholder='???????????? ??????????????????.'
            value={email}
            onChange={(e) => setEmail(e)}
          />
        ) : (
          <div></div>
        )}

        <InputForm
          label='?????????'
          placeholder='???????????? ??????????????????.'
          value={username}
          onChange={(e) => setUsername(e)}
        />

        {location.pathname === ROUTE.RESISTER_MEMBER ? (
          <InputForm
            label='????????????'
            placeholder='??????????????? ??????????????????.'
            value={password}
            type='password'
            onChange={(e) => setPassword(e)}
          />
        ) : (
          <div></div>
        )}
        {location.pathname === ROUTE.RESISTER_MEMBER ? (
          <InputForm
            label='???????????? ??????'
            placeholder='??????????????? ??????????????????.'
            value={retypePassword}
            type='password'
            onChange={(e) => setRetypePassword(e)}
          />
        ) : (
          <div></div>
        )}
        <br />
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>??????</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={gender === 0 ? 'female' : 'male'}
            onChange={(e) =>
              e.target.value === 'male' ? setGender(1) : setGender(0)
            }
          >
            <FormControlLabel value='female' control={<Radio />} label='??????' />
            <FormControlLabel value='male' control={<Radio />} label='??????' />
          </RadioGroup>
        </FormControl>
        <div style={{marginTop: '2rem'}}>
          <label htmlFor=''>???????????????</label>
          <div
            style={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}
          >
            <PhoneInput
              disabled={checkVerify ? true : false}
              inputStyle={{width: '100%', height: '48px'}}
              country='kr'
              value={phoneNumber}
              onChange={(e: string) => setPhoneNumber(e)}
            />
            <Button
              style={{
                width: '30%',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                border: '1px solid #000000',
                height: '48px',
                justifyContent: 'end',
                boxSizing: 'border-box',
                marginLeft: '8px',
                color: checkGetOtp ? '#0065F2' : '#222222',
                padding: 0,
              }}
              disabled={checkVerify ? true : false}
              onClick={getOtp}
            >
              <img
                src={mailIcon}
                alt=''
                style={{width: '24px', height: '24px'}}
              />
              <span style={{fontSize: '12px'}}>
                {checkVerify ? '????????????' : '??????'}
              </span>
            </Button>
          </div>
          <div style={{width: '100%'}} id='recaptcha-container'></div>
          <div
            style={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}
          >
            <InputForm
              disabled={checkVerify ? true : false}
              value={otp}
              placeholder='???????????? ????????? ??????????????????'
              onChange={(e) => setOtp(e)}
            />
            <Button
              style={{
                width: '30%',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                border: '1px solid #000000',
                height: '48px',
                justifyContent: 'center',
                boxSizing: 'border-box',
                marginLeft: '8px',
                backgroundColor: !checkVerify ? '#0078FF' : '#1BB650',
                color: 'white',
              }}
              onClick={verifyOtp}
            >
              <span style={{fontSize: '12px'}}>
                {checkVerify ? '????????????' : '??????'}
              </span>
            </Button>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor=''>?????????</label>
          <div>
            <span>?????????</span>
            <span>?????????</span>
            <span>??????/???????????????</span>
            <span>??????/??????</span>
          </div>
          {addressList.length > 0 &&
            addressList.map((item) => (
              <p key={item.addressPostalDetail}>
                <span>{item.receiver}</span>
                <span>{item.phoneNumber}</span>
                <span>{item.addressPostal}</span>
                <span>
                  <span
                    onClick={() => {
                      setAddressItem(item)
                      setOpenDialog(true)
                    }}
                  >
                    ??????
                  </span>
                  /
                  <span
                    onClick={() => {
                      deleteAddressItem(item.address)
                    }}
                  >
                    ??????
                  </span>
                </span>
              </p>
            ))}
          <div>
            <span
              onClick={() => {
                setAddressItem(undefined)
                setOpenDialog(true)
              }}
            >
              <img src={plusIcon} alt='' />
              <span>????????? ??????</span>
            </span>
          </div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <InputBase
            placeholder='????????? ?????? ????????????'
            onChange={(e) => {
              setBlog_naver(e)
            }}
            type='text'
            iconLeftUrl={naverIcon}
            value={blog_naver}
          />
        </div>
        <div>
          <InputBase
            placeholder='??????????????? ?????? ????????????'
            onChange={(e) => {
              setInstagram(e)
            }}
            type='text'
            iconLeftUrl={instagramIcon}
            value={instagram}
          />
        </div>
        <div>
          <InputBase
            placeholder='????????? ?????? ????????????'
            onChange={(e) => {
              setYoutube(e)
            }}
            type='text'
            iconLeftUrl={youtubeIcon}
            value={youtube}
          />
        </div>
        <div>
          <InputBase
            placeholder='???????????? ?????? ????????????'
            onChange={(e) => {
              setFacebook(e)
            }}
            type='text'
            iconLeftUrl={facebookIcon}
            value={facebook}
          />
        </div>
        <div>
          <InputBase
            placeholder='?????? ?????? ????????????'
            onChange={(e) => {
              setTiktok(e)
            }}
            type='text'
            iconLeftUrl={tiktokIcon}
            value={tiktok}
          />
        </div>
        <div>
          <InputBase
            placeholder='????????? ?????? ????????????'
            onChange={(e) => {
              setTwitter(e)
            }}
            type='text'
            iconLeftUrl={twitterIcon}
            value={twitter}
          />
        </div>
        <div>
          <label htmlFor='mutiple-select-label'>??? ?????? ?????????</label>
          <p></p>
          <Select
            labelId='mutiple-select-label'
            id='mutiple-select-label'
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
        </div>
        <br />
        <Button
          style={{width: '100%'}}
          variant='contained'
          onClick={
            location.pathname === ROUTE.RESISTER_MEMBER ||
            location.pathname === `${ROUTE.RESISTER_MEMBER}/sns`
              ? registerMember
              : updateMember
          }
        >
          ??????
        </Button>
      </div>
      <DialogAddress
        open={openDialog}
        setOpenDialog={setStateOpenDialog}
        data={addressItem}
        createAddressItem={(params) => createAddressList(params)}
        editAddressList={(params: {
          address: string
          receiver: string
          receiverReceive?: boolean
          addressOld: string
          addressPostal: string
          addressPostalDetail: string
          codePostal: string
          phoneNumber: string
          phoneNumberAndCodePostal: string
        }) => editAddressList(params)}
      />
    </div>
  )
}

export default RegisterMember
