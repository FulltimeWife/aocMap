import { MapContainer, TileLayer} from 'react-leaflet'
import './AoCMap.css'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAll } from "../features/mapMarkers/markerSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MarkerData from "../features/mapMarkers/createMarker"

const position = [0, 0]

function AOCMap() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { markers, newMarkers, isLoading, isError, isSuccess, message } = useSelector((state) => state.marker)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || markers) {
      navigate('/map')
    }
    dispatch(getAll())
  }, [])
  return (
    <div className="large">
      <MapContainer center={position} zoom={2} minZoom={2} maxZoom={4} scrollWheelZoom={true} className="mapContainer" maxBounds={[[-77, -177], [77, 177]]}>
        <TileLayer
          url="../mapTiles/{z}_{x}_{y}.jpg"
          noWrap={true}
        />
          {markers.map((markerInfo) => (
            <MarkerData markerInfo={markerInfo} />
          ))}
      </MapContainer>
    </div>
  )
}

export default AOCMap

