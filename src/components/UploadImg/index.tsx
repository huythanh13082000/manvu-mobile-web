import {Close} from '@mui/icons-material'
import {Grid, IconButton} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {FILE_API} from '../../apis/urlConfig'
import iconUpload from '../../asset/icons/icon_upload.png'
import './UploadImg.css'

function UploadImg(props: {
  images?: string[]
  setFile: (params: string[]) => void
  multiple?: boolean
}) {
  const [file, setFile] = useState<string[]>(props.images || [])
  const [fileUpload, setFileUpload] = React.useState<string[]>([])
  const {id} = useParams()
  function handleChange(e: any) {
    let url = URL.createObjectURL(e.target.files[0])
    let ArrayImg: string[] = []
    let arrayImg1: string[] = []
    fileUpload.push(e.target.files[0])
    setFileUpload([...file, ...fileUpload])
    ArrayImg = [...file]
    ArrayImg.push(url)
    setFile(ArrayImg)
    fileUpload.forEach((item) => {
      if (typeof item !== 'string') {
        arrayImg1.push(item)
      }
    })
    props.setFile([...file, ...arrayImg1])
  }

  function handleChangeMultiple(e: any) {
    const arrayFile = [...e.target.files]
    const listUrl: string[] = []
    arrayFile.forEach((item) => {
      listUrl.push(URL.createObjectURL(item))
      fileUpload.push(item)
    })
    let ArrayImg: string[] = []
    let arrayImg1: string[] = []

    setFileUpload([...file, ...fileUpload])
    ArrayImg = [...file, ...listUrl]
    setFile(ArrayImg)
    fileUpload.forEach((item) => {
      if (typeof item !== 'string') {
        arrayImg1.push(item)
      }
    })
    props.setFile([...file, ...arrayImg1])
  }
  const deletImg = (index: number) => {
    let ArrayImg: string[]
    let arrayImg1: string[]
    let arrayImg2: string[] = []
    ArrayImg = [...file]
    ArrayImg.splice(index, 1)
    setFile(ArrayImg)
    arrayImg1 = [...fileUpload]
    arrayImg1.splice(index, 1)
    setFileUpload(arrayImg1)
    arrayImg1.forEach((item) => {
      if (typeof item !== 'string') {
        arrayImg2.push(item)
      }
    })
    props.setFile([...ArrayImg, ...arrayImg2])
  }
  useEffect(() => {
    id && props.images && setFile(props.images)
  }, [props.images, id])
  const setAvatar = (index: number) => {
    const array = [...file]
    const arrayFileUpload = [...fileUpload]
    array[0] = file[index]
    array[index] = file[0]
    setFile([...array])
    arrayFileUpload[index] = fileUpload[0]
    arrayFileUpload[0] = fileUpload[index]
    props.setFile([...array, ...arrayFileUpload])
  }
  return (
    <Grid container item xs={12}>
      <Grid container item xs={12}>
        <Grid className='ULI-img' borderRadius='8px' marginRight='0.8rem'>
          <Grid item xs={12} className='ULI-iconButton'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              style={{position: 'relative'}}
            >
              <input
                hidden
                accept='image/*'
                type='file'
                name='upload-photo'
                onChange={props.multiple ? handleChangeMultiple : handleChange}
                multiple={props.multiple}
              />
              <Grid className='ULI-grid-icon' margin='auto'>
                <img
                  src={iconUpload}
                  alt='upload'
                  style={{width: '50px', height: '50px', objectFit: 'cover'}}
                />
              </Grid>
            </IconButton>
          </Grid>
        </Grid>
        {file.map((item, index) => {
          if (file.length > 0) {
            return (
              <Grid position='relative'>
                <img
                  onClick={() => setAvatar(index)}
                  src={
                    typeof item === 'string' && item.includes('blob')
                      ? item
                      : typeof item === 'string'
                      ? `${FILE_API}${item}`
                      : URL.createObjectURL(item)
                  }
                  alt={item}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    marginRight: '0.8rem',
                    objectFit: 'cover',
                  }}
                />
                {index === 0 && props.multiple && (
                  <span className='typify'>대표</span>
                )}
                <IconButton
                  aria-label='close'
                  size='small'
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '3%',
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
          } else return null
        })}
      </Grid>
    </Grid>
  )
}

export default UploadImg
