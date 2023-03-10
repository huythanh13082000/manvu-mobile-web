import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {joinRequestApi} from '../../apis/joinRequestApi'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import CardBase from '../../components/card_base'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {
  myCampaignActions,
  selectMemberCampaignMine,
  selectMemberCampaignMineCount,
} from '../../feature/my_campaign/myCampaign.slice'
import {selectUser} from '../../feature/user/user.slice'
import {Campaign} from '../../types/campaign.type'
import buttonSend from '../../asset/icons/button_send.png'
import CustomizedDialogs from './dialog'
import noteRed from '../../asset/icons/note_red.png'
import buttonGreen from '../../asset/icons/button_green.png'
import buttonViolet from '../../asset/icons/button_violet.png'

const useStyles = makeStyles({
  my_campaign_container: {
    '& .MuiFormLabel-root': {
      fontSize: '13px',
    },
  },
})

const MyCampaign = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState(0)
  const [type, setType] = useState<string>()
  const [data, setData] = useState<Campaign>()
  const [status, setStatus] = useState<string>('create')
  const [selected, setSelected] = useState<any>([])
  const [open, setOpen] = React.useState(false)
  const [listItemSelect, setListItemSelect] = useState<number[]>([])
  const [changeAllStatus, setChangeAllStatus] = useState<boolean>(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return {name, calories, fat, carbs, protein}
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ]
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        setType('pending')
        setSelected([])
        break
      case 1:
        setType('accepted')
        setSelected([])
        break
      case 2:
        setType('requesting_update')
        setSelected([])
        break
      case 3:
        setType('posted')
        setSelected([])
        break
      case 4:
        setType('ended')
        setSelected([])
        break
      default:
        break
    }
  }
  const memberCampaignMineCount: any = useAppSelector(
    selectMemberCampaignMineCount
  )
  const listCampaignSelect = useAppSelector(selectMemberCampaignMine)
  const listHashTag = useAppSelector(selectListHashTag)
  const user = useAppSelector(selectUser)
  const styleTab = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#0050C5;',
    padding: '0.5rem 3rem',
    borderRight: '0.5px solid #C4C4C4',
  }
  const options: string[] = [
    '블로그',
    '페이스북',
    '인스타그램',
    '유튜브',
    '틱톡',
    '트위터',
  ]
  const isAllSelected = options.length > 0 && selected.length === options.length

  const handleChangeSelect = async (event: any) => {
    const value = event.target.value
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === options.length ? [] : options)
      return
    }
    setSelected(value)
  }
  useEffect(() => {
    const selected1: string[] = []
    selected.forEach((item: any) => {
      switch (item) {
        case '블로그':
          selected1.push('blog_naver')
          break
        case '페이스북':
          selected1.push('facebook')
          break
        case '인스타그램':
          selected1.push('instagram')
          break
        case '유튜브':
          selected1.push('youtube')
          break
        case '틱톡':
          selected1.push('tiktok')
          break
        case '트위터':
          selected1.push('twitter')
          break
        default:
          break
      }
    })
    dispatch(
      myCampaignActions.getMemberCampaignMine({
        type: type || 'pending',
        medias: JSON.stringify(selected1),
      })
    )
  }, [dispatch, selected, type])
  const menuRef = React.useRef<HTMLInputElement>(null)
  useEffect(() => {
    let handler = (event: any) => {
      if (!menuRef.current?.contains(event.target)) {
      }
    }
  })
  useEffect(() => {
    dispatch(myCampaignActions.getMemberCampaignMineCount())
    dispatch(myCampaignActions.getMemberCampaignMine({type: 'pending'}))
  }, [dispatch])

  const handleItemSelect = (id: number) => {
    if (listItemSelect.includes(id)) {
      setListItemSelect([...listItemSelect.filter((item) => item !== id)])
    } else {
      setListItemSelect([...listItemSelect, id])
    }
  }
  const handleChangeAll = () => {
    if (!changeAllStatus) {
      listCampaignSelect &&
        listCampaignSelect.list &&
        setListItemSelect([...listCampaignSelect?.list?.map((item) => item.id)])
    } else {
      setListItemSelect([])
    }
    setChangeAllStatus(!changeAllStatus)
  }
  const deleteListJoin = async () => {
    try {
      await joinRequestApi.deleteRequests(listItemSelect)
      dispatch(
        myCampaignActions.getMemberCampaignMine({
          type: type || 'pending',
          medias: JSON.stringify([]),
        })
      )
      dispatch(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
      dispatch(myCampaignActions.getMemberCampaignMineCount())
      setListItemSelect([])
    } catch (error) {
      dispatch(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
      setListItemSelect([])
    }
  }
  const renderText = (index: number) => {
    switch (index) {
      case 0:
        return '신청'
      case 1:
        return '선정'
      case 2:
        return '수정'
      case 3:
        return '등록 '
      case 4:
        return '종료'
      default:
        break
    }
  }
  return (
    <div className={classes.my_campaign_container}>
      <AppBarCustom title='나의 캠페인' />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        variant='scrollable'
      >
        {memberCampaignMineCount &&
          Object.keys(memberCampaignMineCount).map((key, index) => (
            <Tab
              label={`${renderText(index)} (${
                memberCampaignMineCount?.[`${key}`]
              }) `}
              iconPosition='end'
              style={{fontSize: '14px'}}
            />
          ))}
      </Tabs>
      <div>
        <>
          <FormControl
            style={{
              width: '200px',
              margin: '0.5rem 0 0 1rem',
            }}
          >
            <InputLabel id='mutiple-select-label'>모든 미디어</InputLabel>
            <Select
              labelId='mutiple-select-label'
              multiple
              value={selected}
              onChange={handleChangeSelect}
              renderValue={(selected) => selected.join(', ')}
              label='모든 미디어'
              style={{
                height: '45px',
                borderRadius: '50px',
                width: '105px',
                fontSize: '12px',
              }}
            >
              <MenuItem value='all'>
                <ListItemIcon>
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 && selected.length < options.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary='모든 미디어' />
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{padding: '0.5rem', display: 'flex', flexWrap: 'wrap'}}>
            {Array.isArray(listCampaignSelect?.list) &&
              listCampaignSelect?.list.map((item) => (
                <div style={{width: '50%'}}>
                  <CardBase data={item} key={item.id} style={{width: '100%'}} />
                  {value === 1 && (
                    <div style={{textAlign: 'center'}}>
                      <img
                        src={buttonSend}
                        alt=''
                        onClick={() => {
                          setData(item)
                          setStatus('create')
                          handleClickOpen()
                        }}
                      />
                    </div>
                  )}
                  {value === 2 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={noteRed}
                        alt='error'
                        style={{marginRight: '0.2rem'}}
                      />
                      <img
                        src={buttonSend}
                        alt=''
                        onClick={() => {
                          setData(item)
                          setStatus('update')
                          handleClickOpen()
                        }}
                        style={{width: '80%'}}
                      />
                    </div>
                  )}
                  {value === 3 && (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <img src={buttonGreen} alt='accept' />
                    </div>
                  )}
                  {value === 4 && (
                    <a
                      href={
                        item &&
                        item.joinRequest &&
                        item.joinRequest.post &&
                        item.joinRequest.post.url
                      }
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{display: 'flex', justifyContent: 'center'}}
                    >
                      <img src={buttonViolet} alt='end' />
                    </a>
                  )}
                </div>
              ))}
          </div>
        </>
      </div>

      {open && (
        <CustomizedDialogs
          open={open}
          onClose={handleClose}
          id={data?.id}
          status={status}
          type={type}
        />
      )}
    </div>
  )
}

export default MyCampaign
