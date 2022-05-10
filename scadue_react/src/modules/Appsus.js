import { MapContainer, TileLayer, useMap, Popup, Marker, Polygon, Tooltip } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';
import getCountry from './api/api_requests/getCountry';
import getChildUnits from './api/api_requests/getChildUnits';

function Appsus() {
  const [centerCoord, setCenterCoord] = useState([51.505, -0.09]);
  const [polygonCoordinates, setPolygonCoordinates] = useState(null);
  const [polygons, setPolygons] = useState(null);
  const mapRef = useRef();

  function setCoord(lat, lon) {
    const { current = {} } = mapRef;
    const MapContainer = current;
    MapContainer.setView([lat, lon], 6);
  }

  useEffect(() => {
    async function fetchCountry() {
      const country_name = "Беларусь";
      const data = await getCountry(country_name);
      setCenterCoord([data?.centerLatitude, data?.centerLongitude]);
      setCoord(data?.centerLatitude, data?.centerLongitude);
      const a = JSON.parse('[' + data?.unitCoordinates + ']');
      console.log(a);
      const dataCoords = a[0].map((item) => [item[1], item[0]]);
      setPolygonCoordinates(dataCoords);
    }

    fetchCountry();
  }, [setCenterCoord]);

  function GetChilds() {
    async function fetchChilds() {
      const country_name = "Беларусь";
      const data = await getChildUnits(country_name);
      data.sort((a, b) => parseFloat(a.population) + parseFloat(b.population));
      console.log(data);
      
      let coords = {
        coordinates: [],
      };
      
      data.forEach(element => {
        const polygon = JSON.parse('[' + element?.unitCoordinates + ']');
        console.log(polygon);
        if (element?.unitCoordinates.startsWith("[[["))
        {
          coords.coordinates.push(polygon[0][0].map((item) => [item[1], item[0]]));
        }
        else
        {
        coords.coordinates.push(polygon[0].map((item) => [item[1], item[0]]));
        }
      });
      console.log(coords.coordinates);
      setPolygonCoordinates(coords.coordinates);

      let poly = coords.coordinates.map((item, index) => {
        return(
          <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white',
            }}
            positions={item}
          >
            <Tooltip>{index} + pppppppppppppppppp</Tooltip>
          </Polygon>
        )
      });
      setPolygons(poly);
    }

    fetchChilds();
  }

  return (
    <div className="App">
      <MapContainer ref={mapRef} center={centerCoord} zoom={13} scrollWheelZoom={true} setView={centerCoord}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {polygonCoordinates &&
          <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white',
            }}
            fillRule="evenodd"
            positions={polygonCoordinates}
          />} */}
          {polygons}
      </MapContainer>
      <button onClick={() => GetChilds()}>asdasdaasd</button>
      <button onClick={() => console.log(polygonCoordinates)}>asdasdaasd</button>
    </div>
  );
}

export default Appsus;
