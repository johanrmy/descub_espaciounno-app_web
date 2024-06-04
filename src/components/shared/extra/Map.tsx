import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import UnnoMarker from '@assets/imgs/unno_marker.png'

interface MapProps {
    markers?: marker[];
    center?: marker;
    AddMarker?: boolean
    onNewMarkerCoords?: (coords: marker) => void;
}

type MapInstance = google.maps.Map | null;

const Map: React.FC<MapProps> = ({ markers=[], center= { lat: -12.1493747, lng: -77.0228592 }, AddMarker=false, onNewMarkerCoords }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_KEY_MAP,
    });

    const optionsMap: google.maps.MapOptions = {
        streetViewControl: false,
        mapTypeControl: false
    }
    const [map, setMap] = useState<MapInstance>(null);
    const [marker, setMarker] = useState<marker | null>(null);
    const defaultCenter = markers.length > 0 ? { lat: markers[0].lat, lng: markers[0].lng } : center;

    const handleMarkerClick = (lat: number, lng: number) => {
        if (map) {
        map.panTo({lat,lng});
        map.setZoom(20);
        }
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
    
        if (typeof lat === 'number' && typeof lng === 'number') {
            setMarker({ lat, lng });
            onNewMarkerCoords && onNewMarkerCoords({ lat, lng });
        } else {
            console.error('Latitude or longitude is undefined');
        }
    };
    
    const handleMapClickCenter = () => {
        if (map) {
            map.panTo(defaultCenter);
            map.setZoom(18);
            }
    };

    const handleMarkerRClick = () => {
        setMarker(null)
        onNewMarkerCoords && onNewMarkerCoords(defaultCenter)
    };


    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={{ height: '20rem', width: '100%', borderRadius: '0.375rem' }}
        center={marker ? { lat: marker.lat, lng: marker.lng } : defaultCenter}
        zoom={16}
        onClick={AddMarker ? handleMapClick : handleMapClickCenter}
        onLoad={(map) => setMap(map)}
        options={optionsMap}
        >
            <Marker
            position={center}
            onClick={() => {handleMarkerClick(center.lat, center.lng)}}
            icon={UnnoMarker}
            title='Espacio UNNO'
            />
        {markers.map((marker, index) => (
            <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {handleMarkerClick(marker.lat, marker.lng)}}
            />
        ))}
        {marker &&
            <Marker
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {handleMarkerClick(marker.lat, marker.lng)}}
                onRightClick={handleMarkerRClick}
                icon='https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png'
            />}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default Map;