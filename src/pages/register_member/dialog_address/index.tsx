import CloseIcon from '@mui/icons-material/Close'
import {Checkbox, FormControlLabel, Grid, TextField} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'
import InputForm from '../../../components/input_form'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon
            style={{
              border: '2px solid #4D4D4D',
              padding: '2px',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function DialogAddress(Props: {
  open: boolean
  setOpenDialog: Function
  data?: {
    address: string
    receiver: string
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
    receiverReceive?: boolean
  }
  createAddressItem: (params: {
    address: string
    receiver: string
    receiverReceive?: boolean
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
  }) => void
  editAddressList: (params: {
    addressOld: string
    address: string
    receiver: string
    receiverReceive?: boolean
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
  }) => void
}) {
  const [open, setOpen] = React.useState(Boolean)
  const [address, setAddress] = React.useState<string>('')
  const [receiver, setReceiver] = React.useState<string>('')
  const [addressPostal, setAddressPostal] = React.useState<string>('')
  const [addressPostalDetail, setAddressPostalDetail] =
    React.useState<string>('')
  const [codePostal, setCodePostal] = React.useState<string>('')
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const [openDaumPostcodeEmbed, setOpenDaumPostcodeEmbed] =
    React.useState(false)
  React.useEffect(() => {
    setOpen(Props.open)
  }, [Props.open])
  const handleClose = () => {
    Props.setOpenDialog()
  }
  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    setAddressPostal(data.address)
    setCodePostal(data.zonecode)
    setOpenDaumPostcodeEmbed(false)
  }
  React.useEffect(() => {
    if (Props.data) {
      setAddress(Props.data?.address)
      setReceiver(Props.data?.receiver)
      setAddressPostal(Props.data?.addressPostal)
      setCodePostal(Props.data?.codePostal)
      setPhoneNumber(Props.data.phoneNumber)
      setAddressPostalDetail(Props.data.addressPostalDetail)
    } else {
      setAddress('')
      setAddressPostal('')
      setAddressPostalDetail('')
      setPhoneNumber('')
      setReceiver('')
      setCodePostal('')
    }
  }, [Props.data])
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          <p className='dialog-title' style={{margin: 0, fontSize: '18px'}}>
            주소 정보{' '}
          </p>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid>
            <InputForm
              label='배송지명'
              value={address}
              placeholder='예시 집 혹은 회사'
              onChange={(e) => setAddress(e)}
            />

            <InputForm
              label='수령인'
              placeholder='이름을 입력하세요'
              value={receiver}
              onChange={(e) => setReceiver(e)}
            />
            <InputForm
              label='휴대폰 번호'
              placeholder='연락처를 입력하세요'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e)}
            />
            <Grid item xs={12}>
              <p className='da-p1'>우편번호</p>
              <Grid
                item
                xs={12}
                container
                marginBottom={'1rem'}
                alignItems='center'
              >
                <Grid item xs={9}>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    size='small'
                    placeholder='주소검색'
                    value={codePostal}
                  />
                </Grid>
                <Grid item xs={3}>
                  <span
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 500,
                      fontSize: '14px',
                      border: '1px solid rgba(39, 39, 39, 0.24)',
                      height: '47px',
                      textAlign: 'center',
                    }}
                    onClick={() => {
                      setOpenDaumPostcodeEmbed(true)
                    }}
                  >
                    우편번호 찾기
                  </span>
                </Grid>
              </Grid>
              <InputForm
                value={addressPostal}
                placeholder='상세주소'
                onChange={() => {}}
                style={{margin: 0}}
              />
              {openDaumPostcodeEmbed && (
                <DaumPostcodeEmbed
                  onComplete={handleComplete}
                  autoClose={false}
                  style={{width: '100%'}}
                />
              )}
              <Grid item xs={12}>
                <InputForm
                  value={addressPostalDetail}
                  onChange={(e) => setAddressPostalDetail(e)}
                  placeholder='상세주소'
                  label='상세주소'
                />
              </Grid>
            </Grid>
            <div>
              <p style={{marginBottom: 0}}>본 배송지</p>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='기본 배송지로 설정'
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant='contained'
            style={{width: '100%'}}
            onClick={() => {
              if (receiver && address) {
                if (!Props.data?.address)
                  Props.createAddressItem({
                    address: address,
                    receiver: receiver,
                    receiverReceive: false,
                    addressPostal: addressPostal,
                    addressPostalDetail: addressPostalDetail,
                    codePostal: codePostal,
                    phoneNumber,
                    phoneNumberAndCodePostal: `${codePostal}\n${addressPostal}\n${phoneNumber}`,
                  })
                else {
                  Props.editAddressList({
                    addressOld: Props.data.address,
                    address: address,
                    receiver: receiver,
                    receiverReceive: false,
                    addressPostal: addressPostal,
                    addressPostalDetail: addressPostalDetail,
                    codePostal: codePostal,
                    phoneNumber,
                    phoneNumberAndCodePostal: `${codePostal}\n${addressPostal}\n${phoneNumber}`,
                  })
                }
                handleClose()
              }
            }}
          >
            완료
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
