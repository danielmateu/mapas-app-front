/* eslint-disable react-hooks/exhaustive-deps */
// import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from '../context/SocketContext';

const MapaPage = () => {
    // const [mapa, setMapa] = useState(null)
    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox()

    const { socket, online } = useSocket(SocketContext)

    // Escuchar los marcadores existentes
    // useEffect(() => {
    //     socket.on('marcadores-activos', (marcadores) => {
    //         for (const key of Object.keys(marcadores)) {
    //             // console.log(key)
    //             console.log(marcadores[key])
    //             console.log(marcadores[key].lng)
    //             console.log(marcadores[key].lat)
    //             console.log(marcadores[key].id)
    //             // console.log(marcadores[key].nombre)
    //             // console.log(marcadores[key].color)
    //             // console.log(marcador

    //         }
    //     })
    // }, [socket])


    // Nuevo Marcador
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            // console.log('MapaPage');
            // console.log(marcador)
            // Todo: Nuevo marcador emitir
            // socket.emit('marcador-nuevo', marcador)



        })
    }, [nuevoMarcador$])

    // Todo movimiento de marcador
    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            console.log(marcador.id)

            // socket.emit('marcador-actualizado', marcador)
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