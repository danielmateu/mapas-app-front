import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from 'uuid';

const puntoInicial = {
    lng: 2.1629,
    lat: 41.3972,
    zoom: 12.90
}

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
mapboxgl.accessToken = mapBoxToken;

export const useMapbox = () => {

    const mapaDiv = useRef();

    // Referencia a los marcadores
    const marcadores = useRef({})

    // Mapa y coords
    const mapa = useRef()
    const [coords, setCoords] = useState(puntoInicial)

    // Funcion para agregar marcadores
    const agregarMarcador = useCallback((e) => {

        const { lng, lat } = e.lngLat
        const marker = new mapboxgl.Marker()

        marker.id = v4()// Si el marcador ya tiene id
        marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true)

        // Asignamos al objeto de marcadores
        marcadores.current[marker.id] = marker

        // Escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            // console.log(ev.target);
            const { id } = target
            // console.log(id);
            const { lng, lat } = target.getLngLat()
            // console.log(lng, lat);
            
            // TODO Emitir los cambios del marcador

        })
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
        coords,
        mapaDiv,
        agregarMarcador
    }
}
