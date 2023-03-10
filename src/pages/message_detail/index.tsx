import {Close} from '@mui/icons-material'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import {Button, Grid, IconButton, Menu, MenuItem} from '@mui/material'
import {makeStyles} from '@mui/styles'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {FILE_API} from '../../apis/urlConfig'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import camera from '../../asset/icons/camera.png'
import sendMessage from '../../asset/icons/send.png'
import AppBarCustom from '../../components/appbar'
import {
  requestActions,
  selectListQuestion,
  selectListQuestionTotal,
  selectQuestionDetail,
} from '../../feature/request/request.slice'
import {Question} from '../../types/question.type'
import DialogRequest from '../chat/Dialog'
import DialogImg from './DialogImg'
import './messageDetail.css'

const useStyles = makeStyles({
  message_detail_container: {},
})

const MessageDetail = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<Question>()
  const [openDialogCreate, setOpenDialogCreate] = useState(false)
  const [openDialogImg, setOpenDialogImg] = useState(false)
  const [content, setContent] = useState('')
  const [file, setFile] = useState<string[]>([])
  const [url, setUrl] = useState<string>('')
  const [fileUpload, setFileUpload] = useState<string[]>([])
  const [status, setStatus] = useState<string>('create')
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState<number>(0)
  const {id} = useParams()

  function handleChange(e: any) {
    let url = URL.createObjectURL(e.target.files[0])
    let ArrayImg: string[]
    let arrayImg2: string[]
    ArrayImg = [...file]
    arrayImg2 = [...fileUpload]
    ArrayImg.push(url)
    setFile(ArrayImg)
    arrayImg2.push(e.target.files[0])
    setFileUpload(arrayImg2)
  }
  const total = useAppSelector(selectListQuestionTotal)
  const handleComment = () => {
    const formData: any = new FormData()
    fileUpload.forEach((item) => {
      if (typeof item !== 'string') {
        formData.append('images', item)
      }
    })
    dispatch(
      requestActions.answerQuestion({
        id: questionDetail?.id,
        data: formData,
        content: content,
      })
    )
    setContent('')
    setFile([])
    setFileUpload([])
  }
  const deletImg = (index: number) => {
    let ArrayImg: string[]
    let arrayImg2: string[]
    ArrayImg = [...file]
    arrayImg2 = [...fileUpload]
    ArrayImg.splice(index, 1)
    arrayImg2.splice(index, 1)
    setFile(ArrayImg)
    setFileUpload(arrayImg2)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const setStateOpenDialog = () => {
    setOpenDialogCreate(false)
  }
  const setStateOpenDialogImg = () => {
    setOpenDialogImg(false)
  }
  const setQuestionU = () => {
    setQuestion(undefined)
  }
  useEffect(() => {
    dispatch(requestActions.getListQuestion({limit: limit, offset: offset}))
  }, [dispatch, limit, offset])
  const handleClickCard = (id: number) => {
    dispatch(requestActions.getQuestionDetail(id))
  }
  useEffect(() => {
    !openDialogCreate && dispatch(requestActions.getQuestionDetail(Number(id)))
  }, [dispatch, id, openDialogCreate])
  const listQuestion = useAppSelector(selectListQuestion)
  const questionDetail = useAppSelector(selectQuestionDetail)
  console.log(231123, questionDetail)
  return (
    <div className={classes.message_detail_container}>
      <AppBarCustom title='1:1 문의' />
      <Grid item xs={6}>
        <Grid
          bgcolor='#F6F6F6'
          container
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid
            height='80px'
            container
            alignItems='center'
            item
            xs={8}
            padding='0.6rem 1rem'
          >
            <img
              src={
                questionDetail?.images && questionDetail?.images.length !== 0
                  ? `${FILE_API}${questionDetail?.images[0]}`
                  : '/img/Sell-Your-Product.png'
              }
              alt='avatar'
              style={{
                width: '50px',
                maxHeight: '50px',
                borderRadius: '4px',
                marginRight: '0.5rem',
              }}
            />
            <Grid item xs={8}>
              <p className='rq-p11'> {questionDetail?.content}</p>
              <p className='rq-p2'>
                {moment(questionDetail?.createdAt).format('DD-MM-YYYY')}
              </p>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button
              id='demo-positioned-button'
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon style={{color: '#677294', width: '20px'}} />
            </Button>

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
              <MenuItem
                onClick={() => {
                  handleClose()
                  setStatus('update')
                  setOpenDialogCreate(true)
                }}
                style={{borderBottom: '1px solid #D5D5DE'}}
              >
                <p className='rq-p4'>
                  수정 <ModeEditOutlineOutlinedIcon />
                </p>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (id) dispatch(requestActions.deleteQuestion(Number(id)))
                  handleClose()
                  setQuestion(undefined)
                }}
              >
                <p className='rq-p5'>
                  지우기 <DeleteSweepOutlinedIcon />
                </p>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <div style={{padding: '0 1rem', minHeight: '70vh'}}>
          <p className='rq-p3' style={{borderBottom: '1px solid #e1e1e1'}}>
            {questionDetail?.content}
          </p>
          <p className='rq-p3'>
            댓글
            <span style={{color: '#0078FF'}}>
              ({questionDetail?.answers?.length})
            </span>
          </p>
          <Grid item xs={12} height='430px' overflow='auto'>
            <Grid item xs={12} container>
              <Grid item xs={10}>
                {questionDetail?.answers?.map((item) => {
                  return (
                    <Grid item xs={12} container marginBottom='20px'>
                      <Grid item xs={2} style={{paddingLeft: '0.5rem'}}>
                        <img
                          src={
                            item &&
                            item?.user &&
                            item?.user?.avatar &&
                            item?.user?.avatar.includes('https')
                              ? item?.user?.avatar
                              : item?.user?.avatar
                              ? `${FILE_API}${item?.user?.avatar}`
                              : '/img/user.png'
                          }
                          alt='avatar'
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Grid item xs={12}>
                          <p className='rq-p1'>{item?.user?.username}</p>
                          <p className='rq-p2'>
                            {moment(item?.createdAt).format('DD-MM-YYYY')}1
                          </p>
                          <p className='rq-p1'>{item?.content}</p>
                        </Grid>
                        <Grid item xs={12} container>
                          {item.images &&
                            item.images.length > 0 &&
                            item.images.map((item) => {
                              return (
                                <Grid key={item} item xs={4}>
                                  <img
                                    style={{
                                      width: '70px',
                                      height: '70px',
                                      marginRight: '0.5rem',
                                      objectFit: 'cover',
                                    }}
                                    src={`${FILE_API}${item}`}
                                    alt='img'
                                    onClick={() => {
                                      setOpenDialogImg(true)
                                      setUrl(item)
                                    }}
                                  />
                                </Grid>
                              )
                            })}
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid
          item
          xs={12}
          marginTop='3rem'
          container
          alignItems='center'
          position={'sticky'}
          bottom='0'
          bgcolor='#F6F6F6'
          padding='1rem 0'
        >
          {file.length > 0 && (
            <Grid item xs={12} container padding='0 1rem'>
              {file.map((item, index: number = 0) => {
                return (
                  <Grid
                    position='relative'
                    width='28%'
                    marginRight={'1rem'}
                    marginBottom='1rem'
                  >
                    <img
                      src={item}
                      alt={item}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                      }}
                    />
                    <IconButton
                      aria-label='close'
                      size='small'
                      style={{
                        position: 'absolute',
                        top: '-13px',
                        right: '-15px',
                        color: '#6D829A',
                        background: '#D5D5DE',
                        width: '30px',
                        height: '30px',
                      }}
                      onClick={() => deletImg(index)}
                    >
                      <Close />
                    </IconButton>
                  </Grid>
                )
              })}
            </Grid>
          )}
          <Grid item xs={1}>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              style={{position: 'relative'}}
            >
              <img src={camera} alt='' />
              <input
                hidden
                accept='image/*'
                type='file'
                name='upload-photo'
                onChange={handleChange}
              />
              <Grid className='ULI-grid-icon' margin='auto'></Grid>
            </IconButton>
          </Grid>
          <Grid item xs={10} container>
            <input
              onChange={(e) => {
                setContent(e.target.value)
              }}
              type='string'
              style={{
                height: '40px',
                width: '92%',
                borderRadius: '20px',
                border: '1px solid #ACB1B6',
                marginLeft: '1rem',
                paddingLeft: '10px',
              }}
              placeholder='내용을 입력해주세요.'
              value={content}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (content) handleComment()
                }
              }}
            />
          </Grid>
          <Grid item xs={1} style={{display: 'flex'}}>
            <img
              src={sendMessage}
              style={{cursor: 'pointerf'}}
              onClick={handleComment}
              alt='send'
            />
          </Grid>
        </Grid>
      </Grid>
      <DialogRequest
        question={questionDetail}
        open={openDialogCreate}
        setOpenDialog={setStateOpenDialog}
        status={status}
        setQuestion={setQuestionU}
        setOpenDialogCreate={() => setOpenDialogCreate(false)}
      />
      <DialogImg
        open={openDialogImg}
        setOpenDialog={setStateOpenDialogImg}
        url={url}
      />
    </div>
  )
}

export default MessageDetail
