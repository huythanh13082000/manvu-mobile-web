import {makeStyles} from '@material-ui/core'
import React, {useRef, useState, useEffect} from 'react'
import uploadImages from '../../asset/images/upload-images.png'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import {useParams} from 'react-router-dom'
import {BASE_URL} from '../../constants'

const useStyles = makeStyles({
  container_upload_images: {
    '&>div:nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem 0',
      gap: '8px',
      width: '100%',
      background: '#F9FAFB',
      border: '1px dashed #2C97EB',
      borderRadius: '12px',
      '&>img': {
        width: '70px',
        height: '70px',
      },
      '&>p': {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '27px',
        color: '#111827',
        margin: 0,
      },
      '&>span': {
        fontWeight: 500,
        fontSize: '13px',
        lineHeight: '18px',
        color: '#9CA3AF',
      },
    },

    '&>div:nth-child(1)': {
      '&>div': {
        position: 'relative',
        '&>img': {
          width: '100%',
          margin: '1rem 0',
        },
        '&>span:nth-child(2)': {
          position: 'absolute',
          top: '23px',
          right: '5px',
          '&>svg': {
            width: '32px',
            height: '32px',
            color: 'white',
          },
        },
        '&>span:nth-child(3)': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '4px 8px',
          gap: '4px',
          height: '29px',
          background: '#FFFFFF',
          borderRadius: '4px',
          position: 'absolute',
          zIndex: 100,
          top: '31px',
          left: '16px',
          fontSize: '14px',
        },
        '&>span:nth-child(4)': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '4px 8px',
          gap: '4px',
          height: '29px',
          background: '#FFFFFF',
          borderRadius: '4px',
          position: 'absolute',
          zIndex: 100,
          top: '31px',
          left: '97px',
          fontSize: '14px',
        },
      },
    },
  },
})

const UploadImages = (props: {images: any; setImages: (e: any) => void}) => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)
  const [listImage, setListImage] = useState<any[]>([])
  const [listFile, setListFile] = useState<any[]>([])
  const {id} = useParams()

  const handleDelete = (params: string) => {
    const index = listImage.indexOf(params)
    setListImage([...listImage.filter((item) => item !== listImage[index])])
    const newListFile: any[] = []
    listFile.forEach((item, i = 0) => {
      if (i !== index) newListFile.push(item)
    })
    setListFile([...newListFile])
    props.setImages([...newListFile])
  }
  const handleUp = (params: string) => {
    const index = listImage.indexOf(params)
    if (index !== 0) {
      const images = [...listImage]
      const files = [...listFile]
      files[index] = listFile[index - 1]
      files[index - 1] = listFile[index]
      images[index] = listImage[index - 1]
      images[index - 1] = listImage[index]
      setListImage([...images])
      setListFile([...files])
      props.setImages([...files])
    }
  }
  const handleDown = (params: string) => {
    const index = listImage.indexOf(params)
    if (index !== listImage.length - 1) {
      const images = [...listImage]
      const files = [...listFile]
      files[index] = listFile[index + 1]
      files[index + 1] = listFile[index]
      images[index] = listImage[index + 1]
      images[index + 1] = listImage[index]
      setListImage([...images])
      setListFile([...files])
      props.setImages([...files])
    }
  }

  const handleChange = (e: any) => {
    const data = [...e.target.files]
    const images = data.map((item) => {
      return URL.createObjectURL(item)
    })
    setListImage([...listImage, ...images])
    setListFile([...listFile, ...e.target.files])
    props.setImages([...listFile, ...e.target.files])
  }

  useEffect(() => {
    if (id && props.images) {
      setListImage(props.images)
      setListFile(props.images)
    }
  }, [id, props.images])

  return (
    <div className={classes.container_upload_images}>
      <div>
        {listImage.map((item, index) => (
          <div key={index}>
            <img
              src={
                typeof item === 'string' && item.includes('blob')
                  ? item
                  : typeof item === 'string'
                  ? `${BASE_URL}${item}`
                  : URL.createObjectURL(item)
              }
              alt=''
            />
            <span onClick={() => handleDelete(item)}>
              <CancelIcon />
            </span>
            <span onClick={() => handleUp(item)}>
              <ArrowUpwardIcon /> Up
            </span>
            <span onClick={() => handleDown(item)}>
              <ArrowDownwardIcon />
              Down
            </span>
          </div>
        ))}
      </div>
      <div
        onClick={() => inputRef && inputRef.current && inputRef.current.click()}
      >
        <img src={uploadImages} alt='' />
        <p>파일 선택</p>
        <span>Can upload multiple photos at the same time</span>
        <input
          ref={inputRef}
          type='file'
          onChange={handleChange}
          hidden
          accept='image/*'
          name='upload-photo'
          multiple
        />
      </div>
    </div>
  )
}

export default UploadImages
