import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './MapBlock.scss';

const MapBlock = () => {
    const [centerCoord, setCenterCoord] = useState([51.505, -0.09]);

    return (
        <MapContainer center={centerCoord} zoom={8} scrollWheelZoom={true} setView={centerCoord}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default MapBlock;