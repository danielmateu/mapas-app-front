import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

const puntoInicial = {
    lng: 2.1629,
    lat: 41.3972,
    zoom: 12.90
}

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
mapboxgl.accessToken = mapBoxToken;

export const useMapbox = () => {

    const mapaDiv = useRef();
    // const setRef = useCallback((node) => {
    //     mapaDiv.current = node;
    // }, []);
    const mapa = useRef()
    const [coords, setCoords] = useState(puntoInicial)

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

    return {
        coords,
        mapaDiv,
    }
}
