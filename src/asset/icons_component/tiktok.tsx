import React from 'react'

const TiktokIcon = (props: {color: string}) => {
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
        <g filter='url(#filter0_i_2117_31404)'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M19.6018 13.6387C20.7618 14.464 22.1509 14.905 23.5741 14.8996V12.0766C23.2943 12.0774 23.0153 12.0474 22.742 11.9872V14.2362C21.3157 14.2387 19.9245 13.7927 18.7651 12.9611V18.7672C18.7616 19.7199 18.5005 20.6539 18.0097 21.4702C17.5188 22.2864 16.8163 22.9545 15.9768 23.4036C15.1373 23.8526 14.192 24.0659 13.2412 24.0209C12.2904 23.9758 11.3695 23.674 10.5762 23.1476C11.31 23.8907 12.2476 24.3992 13.2704 24.6086C14.2931 24.818 15.3549 24.7189 16.3214 24.324C17.2879 23.929 18.1155 23.2558 18.6994 22.3898C19.2834 21.5237 19.5975 20.5036 19.6018 19.4588V13.6387ZM20.6313 10.7592C20.0415 10.1192 19.6795 9.30206 19.6018 8.43487V8.06787H18.8121C18.9097 8.6191 19.1222 9.1436 19.4356 9.60728C19.749 10.0709 20.1564 10.4634 20.6313 10.7592V10.7592ZM12.4048 20.9127C12.1311 20.5544 11.9633 20.1264 11.9207 19.6775C11.878 19.2285 11.9621 18.7765 12.1634 18.373C12.3647 17.9695 12.6752 17.6307 13.0594 17.3951C13.4437 17.1595 13.8863 17.0366 14.3369 17.0404C14.5856 17.0403 14.833 17.0784 15.0702 17.1533V14.2362C14.7929 14.1994 14.5132 14.1837 14.2335 14.1891V16.457C13.6558 16.2742 13.0305 16.3158 12.4821 16.5734C11.9336 16.831 11.5021 17.2858 11.2734 17.8474C11.0448 18.4089 11.0356 19.036 11.2479 19.604C11.4601 20.172 11.8782 20.6392 12.4189 20.9127H12.4048Z'
            fill={props.color}
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M18.7651 12.9423C19.9246 13.7739 21.3157 14.2199 22.7421 14.2174V11.9684C21.9294 11.7964 21.1911 11.3734 20.6314 10.7592C20.1565 10.4634 19.7491 10.0709 19.4356 9.60728C19.1222 9.1436 18.9098 8.6191 18.8121 8.06787H16.7344V19.4588C16.7324 19.963 16.5728 20.4539 16.2778 20.8627C15.9829 21.2714 15.5675 21.5775 15.0899 21.7379C14.6123 21.8982 14.0965 21.9049 13.615 21.7569C13.1334 21.6089 12.7102 21.3137 12.4049 20.9127C11.9209 20.6683 11.5334 20.2678 11.3047 19.7759C11.076 19.284 11.0196 18.7293 11.1446 18.2014C11.2695 17.6735 11.5685 17.2031 11.9933 16.8661C12.4181 16.5291 12.944 16.3452 13.4861 16.3441C13.7348 16.3449 13.9819 16.3829 14.2194 16.457V14.1891C13.1935 14.2138 12.1971 14.5377 11.3525 15.1212C10.5079 15.7046 9.8519 16.5222 9.46501 17.4735C9.07813 18.4249 8.97718 19.4686 9.17458 20.4765C9.37198 21.4845 9.85912 22.4128 10.5762 23.1476C11.3697 23.6778 12.2921 23.9827 13.245 24.0297C14.198 24.0768 15.1458 23.8642 15.9876 23.4147C16.8294 22.9652 17.5336 22.2956 18.0252 21.4771C18.5168 20.6587 18.7774 19.7221 18.7792 18.7672L18.7651 12.9423Z'
            fill='white'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M22.7419 11.9679V11.361C21.9956 11.3642 21.2637 11.1553 20.6313 10.7587C21.1896 11.3748 21.9285 11.7981 22.7419 11.9679V11.9679ZM18.812 8.06744C18.812 7.95923 18.7791 7.8463 18.765 7.73809V7.37109H15.8975V18.7667C15.895 19.4048 15.6397 20.0158 15.1876 20.4657C14.7354 20.9156 14.1235 21.1676 13.4859 21.1663C13.1106 21.1682 12.7401 21.0811 12.4047 20.9122C12.7101 21.3132 13.1333 21.6085 13.6148 21.7565C14.0964 21.9045 14.6122 21.8978 15.0898 21.7374C15.5674 21.5771 15.9828 21.271 16.2777 20.8623C16.5727 20.4535 16.7323 19.9626 16.7342 19.4584V8.06744H18.812ZM14.2193 14.184V13.5394C13.0393 13.379 11.8398 13.6233 10.8163 14.2325C9.79284 14.8417 9.00567 15.7799 8.58314 16.8943C8.1606 18.0086 8.12759 19.2333 8.4895 20.3688C8.85141 21.5042 9.5869 22.4836 10.5761 23.1471C9.86443 22.4107 9.38247 21.4827 9.1891 20.4766C8.99574 19.4705 9.09933 18.4298 9.48723 17.4816C9.87513 16.5335 10.5305 15.7189 11.3734 15.1375C12.2162 14.5561 13.21 14.2329 14.2334 14.2075L14.2193 14.184Z'
            fill='white'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_i_2117_31404'
          x='6.07227'
          y='6.07031'
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
            result='effect1_innerShadow_2117_31404'
          />
        </filter>
      </defs>
    </svg>
  )
}

export default TiktokIcon
