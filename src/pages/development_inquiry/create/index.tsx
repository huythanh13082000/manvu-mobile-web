import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {orderProjectApi} from '../../../apis/orderProjectApi'
import {useAppDispatch} from '../../../app/hooks'
import InputBase from '../../../components/input'
import UploadFile from '../../../components/upload_file'
import {orderProjectAction} from '../../../feature/order_project/orderProjectSlice'
import {OrderProjectType} from '../../../types/orderProject.type'
import {exportResults, numberWithCommas} from '../../../utils'

const useStyles = makeStyles({
  container_development_inquiry: {
    // background: '#F9FAFB',
    paddingBottom: '40px',
    '&>div:nth-child(1)': {},
    '&>div:nth-child(2)': {
      margin: '60px auto 0',
      width: '50%',
      padding: '32px 40px',
      background: '#FFFFFF',
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
      borderRadius: '6px',
      '&>p': {
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '36px',
      },
      '&>div': {
        display: 'flex',
        '&>label': {
          display: 'inline-block',
          marginBottom: '10px',
          marginTop: '10px',
          fontWeight: '500',
          fontSize: '18px',
          lineHeight: '27px',
          color: '#1F293',
        },
        '&>p': {
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '27px',
          color: '#1F2937',
        },
        '& .MuiFormControlLabel-label': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#6B7280',
        },
        '&>span': {
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '20px',
          color: '#000000',
          marginRight: '16px',
          '&>span': {
            color: '#0065F2',
          },
        },
      },
      '&>button': {
        width: '100%',
        height: '48px',
        background: '#0065F2',
        borderRadius: '5px',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '24px',
        margin: '32px 0',
      },
    },
  },
})

const CreateDevelopmentInquiry = () => {
  const classes = useStyles()
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, isDone: event.target.value === 'true' ? true : false})
  }
  const [data, setData] = useState<OrderProjectType>({
    projectName: '',
    governmentSupport: false,
    customerName: '',
    companyName: '',
    position: '',
    email: '',
    phone: '',
    platform: 'NOTHING',
    description: '',
  })

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const data = await orderProjectApi.getDetail(Number(id))
        const orderProject: OrderProjectType = exportResults(data)
        setData({
          projectName: orderProject.projectName,
          governmentSupport: orderProject.governmentSupport,
          companyName: orderProject.companyName,
          customerName: orderProject.customerName,
          email: orderProject.email,
          phone: orderProject.phone,
          platform: orderProject.platform,
          position: orderProject.position,
          maximumBudget: orderProject.maximumBudget,
          description: orderProject.description,
          isDone: orderProject.isDone,
          estimatedCost: orderProject.estimatedCost,
          estimatedTime: orderProject.estimatedTime,
          planFile: orderProject.planFile,
          presenter: orderProject.presenter,
        })
      }
      getDetail()
    }
  }, [id])

  const handleOrderProject = () => {
    if (id) {
      dispatch(
        orderProjectAction.update({
          data: {
            ...data,
            orderId: Number(id),
          },
          history: navigate,
        })
      )
    }
  }
  return (
    <div className={classes.container_development_inquiry}>
      <div></div>
      <div>
        <p>문의 내용</p>
        <div>
          <InputBase
            onChange={(e) => setData({...data, projectName: e})}
            placeholder='프로젝트명'
            label='프로젝트명'
            value={data?.projectName}
            disabled
          />
          <div style={{width: '32px'}}></div>

          <UploadFile file={data.planFile && JSON.parse(data.planFile)} />
        </div>
        <div style={{display: 'inherit'}}>
          <label htmlFor='textarea'>서비스의 주요 기능</label>
          <br />
          <TextareaAutosize
            aria-label='minimum height'
            minRows={3}
            id='textarea'
            placeholder='예: 인테리어 업체와 소비자 매칭 서비스'
            onChange={(e) => setData({...data, description: e.target.value})}
            value={data.description}
            style={{
              width: '100%',
              paddingLeft: '10px',
              height: '144px',
              boxSizing: 'border-box',
            }}
            disabled
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, maximumBudget: e})}
            placeholder='최대 예상'
            label='최대 예상'
            type='number'
            value={data.maximumBudget}
            disabled
          />
        </div>
        <div>
          <InputBase
            onChange={() => console.log(11)}
            placeholder='예: 예비창업패키지 사업비'
            label='정부지원사업 집행 여부'
            disabled
          />
        </div>
        <FormControl>
          <p>출시 플랫폼</p>
          <FormGroup style={{display: 'flex'}}>
            <FormControlLabel
              control={<Checkbox />}
              label='모발일앱(하이브리드)'
              disabled
              checked={
                data.platform === 'MOBILE_APP' || data.platform === 'BOTH'
                  ? true
                  : false
              }
              onChange={() => {
                switch (data.platform) {
                  case 'NOTHING':
                    setData({...data, platform: 'MOBILE_APP'})
                    break
                  case 'BOTH': {
                    setData({...data, platform: 'WEB_APP'})
                    break
                  }
                  case 'WEB_APP': {
                    setData({...data, platform: 'BOTH'})
                    break
                  }
                  case 'MOBILE_APP': {
                    setData({...data, platform: 'NOTHING'})
                    break
                  }
                  default:
                    break
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='반응형웹'
              checked={
                data.platform === 'WEB_APP' || data.platform === 'BOTH'
                  ? true
                  : false
              }
              disabled
              onChange={() => {
                switch (data.platform) {
                  case 'NOTHING':
                    setData({...data, platform: 'WEB_APP'})
                    break
                  case 'BOTH': {
                    setData({...data, platform: 'MOBILE_APP'})
                    break
                  }
                  case 'WEB_APP': {
                    setData({...data, platform: 'NOTHING'})
                    break
                  }
                  case 'MOBILE_APP': {
                    setData({...data, platform: 'BOTH'})
                    break
                  }
                  default:
                    break
                }
              }}
            />
          </FormGroup>
        </FormControl>
        <div>
          <InputBase
            onChange={(e) => setData({...data, customerName: e})}
            value={data.customerName}
            placeholder='이름과 성을 입력하세요'
            label='성함'
            require
            disabled
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, companyName: e})}
            value={data.companyName}
            placeholder='프로젝트명'
            label='회사이름 '
            disabled
          />
          <div style={{width: '32px'}}></div>
          <InputBase
            placeholder='직위를 입력하세요'
            label='직책'
            onChange={(e) => setData({...data, position: e})}
            value={data.position}
            disabled
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, email: e})}
            value={data.email}
            placeholder='이메일을 입력하세요'
            label='이메일'
            require
            disabled
          />
          <div style={{width: '32px'}}></div>
          <InputBase
            onChange={(e) => setData({...data, phone: e})}
            value={data.phone}
            placeholder='전화번호를 입력하세요 '
            label='휴대폰번호(응대문발송)'
            require
            disabled
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, presenter: e})}
            value={data.presenter}
            placeholder='들어 오세요 '
            label='추천인 또는 인썸니아를 알게 된 경로'
            disabled
          />
        </div>
        <div
          style={{borderBottom: '1px dashed #000000', marginTop: '1.5rem'}}
        ></div>

        <div>
          <InputBase
            onChange={(e) => setData({...data, estimatedCost: Number(e)})}
            value={data.estimatedCost}
            placeholder='예상 견적'
            label='예상 견적'
            require
            type='number'
          />
          <div style={{width: '32px'}}></div>
          <InputBase
            onChange={(e) => setData({...data, estimatedTime: e})}
            value={data.estimatedTime}
            placeholder='예상기간'
            label='예상기간'
            require
            type='number'
          />
        </div>

        <FormControl>
          <p>확인처리 </p>
          <RadioGroup
            name='isDone'
            value={!data.isDone ? 'false' : 'true'}
            onChange={handleChange}
            style={{display: 'flex', flexDirection: 'row'}}
          >
            <FormControlLabel
              value={'false'}
              control={<Radio />}
              label='미완료'
            />
            <FormControlLabel value={'true'} control={<Radio />} label='완료' />
          </RadioGroup>
        </FormControl>
        <div>
          <span>
            예상 견적:{' '}
            <span>{numberWithCommas(data.estimatedCost || 0)}원</span>
          </span>
          <span>
            예상기간: <span>{data.estimatedTime}개월</span>
          </span>
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={handleOrderProject}
        >
          제출하기
        </Button>
      </div>
    </div>
  )
}

export default CreateDevelopmentInquiry
