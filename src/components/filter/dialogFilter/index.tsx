import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import './dialogFilter.css'
import {Grid} from '@mui/material'
import {AREA_LIST} from '../../../constants'

export interface Area {
  id: number
  area: string
  subArea: string
}

export default function DialogArea(props: {
  open: boolean
  setOpen: () => void
  areaIds: Area[]
  setAreaIds: (params: Area[]) => void
}) {
  const [areaIds, setAreaIds] = React.useState<Area[]>([])
  const insertArea = (params: Area) => {
    const check = areaIds.find((item) => item.id === params.id)
    if (!check) {
      setAreaIds([...areaIds, params])
    } else {
      const newAreaIds = areaIds.filter((item) => item.id !== params.id)
      setAreaIds(newAreaIds)
    }
  }
  React.useEffect(() => {
    setAreaIds(props.areaIds)
  }, [props.areaIds])
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='xs'
      >
        <DialogTitle id='alert-dialog-title'>
          <span className='dialogFilter-title'>지역전체</span>
        </DialogTitle>
        <DialogContent>
          <p className='dialogFilter-p1'>서울</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '서울') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
          <p className='dialogFilter-p1'>경기/인천</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '경기/인천') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
          <p className='dialogFilter-p1'>대전/충청</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '대전/충청') {
                return (
                  <Grid item xs={4} key={item.id + '88asd8789sda'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>

          <p className='dialogFilter-p1'>대구/경북</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '대구/경북') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
          <p className='dialogFilter-p1'>부산/경남</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '부산/경남') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
          <p className='dialogFilter-p1'>광주/전라</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '광주/전라') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
          <p className='dialogFilter-p1'>다른지역</p>
          <Grid item xs={12} container>
            {AREA_LIST.map((item) => {
              if (item.area === '다른지역') {
                return (
                  <Grid item xs={4} key={item.id + '8'}>
                    <span
                      className='dialogFilter-span1'
                      style={{
                        color: areaIds.find((item1) => item1.id === item.id)
                          ? '#0078FF'
                          : '#B3B3B3',
                      }}
                      onClick={() => {
                        insertArea(item)
                      }}
                    >
                      {item.subArea}
                    </span>
                  </Grid>
                )
              } else return null
            })}
          </Grid>
        </DialogContent>
        <DialogActions style={{paddingRight: '1rem'}}>
          <Button
            onClick={() => props.setOpen()}
            style={{backgroundColor: '#222222', color: 'white', width: '160px'}}
          >
            초기화
          </Button>
          <Button
            onClick={() => {
              props.setAreaIds(areaIds)
              props.setOpen()
            }}
            autoFocus
            style={{backgroundColor: '#0078FF', color: 'white', width: '160px'}}
          >
            적용
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
