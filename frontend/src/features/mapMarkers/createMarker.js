import { Marker } from 'react-leaflet'
import MarkerPopUpData from "./createMarkerPopup"
import L from 'leaflet'
const iconImage = require('../../constants/iconConstants')

function getIcon(markerInfo) {
  return L.icon({
    iconUrl: require(`../../images/static/icons/${iconImage[markerInfo.type]}.png`),
    iconSize: new L.point(20, 20)
  })
}

function MarkerData({ markerInfo }) {
  return (
    <Marker
      position={[markerInfo.coordinates.y, markerInfo.coordinates.x]}
      key={markerInfo._id}
      icon={getIcon(markerInfo)}>
      <MarkerPopUpData markerInfo={markerInfo} markerType={markerInfo.type} />
    </Marker>
  )
}

export default MarkerData