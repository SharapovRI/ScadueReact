import { useEffect, useRef, useState } from 'react';
import { MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet';
import './MapBlock.scss';

const MapBlock = ({ data, setActiveInitName, parentCenter, pushCenter, goBack }) => {
    const [centerCoord, setCenterCoord] = useState([51.505, -0.09]);
    const [polygons, setPolygons] = useState(null);
    //const [markers, setMarkers] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        const { current = {} } = mapRef;
        const MapContainer = current;
        if (current) {
            MapContainer.setView([centerCoord[0], centerCoord[1]], 6);
        }
    }, [centerCoord])

    useEffect(() => {
        if (parentCenter)
        {
            console.log("center");
            setCenterCoord(parentCenter);
        }
    },[parentCenter]);

    useEffect(() => {
        if (Array.isArray(data)) {
            data.sort((a, b) => parseFloat(a.rectangleArea) < parseFloat(b.rectangleArea));

            let coords = {
                coordinates: [],
                center: [],
                names: [],
            };

            data.forEach(element => {
                const polygon = JSON.parse('[' + element?.unitCoordinates + ']');
                if (element?.unitCoordinates.startsWith("[[[")) {
                    coords.coordinates.push(polygon[0][0].map((item) => [item[1], item[0]]));
                    coords.center.push([element?.centerLatitude, element?.centerLongitude]);
                    coords.names.push(element?.name);
                }
                else {
                    coords.coordinates.push(polygon[0].map((item) => [item[1], item[0]]));
                    coords.center.push([element?.centerLatitude, element?.centerLongitude]);
                    coords.names.push(element?.name);
                }
            });

            let poly = coords.coordinates.map((item, index) => {
                return (
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
                        eventHandlers={{
                            dblclick: (e) => {
                                pushCenter(coords.center[index]);
                                setActiveInitName(coords.names[index])
                            },
                        }}
                    >
                        <Tooltip>{index} + pppppppppppppppppp</Tooltip>
                    </Polygon>
                )
            });
            setPolygons(poly);
        }
        else if (data) {
            setCenterCoord([data?.centerLatitude, data?.centerLongitude]);
            const a = JSON.parse('[' + data?.unitCoordinates + ']');
            const dataCoords = a[0].map((item) => [item[1], item[0]]);
            const poly = <Polygon
                pathOptions={{
                    fillColor: '#FD8D3C',
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: 'white',
                }}
                fillRule="evenodd"
                positions={dataCoords}                
            />
            setPolygons(poly);
        }
    }, [data]);


    return (
        <>
            <MapContainer ref={mapRef} center={centerCoord} zoom={8} scrollWheelZoom={true} setView={centerCoord}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {polygons}
                {/* <CircleMarker center={[51.505, -0.09]} pathOptions={{ fillColor: 'blue' }} radius={5} /> */}

            </MapContainer>
            <button onClick={() => goBack()}>Go back</button>
        </>
    )
}

export default MapBlock;