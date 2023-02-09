import {makeStyles} from '@mui/styles'
import React, {useRef, useState} from 'react'
import uploadImages from '../../asset/images/upload-images.png'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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

const UploadImages = () => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)
  const [listImage, setListImage] = useState<string[]>([
    'https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png',
    'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
    'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
  ])

  const handleDelete = (params: string) => {
    if (!listImage.includes(params)) {
      setListImage([...listImage, params])
    } else {
      setListImage([...listImage.filter((item) => item !== params)])
    }
  }
  const handleUp = (params: string) => {
    const index = listImage.indexOf(params)
    if (index !== 0) {
      const images = [...listImage]
      images[index] = listImage[index - 1]
      images[index - 1] = listImage[index]
      setListImage([...images])
    }
  }
  const handleDown = (params: string) => {
    const index = listImage.indexOf(params)
    if (index !== listImage.length - 1) {
      const images = [...listImage]
      images[index] = listImage[index + 1]
      images[index + 1] = listImage[index]
      setListImage([...images])
    }
  }

  const handleChange = (e: any) => {
    console.log(e.target.files)
    const listFile = [...e.target.files]
    const images = listFile.map((item) => {
      return URL.createObjectURL(item)
    })
    setListImage([...listImage, ...images])
  }

  return (
    <div className={classes.container_upload_images}>
      <div>
        {listImage.map((item) => (
          <div>
            <img src={item} alt='' />
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
