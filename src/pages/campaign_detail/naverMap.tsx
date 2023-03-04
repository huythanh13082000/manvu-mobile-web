import {useEffect} from 'react'
import {Campaign} from '../../types/campaign.type'

const NaverMap = (props: {data: Campaign}) => {
  useEffect(() => {
    if (!naver.maps) window.location.reload()
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(props.data.latitude, props.data.longitude),
      zoom: 18,
    })
    const otherMarkers = new naver.maps.Marker({
      position: new naver.maps.LatLng(
        props.data.latitude,
        props.data.longitude
      ),
      map,
    })
  }, [props])

  const mapStyle = {
    width: '100%',
    height: '200px',
  }

  return <div id='map' style={mapStyle} />
}

export default NaverMap
