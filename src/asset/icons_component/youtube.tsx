import React from 'react'

const YoutubeIcon = (props: {color: string}) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.7'>
        <rect width='32' height='32' rx='16' fill={props.color} />
        <g filter='url(#filter0_i_2117_31389)'>
          <path
            d='M24.356 11.8731C24.1573 11.1262 23.5696 10.537 22.8219 10.335C21.4698 9.97266 16.0452 9.97266 16.0452 9.97266C16.0452 9.97266 10.6234 9.97266 9.26862 10.335C8.52364 10.5342 7.93593 11.1234 7.7345 11.8731C7.37305 13.2285 7.37305 16.0584 7.37305 16.0584C7.37305 16.0584 7.37305 18.8883 7.7345 20.2437C7.93317 20.9906 8.52088 21.5798 9.26862 21.7818C10.6234 22.1441 16.0452 22.1441 16.0452 22.1441C16.0452 22.1441 21.4698 22.1441 22.8219 21.7818C23.5668 21.5826 24.1545 20.9934 24.356 20.2437C24.7174 18.8883 24.7174 16.0584 24.7174 16.0584C24.7174 16.0584 24.7174 13.2285 24.356 11.8731Z'
            fill='white'
          />
          <path
            d='M14.3125 18.667L18.8182 16.0584L14.3125 13.4498V18.667Z'
            fill={props.color}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_i_2117_31389'
          x='6.07227'
          y='6.50391'
          width='19.5117'
          height='20.0122'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='0.5' />
          <feGaussianBlur stdDeviation='1.25' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_2117_31389'
          />
        </filter>
      </defs>
    </svg>
  )
}

export default YoutubeIcon
