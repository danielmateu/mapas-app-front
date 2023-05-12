// import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

const MapaPage = () => {
    // const [mapa, setMapa] = useState(null)
    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox()

    // Nuevo Marcador
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            // console.log('MapaPage');
            // console.log(marcador)

            // Todo: Nuevo marcador emitir
        })
    }, [nuevoMarcador$])

    // Todo movimiento de marcador
    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            console.log(marcador.id)
        })
    }, [movimientoMarcador$])

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