import {
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import filter from '../../asset/icons/filter.png'
import reloadFilter from '../../asset/icons/reload_filter.png'
import address from '../../asset/icons/address.png'
import down from '../../asset/icons/down.png'

const useStyles = makeStyles({
  filter_container: {
    '&>span': {
      display: 'flex',
      alignItem: 'center',
      cursor: 'pointer',
      '&>img': {
        width: '22px',
        height: '22px',
        marginRight: '6px',
      },
    },
  },
  dialog_content: {
    width: '502px',
    minHeight: '60vh',
    padding: '1rem',
    boxSizing: 'border-box',
    '&>div:nth-of-type(1)': {
      display: 'flex',
      justifyContent: 'space-between',
      '&>span': {
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '24px',
        '&>img': {
          width: '19px',
          height: '19px',
          marginRight: '5px',
        },
      },
    },
    '&>div:nth-of-type(2)': {
      '&>div': {
        display: 'flex',
        height: '44px',
        border: '1px solid rgba(77, 77, 77, 0.6)',
        borderRadius: '4px',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '0 10px',
        justifyContent: 'space-between',
        '&>p': {
          margin: 0,
          '&>img': {
            width: 17,
            height: 20,
          },
        },
        '&>img': {
          width: 20,
          height: 20,
        },
      },
    },
  },
})

const Filter = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.filter_container}>
      <span onClick={handleClickOpen}>
        <img src={filter} alt='' />
        필터
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className={classes.dialog_content}>
          <div>
            <span>취소</span>
            <span>필터</span>
            <span>
              <img src={reloadFilter} alt='' />
              초기화
            </span>
          </div>
          <div>
            <p>지역</p>
            <div>
              <p>
                <img src={address} alt='' /> <span>전체</span>
              </p>
              <img src={down} alt='' />
            </div>
          </div>
          <div>
            <p>필터</p>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                // value={columsfilter}
                name='radio-buttons-group'
              >
                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='createdAt'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='최신순'
                      // onClick={() => setColumsfilter('createdAt')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='view'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='인기순'
                      // onClick={() => setColumsfilter('view')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='contentRegistrationDateTo'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='신청마감순'
                      // onClick={() =>
                      //   setColumsfilter('contentRegistrationDateTo')
                      // }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='numberOfRecruit'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='모집인원순'
                      // onClick={() => setColumsfilter('numberOfRecruit')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='distance'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='거리순'
                      // onClick={() => setColumsfilter('distance')}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <p>미디어 전체</p>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                // defaultValue={medias.length > 1 ? 'All' : medias[0]}
                // value={medias.length > 1 ? 'All' : medias[0]}
                name='radio-buttons-group'
              >
                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='All'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='미디어 전체'
                      // onClick={() =>
                      //   setMedias([
                      //     'facebook',
                      //     'instagram',
                      //     'youtube',
                      //     'blog_naver',
                      //     'twitter',
                      //     'tiktok',
                      //   ])
                      // }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='facebook'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='페이스북'
                      // onClick={() => setMedias(['facebook'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='instagram'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='인스타그램'
                      // onClick={() => setMedias(['instagram'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='youtube'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='유튜브'
                      // onClick={() => setMedias(['youtube'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='blog_naver'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='블로그'
                      // onClick={() => setMedias(['blog_naver'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='twitter'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='트위터'
                      // onClick={() => setMedias(['twitter'])}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value='tiktok'
                      control={<Radio style={{padding: '0.3rem 0.5rem'}} />}
                      label='틱톡'
                      // onClick={() => setMedias(['tiktok'])}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <p>
              해시태그 전체
              <span style={{color: '#B1B1B1'}}>(중복체크 가능)</span>
            </p>
            <FormControl>
              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <FormControlLabel
                    value='All'
                    control={
                      <Radio
                        // checked={
                        //   tagIds.length === listhashTag?.length ||
                        //   tagIds.length === 0
                        //     ? true
                        //     : false
                        // }
                        style={{padding: '0.3rem 0.5rem'}}
                        // onClick={() => {
                        //   setTagIds([])
                        // }}
                      />
                    }
                    label='전체'
                  />
                </Grid>
                <Grid></Grid>
                {/* {listhashTag?.map((item) => {
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
                })} */}
              </Grid>
            </FormControl>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Filter
