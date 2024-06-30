import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
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
        mapTypeControl: false,
    }
    const [map, setMap] = useState<MapInstance>(null);
    const [marker, setMarker] = useState<marker | null>(null);
    const [currentLocation, setCurrentLocation] = useState<marker | null>(null);
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                () => {
                    console.error('Error obtaining location:');
                },
                {enableHighAccuracy: true}
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const defaultCenter = markers.length > 0 ? { lat: markers[0].lat, lng: markers[0].lng } : (currentLocation || { lat: -12.1493747, lng: -77.0228592 });

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

    const handleCenterButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (map && defaultCenter) {
            map.setCenter(defaultCenter);
            map.setZoom(20);
        }
    };

    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={{ height: '20rem', width: '100%', borderRadius: '0.375rem' }}
        center={marker ? { lat: marker.lat, lng: marker.lng } : defaultCenter}
        zoom={18}
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
        {currentLocation && (
            <Marker
                position={currentLocation}
                icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                }}
                onClick={() => {handleMarkerClick(currentLocation.lat, currentLocation.lng)}}
                title="Ubicación actual"
            />   
        )}
            <button
                onClick={handleCenterButtonClick}
                style={{
                    position: 'absolute',
                    top: '60px',
                    right: '10px',
                    zIndex: 1,
                    backgroundColor: 'white',
                    padding: '10px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                <img
                    src="https://www.svgrepo.com/show/309790/my-location.svg"
                    alt="Ubicación actual"
                    style={{ width: '20px', height: '20px' }}
                />
            </button>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default Map;