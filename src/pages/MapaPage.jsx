/* eslint-disable react-hooks/exhaustive-deps */
// import mapboxgl from 'mapbox-gl'
import { useContext, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
// import { useSocket } from '../hooks/useSocket';
import { SocketContext } from '../context/SocketContext';

const MapaPage = () => {
    // const [mapa, setMapa] = useState(null)
    const { coords, setRef, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarPosicion } = useMapbox()

    // const { socket } = useSocket(SocketContext)
    const { socket } = useContext(SocketContext)

    // Escuchar los marcadores existentes
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            // console.log(marcadores);
            for (const key of Object.keys(marcadores)) {
                // console.log(key);
                agregarMarcador(marcadores[key], key)
            }

        })
    }, [socket])

    // Nuevo Marcador
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            // Todo: Nuevo marcador emitir
            // console.log(marcador);
            socket.emit('marcador-nuevo', marcador)
        })

    }, [nuevoMarcador$, socket])

    // Todo movimiento de marcador
    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            // console.log(marcador.id)
            socket.emit('marcador-actualizado', marcador)
        })
    }, [socket, movimientoMarcador$])

    // Mover marcador mediante sockets
    useEffect(() => {
        socket.on('marcador-actualizado', (marcador) => {
            // console.log(marcador)
            actualizarPosicion(marcador)
        })
    }, [socket])


    // Escuchar nuevos marcadores
    useEffect(() => {
        socket.on('marcador-nuevo', (marcador) => {
            // console.log(marcador)
            agregarMarcador(marcador, marcador.id)
        })
    }, [socket])

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