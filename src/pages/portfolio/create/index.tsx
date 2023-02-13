import { TextareaAutosize } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { portfolioApi } from '../../../apis/portfolioApi'
import { useAppDispatch } from '../../../app/hooks'
import InputBase from '../../../components/input'
import UploadAvatar from '../../../components/upload_avatar'
import UploadImages from '../../../components/upload_images'
import { portfolioAction } from '../../../feature/portfolio/portfolioSlice'
import { PortfolioType } from '../../../types/portfolio.type'
import { exportResults } from '../../../utils'

const useStyles = makeStyles({
  container_create_portfolio: {
    '&>div:nth-child(1)': {
      filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12))',
      borderRadius: '12px',
      width: '50%',
      background: 'white',
      margin: '20px auto 16px',
      '&>div:nth-child(1)': {
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItem: 'center',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '27px',
        color: '#13191D',
        background: '#F1F5F9',
        padding: '0.6rem 1rem',
        '&>span': {
          marginRight: '1rem',
        },
      },
      '&>div:nth-child(2)': {
        padding: '1rem',
        '&>div': {
          '&>p': {
            marginBottom: '10px',
            marginTop: '10px',
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '27px',
            color: '#1F293',
          },
        },
      },
      '&>div:nth-child(3)': {
        textAlign: 'center',
        '&>button': {
          width: '120px',
          height: '48px',
          background: '#0065F2',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '19px',
          textAlign: 'center',
          color: '#FFFFFF',
          margin: '1rem 1rem 2rem',
        },
      },
    },
  },
})

const CreatePortfolio = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const [data, setData] = useState<PortfolioType>({
    title: '',
    programming_language: '',
    description: '',
    images: [],
  })
  const handlePortfolio = () => {
    if (id) {
      dispatch(
        portfolioAction.update({
          data: {
            ...data,
            logo: data.logo,
            images: data.images,
            portfolio_id: Number(id),
          },
          history: navigate,
        })
      )
    } else {
      const formDataLogo = new FormData()
      const formDataImages = new FormData()
      formDataLogo.append('picture', data.logo)
      data.images &&
        data.images.forEach((file, i) => {
          formDataImages.append(`pictures`, file)
        })
      dispatch(
        portfolioAction.create({
          data: {...data, logo: formDataLogo, images: formDataImages},
          history: navigate,
        })
      )
    }
  }
  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const data = await portfolioApi.getDetail(Number(id))
        const portfolio: PortfolioType = exportResults(data)
        setData({
          images: portfolio.images,
          title: portfolio.title,
          description: portfolio.description,
          logo: portfolio.logo,
          programming_language: portfolio.programming_language,
        })
      }
      getDetail()
    }
  }, [id])

  return (
    <div className={classes.container_create_portfolio}>
      <div>
        <div>
          <span onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </span>
          Add New Project
        </div>
        <div>
          <div>
            <p>로고 업로드</p>
            <UploadAvatar
              image={data?.logo}
              setImage={(e) => setData({...data, logo: e})}
            />
          </div>
          <InputBase
            onChange={(e) => setData({...data, title: e})}
            label='제목'
            placeholder='입력하십시오'
            value={data.title}
          />
          <InputBase
            onChange={(e) => setData({...data, programming_language: e})}
            label='개발언어'
            placeholder='입력하십시오'
            value={data.programming_language}
          />
          <div style={{display: 'inherit'}}>
            <label
              style={{
                margin: '10px 0',
                display: 'inline-block',
                fontSize: '18px',
              }}
              htmlFor='textarea'
            >
              서비스의 주요 기능
            </label>
            <br />
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              id='textarea'
              placeholder='예: 인테리어 업체와 소비자 매칭 서비스'
              style={{
                width: '100%',
                paddingLeft: '10px',
                height: '144px',
                boxSizing: 'border-box',
                fontSize: '16px',
              }}
              onChange={(e) => setData({...data, description: e.target.value})}
              value={data.description}
            />
          </div>
          <div>
            <p>이미지 업로드</p>
            <UploadImages
              images={data.images}
              setImages={(e) => setData({...data, images: e})}
            />
          </div>
        </div>
        <div>
          <Button onClick={handlePortfolio}>완료</Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePortfolio
