import { MapContainer, Marker, TileLayer, Popup} from 'react-leaflet'
import L from 'leaflet'

function getIcon() {
    return L.icon({
      iconUrl: require(`../images/static/icons/pepeuwu.png`),
      iconSize: new L.point(30, 30)
    })
}

function Town() {
  return (
    <div className="large">
    <MapContainer center={[0,0]} zoom={2} minZoom={2} maxZoom={4} scrollWheelZoom={true} className="mapContainer">
        <TileLayer
          url="../mapTiles256/{z}_{x}_{y}.jpg"
          noWrap={true}
        />
        <Marker
            position={[15, 15]}
            icon={getIcon()}>
            <Popup>
              Owner: 62744e5014cecf7b7911bfe8 <br />
              Name: Alpha Island 1 Marker <br />
              Coordinates: <br />
              X: 20 <br />
              Y: 20 <br />
              ID: 62744ffa14cecf7b7911bfec <br />
              Type: 1 <br />
              Zone: 62744e5014cecf7b7911bfe8 <br />
            </Popup>
          </Marker>
      </MapContainer>
    </div>
  )
}

export default Town