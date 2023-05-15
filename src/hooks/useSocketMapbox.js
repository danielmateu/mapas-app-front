/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { SocketContext } from "../context/SocketContext"
import { useMapbox } from "./useMapbox"


export const useSocketMapbox = () => {

    const { socket } = useContext(SocketContext)
    const { coords, setRef, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarPosicion } = useMapbox()

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

    return {
        coords,
        setRef 
    }
}
