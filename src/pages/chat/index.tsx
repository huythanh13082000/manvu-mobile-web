import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import AppBarCustom from '../../components/appbar'
import buttonChat from '../../asset/icons/button_chat.png'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {Question} from '../../types/question.type'
import {
  requestActions,
  selectListQuestion,
  selectListQuestionTotal,
  selectQuestionDetail,
} from '../../feature/request/request.slice'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardRequest from '../../components/card_request'
import DialogRequest from './Dialog'
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles({
  chat_container: {},
})

const ChatPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
  const listQuestion = useAppSelector(selectListQuestion)
  const questionDetail = useAppSelector(selectQuestionDetail)
  return (
    <div className={classes.chat_container}>
      <AppBarCustom
        title='1:1문의'
        buttonRight={buttonChat}
        onClickRightIcon={() => {
          setStatus('create')
          setQuestion(undefined)
          setOpenDialogCreate(true)
        }}
      />
      <InfiniteScroll
        dataLength={listQuestion.length}
        next={() => setOffset(offset + 5)}
        hasMore={true}
        loader={<></>}
        scrollableTarget='infiniteScroll-request'
      >
        {listQuestion.map((item) => {
          return (
            <span
              style={{width: '100%'}}
              onClick={() => {
                navigate(`/message_detail/${item.id}`)
              }}
              key={item.id}
            >
              <CardRequest {...item} />
            </span>
          )
        })}
      </InfiniteScroll>
      <DialogRequest
        question={question}
        open={openDialogCreate}
        setOpenDialog={setStateOpenDialog}
        status={status}
        setQuestion={setQuestionU}
      />
    </div>
  )
}

export default ChatPage
