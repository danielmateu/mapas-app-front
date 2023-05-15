
import { useSocketMapbox } from '../hooks/useSocketMapbox';

const MapaPage = () => {
    const { coords, setRef } = useSocketMapbox()

    return (
        <>
            <div
                className="info fixed top-10 left-10 z-50 px-4 py-2 rounded-xl bg-white opacity-70 shadow-lg"
            >
                Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
            </div>

            <div
                ref={setRef}
                className="mapContainer absolute bottom-0 left-0 right-0 top-0"
            />
        </>
    )
}

export default MapaPage