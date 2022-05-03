import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAll } from "../features/mapMarkers/markerSlice"
import L from 'leaflet'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
const iconImage = require('../constants/iconConstants')

function getIcon(markerInfo) {
  if(markerInfo.type === iconImage.pepeuwu) {
    return L.icon({
      iconUrl: require(`../images/static/icons/pepeuwu.png`),
      iconSize: new L.point(30, 30)
    })
  } else if(markerInfo.type === iconImage.breathtaking) {
    return L.icon({
      iconUrl: require(`../images/static/icons/breathtaking.png`),
      iconSize: new L.point(30, 30)
    })
  } else if (markerInfo.type === iconImage.wizardbun) {
    return L.icon({
      iconUrl: require(`../images/static/icons/wizardbun.png`),
      iconSize: new L.point(30, 30)
    })
  }
}

function AOCMap() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { markers, isLoading, isError, isSuccess, message } = useSelector((state) => state.marker)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || markers) {
      navigate('/map')
    }
    dispatch(getAll())
  }, [])
  const position = [0, 0]
  const allMarkers = markers
  return (
    <MapContainer center={position} zoom={3} minZoom={3} maxZoom={4} scrollWheelZoom={true}>
      <TileLayer
        url="../mapTiles/{z}_{x}_{y}.jpg"
      />
      {markers.map((markerInfo) => (
        <Marker position={[markerInfo.coordinates.y, markerInfo.coordinates.x]} key={markerInfo._id} icon={getIcon(markerInfo, 30)}>
          <Popup>
            Owner: {markerInfo.mapMarkerOwner} <br />
            Name: {markerInfo.markerName} <br />
            Coordinates: <br />
            X: {markerInfo.coordinates.x} <br />
            Y: {markerInfo.coordinates.y} <br /> 
            ID: {markerInfo._id} <br />
            Type: {markerInfo.type}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  )
  console.log(markers[0])
}

export default AOCMap

