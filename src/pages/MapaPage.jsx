// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react';


const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN

mapboxgl.accessToken = mapBoxToken;

const puntoInicial = {
    lng: 2.1629,
    lat: 41.3972,
    zoom: 12.90
}

const MapaPage = () => {

    const mapaDiv = useRef();

    const [mapa, setMapa] = useState(null)
    const [coords, setCoords] = useState(puntoInicial)

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom

        })

        setMapa(map)
    }, [])

    useEffect(() => {
        mapa?.on('move', () => {
            const { lng, lat } = mapa.getCenter()
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.getZoom().toFixed(2)
            })
        })
    }, [mapa])


    return (
        <>
            <div
                className="info fixed top-10 left-10 z-50 px-4 py-2 rounded-xl bg-white opacity-70 shadow-lg"
            >
                Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
            </div>

            <div
                ref={mapaDiv}
                className="mapContainer absolute bottom-0 left-0 right-0 top-0"
            >

            </div>
        </>
    )
}

export default MapaPage