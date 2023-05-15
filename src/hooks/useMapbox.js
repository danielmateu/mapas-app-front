import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

const puntoInicial = {
    lng: 2.1629,
    lat: 41.3972,
    zoom: 12.90
}

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
mapboxgl.accessToken = mapBoxToken;

export const useMapbox = () => {

    // Referencia al div del mapa
    const mapaDiv = useRef();
    const setRef = useCallback((node) => {
        mapaDiv.current = node
    }, [])

    // Referencia a los marcadores
    const marcadores = useRef({})

    // Observables de Rxjs
    const movimientoMarcador = useRef(new Subject())
    const nuevoMarcador = useRef(new Subject())

    // Mapa y coords
    const mapa = useRef()
    const [coords, setCoords] = useState(puntoInicial)

    // Funcion para agregar marcadores
    const agregarMarcador = useCallback((e, id) => {

        const { lng, lat } = e.lngLat || e
        const marker = new mapboxgl.Marker()

        marker.id = id ?? v4()// Si el marcador ya tiene id
        marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true)

        // Asignamos al objeto de marcadores
        marcadores.current[marker.id] = marker

        // Si el marcador tiene id no emitir
        if (!id) {
            nuevoMarcador.current.next({ // next emite un nuevo valor
                id: marker.id,
                lng,
                lat
            })
        }

        // Escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            // console.log(ev.target);
            const { id } = target
            // console.log(id);
            const { lng, lat } = target.getLngLat()
            // console.log(lng, lat);

            // TODO Emitir los cambios del marcador
            movimientoMarcador.current.next({ id, lng, lat })
        })
    }, [])

    // Funcion para actualizar la ubicacion del marcador
    const actualizarPosicion = useCallback(({ id, lng, lat }) => {
        marcadores.current[id].setLngLat([lng, lat])
    }, [])


    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        })
        // setMapa(map)
        mapa.current = map
    }, [])

    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter()
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    }, [])

    // Agregar marcadores cuando hacemos click
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador)
    }, [agregarMarcador])


    return {
        agregarMarcador,
        coords,
        mapaDiv,
        marcadores,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current,
        setRef,
        actualizarPosicion
    }
}
