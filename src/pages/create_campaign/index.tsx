import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {ko} from 'date-fns/locale'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'
import Geocode from 'react-geocode'
import {useNavigate, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import UploadFile from '../../components/upload_file'
import {AREA_LIST, LIST_TAB} from '../../constants'
import {
  campaignDetailAction,
  selectcampaignDetail,
} from '../../feature/campaign_detail/campaignDetail.slice'
import {
  createCampaignActions,
  selectListHashTag,
  SelectListTabId,
} from '../../feature/create_campaign/createCampaign.slice'
import {selectUser} from '../../feature/user/user.slice'
import {ROUTE} from '../../router/routes'
import {CreateCampaign} from '../../types/createCampaign.type'
import {numberWithCommas} from '../../utils'
import './CreateCampaign.css'
import DialogColorPicker from './dialogColorPicker'

Geocode.setApiKey('AIzaSyAeE2VSjaFdg1SX4Q924lRZAZmYP6PBUH8')
Geocode.setLanguage('ko')
Geocode.setLocationType('ROOFTOP')
Geocode.enableDebug()

interface Data {
  name?: string
  shortDescription?: string
  keywords?: string
  mission?: string
  numberOfRecruit?: string
  images?: FormData | string[]
  content?: string
  notes?: string
  offers?: string
}

const CreateCampaignPage = () => {
  const [openDialogColor, setOpenDialogColor] = useState(false)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const campaignDetail = useAppSelector(selectcampaignDetail)
  const exceptThisSymbols = ['e', 'E', '+', '-', '.']
  const [selected, setSelected] = useState<any[]>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([])
  const [address, setAddress] = useState<string>('')
  const [addressDetail, setAddressDetail] = useState<string>('')
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [openDaumPostcodeEmbed, setOpenDaumPostcodeEmbed] = useState(false)
  const [text, setText] = useState<string>('')
  const [data, setData] = useState<Data>()
  const [campaignRegistrationDateFrom, setCampaignRegistrationDateFrom] =
    useState<Date | null | string>(null)
  const [campaignRegistrationDateTo, setCampaignRegistrationDateTo] = useState<
    Date | null | string
  >(null)
  const [announcementToMemberDate, setAnnouncementToMemberDate] = useState<
    Date | null | string
  >(null)
  const [contentRegistrationDateFrom, setContentRegistrationDateFrom] =
    useState<Date | null | string>(null)
  useState<Date | null | string>(null)
  const [contentRegistrationDateTo, setContentRegistrationDateTo] = useState<
    Date | null | string
  >(null)
  const [announcementFinalDate, setAnnouncementFinalDate] = useState<
    Date | null | string
  >(null)
  const [applications, setApplications] = useState('#1565c0')
  const [media, setMedia] = useState<string>('')
  const [isAddress, setIsAddress] = useState<string>('true')
  const [file, setFile] = useState<string[]>([])
  const [tabId, setTabId] = useState<number>(0)
  const [point, setPoint] = useState<number>(0)
  const [contactPhone, setContactPhone] = useState<string>()
  useEffect(() => {
    if (id) {
      dispatch(campaignDetailAction.getCampaignDetail(Number(id)))
    }
  }, [dispatch, id])
  const handleChangeSelect = async (event: any) => {
    const value = event.target.value
    setSelected(value)
  }
  const handleChangeSelectCategoryIds = async (event: any) => {
    const value = event.target.value
    setSelectedCategoryIds(value)
  }
  const handleChangeSelectAreaIds = async (event: any) => {
    const value = event.target.value
    setSelectedAreaIds(value)
  }
  const handleCreateCampaign = () => {
    const formData = new FormData()
    file.forEach((item) => {
      if (typeof item !== 'string') formData.append('images', item)
    })
    const images1: string[] = []
    file.forEach((item) => {
      if (typeof item === 'string' && !item.includes('blob')) {
        images1.push(item)
      }
    })
    const CategoryIds: number[] = []
    const tags: number[] = []
    const areaIds: {
      id: number
      area: string
      subArea: string
    }[] = []
    selectedCategoryIds.forEach((item) => {
      listTabId?.forEach((item1) => {
        if (item1.text === item) {
          CategoryIds.push(item1.id)
        }
      })
    })
    selected.forEach((item) => {
      listHashTag?.forEach((item1) => {
        if (item1.text === item) {
          tags.push(item1.id)
        }
      })
    })
    selectedAreaIds.forEach((item) => {
      AREA_LIST?.forEach((item1) => {
        if (item1.subArea === item) {
          areaIds.push(item1)
        }
      })
    })
    const campaign: CreateCampaign = {
      campaignRegistrationDateFrom: campaignRegistrationDateFrom?.toString(),
      campaignRegistrationDateTo: campaignRegistrationDateTo
        ?.toString()
        .replace('00:00:00', '23:59:59'),
      announcementToMemberDate: announcementToMemberDate?.toString(),
      contentRegistrationDateFrom: contentRegistrationDateFrom?.toString(),
      contentRegistrationDateTo: contentRegistrationDateTo
        ?.toString()
        .replace('00:00:00', '23:59:59'),
      announcementFinalDate: announcementFinalDate?.toString(),
      applications: {color: applications, text: text},
      media: media,
      name: data?.name,
      shortDescription: data?.shortDescription,
      notes: data?.notes,
      keywords: data?.keywords,
      mission: data?.mission,
      point: point,
      content: data?.content,
      isAddress: isAddress === 'true' ? true : false,
      tabId: tabId,
      addressDetail: addressDetail,
      numberOfRecruit: Number(data?.numberOfRecruit),
      formData: formData,
      adddress: address,
      latitude: latitude,
      longitude: longitude,
      offers: data?.offers,
      tags: tags,
      areaIds: areaIds,
      categoryIds: CategoryIds,
      contactPhone,
    }

    if (
      campaignRegistrationDateFrom &&
      campaignRegistrationDateTo &&
      announcementToMemberDate &&
      contentRegistrationDateFrom &&
      contentRegistrationDateTo &&
      announcementFinalDate &&
      applications &&
      media &&
      data?.name &&
      data?.shortDescription &&
      data?.notes &&
      data?.keywords &&
      data?.mission &&
      data?.content &&
      tabId &&
      data?.numberOfRecruit &&
      file.length > 0 &&
      data?.offers &&
      tags &&
      areaIds &&
      CategoryIds
    ) {
      if (!id)
        dispatch(
          createCampaignActions.createCampaign({
            data: campaign,
            history: navigate,
          })
        )
      else
        dispatch(
          createCampaignActions.updateCampaign({
            data: {
              ...campaign,
              _id: Number(id),
              images1: images1,
            },
            history: navigate,
          })
        )
    } else
      dispatch(
        snackBarActions.setStateSnackBar({
          content: '????????? ????????? ???????????????',
          type: 'error',
        })
      )
  }
  const setFileUpload = (params: string[]) => {
    setFile(params)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === 'numberOfRecruit' &&
      !event.target.value.includes('-')
    ) {
      setData({...data, [event.target.name]: event.target.value})
    }
    if (event.target.name !== 'numberOfRecruit')
      setData({...data, [event.target.name]: event.target.value})
  }
  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({...data, [event.target.name]: event.target.value})
  }
  const listHashTag = useAppSelector(selectListHashTag)
  useEffect(() => {
    dispatch(createCampaignActions.getListHashTag())
  }, [dispatch])
  useEffect(() => {
    if (tabId > 0) {
      dispatch(
        createCampaignActions.getListTabId({
          tabId: tabId,
          limit: 20,
        })
      )
    }
  }, [dispatch, tabId])
  const listTabId = useAppSelector(SelectListTabId)
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
    setAddress(fullAddress)
    Geocode.fromAddress('Eiffel Tower').then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location
        setLatitude(lat)
        setLongitude(lng)
      },
      (error) => {
        console.error(error)
      }
    ) // eg '20, Wangsimni-ro 2-gil, Seongdong-gu, Seoul (Seongsu-dong 1-ga)'
    setOpenDaumPostcodeEmbed(false)
  }

  useEffect(() => {
    if (id) {
      setData({
        content: campaignDetail?.content,
        images: campaignDetail?.images,
        keywords: campaignDetail?.keywords,
        mission: campaignDetail?.mission,
        name: campaignDetail?.name,
        notes: campaignDetail?.notes,
        numberOfRecruit: campaignDetail?.numberOfRecruit.toString(),
        offers: campaignDetail?.offers,
        shortDescription: campaignDetail?.shortDescription,
      })
      if (campaignDetail) {
        setMedia(campaignDetail?.media)
        setCampaignRegistrationDateFrom(
          campaignDetail?.campaignRegistrationDateFrom
        )
        setCampaignRegistrationDateTo(
          campaignDetail?.campaignRegistrationDateTo
        )
        setContentRegistrationDateFrom(
          campaignDetail?.contentRegistrationDateFrom
        )
        setContentRegistrationDateTo(campaignDetail.contentRegistrationDateTo)
        setAnnouncementFinalDate(campaignDetail.announcementFinalDate)
        setAnnouncementToMemberDate(campaignDetail.announcementToMemberDate)
        const tabIe1 = campaignDetail.tabId
        setTabId(tabIe1)
        setContactPhone(campaignDetail.contactPhone)
        campaignDetail.areaIds &&
          campaignDetail.areaIds[0] &&
          campaignDetail.areaIds[0].subArea &&
          setSelectedAreaIds([campaignDetail.areaIds[0].subArea])

        const selectedCategoryIds1 = campaignDetail.categories.map((item) => {
          return item.text
        })
        setSelectedCategoryIds([...selectedCategoryIds1])
        const selected1 = campaignDetail.tags.map((item) => {
          return listHashTag?.filter((item1) => {
            if (item1.id === item) {
              return item1.text
            } else return null
          })[0].text
        })
        setSelected([...selected1])

        setText(campaignDetail.applications.text)
        setApplications(campaignDetail.applications.color)
        setPoint(campaignDetail.point)
        campaignDetail.adddress && setAddress(campaignDetail.adddress)
        campaignDetail.addressDetail &&
          setAddressDetail(campaignDetail.addressDetail)
        setFile(campaignDetail.images)
        campaignDetail.isAddress ? setIsAddress('true') : setIsAddress('false')
      }
    } else {
      if (user.profile)
        if (
          user.profile?.roles.filter(
            (item) => item.name === 'advertiser global'
          ).length > 0
        ) {
          setData({numberOfRecruit: ''})
        } else if (
          user.profile?.roles.filter((item) => item.name === 'advertiser pro')
            .length > 0
        ) {
          setData({numberOfRecruit: '10'})
        } else if (
          user.profile?.roles.filter(
            (item) => item.name === 'advertiser starter'
          ).length > 0
        ) {
          setData({numberOfRecruit: '5'})
        } else {
          setData({numberOfRecruit: '2'})
        }
      setCampaignRegistrationDateFrom(moment().format())
      setCampaignRegistrationDateTo(moment().add(20, 'days').calendar())
      setAnnouncementToMemberDate(moment().add(21, 'days').calendar())
      setContentRegistrationDateFrom(moment().add(22, 'days').calendar())
      setContentRegistrationDateTo(moment().add(35, 'days').calendar())
      setAnnouncementFinalDate(moment().add(36, 'days').calendar())
    }
  }, [campaignDetail, id, listHashTag, user.profile])

  return (
    <Grid container justifyContent='center'>
      <AppBarCustom title='????????? ??????' />
      <Grid item borderRadius='5px' container padding='0 1rem 1rem 1rem'>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <p className='ccp-input'>1.????????? ?????? ?????????</p>
              <UploadFile
                images={id ? campaignDetail?.images : []}
                setFile={(params) => {
                  setFileUpload(params)
                }}
                multiple={true}
              />
            </Grid>
            <Grid item xs={12}>
              <p className='ccp-input'>2.????????? ??????</p>
              <TextField
                name='name'
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                value={data?.name}
                size='small'
                onChange={handleChangeInput}
                placeholder='????????? ???????????????'
                inputProps={{
                  style: {
                    height: '31px',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>3.????????? ???????????? ????????? ??????</p>
              <TextField
                onChange={handleChangeInput}
                name='shortDescription'
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                size='small'
                placeholder='??????????????? ?????????  ??????:????????? / ?????? ???'
                inputProps={{
                  style: {
                    height: '31px',
                  },
                }}
                value={data?.shortDescription}
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>4.????????? ???????????? ????????? ??????</p>
              <TextareaAutosize
                name='offers'
                onChange={handleChangeTextarea}
                className='ccp-textarea'
                aria-label='minimum height'
                minRows={3}
                placeholder='????????? ???????????????'
                value={data?.offers}
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>5.?????? ??? ????????????</p>
              <TextareaAutosize
                name='content'
                onChange={handleChangeTextarea}
                className='ccp-textarea'
                aria-label='minimum height'
                minRows={3}
                placeholder='????????? ???????????????'
                value={data?.content}
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>6.?????? ?????????</p>
              <TextareaAutosize
                name='keywords'
                onChange={handleChangeTextarea}
                className='ccp-textarea'
                aria-label='minimum height'
                minRows={3}
                placeholder='??????)????????????,????????????,????????????'
                value={data?.keywords}
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>7.????????? ??????</p>
              <TextareaAutosize
                name='mission'
                onChange={handleChangeTextarea}
                className='ccp-textarea'
                aria-label='minimum height'
                minRows={3}
                value={data?.mission}
                placeholder='??????????????? ?????? ???????????? ???????????? ?????? ??? ?????? ???????????? ????????? ??????????????????.'
              />
            </Grid>

            <Grid item xs={12}>
              <p className='ccp-input'>8.?????? ????????????</p>
              <TextareaAutosize
                name='notes'
                onChange={handleChangeTextarea}
                className='ccp-textarea'
                aria-label='minimum height'
                minRows={3}
                placeholder='????????? ??????????????? ????????? ??????????????????.'
                value={data?.notes}
              />
            </Grid>
            <Grid item xs={12}>
              <p className='ccp-input'>9.?????? ???????????? ???????????? ?????????????</p>
              <Grid container>
                <RadioGroup
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <Grid item xs={12} container justifyContent='space-between'>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value='blog_naver'
                        control={<Radio />}
                        label='????????? ?????????'
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value='instagram'
                        control={<Radio />}
                        label='???????????????'
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value='youtube'
                        control={<Radio />}
                        label='?????????'
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value='tiktok'
                        control={<Radio />}
                        label='??????'
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value='facebook'
                        control={<Radio />}
                        label='????????????'
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormControlLabel
                        value='twitter'
                        control={<Radio />}
                        label='?????????'
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} marginTop='1rem'>
                  <p className='ccp-input' style={{margin: 0}}>
                    10.????????? ????????????
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>????????? ???????????? ?????????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={campaignRegistrationDateFrom}
                      onChange={(newValue) => {
                        setCampaignRegistrationDateFrom(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>????????? ???????????? ?????????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={campaignRegistrationDateTo}
                      onChange={(newValue) => {
                        setCampaignRegistrationDateTo(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>??????????????? ??????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={announcementToMemberDate}
                      onChange={(newValue) => {
                        if (
                          campaignRegistrationDateFrom &&
                          campaignRegistrationDateTo
                        ) {
                          setAnnouncementToMemberDate(newValue)
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                      disabled={
                        !campaignRegistrationDateFrom ||
                        !campaignRegistrationDateTo
                          ? true
                          : false
                      }
                      minDate={campaignRegistrationDateTo}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>????????? ?????? ?????????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={contentRegistrationDateFrom}
                      onChange={(newValue) => {
                        setContentRegistrationDateFrom(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                      minDate={announcementToMemberDate}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>????????? ???????????? ?????????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={contentRegistrationDateTo}
                      onChange={(newValue) => {
                        setContentRegistrationDateTo(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                      minDate={contentRegistrationDateFrom}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <p className='ccpn-p1'>????????? ????????????</p>
                  <LocalizationProvider
                    locale={ko}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      value={announcementFinalDate}
                      onChange={(newValue) => {
                        setAnnouncementFinalDate(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size='small' />
                      )}
                      disablePast
                      minDate={contentRegistrationDateTo}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} marginTop='1rem'>
                <p className='ccp-input' style={{margin: 0}}>
                  11.????????? ????????? ??????
                </p>
              </Grid>
              <Grid item xs={6}>
                <p className='ccpn-p1'>????????????</p>
                <TextField
                  onChange={handleChangeInput}
                  name='numberOfRecruit'
                  className='r-input'
                  id='outlined-basic'
                  variant='outlined'
                  size='small'
                  type='number'
                  placeholder='??????'
                  inputProps={{
                    style: {
                      height: '31px',
                    },
                    min: '0',
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  value={data?.numberOfRecruit}
                />
              </Grid>
              <Grid item xs={6}>
                <p className='ccpn-p1'>?????????</p>
                <FormControl fullWidth size='small'>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={tabId}
                    onChange={(e) => {
                      setTabId(Number(e.target.value))
                      setSelectedCategoryIds([])
                    }}
                    style={{height: 48}}
                  >
                    {LIST_TAB.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.text}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {id && tabId ? (
                <Grid item xs={6}>
                  <p className='ccpn-p1'> ????????????</p>
                  <FormControl
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      labelId='mutiple-select-label'
                      multiple
                      value={selectedCategoryIds}
                      onChange={handleChangeSelectCategoryIds}
                      renderValue={(selected) => selected.join(', ')}
                      style={{height: 48}}
                    >
                      {listTabId &&
                        listTabId.map((option: {id: number; text: string}) => (
                          <MenuItem key={option.id} value={option.text}>
                            <ListItemIcon>
                              <Checkbox
                                checked={
                                  selectedCategoryIds.indexOf(option.text) > -1
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.text} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
              {!id && tabId ? (
                <Grid item xs={6}>
                  <p className='ccpn-p1'> ????????????</p>
                  <FormControl
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      labelId='mutiple-select-label'
                      multiple
                      value={selectedCategoryIds}
                      onChange={handleChangeSelectCategoryIds}
                      renderValue={(selected) => selected.join(', ')}
                      style={{height: 48}}
                    >
                      {listTabId &&
                        listTabId.map((option: {id: number; text: string}) => (
                          <MenuItem key={option.id} value={option.text}>
                            <ListItemIcon>
                              <Checkbox
                                checked={
                                  selectedCategoryIds.indexOf(option.text) > -1
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.text} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
              {tabId === 1 ? (
                <Grid item xs={6}>
                  <p className='ccpn-p1'>??????</p>
                  <FormControl
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      labelId='mutiple-select-label'
                      multiple
                      value={selectedAreaIds}
                      onChange={handleChangeSelectAreaIds}
                      renderValue={(selected) => selected.join(', ')}
                      style={{height: 48}}
                    >
                      {AREA_LIST &&
                        AREA_LIST.map(
                          (option: {
                            id: number
                            area: string
                            subArea: string
                          }) => (
                            <MenuItem key={option.id} value={option.subArea}>
                              <ListItemIcon>
                                <Checkbox
                                  checked={
                                    selectedAreaIds.indexOf(option.subArea) > -1
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText primary={option.subArea} />
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}

              <Grid item xs={6}>
                <p className='ccpn-p1'>????????????</p>
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
                    style={{height: 48}}
                  >
                    {listHashTag &&
                      listHashTag.map((option: {id: number; text: string}) => (
                        <MenuItem key={option.id} value={option.text}>
                          <ListItemIcon>
                            <Checkbox
                              checked={selected.indexOf(option.text) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText primary={option.text} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <p className='ccpn-p1'>??????????????? ????????????</p>
              <Grid item xs={12} container>
                <Grid>
                  <TextField
                    onChange={(e) => setText(e.target.value)}
                    name='color'
                    value={text}
                    className='r-input'
                    id='outlined-basic'
                    variant='outlined'
                    size='small'
                    placeholder='?????????/?????????/?????????/????????? ??? ??????????????? ??????'
                  />
                </Grid>
                <Grid>
                  <Button
                    className='ccpn-button'
                    style={{
                      height: '48px',
                      marginLeft: '1rem',
                      backgroundColor: applications,
                    }}
                    variant='contained'
                    onClick={() => setOpenDialogColor(true)}
                  >
                    ??????
                  </Button>
                </Grid>
                <DialogColorPicker
                  open={openDialogColor}
                  setOpenDialog={() => setOpenDialogColor(false)}
                  setColor={(params: string) => setApplications(params)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <p className='ccp-input'>
                12.1?????? ?????? ????????? ?????? (
                <span style={{color: '#9747FF'}}>
                  ????????? ?????????{numberWithCommas(Number(user.profile?.point))}P
                </span>
                )
              </p>
              <TextField
                onChange={(e) => setPoint(Number(e.target.value))}
                name='point'
                type='number'
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                size='small'
                placeholder='??????????????????'
                inputProps={{
                  style: {
                    height: '31px',
                  },
                }}
                error={
                  Number(data?.numberOfRecruit) * Number(point) >
                  Number(user.profile?.point)
                    ? true
                    : false
                }
                value={point}
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
              />
              {Number(data?.numberOfRecruit) * Number(point) >
                Number(user.profile?.point) && (
                <p className='ccp-input'>
                  {numberWithCommas(
                    Number(data?.numberOfRecruit) * Number(point)
                  )}
                  P (
                  <span style={{color: '#FE7182'}}>
                    {numberWithCommas(
                      Number(data?.numberOfRecruit) * Number(point) -
                        Number(user.profile?.point)
                    )}
                    P ????????? ??????
                  </span>
                  ) ????????????
                </p>
              )}
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={3}>
                <p className='ccp-input' style={{margin: '0.6rem 0'}}>
                  13.????????????
                </p>
              </Grid>

              <RadioGroup
                value={isAddress}
                onChange={(e) => {
                  setIsAddress(e.target.value)
                }}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <FormControlLabel
                      value={'true'}
                      control={<Radio />}
                      label='??????'
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      value={'false'}
                      control={<Radio />}
                      label='??????'
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
            {isAddress === 'true' ? (
              <>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      className='r-input'
                      id='outlined-basic'
                      variant='outlined'
                      size='small'
                      placeholder='??????????????????'
                      inputProps={{
                        style: {
                          height: '31px',
                        },
                        readOnly: true,
                      }}
                      value={address}
                      onClick={() => setOpenDaumPostcodeEmbed(true)}
                    />
                    {openDaumPostcodeEmbed && (
                      <DaumPostcodeEmbed
                        onComplete={handleComplete}
                        autoClose={false}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p className='ccp-input'>????????? ??????</p>
                  <TextField
                    onChange={(e) => setAddressDetail(e.target.value)}
                    name='addressDetail'
                    className='r-input'
                    id='outlined-basic'
                    variant='outlined'
                    size='small'
                    placeholder='????????? ????????? ???????????????'
                    value={addressDetail}
                  />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12}>
              <p className='ccp-input'>14. ????????? ?????????</p>
              <TextField
                onChange={(e) => setContactPhone(e.target.value)}
                name='contactPhone'
                className='r-input'
                id='outlined-basic'
                variant='outlined'
                size='small'
                placeholder='???????????????'
                inputProps={{
                  style: {
                    height: '31px',
                  },
                }}
                value={contactPhone}
              />
            </Grid>

            <Grid item xs={12} marginTop='2rem'>
              <Button
                className='ccpn-button'
                variant='contained'
                disabled={
                  Number(data?.numberOfRecruit) * Number(point) >
                  Number(user.profile?.point)
                    ? true
                    : false
                }
                onClick={() => handleCreateCampaign()}
              >
                ????????? ??????
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreateCampaignPage
