import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import buttonGreen from '../../asset/icons/button_green.png'
import buttonSend from '../../asset/icons/button_send.png'
import buttonViolet from '../../asset/icons/button_violet.png'
import noteRed from '../../asset/icons/note_red.png'
import AppBarCustom from '../../components/appbar'
import CardBase from '../../components/card_base'
import {
  myCampaignActions,
  selectMemberCampaignMine,
  selectMemberCampaignMineCount
} from '../../feature/my_campaign/myCampaign.slice'
import { Campaign } from '../../types/campaign.type'
import CustomizedDialogs from './dialog'

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
  const {id} = useParams()
  useEffect(() => {
    id && setType(id)
    switch (id) {
      case 'pending':
        setValue(0)
        break
      case 'accepted':
        setValue(1)
        break
      case 'requesting_update':
        setValue(2)
        break
      case 'posted':
        setValue(3)
        break
      case 'ended':
        setValue(4)
        break
      default:
        break
    }
  }, [id])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

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
  const options: string[] = [
    '?????????',
    '????????????',
    '???????????????',
    '?????????',
    '??????',
    '?????????',
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
        case '?????????':
          selected1.push('blog_naver')
          break
        case '????????????':
          selected1.push('facebook')
          break
        case '???????????????':
          selected1.push('instagram')
          break
        case '?????????':
          selected1.push('youtube')
          break
        case '??????':
          selected1.push('tiktok')
          break
        case '?????????':
          selected1.push('twitter')
          break
        default:
          break
      }
    })
    type &&
      dispatch(
        myCampaignActions.getMemberCampaignMine({
          type: type,
          medias: JSON.stringify(selected1),
        })
      )
  }, [dispatch, selected, type])

  const renderText = (index: number) => {
    switch (index) {
      case 0:
        return '??????'
      case 1:
        return '??????'
      case 2:
        return '??????'
      case 3:
        return '?????? '
      case 4:
        return '??????'
      default:
        break
    }
  }
  return (
    <div className={classes.my_campaign_container}>
      <AppBarCustom title='?????? ?????????' />
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
            <InputLabel id='mutiple-select-label'>?????? ?????????</InputLabel>
            <Select
              labelId='mutiple-select-label'
              multiple
              value={selected}
              onChange={handleChangeSelect}
              renderValue={(selected) => selected.join(', ')}
              label='?????? ?????????'
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
                <ListItemText primary='?????? ?????????' />
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
