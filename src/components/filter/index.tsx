import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import Menu from '@mui/material/Menu'
import * as React from 'react'
import {useLocation} from 'react-router-dom'
import {useAppSelector} from '../../app/hooks'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {Area} from '../../types/area.type'
import DialogArea from './dialogFilter'
import './filter.css'
import filterIcon from '../../asset/icons/filter.png'
import reloadIcon from '../../asset/icons/reload.png'

export default function Filter(props: {
  medias: string[]
  tagIds: number[]
  areaIds: Area[]
  setAreaIds: (params: Area[]) => void
  setMedias: (params: string[]) => void
  setTagIds: (params: number[]) => void
  setOffset: (params: number) => void
  columsfilter: string
  setColumsfilter: (params: string) => void
}) {
  const location = useLocation()
  const [openFilterArea, setOpenFilterArea] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [medias, setMedias] = React.useState<string[]>([])
  const [tagIds, setTagIds] = React.useState<number[]>([])
  const [areaIds, setAreaIds] = React.useState<Area[]>([])
  const [columsfilter, setColumsfilter] = React.useState<string>(
    location.pathname === '/service' ? 'distance' : 'createdAt'
  )
  const open = Boolean(anchorEl)
  React.useEffect(() => {
    setMedias(props.medias)
    setTagIds(props.tagIds)
    setAreaIds(props.areaIds)
  }, [props])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const listhashTag = useAppSelector(selectListHashTag)
  const submit = () => {
    props.setOffset(0)
    props.setMedias(medias)
    props.setTagIds(tagIds)
    props.setColumsfilter(columsfilter)
    props.setAreaIds(areaIds)
    handleClose()
  }
  const resetFilter = () => {
    setMedias([])
    setTagIds([])
    setAreaIds([])
    setColumsfilter('')
  }
  return (
    <div style={{cursor: 'pointer', width: '81px'}}>
      <span
        onClick={handleClick}
        className='filter-span1'
        style={{borderRight: '1px solid black'}}
      >
        <img src={filterIcon} alt='' style={{width: '22px', height: '22px'}} />
        <span>필터</span>
      </span>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div
          style={{
            maxWidth: '502px',
            boxSizing: 'border-box',
            padding: '0 1rem',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span
              className='filter-span2'
              style={{cursor: 'pointer'}}
              onClick={handleClose}
            >
              취소
            </span>
            <span className='filter-span2'>필터</span>
            <span
              className='filter-span2'
              style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
              onClick={() => resetFilter()}
            >
              <img src={reloadIcon} alt='load' style={{width: '19px'}} />
              초기화
            </span>
          </div>
          <div style={{margin: '0.5rem 0'}}>
            <span className='filter-span2'>지역</span>
          </div>
          <Grid
            item
            xs={12}
            border='1px solid rgba(77, 77, 77, 0.6)'
            borderRadius={'4px'}
            height='44px'
            display={'flex'}
            justifyContent='space-between'
            alignItems={'center'}
            padding='0.5rem'
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '502px',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
              onClick={() => setOpenFilterArea(true)}
            >
              <span style={{display: 'flex'}}>
                <img src='/img/gps.svg' alt='' />
                <p
                  style={{marginLeft: '10px'}}
                  className='block-card-ellipsis-service'
                >
                  {areaIds.length === 0 && '전체'}
                  {areaIds.map((item, index) => {
                    if (index + 1 < areaIds.length) return `${item.subArea}, `
                    else return `${item.subArea}`
                  })}
                </p>
              </span>
              <i className='fa-solid fa-angle-down'></i>
            </div>
          </Grid>

          <div style={{margin: '0.5rem 0'}}>
            <span className='filter-span2'>필터</span>
          </div>
          <Grid item xs={12} container>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                value={columsfilter}
                name='radio-buttons-group'
              >
                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='createdAt'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='최신순'
                      onClick={() => setColumsfilter('createdAt')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='view'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='인기순'
                      onClick={() => setColumsfilter('view')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='contentRegistrationDateTo'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='신청마감순'
                      onClick={() =>
                        setColumsfilter('contentRegistrationDateTo')
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='numberOfRecruit'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='모집인원순'
                      onClick={() => setColumsfilter('numberOfRecruit')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='distance'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='거리순'
                      onClick={() => setColumsfilter('distance')}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>

          <div style={{margin: '0.5rem 0'}}>
            <span className='filter-span2'>미디어 전체</span>
          </div>
          <Grid item xs={12} container>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={medias.length > 1 ? 'All' : medias[0]}
                value={medias.length > 1 ? 'All' : medias[0]}
                name='radio-buttons-group'
              >
                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='All'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='미디어 전체'
                      onClick={() =>
                        setMedias([
                          'facebook',
                          'instagram',
                          'youtube',
                          'blog_naver',
                          'twitter',
                          'tiktok',
                        ])
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='facebook'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='페이스북'
                      onClick={() => setMedias(['facebook'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='instagram'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='인스타그램'
                      onClick={() => setMedias(['instagram'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='youtube'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='유튜브'
                      onClick={() => setMedias(['youtube'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='blog_naver'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='블로그'
                      onClick={() => setMedias(['blog_naver'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='twitter'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='트위터'
                      onClick={() => setMedias(['twitter'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='tiktok'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='틱톡'
                      onClick={() => setMedias(['tiktok'])}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <div style={{margin: '0.5rem 0'}}>
            <span className='filter-span2'>해시태그 전체(중복체크 가능)</span>
          </div>
          <Grid item xs={12} container>
            <FormControl>
              <Grid item xs={12} container>
                <Grid item xs={6}>
                  <FormControlLabel
                    value='All'
                    control={
                      <Radio
                        checked={
                          tagIds.length === listhashTag?.length ||
                          tagIds.length === 0
                            ? true
                            : false
                        }
                        style={{padding: '0.3rem 0.5rem'}}
                        onClick={() => {
                          setTagIds([])
                        }}
                      />
                    }
                    label='전체'
                  />
                </Grid>
                {listhashTag?.map((item) => {
                  return (
                    <Grid item xs={6}>
                      <FormControlLabel
                        value={item.id}
                        control={
                          <Radio
                            onClick={() => {
                              if (tagIds.includes(item.id)) {
                                const newTagIds = tagIds.filter(
                                  (item1) => item1 !== item.id
                                )
                                setTagIds([...newTagIds])
                              } else setTagIds([...tagIds, item.id])
                            }}
                            checked={tagIds.includes(item.id) ? true : false}
                            style={{padding: '0.3rem 0.5rem'}}
                          />
                        }
                        label={item.text}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </FormControl>
          </Grid>
          <p className='filter-button' onClick={submit}>
            적용
          </p>
        </div>
      </Menu>
      <DialogArea
        open={openFilterArea}
        areaIds={areaIds}
        setAreaIds={(params) => setAreaIds(params)}
        setOpen={() => setOpenFilterArea(false)}
      />
    </div>
  )
}
