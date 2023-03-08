import DaumPostcodeEmbed from 'react-daum-postcode'
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyAeE2VSjaFdg1SX4Q924lRZAZmYP6PBUH8')
Geocode.setLanguage('ko')
Geocode.setLocationType('ROOFTOP')
Geocode.enableDebug()

const Postcode = () => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    Geocode.fromAddress('Eiffel Tower').then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location
      },
      (error) => {
        console.error(error)
      }
    ) // eg '20, Wangsimni-ro 2-gil, Seongdong-gu, Seoul (Seongsu-dong 1-ga)'
  }

  return <DaumPostcodeEmbed onComplete={handleComplete} />
}
export default Postcode
