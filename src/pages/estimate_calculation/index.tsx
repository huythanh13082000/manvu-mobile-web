import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add'
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ColorizeIcon from '@material-ui/icons/Colorize'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {useEffect, useState} from 'react'
import {optionApi} from '../../apis/optionApi'
import {tagApi} from '../../apis/tagApi'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import egeScan from '../../asset/images/eye-scan.png'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {optionAction, selectListOption} from '../../feature/option/optionSlice'
import {selectListTag, tagAction} from '../../feature/tag/tagSlice'
import {selectListType, typeAction} from '../../feature/type/typeSlice'
import {OptionType} from '../../types/option.type'
import {numberWithCommas} from '../../utils'
import DialogCreateTag from './create_tag'
import DialogCreateType from './create_type'
import DialogCreate from './dialog'
import DialogImg from './dialog_img'

const useStyles = makeStyles({
  container_estimate_calculation: {
    padding: '1rem',
    '& .MuiMenuItem-root': {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      color: '#4D4D4D',
      fontFamily: 'Noto Sans KR',
      fontStyle: 'normal',
    },

    '&>div': {
      display: 'flex',
      '&>div': {
        borderRadius: '4px',
      },
      '&>div:nth-child(1)': {
        width: '20%',
        marginRight: '1rem',
        '&>div': {
          background: 'white',
          minHeight: '260px',
          '&>p': {
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '27px',
            margin: '5px 0',
          },
          '&>p:hover': {
            background: '#C8E4FA',
            color: '#215DFC',
          },
        },
      },
      '&>div:nth-child(2)': {
        width: '60%',
        '&>div': {
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
          background: 'white',
          marginBottom: '1rem',
          '&>div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1rem ',
            background: '#F1F5F9',

            '&>div': {
              display: 'flex',
              alignItems: 'center',
              '&>button': {
                background: '#0065F2',
                width: '85px',
                height: '34px',
                fontWeight: 500,
                fontSize: '14px',
                fontFamily: 'Pretendard',
              },
            },
            '&>p': {
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '27px',
              color: '#13191D',
            },
          },
          '&>p': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            justifyContent: 'space-between',
            margin: 0,
            borderBottom: '0.5px solid #D1D5DB',
            '&>img': {
              width: '24px',
              height: '24px',
            },
            '&>p:nth-of-type(1)': {
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4B5563',
              width: '60%',
            },
            '&>p:nth-of-type(2)': {
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
              width: '20%',
            },
          },
        },
      },
    },
  },
})

const EstimateCalculation = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [type, setType] = useState<string>('UX_UI')
  const [tag, setTag] = useState<string>('UI_PAGE')
  const [open, setOpen] = useState(false)
  const [openCreateTag, setOpenCreateTag] = useState(false)
  const [openCreateType, setOpenCreateType] = useState(false)
  const [openImg, setOpenImg] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [page, setPage] = useState<number>(1)
  const listTag = useAppSelector(selectListTag)
  const listType = useAppSelector(selectListType)
  const listOption = useAppSelector(selectListOption)
  const [img, setImg] = useState<string>('')
  const [idOption, setIdOption] = useState<number>()
  const [idTag, setIdTag] = useState<number>()
  const [option, setOption] = useState<OptionType>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseTag = () => {
    setAnchorElTag(null)
  }
  const [anchorElTag, setAnchorElTag] = useState<HTMLButtonElement | null>(null)
  const handleClickPopupTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTag(event.currentTarget)
  }

  useEffect(() => {
    !openCreateTag &&
      dispatch(
        tagAction.get({page: page, type: type, sort: 'DESC', perPage: 50})
      )
  }, [dispatch, page, type, openCreateTag])

  useEffect(() => {
    !open &&
      dispatch(
        optionAction.get({page: page, perPage: 150, type: type, sort: 'DESC'})
      )
  }, [dispatch, page, type, open])

  useEffect(() => {
    !openCreateType && dispatch(typeAction.get({page: page}))
  }, [dispatch, openCreateType, page])
  const handleDelele = async (id: number) => {
    const res: any = await optionApi.delete([id])
    if (res.success) {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'delete success',
          type: 'success',
        })
      )
      dispatch(optionAction.get({page, perPage: 150, type: type, sort: 'DESC'}))
    } else {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'delete error',
          type: 'error',
        })
      )
    }
  }
  const handleDeleleTag = async (id: number) => {
    const res: any = await tagApi.delete([id])
    if (res.success) {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'delete success',
          type: 'success',
        })
      )
      dispatch(tagAction.get({page, perPage: 50, type: type, sort: 'DESC'}))
    } else {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'delete error',
          type: 'error',
        })
      )
    }
  }
  const handleUpDown = async (typeSort: 'UP' | 'DOWN') => {
    const res: any = await tagApi.up_down({
      id: Number(idTag),
      type: typeSort,
    })
    if (res.code === 0) {
      handleCloseTag()
      dispatch(tagAction.get({page, perPage: 50, type: type, sort: 'DESC'}))
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'sort success',
          type: 'success',
        })
      )
    } else {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'sort error',
          type: 'error',
        })
      )
    }
  }
  const handleUpDownOption = async (typeSort: 'UP' | 'DOWN') => {
    const res: any = await optionApi.up_down({
      id: Number(idOption),
      type: typeSort,
    })
    if (res.code === 0) {
      handleClose()
      dispatch(optionAction.get({page, perPage: 150, type: type, sort: 'DESC'}))
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'sort success',
          type: 'success',
        })
      )
    } else {
      dispatch(
        snackBarActions.setStateSnackBar({
          content: 'sort error',
          type: 'error',
        })
      )
    }
  }
  console.log('listType', listType)
  return (
    <div className={classes.container_estimate_calculation}>
      <div>
        <div>
          <div>
            {listType.map((item) => (
              <p
                style={
                  type === item.name
                    ? {background: '#C8E4FA', color: '#215DFC'}
                    : {}
                }
                onClick={() => setType(item.name)}
              >
                {item.name} <ChevronRightIcon />
              </p>
            ))}
          </div>
          <Button
            variant='contained'
            style={{
              width: '100%',
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
              marginTop: '1rem',
            }}
            onClick={() => {
              setOpenCreateType(true)
            }}
          >
            Add type
          </Button>
        </div>
        <div>
          {listTag.map((item) => (
            <div key={item.id}>
              <div>
                <p>{item.name}</p>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setOption(undefined)
                      setOpen(true)
                      setTag(item.name)
                    }}
                  >
                    <AddIcon />
                    추가
                  </Button>
                  <span
                    onClick={(event: any) => {
                      handleClickPopupTag(event)
                      setIdTag(item.id)
                      setTag(item.name)
                    }}
                  >
                    <MoreVertIcon />
                  </span>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorElTag}
                    keepMounted
                    open={Boolean(anchorElTag)}
                    onClose={handleCloseTag}
                  >
                    <MenuItem onClick={() => handleUpDown('UP')}>
                      <ArrowUpwardOutlinedIcon />
                      위로이동
                    </MenuItem>
                    <MenuItem onClick={() => handleUpDown('DOWN')}>
                      <ArrowDownwardOutlinedIcon />
                      아래로 이동
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDeleleTag(Number(idTag))
                        handleCloseTag()
                      }}
                    >
                      <DeleteForeverOutlinedIcon />
                      삭제
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setOpenCreateTag(true)
                        handleCloseTag()
                      }}
                    >
                      <ColorizeIcon />
                      수정
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              {listOption.map(
                (itemOption) =>
                  itemOption.tag === item.name && (
                    <p key={itemOption.id}>
                      <p>{itemOption.nameOption}</p>
                      <p> {numberWithCommas(Number(itemOption.price))}원</p>
                      {itemOption.image && (
                        <img
                          src={egeScan}
                          alt=''
                          onClick={() => {
                            setImg(itemOption.image as string)
                            setOpenImg(true)
                          }}
                        />
                      )}
                      <span
                        onClick={(event: any) => {
                          setIdOption(Number(itemOption.id))
                          handleClick(event)
                          setOption(itemOption)
                        }}
                      >
                        <MoreVertIcon />
                      </span>
                      <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleUpDownOption('UP')}>
                          <ArrowUpwardOutlinedIcon />
                          위로이동
                        </MenuItem>
                        <MenuItem onClick={() => handleUpDownOption('DOWN')}>
                          <ArrowDownwardOutlinedIcon />
                          아래로 이동
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDelele(Number(idOption))
                            handleClose()
                          }}
                        >
                          <DeleteForeverOutlinedIcon />
                          삭제
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            setOpen(true)
                          }}
                        >
                          <ColorizeIcon />
                          수정
                        </MenuItem>
                      </Menu>
                    </p>
                  )
              )}
            </div>
          ))}
          <Button
            variant='contained'
            style={{
              width: '100%',
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
            }}
            onClick={() => {
              setTag('')
              setOpenCreateTag(true)
              setIdTag(undefined)
            }}
          >
            Add tag
          </Button>
        </div>
      </div>

      <DialogCreate
        open={open}
        setOpen={() => setOpen(false)}
        type={type}
        tag={tag}
        data={option}
      />
      <DialogCreateTag
        open={openCreateTag}
        setOpen={() => setOpenCreateTag(false)}
        type={type}
        tag={{nameTag: tag, id: idTag}}
      />
      <DialogCreateType
        open={openCreateType}
        setOpen={() => setOpenCreateType(false)}
      />
      <DialogImg open={openImg} setOpen={() => setOpenImg(false)} img={img} />
    </div>
  )
}

export default EstimateCalculation
