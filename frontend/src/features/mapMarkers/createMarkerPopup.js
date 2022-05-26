import { Popup } from 'react-leaflet'
import { Link } from "react-router-dom"
import { FaHouseUser } from "react-icons/fa"

function MarkerPopUpData({markerInfo}) {  
  return (
    <Popup>
      Owner: {markerInfo.mapMarkerOwner} <br />
      Name: {markerInfo.markerName} <br />
      Coordinates: <br />
      X: {markerInfo.coordinates.x} <br />
      Y: {markerInfo.coordinates.y} <br />
      ID: {markerInfo._id} <br />
      Type: {markerInfo.type} <br />
      <Link to ={`/map/${markerInfo.mapMarkerOwner}`}>
        <button type="button" className="btn"><FaHouseUser /> Go to the town of {markerInfo.markerName}</button>
      </Link>
    </Popup>
  )
}

export default MarkerPopUpData