import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {green} from '@material-ui/core/colors'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {Pagination} from '@material-ui/lab'
import {makeStyles} from '@material-ui/core'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {orderProjectApi} from '../../apis/orderProjectApi'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import excel from '../../asset/images/excel.png'
import pdf from '../../asset/images/pdf.png'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {BASE_URL} from '../../constants'
import {
  orderProjectAction,
  selectListOrderProject,
  selectTotalOrderProject,
} from '../../feature/order_project/orderProjectSlice'
import {getTimeAgo} from '../../utils'

const useStyles = makeStyles({
  container_development_inquiry: {
    background: 'white',
    margin: '1rem',
    '&>div:nth-child(1)': {
      width: '100%',
      minHeight: '80vh',
      background: 'white',
      '&>div:nth-child(3)': {
        '& .MuiFormControlLabel-root': {
          width: '30%',
        },
        '& .MuiFormControlLabel-label': {
          fontSize: '14px',
          lineHeight: '20px',
        },
        '&>div': {
          display: 'flex',
          padding: '0.3rem 1rem',
          border: '1px solid rgba(196, 196, 196, 0.5)',
          background: '#F3F4F6',
          '&>div': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            '&>span': {
              color: '#4D4D4D',
              fontSize: '14px',
              display: 'inline-block',
              '&>span:nth-child(2)': {
                display: 'inline-block',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#F22828',
                background: 'rgba(242, 40, 40, 0.3)',
                borderRadius: '16px',
                padding: '4px 0',
                marginLeft: '16px',
                width: '63px',
                textAlign: 'center',
              },
            },
            '&>p': {
              color: '#4D4D4D',
              fontSize: '14px',
              '&>span': {
                color: '#4D4D4D',
                fontSize: '14px',
              },
              '&>div': {
                display: 'flex',
                '&>p': {
                  margin: '5px 5px 0 0',
                  '&>a': {
                    textDecoration: 'none',
                    color: '#C4C4C4',
                    fontWeight: 400,
                    fontSize: '14px',
                    '&>span': {
                      display: 'flex',
                      width: '132px',
                      height: '32px',
                      border: '1px solid #C4C4C4',
                      borderRadius: '24px',
                      alignItems: 'center',
                      padding: '0 10px',
                      '&>img': {
                        width: '18px',
                        height: '18px',
                      },
                      '&>div': {
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '24px',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '&>div:nth-child(1)': {
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#13191D',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        '&>button': {
          background: '#0065F2',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: 'Noto Sans KR',
        },
      },
      '&>div:nth-child(2)': {
        padding: '0.3rem 1rem',
        display: 'flex',
        '&>button': {
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: 'Noto Sans KR',
        },
        '&>span': {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&>div': {
            '&>p': {
              color: '#4D4D4D',
              cursor: 'pointer',
            },
            '&>p:hover': {
              background: '#F6F6F6',
            },
          },
        },
      },
      '&>div:nth-child(4)': {
        display: 'flex',
        justifyContent: 'center',
        padding: '0.3rem 1rem',
      },
    },
  },
})

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(77, 77, 77, 0.7)',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color='default' {...props} />)

const DevelopmentInquiry = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const listOrderProject = useAppSelector(selectListOrderProject)
  const total = useAppSelector(selectTotalOrderProject)
  const [page, setPage] = useState<number>(1)
  const [selectList, setSelectList] = useState<number[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [checkboxStatus, setCheckboxStatus] = useState<number>(1)

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick = (id: number) => {
    if (selectList.includes(id)) {
      setSelectList([...selectList.filter((item) => item !== id)])
    } else {
      setSelectList([...selectList, id])
    }
  }
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const handleDelele = async () => {
    const res: any = await orderProjectApi.delete(selectList)
    console.log(res)
    if (res.success) {
      dispatch(orderProjectAction.get({page, perPage: 10}))
      dispatch(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
      setSelectList([])
    }
  }

  useEffect(() => {
    dispatch(orderProjectAction.get({page, perPage: 10, sort: 'DESC'}))
  }, [dispatch, page])
  return (
    <div className={classes.container_development_inquiry}>
      <div>
        <div>제작문의 </div>
        <div>
          <span>
            <FormControlLabel
              style={{marginRight: '0'}}
              control={
                <GreenCheckbox
                  name='checkedG'
                  indeterminate={
                    selectList.length < listOrderProject.length &&
                    selectList.length !== 0
                  }
                />
              }
              label=''
              checked={listOrderProject.length === selectList.length}
              onClick={() => {
                if (checkboxStatus !== 1) {
                  setSelectList([])
                  setCheckboxStatus(1)
                } else {
                  setCheckboxStatus(2)
                  setSelectList([
                    ...listOrderProject.map((item) => Number(item.orderId)),
                  ])
                }
              }}
            />

            <span onClick={handleClickPopup}>
              <ArrowDropDownIcon />
            </span>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectList([
                    ...listOrderProject.map((item) => Number(item.orderId)),
                  ])
                  handleClose()
                }}
              >
                모두
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectList([])
                  handleClose()
                  setCheckboxStatus(2)
                }}
              >
                전제 선택 해제
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectList([
                    ...listOrderProject
                      .filter((item) => !item.isDone)
                      .map((item) => Number(item.orderId)),
                  ])
                  setCheckboxStatus(3)
                  handleClose()
                }}
              >
                미완료
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectList([
                    ...listOrderProject
                      .filter((item) => item.isDone)
                      .map((item) => Number(item.orderId)),
                  ])
                  setCheckboxStatus(4)
                  handleClose()
                }}
              >
                처리완료
              </MenuItem>
            </Menu>
          </span>

          {selectList.length > 0 && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDelele}
              style={{height: '32px', padding: '4px', marginLeft: '1rem'}}
            >
              <DeleteOutlineIcon /> 삭제
            </Button>
          )}
        </div>
        <div>
          {listOrderProject.map((item) => (
            <div style={item.isDone ? {} : {background: 'white'}}>
              <FormControlLabel
                control={<GreenCheckbox name='checkedG' />}
                label={item.companyName}
                checked={selectList.includes(Number(item.orderId))}
                onClick={() => handleClick(Number(item.orderId))}
              />
              <div>
                <p style={{width: '30%'}}>
                  <span
                    onClick={() =>
                      navigate(`/update_development_inquiry/${item.orderId}`)
                    }
                  >
                    {item.projectName}
                  </span>{' '}
                  - {item.position}
                  <div>
                    {item.planFile &&
                      (item.planFile as string[]).map((item) => (
                        <p>
                          <a
                            href={`${BASE_URL}/${item}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>
                              <img
                                src={
                                  item.toString().includes('.pdf') ? pdf : excel
                                }
                                alt=''
                              />
                              <div>{item.toString()}</div>
                            </span>
                          </a>
                        </p>
                      ))}
                  </div>
                </p>
                <span>
                  <span>{item.created_at && getTimeAgo(item.created_at)}</span>{' '}
                  <span
                    style={
                      item.isDone
                        ? {
                            color: '#0065F2',
                            background: 'rgba(0, 101, 242, 0.3)',
                          }
                        : {}
                    }
                  >
                    {item.isDone ? '미완료' : '완료'}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Pagination
            count={total && Math.ceil(total / 10)}
            page={page}
            onChange={handleChangePagination}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  )
}

export default DevelopmentInquiry
